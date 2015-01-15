System.registerModule("../../src/stage", [], function() {
  "use strict";
  var __moduleName = "../../src/stage";
  var Stage = function Stage(id) {
    this.canvas = window.document.createElement('canvas');
    this.context = this.canvas.getContent('2d');
    this.element = window.document.getElementById(id);
    this.scene = null;
    this.height = this.element.offsetHeight;
    this.isShow = false;
    this.width = this.elelment.offsetWidth;
    this.element.appendChild(this.canvas);
    this.update();
  };
  ($traceurRuntime.createClass)(Stage, {
    clear: function() {
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.clearRect(0, 0, this.width, this.height);
    },
    draw: function() {},
    redraw: function() {
      this.clear();
      this.draw();
    },
    setScene: function(value) {
      this.scene_ = value;
      if (this.scene_.getWidth() && this.scene_.getHeight()) {
        this.width_ = this.scene_.getWidth();
        this.height_ = this.scene_.getHeight();
      } else {
        this.canvas_.width = this.width_;
        this.canvas_.height = this.height_;
        this.scene_.setWidth(this.width_);
        this.scene_.setHeight(this.height_);
      }
    },
    show: function() {
      this.isShow = true;
    },
    update: function() {}
  }, {});
  var $__default = Stage;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/application", [], function() {
  "use strict";
  var __moduleName = "../../src/application";
  var Stage = System.get("../../src/stage").default;
  var Application = function Application() {
    this.id = 'app';
    this.stage = new Stage(this.id);
    this.start(this.stage);
  };
  ($traceurRuntime.createClass)(Application, {start: function() {
      throw new Error();
    }}, {});
  var $__default = Application;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/base", [], function() {
  "use strict";
  var __moduleName = "../../src/base";
  var Jsfx = function Jsfx() {};
  ($traceurRuntime.createClass)(Jsfx, {inArray: function(value, array) {
      return array.some(function(element) {
        return (element === value);
      });
    }}, {loadApplication: function(application) {
      new application();
    }});
  var $__default = Jsfx;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../test/app.js", [], function() {
  "use strict";
  var __moduleName = "../../test/app.js";
  var Jsfx = System.get("../../src/base").default;
  var Application = System.get("../../src/application").default;
  var TestApp = function TestApp() {
    $traceurRuntime.superConstructor($TestApp).apply(this, arguments);
  };
  var $TestApp = TestApp;
  ($traceurRuntime.createClass)(TestApp, {start: function() {
      console.log('start');
    }}, {}, Application);
  (function() {
    Jsfx.loadApplication(TestApp);
  })();
  return {};
});
System.get("../../test/app.js" + '');
