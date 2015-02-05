//


/**
 * @fileoverview
 */


import {JFObject} from './lang';


export class Bounds extends JFObject {
  constructor(minX, minY, width, height) {
    super();
    this.minX_ = minX;
    this.minY_ = minY;
    this.height_ = height;
    this.width_ = width;
  }
  get height() {
    return this.height_;
  }
  get maxX() {
    return this.minX_ + this.width_;
  }
  get maxY() {
    return this.minY_ + this.height_;
  }
  get minX() {
    return this.minX_;
  }
  get minY() {
    return this.minY_;
  }
  get width() {
    return this.width_;
  }
}


export class Point extends JFObject {
  constructor(x = 0.0, y = 0.0) {
    super();
    this.x_ = x;
    this.y_ = y;
  }
  add(x, y = null) {
    if (x instanceof Point) {
      y = x.y;
      x = x.x;
    }
    return new Point(this.x_ + x, this.y_ + y);
  }
  distance(x1, y1 = null) {
    if (x1 instanceof Point) {
      y1 = x1.y;
      x1 = x1.x;
    }
    return Math.sqrt(Math.pow(this.x_ - x1, 2) + Math.pow(this.y_ - y1, 2));
  }
  get x() {
    return this.x_;
  }
  get y() {
    return this.y_;
  }
}
