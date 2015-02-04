//


/**
 * @fileoverview xxx
 */


canvasfx.util = {};



/**
 * @param {number} millis
 * @constructor
 * @extends {canvasfx.JFObject}
 */
canvasfx.util.Duration = function(millis) {
  canvasfx.JFObject.call(this);

  /**
   * @private
   * @type {number}
   */
  this.millis_ = millis;
};
canvasfx.inherit(canvasfx.util.Duration, canvasfx.JFObject);


/**
 * @param {canvasfx.util.Duration} other
 * @return {canvasfx.util.Duration}
 */
canvasfx.util.Duration.prototype.add = function(other) {
  return new canvasfx.util.Duration(this.millis_ + other.toMillis());
};


/**
 * @param {canvasfx.util.Duration} obj
 * @return {boolean}
 */
canvasfx.util.Duration.prototype.equals = function(obj) {
  return this.millis_ == obj.toMillis();
};


/**
 * @param {canvasfx.util.Duration} other
 * @return {boolean}
 */
canvasfx.util.Duration.prototype.greaterThan = function(other) {
  return this.millis_ > other.toMillis();
};


/**
 * @param {canvasfx.util.Duration} other
 * @return {boolean}
 */
canvasfx.util.Duration.prototype.greaterThanOrEqualTo = function(other) {
  return this.millis_ >= other.toMillis();
};


/**
 * @param {canvasfx.util.Duration} other
 * @return {boolean}
 */
canvasfx.util.Duration.prototype.lessThan = function(other) {
  return this.millis_ < other.toMillis();
};


/**
 * @param {canvasfx.util.Duration} other
 * @return {boolean}
 */
canvasfx.util.Duration.prototype.lessThanOrEqualTo = function(other) {
  return this.millis_ <= other.toMillis();
};


/**
 * @return {number}
 */
canvasfx.util.Duration.prototype.toHours = function() {
  return this.millis_ / 1000 / 60 / 60;
};


/**
 * @return {number}
 */
canvasfx.util.Duration.prototype.toMillis = function() {
  return this.millis_;
};


/**
 * @return {number}
 */
canvasfx.util.Duration.prototype.toMinutes = function() {
  return this.millis_ / 1000 / 60;
};


/**
 * @return {number}
 */
canvasfx.util.Duration.prototype.toSeconds = function() {
  return this.millis_ / 1000;
};


/**
 * @const
 * @param {number} h
 * @return {canvasfx.util.Duration}
 */
canvasfx.util.Duration.hours = function(h) {
  return new canvasfx.util.Duration(h * 60 * 60 * 1000);
};


/**
 * @const
 * @param {number} ms
 * @return {canvasfx.util.Duration}
 */
canvasfx.util.Duration.millis = function(ms) {
  return new canvasfx.util.Duration(ms);
};


/**
 * @const
 * @param {number} m
 * @return {canvasfx.util.Duration}
 */
canvasfx.util.Duration.minutes = function(m) {
  return new canvasfx.util.Duration(m * 60 * 1000);
};


/**
 * @const
 * @param {number} s
 * @return {canvasfx.util.Duration}
 */
canvasfx.util.Duration.seconds = function(s) {
  return new canvasfx.util.Duration(s * 1000);
};


/**
 * @const
 * @type {canvasfx.util.Duration}
 */
canvasfx.util.Duration.INDEFINITE = canvasfx.util.Duration.millis(Infinity);


/**
 * @const
 * @type {canvasfx.util.Duration}
 */
canvasfx.util.Duration.ONE = canvasfx.util.Duration.millis(1);


/**
 * @const
 * @type {canvasfx.util.Duration}
 */
canvasfx.util.Duration.ZERO = canvasfx.util.Duration.millis(0);
