! function(e) {
    function n(i) {
        if (t[i]) return t[i].exports;
        var o = t[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(o.exports, o, o.exports, n), o.loaded = !0, o.exports
    }
    var t = {};
    return n.m = e, n.c = t, n.p = "", n(0)
}([function(e, n, t) {
    t(21), e.exports = t(25)
}, function(e, n, t) {
    "use strict";
    var i = t(7)();
    e.exports = function(e) {
        return e !== i && null !== e
    }
}, function(e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var t = "adPlaying",
        i = "adPaused",
        o = "adFinished",
        a = "adCollapsed";
    n.AD_PLAYING = t, n.AD_PAUSED = i, n.AD_FINISHED = o, n.AD_COLLAPSED = a
}, function(e, n) {
    "use strict";

    function t(e) {
        return e = parseInt(e, 10), e >= 10 ? e : "0" + e
    }

    function i(e) {
        e = e || 0;
        var n = Math.floor(e / 3600),
            i = Math.floor(e / 60);
        return e -= 60 * i, n >= 1 ? (i -= 60 * n, n + ":" + t(i) + ":" + t(e)) : t(i) + ":" + t(e)
    }
    Object.defineProperty(n, "__esModule", {
        value: !0
    }), n.format = i
}, function(e, n) {
    "use strict";
    e.exports = function() {
        var e = [];
        return e.toString = function() {
            for (var e = [], n = 0; n < this.length; n++) {
                var t = this[n];
                t[2] ? e.push("@media " + t[2] + "{" + t[1] + "}") : e.push(t[1])
            }
            return e.join("")
        }, e.i = function(n, t) {
            "string" == typeof n && (n = [
                [null, n, ""]
            ]);
            for (var i = {}, o = 0; o < this.length; o++) {
                var a = this[o][0];
                "number" == typeof a && (i[a] = !0)
            }
            for (o = 0; o < n.length; o++) {
                var r = n[o];
                "number" == typeof r[0] && i[r[0]] || (t && !r[2] ? r[2] = t : t && (r[2] = "(" + r[2] + ") and (" + t + ")"), e.push(r))
            }
        }, e
    }
}, function(e, n, t) {
    "use strict";
    var i, o, a, r, s, l, f, d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        c = t(6),
        u = t(16),
        p = Function.prototype.apply,
        v = Function.prototype.call,
        g = Object.create,
        m = Object.defineProperty,
        y = Object.defineProperties,
        h = Object.prototype.hasOwnProperty,
        b = {
            configurable: !0,
            enumerable: !1,
            writable: !0
        };
    i = function(e, n) {
        var t;
        return u(n), h.call(this, "__ee__") ? t = this.__ee__ : (t = b.value = g(null), m(this, "__ee__", b), b.value = null), t[e] ? "object" === d(t[e]) ? t[e].push(n) : t[e] = [t[e], n] : t[e] = n, this
    }, o = function(e, n) {
        var t, o;
        return u(n), o = this, i.call(this, e, t = function() {
            a.call(o, e, t), p.call(n, this, arguments)
        }), t.__eeOnceListener__ = n, this
    }, a = function(e, n) {
        var t, i, o, a;
        if (u(n), !h.call(this, "__ee__")) return this;
        if (t = this.__ee__, !t[e]) return this;
        if (i = t[e], "object" === ("undefined" == typeof i ? "undefined" : d(i)))
            for (a = 0; o = i[a]; ++a) o !== n && o.__eeOnceListener__ !== n || (2 === i.length ? t[e] = i[a ? 0 : 1] : i.splice(a, 1));
        else i !== n && i.__eeOnceListener__ !== n || delete t[e];
        return this
    }, r = function(e) {
        var n, t, i, o, a;
        if (h.call(this, "__ee__") && (o = this.__ee__[e]))
            if ("object" === ("undefined" == typeof o ? "undefined" : d(o))) {
                for (t = arguments.length, a = new Array(t - 1), n = 1; n < t; ++n) a[n - 1] = arguments[n];
                for (o = o.slice(), n = 0; i = o[n]; ++n) p.call(i, this, a)
            } else switch (arguments.length) {
                case 1:
                    v.call(o, this);
                    break;
                case 2:
                    v.call(o, this, arguments[1]);
                    break;
                case 3:
                    v.call(o, this, arguments[1], arguments[2]);
                    break;
                default:
                    for (t = arguments.length, a = new Array(t - 1), n = 1; n < t; ++n) a[n - 1] = arguments[n];
                    p.call(o, this, a)
            }
    }, s = {
        on: i,
        once: o,
        off: a,
        emit: r
    }, l = {
        on: c(i),
        once: c(o),
        off: c(a),
        emit: c(r)
    }, f = y({}, l), e.exports = n = function(e) {
        return null == e ? g(f) : y(Object(e), l)
    }, n.methods = s
}, function(e, n, t) {
    "use strict";
    var i, o = t(8),
        a = t(15),
        r = t(11),
        s = t(18);
    i = e.exports = function(e, n) {
        var t, i, r, l, f;
        return arguments.length < 2 || "string" != typeof e ? (l = n, n = e, e = null) : l = arguments[2], null == e ? (t = r = !0, i = !1) : (t = s.call(e, "c"), i = s.call(e, "e"), r = s.call(e, "w")), f = {
            value: n,
            configurable: t,
            enumerable: i,
            writable: r
        }, l ? o(a(l), f) : f
    }, i.gs = function(e, n, t) {
        var i, l, f, d;
        return "string" != typeof e ? (f = t, t = n, n = e, e = null) : f = arguments[3], null == n ? n = void 0 : r(n) ? null == t ? t = void 0 : r(t) || (f = t, t = void 0) : (f = n, n = t = void 0), null == e ? (i = !0, l = !1) : (i = s.call(e, "c"), l = s.call(e, "e")), d = {
            get: n,
            set: t,
            configurable: i,
            enumerable: l
        }, f ? o(a(f), d) : d
    }
}, function(e, n) {
    "use strict";
    e.exports = function() {}
}, function(e, n, t) {
    "use strict";
    e.exports = t(9)() ? Object.assign : t(10)
}, function(e, n) {
    "use strict";
    e.exports = function() {
        var e, n = Object.assign;
        return "function" == typeof n && (e = {
            foo: "raz"
        }, n(e, {
            bar: "dwa"
        }, {
            trzy: "trzy"
        }), e.foo + e.bar + e.trzy === "razdwatrzy")
    }
}, function(e, n, t) {
    "use strict";
    var i = t(12),
        o = t(17),
        a = Math.max;
    e.exports = function(e, n) {
        var t, r, s, l = a(arguments.length, 2);
        for (e = Object(o(e)), s = function(i) {
                try {
                    e[i] = n[i]
                } catch (e) {
                    t || (t = e)
                }
            }, r = 1; r < l; ++r) n = arguments[r], i(n).forEach(s);
        if (void 0 !== t) throw t;
        return e
    }
}, function(e, n) {
    "use strict";
    e.exports = function(e) {
        return "function" == typeof e
    }
}, function(e, n, t) {
    "use strict";
    e.exports = t(13)() ? Object.keys : t(14)
}, function(e, n) {
    "use strict";
    e.exports = function() {
        try {
            return Object.keys("primitive"), !0
        } catch (e) {
            return !1
        }
    }
}, function(e, n, t) {
    "use strict";
    var i = t(1),
        o = Object.keys;
    e.exports = function(e) {
        return o(i(e) ? Object(e) : e)
    }
}, function(e, n, t) {
    "use strict";
    var i = t(1),
        o = Array.prototype.forEach,
        a = Object.create,
        r = function(e, n) {
            var t;
            for (t in e) n[t] = e[t]
        };
    e.exports = function(e) {
        var n = a(null);
        return o.call(arguments, function(e) {
            i(e) && r(Object(e), n)
        }), n
    }
}, function(e, n) {
    "use strict";
    e.exports = function(e) {
        if ("function" != typeof e) throw new TypeError(e + " is not a function");
        return e
    }
}, function(e, n, t) {
    "use strict";
    var i = t(1);
    e.exports = function(e) {
        if (!i(e)) throw new TypeError("Cannot use null or undefined");
        return e
    }
}, function(e, n, t) {
    "use strict";
    e.exports = t(19)() ? String.prototype.contains : t(20)
}, function(e, n) {
    "use strict";
    var t = "razdwatrzy";
    e.exports = function() {
        return "function" == typeof t.contains && (t.contains("dwa") === !0 && t.contains("foo") === !1)
    }
}, function(e, n) {
    "use strict";
    var t = String.prototype.indexOf;
    e.exports = function(e) {
        return t.call(this, e, arguments[1]) > -1
    }
}, function(e, n) {
    "use strict";
    var t = Object.assign || function(e) {
        for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        }
        return e
    };
    window.flowplayer_ima = t({}, window.flowplayer_ima, {
        conf: function(e) {
            var n = document.querySelectorAll("script"),
                t = n[n.length - 1],
                i = window.jQuery(t).closest(".flowplayer,.fp-playlist a");
            i.data("ima", e)
        }
    })
}, function(e, n, t) {
    "use strict";

    function i(e) {
        var n = document.createElement("div");
        return e.on("progress", function(e, t, i) {
            var o = document.createEvent("CustomEvent");
            n.currentTime = i, o.initCustomEvent("timeupdate", !1, !1, {}), n.dispatchEvent(o)
        }), n
    }
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var o = Object.assign || function(e) {
        for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        }
        return e
    };
    n.default = function(e) {
        flowplayer(function(n, t) {
            function l() {
                return X && X.isLinear() && !X.getContentType().indexOf("image/")
            }

            function d(e) {
                I("initializeAdContainer");
                var o = B.querySelector("video.fp-engine") || i(n),
                    r = new p(me, o);
                r.initialize(), J = new v(r), J.getSettings().setVpaidMode("undefined" != typeof e.VpaidMode ? e.VpaidMode : b.ENABLED);
                var s = "undefined" != typeof e.Redirects ? e.Redirects : "undefined" != typeof e.redirects ? e.redirects : 4;
                J.getSettings().setNumRedirects(s), Object.keys(y).forEach(function(e) {
                    J.addEventListener(y[e], function(t) {
                        n.trigger("ima_ad_error", [n, {
                            code: t.getError().getErrorCode(),
                            message: t.getError().getMessage()
                        }]), I("Error event: " + e + ", " + t.getError().getErrorCode() + ", " + t.getError().toString())
                    })
                }), J.addEventListener(h, function(i) {
                    var r = new m,
                        s = function(e) {
                            te = e, W.emit("ad-playback-state", te), G.toggleClass(t, "is-playing", te == a.AD_PLAYING), G.toggleClass(t, "is-paused", te == a.AD_PAUSED)
                        },
                        f = function() {
                            if (clearInterval(ne), !X) return void n.off("beforeseek.vast");
                            var e = X.getAdPodInfo();
                            X = null, e.getAdPosition() === e.getTotalAds() ? (s(a.AD_FINISHED), setTimeout(function() {
                                n.off("beforeseek.vast"), $ && (n.off("progress.vastpause"), n.on("finish.vast", A), H(), $ = !1, (n.live || n.finished) && U(n.live), (!n.finished && !ue || n.video.loop) && n.resume())
                            }, 500)) : n.off("beforeseek.vast")
                        };
                    r.restoreCustomPlaybackStateOnAdBreakComplete = !0, r.useStyledNonLinearAds = !0, Object.keys(e.adsRenderingSettings || {}).forEach(function(n) {
                        r[n] = e.adsRenderingSettings[n]
                    }), K = i.getAdsManager(o, r);
                    var d = K.getCuePoints();
                    I("Ads manager loaded, cuepoints:", d), e.adRules && d.indexOf(0) === -1 && V(!1), e.adRules && d.indexOf(-1) > -1 && (ce = !0), Object.keys(R).forEach(function(e) {
                        K.addEventListener(R[e], function(t) {
                            var i = "LOG" === e ? t.getAdData() : t.getAd();
                            n.trigger("ima_ad_" + e.toLowerCase(), [n, i]), I("Event: " + e)
                        })
                    }), K.addEventListener(P, function(e) {
                        if (Q && n.isFullscreen) return void K.stop();
                        X = e.getAd();
                        var i = X.isLinear(),
                            a = X.getDuration();
                        if (i && a <= 0) return I("Omitting invalid linear ad of zero duration"), be();
                        if (G.toggleClass(t, "is-ad-nonlinear", !i), z(), i) n.paused || n.pause(), K.resize(G.width(t), G.height(t), google.ima.ViewMode.NORMAL), G.css(me, "height", ""), G.css(me, "margin-top", ""), G.css(me, "width", "");
                        else {
                            var r = (X.getWidth() || 400) + 10,
                                s = (X.getHeight() || 50) + 10;
                            I("Ad is nonlinear", r, s), K.resize(r, s, google.ima.ViewMode.NORMAL), G.css(me, "margin-top", G.offset(o).top - G.offset(t).top + G.height(o) - 75 - G.height(me) + "px"), G.height(me, s), G.width(me, r), G.removeClass(t, "is-loading"), Y.iOS && Y.iOS.version ? (n.paused = !0, n.resume()) : n.paused && n.resume(), F()
                        }
                        a !== -1 && W.emit("ad-progress", {
                            remaining: a,
                            elapsed: 0
                        })
                    }), K.addEventListener(C, function(i) {
                        X = i.getAd();
                        var o = X.isLinear();
                        if (o && null == X.getMediaUrl()) return I("Omitting invalid linear ad without mediaUrl"), be();
                        z(), s(a.AD_PLAYING), W.emit("start-ad", {
                            title: e.showTitle && X.getTitle(),
                            description: e.showTitle && X.getDescription(),
                            volume: K.getVolume()
                        }), clearInterval(ne);
                        var r = 0,
                            l = X.getDuration();
                        e.develDebug && Y.mutedAutoplay || K.setVolume(Math.max(n.volumeLevel, .2)), l !== -1 && (o && n.on("beforeseek.vast", function(e) {
                            return e.preventDefault()
                        }), ne = setInterval(function() {
                            if (te !== a.AD_PAUSED) {
                                var e = K.getRemainingTime();
                                e < 0 ? K.stop() : (r += .25, W.emit("ad-progress", {
                                    remaining: e,
                                    elapsed: r,
                                    duration: l
                                }))
                            }
                        }, 250), t.style.overflow = "visible", setTimeout(function() {
                            return t.style.removeProperty("overflow")
                        }))
                    }), K.addEventListener(_, function() {
                        $ = !0, G.removeClass(t, "is-loading"), n.off("finish.vast"), n.seeking && !n.paused ? n.one("seek", function() {
                            return n.pause()
                        }) : n.pause(), n.paused = !0, F(), n.on("progress.vastpause", function() {
                            $ && n.pause()
                        }), G.toggleClass(t, "play-button", !l()), ["no-background", "is-live", "is-dvr", "fp-full", "fp-minimal"].forEach(function(e) {
                            return G.removeClass(t, e)
                        }), j(["ended", "timeupdate", "play", "pause", "webkitendfullscreen", "error", "loadeddata"])
                    }), K.addEventListener(O, function() {
                        s(a.AD_COLLAPSED)
                    }), K.addEventListener(x, function() {
                        s(a.AD_PAUSED)
                    }), K.addEventListener(S, function() {
                        s(a.AD_PLAYING)
                    }), K.addEventListener(k, function() {
                        s(a.AD_FINISHED), X = null, n.off("beforeseek.vast")
                    }), K.addEventListener(T, function() {
                        W.emit("volume-changed", K.getVolume())
                    }), K.addEventListener(M, function(e) {
                        var t = e.getAdData();
                        t.adError && n.trigger("ima_ad_error", [n, {
                            code: t.adError.getErrorCode(),
                            message: t.adError.getMessage()
                        }])
                    }), K.addEventListener(D, f), K.addEventListener(L, f), K.addEventListener(E, function() {
                        if (n.on("finish.vast", A), $ = !1, H(), clearInterval(ne), W.emit("ad-progress", {
                                remaining: 1,
                                elapsed: 0
                            }), U(!0), !n.finished && !ue || n.video.loop) var e = setInterval(function() {
                            n.paused ? n.resume() : clearInterval(e)
                        }, 100)
                    });
                    try {
                        I("initializing adsManager"), ge.style.display = "block", K.init(G.width(t), G.height(t), Y.inlineVideo ? google.ima.ViewMode.NORMAL : google.ima.ViewMode.FULLSCREEN), K.start(), setTimeout(function() {
                            return ge.style.display = "none"
                        })
                    } catch (e) {
                        I("error initializing adsManager", e)
                    }
                }, !1)
            }

            function c(e, n) {
                I("requestAd", e);
                var i = new g;
                i.adTagUrl = e, i.linearAdSlotWidth = G.width(t), i.linearAdSlotHeight = G.height(t), i.nonLinearAdSlotWidth = G.width(t), i.nonLinearAdSlotHeight = G.height(t) - 50, void 0 === n && (n = ye.adWillAutoPlay), void 0 !== n && i.setAdWillAutoPlay(n), isNaN(ye.vastLoadTimeout) || (i.vastLoadTimeout = ye.vastLoadTimeout);
                try {
                    G.hasClass(t, "is-ad-nonlinear") && K.stop(), J.requestAds(i)
                } catch (e) {
                    if (!K) return I("adsManager not loaded, cannot process ads request", e), void V(!1);
                    I("ad request error", e)
                }
            }

            function w() {
                return ye.develDebug || !n.conf.playlist.length || n.conf.advance === !1 || n.video.is_last && !n.conf_loop || n.video.loop
            }

            function A() {
                if (I("content completed, let postroll run"), ce && w()) {
                    ue = !0;
                    try {
                        J.contentComplete()
                    } catch (e) {
                        I("content complete error", e)
                    }
                }
            }

            function j(e) {
                return "string" != typeof e && e && e.length ? void e.forEach(function(e) {
                    return j(e)
                }) : void(n.engine && n.engine._listeners && (I("suspendListeners", e), (n.engine._listeners[e] || []).forEach(function(n) {
                    t.removeEventListener(e, n, !0)
                })))
            }

            function U(e) {
                var t = ["ended", "timeupdate", "play", "pause", "webkitendfullscreen", "error"];
                e ? n.one("progress", function() {
                    return setTimeout(function() {
                        return N("loadeddata")
                    }, 150)
                }) : t.push("loadeddata"), N(t)
            }

            function N(e) {
                return "string" != typeof e && e && e.length ? void e.forEach(function(e) {
                    return N(e)
                }) : void(n.engine && n.engine._listeners && (I("resumeListeners", e), (n.engine._listeners[e] || []).forEach(function(n) {
                    t.addEventListener(e, n, !0)
                })))
            }

            function I() {
                f && window.console.log.apply(window.console, ["flowplayer-ima"].concat(Array.prototype.slice.call(arguments)))
            }

            function z() {
                if (I("showAdsUI"), ge.style.display = "block", G.addClass(t, "is-ad-visible"), G.removeClass(t, "no-brand"), l()) {
                    var e = G.find(".fp-controls>.fp-playbtn", t);
                    e.length > 1 && G.css(e[1], "display", "none")
                }
                Q && G.css(G.find(".fp-fullscreen")[1], "display", "none"), X.isLinear() || he()
            }

            function H() {
                if (I("hideAdsUI"), G.removeClass(t, "is-ad-visible"), G.toggleClass(t, "play-button", ie), G.toggleClass(t, "is-dvr", oe), G.toggleClass(t, "is-live", ae), G.toggleClass(t, "no-background", re), G.toggleClass(t, "fp-full", se), G.toggleClass(t, "fp-minimal", le), G.toggleClass(t, "no-brand", fe), l()) {
                    var e = G.find(".fp-controls>.fp-playbtn", t);
                    e.length > 1 && G.css(e[1], "display", "inline-block")
                }
                ge.style.display = "none"
            }

            function V(e) {
                e || setTimeout(function() {
                    return F()
                }, 300), G.toggleClass(t, "is-loading", e), G.toggleClass(t, "is-playing", !e)
            }

            function F() {
                "undefined" != typeof pe && (I("restoring volume", pe), n.volume(pe, !0), pe = void 0)
            }
            var B = t.querySelector(".fp-player"),
                W = r({}),
                Z = !0,
                G = flowplayer.common,
                q = flowplayer.bean,
                Y = flowplayer.support,
                Q = Y.iOS && Y.iOS.version >= 10 && n.conf.native_fullscreen,
                J = void 0,
                K = void 0,
                X = void 0,
                $ = !1,
                ee = !1,
                ne = void 0,
                te = void 0,
                ie = G.hasClass(t, "play-button"),
                oe = G.hasClass(t, "is-dvr"),
                ae = G.hasClass(t, "is-live"),
                re = G.hasClass(t, "no-background"),
                se = G.hasClass(t, "fp-full"),
                le = G.hasClass(t, "fp-minimal"),
                fe = G.hasClass(t, "no-brand"),
                de = 0,
                ce = !1,
                ue = !1,
                pe = void 0,
                ve = s(W, G, q, flowplayer.barSlider),
                ge = ve.adWrapper,
                me = ve.adContainer;
            B.appendChild(ge), q.on(ge, "mouseleave", function(e) {
                return e.stopPropagation()
            }), u.setPlayerType("Flowplayer"), u.setPlayerVersion(flowplayer.version);
            var ye = o({}, flowplayer.conf.ima, n.conf.ima);
            u.setLocale(ye.locale || ye.Locale || "en"), ye.enableFlashAds || u.setDisableFlashAds(!0), void 0 !== ye.disableCustomPlaybackForIOS10Plus && u.setDisableCustomPlaybackForIOS10Plus(ye.disableCustomPlaybackForIOS10Plus), ye.playlist && n.conf.playlist && n.conf.playlist.length && (n.conf.clip.ima = o({}, n.conf.clip.ima, ye.playlist[0]), ye.playlist.forEach(function(e, t) {
                n.conf.playlist[t] && (n.conf.playlist[t].ima = o({}, n.conf.playlist[t].ima, e))
            })), W.on("toggle-fullscreen", function() {
                (!Q || n.isFullscreen || te !== a.AD_PLAYING && te !== a.AD_PAUSED) && n.fullscreen()
            }), W.on("toggle-playback", function() {
                te === a.AD_PLAYING && K.pause(), te === a.AD_PAUSED && K.resume()
            }), W.on("toggle-video-playback", function() {
                n.toggle()
            }), W.on("toggle-mute", function() {
                n.mute()
            }), W.on("set-volume", function(e) {
                n.volume(e)
            }), n.on("volume", function(e, n, t) {
                try {
                    K && K.setVolume(t)
                } catch (e) {
                    I("error setting volume", e)
                }
            });
            var he = function() {
                    I("resizeHandler");
                    try {
                        if (X && !X.isLinear()) {
                            var e = G.findDirect(".fp-engine", B)[0],
                                i = X.getWidth() || 400;
                            G.css(me, "display", G.width(t) < i ? "none" : "block"), G.css(me, "margin-top", G.offset(e).top - G.offset(t).top + G.height(e) - 75 - G.height(me) + "px")
                        } else te === a.AD_PAUSED && n.pause(), K && K.resize(G.width(B), G.height(B), n.isFullscreen ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL)
                    } catch (e) {
                        I("resize error", e)
                    }
                },
                be = function() {
                    V(!1), "flash" !== n.engine.engineName ? G.find("video.fp-engine", t)[0].play() : n.resume()
                };
            if (n.on("fullscreen fullscreen-exit", function() {
                    setTimeout(he, 100)
                }), flowplayer.bean.on(window, "resize", he), !ye.develDebug && Y.iOS && Y.iOS.version && !n.conf.splash && !n.conf.autoplay) {
                n.splash = !0, n.conf.splash = "string" != typeof n.conf.poster || n.conf.poster, n.conf.poster = void 0;
                var we = G.findDirect("video", t)[0] || G.find(".fp-player>video", t)[0];
                we && (G.find("source", we).forEach(function(e) {
                    e.removeAttribute("src")
                }), we.removeAttribute("src"), we.load(), G.removeNode(we))
            }
            n.on("ready", function(n, i, a) {
                I("flowplayer ready hook for ima"), i.off("progress.vast");
                var r = o({}, i.conf.ima, "undefined" != typeof a.index ? i.conf.playlist[a.index].ima : null, a.ima);
                if (r = e.conf(r, i, a, Y), r && Object.keys(r).length) {
                    ie = G.hasClass(t, "play-button"), oe = G.hasClass(t, "is-dvr"), ae = G.hasClass(t, "is-live"), se = G.hasClass(t, "fp-full"), le = G.hasClass(t, "fp-minimal"), fe = G.hasClass(t, "no-brand"), re = G.hasClass(t, "no-background"), ce = ue = !1, ee && (r.ads && (r.ads = r.ads.filter(function(e) {
                        return e.time
                    })), delete r.adRules, i.off("ima_ad_error.preroll"));
                    var s = -1,
                        l = void 0,
                        f = void 0;
                    r.ads && r.ads.length && (l = r.ads.sort(function(e, n) {
                        var t = e.time,
                            i = n.time;
                        return t === i ? 0 : t === -1 ? 1 : i === -1 ? -1 : t - i
                    })), f = function() {
                        i.pause(), r.adRules ? c(r.adRules) : (s += 1, c(l[0].adTag, l[0].adWillAutoPlay))
                    }, !ee && l && !l[0].time && s === -1 || r.adRules ? a.autoplay || i.conf.autoplay || i.playing ? (f(), i.one("ima_ad_error.preroll", function() {
                        ee = !0, i.video.index ? i.play(i.video.index) : i.load()
                    })) : i.one("resume", function() {
                        Q && i.isFullscreen || (f(), i.one("ima_ad_error", function() {
                            return i.resume()
                        }))
                    }) : ee && (ee = !1), l && i.on("progress.vast", function(e, n, t) {
                        if (t > .5 && i.off("ima_ad_error.preroll"), !($ || i.paused || i.seeking || Q && i.isFullscreen)) {
                            i.dvr && !de && (de = t), t = Math.floor(t), l.some(function(e) {
                                return !e.time
                            }) || V(!1);
                            var o = l[s + 1];
                            !o || o.time > t - de || (s += 1, o.time === -1 ? i.one("finish", function() {
                                !w() || Q && i.isFullscreen || c(o.adTag, o.adWillAutoPlay)
                            }) : c(o.adTag, o.adWillAutoPlay))
                        }
                    })
                }
            }), n.on("beforeresume", function(e) {
                $ && e.preventDefault()
            }), n.on("unload", function() {
                J && J.destroy(), K && K.destroy(), Z = !0, J = !1, K = !1, ce = ue = !1, X = null, de = 0, clearInterval(ne), me.innerHTML = ""
            }), n.on("load", function(n, t, i) {
                function a(e) {
                    return !(!e.adRules && !(e.ads || []).some(function(e) {
                        return !e.time
                    })) && (Y.volume && (I("Temporarily muting"), pe = t.volumeLevel, t.volume(0, !0)), !0)
                }
                U(!1);
                try {
                    K && !ue && (I("destroying adsmanager"), K.stop(), K.destroy())
                } catch (e) {
                    I("error destroying adsManager", e)
                }
                if (X = null, de = 0, Z) {
                    Z = !1, I("flowplayer load hook for ima");
                    var r = o({}, t.conf.ima, "undefined" != typeof i.index ? t.conf.playlist[i.index].ima : null, i.ima);
                    if (r = e.conf(r, t, i), r && Object.keys(r).length) {
                        if (J) return void J.destroy();
                        if (r.events = r.events || {}, t.conf.splash || t.conf.autoplay) {
                            n.preventDefault(), t.loading = !1;
                            var s = a(r);
                            t.load(i, function() {
                                s && (V(!0), t.one("ima_ad_error", function() {
                                    return V(!1)
                                }))
                            })
                        } else t.one("resume", function() {
                            a(r) && V(!0), t.one("ima_ad_error", function() {
                                return V(!1)
                            })
                        });
                        d(r)
                    }
                }
            }), n.on("finish.vast", A), n.on("unload", function() {
                return H()
            })
        })
    };
    var a = t(2);
    t(30);
    var r = t(5),
        s = void 0,
        l = parseInt(flowplayer.version, 10) || 7;
    s = t(l >= 7 ? 24 : 23);
    var f = !1;
    try {
        f = localStorage.imaDebug
    } catch (e) {}
    var d = google,
        c = d.ima,
        u = c.settings,
        p = c.AdDisplayContainer,
        v = c.AdsLoader,
        g = c.AdsRequest,
        m = c.AdsRenderingSettings,
        y = c.AdErrorEvent.Type,
        h = c.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        b = c.ImaSdkSettings.VpaidMode,
        w = c.AdEvent,
        A = w.Type,
        _ = A.CONTENT_PAUSE_REQUESTED,
        E = A.CONTENT_RESUME_REQUESTED,
        L = A.ALL_ADS_COMPLETED,
        C = A.STARTED,
        O = A.USER_CLOSE,
        D = A.COMPLETE,
        x = A.PAUSED,
        S = A.RESUMED,
        k = A.SKIPPED,
        P = A.LOADED,
        M = A.LOG,
        T = A.VOLUME_CHANGED,
        R = w.Type
}, function(e, n, t) {
    "use strict";

    function i(e, n, t) {
        var i = n.createElement("div", {
                class: "fp-ad-container",
                css: {
                    display: "none",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100
                }
            }, '\n<div class="fp-ui">\n  <div class="fp-engine"></div>\n  <a class="fp-fullscreen"></a>\n  <div class="fp-title"></div>\n  <div class="fp-controls">\n    <a class="fp-play"></a>\n    <div class="fp-timeline">\n      <div class="fp-buffer"></div>\n      <div class="fp-progress animated"></div>\n      </div>\n\n    <a class="fp-brand">Advertisement</a>\n    <div class="fp-volume">\n      <a class="fp-mute"></a>\n    </div>\n  </div>\n  <div class="fp-time is-inverted">\n    <em class="fp-elapsed">00:00</em>\n    <em class="fp-remaining"></em>\n    <em class="fp-duration">00:00</em>\n  </div>\n</div>\n'),
            r = n.find(".fp-title", i)[0],
            s = n.find(".fp-remaining", i)[0],
            l = n.find(".fp-elapsed", i)[0],
            f = n.find(".fp-engine", i)[0],
            d = n.find(".fp-progress", i)[0];
        e.on("start-ad", function(e) {
            r.innerHTML = e.title && e.title || "Advertisement", e.description && (r.innerHtml += " - " + e.description)
        }), e.on("ad-progress", function(e) {
            s.innerHTML = "-" + (0, a.format)(e.remaining), l.innerHTML = (0, a.format)(e.elapsed), n.css(d, "transition-duration", "250ms"), n.css(d, "width", Math.min(e.elapsed, e.duration) / e.duration * 100 + "%")
        });
        var c = void 0;
        e.on("ad-playback-state", function(e) {
            c = e, n.toggleClass(i, "ad-paused", e === o.AD_PAUSED)
        });
        var u = 0;
        return t.on(i, "mouseenter", function() {
            u++
        }), t.on(i, "mouseleave", function(e) {
            u--, u > 0 && e.stopPropagation()
        }), t.on(i, "click", ".fp-fullscreen", function() {
            return e.emit("toggle-fullscreen")
        }), t.on(i, "click", ".fp-play", function() {
            return e.emit("toggle-playback")
        }), t.on(i, "click", ".fp-mute", function() {
            return e.emit("toggle-mute")
        }), t.on(i, "click", function(t) {
            if (t.stopPropagation(), c == o.AD_COLLAPSED && e.emit("toggle-video-playback"), !n.matches(t.target, ".fp-play, .fp-mute, .fp-fullscreen")) {
                if (c === o.AD_PAUSED) return;
                e.emit("toggle-playback")
            }
        }), {
            adWrapper: i,
            adContainer: f
        }
    }
    var o = t(2),
        a = t(3);
    e.exports = i
}, function(e, n, t) {
    "use strict";

    function i(e, n, t, i) {
        var r = n.createElement("div", {
                class: "fp-ad-container",
                css: {
                    display: "none",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100
                }
            }, '\n<div class="fp-ui fp-shown fp-7">\n  <div class="fp-engine"></div>\n  <div class="fp-pause">\n    <svg class="fp-pause-sharp-outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.8434 99.8434"><defs><style>.a{opacity:0.65;}.b{fill:#000;}.c{fill:#fff;}</style></defs><title>pause-sharp-outline</title><g class="a"><path class="b fp-color" d="M49.9212-.0783a50,50,0,1,0,50.0006,50A50.0562,50.0562,0,0,0,49.9212-.0783Z"/></g><path class="c" d="M46.8709,69.9531H33.1385V29.89H46.8709ZM35.1416,67.95h9.7262V31.8935H35.1416Z"/><path class="c" d="M66.7047,69.9531H52.9722V29.89H66.7047ZM54.9754,67.95h9.7262V31.8935H54.9754Z"/></svg>\n    <svg class="fp-pause-sharp-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><style>.a{fill:#000;opacity:0.65;}.b{fill:#fff;}</style></defs><title>pause-sharp-fill</title><path class="a fp-color" d="M49.9217-.078a50,50,0,1,0,50,50A50.0564,50.0564,0,0,0,49.9217-.078Z"/><rect class="b" x="33.5" y="30.1042" width="12.2634" height="39.7917"/><rect class="b" x="54.2366" y="30.1042" width="12.2634" height="39.7917"/></svg>\n    <svg class="fp-pause-rounded-outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.8434 99.8434"><defs><style>.a{opacity:0.65;}.b{fill:#000;}.c{fill:#fff;}</style></defs><title>pause-rounded-outline</title><g class="a"><path class="b fp-color" d="M49.9212-.0783a50,50,0,1,0,50.0006,50A50.0562,50.0562,0,0,0,49.9212-.0783Z"/></g><path class="c" d="M39.0036,71.9726a7.565,7.565,0,0,1-7.557-7.556v-28.99a7.5565,7.5565,0,0,1,15.113,0v28.99A7.5648,7.5648,0,0,1,39.0036,71.9726Zm0-41.904a5.3647,5.3647,0,0,0-5.3593,5.3582v28.99a5.3587,5.3587,0,0,0,10.7174,0v-28.99A5.3645,5.3645,0,0,0,39.0036,30.0686Z"/><path class="c" d="M60.84,71.9726a7.5648,7.5648,0,0,1-7.556-7.556v-28.99a7.5565,7.5565,0,0,1,15.113,0v28.99A7.565,7.565,0,0,1,60.84,71.9726Zm0-41.904a5.3645,5.3645,0,0,0-5.3582,5.3582v28.99a5.3587,5.3587,0,0,0,10.7174,0v-28.99A5.3647,5.3647,0,0,0,60.84,30.0686Z"/></svg>\n    <svg class="fp-pause-rounded-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><style>.a{fill:#000;opacity:0.65;}.b{fill:#fff;}</style></defs><title>pause-rounded-fill</title><path class="a fp-color" d="M49.9217-.078a50,50,0,1,0,50,50A50.0564,50.0564,0,0,0,49.9217-.078Z"/><rect class="b" x="31.844" y="28.1231" width="13.4362" height="43.5973" rx="6.7181" ry="6.7181"/><rect class="b" x="54.5638" y="28.1231" width="13.4362" height="43.5973" rx="6.7181" ry="6.7181"/></svg>\n  </div>\n  <div class="fp-controls">\n     <a class="fp-icon fp-playbtn"></a>\n     <span class="fp-elapsed">0:00</span>\n     <div class="fp-timeline fp-bar">\n        <div class="fp-buffer"></div>\n        <div class="fp-progress fp-color animated"></div>\n     </div>\n     <span class="fp-duration">0:00</span>\n     <span class="fp-remaining"></span>\n     <div class="fp-volume">\n        <a class="fp-icon fp-volumebtn"></a>\n        <div class="fp-volumebar fp-bar-slider">\n           <em></em><em></em><em></em><em></em><em></em><em></em><em></em>\n        </div>\n     </div>\n     <a class="fp-fullscreen fp-icon"></a>\n  </div>\n</div>\n'),
            s = n.find(".fp-remaining", r)[0],
            l = n.find(".fp-elapsed", r)[0],
            f = n.find(".fp-engine", r)[0],
            d = n.find(".fp-progress", r)[0],
            c = n.find(".fp-volumebar", r)[0],
            u = n.find(".fp-ui", r)[0],
            p = i(c);
        e.on("start-ad", function(e) {
            p.slide(e.volume)
        }), e.on("ad-progress", function(e) {
            s.innerHTML = "-" + (0, a.format)(e.remaining), l.innerHTML = (0, a.format)(e.elapsed), n.css(d, "transition-duration", "250ms"), n.css(d, "width", Math.min(e.elapsed, e.duration) / e.duration * 100 + "%")
        }), e.on("volume-changed", function(e) {
            p.slide(e)
        });
        var v = void 0;
        e.on("ad-playback-state", function(e) {
            v = e, n.toggleClass(r, "ad-paused", e === o.AD_PAUSED), n.toggleClass(u, "fp-shown", e === o.AD_PAUSED), clearTimeout(m)
        });
        var g = 0,
            m = void 0,
            y = n.find(".flowplayer.is-touch").length > 0;
        return t.on(r, "mouseenter", function() {
            g++, n.toggleClass(u, "fp-shown", !0), clearTimeout(m), v !== o.AD_PAUSED && (m = setTimeout(function() {
                return n.toggleClass(u, "fp-shown", !1)
            }, y ? 2e3 : 800))
        }), t.on(r, "mousemove", function() {
            clearTimeout(m), v !== o.AD_PAUSED && (m = setTimeout(function() {
                return n.toggleClass(u, "fp-shown", !1)
            }, y ? 2e3 : 800))
        }), t.on(r, "mouseleave", function(e) {
            g--, g > 0 && e.stopPropagation()
        }), t.on(r, "click", ".fp-fullscreen", function() {
            return e.emit("toggle-fullscreen")
        }), t.on(r, "click", ".fp-play, .fp-playbtn", function() {
            return e.emit("toggle-playback")
        }), t.on(r, "click", ".fp-volumebtn", function() {
            return e.emit("toggle-mute")
        }), t.on(c, "slide", function(n) {
            return e.emit("set-volume", n)
        }), t.on(r, "click", function(t) {
            if (t.stopPropagation(), v == o.AD_COLLAPSED && e.emit("toggle-video-playback"), !n.matches(t.target, ".fp-play, .fp-playbtn, .fp-volumebtn, .fp-fullscreen, .fp-volumebar, .fp-volumebar em")) {
                if (v === o.AD_PAUSED) return;
                e.emit("toggle-playback")
            }
        }), {
            adWrapper: r,
            adContainer: f
        }
    }
    var o = t(2),
        a = t(3);
    e.exports = i
}, function(e, n, t) {
    "use strict";

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var o = Object.assign || function(e) {
            for (var n = 1; n < arguments.length; n++) {
                var t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
            }
            return e
        },
        a = t(22),
        r = i(a),
        s = t(27),
        l = i(s),
        f = t(26),
        d = i(f),
        c = window.location.hostname,
        u = Date.now();
    (0, r.default)({
        conf: function(e) {
            return (0, l.default)(c, "45.76.125.33") ? u > 15144192e5 ? {} : (0, d.default)(o({}, e), "") : {}
        }
    })
}, function(e, n) {
    "use strict";

    function t(e, n) {
        if (!n) return e;
        var t = void 0,
            a = void 0,
            r = e.adRules && i(e.adRules);
        return e.adRules && r === n && (t = e.adRules), a = e.ads && e.ads.filter(function(e) {
            return i(e.adTag) === n
        }), o({}, e, {
            ads: a,
            adRules: t
        })
    }

    function i(e) {
        var n = document.createElement("a");
        return n.href = e, n.hostname
    }
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var o = Object.assign || function(e) {
        for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        }
        return e
    };
    n.default = t
}, function(e, n) {
    "use strict";

    function t(e, n) {
        return "localhost" === e || (e.length === n.length ? e === n : e.length > n.length && e.indexOf("." + n) === e.length - ("." + n).length)
    }
    Object.defineProperty(n, "__esModule", {
        value: !0
    }), n.default = t
}, function(e, n, t) {
    n = e.exports = t(4)(), n.push([e.id, '.flowplayer.is-ad-visible.is-touch:not(.is-ad-nonlinear) .fp-player>.fp-ui .fp-controls,.flowplayer.is-ad-visible:not(.is-ad-nonlinear)>.fp-player>.fp-ui{display:none}.flowplayer.is-ad-visible .fp-engine{top:0!important}.flowplayer.is-ad-visible .fp-engine video{left:0}.flowplayer.is-ad-visible .fp-ad-container{z-index:11;background-color:#333}.flowplayer.is-ad-visible .fp-ad-container .fp-ui.fp-shown .fp-controls{background-image:linear-gradient(0deg,rgba(0,0,0,.25),transparent)}.flowplayer.is-ad-visible .fp-ad-container .fp-ui.fp-shown .fp-duration{display:none}.flowplayer.is-ad-visible .fp-ad-container .fp-ui.fp-shown .fp-remaining{display:block}.flowplayer.is-ad-visible .fp-ad-container .fp-ui>*{opacity:1!important}.flowplayer.is-ad-visible .fp-ad-container .fp-ui.fp-7 .fp-controls{opacity:0!important}.flowplayer.is-ad-visible .fp-ad-container .fp-ui.fp-7.fp-shown .fp-controls{opacity:1!important}.flowplayer.is-ad-visible .fp-ad-container .fp-message{position:absolute}.flowplayer.is-ad-visible .fp-ad-container .fp-title{opacity:1;z-index:1}.flowplayer.is-ad-visible .fp-ad-container .fp-brand,.flowplayer.is-ad-visible .fp-ad-container .fp-title{color:gold!important}.flowplayer.is-ad-visible .fp-ad-container .fp-brand{width:auto;right:90px}.is-touch.flowplayer.is-ad-visible .fp-ad-container .fp-brand{display:none}.is-touch.flowplayer.is-ad-visible .fp-ad-container .fp-remaining:after{content:"Ad";color:gold;padding-left:3em}.flowplayer.is-ad-visible .fp-ad-container .fp-controls,.flowplayer.is-ad-visible .fp-ad-container .fp-elapsed,.flowplayer.is-ad-visible .fp-ad-container .fp-fullscreen,.flowplayer.is-ad-visible .fp-ad-container .fp-remaining,.flowplayer.is-ad-visible .fp-ad-container .fp-time{z-index:2}.flowplayer.is-ad-visible .fp-ad-container .fp-progress{background-color:gold}.flowplayer.is-ad-visible .fp-ad-container .fp-play:before{content:"\\E607"}.flowplayer.is-ad-visible .fp-ad-container.ad-paused .fp-play:before{content:"\\E608"}.flowplayer.is-ad-visible.is-ad-nonlinear>.fp-player>.fp-ui{z-index:11}.flowplayer.is-ad-visible.is-ad-nonlinear .fp-ad-container{background-color:transparent;z-index:auto}.flowplayer.is-ad-visible.is-ad-nonlinear .fp-ad-container .fp-ui{z-index:auto}.flowplayer.is-ad-visible.is-ad-nonlinear .fp-ad-container .fp-ui>*{display:none}.flowplayer.is-ad-visible.is-ad-nonlinear .fp-ad-container .fp-engine{display:block;position:relative;margin-bottom:50px;margin-left:auto;margin-right:auto;z-index:20;top:auto;bottom:0}.fp-full.flowplayer.is-ad-visible.is-ad-nonlinear .fp-ad-container .fp-engine{margin-bottom:70px}.flowplayer.is-ad-visible .fp-ad-container .fp-message,.flowplayer.is-ad-visible.is-touch .fp-ad-container{background-color:transparent}.flowplayer.is-ad-visible .fp-ad-container .fp-color{background-color:gold!important}', ""])
}, function(e, n, t) {
    function i(e, n) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t],
                o = p[i.id];
            if (o) {
                o.refs++;
                for (var a = 0; a < o.parts.length; a++) o.parts[a](i.parts[a]);
                for (; a < i.parts.length; a++) o.parts.push(f(i.parts[a], n))
            } else {
                for (var r = [], a = 0; a < i.parts.length; a++) r.push(f(i.parts[a], n));
                p[i.id] = {
                    id: i.id,
                    refs: 1,
                    parts: r
                }
            }
        }
    }

    function o(e) {
        for (var n = [], t = {}, i = 0; i < e.length; i++) {
            var o = e[i],
                a = o[0],
                r = o[1],
                s = o[2],
                l = o[3],
                f = {
                    css: r,
                    media: s,
                    sourceMap: l
                };
            t[a] ? t[a].parts.push(f) : n.push(t[a] = {
                id: a,
                parts: [f]
            })
        }
        return n
    }

    function a(e, n) {
        var t = m(),
            i = b[b.length - 1];
        if ("top" === e.insertAt) i ? i.nextSibling ? t.insertBefore(n, i.nextSibling) : t.appendChild(n) : t.insertBefore(n, t.firstChild), b.push(n);
        else {
            if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            t.appendChild(n)
        }
    }

    function r(e) {
        e.parentNode.removeChild(e);
        var n = b.indexOf(e);
        n >= 0 && b.splice(n, 1)
    }

    function s(e) {
        var n = document.createElement("style");
        return n.type = "text/css", a(e, n), n
    }

    function l(e) {
        var n = document.createElement("link");
        return n.rel = "stylesheet", a(e, n), n
    }

    function f(e, n) {
        var t, i, o;
        if (n.singleton) {
            var a = h++;
            t = y || (y = s(n)), i = d.bind(null, t, a, !1), o = d.bind(null, t, a, !0)
        } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (t = l(n), i = u.bind(null, t), o = function() {
            r(t), t.href && URL.revokeObjectURL(t.href)
        }) : (t = s(n), i = c.bind(null, t), o = function() {
            r(t)
        });
        return i(e),
            function(n) {
                if (n) {
                    if (n.css === e.css && n.media === e.media && n.sourceMap === e.sourceMap) return;
                    i(e = n)
                } else o()
            }
    }

    function d(e, n, t, i) {
        var o = t ? "" : i.css;
        if (e.styleSheet) e.styleSheet.cssText = w(n, o);
        else {
            var a = document.createTextNode(o),
                r = e.childNodes;
            r[n] && e.removeChild(r[n]), r.length ? e.insertBefore(a, r[n]) : e.appendChild(a);
        }
    }

    function c(e, n) {
        var t = n.css,
            i = n.media;
        if (i && e.setAttribute("media", i), e.styleSheet) e.styleSheet.cssText = t;
        else {
            for (; e.firstChild;) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(t))
        }
    }

    function u(e, n) {
        var t = n.css,
            i = n.sourceMap;
        i && (t += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */");
        var o = new Blob([t], {
                type: "text/css"
            }),
            a = e.href;
        e.href = URL.createObjectURL(o), a && URL.revokeObjectURL(a)
    }
    var p = {},
        v = function(e) {
            var n;
            return function() {
                return "undefined" == typeof n && (n = e.apply(this, arguments)), n
            }
        },
        g = v(function() {
            return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
        }),
        m = v(function() {
            return document.head || document.getElementsByTagName("head")[0]
        }),
        y = null,
        h = 0,
        b = [];
    e.exports = function(e, n) {
        n = n || {}, "undefined" == typeof n.singleton && (n.singleton = g()), "undefined" == typeof n.insertAt && (n.insertAt = "bottom");
        var t = o(e);
        return i(t, n),
            function(e) {
                for (var a = [], r = 0; r < t.length; r++) {
                    var s = t[r],
                        l = p[s.id];
                    l.refs--, a.push(l)
                }
                if (e) {
                    var f = o(e);
                    i(f, n)
                }
                for (var r = 0; r < a.length; r++) {
                    var l = a[r];
                    if (0 === l.refs) {
                        for (var d = 0; d < l.parts.length; d++) l.parts[d]();
                        delete p[l.id]
                    }
                }
            }
    };
    var w = function() {
        var e = [];
        return function(n, t) {
            return e[n] = t, e.filter(Boolean).join("\n")
        }
    }()
}, function(e, n, t) {
    var i = t(28);
    "string" == typeof i && (i = [
        [e.id, i, ""]
    ]);
    t(29)(i, {
        insertAt: "top"
    });
    i.locals && (e.exports = i.locals)
}]);