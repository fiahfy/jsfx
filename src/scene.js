//


/**
 * @fileoverview
 */


import {JFObject} from './lang.js';
import {Bounds} from './geometry.js';
import {MouseEvent} from './scene/input.js';


export class Scene extends JFObject {
  constructor(root, width = null, height = null) {
    super();
    this.height_ = height;
    this.onMouseClicked_ = null;
    this.onMouseDragged_ = null;
    this.onMouseEntered_ = null;
    this.onMouseExited_ = null;
    this.onMouseMoved_ = null;
    this.onMousePressed_ = null;
    this.onMouseReleased_ = null;
    this.root_ = root;
    this.width_ = width;
  }
  get height() {
    return this.height_;
  }
  get onMouseClicked() {
    return this.onMouseClicked_;
  }
  set onMouseClicked(value) {
    this.onMouseClicked_ = value;
  }
  get onMouseDragged() {
    return this.onMouseDragged_;
  }
  set onMouseDragged(value) {
    this.onMouseDragged_ = value;
  }
  get onMouseEntered() {
    return this.onMouseEntered_;
  }
  set onMouseEntered(value) {
    this.onMouseEntered_ = value;
  }
  get onMouseExited() {
    return this.onMouseExited_;
  }
  set onMouseExited(value) {
    this.onMouseExited_ = value;
  }
  get onMouseMoved() {
    return this.onMouseMoved_;
  }
  set onMouseMoved(value) {
    this.onMouseMoved_ = value;
  }
  get onMousePressed() {
    return this.onMousePressed_;
  }
  set onMousePressed(value) {
    this.onMousePressed_ = value;
  }
  get onMouseReleased() {
    return this.onMouseReleased_;
  }
  set onMouseReleased(value) {
    this.onMouseReleased_ = value;
  }
  get root() {
    return this.root_;
  }
  set root(value) {
    this.root_ = value;
  }
  get width() {
    return this.width_;
  }
  _handleEvent(event) {
    this.root._handleEvent(event);
    //
  }
  _setHeight(value) {
    this.height_ = value;
  }
  _setWidth(value) {
    this.width_ = value;
  }
}


