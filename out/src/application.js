System.registerModule("../../src/application.js", [], function() {
  "use strict";
  var __moduleName = "../../src/application.js";
  var Application = function Application() {
    this.id = 'app';
    this.stage = '';
    this.start();
  };
  ($traceurRuntime.createClass)(Application, {start: function() {
      throw new Error();
    }}, {});
  var $__default = Application;
  return {get default() {
      return $__default;
    }};
});
System.get("../../src/application.js" + '');
