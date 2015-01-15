System.registerModule("../../../src/scene/input.js", [], function() {
  "use strict";
  var __moduleName = "../../../src/scene/input.js";
  canvasfx.scene.input = {};
  canvasfx.scene.input.InputEvent = function(eventType) {
    canvasfx.event.Event.call(this);
    this.eventType = eventType;
  };
  canvasfx.inherit(canvasfx.scene.input.InputEvent, canvasfx.event.Event);
  canvasfx.scene.input.MouseEvent = function(eventType, x, y) {
    canvasfx.scene.input.InputEvent.call(this, eventType);
    this.x_ = x;
    this.y_ = y;
  };
  canvasfx.inherit(canvasfx.scene.input.MouseEvent, canvasfx.scene.input.InputEvent);
  canvasfx.scene.input.MouseEvent.prototype.getX = function() {
    return this.x_;
  };
  canvasfx.scene.input.MouseEvent.prototype.getY = function() {
    return this.y_;
  };
  canvasfx.scene.input.MouseEvent.MOUSE_CLICKED = new canvasfx.event.EventType('MOUSE_CLICKED');
  canvasfx.scene.input.MouseEvent.MOUSE_ENTERED = new canvasfx.event.EventType('MOUSE_ENTERED');
  canvasfx.scene.input.MouseEvent.MOUSE_EXITED = new canvasfx.event.EventType('MOUSE_EXITED');
  canvasfx.scene.input.MouseEvent.MOUSE_MOVED = new canvasfx.event.EventType('MOUSE_MOVED');
  canvasfx.scene.input.MouseEvent.MOUSE_PRESSED = new canvasfx.event.EventType('MOUSE_PRESSED');
  canvasfx.scene.input.MouseEvent.MOUSE_RELEASED = new canvasfx.event.EventType('MOUSE_RELEASED');
  canvasfx.scene.input.MouseEvent.MOUSE_DRAGGED = new canvasfx.event.EventType('MOUSE_DRAGGED');
  return {};
});
System.get("../../../src/scene/input.js" + '');
