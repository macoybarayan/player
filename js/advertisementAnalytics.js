(function () {

    function AdvertisementAnalytics(config) {
        this.config = config;
        this.client = null;
        this.isAsync = true;
        this.uid_cookie = "heatmapuid";
        this.event_name = "advertisement";
        this.content = {};

        //wait for the keen api to be ready
        Keen.ready(function () {
            this.init();
        }.bind(this));
    }


    AdvertisementAnalytics.prototype.init = function () {
        //configure an anonymous uuid if no user id is set.
        if (!this.config.uid) {
            this.initUid();
        }

        //init the keen.io client
        this.initClient();
    };


    /**
     * Init an anonymous uuid if no user id is set
     */
    AdvertisementAnalytics.prototype.initUid = function () {

        //check a sticky cookie for a previously generated uuid or generate a new id
        var uidCookie = Keen.utils.cookie(this.uid_cookie);

        if (uidCookie && !uidCookie.get('uuid') || !uidCookie) {
            this.config.uid = Keen.helpers.getUniqueId();
            uidCookie.set('uuid', this.config.uid);
        } else {
            this.config.uid = uidCookie.get('uuid');
        }
    };

    AdvertisementAnalytics.prototype.initClient = function () {
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
                uid: this.config.uid,
                tenant_id: this.config.tenant_id,
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
    };


    AdvertisementAnalytics.prototype.setContent = function (value) {
        this.content = value;
    };


    AdvertisementAnalytics.prototype.track = function () {
        console.log('Record ADS');
        this.client.recordEvent(this.event_name, {
            content: this.content
        }, function (err, res) {
            console.log(err, res);
        }.bind(this), this.isAsync);
    }

    window.AdvertisementAnalytics = AdvertisementAnalytics;

})();