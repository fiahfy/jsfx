System.registerModule("../../../src/scene/paint.js", [], function() {
  "use strict";
  var __moduleName = "../../../src/scene/paint.js";
  canvasfx.scene.paint = {};
  canvasfx.scene.paint.Color = function(opt_red, opt_green, opt_blue, opt_opacity) {
    canvasfx.Object.call(this);
    var red = canvasfx.supplement(opt_red, 0.0);
    var green = canvasfx.supplement(opt_green, 0.0);
    var blue = canvasfx.supplement(opt_blue, 0.0);
    var opacity = canvasfx.supplement(opt_opacity, 1.0);
    if (typeof red === 'string' && red.charAt(0) == '#') {
      var colorString = red.substr(1);
      if (colorString.length == 3) {
        colorString = colorString.charAt(0) + colorString.charAt(0) + colorString.charAt(1) + colorString.charAt(1) + colorString.charAt(2) + colorString.charAt(2) + 'ff';
      } else if (colorString.length == 4) {
        colorString = colorString.charAt(0) + colorString.charAt(0) + colorString.charAt(1) + colorString.charAt(1) + colorString.charAt(2) + colorString.charAt(2) + colorString.charAt(3) + colorString.charAt(3);
      } else if (colorString.length == 6) {
        colorString += 'ff';
      } else if (colorString.length == 8) {} else {
        throw new TypeError(red + ' is invalid web color string');
      }
      red = parseInt(colorString.substr(0, 2), 16);
      green = parseInt(colorString.substr(2, 2), 16);
      blue = parseInt(colorString.substr(4, 2), 16);
      opacity = parseInt(colorString.substr(6, 2), 16);
    }
    this.blue_ = (blue <= 1) ? blue : blue / 255;
    this.green_ = (green <= 1) ? green : green / 255;
    this.opacity_ = (opacity <= 1) ? opacity : opacity / 255;
    this.red_ = (red <= 1) ? red : red / 255;
  };
  canvasfx.inherit(canvasfx.scene.paint.Color, canvasfx.Object);
  canvasfx.scene.paint.Color.prototype.getBlue = function() {
    return this.blue_;
  };
  canvasfx.scene.paint.Color.prototype.getGreen = function() {
    return this.green_;
  };
  canvasfx.scene.paint.Color.prototype.getOpacity = function() {
    return this.opacity_;
  };
  canvasfx.scene.paint.Color.prototype.getRed = function() {
    return this.red_;
  };
  canvasfx.scene.paint.Color.prototype.getWeb = function() {
    return '#' + ('00' + parseInt(this.red_ * 255).toString(16)).slice(-2) + ('00' + parseInt(this.green_ * 255).toString(16)).slice(-2) + ('00' + parseInt(this.blue_ * 255).toString(16)).slice(-2);
  };
  canvasfx.scene.paint.Color.color = function(red, green, blue, opt_opacity) {
    return new canvasfx.scene.paint.Color(red, green, blue, opt_opacity);
  };
  canvasfx.scene.paint.Color.rgb = function(red, green, blue, opt_opacity) {
    return new canvasfx.scene.paint.Color(red, green, blue, opt_opacity);
  };
  canvasfx.scene.paint.Color.web = function(colorString) {
    return new canvasfx.scene.paint.Color(colorString);
  };
  canvasfx.scene.paint.Color.BLACK = canvasfx.scene.paint.Color.web('#000000');
  canvasfx.scene.paint.Color.BLUE = canvasfx.scene.paint.Color.web('#0000ff');
  canvasfx.scene.paint.Color.GRAY = canvasfx.scene.paint.Color.web('#808080');
  canvasfx.scene.paint.Color.GREEN = canvasfx.scene.paint.Color.web('#00ff00');
  canvasfx.scene.paint.Color.RED = canvasfx.scene.paint.Color.web('#ff0000');
  canvasfx.scene.paint.Color.WHITE = canvasfx.scene.paint.Color.web('#ffffff');
  return {};
});
System.get("../../../src/scene/paint.js" + '');
