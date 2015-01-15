//


/**
 * @fileoverview xxx
 */


canvasfx.geometry = {};



/**
 * @param {number} minX
 * @param {number} minY
 * @param {number} width
 * @param {number} height
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.geometry.Bounds = function(minX, minY, width, height) {
  canvasfx.Object.call(this);

  /**
   * @private
   * @type {number}
   */
  this.minX_ = minX;

  /**
   * @private
   * @type {number}
   */
  this.minY_ = minY;

  /**
   * @private
   * @type {number}
   */
  this.height_ = height;

  /**
   * @private
   * @type {number}
   */
  this.width_ = width;
};
canvasfx.inherit(canvasfx.geometry.Bounds, canvasfx.Object);


/**
 * @return {number}
 */
canvasfx.geometry.Bounds.prototype.getHeight = function() {
  return this.height_;
};


/**
 * @return {number}
 */
canvasfx.geometry.Bounds.prototype.getMaxX = function() {
  return this.minX_ + this.width_;
};


/**
 * @return {number}
 */
canvasfx.geometry.Bounds.prototype.getMaxY = function() {
  return this.minY_ + this.height_;
};


/**
 * @return {number}
 */
canvasfx.geometry.Bounds.prototype.getMinX = function() {
  return this.minX_;
};


/**
 * @return {number}
 */
canvasfx.geometry.Bounds.prototype.getMinY = function() {
  return this.minY_;
};


/**
 * @return {number}
 */
canvasfx.geometry.Bounds.prototype.getWidth = function() {
  return this.width_;
};



/**
 * @param {number=} opt_width
 * @param {number=} opt_height
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.geometry.Dimension = function(opt_width, opt_height) {
  canvasfx.Object.call(this);

  /**
   * @private
   * @type {number}
   */
  this.height_ = canvasfx.supplement(opt_height, 0.0);

  /**
   * @private
   * @type {number}
   */
  this.width_ = canvasfx.supplement(opt_width, 0.0);
};
canvasfx.inherit(canvasfx.geometry.Dimension, canvasfx.Object);


/**
 * @return {number}
 */
canvasfx.geometry.Dimension.prototype.getHeight = function() {
  return this.height_;
};


/**
 * @return {number}
 */
canvasfx.geometry.Dimension.prototype.getWidth = function() {
  return this.width_;
};



/**
 * @param {number=} opt_x
 * @param {number=} opt_y
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.geometry.Point = function(opt_x, opt_y) {
  canvasfx.Object.call(this);

  /**
   * @private
   * @type {number}
   */
  this.x_ = canvasfx.supplement(opt_x, 0.0);

  /**
   * @private
   * @type {number}
   */
  this.y_ = canvasfx.supplement(opt_y, 0.0);
};
canvasfx.inherit(canvasfx.geometry.Point, canvasfx.Object);


/**
 * @param {number|canvasfx.geometry.Point} x
 * @param {number=} opt_y
 * @return {canvasfx.geometry.Point}
 */
canvasfx.geometry.Point.prototype.add = function(x, opt_y) {
  if (x instanceof canvasfx.geometry.Point) {
    opt_y = x.getY();
    x = x.getX();
  }
  return new canvasfx.geometry.Point(this.x_ + x, this.y_ + opt_y);
};


/**
 * @param {number|canvasfx.geometry.Point} x1
 * @param {number=} opt_y1
 * @return {number}
 */
canvasfx.geometry.Point.prototype.distance = function(x1, opt_y1) {
  if (x1 instanceof canvasfx.geometry.Point) {
    opt_y1 = x1.getY();
    x1 = x1.getX();
  }
  return Math.sqrt(Math.pow(this.x_ - x1, 2) + Math.pow(this.y_ - opt_y1, 2));
};


/**
 * @return {number}
 */
canvasfx.geometry.Point.prototype.getX = function() {
  return this.x_;
};


/**
 * @return {number}
 */
canvasfx.geometry.Point.prototype.getY = function() {
  return this.y_;
};
