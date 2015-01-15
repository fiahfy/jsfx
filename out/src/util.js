System.registerModule("../../src/util.js", [], function() {
  "use strict";
  var __moduleName = "../../src/util.js";
  canvasfx.util = {};
  canvasfx.util.Duration = function(millis) {
    canvasfx.Object.call(this);
    this.millis_ = millis;
  };
  canvasfx.inherit(canvasfx.util.Duration, canvasfx.Object);
  canvasfx.util.Duration.prototype.add = function(other) {
    return new canvasfx.util.Duration(this.millis_ + other.toMillis());
  };
  canvasfx.util.Duration.prototype.equals = function(obj) {
    return this.millis_ == obj.toMillis();
  };
  canvasfx.util.Duration.prototype.greaterThan = function(other) {
    return this.millis_ > other.toMillis();
  };
  canvasfx.util.Duration.prototype.greaterThanOrEqualTo = function(other) {
    return this.millis_ >= other.toMillis();
  };
  canvasfx.util.Duration.prototype.lessThan = function(other) {
    return this.millis_ < other.toMillis();
  };
  canvasfx.util.Duration.prototype.lessThanOrEqualTo = function(other) {
    return this.millis_ <= other.toMillis();
  };
  canvasfx.util.Duration.prototype.toHours = function() {
    return this.millis_ / 1000 / 60 / 60;
  };
  canvasfx.util.Duration.prototype.toMillis = function() {
    return this.millis_;
  };
  canvasfx.util.Duration.prototype.toMinutes = function() {
    return this.millis_ / 1000 / 60;
  };
  canvasfx.util.Duration.prototype.toSeconds = function() {
    return this.millis_ / 1000;
  };
  canvasfx.util.Duration.hours = function(h) {
    return new canvasfx.util.Duration(h * 60 * 60 * 1000);
  };
  canvasfx.util.Duration.millis = function(ms) {
    return new canvasfx.util.Duration(ms);
  };
  canvasfx.util.Duration.minutes = function(m) {
    return new canvasfx.util.Duration(m * 60 * 1000);
  };
  canvasfx.util.Duration.seconds = function(s) {
    return new canvasfx.util.Duration(s * 1000);
  };
  canvasfx.util.Duration.INDEFINITE = canvasfx.util.Duration.millis(Infinity);
  canvasfx.util.Duration.ONE = canvasfx.util.Duration.millis(1);
  canvasfx.util.Duration.ZERO = canvasfx.util.Duration.millis(0);
  return {};
});
System.get("../../src/util.js" + '');
