//


/**
 * @fileoverview xxx
 */


canvasfx.event = {};



/**
 * @param {string=} opt_name
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.event.EventType = function(opt_name) {
  canvasfx.Object.call(this);

  /**
   * @private
   * @type {string}
   */
  this.name_ = canvasfx.supplement(opt_name, 'ROOT');
};
canvasfx.inherit(canvasfx.event.EventType, canvasfx.Object);


/**
 * @return {string}
 */
canvasfx.event.EventType.prototype.getName = function() {
  return this.name_;
};


/**
 * @return {string}
 */
canvasfx.event.EventType.prototype.toString = function() {
  return this.getName();
};



/**
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.event.Event = function() {
  canvasfx.Object.call(this);

  /**
   * @protected
   * @type {canvasfx.event.EventType}
   */
  this.eventType = canvasfx.event.Event.ANY;
};
canvasfx.inherit(canvasfx.event.Event, canvasfx.Object);


/**
 * @return {canvasfx.event.EventType}
 */
canvasfx.event.Event.prototype.getEventType = function() {
  return this.eventType;
};


/**
 * @protected
 * @param {canvasfx.event.EventType} value
 */
canvasfx.event.Event.prototype.setEventType = function(value) {
  this.eventType = value;
};


/**
 * @const
 * @type {canvasfx.event.EventType}
 */
canvasfx.event.Event.ANY =
    new canvasfx.event.EventType('ANY');



/**
 * @constructor
 * @extends {canvasfx.event.Event}
 */
canvasfx.event.ActionEvent = function() {
  canvasfx.event.Event.call(this);

  /**
   * @protected
   * @type {canvasfx.event.EventType}
   */
  this.eventType = canvasfx.event.ActionEvent.ACTION;
};
canvasfx.inherit(canvasfx.event.ActionEvent, canvasfx.event.Event);


/**
 * @const
 * @type {canvasfx.event.EventType}
 */
canvasfx.event.ActionEvent.ACTION =
    new canvasfx.event.EventType('ACTION');



/**
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.event.EventListener = function() {
  canvasfx.Object.call(this);
};
canvasfx.inherit(canvasfx.event.EventListener, canvasfx.Object);



/**
 * @constructor
 * @extends {canvasfx.event.EventListener}
 */
canvasfx.event.EventHandler = function() {
  canvasfx.event.EventListener.call(this);
};
canvasfx.inherit(canvasfx.event.EventHandler, canvasfx.event.EventListener);


/**
 * @param {canvasfx.event.Event} event
 */
canvasfx.event.EventHandler.prototype.handle = canvasfx.abstractMethod;
