System.registerModule("../../src/math.js", [], function() {
  "use strict";
  var __moduleName = "../../src/math.js";
  canvasfx.math = {};
  canvasfx.math.Math = function() {
    canvasfx.Object.call(this);
  };
  canvasfx.inherit(canvasfx.math.Math, canvasfx.Object);
  canvasfx.math.Math.PI = Math.PI;
  return {};
});
System.get("../../src/math.js" + '');
