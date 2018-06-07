var VdyoPlayer = easejs.Class('Stack',
    {
        'private api': null,
        'private video_container': null,
        'private advertisement_container': null,
        'private tracker': null,
        'private timer': null,
        'private _authInterval': false,
        'public isPlaying': false,
        'private _trackerImage': null,
        'private _hasAdBlocker': false,
        'private _config': {
            debug: false,
            video: {},
            logo: null,
            license: null,
            swf: null,
            swfHls: null,
            advertisements: {},
            advertisementsTime: {},
            playingAdvertisement: false,
            loop: false,
            autoplay: false,
            mute: false,
            ratio: false,
            heatmap: {
                enabled: true,
                uid: null,
                delay: 1000,
                project_id: null,
                tenant_id: 0,
                write_api_key: null
            },
            popup: true,
            container: null,
            promotingUserToContinue: false
        },

        __construct: function (config) {
            flowplayer.extend(this._config, config);
            this.trackTimer = new Timer(5000, this._ping.bind(this));

            if (typeof fuckAdBlock !== 'undefined') {
                fuckAdBlock.on(true, function () {
                    this._hasAdBlocker = true;
                    this._log('adblocker is enabled');
                }.bind(this));
            }
        },

        'public setContent': function (data) {
            console.log(data);
            this._config.content = data;

            //this._config.content = {url: url, id: content_id, creator: creator, type: type};
            this._config.content.parent = null;
        },

        'public setParent': function (type, id) {
            this._config.content.parent = {type: type, id: id};
        },

        'public addAdvertisement': function (data, type) {
            this._config.advertisements[type] = data;
        },

        'public setAdvertisement': function (advertisementData) {
            this._config.advertisements = {};

            if (advertisementData.pre_roll) {
                this.addAdvertisement(advertisementData, 'pre');
            }

            if (advertisementData.mid_roll) {
                this.addAdvertisement(advertisementData, 'mid');
            }

            if (advertisementData.post_roll) {
                this.addAdvertisement(advertisementData, 'post');
            }
        },

        'public removeAdvertisements': function () {
            this._config.advertisements = {};
        },

        'public play': function () {
            var self = this;
            if (!self._config.content.url) {
                throw new Error('No video is set.');
            }

            var vdyoplayers =
                '   <div class="vdyoplayer mainPlayer">' +
                // '       <div class="fp-context-menu">' +
                // '           <ul><li>&copy; VDYO Pty Ltd</li></ul>' +
                // '       </div>' +
                // '           <div class="popup-wrapper" style="">' +
                // '               <div class="fp-waiting">Loading</div>' +
                // '               <div class="valign-center">' +
                // '                   <div class="popup">' +
                // '                       <div class="popup-body">' +
                // '                           <h3>Keep Viewing.</h3>' +
                // '                           <p>Pick up from where you last left off.</p>' +
                // '                       </div>' +
                // '                       <div class="popup-footer">' +
                // '                           <a href="#" class="btn-success continue">Resume</a>' +
                // '                           <a href="#" class="btn-cancel startover">Start Over</a>' +
                // '                       </div>' +
                // '                   </div>' +
                // '               </div>' +
                // '       </div>' +
                '   </div>' 
                ;
                //'   <div class="vdyoplayer adsPlayer" style="">' +
                // '       <div class="fp-context-menu"><ul><li>&copy; VDYO Pty Ltd</li></ul></div>' +
                //'       <div class="skip-btn"></div>' +
                //'   </div>';

            if (!self._config.container) {
                $.magnificPopup.open({
                    closeBtnInside: false,
                    closeOnBgClick: false,
                    items: {
                        src: '<div class="player-container">' + vdyoplayers + '</div>',
                        type: 'inline'
                    },
                    callbacks: {
                        open: function () {
                            self._setupPlayer(this.wrap);
                        },
                        beforeClose: function () {
                            self.player.shutdown();
                        }
                    }
                });
            } else {
                self._config.container.html(vdyoplayers);
                self._setupPlayer(self._config.container);
            }
        },

        'private _setupPlayer': function (container) {
            var self = this;
            setTimeout(function () {
                self.video_container = container.find('.mainPlayer');
                //self.advertisement_container = container.find('.adsPlayer');

                self.player = self._buildPlayer(self.video_container, self._config.content.url, self._config.logo);
                self._setupHeatmap(self.player);
                self._setupPlayerEvent(self.player);
            }, 100);
        },

        'private _startPing': function () {
            this._log('_startPing');

            this.trackTimer.start();
        },

        'private _stopPing': function () {
            this._log('_stopPing');

            this.trackTimer.stop();
        },

        'private _ping': function () {
            var self = this;

            // var pingData = btoa(encodeURIComponent(JSON.stringify({
            //         video: self._config.content.id,
            //         createor: self._config.content.creator,
            //         tenant: self._config.heatmap.tenant_id,
            //         type: self._config.content.type,
            //         parent: self._config.content.parent,
            //         time: (new Date()).toISOString(),
            //         uid: self._config.heatmap.enabled ? self.tracker.config.uid : self._config.heatmap.uid,
            //         playing: self.player.playing,
            //         pTime: self.player.video.time ? self.player.video.time : 0,
            //         finished: (self.player.video.duration - self.player.video.time) < 10
            //     })
            //     .replace(/%([0-9A-F]{2})/g, function (match, p1) {
            //         return String.fromCharCode('0x' + p1);
            //     })));

            // this._trackerImage = new Image();
            // this._trackerImage.src = '/hls/ping?v=' + pingData;
            // this._trackerImage = null;
        },

        'private _setupHeatmap': function (player) {
            var self = this;
            self.timer = new Timer(self._config.heatmap.delay, self._track.bind(self));

            // self.advertisementAnalytics = new AdvertisementAnalytics({
            //     project_id: self._config.heatmap.project_id,
            //     write_api_key: self._config.heatmap.write_api_key,
            //     uid: self._config.heatmap.uid,
            //     tenant_id: self._config.heatmap.tenant_id
            // });



            if (self._config.heatmap.enabled) {

                self.tracker = new HeatmapTracker(self._config.heatmap);
                self.tracker.setContent(self._config.content);
                self.tracker.setContentParent(self._config.content.parent);
            }
        },

        'private _track': function (isTriggeredByTimer, trackPaused) {
            var self = this;

            if (self._config.heatmap.enabled && self.player.video.duration) {
                if (self.player.playing === false && trackPaused !== true) {
                    return self.timer.stop();
                } else if (isTriggeredByTimer && ((self.player.video.duration - self.player.video.time) * 1000 <= self._config.heatmap.delay + 100)) {
                    return self.timer.stop();
                }

                if (self.player.video.time > 0) {
                    self.tracker.track(self.player.video.time);
                }
            }
        },

        'private _syncTrack': function (e) {
            e.preventDefault();

            this.tracker.setBeacon(true);
            this._track();

            // close popup
            try {
                if ($.magnificPopup.instance.isOpen) {
                    $.magnificPopup.instance.close();
                }
            } catch (e) {}
        },

        'private _setupPlayerEvent': function (api) {
            var self = this;
            // var loading = self.video_container.find('.fp-waiting');

            if (api.engine && api.engine.engineName == "hlsjs") {
                // api.engine.hlsjs.on('hlsManifestLoaded', self._ping.bind(this));
                // api.engine.hlsjs.on('hlsFragChanged', self._ping.bind(this));
                api.engine.hlsjs.config.xhrSetup = function (xhr, url) {
                    xhr.setRequestHeader('uuid', self._config.heatmap.enabled ? self.tracker.config.uid : self._config.heatmap.uid);
                };
            } else {
                // self._ping();
            }

            api
                .on("ready", function (arg, api, video) {
                    self._log(api.engine.engineName + " engine playing " + video.type);


                    if (self._config.advertisements['pre']) {
                        self._config.advertisementsTime[0] = 'pre';
                    }

                    if (self._config.advertisements['mid']) {
                        self._config.advertisementsTime[Math.round(api.video.duration / 2)] = 'mid';
                    }

                    if (self._config.advertisements['post']) {
                        self._config.advertisementsTime[Math.round((api.video.duration / 2 + api.video.duration / 2.2))] = 'post';
                    }


                    self._promptUserToContinue(self.video_container, api, function () {
                        //self._playAdvertisement(api, 0)
                    });


                    if (self._config.heatmap.enabled) {
                        self.tracker.setStartOffset(0);
                        self.tracker.setVideoDuration(video.duration);
                        self._setBrowserEvent(true);
                    }
                })
                .on("resume", function () {
                    // Resume headmap timer
                    self.timer.start();
                    self._startPing();
                    self.isPlaying = true;
                    // loading.hide();
                })
                .on("pause", function () {
                    // Pause headmap timer and update

                    self.timer.stop();
                    self._track(null, true);
                    self.isPlaying = false;
                })
                .on("seek", function (arg, api, time) {
                    // Pause headmap timer and update
                    if (api.paused === false) {
                        self.timer.start();
                    }

                    if (self._config.heatmap.enabled) {
                        self.tracker.setStartOffset(time);
                    }
                })
                .on("progress", function (e, api) {
                    // loading.hide();
                    if (Math.round(arguments[2]) > 2) {

                        //self._playAdvertisement(api, Math.round(arguments[2]));
                    }
                })
                .on("buffer", function () {
                    // loading.show();
                })

                .on("finish", function () {
                    // Pause headmap timer and update
                    self.timer.stop();
                    self.isPlaying = false;

                    for (var advertisementTime in self._config.advertisementsTime) {
                        delete self._config.advertisementsTime[advertisementTime];
                    }

                    //reset start offset when finish
                    if (self._config.heatmap.enabled) {
                        self.tracker.setStartOffset(0);
                        self._setBrowserEvent(false);
                    }

                    self._stopPing();


                    try {
                        if ($.magnificPopup.instance.isOpen) {
                            setTimeout(function () {
                                $.magnificPopup.instance.close()
                            }, 500);
                        }
                    } catch (e) {}


                }).on("hlsLevelSwitch", function (e, api, data) {
                    var level = api.engine.hlsjs.levels[data.level];

                    console.log("level index:", data.level);
                    console.log("width:", level.width, "height:", level.height);
                })

                .on("shutdown unload", function () {
                    self.timer.stop();
                    self._stopPing();
                    self._setBrowserEvent(false);
                    self.isPlaying = false;

                    try {
                        self.player.ready = false;
                        //var adApi = flowplayer(self.advertisement_container);
                        //adApi.shutdown();
                    } catch (e) {
                    }
                })

                .on('error', function () {
                    self._stopPing();
                    self.timer.stop();
                    api.pause();

                    var error = arguments[2];
                    switch (error.code) {
                        case 5:
                        case 10:
                            error.message = "Unsupported Browser, Please use another browser";
                            break;
                        case 403:
                            error.message = "You are unauthorized to play this video";
                            break;
                        default:
                            if (!error.message) {
                                error.message = "Something went wrong. Error: " + error.code;
                            }
                    }

                    self.video_container.find('.fp-message').html(
                        '<div>' +
                        '   <div class="text">' +
                        '       <h1>Oops!</h1>' +
                        '       <h3>' + error.message + '</h3>' +
                        '   </div>' +
                        '</div>'
                    );
                });
        },

        'private _promptUserToContinue': function (container, player, callback) {

            // var popup = container.find('.popup');
            // // var loading = container.find('.fp-waiting');
            var self = this;

            // self._config.promotingUserToContinue = true;
            // player.pause();

            // container.find('.popup-wrapper').show();
            // // loading.show();
            // popup.hide();

            // if (player.engine && player.engine.engineName == "hlsjs") {
            //     player.engine.hlsjs.stopLoad();
            // }

            // $.post('/hls/continue', $.param({
            //     content_type: this._config.content.type,
            //     content_id: this._config.content.id
            // }))
            //     .done(function (result) {
            //         if (result.previously_watched) {
            //             popup.show();
            //             // loading.hide();

            //             popup.find('.continue').on('click', function (e) {
            //                 e.preventDefault();
            //                 delete self._config.advertisementsTime[0];
            //                 popup.hide();
            //                 // loading.show();

            //                 if (player.engine && player.engine.engineName == "hlsjs") {
            //                     player.engine.hlsjs.startLoad();
            //                 }

            //                 player.seek(result.time, function (e, api) {
            //                     container.find('.popup-wrapper').hide();

            //                     api.resume();
            //                     self._config.promotingUserToContinue = false;
            //                 });
            //             });

            //             popup.find('.startover').on('click', function (e) {
            //                 e.preventDefault();


            //                 if (player.engine && player.engine.engineName == "hlsjs") {
            //                     player.engine.hlsjs.startLoad();
            //                 }


            //                 self._config.promotingUserToContinue = false;
            //                 container.find('.popup-wrapper').hide();

            //                 if (!self._config.advertisementsTime[0]) {
            //                     player.resume();
            //                 }

            //                 callback();
            //             });
            //         } else {

            //             if (player.engine && player.engine.engineName == "hlsjs") {
            //                 player.engine.hlsjs.startLoad();
            //             }

            //             container.find('.popup-wrapper').hide();

            //             self._config.promotingUserToContinue = false;
            //             if (!self._config.advertisementsTime[0]) {
            //                 player.resume();
            //             }

            //             callback();
            //         }
            //     })
            //     .fail(function () {
            //         self._config.promotingUserToContinue = false;


            //         if (player.engine && player.engine.engineName == "hlsjs") {
            //             player.engine.hlsjs.startLoad();
            //         }


            //         if (!self._config.advertisementsTime[0]) {
            //             player.resume();
            //         }

            //         callback();
            //         container.find('.popup-wrapper').hide();
            //     })


            self._config.promotingUserToContinue = false;
            container.find('.popup-wrapper').hide();


            if (player.engine && player.engine.engineName == "hlsjs") {
                player.engine.hlsjs.startLoad();
            }


            if (!self._config.advertisementsTime[0]) {
                player.resume();
            }

            callback();

        },

        /*'private _playAdvertisement': function (api, time) {
            var type = false;
            var self = this;

            for (var advertisementTime in this._config.advertisementsTime) {
                if (this.player.video.time - advertisementTime >= 0) {
                    type = this._config.advertisementsTime[advertisementTime];
                    delete this._config.advertisementsTime[advertisementTime];
                }
            }

            if (type) {
                console.log('ads type', self._config.advertisements[type].url);
                var resumed = false;
                var adPlayer = self._buildPlayer(self.advertisement_container, self._config.advertisements[type].url, null, true);

                if (type == 'pre') {
                    self.player.pause();
                    self._resumeAdvertisment(adPlayer);
                } else {
                    self.advertisement_container.css('top', '-99999em');
                }

                adPlayer
                    .on("progress", function () {
                        // var loading = self.video_container.find('.fp-waiting');
                        // loading.hide();

                        if (!adPlayer) {
                            return;
                        }

                        if (type != 'pre' && !resumed && Math.round(arguments[2]) === 0) {
                            resumed = true;
                            self._resumeAdvertisment(adPlayer);
                        }

                        if (type == 'pre' && self.player.playing && self.player.ready) {
                            self.player.pause();
                        }

                        try {
                            // show skip button
                            if (Math.round(adPlayer.video.duration / 2.5) < arguments[2]) {
                                self.advertisement_container.find('.skip-btn')
                                    .css('padding', '0 60px')
                                    .on('click', function (e) {
                                        if (!adPlayer) {
                                            return;
                                        }

                                        e.preventDefault();
                                        adPlayer.shutdown();
                                    });
                            }
                        } catch (error) {

                        }
                    })
                    .on("buffer", function () {
                        // var loading = self.video_container.find('.fp-waiting');
                        // loading.show();
                    })
                    .on("beforeseek", function (e) {
                        e.preventDefault();
                    })
                    .on("finish error shutdown", function () {
                        // self.advertisementAnalytics.setContent(self._config.advertisements[type]);
                        // self.advertisementAnalytics.track();
                        delete self._config.advertisements[type];

                        if ((self.player.video.duration - self.player.video.time) > 0) {
                            self.player.resume();
                        }

                        adPlayer = null;
                        self.video_container.css('top', '-100%');
                        //self.advertisement_container.css('position', 'inherit');
                        //self.advertisement_container.html('');
                        //self.advertisement_container.removeClass("flowplayer is-mouseout is-ready is-paused is-paused is-fullscreen");
                        self._config.playingAdvertisement = false;
                        //self.advertisement_container.find('.skip-btn').css('padding', '0');

                    });
            }
        },*/

        'private _resumeAdvertisment': function (adApi, pre) {
            this._config.playingAdvertisement = true;

            // hide and pause the main player
            this.video_container.css('top', '-99999em');
            if (this.player.playing && this.player.ready) {
                this.player.pause();
            }

            // make advertisement player visible
            //this.advertisement_container.css('top', '-100%');

            // explicitly set advertisement player to full screen mode if the main player is in full screen mode
            /*if (this.player.isFullscreen) {
                this.advertisement_container.addClass('is-fullscreen').css('position', 'absolute');
            }*/

            // set volume to advertisement player
            adApi.volume(this.player.volumeLevel);

            // disable seek
            /*this.advertisement_container.removeClass("is-touch");
            $(".fp-buffer, .fp-progress", this.advertisement_container).on("mousedown touchstart", function (e) {
                e.stopPropagation();
            });*/
        },

        'private _buildPlayer': function (container, source, logo, autoplay) {
            var hlsjs = {
                recover: -1,
                debug: false,
                defaultAudioCodec: "mp4a.40.2",
                startFragPrefetch: true,
                levelLoadingTimeOut : 20000,
                levelLoadingMaxRetry : 10,
                levelLoadingRetryDelay : 500,
                fragLoadingTimeOut : 30000,
                fragLoadingMaxRetry : 10,
                startLevel: 0
            };

            container.flowplayer({
                hlsjs: hlsjs,
                logo: logo ? logo : null,
                key: this._config.license,
                flashfit: true,
                advance: true,
                muted: true,
                brand: {
                    text: "VDYO",
                    showOnOrigin: false
                },
                embed: false,
                autoplay: false,
                // autoplay: autoplay ? autoplay : false,
                adaptiveRatio: true,
                fullscreen: true,
                native_fullscreen: true,
                swfHls: this._config.swfHls,
                swf: this._config.swf,
                ima: {
                    // adverts configuration
                    ads: [{
                      // mandatory: schedule ad time
                      // here: 3 seconds into the video
                      time: 0,
                      // request an advert with an adTag URL
                      //adTag: 'http://ab168640.adbutler-zilon.com/vast.spark?setID=4015&ID=168640&pid=27614'
                      //adTag: 'http://localhost/sokil/index.php'
                      adTag: 'http://45.76.125.33/player/sokil/index.php'
                    }
                    ],
                    
                  },
                customPlaylist: true,
                // adverts in embedded player with iframe embedding
                embed: {
                   iframe: "//flowplayer.org/standalone/vast/preroll-iframe.html"
                },
                clip: {
                    hlsQualities: true,
                    autoplay: false,
                    // autoplay: autoplay ? autoplay : false,
                    hlsjs: {
                        defaultAudioCodec: "mp4a.40.2"
                    },
                    sources: [{
                        type: "application/x-mpegurl",
                        src: source
                    }]
                }
            });

            // container.find('.fp-waiting').text('Loading');

            flowplayer.conf.fullscreen = true;

            return flowplayer(container);
            //return null;
        },

        'private _setBrowserEvent': function (sendBeacon) {
            if (this._config.heatmap.enabled) {
                if (sendBeacon) {
                    window.addEventListener('unload', this._syncTrack.bind(this), false);
                } else {
                    window.removeEventListener('unload', this._syncTrack.bind(this), false);
                }
            }
        },

        'private _log': function (log, data) {
            if (this._config.debug) {
                if (data) {
                    log = log + " " + JSON.stringify(data, null, 4);
                }

                console.log("VdyoPlayer: " + log);
            }
        },

        'private _hasFlash': function () {
            var hasFlash = false;
            try {
                var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if (fo) {
                    hasFlash = true;
                }
            } catch (e) {
                if (navigator.mimeTypes
                    && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
                    && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
                    hasFlash = true;
                }
            }

            return hasFlash;
        }
    });
