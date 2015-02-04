//


/**
 * @fileoverview
 */


import {Bounds, Point} from '../geometry';
import {JFObject} from '../lang';
import {Node} from '../scene';
import {Color} from './paint';


export var StrokeType = {
  CENTERED: 'centered',
  INSIDE: 'inside',
  OUTSIDE: 'outside'
};


export class Shape extends Node {
  constructor() {
    super();
    this.fill = null;
    this.stroke = null;
    this.strokeType = StrokeType.CENTERED;
    this.strokeWidth = 1.0;
  }
  get currentFill() {
    if (!this.fill) {
      return null;
    }
    return Color.color(this.fill.red, this.fill.green, this.fill.blue, this.fill.opacity * this.opacity);
  }
  get currentStroke() {
    if (!this.stroke) {
      return null;
    }
    return Color.color(this.stroke.red, this.stroke.green, this.stroke.blue, this.stroke.opacity * this.opacity);
  }
}


export class Circle extends Shape {
  constructor(centerX = 0.0, centerY = 0.0, radius = 0.0) {
    super();
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.fill = Color.BLACK;
  }
  get currentCenterX() {
    return this.centerX + this.layoutX + this.translateX;
  }
  get currentCenterY() {
    return this.centerY + this.layoutY + this.translateY;
  }
  get layoutBounds() {
    return new Bounds(
      this.centerX - this.radius, this.centerY - this.radius,
      2 * this.radius, 2 * this.radius
    );
  }
  contains(x, y = null) {
    if (x instanceof Point) {
      y = x.y;
      x = x.x;
    }
    let point = new Point(this.currentCenterX, this.currentCenterY);
    return point.distance(x, y) <= this.radius;
  }
  draw(context) {
    if (this.currentFill) {
      context.fillStyle = this.currentFill.web;
      context.globalAlpha = this.currentFill.opacity;
      context.setTransform(1, 0, 0, 1, 0, 0);
      this.transform(context);
      context.beginPath();
      context.arc(
        0, 0, this.radius,
        0, Math.PI * 2, false
      );
      context.fill();
    }
    if (this.currentStroke) {
      context.strokeStyle = this.currentStroke.web;
      context.globalAlpha = this.currentStroke.opacity;
      context.lineWidth = this.strokeWidth;
      var offset = 0;
      switch (this.strokeType) {
        case StrokeType.OUTSIDE:
          offset = this.strokeWidth / 2;
          break;
        case StrokeType.INSIDE:
          offset = - this.strokeWidth / 2;
          break;
        case StrokeType.CENTERED:
        default:
          offset = 0;
          break;
      }
      context.setTransform(1, 0, 0, 1, 0, 0);
      this.transform(context);
      context.beginPath();
      context.arc(
        0, 0, this.radius + offset,
        0, Math.PI * 2, false
      );
      context.stroke();
    }
  }
}


