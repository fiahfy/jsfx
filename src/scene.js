//


/**
 * @fileoverview xxx
 */


canvasfx.scene = {};



/**
 * @param {canvasfx.scene.Node} root
 * @param {number=} opt_width
 * @param {number=} opt_height
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.scene.Scene = function(root, opt_width, opt_height) {
  canvasfx.Object.call(this);

  /**
   * @private
   * @type {number}
   */
  this.height_ = opt_height;

  /**
   * @private
   * @type {canvasfx.event.EventHandler}
   */
  this.onMouseClicked_ = null;

  /**
   * @private
   * @type {canvasfx.event.EventHandler}
   */
  this.onMouseEntered_ = null;

  /**
   * @private
   * @type {canvasfx.event.EventHandler}
   */
  this.onMouseExited_ = null;

  /**
   * @private
   * @type {canvasfx.event.EventHandler}
   */
  this.onMouseMoved_ = null;

  /**
   * @private
   * @type {canvasfx.event.EventHandler}
   */
  this.onMousePressed_ = null;

  /**
   * @private
   * @type {canvasfx.event.EventHandler}
   */
  this.onMouseReleased_ = null;

  /**
   * @private
   * @type {canvasfx.event.EventHandler}
   */
  this.onMouseDragged_ = null;

  /**
   * @private
   * @type {canvasfx.scene.Node}
   */
  this.root_ = root;

  /**
   * @private
   * @type {number}
   */
  this.width_ = opt_width;
};
canvasfx.inherit(canvasfx.scene.Scene, canvasfx.Object);


/**
 * @return {number}
 */
