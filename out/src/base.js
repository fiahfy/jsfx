System.registerModule("../../src/base.js", [], function() {
  "use strict";
  var __moduleName = "../../src/base.js";
  var Jsfx = function Jsfx() {};
  ($traceurRuntime.createClass)(Jsfx, {inArray: function(value, array) {
      return array.some(function(element) {
        return (element === value);
      });
    }}, {loadApplication: function(application) {
      console.log('load');
      new application();
    }});
  var $__default = Jsfx;
  return {get default() {
      return $__default;
    }};
});
System.get("../../src/base.js" + '');
