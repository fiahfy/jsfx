//


/**
 * @fileoverview
 */


import {ActionEvent} from './event.js';
import {JFObject} from './lang.js';
import {Duration} from './util.js';
import {Color} from './scene/paint.js';


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
  }
  get node() {
    return this.node_;
  }
  set node(value) {
    this.node_ = value;
  }
}


// TODO: case if node is Group
export class FadeTransition extends Transition {
  constructor(duration = new Duration(400), node = null) {
    super();
    this.byValue_ = 0.0;
    this.cycleDuration_ = duration;
    this.endValue_ = NaN;
    this.fromValue_ = NaN;
    this.node_ = node;
    this.startValue_ = NaN;
    this.toValue_ = NaN;
  }
  get byValue() {
    return this.byValue_;
  }
  set byValue(value) {
    this.byValue_ = value;
  }
  get duration() {
    return this.cycleDuration_;
  }
  set duration(value) {
    this.cycleDuration_ = value;
  }
  get fromValue() {
    return this.fromValue_;
  }
  set fromValue(value) {
    this.fromValue_ = value;
  }
  get node() {
    return this.node_;
  }
  set node(value) {
    this.node_ = value;
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

    this.node_.opacity = this.startValue_ - this.startValue_ * progress + this.endValue_ * progress;
  }
}


export class FillTransition extends Transition {
  constructor(duration = new Duration(400), shape = null) {
    super();
    this.cycleDuration_ = duration;
    this.endValue_ = null;
    this.fromValue_ = null;
    this.shape_ = shape;
    this.startValue_ = null;
    this.toValue_ = null;
  }
  get duration() {
    return this.cycleDuration_;
  }
  set duration(value) {
    this.cycleDuration_ = value;
  }
  get fromValue() {
    return this.fromValue_;
  }
  set fromValue(value) {
    this.fromValue_ = value;
  }
  get shape() {
    return this.shape_;
  }
  set shape(value) {
    this.shape_ = value;
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

    this.startValue_ = this.fromValue_;
    if (!this.startValue_) {
      this.startValue_ = this.node_.fill;
    }
    this.endValue_ = this.toValue_;
    if (!this.endValue_) {
      this.endValue_ = this.startValue_;
    }

    super.play();
  }
  _update(progress) {
    if (!this.node_) {
      return;
    }

    let red = this.startValue_.red - this.startValue_.red * progress + this.endValue_.red * progress;
    let green = this.startValue_.green - this.startValue_.green * progress + this.endValue_.green * progress;
    let blue = this.startValue_.blue - this.startValue_.blue * progress + this.endValue_.blue * progress;
    let opacity = this.startValue_.opacity - this.startValue_.opacity * progress + this.endValue_.opacity * progress;

    this.node_.fill = new Color(red, green, blue, opacity);
  }
}


export class RotateTransition extends Transition {
  constructor(duration = new Duration(400), node = null) {
    super();
    this.byAngle_ = 0.0;
    this.cycleDuration_ = duration;
    this.endAngle_ = NaN;
    this.fromAngle_ = NaN;
    this.node_ = node;
    this.startAngle_ = NaN;
    this.toAngle_ = NaN;
  }
  get byAngle() {
    return this.byAngle_;
  }
  set byAngle(value) {
    this.byAngle_ = value;
  }
  get duration() {
    return this.cycleDuration_;
  }
  set duration(value) {
    this.cycleDuration_ = value;
  }
  get fromAngle() {
    return this.fromAngle_;
  }
  set fromAngle(value) {
    this.fromAngle_ = value;
  }
  get node() {
    return this.node_;
  }
  set node(value) {
    this.node_ = value;
  }
  get toAngle() {
    return this.toAngle_;
  }
  set toAngle(value) {
    this.toAngle_ = value;
  }
  play() {
    if (!this.node_) {
      return;
    }

    this.startAngle_ = this.fromAngle_;
    if (isNaN(this.startAngle_)) {
      this.startAngle_ = this.node_.rotate;
    }
    this.endAngle_ = this.toAngle_;
    if (isNaN(this.endAngle_)) {
      this.endAngle_ = this.startAngle_ + this.byAngle_;
    }

    super.play();
  }
  _update(progress) {
    if (!this.node_) {
      return;
    }

    this.node_.rotate = this.startAngle_ - this.startAngle_ * progress + this.endAngle_ * progress;
  }
}


