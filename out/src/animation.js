System.registerModule("../../src/animation.js", [], function() {
  "use strict";
  var __moduleName = "../../src/animation.js";
  canvasfx.animation = {};
  canvasfx.animation.KeyFrame = function(time, onFinished) {
    canvasfx.Object.call(this);
    this.onFinished_ = onFinished;
    this.time_ = time;
  };
  canvasfx.inherit(canvasfx.animation.KeyFrame, canvasfx.Object);
  canvasfx.animation.KeyFrame.prototype.getOnFinished = function() {
    return this.onFinished_;
  };
  canvasfx.animation.KeyFrame.prototype.getTime = function() {
    return this.time_;
  };
  canvasfx.animation.AnimationTimer = function() {
    canvasfx.Object.call(this);
    this.id_ = null;
  };
  canvasfx.inherit(canvasfx.animation.AnimationTimer, canvasfx.Object);
  canvasfx.animation.AnimationTimer.prototype.handle = canvasfx.abstractMethod;
  canvasfx.animation.AnimationTimer.prototype.start = function() {
    this.stop();
    var me = this;
    (function animationLoop() {
      me.id_ = canvasfx.animation.AnimationTimer.requestAnimationFrame_()(animationLoop);
      me.handle(Date.now());
    })();
  };
  canvasfx.animation.AnimationTimer.prototype.stop = function() {
    canvasfx.animation.AnimationTimer.cancelAnimationFrame_()(this.id_);
    this.id_ = null;
  };
  canvasfx.animation.AnimationTimer.requestAnimationFrame_ = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  };
  canvasfx.animation.AnimationTimer.cancelAnimationFrame_ = function() {
    return window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || function(id) {
      window.clearTimeout(id);
    };
  };
  canvasfx.animation.Animation = function(opt_targetFramerate) {
    canvasfx.Object.call(this);
    this.autoReverse = false;
    this.cycleCount = 1.0;
    this.cycleDuration = canvasfx.util.Duration.ZERO;
    this.currentTime = canvasfx.util.Duration.ZERO;
    this.delay = canvasfx.util.Duration.ZERO;
    this.onFinished = null;
    this.rate = 1.0;
    this.status = canvasfx.animation.Animation.Status.STOPPED;
    this.timer_ = null;
  };
  canvasfx.inherit(canvasfx.animation.Animation, canvasfx.Object);
  canvasfx.animation.Animation.prototype.isAutoReverse = function() {
    return this.autoReverse;
  };
  canvasfx.animation.Animation.prototype.getCurrentTime = function() {
    return this.currentTime;
  };
  canvasfx.animation.Animation.prototype.getCycleCount = function() {
    return this.cycleCount;
  };
  canvasfx.animation.Animation.prototype.getCycleDuration = function() {
    return this.cycleDuration;
  };
  canvasfx.animation.Animation.prototype.getDelay = function() {
    return this.delay;
  };
  canvasfx.animation.Animation.prototype.getOnFinished = function() {
    return this.onFinished;
  };
  canvasfx.animation.Animation.prototype.getRate = function() {
    return this.rate;
  };
  canvasfx.animation.Animation.prototype.getStatus = function() {
    return this.status;
  };
  canvasfx.animation.Animation.prototype.getTotalDuration = function() {
    if (this.cycleCount == canvasfx.animation.Animation.INDEFINITE) {
      return canvasfx.util.Duration.INDEFINITE;
    }
    return canvasfx.util.Duration.millis(this.cycleCount * this.cycleDuration.toMillis());
  };
  canvasfx.animation.Animation.prototype.pause = function() {
    if (this.status != canvasfx.animation.Animation.Status.RUNNING) {
      return;
    }
    this.status = canvasfx.animation.Animation.Status.PAUSED;
  };
  canvasfx.animation.Animation.prototype.play = function() {
    if (this.status == canvasfx.animation.Animation.Status.RUNNING) {
      return;
    }
    this.status = canvasfx.animation.Animation.Status.RUNNING;
    if (this.timer_) {
      return;
    }
    var me = this;
    this.timer_ = (function() {
      var beforeTime = Date.now();
      var delta = 0;
      var time = canvasfx.util.Duration.ZERO;
      var t = new canvasfx.animation.AnimationTimer();
      t.handle = function(now) {
        delta = now - beforeTime;
        beforeTime = now;
        delta *= me.rate;
        if (me.status != canvasfx.animation.Animation.Status.RUNNING) {
          return;
        }
        time = time.add(new canvasfx.util.Duration(delta));
        if (time.lessThan(me.delay)) {
          return;
        }
        me.currentTime = me.currentTime.add(new canvasfx.util.Duration(delta));
        if (me.currentTime.greaterThan(me.getTotalDuration())) {
          me.currentTime = me.getTotalDuration();
        }
        var reverse = !!(parseInt(me.currentTime.toMillis() / me.cycleDuration.toMillis()) % 2) && me.autoReverse;
        var progress = me.currentTime.toMillis() % me.cycleDuration.toMillis() / me.cycleDuration.toMillis();
        if (progress == 0 && !me.autoReverse) {
          progress = 1.0;
        }
        progress = reverse ? (1 - progress) : progress;
        me.update(progress);
        if (me.currentTime.greaterThanOrEqualTo(me.getTotalDuration())) {
          var event = new canvasfx.event.ActionEvent();
          if (me.onFinished) {
            me.onFinished.handle(event);
          }
          t.stop();
          me.stop();
        }
      };
      return t;
    })();
    this.timer_.start();
  };
  canvasfx.animation.Animation.prototype.setAutoReverse = function(value) {
    this.autoReverse = value;
  };
  canvasfx.animation.Animation.prototype.setCycleCount = function(value) {
    this.cycleCount = value;
  };
  canvasfx.animation.Animation.prototype.setCycleDuration = function(value) {
    this.cycleDuration = value;
  };
  canvasfx.animation.Animation.prototype.setDelay = function(value) {
    this.delay = value;
  };
  canvasfx.animation.Animation.prototype.setOnFinished = function(value) {
    this.onFinished = value;
  };
  canvasfx.animation.Animation.prototype.setRate = function(value) {
    this.rate = value;
  };
  canvasfx.animation.Animation.prototype.stop = function() {
    if (this.status != canvasfx.animation.Animation.Status.RUNNING) {
      return;
    }
    this.status = canvasfx.animation.Animation.Status.STOPPED;
    if (this.timer_) {
      this.timer_.stop();
      this.timer_ = null;
    }
    this.currentTime = canvasfx.util.Duration.ZERO;
  };
  canvasfx.animation.Animation.prototype.update = function(progress) {};
  canvasfx.animation.Animation.INDEFINITE = -1;
  canvasfx.animation.Animation.Status = {
    PAUSED: 'paused',
    RUNNING: 'running',
    STOPPED: 'stopped'
  };
  canvasfx.animation.Timeline = function(var_args) {
    canvasfx.animation.Animation.call(this);
    this.animations_ = [];
    this.keyFrames_ = Array.prototype.slice.call(arguments);
  };
  canvasfx.inherit(canvasfx.animation.Timeline, canvasfx.animation.Animation);
  canvasfx.animation.Timeline.prototype.getKeyFrames = function() {
    return this.keyFrames_;
  };
  canvasfx.animation.Timeline.prototype.pause = function() {
    this.animations_.forEach(function(element) {
      element.pause();
    });
  };
  canvasfx.animation.Timeline.prototype.play = function() {
    var me = this;
    this.keyFrames_.forEach(function(element, index) {
      var animation = me.animations_[index];
      if (animation && animation.status != canvasfx.animation.Animation.Status.STOPPED) {} else {
        animation = new canvasfx.animation.Animation();
        animation.setDelay(element.getTime());
        animation.setOnFinished(element.getOnFinished());
        me.animations_[index] = animation;
      }
    });
    this.animations_ = this.animations_.slice(0, this.keyFrames_.length);
    this.animations_.forEach(function(element) {
      element.play();
    });
  };
  canvasfx.animation.Timeline.prototype.update = function() {};
  canvasfx.animation.Timeline.prototype.stop = function() {
    this.animations_.forEach(function(element) {
      element.stop();
    });
  };
  canvasfx.animation.Transition = function() {
    canvasfx.animation.Animation.call(this);
    this.node = null;
  };
  canvasfx.inherit(canvasfx.animation.Transition, canvasfx.animation.Animation);
  canvasfx.animation.Transition.prototype.getDuration = function() {
    return this.cycleDuration;
  };
  canvasfx.animation.Transition.prototype.getNode = function() {
    return this.node;
  };
  canvasfx.animation.Transition.prototype.setDuration = function(value) {
    this.cycleDuration = value;
  };
  canvasfx.animation.Transition.prototype.setNode = function(value) {
    this.node = value;
  };
  canvasfx.animation.FadeTransition = function(opt_duration, opt_node) {
    canvasfx.animation.Transition.call(this);
    this.cycleDuration = canvasfx.supplement(opt_duration, new canvasfx.util.Duration(400));
    this.node = canvasfx.supplement(opt_node, null);
    this.byValue_ = 0.0;
    this.endValue_ = NaN;
    this.fromValue_ = NaN;
    this.startValue_ = NaN;
    this.toValue_ = NaN;
  };
  canvasfx.inherit(canvasfx.animation.FadeTransition, canvasfx.animation.Transition);
  canvasfx.animation.FadeTransition.prototype.getByValue = function() {
    return this.byValue_;
  };
  canvasfx.animation.FadeTransition.prototype.getFromValue = function() {
    return this.fromValue_;
  };
  canvasfx.animation.FadeTransition.prototype.getToValue = function() {
    return this.toValue_;
  };
  canvasfx.animation.FadeTransition.prototype.play = function() {
    if (!this.node) {
      return;
    }
    this.startValue_ = NaN;
    this.endValue_ = NaN;
    this.startValue_ = this.fromValue_;
    if (isNaN(this.startValue_)) {
      this.startValue_ = this.node.getOpacity();
    }
    this.endValue_ = this.toValue_;
    if (isNaN(this.endValue_)) {
      this.endValue_ = this.startValue_ + this.byValue_;
    }
    canvasfx.animation.Animation.prototype.play.call(this);
  };
  canvasfx.animation.FadeTransition.prototype.setByValue = function(value) {
    this.byValue_ = value;
  };
  canvasfx.animation.FadeTransition.prototype.setFromValue = function(value) {
    this.fromValue_ = value;
  };
  canvasfx.animation.FadeTransition.prototype.setToValue = function(value) {
    this.toValue_ = value;
  };
  canvasfx.animation.FadeTransition.prototype.update = function(progress) {
    if (!this.node) {
      return;
    }
    var value = this.startValue_ - this.startValue_ * progress + this.endValue_ * progress;
    this.node.setOpacity(value);
  };
  canvasfx.animation.FillTransition = function(opt_duration, opt_shape) {
    canvasfx.animation.Transition.call(this);
    this.cycleDuration = canvasfx.supplement(opt_duration, new canvasfx.util.Duration(400));
    this.endValue_ = null;
    this.fromValue_ = null;
    this.node = canvasfx.supplement(opt_shape, null);
    this.startValue_ = null;
    this.toValue_ = null;
  };
  canvasfx.inherit(canvasfx.animation.FillTransition, canvasfx.animation.Transition);
  canvasfx.animation.FillTransition.prototype.getFromValue = function() {
    return this.fromValue_;
  };
  canvasfx.animation.FillTransition.prototype.getToValue = function() {
    return this.toValue_;
  };
  canvasfx.animation.FillTransition.prototype.play = function() {
    if (!this.node) {
      return;
    }
    this.startValue_ = null;
    this.endValue_ = null;
    this.startValue_ = this.fromValue_;
    if (!this.startValue_) {
      this.startValue_ = this.node.getFill();
    }
    this.endValue_ = this.toValue_;
    if (!this.endValue_) {
      this.endValue_ = this.startValue_;
    }
    canvasfx.animation.Animation.prototype.play.call(this);
  };
  canvasfx.animation.FillTransition.prototype.setFromValue = function(value) {
    this.fromValue_ = value;
  };
  canvasfx.animation.FillTransition.prototype.setShape = function(value) {
    this.node = value;
  };
  canvasfx.animation.FillTransition.prototype.setToValue = function(value) {
    this.toValue_ = value;
  };
  canvasfx.animation.FillTransition.prototype.update = function(progress) {
    if (!this.node) {
      return;
    }
    var red = this.startValue_.getRed() - this.startValue_.getRed() * progress + this.endValue_.getRed() * progress;
    var green = this.startValue_.getGreen() - this.startValue_.getGreen() * progress + this.endValue_.getGreen() * progress;
    var blue = this.startValue_.getBlue() - this.startValue_.getBlue() * progress + this.endValue_.getBlue() * progress;
    var opacity = this.startValue_.getOpacity() - this.startValue_.getOpacity() * progress + this.endValue_.getOpacity() * progress;
    this.node.setFill(new canvasfx.scene.paint.Color(red, green, blue, opacity));
  };
  canvasfx.animation.RotateTransition = function(opt_duration, opt_node) {
    canvasfx.animation.Transition.call(this);
    this.cycleDuration = canvasfx.supplement(opt_duration, new canvasfx.util.Duration(400));
    this.node = canvasfx.supplement(opt_node, null);
    this.byAngle_ = 0.0;
    this.endAngle_ = NaN;
    this.fromAngle_ = NaN;
    this.startAngle_ = NaN;
    this.toAngle_ = NaN;
  };
  canvasfx.inherit(canvasfx.animation.RotateTransition, canvasfx.animation.Transition);
  canvasfx.animation.RotateTransition.prototype.getByAngle = function() {
    return this.byAngle_;
  };
  canvasfx.animation.RotateTransition.prototype.getFromAngle = function() {
    return this.fromAngle_;
  };
  canvasfx.animation.RotateTransition.prototype.getToAngle = function() {
    return this.toAngle_;
  };
  canvasfx.animation.RotateTransition.prototype.play = function() {
    if (!this.node) {
      return;
    }
    this.startAngle_ = NaN;
    this.endAngle_ = NaN;
    this.startAngle_ = this.fromAngle_;
    if (isNaN(this.startAngle_)) {
      this.startAngle_ = this.node.getRotate();
    }
    this.endAngle_ = this.toAngle_;
    if (isNaN(this.endAngle_)) {
      this.endAngle_ = this.startAngle_ + this.byAngle_;
    }
    canvasfx.animation.Animation.prototype.play.call(this);
  };
  canvasfx.animation.RotateTransition.prototype.setByAngle = function(value) {
    this.byAngle_ = value;
  };
  canvasfx.animation.RotateTransition.prototype.setFromAngle = function(value) {
    this.fromAngle_ = value;
  };
  canvasfx.animation.RotateTransition.prototype.setToAngle = function(value) {
    this.toAngle_ = value;
  };
  canvasfx.animation.RotateTransition.prototype.update = function(progress) {
    if (!this.node) {
      return;
    }
    var angle = this.startAngle_ - this.startAngle_ * progress + this.endAngle_ * progress;
    this.node.setRotate(angle);
  };
  canvasfx.animation.ScaleTransition = function(opt_duration, opt_node) {
    canvasfx.animation.Transition.call(this);
    this.cycleDuration = canvasfx.supplement(opt_duration, new canvasfx.util.Duration(400));
    this.node = canvasfx.supplement(opt_node, null);
    this.byX_ = 0.0;
    this.byY_ = 0.0;
    this.endX_ = NaN;
    this.endY_ = NaN;
    this.fromX_ = NaN;
    this.fromY_ = NaN;
    this.startX_ = NaN;
    this.startY_ = NaN;
    this.toX_ = NaN;
    this.toY_ = NaN;
  };
  canvasfx.inherit(canvasfx.animation.ScaleTransition, canvasfx.animation.Transition);
  canvasfx.animation.ScaleTransition.prototype.getByX = function() {
    return this.byX_;
  };
  canvasfx.animation.ScaleTransition.prototype.getByY = function() {
    return this.byY_;
  };
  canvasfx.animation.ScaleTransition.prototype.getFromX = function() {
    return this.fromX_;
  };
  canvasfx.animation.ScaleTransition.prototype.getFromY = function() {
    return this.fromY_;
  };
  canvasfx.animation.ScaleTransition.prototype.getToX = function() {
    return this.toX_;
  };
  canvasfx.animation.ScaleTransition.prototype.getToY = function() {
    return this.toY_;
  };
  canvasfx.animation.ScaleTransition.prototype.play = function() {
    if (!this.node) {
      return;
    }
    this.startX_ = NaN;
    this.endX_ = NaN;
    this.startX_ = this.fromX_;
    if (isNaN(this.startX_)) {
      this.startX_ = this.node.getScaleX();
    }
    this.endX_ = this.toX_;
    if (isNaN(this.endX_)) {
      this.endX_ = this.startX_ + this.byX_;
    }
    this.startY_ = NaN;
    this.endY_ = NaN;
    this.startY_ = this.fromY_;
    if (isNaN(this.startY_)) {
      this.startY_ = this.node.getScaleY();
    }
    this.endY_ = this.toY_;
    if (isNaN(this.endY_)) {
      this.endY_ = this.startY_ + this.byY_;
    }
    canvasfx.animation.Animation.prototype.play.call(this);
  };
  canvasfx.animation.ScaleTransition.prototype.setByX = function(value) {
    this.byX_ = value;
  };
  canvasfx.animation.ScaleTransition.prototype.setByY = function(value) {
    this.byY_ = value;
  };
  canvasfx.animation.ScaleTransition.prototype.setFromX = function(value) {
    this.fromX_ = value;
  };
  canvasfx.animation.ScaleTransition.prototype.setFromY = function(value) {
    this.fromY_ = value;
  };
  canvasfx.animation.ScaleTransition.prototype.setToX = function(value) {
    this.toX_ = value;
  };
  canvasfx.animation.ScaleTransition.prototype.setToY = function(value) {
    this.toY_ = value;
  };
  canvasfx.animation.ScaleTransition.prototype.update = function(progress) {
    if (!this.node) {
      return;
    }
    var x = this.startX_ - this.startX_ * progress + this.endX_ * progress;
    var y = this.startY_ - this.startY_ * progress + this.endY_ * progress;
    this.node.setScaleX(x);
    this.node.setScaleY(y);
  };
  canvasfx.animation.StrokeTransition = function(opt_duration, opt_shape) {
    canvasfx.animation.Transition.call(this);
    this.cycleDuration = canvasfx.supplement(opt_duration, new canvasfx.util.Duration(400));
    this.endValue_ = null;
    this.fromValue_ = null;
    this.node = canvasfx.supplement(opt_shape, null);
    this.startValue_ = null;
    this.toValue_ = null;
  };
  canvasfx.inherit(canvasfx.animation.StrokeTransition, canvasfx.animation.Transition);
  canvasfx.animation.StrokeTransition.prototype.getFromValue = function() {
    return this.fromValue_;
  };
  canvasfx.animation.StrokeTransition.prototype.getToValue = function() {
    return this.toValue_;
  };
  canvasfx.animation.StrokeTransition.prototype.play = function() {
    if (!this.node) {
      return;
    }
    this.startValue_ = null;
    this.endValue_ = null;
    this.startValue_ = this.fromValue_;
    if (!this.startValue_) {
      this.startValue_ = this.node.getStroke();
    }
    this.endValue_ = this.toValue_;
    if (!this.endValue_) {
      this.endValue_ = this.startValue_;
    }
    canvasfx.animation.Animation.prototype.play.call(this);
  };
  canvasfx.animation.StrokeTransition.prototype.setFromValue = function(value) {
    this.fromValue_ = value;
  };
  canvasfx.animation.StrokeTransition.prototype.setShape = function(value) {
    this.node = value;
  };
  canvasfx.animation.StrokeTransition.prototype.setToValue = function(value) {
    this.toValue_ = value;
  };
  canvasfx.animation.StrokeTransition.prototype.update = function(progress) {
    if (!this.node) {
      return;
    }
    var red = this.startValue_.getRed() - this.startValue_.getRed() * progress + this.endValue_.getRed() * progress;
    var green = this.startValue_.getGreen() - this.startValue_.getGreen() * progress + this.endValue_.getGreen() * progress;
    var blue = this.startValue_.getBlue() - this.startValue_.getBlue() * progress + this.endValue_.getBlue() * progress;
    var opacity = this.startValue_.getOpacity() - this.startValue_.getOpacity() * progress + this.endValue_.getOpacity() * progress;
    this.node.setStroke(new canvasfx.scene.paint.Color(red, green, blue, opacity));
  };
  canvasfx.animation.TranslateTransition = function(opt_duration, opt_node) {
    canvasfx.animation.Transition.call(this);
    this.cycleDuration = canvasfx.supplement(opt_duration, new canvasfx.util.Duration(400));
    this.node = canvasfx.supplement(opt_node, null);
    this.byX_ = 0.0;
    this.byY_ = 0.0;
    this.endX_ = NaN;
    this.endY_ = NaN;
    this.fromX_ = NaN;
    this.fromY_ = NaN;
    this.startX_ = NaN;
    this.startY_ = NaN;
    this.toX_ = NaN;
    this.toY_ = NaN;
  };
  canvasfx.inherit(canvasfx.animation.TranslateTransition, canvasfx.animation.Transition);
  canvasfx.animation.TranslateTransition.prototype.getByX = function() {
    return this.byX_;
  };
  canvasfx.animation.TranslateTransition.prototype.getByY = function() {
    return this.byY_;
  };
  canvasfx.animation.TranslateTransition.prototype.getFromX = function() {
    return this.fromX_;
  };
  canvasfx.animation.TranslateTransition.prototype.getFromY = function() {
    return this.fromY_;
  };
  canvasfx.animation.TranslateTransition.prototype.getToX = function() {
    return this.toX_;
  };
  canvasfx.animation.TranslateTransition.prototype.getToY = function() {
    return this.toY_;
  };
  canvasfx.animation.TranslateTransition.prototype.play = function() {
    if (!this.node) {
      return;
    }
    this.startX_ = NaN;
    this.endX_ = NaN;
    this.startX_ = this.fromX_;
    if (isNaN(this.startX_)) {
      this.startX_ = this.node.getTranslateX();
    }
    this.endX_ = this.toX_;
    if (isNaN(this.endX_)) {
      this.endX_ = this.startX_ + this.byX_;
    }
    this.startY_ = NaN;
    this.endY_ = NaN;
    this.startY_ = this.fromY_;
    if (isNaN(this.startY_)) {
      this.startY_ = this.node.getTranslateY();
    }
    this.endY_ = this.toY_;
    if (isNaN(this.endY_)) {
      this.endY_ = this.startY_ + this.byY_;
    }
    canvasfx.animation.Animation.prototype.play.call(this);
  };
  canvasfx.animation.TranslateTransition.prototype.setByX = function(value) {
    this.byX_ = value;
  };
  canvasfx.animation.TranslateTransition.prototype.setByY = function(value) {
    this.byY_ = value;
  };
  canvasfx.animation.TranslateTransition.prototype.setFromX = function(value) {
    this.fromX_ = value;
  };
  canvasfx.animation.TranslateTransition.prototype.setFromY = function(value) {
    this.fromY_ = value;
  };
  canvasfx.animation.TranslateTransition.prototype.setToX = function(value) {
    this.toX_ = value;
  };
  canvasfx.animation.TranslateTransition.prototype.setToY = function(value) {
    this.toY_ = value;
  };
  canvasfx.animation.TranslateTransition.prototype.update = function(progress) {
    if (!this.node) {
      return;
    }
    var x = this.startX_ - this.startX_ * progress + this.endX_ * progress;
    var y = this.startY_ - this.startY_ * progress + this.endY_ * progress;
    this.node.setTranslateX(x);
    this.node.setTranslateY(y);
  };
  return {};
});
System.get("../../src/animation.js" + '');
