/**
 * By Daniel Rossi <danielr@electroteque.org> For VDYO
 */

/**
 * Playback Tracking Timer Utils
 * @param delay
 * @param callback
 * @constructor
 */

(function () {
    function Timer(delay, callback) {
        this.delay = delay,
            this.callback = callback,
            this.timer,
            this.running = false;
    }

    /**
     * Set the delay
     * @param delay
     */
    Timer.prototype.setDelay = function (delay) {
        this.delay = delay;
    }

    /**
     * Start the timer
     */
    Timer.prototype.start = function () {
        this.stop();
        this.animate();
        this.running = true;
    }

    /**
     * Timer interval callback
     */
    Timer.prototype.animate = function () {
        this.timer = setTimeout(this.animate.bind(this), this.delay);
        this.callback(true);
    }

    /**
     * Stop the timer
     */
    Timer.prototype.stop = function () {
        if (this.running) {
            clearTimeout(this.timer);
            this.running = false;
        }
    }

    window.Timer = Timer;
})();