export class Rectangle extends Shape {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    super();
    this.archHeight = 0.0;
    this.arcWidth = 0.0;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.fill = Color.BLACK;
  }
  get currentX() {
    return this.x + this.layoutX + this.translateX;
  }
  get currentY() {
    return this.y + this.layoutY + this.translateY;
  }
  get layoutBounds() {
    return new Bounds(this.x, this.y, this.width, this.height);
  }
  contains(x, y = null) {
    // TODO: arc corner
    if (x instanceof Point) {
      y = x.y;
      x = x.x;
    }

    var centerX, centerY;
    if (this.currentX + this.arcWidth <= x &&
      x <= this.currentX + this.width - this.arcWidth &&
      this.currentY <= y &&
      y <= this.currentY + this.height) {
      return true;
    } else if (this.currentX <= x &&
      x <= this.currentX + this.width &&
      this.currentY + this.arcHeight <= y &&
      y <= this.currentY + this.height - this.arcHeight) {
      return true;
    } else if (this.currentX <= x &&
      x <= this.currentX + this.arcWidth &&
      this.currentY <= y &&
      y <= this.currentY + this.arcHeight) {
      centerX = this.currentX + this.arcWidth;
      centerY = this.currentY + this.arcHeight;
      //
    } else if (this.currentX + this.width - this.arcWidth <= x &&
      x <= this.currentX + this.width &&
      this.currentY <= y &&
      y <= this.currentY + this.arcHeight) {
      centerX = this.currentX + this.width - this.arcWidth;
      centerY = this.currentY + this.arcHeight;
      //
    } else if (this.currentX + this.width - this.arcWidth <= x &&
      x <= this.currentX + this.width &&
      this.currentY + this.height - this.arcHeight <= y &&
      y <= this.currentY + this.height) {
      centerX = this.currentX + this.width - this.arcWidth;
      centerY = this.currentY + this.height - this.arcHeight;
      //
    } else if (this.currentX <= x &&
      x <= this.currentX + this.arcWidth &&
      this.currentY + this.height - this.arcHeight <= y &&
      y <= this.currentY + this.height) {
      centerX = this.currentX + this.arcWidth;
      centerY = this.currentY + this.height - this.arcHeight;
      //
    }

    return false;
  }
  draw(context) {
    if (this.currentFill) {
      context.fillStyle = this.currentFill.web;
      context.globalAlpha = this.currentFill.opacity;
      context.setTransform(1, 0, 0, 1, 0, 0);
      this.transform(context);
      context.beginPath();
      context.moveTo(
        parseInt(-this.width / 2 + this.arcWidth),
        parseInt(-this.height / 2)
      );
      context.lineTo(
        parseInt(this.width / 2 - this.arcWidth),
        parseInt(-this.height / 2)
      );
      context.quadraticCurveTo(
        parseInt(this.width / 2),
        parseInt(-this.height / 2),
        parseInt(this.width / 2),
        parseInt(-this.height / 2 + this.arcHeight)
      );
      context.lineTo(
        parseInt(this.width / 2),
        parseInt(this.height / 2 - this.arcHeight)
      );
      context.quadraticCurveTo(
        parseInt(this.width / 2),
        parseInt(this.height / 2),
        parseInt(this.width / 2 - this.arcWidth),
        parseInt(this.height / 2)
      );
      context.lineTo(
        parseInt(-this.width / 2 + this.arcWidth),
        parseInt(this.height / 2)
      );
      context.quadraticCurveTo(
        parseInt(-this.width / 2),
        parseInt(this.height / 2),
        parseInt(-this.width / 2),
        parseInt(this.height / 2 - this.arcHeight)
      );
      context.lineTo(
        parseInt(-this.width / 2),
        parseInt(-this.height / 2 + this.arcHeight)
      );
      context.quadraticCurveTo(
        parseInt(-this.width / 2),
        parseInt(-this.height / 2),
        parseInt(-this.width / 2 + this.arcWidth),
        parseInt(-this.height / 2)
      );
      context.fill();
    }

    if (this.currentStroke) {
      context.strokeStyle = this.currentStroke.web;
      context.globalAlpha = this.currentStroke.opacity;
      context.lineWidth = this.strokeWidth;

      var offsetPosition = 0;
      var offsetSize = 0;
      switch (this.strokeType) {
        case StrokeType.OUTSIDE:
          offsetPosition = -this.strokeWidth / 2;
          offsetSize = this.strokeWidth;
          break;
        case StrokeType.INSIDE:
          offsetPosition = this.strokeWidth / 2;
          offsetSize = -this.strokeWidth;
          break;
        case StrokeType.CENTERED:
        default:
          offsetPosition = (this.strokeWidth % 2) / 2;
          offsetSize = 0;
          break;
      }

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.transform(
        1, 0, 0, 1,
        offsetSize / 2 + offsetPosition,
        offsetSize / 2 + offsetPosition
      );
      this.transform(context);
      context.beginPath();
      context.moveTo(
        parseInt(-(this.width + offsetSize) / 2 + this.arcWidth),
        parseInt(-(this.height + offsetSize) / 2)
      );
      context.lineTo(
        parseInt((this.width + offsetSize) / 2 - this.arcWidth),
        parseInt(-(this.height + offsetSize) / 2)
      );
      context.quadraticCurveTo(
        parseInt((this.width + offsetSize) / 2),
        parseInt(-(this.height + offsetSize) / 2),
        parseInt((this.width + offsetSize) / 2),
        parseInt(-(this.height + offsetSize) / 2 + this.arcHeight)
      );
      context.lineTo(
        parseInt((this.width + offsetSize) / 2),
        parseInt((this.height + offsetSize) / 2 - this.arcHeight)
      );
      context.quadraticCurveTo(
        parseInt((this.width + offsetSize) / 2),
        parseInt((this.height + offsetSize) / 2),
        parseInt((this.width + offsetSize) / 2 - this.arcWidth),
        parseInt((this.height + offsetSize) / 2)
      );
      context.lineTo(
        parseInt(-(this.width + offsetSize) / 2 + this.arcWidth),
        parseInt((this.height + offsetSize) / 2)
      );
      context.quadraticCurveTo(
        parseInt(-(this.width + offsetSize) / 2),
        parseInt((this.height + offsetSize) / 2),
        parseInt(-(this.width + offsetSize) / 2),
        parseInt((this.height + offsetSize) / 2 - this.arcHeight)
      );
      context.lineTo(
        parseInt(-(this.width + offsetSize) / 2),
        parseInt(-(this.height + offsetSize) / 2 + this.arcHeight)
      );
      context.quadraticCurveTo(
        parseInt(-(this.width + offsetSize) / 2),
        parseInt(-(this.height + offsetSize) / 2),
        parseInt(-(this.width + offsetSize) / 2 + this.arcWidth),
        parseInt(-(this.height + offsetSize) / 2)
      );
      context.stroke();
    }
  }
}


export class Line extends Shape {
  constructor(startX = 0.0, startY = 0.0, endX = 0.0, endY = 0.0) {
    super();
    this.endX = endX;
    this.endY = endY;
    this.startX = startX;
    this.startY = startY;
    this.stroke = Color.BLACK;
  }
  get currentEndX() {
    return this.endX + this.layoutX + this.translateX;
  }
  get currentEndY() {
    return this.endY + this.layoutY + this.translateY;
  }
  get currentStartX() {
    return this.startX + this.layoutX + this.translateX;
  }
  get currentStartY() {
    return this.startY + this.layoutY + this.translateY;
  }
  get layoutBounds() {
    return new Bounds(
      Math.min(this.startX, this.endX), Math.min(this.startY, this.endY),
      Math.abs(this.startX - this.endX), Math.abs(this.startY - this.endY)
    );
  }
  contains(x, y = null) {
    return false;
  }
  draw(context) {
    if (this.currentStroke) {
      context.strokeStyle = this.currentStroke.web;
      context.globalAlpha = this.currentStroke.opacity;
      context.lineWidth = this.strokeWidth;

      var offset = (this.strokeWidth % 2) / 2;

      var lb = this.layoutBounds;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.transform(1, 0, 0, 1, offset, offset);
      this.transform(context);
      context.beginPath();
      context.moveTo(
        parseInt(this.startX - lb.minX - lb.width / 2),
        parseInt(this.startY - lb.minY - lb.height / 2)
      );
      context.lineTo(
        parseInt(this.endX - lb.minX - lb.width / 2),
        parseInt(this.endY - lb.minY - lb.height / 2)
      );
      context.stroke();
    }
  }
}
