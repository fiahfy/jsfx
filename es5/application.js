//


/**
 * @fileoverview xxx
 */


canvasfx.application = {};



/**
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.application.Application = function() {
  canvasfx.Object.call(this);

  /**
   * @protected
   * @type {string}
   */
  this.id = 'app';

  /**
   * @private
   * @type {canvasfx.stage.Stage}
   */
  this.stage_ = new canvasfx.stage.Stage(this.id);

  this.start(this.stage_);
};
canvasfx.inherit(canvasfx.application.Application, canvasfx.Object);


/**
 * @param {canvasfx.stage.Stage} primaryStage
 */
canvasfx.application.Application.prototype.start = canvasfx.abstractMethod;
