var VdyoPlayer = easejs.Class('Stack',
    {
        'private api': null,
        'private video_container': null,
        'private video_container_id': null,
        'private advertisement_container': null,
        'private tracker': null,
        'private timer': null,
        'private _authInterval': false,
        'public isPlaying': false,
        'private _trackerImage': null,
        'private _hasAdBlocker': false,
        'private _videos': [],
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
                delay: 10000,
                project_id: null,
                tenant_id: 0,
                write_api_key: null,
                on_site: true
            },
            popup: true,
            container: null,
            promotingUserToContinue: false,
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

            this.video_container_id = 'vdyo_' + String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now();
        },

        'public setContent': function (data) {
            this._config.content = data;

            //this._config.content = {url: url, id: content_id, creator: creator, type: type};
            this._config.content.parent = null;
            this.removeAdvertisements();
        },

        'public setDelay': function (delay) {
          this._config.heatmap.delay = delay;
        },

        'public setParent': function (type, id) {
            this._config.content.parent = { type: type, id: id };
        },

        'public addAdvertisement': function (data, type) {
            this._config.advertisements[ type ] = data;
        },

        'public setAdvertisements': function (advertisementData) {
            var self = this;
            self._config.advertisements = [];
            //advertisementData = Array.isArray(advertisementData) ? advertisementData : [advertisementData];
            var details = advertisementData.vast_xml;

            details.forEach(function(data, index) {

                if (data.position == "pre_roll") {
                  self._config.advertisements.push({
                    time: 0,
                    adTag: data.xml
                  });

                } else if(data.position == "mid_roll") {
                  self._config.advertisements.push({
                    time: Math.round((self._config.content.length / 2) * 0.001), //convert from ms to sec
                    adTag: data.xml
                  });

                } else if(data.position == "post_roll") {
                  self._config.advertisements.push({
                    time: -1,
                    adTag: data.xml
                  });
                }
            })
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
                '   <div class="vdyoplayer ' + self.video_container_id + '">' +
                '       <div class="fp-context-menu">' +
                '           <ul><li>&copy; VDYO Pty Ltd</li></ul>' +
                '       </div>' +
                '           <div class="popup-wrapper" style="display: none">' +
                '               <div class="fp-waiting">Loading</div>' +
                '               <div class="valign-center">' +
                '                   <div class="popup">' +
                '                       <div class="popup-body">' +
                '                           <h3>Keep Viewing.</h3>' +
                '                           <p>Pick up from where you last left off.</p>' +
                '                       </div>' +
                '                       <div class="popup-footer">' +
                '                           <a href="#" class="btn-success continue">Resume</a>' +
                '                           <a href="#" class="btn-cancel startover">Start Over</a>' +
                '                       </div>' +
                '                   </div>' +
                '               </div>' +
                '       </div>' +
                '       <div class="skip-btn"></div>' +
                '   </div>';

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
                            $('.player-container').html('');

                            if(self.tracker != null){
                              var data = {
                                finished_at: self.player.video.time
                              };   
                              self.tracker.track(self.player.video.time, data);
                            }
                            
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
                self.video_container = container.find('.' + self.video_container_id);
                self._videos = [];

                // main content
                self._videos.push({
                    content_type: 'main',
                    position: 'main',
                    sources: [ {
                        type: "application/x-mpegurl",
                        src: self._config.content.url
                    }]
                });

                self.player = self._buildPlayer(self.video_container, self._config.logo);
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

            var pingData = btoa(encodeURIComponent(JSON.stringify({
                video: self._config.content.id,
                createor: self._config.content.creator,
                tenant: self._config.heatmap.tenant_id,
                type: self._config.content.type,
                parent: self._config.content.parent,
                time: (new Date()).toISOString(),
                uid: self._config.heatmap.enabled ? self.tracker.config.uid : self._config.heatmap.uid,
                playing: self.player.playing,
                pTime: self.player.video.time ? self.player.video.time : 0,
                finished: (self.player.video.duration - self.player.video.time) < 10
            })
                .replace(/%([0-9A-F]{2})/g, function (match, p1) {
                    return String.fromCharCode('0x' + p1);
                })));

            this._trackerImage = new Image();
            this._trackerImage.src = '/hls/ping?v=' + pingData;
            this._trackerImage = null;
        },

        'private _setupHeatmap': function (player) {
            var self = this; 
            self.timer = new Timer(self._config.heatmap.delay, self._track.bind(self)); 
     
            if (self._config.heatmap.enabled) {
              
              self.advertisementAnalytics = new AdvertisementAnalytics({
                project_id: self._config.heatmap.project_id,
                write_api_key: self._config.heatmap.write_api_key,
                uid: self._config.heatmap.uid,
                tenant_id: self._config.heatmap.tenant_id
              });
 
              self.embedAnalytics = new EmbedVideoAnalytics(self._config.heatmap);
              self.embedAnalytics.setContent(self._config.content);
              self.embedAnalytics.setContentParent(self._config.content.parent);
          
              self.tracker = new HeatmapTracker(self._config.heatmap);
              self.tracker.setContent(self._config.content);
              self.tracker.setContentParent(self._config.content.parent);
         
            }
        },

        'private _getBenchmark': function (currentTime) {
          var self = this,
            video_duration = self.player.video.duration,
            zero_percent = 0,
            twentyfive_percent = Math.round(0.25*video_duration),
            fifty_percent = Math.round(0.50*video_duration),
            seventyfive_percent = Math.round(0.75*video_duration),
            hundred_percent = video_duration - 10,
            data = {};
 
          if(Math.round(currentTime) >= zero_percent && Math.round(currentTime) < twentyfive_percent){
            data = {
              event_type: 'view_benchmark',
              benchmark: '0_percent',
              video_played: currentTime
            };
          } else if(Math.round(currentTime) >= twentyfive_percent && Math.round(currentTime) < fifty_percent){ 
            data = {
              event_type: 'view_benchmark',
              benchmark: '25_percent',
              video_played: currentTime
            };
          } else if(Math.round(currentTime) >= fifty_percent && Math.round(currentTime) < seventyfive_percent){
            data = {
              event_type: 'view_benchmark',
              benchmark: '50_percent',
              video_played: currentTime
            };
          } else if(Math.round(currentTime) >= seventyfive_percent && Math.round(currentTime) < hundred_percent){
            data = {
              event_type: 'view_benchmark',
              benchmark: '75_percent',
              video_played: currentTime
            };
          } else if(Math.round(currentTime) >= hundred_percent){
            data = {
              event_type: 'view_benchmark',
              benchmark: '100_percent',
              video_played: currentTime
            };
          }

          return data;

        },

        'private _track': function (isTriggeredByTimer, trackPaused) {
            var self = this;

            if (self._config.heatmap.enabled && self.player.video.duration) {
                if (self.player.playing === false && trackPaused !== true) {
                    return self.timer.stop();
                } else if (isTriggeredByTimer && ((self.player.video.duration - self.player.video.time) * 1000 <= self._config.heatmap.delay)) {
                    return self.timer.stop();
                }

                if (self.player.video.time >= 0) {
                  var currentTime = self.player.video.time,
                      benchmark = self._getBenchmark(currentTime);
                                    

                  if($.isEmptyObject(benchmark) === false){ 
                     //for video embedded to other site
                    if (self._config.heatmap.on_site === false) {
                      self.embedAnalytics.track(currentTime, benchmark);
                    } else {                      
                      self.tracker.track(currentTime, benchmark); console.log(benchmark);
                    }
                  }                  
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
            } catch (e) { }
        },

        'private _setupPlayerEvent': function (api) {
            var self = this;            

            // var loading = self.video_container.find('.fp-waiting');
            var skip_button = self.video_container.find('.skip-btn');

            if (api.video.content_type === 'main') {
                if (api.engine && api.engine.engineName == "hlsjs") {
                    api.engine.hlsjs.on('hlsManifestLoaded', self._ping.bind(this));
                    api.engine.hlsjs.on('hlsFragChanged', self._ping.bind(this));
                    api.engine.hlsjs.config.xhrSetup = function (xhr, url) {
                        xhr.setRequestHeader('uuid', self._config.heatmap.enabled ? self.tracker.config.uid : self._config.heatmap.uid);
                    };
                } else {
                    self._ping();
                }
            }

            api
                .on("ready", function (arg, api, video) {
                    self._log(api.engine.engineName + " engine playing " + video.type);

                    if (api.video.content_type === 'main') {
                        
                        self._promptUserToContinue(self.video_container, api, function () {
                            // do nothing
                        });

                        if (self._config.heatmap.enabled) {
                            self.tracker.setStartOffset(0);
                            self.tracker.setVideoDuration(video.duration);
                            self._setBrowserEvent(true);
                        }
                    }
                })
                .on("resume", function () {
                    // Resume headmap timer
                    console.log('RESUME', api.video.content_type);
                    if (api.video.content_type === 'main') {
                        self.timer.start();
                        self._startPing();
                        self.isPlaying = true;
                        self.video_container.find('.fp-controls').css('bottom', '0');
                    } else {
                        self.video_container.find('.fp-controls').css('bottom', '-999em');
                    }
                    // loading.hide();
                })
                .on("pause", function () {
                    // Pause headmap timer and update
                    if (api.video.content_type === 'main') {
                        self.timer.stop();
                        self._track(null, true);
                        self.isPlaying = false;
                    }
                })
                .on("seek", function (arg, api, time) {
                    // Pause headmap timer and update
                    if (api.paused === false) {
                        self.timer.start();
                    }

                    if (api.video.content_type === 'main') {
                        if (self._config.heatmap.enabled) {
                            self.tracker.setStartOffset(time);
                        }
                    }
                })
                .on("progress", function (e, api) {
                    try {
                        // show skip button
                        if (api.video.position === 'pre' && api.video.content_type === 'advertisement' && skip_button.is(':visible') === false) {
                            if (Math.round(api.video.duration / 2.5) < arguments[ 2 ]) {
                                skip_button
                                    .css('display', 'inline-block')
                                    .css('padding', '0 60px')
                                    .on('click', function (e) {
                                        if (!api) {
                                            return;
                                        }

                                        e.preventDefault();
                                        
                                        api.play(1);
                                        skip_button.off('click');
                                    });
                            }
                        } else if (api.video.position !== 'pre' && api.video.content_type !== 'advertisement') {
                            skip_button
                                .css('display', 'none')
                                .css('padding', '0')
                                .off('click');
                        }
                    } catch (error) {
                    }
                })
                .on("buffer", function () {
                    // loading.show();
                })

                .on("finish", function () {
                    console.log('FINISH', api.video.position);
                    // Pause headmap timer and update                  
                    
                 
                    self.timer.stop();
                    self.isPlaying = false;

                    //reset start offset when finish
                    if (self._config.heatmap.enabled) {
                      
                      //if played offsite / embedded
                      if (self._config.heatmap.on_site === false) {
                        var data = {
                          finished_at: self.player.video.time
                        };   
                        
                        self.embedAnalytics.track(self.player.video.time, data);
                      }

                    }

                    self.tracker.setStartOffset(0);
                    self._setBrowserEvent(false);
       
                    self._stopPing();

                    try {
                      if(typeof api.ads.postroll !== "undefined"){
                        api.ads.on("ad-postroll-finished", function(e){
                          setTimeout(function () {
                            $.magnificPopup.instance.close()
                          }, 500);
                        });
                      } else {                          
                        if ($.magnificPopup.instance.isOpen) {
                          setTimeout(function () {
                              $.magnificPopup.instance.close()
                          }, 500);
                        }                          
                      }
                    } catch (e) { }
                    
                }).on("hlsLevelSwitch", function (e, api, data) {
                    var level = api.engine.hlsjs.levels[ data.level ];

                    console.log("level index:", data.level);
                    console.log("width:", level.width, "height:", level.height);
                    
                })

                .on("shutdown unload", function () {
                  
                    self.timer.stop();
                    self._stopPing();
                    self._setBrowserEvent(false);
                    self.isPlaying = false;
                })

                .on('error', function () {
                    self._stopPing();
                    self.timer.stop();
                    api.pause();

                    var error = arguments[ 2 ];
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
            var popup = container.find('.popup-wrapper');
            // var loading = container.find('.fp-waiting');
            var self = this;

            self._config.promotingUserToContinue = true;

            //don't stop the video if has advertisement
            if($.isEmptyObject(self._config.advertisements) !== false){
              player.resume(); 
            } else {
              player.pause();
            }       
            
            $.post('/hls/continue', $.param({
                content_type: this._config.content.type,
                content_id: this._config.content.id
            }))
            .done(function (result) { 
                if (result.previously_watched === true) { 
                    if($.isEmptyObject(self._config.advertisements) !== false){
                      player.resume();
                      player.ads.on("ad-completed", function (e, api, err) {
                            popup.show();
                      });
                    } else {
                      popup.show();
                    }
                    // loading.hide();

                    popup.find('.continue').on('click', function (e) {
                        e.preventDefault();
                        delete self._config.advertisementsTime[0];
                        popup.hide();
                        // loading.show();

                        if (player.engine && player.engine.engineName == "hlsjs") {
                            player.engine.hlsjs.startLoad();
                        }

                        player.seek(result.time, function (e, api) {
                            container.find('.popup-wrapper').hide();

                            api.resume();
                            self._config.promotingUserToContinue = false;
                        });
                    });

                    popup.find('.startover').on('click', function (e) {
                        e.preventDefault();

                        if (player.engine && player.engine.engineName == "hlsjs") {
                            player.engine.hlsjs.startLoad();
                        }

                        self._config.promotingUserToContinue = false;
                        container.find('.popup-wrapper').hide();
                        player.resume();

                        callback();
                    });
                } else {
                    if (player.engine && player.engine.engineName == "hlsjs") {
                        player.engine.hlsjs.startLoad();
                    }

                    self._config.promotingUserToContinue = false;
                    container.find('.popup-wrapper').hide();

                    player.resume();

                    callback();
                }
            })
            .fail(function () {
                self._config.promotingUserToContinue = false;

                if (player.engine && player.engine.engineName == "hlsjs") {
                    player.engine.hlsjs.startLoad();
                }

                player.resume();
                callback();
                container.find('.popup-wrapper').hide();
            })

            self._config.promotingUserToContinue = false;
            container.find('.popup-wrapper').hide();


            if (player.engine && player.engine.engineName == "hlsjs") {
                player.engine.hlsjs.startLoad();
            }
            

            callback();

        },

        'private _buildPlayer': function (container, logo, autoplay) {
            var hlsjs = {
                recover: -1,
                debug: false,
                defaultAudioCodec: "mp4a.40.2",
                startFragPrefetch: true,
                levelLoadingTimeOut: 20000,
                levelLoadingMaxRetry: 10,
                levelLoadingRetryDelay: 500,
                fragLoadingTimeOut: 30000,
                fragLoadingMaxRetry: 10,
                startLevel: 0
            };
            
            var ads = ($.isEmptyObject(this._config.advertisements) === false)? this._config.advertisements : [];
            var playerConfig = {
                hlsjs: hlsjs,
                logo: logo ? logo : null,
                key: this._config.license,
                flashfit: true,
                advance: true,
                muted: this._config.mute,
                ima: {ads: ads},
                brand: {
                    text: "VDYO",
                    showOnOrigin: false
                },
                embed: false,
                // autoplay: this._config.autoplay,
                autoplay: true,
                adaptiveRatio: true,
                fullscreen: true,
                native_fullscreen: true,
                swfHls: this._config.swfHls,
                swf: this._config.swf,
                clip: {
                    hlsQualities: true,
                    // autoplay: this._config.autoplay,
                    autoplay: false,
                    hlsjs: {
                        defaultAudioCodec: "mp4a.40.2"
                    },
                    sources: []
                }
            };

            console.log('video length', Object.keys(this._videos).length === 1);
            console.log(this._videos);
            console.log(playerConfig);

            if (Object.keys(this._videos).length === 1) {
                playerConfig.clip.sources = [{
                    type: "application/x-mpegurl",
                    src: this._videos[0].sources[0].src,
                    content_type: 'main',
                    position: 'main'
                }];
            } else {
                playerConfig.playlist = this._videos
            }

            container.flowplayer(playerConfig);

            flowplayer.conf.fullscreen = true;
            console.log(flowplayer(container));
            return flowplayer(container);
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
                    && navigator.mimeTypes[ 'application/x-shockwave-flash' ] != undefined
                    && navigator.mimeTypes[ 'application/x-shockwave-flash' ].enabledPlugin) {
                    hasFlash = true;
                }
            }

            return hasFlash;
        }
    });
