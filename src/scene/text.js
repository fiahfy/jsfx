//


/**
 * @fileoverview
 */


import {Bounds, Point} from '../geometry.js';
import {JFObject} from '../lang.js';
import {Node} from '../scene.js';
import {Shape} from './shape.js';
import {Color} from './paint.js';


export class Text extends Shape {
  constructor(x = 0.0, y = 0.0, text = '') {
    super();
    this.fill_ = Color.RED;
    this.font_ = null;
    this.text_ = text;
    this.x_ = x;
    this.y_ = y;
  }
  get layoutBounds() {
    return new Bounds(
      this.x_, this.y_, 0, 0
    );
  }
  get text() {
    return this.text_;
  }
  set text(value) {
    this.text_ = value;
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
  _contains(x, y = null) {
    if (x instanceof Point) {
      y = x.y;
      x = x.x;
    }
    return false;
  }
  get _currentX() {
    return this.x_ + this.layoutX_ + this.translateX_;
  }
  get _currentY() {
    return this.y_ + this.layoutY_ + this.translateY_;
  }
  _draw() {
    if (this._currentFill != null) {
      this._path(0);
      this.context_.fillStyle = this._currentFill._colorString;
      this.context_.globalAlpha = this._currentFill.opacity;
      //this.context_.font = "18px 'ＭＳ Ｐゴシック'";
      console.log(this.text_, this._currentX, this._currentY);
      this.context_.fillText(this.text_, this._currentX, this._currentY);
    }
  }
  _path(offset) {
    this.context_.setTransform(1, 0, 0, 1, 0, 0);
    //this._transform();
  }
}
