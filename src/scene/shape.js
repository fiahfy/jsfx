//


/**
 * @fileoverview
 */


import {Bounds, Point} from '../geometry.js';
import {JFObject} from '../lang.js';
import {Node} from '../scene.js';
import {Color} from './paint.js';


export var StrokeType = {
  CENTERED: 'centered',
  INSIDE: 'inside',
  OUTSIDE: 'outside'
};


export class Shape extends Node {
  constructor() {
    super();
    this.fill_ = null;
    this.stroke_ = null;
    this.strokeType_ = StrokeType.CENTERED;
    this.strokeWidth_ = 1.0;
  }
  get fill() {
    return this.fill_;
  }
  set fill(value) {
    this.fill_ = value;
  }
  get stroke() {
    return this.stroke_;
  }
  set stroke(value) {
    this.stroke_ = value;
  }
  get strokeType() {
    return this.strokeType_;
  }
  set strokeType(value) {
    this.strokeType_ = value;
  }
  get strokeWidth() {
    return this.strokeWidth_;
  }
  set strokeWidth(value) {
    this.strokeWidth_ = value;
  }
  get _currentFill() {
    if (this.fill_ == null) {
      return null;
    }
    return Color.color(this.fill_.red, this.fill_.green, this.fill_.blue, this.fill_.opacity * this._currentOpacity);
  }
  get _currentStroke() {
    if (this.stroke_ == null) {
      return null;
    }
    return Color.color(this.stroke_.red, this.stroke_.green, this.stroke_.blue, this.stroke_.opacity * this._currentOpacity);
  }
}


export class Circle extends Shape {
  constructor(centerX = 0.0, centerY = 0.0, radius = 0.0) {
    super();
    this.centerX_ = centerX;
    this.centerY_ = centerY;
    this.radius_ = radius;
    this.fill_ = Color.BLACK;
  }
  get centerX() {
    return this.centerX_;
  }
  set centerX(value) {
    this.centerX_ = value;
  }
  get centerY() {
    return this.centerY_;
  }
  set centerY(value) {
    this.centerY_ = value;
  }
  get layoutBounds() {
    return new Bounds(
      this.centerX_ - this.radius_, this.centerY_ - this.radius_,
      2 * this.radius_, 2 * this.radius_
    );
  }
  get radius() {
    return this.radius_;
  }
  set radius(value) {
    this.radius_ = value;
  }
  _contains(x, y = null) {
    if (x instanceof Point) {
      y = x.y;
      x = x.x;
    }
    let point = new Point(this._currentCenterX, this._currentCenterY);
    return point.distance(x, y) <= this.radius_;
  }
  get _currentCenterX() {
    return this.centerX_ + this.layoutX_ + this.translateX_;
  }
  get _currentCenterY() {
    return this.centerY_ + this.layoutY_ + this.translateY_;
  }
  _draw(context) {
    if (this._currentFill != null) {
      context.fillStyle = this._currentFill._colorString;
      context.globalAlpha = this._currentFill.opacity;
      context.setTransform(1, 0, 0, 1, 0, 0);
      this._transform(context);
      context.beginPath();
      context.arc(
        0, 0, this.radius_,
        0, Math.PI * 2, false
      );
      context.closePath();
      context.fill();
    }
    if (this._currentStroke != null) {
      context.strokeStyle = this._currentStroke._colorString;
      context.globalAlpha = this._currentStroke.opacity;
      context.lineWidth = this.strokeWidth_;
      var offset = 0;
      switch (this.strokeType_) {
        case StrokeType.OUTSIDE:
          offset = this.strokeWidth_ / 2;
          break;
        case StrokeType.INSIDE:
          offset = - this.strokeWidth_ / 2;
          break;
        case StrokeType.CENTERED:
        default:
          offset = 0;
          break;
      }
      context.setTransform(1, 0, 0, 1, 0, 0);
      this._transform(context);
      context.beginPath();
      context.arc(
        0, 0, this.radius_ + offset,
        0, Math.PI * 2, false
      );
      context.closePath();
      context.stroke();
    }
  }
}


