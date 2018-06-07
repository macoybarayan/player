(function () {
    /**
     * By Daniel Rossi <danielr@electroteque.org> For VDYO
     */

    /**
     * Heatmap Playback Tracker For Flowplayer
     * Tracks a logged in or anonymous user for video playback start and end times.
     * Start time offsets and current playback time and duration played are logged.
     * Extra properties like time on page, page url, user agent and geoip are logged.
     * Uses Keen.io new tracking library
     * @constructor
     * @param config
     * @param onRecordEvent
     * @param onRecordComplete
     * @param onRecordError
     * @param onRecordStalled
     */

    function HeatmapTracker(config, onRecordEvent, onRecordComplete, onRecordError, onRecordStalled) {
        this.config = config;
        this.client = null;
        this.uid_cookie = "heatmapuid";
        this.startOffset = 0;
        this.content = {};
        this.contentExtra = {};
        this.heatmapExtra = {};
        this.video_duration = 0;
        this.duration_played = 0;
        this.sessionTimer = null;
        this.isAsync = true;
        this.onRecordEvent = onRecordEvent;
        this.onRecordComplete = onRecordComplete;
        this.onRecordError = onRecordError;
        this.onRecordStalled = onRecordStalled;
        this.heatmap_event = "video_heatmap";
        this.contentParent = null;

        //wait for the keen api to be ready
        Keen.ready(function () {
            this.init();
        }.bind(this));
    }


    /**
     * Init the keen.io api client and uuid
     */
    HeatmapTracker.prototype.init = function () {

        //configure an anonymous uuid if no user id is set.
        if (!this.config.uid) {
            this.initUid();
        }

        //start tracking the time on page time.
        this.sessionTimer = Keen.utils.timer();
        this.sessionTimer.start();

        //init the keen.io client
        this.initClient();
    }

    /**
     * Init the keen.ui api client with credentials.
     */
    HeatmapTracker.prototype.initClient = function () {
        this.client = new Keen({
            projectId: this.config.project_id,
            writeKey: this.config.write_api_key
        });

        if (this.onRecordEvent) {
            this.client.on('recordEvent', this.onRecordEvent);
        }


        //extend with global event properties
        this.client.extendEvents(function () {
            return {
                heatmap: {
                    uid: this.config.uid,
                    tenant_id: this.config.tenant_id,
                    time_on_page: this.sessionTimer.value()
                },
                page: {
                    title: document.title,
                    url: document.location.href
                },
                referrer: {
                    url: document.referrer
                },
                tech: {
                    browser: Keen.helpers.getBrowserProfile(),
                    ip_address: '${keen.ip}',
                    user_agent: '${keen.user_agent}'
                },
                time: Keen.helpers.getDatetimeIndex(),
                keen: {
                    "addons": [{
                        "name": "keen:ip_to_geo",
                        "input": {
                            "ip": "tech.ip_address"
                        },
                        "output": "ip_geo_info"
                    }, {
                        "name": "keen:ua_parser",
                        "input": {
                            "ua_string": "tech.user_agent"
                        },
                        output: 'tech.info'
                    }, {
                        name: 'keen:referrer_parser',
                        input: {
                            page_url: 'page.url',
                            referrer_url: 'referrer.url'
                        },
                        output: 'referrer.info'
                    }]
                }
            };
        }.bind(this));

    }


    /**
     * Init an anonymous uuid if no user id is set
     */
    HeatmapTracker.prototype.initUid = function () {

        //check a sticky cookie for a previously generated uuid or generate a new id
        var uidCookie = Keen.utils.cookie(this.uid_cookie);

        if (uidCookie && !uidCookie.get('uuid') || !uidCookie) {
            this.config.uid = Keen.helpers.getUniqueId();
            uidCookie.set('uuid', this.config.uid);
        } else {
            this.config.uid = uidCookie.get('uuid');
        }
    };


    /**
     * Enable sync requests for unload support
     * @param value
     */
    HeatmapTracker.prototype.setBeacon = function (value) {
        this.isAsync = value;
    };


    /**
     * Set the start offset time
     * @param value
     */
    HeatmapTracker.prototype.setStartOffset = function (value) {
        this.startOffset = value;
    };


    /**
     * Set the video record id
     * @param value
     */
    HeatmapTracker.prototype.setContent = function (value) {
        this.content = value;
    };


    HeatmapTracker.prototype.setContentParent = function (value) {
        this.contentParent = value;
    };

    HeatmapTracker.prototype.setExtra = function (type, object) {
        if (type == 'heatmap') {
            this.heatmapExtra = object;
        } else if (type == 'content') {
            this.contentExtra = object;
        }
    };


    /**
     * Set the current video duration
     * @param value
     */
    HeatmapTracker.prototype.setVideoDuration = function (value) {
        this.video_duration = value;
    };

    HeatmapTracker.prototype.setDurationPlayed = function (currentTime) {
        this.duration_played = currentTime - this.startOffset;
    };

    /**
     * Build the playback tracking event
     * @param currentTime
     * @returns {{heatmap: {start_time: (number|*), current_time: *, duration_played: number}}}
     */
    HeatmapTracker.prototype.buildEvent = function (currentTime) {
        if (this.content.url) {
            delete this.content['url'];
        }

        var content = Object.assign(this.content, {
            parent: this.contentParent,
            video_duration: this.video_duration,
            extra: this.contentExtra
        });

        var heatmap = Object.assign({
                video_duration: this.video_duration,
                start_time: this.startOffset,
                current_time: currentTime,
                duration_played: this.duration_played
            },
            this.heatmapExtra
        );
        

        return {
            heatmap: heatmap,
            content: content
        };
    };


    /**
     * Track the playback event with a given video time.
     * @param currentTime
     */
    HeatmapTracker.prototype.track = function (currentTime) {
        //set the playback region duration
        this.setDurationPlayed(currentTime);

        //don't track if there has been a seek
        if (this.duration_played <= 0) {
            if (this.onRecordStalled) this.onRecordStalled(this.duration_played);
            //console.log("Time played from offset is 0");
            return;
        }

        //console.log(this.buildEvent(currentTime));
        this.client.recordEvent(this.heatmap_event, this.buildEvent(currentTime), function (err, res) {
            if (err) {
                if (this.onRecordError) this.onRecordError(err);
                //console.log("Error tracking heatmap with message: ", err);
            } else {
                if (this.onRecordComplete) this.onRecordComplete(res);
                //console.log("Successfully tracked heatmap with message: ", res);
            }
        }.bind(this), this.isAsync);
        //4th argument is for async / sync support. Sync xhr requests are required when unloading the page
    };

    HeatmapTracker.prototype.trackAdvertisement = function() {

    };

    window.HeatmapTracker = HeatmapTracker;
})();