//


/**
 * @fileoverview
 */


import {Object} from './object';


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