export class ScaleTransition extends Transition {
  constructor(duration = new Duration(400), node = null) {
    super();
    this.byX_ = 0.0;
    this.byY_ = 0.0;
    this.cycleDuration_ = duration;
    this.endX_ = NaN;
    this.endY_ = NaN;
    this.fromX_ = NaN;
    this.fromY_ = NaN;
    this.node_ = node;
    this.startX_ = NaN;
    this.startY_ = NaN;
    this.toX_ = NaN;
    this.toY_ = NaN;
  }
  get byX() {
    return this.byX_;
  }
  set byX(value) {
    this.byX_ = value;
  }
  get byY() {
    return this.byY_;
  }
  set byY(value) {
    this.byY_ = value;
  }
  get duration() {
    return this.cycleDuration_;
  }
  set duration(value) {
    this.cycleDuration_ = value;
  }
  get endX() {
    return this.endX_;
  }
  set endX(value) {
    this.endX_ = value;
  }
  get endY() {
    return this.endY_;
  }
  set endY(value) {
    this.endY_ = value;
  }
  get fromX() {
    return this.fromX_;
  }
  set fromX(value) {
    this.fromX_ = value;
  }
  get fromY() {
    return this.fromY_;
  }
  set fromY(value) {
    this.fromY_ = value;
  }
  get node() {
    return this.node_;
  }
  set node(value) {
    this.node_ = value;
  }
  get startX() {
    return this.startX_;
  }
  set startX(value) {
    this.startX_ = value;
  }
  get startY() {
    return this.startY_;
  }
  set startY(value) {
    this.startY_ = value;
  }
  get toX() {
    return this.toX_;
  }
  set toX(value) {
    this.toX_ = value;
  }
  get toY() {
    return this.toY_;
  }
  set toY(value) {
    this.toY_ = value;
  }
  play() {
    if (!this.node_) {
      return;
    }

    this.startX_ = this.fromX_;
    if (isNaN(this.startX_)) {
      this.startX_ = this.node_.scaleX;
    }
    this.endX_ = this.toX_;
    if (isNaN(this.endX_)) {
      this.endX_ = this.startX_ + this.byX_;
    }

    this.startY_ = this.fromY_;
    if (isNaN(this.startY_)) {
      this.startY_ = this.node_.scaleY;
    }
    this.endY_ = this.toY_;
    if (isNaN(this.endY_)) {
      this.endY_ = this.startY_ + this.byY_;
    }

    super.play();
  }
  _update(progress) {
    if (!this.node_) {
      return;
    }

    this.node_.scaleX = this.startX_ - this.startX_ * progress + this.endX_ * progress;
    this.node_.scaleY = this.startY_ - this.startY_ * progress + this.endY_ * progress;
  }
}


export class StrokeTransition extends Transition {
  constructor(duration = new Duration(400), shape = null) {
    super();
    this.cycleDuration_ = duration;
    this.endValue_ = null;
    this.fromValue_ = null;
    this.shape_ = shape;
    this.startValue_ = null;
    this.toValue_ = null;
  }
  get duration() {
    return this.cycleDuration_;
  }
  set duration(value) {
    this.cycleDuration_ = value;
  }
  get fromValue() {
    return this.fromValue_;
  }
  set fromValue(value) {
    this.fromValue_ = value;
  }
  get shape() {
    return this.shape_;
  }
  set shape(value) {
    this.shape_ = value;
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

    this.startValue_ = this.fromValue_;
    if (!this.startValue_) {
      this.startValue_ = this.node_.stroke;
    }
    this.endValue_ = this.toValue_;
    if (!this.endValue_) {
      this.endValue_ = this.startValue_;
    }

    super.play();
  }
  _update(progress) {
    if (!this.node_) {
      return;
    }

    let red = this.startValue_.red - this.startValue_.red * progress + this.endValue_.red * progress;
    let green = this.startValue_.green - this.startValue_.green * progress + this.endValue_.green * progress;
    let blue = this.startValue_.blue - this.startValue_.blue * progress + this.endValue_.blue * progress;
    let opacity = this.startValue_.opacity - this.startValue_.opacity * progress + this.endValue_.opacity * progress;

    this.node_.stroke = new Color(red, green, blue, opacity);
  }
}


export class TranslateTransition extends Transition {
  constructor(duration = new Duration(400), node = null) {
    super();
    this.byX_ = 0.0;
    this.byY_ = 0.0;
    this.cycleDuration_ = duration;
    this.endX_ = NaN;
    this.endY_ = NaN;
    this.fromX_ = NaN;
    this.fromY_ = NaN;
    this.node_ = node;
    this.startX_ = NaN;
    this.startY_ = NaN;
    this.toX_ = NaN;
    this.toY_ = NaN;
  }
  get byX() {
    return this.byX_;
  }
  set byX(value) {
    this.byX_ = value;
  }
  get byY() {
    return this.byY_;
  }
  set byY(value) {
    this.byY_ = value;
  }
  get duration() {
    return this.cycleDuration_;
  }
  set duration(value) {
    this.cycleDuration_ = value;
  }
  get endX() {
    return this.endX_;
  }
  set endX(value) {
    this.endX_ = value;
  }
  get endY() {
    return this.endY_;
  }
  set endY(value) {
    this.endY_ = value;
  }
  get fromX() {
    return this.fromX_;
  }
  set fromX(value) {
    this.fromX_ = value;
  }
  get fromY() {
    return this.fromY_;
  }
  set fromY(value) {
    this.fromY_ = value;
  }
  get node() {
    return this.node_;
  }
  set node(value) {
    this.node_ = value;
  }
  get startX() {
    return this.startX_;
  }
  set startX(value) {
    this.startX_ = value;
  }
  get startY() {
    return this.startY_;
  }
  set startY(value) {
    this.startY_ = value;
  }
  get toX() {
    return this.toX_;
  }
  set toX(value) {
    this.toX_ = value;
  }
  get toY() {
    return this.toY_;
  }
  set toY(value) {
    this.toY_ = value;
  }
  play() {
    if (!this.node_) {
      return;
    }

    this.startX_ = this.fromX_;
    if (isNaN(this.startX_)) {
      this.startX_ = this.node_.translateX;
    }
    this.endX_ = this.toX_;
    if (isNaN(this.endX_)) {
      this.endX_ = this.startX_ + this.byX_;
    }

    this.startY_ = this.fromY_;
    if (isNaN(this.startY_)) {
      this.startY_ = this.node_.translateY;
    }
    this.endY_ = this.toY_;
    if (isNaN(this.endY_)) {
      this.endY_ = this.startY_ + this.byY_;
    }

    super.play();
  }
  _update(progress) {
    if (!this.node_) {
      return;
    }

    this.node_.translateX = this.startX_ - this.startX_ * progress + this.endX_ * progress;
    this.node_.translateY = this.startY_ - this.startY_ * progress + this.endY_ * progress;
  }
}
