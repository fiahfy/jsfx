System.registerModule("../../src/geometry.js", [], function() {
  "use strict";
  var __moduleName = "../../src/geometry.js";
  canvasfx.geometry = {};
  canvasfx.geometry.Bounds = function(minX, minY, width, height) {
    canvasfx.Object.call(this);
    this.minX_ = minX;
    this.minY_ = minY;
    this.height_ = height;
    this.width_ = width;
  };
  canvasfx.inherit(canvasfx.geometry.Bounds, canvasfx.Object);
  canvasfx.geometry.Bounds.prototype.getHeight = function() {
    return this.height_;
  };
  canvasfx.geometry.Bounds.prototype.getMaxX = function() {
    return this.minX_ + this.width_;
  };
  canvasfx.geometry.Bounds.prototype.getMaxY = function() {
    return this.minY_ + this.height_;
  };
  canvasfx.geometry.Bounds.prototype.getMinX = function() {
    return this.minX_;
  };
  canvasfx.geometry.Bounds.prototype.getMinY = function() {
    return this.minY_;
  };
  canvasfx.geometry.Bounds.prototype.getWidth = function() {
    return this.width_;
  };
  canvasfx.geometry.Dimension = function(opt_width, opt_height) {
    canvasfx.Object.call(this);
    this.height_ = canvasfx.supplement(opt_height, 0.0);
    this.width_ = canvasfx.supplement(opt_width, 0.0);
  };
  canvasfx.inherit(canvasfx.geometry.Dimension, canvasfx.Object);
  canvasfx.geometry.Dimension.prototype.getHeight = function() {
    return this.height_;
  };
  canvasfx.geometry.Dimension.prototype.getWidth = function() {
    return this.width_;
  };
  canvasfx.geometry.Point = function(opt_x, opt_y) {
    canvasfx.Object.call(this);
    this.x_ = canvasfx.supplement(opt_x, 0.0);
    this.y_ = canvasfx.supplement(opt_y, 0.0);
  };
  canvasfx.inherit(canvasfx.geometry.Point, canvasfx.Object);
  canvasfx.geometry.Point.prototype.add = function(x, opt_y) {
    if (x instanceof canvasfx.geometry.Point) {
      opt_y = x.getY();
      x = x.getX();
    }
    return new canvasfx.geometry.Point(this.x_ + x, this.y_ + opt_y);
  };
  canvasfx.geometry.Point.prototype.distance = function(x1, opt_y1) {
    if (x1 instanceof canvasfx.geometry.Point) {
      opt_y1 = x1.getY();
      x1 = x1.getX();
    }
    return Math.sqrt(Math.pow(this.x_ - x1, 2) + Math.pow(this.y_ - opt_y1, 2));
  };
  canvasfx.geometry.Point.prototype.getX = function() {
    return this.x_;
  };
  canvasfx.geometry.Point.prototype.getY = function() {
    return this.y_;
  };
  return {};
});
System.get("../../src/geometry.js" + '');