export class Line extends Shape {
  constructor(startX = 0.0, startY = 0.0, endX = 0.0, endY = 0.0) {
    super();
    this.endX_ = endX;
    this.endY_ = endY;
    this.startX_ = startX;
    this.startY_ = startY;
    this.stroke_ = Color.BLACK;
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
  get layoutBounds() {
    return new Bounds(
      Math.min(this.startX_, this.endX_), Math.min(this.startY_, this.endY_),
      Math.abs(this.startX_ - this.endX_), Math.abs(this.startY_ - this.endY_)
    );
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
  _contains(x, y = null) {
    return false;
  }
  get _currentEndX() {
    return this.endX_ + this.layoutX_ + this.translateX_;
  }
  get _currentEndY() {
    return this.endY_ + this.layoutY_ + this.translateY_;
  }
  get _currentStartX() {
    return this.startX_ + this.layoutX_ + this.translateX_;
  }
  get _currentStartY() {
    return this.startY_ + this.layoutY_ + this.translateY_;
  }
  _draw(context) {
    if (this._currentStroke != null) {
      context.strokeStyle = this._currentStroke._colorString;
      context.globalAlpha = this._currentStroke.opacity;
      context.lineWidth = this.strokeWidth_;

      var offset = (this.strokeWidth_ % 2) / 2;

      var lb = this.layoutBounds;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.transform(1, 0, 0, 1, offset, offset);
      this._transform(context);
      context.beginPath();
      context.moveTo(
        parseInt(this.startX_ - lb.minX - lb.width / 2),
        parseInt(this.startY_ - lb.minY - lb.height / 2)
      );
      context.lineTo(
        parseInt(this.endX_ - lb.minX - lb.width / 2),
        parseInt(this.endY_ - lb.minY - lb.height / 2)
      );
      context.stroke();
    }
  }
}


export class Rectangle extends Shape {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    super();
    this.arcHeight_ = 0.0;
    this.arcWidth_ = 0.0;
    this.height_ = height;
    this.width_ = width;
    this.x_ = x;
    this.y_ = y;
    this.fill_ = Color.BLACK;
  }
  get arcHeight() {
    return this.arcHeight_;
  }
  set arcHeight(value) {
    this.arcHeight_ = value;
  }
  get arcWidth() {
    return this.arcWidth_;
  }
  set arcWidth(value) {
    this.arcWidth_ = value;
  }
  get height() {
    return this.height_;
  }
  set height(value) {
    this.height_ = value;
  }
  get layoutBounds() {
    return new Bounds(this.x_, this.y_, this.width_, this.height_);
  }
  get width() {
    return this.width_;
  }
  set width(value) {
    this.width_ = value;
  }
  get x() {
    return this.x_;
  }
  set x(value) {
    this.x_ = value;
  }
  get y() {
    return this.y_;
  }
  set y(value) {
    this.y_ = value;
  }
  _contains(x, y = null, context = null) {
    //console.log(context);
    context.lineWidth = this.strokeWidth_;

    var offsetPosition = 0;
    var offsetSize = 0;
    switch (this.strokeType_) {
      case StrokeType.OUTSIDE:
        offsetPosition = -this.strokeWidth_ / 2;
        offsetSize = this.strokeWidth_;
        break;
      case StrokeType.INSIDE:
        offsetPosition = this.strokeWidth_ / 2;
        offsetSize = -this.strokeWidth_;
        break;
      case StrokeType.CENTERED:
      default:
        offsetPosition = (this.strokeWidth_ % 2) / 2;
        offsetSize = 0;
        break;
    }

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.transform(
      1, 0, 0, 1,
      offsetSize / 2 + offsetPosition,
      offsetSize / 2 + offsetPosition
    );
    this._transform(context);
    context.beginPath();
    context.moveTo(
      parseInt(-(this.width_ + offsetSize) / 2 + this.arcWidth_),
      parseInt(-(this.height_ + offsetSize) / 2)
    );
    context.lineTo(
      parseInt((this.width_ + offsetSize) / 2 - this.arcWidth_),
      parseInt(-(this.height_ + offsetSize) / 2)
    );
    context.quadraticCurveTo(
      parseInt((this.width_ + offsetSize) / 2),
      parseInt(-(this.height_ + offsetSize) / 2),
      parseInt((this.width_ + offsetSize) / 2),
      parseInt(-(this.height_ + offsetSize) / 2 + this.arcHeight_)
    );
    context.lineTo(
      parseInt((this.width_ + offsetSize) / 2),
      parseInt((this.height_ + offsetSize) / 2 - this.arcHeight_)
    );
    context.quadraticCurveTo(
      parseInt((this.width_ + offsetSize) / 2),
      parseInt((this.height_ + offsetSize) / 2),
      parseInt((this.width_ + offsetSize) / 2 - this.arcWidth_),
      parseInt((this.height_ + offsetSize) / 2)
    );
    context.lineTo(
      parseInt(-(this.width_ + offsetSize) / 2 + this.arcWidth_),
      parseInt((this.height_ + offsetSize) / 2)
    );
    context.quadraticCurveTo(
      parseInt(-(this.width_ + offsetSize) / 2),
      parseInt((this.height_ + offsetSize) / 2),
      parseInt(-(this.width_ + offsetSize) / 2),
      parseInt((this.height_ + offsetSize) / 2 - this.arcHeight_)
    );
    context.lineTo(
      parseInt(-(this.width_ + offsetSize) / 2),
      parseInt(-(this.height_ + offsetSize) / 2 + this.arcHeight_)
    );
    context.quadraticCurveTo(
      parseInt(-(this.width_ + offsetSize) / 2),
      parseInt(-(this.height_ + offsetSize) / 2),
      parseInt(-(this.width_ + offsetSize) / 2 + this.arcWidth_),
      parseInt(-(this.height_ + offsetSize) / 2)
    );
    context.closePath();
    context.stroke();
    // TODO: arc corner
    if (x instanceof Point) {
      y = x.y;
      x = x.x;
    }
    return context.isPointInPath(x, y);


    var centerX, centerY;
    if (this._currentX + this.arcWidth_ <= x &&
      x <= this._currentX + this.width_ - this.arcWidth_ &&
      this._currentY <= y &&
      y <= this._currentY + this.height_) {
      return true;
    } else if (this._currentX <= x &&
      x <= this._currentX + this.width_ &&
      this._currentY + this.arcHeight_ <= y &&
      y <= this._currentY + this.height_ - this.arcHeight_) {
      return true;
    } else if (this._currentX <= x &&
      x <= this._currentX + this.arcWidth_ &&
      this._currentY <= y &&
      y <= this._currentY + this.arcHeight_) {
      centerX = this._currentX + this.arcWidth_;
      centerY = this._currentY + this.arcHeight_;
      //
    } else if (this._currentX + this.width_ - this.arcWidth_ <= x &&
      x <= this._currentX + this.width_ &&
      this._currentY <= y &&
      y <= this._currentY + this.arcHeight_) {
      centerX = this._currentX + this.width_ - this.arcWidth_;
      centerY = this._currentY + this.arcHeight_;
      //
    } else if (this._currentX + this.width_ - this.arcWidth_ <= x &&
      x <= this._currentX + this.width_ &&
      this._currentY + this.height_ - this.arcHeight_ <= y &&
      y <= this._currentY + this.height_) {
      centerX = this._currentX + this.width_ - this.arcWidth_;
      centerY = this._currentY + this.height_ - this.arcHeight_;
      //
    } else if (this._currentX <= x &&
      x <= this._currentX + this.arcWidth_ &&
      this._currentY + this.height_ - this.arcHeight_ <= y &&
      y <= this._currentY + this.height_) {
      centerX = this._currentX + this.arcWidth_;
      centerY = this._currentY + this.height_ - this.arcHeight_;
      //
    }

    return false;
  }
  get _currentX() {
    return this.x_ + this.layoutX_ + this.translateX_;
  }
  get _currentY() {
    return this.y_ + this.layoutY_ + this.translateY_;
  }
  _draw(context) {
    if (this._currentFill != null) {
      context.fillStyle = this._currentFill._colorString;
      context.globalAlpha = this._currentFill.opacity;
      context.setTransform(1, 0, 0, 1, 0, 0);
      this._transform(context);
      context.beginPath();
      context.moveTo(
        parseInt(-this.width_ / 2 + this.arcWidth_),
        parseInt(-this.height_ / 2)
      );
      context.lineTo(
        parseInt(this.width_ / 2 - this.arcWidth_),
        parseInt(-this.height_ / 2)
      );
      context.quadraticCurveTo(
        parseInt(this.width_ / 2),
        parseInt(-this.height_ / 2),
        parseInt(this.width_ / 2),
        parseInt(-this.height_ / 2 + this.arcHeight_)
      );
      context.lineTo(
        parseInt(this.width_ / 2),
        parseInt(this.height_ / 2 - this.arcHeight_)
      );
      context.quadraticCurveTo(
        parseInt(this.width_ / 2),
        parseInt(this.height_ / 2),
        parseInt(this.width_ / 2 - this.arcWidth_),
        parseInt(this.height_ / 2)
      );
      context.lineTo(
        parseInt(-this.width_ / 2 + this.arcWidth_),
        parseInt(this.height_ / 2)
      );
      context.quadraticCurveTo(
        parseInt(-this.width_ / 2),
        parseInt(this.height_ / 2),
        parseInt(-this.width_ / 2),
        parseInt(this.height_ / 2 - this.arcHeight_)
      );
      context.lineTo(
        parseInt(-this.width_ / 2),
        parseInt(-this.height_ / 2 + this.arcHeight_)
      );
      context.quadraticCurveTo(
        parseInt(-this.width_ / 2),
        parseInt(-this.height_ / 2),
        parseInt(-this.width_ / 2 + this.arcWidth_),
        parseInt(-this.height_ / 2)
      );
      context.closePath();
      context.fill();
    }




    let offsetPosition = 0;
    let offsetSize = 0;
    switch (this.strokeType_) {
      case StrokeType.OUTSIDE:
        offsetPosition = -this.strokeWidth_ / 2;
        offsetSize = this.strokeWidth_;
        break;
      case StrokeType.INSIDE:
        offsetPosition = this.strokeWidth_ / 2;
        offsetSize = -this.strokeWidth_;
        break;
      case StrokeType.CENTERED:
      default:
        offsetPosition = (this.strokeWidth_ % 2) / 2;
        offsetSize = 0;
        break;
    }

    let halfWidth = (this.width_ + offsetSize) / 2;
    let halfHeight = (this.height_ + offsetSize) / 2;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(offsetSize / 2 + offsetPosition, offsetSize / 2 + offsetPosition);
    this._transform(context);
    context.beginPath();
    context.moveTo(parseInt(-halfWidth + this.arcWidth_), parseInt(-halfHeight));
    context.lineTo(parseInt(halfWidth - this.arcWidth_), parseInt(-halfHeight));
    context.quadraticCurveTo(parseInt(halfWidth), parseInt(-halfHeight), parseInt(halfWidth), parseInt(-halfHeight + this.arcHeight_));
    context.lineTo(parseInt(halfWidth), parseInt(halfHeight - this.arcHeight_));
    context.quadraticCurveTo(parseInt(halfWidth), parseInt(halfHeight), parseInt(halfWidth - this.arcWidth_), parseInt(halfHeight));
    context.lineTo(parseInt(-halfWidth + this.arcWidth_), parseInt(halfHeight));
    context.quadraticCurveTo(parseInt(-halfWidth), parseInt(halfHeight), parseInt(-halfWidth), parseInt(halfHeight - this.arcHeight_));
    context.lineTo(parseInt(-halfWidth), parseInt(-halfHeight + this.arcHeight_));
    context.quadraticCurveTo(parseInt(-halfWidth), parseInt(-halfHeight), parseInt(-halfWidth + this.arcWidth_), parseInt(-halfHeight));
    context.closePath();

    if (this._currentFill != null) {
      //context.fillStyle = this._currentFill._colorString;
      //context.globalAlpha = this._currentFill.opacity;
      //context.fill();
    }

    if (this._currentStroke != null) {
      context.strokeStyle = this._currentStroke._colorString;
      context.globalAlpha = this._currentStroke.opacity;
      context.lineWidth = this.strokeWidth_;
      context.stroke();
    }
  }
}
