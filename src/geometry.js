//


/**
 * @fileoverview
 */


import {Object} from './lang';


export class Bounds extends Object {
  constructor(minX, minY, width, height) {
    super();
    this.minX = minX;
    this.minY = minY;
    this.height = height;
    this.width = width;
  }
  get maxX() {
    return this.minX + this.width;
  }
  get maxY() {
    return this.minY + this.height;
  }
}


export class Point extends Object {
  constructor(x = 0.0, y = 0.0) {
    super();
    this.x = x;
    this.y = y;
  }
  add(x, y = null) {
    if (x instanceof Point) {
      y = x.y;
      x = x.x;
    }
    return new Point(this.x + x, this.y + y);
  }
  distance(x1, y1 = null) {
    if (x1 instanceof Point) {
      y1 = x1.y;
      x1 = x1.x;
    }
    return Math.sqrt(Math.pow(this.x - x1, 2) + Math.pow(this.y - y1, 2));
  }
}
