//


/**
 * @fileoverview
 */


import {Object} from '../object';
import {Node} from '../scene';
import {Bounds} from '../geometry';
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
    //return true;
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
