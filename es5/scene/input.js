//


/**
 * @fileoverview xxx
 */


canvasfx.scene.input = {};



/**
 * @param {canvasfx.event.EventType} eventType
 * @constructor
 * @extends {canvasfx.event.Event}
 */
canvasfx.scene.input.InputEvent = function(eventType) {
  canvasfx.event.Event.call(this);

  /**
   * @protected
   * @type {canvasfx.event.EventType}
   */
  this.eventType = eventType;
};
canvasfx.inherit(canvasfx.scene.input.InputEvent, canvasfx.event.Event);



/**
 * @param {canvasfx.event.EventType} eventType
 * @param {number} x
 * @param {number} y
 * @constructor
 * @extends {canvasfx.scene.input.InputEvent}
 */
canvasfx.scene.input.MouseEvent = function(eventType, x, y) {
  canvasfx.scene.input.InputEvent.call(this, eventType);

  /**
   * @private
   * @type {number}
   */
  this.x_ = x;

  /**
   * @private
   * @type {number}
   */
  this.y_ = y;
};
canvasfx.inherit(canvasfx.scene.input.MouseEvent,
    canvasfx.scene.input.InputEvent);


/**
 * @return {number}
 */
canvasfx.scene.input.MouseEvent.prototype.getX = function() {
  return this.x_;
};


/**
 * @return {number}
 */
canvasfx.scene.input.MouseEvent.prototype.getY = function() {
  return this.y_;
};


/**
 * @const
 * @type {canvasfx.event.EventType}
 */
canvasfx.scene.input.MouseEvent.MOUSE_CLICKED =
    new canvasfx.event.EventType('MOUSE_CLICKED');


/**
 * @const
 * @type {canvasfx.event.EventType}
 */
canvasfx.scene.input.MouseEvent.MOUSE_ENTERED =
    new canvasfx.event.EventType('MOUSE_ENTERED');


/**
 * @const
 * @type {canvasfx.event.EventType}
 */
canvasfx.scene.input.MouseEvent.MOUSE_EXITED =
    new canvasfx.event.EventType('MOUSE_EXITED');


/**
 * @const
 * @type {canvasfx.event.EventType}
 */
canvasfx.scene.input.MouseEvent.MOUSE_MOVED =
    new canvasfx.event.EventType('MOUSE_MOVED');


/**
 * @const
 * @type {canvasfx.event.EventType}
 */
canvasfx.scene.input.MouseEvent.MOUSE_PRESSED =
    new canvasfx.event.EventType('MOUSE_PRESSED');


/**
 * @const
 * @type {canvasfx.event.EventType}
 */
canvasfx.scene.input.MouseEvent.MOUSE_RELEASED =
    new canvasfx.event.EventType('MOUSE_RELEASED');


/**
 * @const
 * @type {canvasfx.event.EventType}
 */
canvasfx.scene.input.MouseEvent.MOUSE_DRAGGED =
    new canvasfx.event.EventType('MOUSE_DRAGGED');
