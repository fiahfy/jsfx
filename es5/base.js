//


/**
 * @fileoverview xxx
 */


var canvasfx = canvasfx || {};


/**
 * @const
 * @type {string}
 */
canvasfx.VERSION = '1.0.0';


/**
 * @const
 * @type {string}
 */
canvasfx.BASE_FILE_NAME = 'base.js';


/**
 * @type {string}
 */
canvasfx.basePath = '';


/**
 * @type {Array}
 */
canvasfx.loadFiles = [];


/**
 * @param {Object} child
 * @param {Object} parent
 */
canvasfx.inherit = function(child, parent) {
  /** @constructor */
  function t() {}
  t.prototype = parent.prototype;
  child.prototype = new t();
  /** @override */
  child.prototype.constructor = child;
};


/**
 * @param {*} value
 * @param {*=} opt_defaultValue
 * @return {*}
 */
canvasfx.supplement = function(value, opt_defaultValue) {
  if (typeof value === 'undefined' && typeof opt_defaultValue !== 'undefined') {
    return opt_defaultValue;
  }
  return value;
};


/**
 * @param {*} value
 * @param {Array} array
 * @return {boolean}
 */
canvasfx.inArray = function(value, array) {
  return array.some(function(element) {
    return (element === value);
  });
};


/**
 * @param {Function} application
 */
canvasfx.loadApplication = function(application) {
  new application();
};


/**
 */
canvasfx.abstractMethod = function() { console.log(arguments.callee.caller); };


/**
 */
canvasfx.setBasePath = function() {
  var path = '';
  var scripts = window.document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++)
  {
    var script = scripts[i];
    var src = script.src;
    if (src.lastIndexOf('/' + canvasfx.BASE_FILE_NAME) ==
        src.length - ('/' + canvasfx.BASE_FILE_NAME).length) {
      path = src;
      break;
    }
  }

  canvasfx.basePath =
      path.slice(0, path.length - ('/' + canvasfx.BASE_FILE_NAME).length);
};


/**
 * @param {string} namespace
 */
canvasfx.importNameSpace = function(namespace) {
  var array = namespace.split('.');
  array.shift();

  if (!array.length) {
    return;
  }

  var path = canvasfx.basePath;
  array.forEach(function(element) {
    path = path + '/' + element;
  });
  path += '.js';

  if (canvasfx.inArray(path, canvasfx.loadFiles)) {
    return;
  }

  canvasfx.loadFiles.push(path);
  document.write('<script src="' + path + '"></script>');
};



/**
 * @constructor
 */
canvasfx.Object = function() {
};


/**
 * @return {Object}
 */
canvasfx.Object.prototype.clone = function() {
  var clone = {};
  Object.keys(this).forEach(function(key) {
    clone[key] = this[key];
  }, this);
  return clone;
};



canvasfx.setBasePath();
canvasfx.importNameSpace('canvasfx.animation');
canvasfx.importNameSpace('canvasfx.application');
canvasfx.importNameSpace('canvasfx.event');
canvasfx.importNameSpace('canvasfx.geometry');
canvasfx.importNameSpace('canvasfx.math');
canvasfx.importNameSpace('canvasfx.scene');
canvasfx.importNameSpace('canvasfx.scene.input');
canvasfx.importNameSpace('canvasfx.scene.paint');
canvasfx.importNameSpace('canvasfx.scene.shape');
canvasfx.importNameSpace('canvasfx.stage');
canvasfx.importNameSpace('canvasfx.util');