canvasfx.scene.Scene.prototype.getHeight = function() {
  return this.height_;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Scene.prototype.getOnMouseClicked = function() {
  return this.onMouseClicked_;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Scene.prototype.getOnMouseEntered = function() {
  return this.onMouseEntered_;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Scene.prototype.getOnMouseExited = function() {
  return this.onMouseExited_;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Scene.prototype.getOnMouseMoved = function() {
  return this.onMouseMoved_;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Scene.prototype.getOnMousePressed = function() {
  return this.onMousePressed_;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Scene.prototype.getOnMouseReleased = function() {
  return this.onMouseReleased_;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Scene.prototype.getOnMouseDragged = function() {
  return this.onMouseDragged_;
};


/**
 * @return {canvasfx.scene.Node}
 */
canvasfx.scene.Scene.prototype.getRoot = function() {
  return this.root_;
};


/**
 * @return {number}
 */
canvasfx.scene.Scene.prototype.getWidth = function() {
  return this.width_;
};


/**
 * @param {canvasfx.scene.input.MouseEvent} event
 */
canvasfx.scene.Scene.prototype.handleEvent = function(event) {
  this.root_.handleEvent(event);

  if (0 <= event.getX() && event.getX() <= this.width_ &&
      0 <= event.getY() && event.getY() <= this.height_) {
    if (this.onMouseClicked_ &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_CLICKED) {
      this.onMouseClicked_.handle(event);
    }
    if (this.onMouseEntered_ &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_ENTERED) {
      this.onMouseEntered_.handle(event);
    }
    if (this.onMouseExited_ &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_EXITED) {
      this.onMouseExited_.handle(event);
    }
    if (this.onMouseMoved_ &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_MOVED) {
      this.onMouseMoved_.handle(event);
    }
    if (this.onMousePressed_ &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_PRESSED) {
      this.onMousePressed_.handle(event);
    }
    if (this.onMouseReleased_ &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_RELEASED) {
      this.onMouseReleased_.handle(event);
    }
    if (this.onMouseDragged_ &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_DRAGGED) {
      this.onMouseDragged_.handle(event);
    }
  }
};


/**
 * @param {number} value
 */
canvasfx.scene.Scene.prototype.setHeight = function(value) {
  this.height_ = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Scene.prototype.setOnMouseClicked = function(value) {
  this.onMouseClicked_ = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Scene.prototype.setOnMouseEntered = function(value) {
  this.onMouseEntered_ = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Scene.prototype.setOnMouseExited = function(value) {
  this.onMouseExited_ = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Scene.prototype.setOnMouseMoved = function(value) {
  this.onMouseMoved_ = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Scene.prototype.setOnMousePressed = function(value) {
  this.onMousePressed_ = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Scene.prototype.setOnMouseReleased = function(value) {
  this.onMouseReleased_ = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Scene.prototype.setOnMouseDragged = function(value) {
  this.onMouseDragged_ = value;
};


/**
 * @param {number} value
 */
canvasfx.scene.Scene.prototype.setWidth = function(value) {
  this.width_ = value;
};



/**
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.scene.Node = function() {
  canvasfx.Object.call(this);

  /**
   * @protected
   * @type {number}
   */
  this.layoutX = 0.0;

  /**
   * @protected
   * @type {number}
   */
  this.layoutY = 0.0;

  /**
   * @protected
   * @type {canvasfx.event.EventHandler}
   */
  this.onMouseClicked = null;

  /**
   * @private
   * @type {canvasfx.event.EventHandler}
   */
  this.onMouseEntered_ = null;

  /**
   * @private
   * @type {canvasfx.event.EventHandler}
   */
  this.onMouseExited_ = null;

  /**
   * @private
   * @type {canvasfx.event.EventHandler}
   */
  this.onMouseMoved_ = null;

  /**
   * @private
   * @type {canvasfx.event.EventHandler}
   */
  this.onMousePressed_ = null;

  /**
   * @private
   * @type {canvasfx.event.EventHandler}
   */
  this.onMouseReleased_ = null;

  /**
   * @protected
   * @type {canvasfx.event.EventHandler}
   */
  this.onMouseDragged = null;

  /**
   * @protected
   * @type {number}
   */
  this.opacity = 1.0;

  /**
   * @protected
   * @type {canvasfx.scene.Parent}
   */
  this.parent = null;

  /**
   * @protected
   * @type {number}
   */
  this.rotate = 0.0;

  /**
   * @protected
   * @type {number}
   */
  this.scaleX = 1.0;

  /**
   * @protected
   * @type {number}
   */
  this.scaleY = 1.0;

  /**
   * @protected
   * @type {number}
   */
  this.translateX = 0.0;

  /**
   * @protected
   * @type {number}
   */
  this.translateY = 0.0;
};
canvasfx.inherit(canvasfx.scene.Node, canvasfx.Object);


/**
 * @param {number|canvasfx.geometry.Point} x
 * @param {number} y
 */
canvasfx.scene.Node.prototype.contains = canvasfx.abstractMethod;


/**
 * @param {CanvasRenderingContext2D} context
 */
canvasfx.scene.Node.prototype.draw = canvasfx.abstractMethod;


/**
 * @return {canvasfx.geometry.Bounds}
 */
canvasfx.scene.Node.prototype.getLayoutBounds = canvasfx.abstractMethod;


/**
 * @return {number}
 */
canvasfx.scene.Node.prototype.getLayoutX = function() {
  return this.layoutX;
};


/**
 * @return {number}
 */
canvasfx.scene.Node.prototype.getLayoutY = function() {
  return this.layoutY;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Node.prototype.getOnMouseClicked = function() {
  return this.onMouseClicked;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Node.prototype.getOnMouseEntered = function() {
  return this.onMouseEntered_;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Node.prototype.getOnMouseExited = function() {
  return this.onMouseExited_;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Node.prototype.getOnMouseMoved = function() {
  return this.onMouseMoved_;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Node.prototype.getOnMousePressed = function() {
  return this.onMousePressed_;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Node.prototype.getOnMouseReleased = function() {
  return this.onMouseReleased_;
};


/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Node.prototype.getOnMouseDragged = function() {
  return this.onMouseDragged;
};


/**
 * @return {number}
 */
canvasfx.scene.Node.prototype.getOpacity = function() {
  return this.opacity;
};


/**
 * @return {canvasfx.scene.Parent}
 */
canvasfx.scene.Node.prototype.getParent = function() {
  return this.parent;
};


/**
 * @return {number}
 */
canvasfx.scene.Node.prototype.getRotate = function() {
  return this.rotate;
};


/**
 * @return {number}
 */
canvasfx.scene.Node.prototype.getScaleX = function() {
  return this.scaleX;
};


/**
 * @return {number}
 */
canvasfx.scene.Node.prototype.getScaleY = function() {
  return this.scaleY;
};


/**
 * @return {number}
 */
canvasfx.scene.Node.prototype.getTranslateX = function() {
  return this.translateX;
};


/**
 * @return {number}
 */
canvasfx.scene.Node.prototype.getTranslateY = function() {
  return this.translateY;
};


/**
 * @param {canvasfx.scene.input.MouseEvent} event
 */
canvasfx.scene.Node.prototype.handleEvent = function(event) {
  if (this.contains(event.getX(), event.getY())) {
    if (this.onMouseClicked &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_CLICKED) {
      this.onMouseClicked.handle(event);
    }
    if (this.onMouseEntered_ &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_ENTERED) {
      this.onMouseEntered_.handle(event);
    }
    if (this.onMouseExited_ &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_EXITED) {
      this.onMouseExited_.handle(event);
    }
    if (this.onMouseMoved_ &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_MOVED) {
      this.onMouseMoved_.handle(event);
    }
    if (this.onMousePressed_ &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_PRESSED) {
      this.onMousePressed_.handle(event);
    }
    if (this.onMouseReleased_ &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_RELEASED) {
      this.onMouseReleased_.handle(event);
    }
    if (this.onMouseDragged &&
        event.getEventType() ==
            canvasfx.scene.input.MouseEvent.MOUSE_DRAGGED) {
      this.onMouseDragged.handle(event);
    }
  }
};


/**
 * @param {number} value
 */
canvasfx.scene.Node.prototype.setLayoutX = function(value) {
  this.layoutX = value;
};


/**
 * @param {number} value
 */
canvasfx.scene.Node.prototype.setLayoutY = function(value) {
  this.layoutY = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Node.prototype.setOnMouseClicked = function(value) {
  this.onMouseClicked = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Node.prototype.setOnMouseEntered = function(value) {
  this.onMouseEntered_ = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Node.prototype.setOnMouseExited = function(value) {
  this.onMouseExited_ = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Node.prototype.setOnMouseMoved = function(value) {
  this.onMouseMoved_ = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Node.prototype.setOnMousePressed = function(value) {
  this.onMousePressed_ = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Node.prototype.setOnMouseReleased = function(value) {
  this.onMouseReleased_ = value;
};


/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Node.prototype.setOnMouseDragged = function(value) {
  this.onMouseDragged = value;
};


/**
 * @param {number} value
 */
canvasfx.scene.Node.prototype.setOpacity = function(value) {
  this.opacity = value;
};


/**
 * @param {number} value
 */
canvasfx.scene.Node.prototype.setRotate = function(value) {
  this.rotate = value;
};


/**
 * @param {number} value
 */
canvasfx.scene.Node.prototype.setScaleX = function(value) {
  this.scaleX = value;
};


/**
 * @param {number} value
 */
canvasfx.scene.Node.prototype.setScaleY = function(value) {
  this.scaleY = value;
};


/**
 * @param {number} value
 */
canvasfx.scene.Node.prototype.setTranslateX = function(value) {
  this.translateX = value;
};


/**
 * @param {number} value
 */
canvasfx.scene.Node.prototype.setTranslateY = function(value) {
  this.translateY = value;
};


/**
 * @param {CanvasRenderingContext2D} context
 * @protected
 */
canvasfx.scene.Node.prototype.transform = function(context) {
  if (this.parent) {
    this.parent.transform(context);
  }

  var lb = this.getLayoutBounds();
  var plb;
  if (!this.parent) {
    plb = new canvasfx.geometry.Bounds(0, 0, 0, 0);
  } else {
    plb = this.parent.getLayoutBounds();
  }
  context.transform(
      1, 0, 0, 1,
      parseInt(lb.getMinX() + lb.getWidth() / 2 -
          plb.getMinX() - plb.getWidth() / 2),
      parseInt(lb.getMinY() + lb.getHeight() / 2 -
          plb.getMinY() - plb.getHeight() / 2)
  );

  // translate
  context.transform(
      1, 0, 0, 1,
      parseInt(this.translateX + this.layoutX),
      parseInt(this.translateY + this.layoutY)
  );
  // rotate
  context.transform(
      Math.cos(this.rotate * Math.PI / 180),
      Math.sin(this.rotate * Math.PI / 180),
      -Math.sin(this.rotate * Math.PI / 180),
      Math.cos(this.rotate * Math.PI / 180),
      0, 0
  );
  // scale
  context.transform(
      this.scaleX, 0, 0,
      this.scaleY, 0, 0
  );
};



/**
 * @constructor
 * @extends {canvasfx.scene.Node}
 */
canvasfx.scene.Parent = function() {
  canvasfx.scene.Node.call(this);
};
canvasfx.inherit(canvasfx.scene.Parent, canvasfx.scene.Node);



/**
 * @param {...canvasfx.scene.Node} var_args
 * @constructor
 * @extends {canvasfx.scene.Parent}
 */
canvasfx.scene.Group = function(var_args) {
  canvasfx.scene.Parent.call(this);

  /**
   * Child nodes
   * @private
   * @type {Array}
   */
  this.children_ = Array.prototype.slice.call(arguments);
};
canvasfx.inherit(canvasfx.scene.Group, canvasfx.scene.Parent);


/**
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 * @override
 */
canvasfx.scene.Group.prototype.contains = function(x, y) {
  return this.children_.some(function(element) {
    return element.contains(x, y);
  });
};


/**
 * @param {CanvasRenderingContext2D} context
 * @override
 * TODO: set parent
 */
canvasfx.scene.Group.prototype.draw = function(context) {
  var me = this;
  this.children_.forEach(function(element) {
    element.parent = me;
    element.draw(context);
  });
};


/**
 * @return {Array}
 */
canvasfx.scene.Group.prototype.getChildren = function() {
  return this.children_;
};


/**
 * @return {canvasfx.geometry.Bounds}
 */
canvasfx.scene.Group.prototype.getLayoutBounds = function() {
  var minXArray = [];
  var minYArray = [];
  var maxXArray = [];
  var maxYArray = [];
  this.children_.forEach(function(element) {
    var lb = element.getLayoutBounds();
    minXArray.push(lb.getMinX());
    minYArray.push(lb.getMinY());
    maxXArray.push(lb.getMaxX());
    maxYArray.push(lb.getMaxY());
  });
  var minX = Math.min.apply(null, minXArray);
  var minY = Math.min.apply(null, minYArray);
  var maxX = Math.max.apply(null, maxXArray);
  var maxY = Math.max.apply(null, maxYArray);
  return new canvasfx.geometry.Bounds(minX, minY, maxX - minX, maxY - minY);
};


/**
 * @param {canvasfx.scene.input.MouseEvent} event
 * @override
 */
canvasfx.scene.Group.prototype.handleEvent = function(event) {
  this.children_.forEach(function(element) {
    element.handleEvent(event);
  });

  canvasfx.scene.Node.prototype.handleEvent.call(this, event);
};
