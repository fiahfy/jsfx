//


/**
 * @fileoverview
 */


import {ActionEvent} from './event.js';
import {JFObject} from './lang.js';
import {Duration} from './util.js';


export class KeyFrame extends JFObject {
  constructor(time, onFinished) {
    super();
    this.onFinished_ = onFinished;
    this.time_ = time;
  }
  get onFinished() {
    return this.onFinished_;
  }
  get time() {
    return this.time_;
  }
}


export class AnimationTimer extends JFObject {
  constructor() {
    super();
    this.id_ = null;
  }
  handle(now) {
    super.abstractMethod();
  }
  start() {
    this.stop();

    let animationLoop = () => {
      this.id_ = AnimationTimer._requestAnimationFrame_()(animationLoop);
      this.handle(Date.now());
    };
    animationLoop();
  }
  stop() {
    AnimationTimer._cancelAnimationFrame_()(this.id_);
    this.id_ = null;
  }
  static _cancelAnimationFrame_() {
    return window.cancelAnimationFrame ||
      window.cancelRequestAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      window.oCancelRequestAnimationFrame ||
      window.msCancelRequestAnimationFrame ||
      (id => { window.clearTimeout(id); });
  }
  static _requestAnimationFrame_() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      (callback => { window.setTimeout(callback, 1000 / 60); });
  }
}


export class Animation extends JFObject {
  constructor(targetFramerate) {
    super();
    this.autoReverse_ = false;
    this.cycleCount_ = 1.0;
    this.cycleDuration_ = Duration.ZERO;
    this.currentTime_ = Duration.ZERO;
    this.delay_ = Duration.ZERO;
    this.onFinished_ = null;
    this.rate_ = 1.0;
    this.status_ = Animation.Status.STOPPED;
    this.timer_ = null;
  }
  static get INDEFINITE() {
    return -1;
  }
  static get Status() {
    return {
      PAUSED: 'paused',
      RUNNING: 'running',
      STOPPED: 'stopped'
    };
  }
  get autoReverse() {
    return this.autoReverse_;
  }
  set autoReverse(value) {
    this.autoReverse_ = value;
  }
  get currentRate() {
    return this.currentRate_;
  }
  get currentTime() {
    return this.currentTime_;
  }
  get cycleCount() {
    return this.cycleCount_;
  }
  set cycleCount(value) {
    this.cycleCount_ = value;
  }
  get cycleDuration() {
    return this.cycleDuration_;
  }
  get delay() {
    return this.delay_;
  }
  set delay(value) {
    this.delay_ = value;
  }
  get onFinished() {
    return this.onFinished_;
  }
  set onFinished(value) {
    this.onFinished_ = value;
  }
  pause() {
    if (this.status_ != Animation.Status.RUNNING) {
      return;
    }
    this.status_ = Animation.Status.PAUSED;
  }
  play() {
    if (this.status_ == Animation.Status.RUNNING) {
      return;
    }
    this.status_ = Animation.Status.RUNNING;

    if (this.timer_) {
      return;
    }

    var before = Date.now();
    var delta = 0;
    var time = Duration.ZERO;
    var self = this;
    this.timer_ = new (class extends AnimationTimer {
      handle(now) {
        delta = now - before;
        before = now;

        delta *= self.rate_;

        if (self.status_ != Animation.Status.RUNNING) {
          return;
        }

        time = time.add(new Duration(delta));
        if (time.lessThan(self.delay_)) {
          return;
        }

        self.currentTime_ = self.currentTime_.add(new Duration(delta));
        if (self.currentTime_.greaterThan(self.totalDuration)) {
          self.currentTime_ = self.totalDuration;
        }

        let reverse = !!(parseInt(self.currentTime_.toMillis() / self.cycleDuration.toMillis() % 2)
        && self.autoReverse_);
        let progress = self.currentTime_.toMillis() % self.cycleDuration_.toMillis() / self.cycleDuration_.toMillis();

        if (progress == 0 && !self.autoReverse_) {
          progress = 1.0;
        }
        progress = reverse ? (1 - progress) : progress;

        self._update(progress);

        if (self.currentTime_.greaterThanOrEqualTo(self.totalDuration)) {
          if (self.onFinished_) {
            self.onFinished_.handle(new ActionEvent());
          }
          this.stop();
          self.stop();
        }
      }
    })();
    this.timer_.start();
  }
  get rate() {
    return this.rate_;
  }
  set rate(value) {
    this.rate_ = value;
  }
  get status() {
    return this.status_;
  }
  stop() {
    if (this.status_ != Animation.Status.RUNNING) {
      return;
    }
    this.status_ = Animation.Status.STOPPED;
    if (this.timer_) {
      this.timer_.stop();
      this.timer_ = null;
    }
    this.currentTime_ = Duration.ZERO;
  }
  get totalDuration() {
    if (this.cycleCount_ == Animation.INDEFINITE) {
      return Duration.INDEFINITE;
    }
    return new Duration(this.cycleCount_ * this.cycleDuration_.toMillis());
  }
  _update() {}
}


export class Timeline extends Animation {
  constructor(...keyFrames) {
    super();
    this.animations_ = [];
    this.keyFrames_ = keyFrames;
  }
  get keyFrames() {
    return this.keyFrames_;
  }
  pause() {
    this.animations_.forEach((element) => {
      element.pause();
    });
  }
  play() {
    this.keyFrames_.forEach((element, index) => {
      let animation = this.animations_[index];
      if (animation && animation.status != Animation.Status.STOPPED) {
        //
      } else {
        animation = new Animation();
        animation.delay = element.time;
        animation.onFinished = element.onFinished;
        this.animations_[index] = animation;
      }
    });
    this.animations_ = this.animations_.slice(0, this.keyFrames_.length);
    this.animations_.forEach((element) => {
      element.play();
    });
  }
  stop() {
    this.animations_.forEach((element) => {
      element.stop();
    });
  }
}


export class Transition extends Animation {
  constructor() {
    super();
    this.node_ = null;
  }
  get duration() {
    return this.cycleDuration_;
  }
  set duration(value) {
    this.cycleDuration_ = value;
  }
  get node() {
    return this.node_;
  }
  set node(value) {
    this.node_ = value;
  }
}


export class FadeTransition extends Transition {
  constructor(duration = new Duration(400), node = null) {
    super();
    this.cycleDuration_ = duration;
    this.node_ = node;
    this.byValue_ = 0.0;
    this.endValue_ = NaN;
    this.fromValue_ = NaN;
    this.startValue_ = NaN;
    this.toValue_ = NaN;
  }
  get byValue() {
    return this.byValue_;
  }
  set byValue(value) {
    this.byValue_ = value;
  }
  get fromValue() {
    return this.fromValue_;
  }
  set fromValue(value) {
    this.fromValue_ = value;
  }
  get toValue() {
    return this.toValue_;
  }
  set toValue(value) {
    this.toValue_ = value;
  }
  play() {
    if (!this.node_) {
      return;
    }

    this.startValue_ = NaN;
    this.endValue_ = NaN;

    this.startValue_ = this.fromValue_;
    if (isNaN(this.startValue_)) {
      this.startValue_ = this.node_.opacity;
    }
    this.endValue_ = this.toValue_;
    if (isNaN(this.endValue_)) {
      this.endValue_ = this.startValue_ + this.byValue_;
    }

    super.play();
  }
  _update(progress) {
    if (!this.node_) {
      return;
    }

    this.node.opacity = this.startValue_ - this.startValue_ * progress + this.endValue_ * progress;
  }
}