export class Node extends JFObject {
  constructor() {
    super();
    this.context_ = null;
    this.layoutX_ = 0.0;
    this.layoutY_ = 0.0;
    this.onMouseClicked_ = null;
    this.onMouseDragged_ = null;
    this.onMouseEntered_ = null;
    this.onMouseExited_ = null;
    this.onMouseMoved_ = null;
    this.onMousePressed_ = null;
    this.onMouseReleased_ = null;
    this.opacity_ = 1.0;
    this.parent_ = null;
    this.rotate_ = 0.0;
    this.scaleX_ = 1.0;
    this.scaleY_ = 1.0;
    this.translateX_ = 0.0;
    this.translateY_ = 0.0;
  }
  get layoutBounds() {
    super.abstractMethod();
  }
  get layoutX() {
    return this.layoutX_;
  }
  set layoutX(value) {
    this.layoutX_ = value;
  }
  get layoutY() {
    return this.layoutY_;
  }
  set layoutY(value) {
    this.layoutY_ = value;
  }
  get onMouseClicked() {
    return this.onMouseClicked_;
  }
  set onMouseClicked(value) {
    this.onMouseClicked_ = value;
  }
  get onMouseDragged() {
    return this.onMouseDragged_;
  }
  set onMouseDragged(value) {
    this.onMouseDragged_ = value;
  }
  get onMouseEntered() {
    return this.onMouseEntered_;
  }
  set onMouseEntered(value) {
    this.onMouseEntered_ = value;
  }
  get onMouseExited() {
    return this.onMouseExited_;
  }
  set onMouseExited(value) {
    this.onMouseExited_ = value;
  }
  get onMouseMoved() {
    return this.onMouseMoved_;
  }
  set onMouseMoved(value) {
    this.onMouseMoved_ = value;
  }
  get onMousePressed() {
    return this.onMousePressed_;
  }
  set onMousePressed(value) {
    this.onMousePressed_ = value;
  }
  get onMouseReleased() {
    return this.onMouseReleased_;
  }
  set onMouseReleased(value) {
    this.onMouseReleased_ = value;
  }
  get opacity() {
    return this.opacity_;
  }
  set opacity(value) {
    this.opacity_ = value;
  }
  get parent() {
    return this.parent_;
  }
  get rotate() {
    return this.rotate_;
  }
  set rotate(value) {
    this.rotate_ = value;
  }
  get scaleX() {
    return this.scaleX_;
  }
  set scaleX(value) {
    this.scaleX_ = value;
  }
  get scaleY() {
    return this.scaleY_;
  }
  set scaleY(value) {
    this.scaleY_ = value;
  }
  get translateX() {
    return this.translateX_;
  }
  set translateX(value) {
    this.translateX_ = value;
  }
  get translateY() {
    return this.translateY_;
  }
  set translateY(value) {
    this.translateY_ = value;
  }
  _contains(x, y) {
    super.abstractMethod();
  }
  get _currentOpacity() {
    let opacity = 1.0;
    if (this.parent_ != null) {
      opacity = this.parent_._currentOpacity;
    }
    return this.opacity_ * opacity;
  }
  _draw() {
    super.abstractMethod();
  }
  _handle() {
    if (this.context_ == null) {
      return;
    }

    let e = window.event;

    switch (e.type) {
      case 'mousedown':
        if (this._contains(e.offsetX, e.offsetY)) {
          if (this.onMousePressed_ != null) {
            this.onMousePressed_.handle(new MouseEvent(MouseEvent.MOUSE_PRESSED, e.offsetX, e.offsetY));
          }
          this.dragging_ = true;
        }
        break;

      case 'mouseup':
        if (this.dragging_) {
          if (this.onMouseReleased_ != null) {
            this.onMouseReleased_.handle(new MouseEvent(MouseEvent.MOUSE_RELEASED, e.offsetX, e.offsetY));
          }
          if (this._contains(e.offsetX, e.offsetY)) {
            if (this.onMouseClicked_ != null) {
              this.onMouseClicked_.handle(new MouseEvent(MouseEvent.MOUSE_CLICKED, e.offsetX, e.offsetY));
            }
          }
          this.dragging_ = false;
        }
        if (!this.entered_) {
          if (this._contains(e.offsetX, e.offsetY)) {
            if (this.onMouseEntered_ != null) {
              this.onMouseEntered_.handle(new MouseEvent(MouseEvent.MOUSE_ENTERED, e.offsetX, e.offsetY));
            }
            this.entered_ = true;
          }
        }
        break;

      case 'mousemove':
        if (this.dragging_ || e.which == 0) {
          if (!this.entered_) {
            if (this._contains(e.offsetX, e.offsetY)) {
              if (this.onMouseEntered_ != null) {
                this.onMouseEntered_.handle(new MouseEvent(MouseEvent.MOUSE_ENTERED, e.offsetX, e.offsetY));
              }
              this.entered_ = true;
            }
          }
        }
        if (this.dragging_) {
          if (this.onMouseDragged_ != null) {
            this.onMouseDragged_.handle(new MouseEvent(MouseEvent.MOUSE_DRAGGED, e.offsetX, e.offsetY));
          }
        }
        if (e.which == 0) {
          if (this._contains(e.offsetX, e.offsetY)) {
            if (this.onMouseMoved_ != null) {
              this.onMouseMoved_.handle(new MouseEvent(MouseEvent.MOUSE_MOVED, e.offsetX, e.offsetY));
            }
          }
        }
        if (this.dragging_ || e.which == 0) {
          if (this.entered_) {
            if (!this._contains(e.offsetX, e.offsetY)) {
              if (this.onMouseExited_ != null) {
                this.onMouseExited_.handle(new MouseEvent(MouseEvent.MOUSE_EXITED, e.offsetX, e.offsetY));
              }
              this.entered_ = false;
            }
          }
        }
        break;

      case 'mouseover':
        if (!this.entered_) {
          if (this._contains(e.offsetX, e.offsetY)) {
            if (this.onMouseEntered_ != null) {
              this.onMouseEntered_.handle(new MouseEvent(MouseEvent.MOUSE_ENTERED, e.offsetX, e.offsetY));
            }
            this.entered_ = true;
          }
        }
        break;

      case 'mouseout':
        if (this.entered_) {
          if (this.onMouseExited_ != null) {
            this.onMouseExited_.handle(new MouseEvent(MouseEvent.MOUSE_EXITED, e.offsetX, e.offsetY));
          }
          this.entered_ = false;
        }
        this.dragging_ = false;
        break;
    }
  }
  _setContext(value) {
    this.context_ = value;
  }
  _setParent(value) {
    this.parent_ = value;
  }
  _transform() {
    if (this.parent_ != null) {
      this.parent_._transform();
    }

    let lb = this.layoutBounds;
    let plb;
    if (this.parent_ == null) {
      plb = new Bounds(0, 0, 0, 0);
    } else {
      plb = this.parent_.layoutBounds;
    }

    this.context_.translate(
      lb.minX + lb.width / 2 - plb.minX - plb.width / 2,
      lb.minY + lb.height / 2 - plb.minY - plb.height / 2
    );

    this.context_.translate(this.translateX_ + this.layoutX_, this.translateY_ + this.layoutY_);
    this.context_.rotate(this.rotate_ * Math.PI / 180);
    this.context_.scale(this.scaleX_, this.scaleY_);
  }
}


export class Parent extends Node {
  constructor() {
    super();
  }
}


export class Group extends Parent {
  constructor(...nodes) {
    super();
    this.children_ = nodes;
  }
  get children() {
    return this.children_;
  }
  get layoutBounds() {
    let minXArray = [];
    let minYArray = [];
    let maxXArray = [];
    let maxYArray = [];
    this.children_.forEach(element => {
      let lb = element.layoutBounds;
      minXArray.push(lb.minX);
      minYArray.push(lb.minY);
      maxXArray.push(lb.maxX);
      maxYArray.push(lb.maxY);
    });
    let minX = Math.min.apply(null, minXArray);
    let minY = Math.min.apply(null, minYArray);
    let maxX = Math.max.apply(null, maxXArray);
    let maxY = Math.max.apply(null, maxYArray);
    return new Bounds(minX, minY, maxX - minX, maxY - minY);
  }
  _contains(x, y) {
    return this.children_.some(element => {
      return element._contains(x, y);
    });
  }
  _draw() {
    this.children_.forEach(element => {
      element._setParent(this);
      element._draw();
    });
  }
  _handle() {
    this.children_.forEach(element => {
      element._handle();
    });
    super._handle();
  }
  _setContext(context) {
    this.children_.forEach(element => {
      element._setContext(context);
    });
    super._setContext(context);
  }
}
