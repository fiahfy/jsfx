System.registerModule("../../src/event.js", [], function() {
  "use strict";
  var __moduleName = "../../src/event.js";
  canvasfx.event = {};
  canvasfx.event.EventType = function(opt_name) {
    canvasfx.Object.call(this);
    this.name_ = canvasfx.supplement(opt_name, 'ROOT');
  };
  canvasfx.inherit(canvasfx.event.EventType, canvasfx.Object);
  canvasfx.event.EventType.prototype.getName = function() {
    return this.name_;
  };
  canvasfx.event.EventType.prototype.toString = function() {
    return this.getName();
  };
  canvasfx.event.Event = function() {
    canvasfx.Object.call(this);
    this.eventType = canvasfx.event.Event.ANY;
  };
  canvasfx.inherit(canvasfx.event.Event, canvasfx.Object);
  canvasfx.event.Event.prototype.getEventType = function() {
    return this.eventType;
  };
  canvasfx.event.Event.prototype.setEventType = function(value) {
    this.eventType = value;
  };
  canvasfx.event.Event.ANY = new canvasfx.event.EventType('ANY');
  canvasfx.event.ActionEvent = function() {
    canvasfx.event.Event.call(this);
    this.eventType = canvasfx.event.ActionEvent.ACTION;
  };
  canvasfx.inherit(canvasfx.event.ActionEvent, canvasfx.event.Event);
  canvasfx.event.ActionEvent.ACTION = new canvasfx.event.EventType('ACTION');
  canvasfx.event.EventListener = function() {
    canvasfx.Object.call(this);
  };
  canvasfx.inherit(canvasfx.event.EventListener, canvasfx.Object);
  canvasfx.event.EventHandler = function() {
    canvasfx.event.EventListener.call(this);
  };
  canvasfx.inherit(canvasfx.event.EventHandler, canvasfx.event.EventListener);
  canvasfx.event.EventHandler.prototype.handle = canvasfx.abstractMethod;
  return {};
});
System.get("../../src/event.js" + '');
