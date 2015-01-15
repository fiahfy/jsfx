System.registerModule("../../../src/scene/shape.js", [], function() {
  "use strict";
  var __moduleName = "../../../src/scene/shape.js";
  canvasfx.scene.shape = {};
  canvasfx.scene.shape.StrokeType = {
    CENTERED: 'centered',
    INSIDE: 'inside',
    OUTSIDE: 'outside'
  };
  canvasfx.scene.shape.Shape = function() {
    canvasfx.scene.Node.call(this);
    this.fill = null;
    this.stroke = null;
    this.strokeType = canvasfx.scene.shape.StrokeType.CENTERED;
    this.strokeWidth = 1.0;
  };
  canvasfx.inherit(canvasfx.scene.shape.Shape, canvasfx.scene.Node);
  canvasfx.scene.shape.Shape.prototype.getCurrentFill = function() {
    if (!this.fill) {
      return null;
    }
    return canvasfx.scene.paint.Color.color(this.fill.getRed(), this.fill.getGreen(), this.fill.getBlue(), this.fill.getOpacity() * this.opacity);
  };
  canvasfx.scene.shape.Shape.prototype.getCurrentStroke = function() {
    if (!this.stroke) {
      return null;
    }
    return canvasfx.scene.paint.Color.color(this.stroke.getRed(), this.stroke.getGreen(), this.stroke.getBlue(), this.stroke.getOpacity() * this.opacity);
  };
  canvasfx.scene.shape.Shape.prototype.getFill = function() {
    return this.fill;
  };
  canvasfx.scene.shape.Shape.prototype.getStroke = function() {
    return this.stroke;
  };
  canvasfx.scene.shape.Shape.prototype.getStrokeType = function() {
    return this.strokeType;
  };
  canvasfx.scene.shape.Shape.prototype.getStrokeWidth = function() {
    return this.strokeWidth;
  };
  canvasfx.scene.shape.Shape.prototype.setFill = function(value) {
    this.fill = value;
  };
  canvasfx.scene.shape.Shape.prototype.setStroke = function(value) {
    this.stroke = value;
  };
  canvasfx.scene.shape.Shape.prototype.setStrokeType = function(value) {
    this.strokeType = value;
  };
  canvasfx.scene.shape.Shape.prototype.setStrokeWidth = function(value) {
    this.strokeWidth = value;
  };
  canvasfx.scene.shape.Circle = function(opt_centerX, opt_centerY, opt_radius) {
    canvasfx.scene.shape.Shape.call(this);
    this.centerX_ = canvasfx.supplement(opt_centerX, 0.0);
    this.centerY_ = canvasfx.supplement(opt_centerY, 0.0);
    this.radius_ = canvasfx.supplement(opt_radius, 0.0);
    this.fill = canvasfx.scene.paint.Color.BLACK;
  };
  canvasfx.inherit(canvasfx.scene.shape.Circle, canvasfx.scene.shape.Shape);
  canvasfx.scene.shape.Circle.prototype.contains = function(x, opt_y) {
    if (x instanceof canvasfx.geometry.Point) {
      opt_y = x.getY();
      x = x.getX();
    }
    var point = new canvasfx.geometry.Point(this.getCurrentCenterX(), this.getCurrentCenterY());
    return (point.distance(x, opt_y) <= this.radius_);
  };
  canvasfx.scene.shape.Circle.prototype.draw = function(context) {
    if (this.getCurrentFill()) {
      context.fillStyle = this.getCurrentFill().getWeb();
      context.globalAlpha = this.getCurrentFill().getOpacity();
      context.setTransform(1, 0, 0, 1, 0, 0);
      this.transform(context);
      context.beginPath();
      context.arc(0, 0, this.radius_, 0, Math.PI * 2, false);
      context.fill();
    }
    if (this.getCurrentStroke()) {
      context.strokeStyle = this.getCurrentStroke().getWeb();
      context.globalAlpha = this.getCurrentStroke().getOpacity();
      context.lineWidth = this.strokeWidth;
      var offset = 0;
      switch (this.strokeType) {
        case canvasfx.scene.shape.StrokeType.OUTSIDE:
          offset = this.strokeWidth / 2;
          break;
        case canvasfx.scene.shape.StrokeType.INSIDE:
          offset = -this.strokeWidth / 2;
          break;
        case canvasfx.scene.shape.StrokeType.CENTERED:
        default:
          offset = 0;
          break;
      }
      context.setTransform(1, 0, 0, 1, 0, 0);
      this.transform(context);
      context.beginPath();
      context.arc(0, 0, this.radius_ + offset, 0, Math.PI * 2, false);
      context.stroke();
    }
  };
  canvasfx.scene.shape.Circle.prototype.getCenterX = function() {
    return this.centerX_;
  };
  canvasfx.scene.shape.Circle.prototype.getCenterY = function() {
    return this.centerY_;
  };
  canvasfx.scene.shape.Circle.prototype.getCurrentCenterX = function() {
    return this.centerX_ + this.layoutX + this.translateX;
  };
  canvasfx.scene.shape.Circle.prototype.getCurrentCenterY = function() {
    return this.centerY_ + this.layoutY + this.translateY;
  };
  canvasfx.scene.shape.Circle.prototype.getLayoutBounds = function() {
    return new canvasfx.geometry.Bounds(this.centerX_ - this.radius_, this.centerY_ - this.radius_, 2 * this.radius_, 2 * this.radius_);
  };
  canvasfx.scene.shape.Circle.prototype.getRadius = function() {
    return this.radius_;
  };
  canvasfx.scene.shape.Circle.prototype.setCenterX = function(value) {
    this.centerX_ = value;
  };
  canvasfx.scene.shape.Circle.prototype.setCenterY = function(value) {
    this.centerY_ = value;
  };
  canvasfx.scene.shape.Circle.prototype.setRadius = function(value) {
    this.radius_ = value;
  };
  canvasfx.scene.shape.Rectangle = function(opt_x, opt_y, opt_width, opt_height) {
    canvasfx.scene.shape.Shape.call(this);
    this.arcHeight_ = 0.0;
    this.arcWidth_ = 0.0;
    this.height_ = canvasfx.supplement(opt_height, 0.0);
    this.width_ = canvasfx.supplement(opt_width, 0.0);
    this.x_ = canvasfx.supplement(opt_x, 0.0);
    this.y_ = canvasfx.supplement(opt_y, 0.0);
    this.fill = canvasfx.scene.paint.Color.BLACK;
  };
  canvasfx.inherit(canvasfx.scene.shape.Rectangle, canvasfx.scene.shape.Shape);
  canvasfx.scene.shape.Rectangle.prototype.contains = function(x, opt_y) {
    if (x instanceof canvasfx.geometry.Point) {
      opt_y = x.getY();
      x = x.getX();
    }
    var centerX,
        centerY;
    if (this.getCurrentX() + this.arcWidth_ <= x && x <= this.getCurrentX() + this.width_ - this.arcWidth_ && this.getCurrentY() <= opt_y && opt_y <= this.getCurrentY() + this.height_) {
      return true;
    } else if (this.getCurrentX() <= x && x <= this.getCurrentX() + this.width_ && this.getCurrentY() + this.arcHeight_ <= opt_y && opt_y <= this.getCurrentY() + this.height_ - this.arcHeight_) {
      return true;
    } else if (this.getCurrentX() <= x && x <= this.getCurrentX() + this.arcWidth_ && this.getCurrentY() <= opt_y && opt_y <= this.getCurrentY() + this.arcHeight_) {
      centerX = this.getCurrentX() + this.arcWidth_;
      centerY = this.getCurrentY() + this.arcHeight_;
    } else if (this.getCurrentX() + this.width_ - this.arcWidth_ <= x && x <= this.getCurrentX() + this.width_ && this.getCurrentY() <= opt_y && opt_y <= this.getCurrentY() + this.arcHeight_) {
      centerX = this.getCurrentX() + this.width_ - this.arcWidth_;
      centerY = this.getCurrentY() + this.arcHeight_;
    } else if (this.getCurrentX() + this.width_ - this.arcWidth_ <= x && x <= this.getCurrentX() + this.width_ && this.getCurrentY() + this.height_ - this.arcHeight_ <= opt_y && opt_y <= this.getCurrentY() + this.height_) {
      centerX = this.getCurrentX() + this.width_ - this.arcWidth_;
      centerY = this.getCurrentY() + this.height_ - this.arcHeight_;
    } else if (this.getCurrentX() <= x && x <= this.getCurrentX() + this.arcWidth_ && this.getCurrentY() + this.height_ - this.arcHeight_ <= opt_y && opt_y <= this.getCurrentY() + this.height_) {
      centerX = this.getCurrentX() + this.arcWidth_;
      centerY = this.getCurrentY() + this.height_ - this.arcHeight_;
    }
    return false;
  };
  canvasfx.scene.shape.Rectangle.prototype.draw = function(context) {
    if (this.getCurrentFill()) {
      context.fillStyle = this.getCurrentFill().getWeb();
      context.globalAlpha = this.getCurrentFill().getOpacity();
      context.setTransform(1, 0, 0, 1, 0, 0);
      this.transform(context);
      context.beginPath();
      context.moveTo(parseInt(-this.width_ / 2 + this.arcWidth_), parseInt(-this.height_ / 2));
      context.lineTo(parseInt(this.width_ / 2 - this.arcWidth_), parseInt(-this.height_ / 2));
      context.quadraticCurveTo(parseInt(this.width_ / 2), parseInt(-this.height_ / 2), parseInt(this.width_ / 2), parseInt(-this.height_ / 2 + this.arcHeight_));
      context.lineTo(parseInt(this.width_ / 2), parseInt(this.height_ / 2 - this.arcHeight_));
      context.quadraticCurveTo(parseInt(this.width_ / 2), parseInt(this.height_ / 2), parseInt(this.width_ / 2 - this.arcWidth_), parseInt(this.height_ / 2));
      context.lineTo(parseInt(-this.width_ / 2 + this.arcWidth_), parseInt(this.height_ / 2));
      context.quadraticCurveTo(parseInt(-this.width_ / 2), parseInt(this.height_ / 2), parseInt(-this.width_ / 2), parseInt(this.height_ / 2 - this.arcHeight_));
      context.lineTo(parseInt(-this.width_ / 2), parseInt(-this.height_ / 2 + this.arcHeight_));
      context.quadraticCurveTo(parseInt(-this.width_ / 2), parseInt(-this.height_ / 2), parseInt(-this.width_ / 2 + this.arcWidth_), parseInt(-this.height_ / 2));
      context.fill();
    }
    if (this.getCurrentStroke()) {
      context.strokeStyle = this.getCurrentStroke().getWeb();
      context.globalAlpha = this.getCurrentStroke().getOpacity();
      context.lineWidth = this.strokeWidth;
      var offsetPosition = 0;
      var offsetSize = 0;
      switch (this.strokeType) {
        case canvasfx.scene.shape.StrokeType.OUTSIDE:
          offsetPosition = -this.strokeWidth / 2;
          offsetSize = this.strokeWidth;
          break;
        case canvasfx.scene.shape.StrokeType.INSIDE:
          offsetPosition = this.strokeWidth / 2;
          offsetSize = -this.strokeWidth;
          break;
        case canvasfx.scene.shape.StrokeType.CENTERED:
        default:
          offsetPosition = (this.strokeWidth % 2) / 2;
          offsetSize = 0;
          break;
      }
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.transform(1, 0, 0, 1, offsetSize / 2 + offsetPosition, offsetSize / 2 + offsetPosition);
      this.transform(context);
      context.beginPath();
      context.moveTo(parseInt(-(this.width_ + offsetSize) / 2 + this.arcWidth_), parseInt(-(this.height_ + offsetSize) / 2));
      context.lineTo(parseInt((this.width_ + offsetSize) / 2 - this.arcWidth_), parseInt(-(this.height_ + offsetSize) / 2));
      context.quadraticCurveTo(parseInt((this.width_ + offsetSize) / 2), parseInt(-(this.height_ + offsetSize) / 2), parseInt((this.width_ + offsetSize) / 2), parseInt(-(this.height_ + offsetSize) / 2 + this.arcHeight_));
      context.lineTo(parseInt((this.width_ + offsetSize) / 2), parseInt((this.height_ + offsetSize) / 2 - this.arcHeight_));
      context.quadraticCurveTo(parseInt((this.width_ + offsetSize) / 2), parseInt((this.height_ + offsetSize) / 2), parseInt((this.width_ + offsetSize) / 2 - this.arcWidth_), parseInt((this.height_ + offsetSize) / 2));
      context.lineTo(parseInt(-(this.width_ + offsetSize) / 2 + this.arcWidth_), parseInt((this.height_ + offsetSize) / 2));
      context.quadraticCurveTo(parseInt(-(this.width_ + offsetSize) / 2), parseInt((this.height_ + offsetSize) / 2), parseInt(-(this.width_ + offsetSize) / 2), parseInt((this.height_ + offsetSize) / 2 - this.arcHeight_));
      context.lineTo(parseInt(-(this.width_ + offsetSize) / 2), parseInt(-(this.height_ + offsetSize) / 2 + this.arcHeight_));
      context.quadraticCurveTo(parseInt(-(this.width_ + offsetSize) / 2), parseInt(-(this.height_ + offsetSize) / 2), parseInt(-(this.width_ + offsetSize) / 2 + this.arcWidth_), parseInt(-(this.height_ + offsetSize) / 2));
      context.stroke();
    }
  };
  canvasfx.scene.shape.Rectangle.prototype.getArcHeight = function() {
    return this.arcHeight_;
  };
  canvasfx.scene.shape.Rectangle.prototype.getArcWidth = function() {
    return this.arcWidth_;
  };
  canvasfx.scene.shape.Rectangle.prototype.getCurrentX = function() {
    return this.x_ + this.layoutX + this.translateX;
  };
  canvasfx.scene.shape.Rectangle.prototype.getCurrentY = function() {
    return this.y_ + this.layoutY + this.translateY;
  };
  canvasfx.scene.shape.Rectangle.prototype.getHeight = function() {
    return this.height_;
  };
  canvasfx.scene.shape.Rectangle.prototype.getLayoutBounds = function() {
    return new canvasfx.geometry.Bounds(this.x_, this.y_, this.width_, this.height_);
  };
  canvasfx.scene.shape.Rectangle.prototype.getWitdh = function() {
    return this.width_;
  };
  canvasfx.scene.shape.Rectangle.prototype.getX = function() {
    return this.x_;
  };
  canvasfx.scene.shape.Rectangle.prototype.getY = function() {
    return this.y_;
  };
  canvasfx.scene.shape.Rectangle.prototype.setArcHeight = function(value) {
    this.arcHeight_ = value;
  };
  canvasfx.scene.shape.Rectangle.prototype.setArcWidth = function(value) {
    this.arcWidth_ = value;
  };
  canvasfx.scene.shape.Rectangle.prototype.setHeight = function(value) {
    this.height_ = value;
  };
  canvasfx.scene.shape.Rectangle.prototype.setWidth = function(value) {
    this.width_ = value;
  };
  canvasfx.scene.shape.Rectangle.prototype.setX = function(value) {
    this.x_ = value;
  };
  canvasfx.scene.shape.Rectangle.prototype.setY = function(value) {
    this.y_ = value;
  };
  canvasfx.scene.shape.Line = function(opt_startX, opt_startY, opt_endX, opt_endY) {
    canvasfx.scene.shape.Shape.call(this);
    this.endX_ = canvasfx.supplement(opt_endX, 0.0);
    this.endY_ = canvasfx.supplement(opt_endY, 0.0);
    this.startX_ = canvasfx.supplement(opt_startX, 0.0);
    this.startY_ = canvasfx.supplement(opt_startY, 0.0);
    this.stroke = canvasfx.scene.paint.Color.BLACK;
  };
  canvasfx.inherit(canvasfx.scene.shape.Line, canvasfx.scene.shape.Shape);
  canvasfx.scene.shape.Line.prototype.contains = function(x, opt_y) {
    return false;
  };
  canvasfx.scene.shape.Line.prototype.draw = function(context) {
    if (this.getCurrentStroke()) {
      context.strokeStyle = this.getCurrentStroke().getWeb();
      context.globalAlpha = this.getCurrentStroke().getOpacity();
      context.lineWidth = this.strokeWidth;
      var offset = (this.strokeWidth % 2) / 2;
      var lb = this.getLayoutBounds();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.transform(1, 0, 0, 1, offset, offset);
      this.transform(context);
      context.beginPath();
      context.moveTo(parseInt(this.startX_ - lb.getMinX() - lb.getWidth() / 2), parseInt(this.startY_ - lb.getMinY() - lb.getHeight() / 2));
      context.lineTo(parseInt(this.endX_ - lb.getMinX() - lb.getWidth() / 2), parseInt(this.endY_ - lb.getMinY() - lb.getHeight() / 2));
      context.stroke();
    }
  };
  canvasfx.scene.shape.Line.prototype.getCurrentEndX = function() {
    return this.endX_ + this.layoutX + this.translateX;
  };
  canvasfx.scene.shape.Line.prototype.getCurrentEndY = function() {
    return this.endY_ + this.layoutY + this.translateY;
  };
  canvasfx.scene.shape.Line.prototype.getCurrentStartX = function() {
    return this.startX_ + this.layoutX + this.translateX;
  };
  canvasfx.scene.shape.Line.prototype.getCurrentStartY = function() {
    return this.startY_ + this.layoutY + this.translateY;
  };
  canvasfx.scene.shape.Line.prototype.getEndX = function() {
    return this.endX_;
  };
  canvasfx.scene.shape.Line.prototype.getEndY = function() {
    return this.endY_;
  };
  canvasfx.scene.shape.Line.prototype.getLayoutBounds = function() {
    return new canvasfx.geometry.Bounds(Math.min(this.startX_, this.endX_), Math.min(this.startY_, this.endY_), Math.abs(this.startX_ - this.endX_), Math.abs(this.startY_ - this.endY_));
  };
  canvasfx.scene.shape.Line.prototype.getStartX = function() {
    return this.startX_;
  };
  canvasfx.scene.shape.Line.prototype.getStartY = function() {
    return this.startY_;
  };
  canvasfx.scene.shape.Line.prototype.setEndX = function(value) {
    this.endX_ = value;
  };
  canvasfx.scene.shape.Line.prototype.setEndY = function(value) {
    this.endY_ = value;
  };
  canvasfx.scene.shape.Line.prototype.seStartX = function(value) {
    this.startX_ = value;
  };
  canvasfx.scene.shape.Line.prototype.seStartY = function(value) {
    this.startY_ = value;
  };
  return {};
});
System.get("../../../src/scene/shape.js" + '');
