System.registerModule("../../src/scene.js", [], function() {
  "use strict";
  var __moduleName = "../../src/scene.js";
  canvasfx.scene = {};
  canvasfx.scene.Scene = function(root, opt_width, opt_height) {
    canvasfx.Object.call(this);
    this.height_ = opt_height;
    this.onMouseClicked_ = null;
    this.onMouseEntered_ = null;
    this.onMouseExited_ = null;
    this.onMouseMoved_ = null;
    this.onMousePressed_ = null;
    this.onMouseReleased_ = null;
    this.onMouseDragged_ = null;
    this.root_ = root;
    this.width_ = opt_width;
  };
  canvasfx.inherit(canvasfx.scene.Scene, canvasfx.Object);
  canvasfx.scene.Scene.prototype.getHeight = function() {
    return this.height_;
  };
  canvasfx.scene.Scene.prototype.getOnMouseClicked = function() {
    return this.onMouseClicked_;
  };
  canvasfx.scene.Scene.prototype.getOnMouseEntered = function() {
    return this.onMouseEntered_;
  };
  canvasfx.scene.Scene.prototype.getOnMouseExited = function() {
    return this.onMouseExited_;
  };
  canvasfx.scene.Scene.prototype.getOnMouseMoved = function() {
    return this.onMouseMoved_;
  };
  canvasfx.scene.Scene.prototype.getOnMousePressed = function() {
    return this.onMousePressed_;
  };
  canvasfx.scene.Scene.prototype.getOnMouseReleased = function() {
    return this.onMouseReleased_;
  };
  canvasfx.scene.Scene.prototype.getOnMouseDragged = function() {
    return this.onMouseDragged_;
  };
  canvasfx.scene.Scene.prototype.getRoot = function() {
    return this.root_;
  };
  canvasfx.scene.Scene.prototype.getWidth = function() {
    return this.width_;
  };
  canvasfx.scene.Scene.prototype.handleEvent = function(event) {
    this.root_.handleEvent(event);
    if (0 <= event.getX() && event.getX() <= this.width_ && 0 <= event.getY() && event.getY() <= this.height_) {
      if (this.onMouseClicked_ && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_CLICKED) {
        this.onMouseClicked_.handle(event);
      }
      if (this.onMouseEntered_ && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_ENTERED) {
        this.onMouseEntered_.handle(event);
      }
      if (this.onMouseExited_ && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_EXITED) {
        this.onMouseExited_.handle(event);
      }
      if (this.onMouseMoved_ && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_MOVED) {
        this.onMouseMoved_.handle(event);
      }
      if (this.onMousePressed_ && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_PRESSED) {
        this.onMousePressed_.handle(event);
      }
      if (this.onMouseReleased_ && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_RELEASED) {
        this.onMouseReleased_.handle(event);
      }
      if (this.onMouseDragged_ && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_DRAGGED) {
        this.onMouseDragged_.handle(event);
      }
    }
  };
  canvasfx.scene.Scene.prototype.setHeight = function(value) {
    this.height_ = value;
  };
  canvasfx.scene.Scene.prototype.setOnMouseClicked = function(value) {
    this.onMouseClicked_ = value;
  };
  canvasfx.scene.Scene.prototype.setOnMouseEntered = function(value) {
    this.onMouseEntered_ = value;
  };
  canvasfx.scene.Scene.prototype.setOnMouseExited = function(value) {
    this.onMouseExited_ = value;
  };
  canvasfx.scene.Scene.prototype.setOnMouseMoved = function(value) {
    this.onMouseMoved_ = value;
  };
  canvasfx.scene.Scene.prototype.setOnMousePressed = function(value) {
    this.onMousePressed_ = value;
  };
  canvasfx.scene.Scene.prototype.setOnMouseReleased = function(value) {
    this.onMouseReleased_ = value;
  };
  canvasfx.scene.Scene.prototype.setOnMouseDragged = function(value) {
    this.onMouseDragged_ = value;
  };
  canvasfx.scene.Scene.prototype.setWidth = function(value) {
    this.width_ = value;
  };
  canvasfx.scene.Node = function() {
    canvasfx.Object.call(this);
    this.layoutX = 0.0;
    this.layoutY = 0.0;
    this.onMouseClicked = null;
    this.onMouseEntered_ = null;
    this.onMouseExited_ = null;
    this.onMouseMoved_ = null;
    this.onMousePressed_ = null;
    this.onMouseReleased_ = null;
    this.onMouseDragged = null;
    this.opacity = 1.0;
    this.parent = null;
    this.rotate = 0.0;
    this.scaleX = 1.0;
    this.scaleY = 1.0;
    this.translateX = 0.0;
    this.translateY = 0.0;
  };
  canvasfx.inherit(canvasfx.scene.Node, canvasfx.Object);
  canvasfx.scene.Node.prototype.contains = canvasfx.abstractMethod;
  canvasfx.scene.Node.prototype.draw = canvasfx.abstractMethod;
  canvasfx.scene.Node.prototype.getLayoutBounds = canvasfx.abstractMethod;
  canvasfx.scene.Node.prototype.getLayoutX = function() {
    return this.layoutX;
  };
  canvasfx.scene.Node.prototype.getLayoutY = function() {
    return this.layoutY;
  };
  canvasfx.scene.Node.prototype.getOnMouseClicked = function() {
    return this.onMouseClicked;
  };
  canvasfx.scene.Node.prototype.getOnMouseEntered = function() {
    return this.onMouseEntered_;
  };
  canvasfx.scene.Node.prototype.getOnMouseExited = function() {
    return this.onMouseExited_;
  };
  canvasfx.scene.Node.prototype.getOnMouseMoved = function() {
    return this.onMouseMoved_;
  };
  canvasfx.scene.Node.prototype.getOnMousePressed = function() {
    return this.onMousePressed_;
  };
  canvasfx.scene.Node.prototype.getOnMouseReleased = function() {
    return this.onMouseReleased_;
  };
  canvasfx.scene.Node.prototype.getOnMouseDragged = function() {
    return this.onMouseDragged;
  };
  canvasfx.scene.Node.prototype.getOpacity = function() {
    return this.opacity;
  };
  canvasfx.scene.Node.prototype.getParent = function() {
    return this.parent;
  };
  canvasfx.scene.Node.prototype.getRotate = function() {
    return this.rotate;
  };
  canvasfx.scene.Node.prototype.getScaleX = function() {
    return this.scaleX;
  };
  canvasfx.scene.Node.prototype.getScaleY = function() {
    return this.scaleY;
  };
  canvasfx.scene.Node.prototype.getTranslateX = function() {
    return this.translateX;
  };
  canvasfx.scene.Node.prototype.getTranslateY = function() {
    return this.translateY;
  };
  canvasfx.scene.Node.prototype.handleEvent = function(event) {
    if (this.contains(event.getX(), event.getY())) {
      if (this.onMouseClicked && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_CLICKED) {
        this.onMouseClicked.handle(event);
      }
      if (this.onMouseEntered_ && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_ENTERED) {
        this.onMouseEntered_.handle(event);
      }
      if (this.onMouseExited_ && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_EXITED) {
        this.onMouseExited_.handle(event);
      }
      if (this.onMouseMoved_ && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_MOVED) {
        this.onMouseMoved_.handle(event);
      }
      if (this.onMousePressed_ && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_PRESSED) {
        this.onMousePressed_.handle(event);
      }
      if (this.onMouseReleased_ && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_RELEASED) {
        this.onMouseReleased_.handle(event);
      }
      if (this.onMouseDragged && event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_DRAGGED) {
        this.onMouseDragged.handle(event);
      }
    }
  };
  canvasfx.scene.Node.prototype.setLayoutX = function(value) {
    this.layoutX = value;
  };
  canvasfx.scene.Node.prototype.setLayoutY = function(value) {
    this.layoutY = value;
  };
  canvasfx.scene.Node.prototype.setOnMouseClicked = function(value) {
    this.onMouseClicked = value;
  };
  canvasfx.scene.Node.prototype.setOnMouseEntered = function(value) {
    this.onMouseEntered_ = value;
  };
  canvasfx.scene.Node.prototype.setOnMouseExited = function(value) {
    this.onMouseExited_ = value;
  };
  canvasfx.scene.Node.prototype.setOnMouseMoved = function(value) {
    this.onMouseMoved_ = value;
  };
  canvasfx.scene.Node.prototype.setOnMousePressed = function(value) {
    this.onMousePressed_ = value;
  };
  canvasfx.scene.Node.prototype.setOnMouseReleased = function(value) {
    this.onMouseReleased_ = value;
  };
  canvasfx.scene.Node.prototype.setOnMouseDragged = function(value) {
    this.onMouseDragged = value;
  };
  canvasfx.scene.Node.prototype.setOpacity = function(value) {
    this.opacity = value;
  };
  canvasfx.scene.Node.prototype.setRotate = function(value) {
    this.rotate = value;
  };
  canvasfx.scene.Node.prototype.setScaleX = function(value) {
    this.scaleX = value;
  };
  canvasfx.scene.Node.prototype.setScaleY = function(value) {
    this.scaleY = value;
  };
  canvasfx.scene.Node.prototype.setTranslateX = function(value) {
    this.translateX = value;
  };
  canvasfx.scene.Node.prototype.setTranslateY = function(value) {
    this.translateY = value;
  };
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
    context.transform(1, 0, 0, 1, parseInt(lb.getMinX() + lb.getWidth() / 2 - plb.getMinX() - plb.getWidth() / 2), parseInt(lb.getMinY() + lb.getHeight() / 2 - plb.getMinY() - plb.getHeight() / 2));
    context.transform(1, 0, 0, 1, parseInt(this.translateX + this.layoutX), parseInt(this.translateY + this.layoutY));
    context.transform(Math.cos(this.rotate * Math.PI / 180), Math.sin(this.rotate * Math.PI / 180), -Math.sin(this.rotate * Math.PI / 180), Math.cos(this.rotate * Math.PI / 180), 0, 0);
    context.transform(this.scaleX, 0, 0, this.scaleY, 0, 0);
  };
  canvasfx.scene.Parent = function() {
    canvasfx.scene.Node.call(this);
  };
  canvasfx.inherit(canvasfx.scene.Parent, canvasfx.scene.Node);
  canvasfx.scene.Group = function(var_args) {
    canvasfx.scene.Parent.call(this);
    this.children_ = Array.prototype.slice.call(arguments);
  };
  canvasfx.inherit(canvasfx.scene.Group, canvasfx.scene.Parent);
  canvasfx.scene.Group.prototype.contains = function(x, y) {
    return this.children_.some(function(element) {
      return element.contains(x, y);
    });
  };
  canvasfx.scene.Group.prototype.draw = function(context) {
    var me = this;
    this.children_.forEach(function(element) {
      element.parent = me;
      element.draw(context);
    });
  };
  canvasfx.scene.Group.prototype.getChildren = function() {
    return this.children_;
  };
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
  canvasfx.scene.Group.prototype.handleEvent = function(event) {
    this.children_.forEach(function(element) {
      element.handleEvent(event);
    });
    canvasfx.scene.Node.prototype.handleEvent.call(this, event);
  };
  return {};
});
System.get("../../src/scene.js" + '');
