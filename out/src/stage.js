System.registerModule("../../src/stage.js", [], function() {
  "use strict";
  var __moduleName = "../../src/stage.js";
  canvasfx.stage = {};
  canvasfx.stage.Stage = function(id) {
    canvasfx.Object.call(this);
    this.canvas_ = document.createElement('canvas');
    this.context_ = this.canvas_.getContext('2d');
    this.element_ = window.document.getElementById(id);
    this.scene_ = null;
    this.height_ = this.element_.offsetHeight;
    this.isShow = false;
    this.width_ = this.element_.offsetWidth;
    this.element_.appendChild(this.canvas_);
    this.addEventListener();
    this.update();
  };
  canvasfx.inherit(canvasfx.stage.Stage, canvasfx.Object);
  canvasfx.stage.Stage.prototype.addEventListener = function() {
    var me = this;
    var callback = function(eventType) {
      return function(e) {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var event = new canvasfx.scene.input.MouseEvent(canvasfx.scene.input.MouseEvent[eventType], x, y);
        me.scene_.handleEvent(event);
      };
    };
    var events = {
      'click': 'MOUSE_CLICKED',
      'mouseover': 'MOUSE_ENTERED',
      'mouseout': 'MOUSE_EXITED',
      'mousemove': 'MOUSE_MOVED',
      'mousedown': 'MOUSE_PRESSED',
      'mouseup': 'MOUSE_RELEASED'
    };
    Object.keys(events).forEach(function(key) {
      var value = this[key];
      me.canvas_.addEventListener(key, callback(value));
    }, events);
    this.canvas_.addEventListener('mousedown', function(e) {
      var event = e;
      callback('MOUSE_DRAGGED')(e);
      var mousemove = function(e) {
        event = e;
        callback('MOUSE_DRAGGED')(e);
      };
      var timer = null;
      (function animationLoop() {
        timer = canvasfx.animation.AnimationTimer.requestAnimationFrame_()(animationLoop);
        mousemove(event);
      })();
      var mouseup = function() {
        me.canvas_.removeEventListener('mousemove', mousemove);
        me.canvas_.removeEventListener('mouseup', mouseup);
        canvasfx.animation.AnimationTimer.cancelAnimationFrame_()(timer);
      };
      me.canvas_.addEventListener('mousemove', mousemove);
      me.canvas_.addEventListener('mouseup', mouseup);
    });
  };
  canvasfx.stage.Stage.prototype.clear = function() {
    this.context_.setTransform(1, 0, 0, 1, 0, 0);
    this.context_.clearRect(0, 0, this.width_, this.height_);
  };
  canvasfx.stage.Stage.prototype.draw = function() {
    this.scene_.getRoot().draw(this.context_);
  };
  canvasfx.stage.Stage.prototype.getWidth = function() {
    return this.width_;
  };
  canvasfx.stage.Stage.prototype.getHeight = function() {
    return this.height_;
  };
  canvasfx.stage.Stage.prototype.redraw = function() {
    this.clear();
    this.draw();
  };
  canvasfx.stage.Stage.prototype.setScene = function(value) {
    this.scene_ = value;
    if (this.scene_.getWidth() && this.scene_.getHeight()) {
      this.width_ = this.scene_.getWidth();
      this.height_ = this.scene_.getHeight();
    } else {
      this.canvas_.width = this.width_;
      this.canvas_.height = this.height_;
      this.scene_.setWidth(this.width_);
      this.scene_.setHeight(this.height_);
    }
  };
  canvasfx.stage.Stage.prototype.show = function() {
    this.isShow = true;
  };
  canvasfx.stage.Stage.prototype.update = function() {
    var me = this;
    (function() {
      var t = new canvasfx.animation.AnimationTimer();
      t.handle = function() {
        if (!me.isShow)
          return;
        me.redraw();
      };
      return t;
    })().start();
  };
  return {};
});
System.get("../../src/stage.js" + '');
