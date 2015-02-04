//


/**
 * @fileoverview
 */


import {JFObject} from './lang';
import {Bounds} from './geometry';
import {MouseEvent} from './scene/input';


export class Scene extends JFObject {
  constructor(root, width = null, height = null) {
    super();
    this.height = height;
    this.onMouseClicked = null;
    this.onMouseEntered = null;
    this.onMouseExited = null;
    this.onMouseMoved = null;
    this.onMousePressed = null;
    this.onMouseReleased = null;
    this.onMouseDragged = null;
    this.root = root;
    this.width = width;
  }
  handleEvent(event) {
    this.root.handleEvent(event);
    //
  }
}


export class Node extends JFObject {
  constructor() {
    super();
    this.layoutX = 0.0;
    this.layoutY = 0.0;
    this.onMouseClicked = null;
    this.onMouseEntered = null;
    this.onMouseExited = null;
    this.onMouseMoved = null;
    this.onMousePressed = null;
    this.onMouseReleased = null;
    this.onMouseDragged = null;
    this.opacity = 1.0;
    this.parent = null;
    this.rotate = 0.0;
    this.scaleX = 1.0;
    this.scaleY = 1.0;
    this.translateX = 0.0;
    this.translateY = 0.0;
  }
  get layoutBounds() {
    super.abstractMethod();
  }
  contains(x, y) {
    super.abstractMethod();
  }
  draw(context) {
    super.abstractMethod();
  }
  handleEvent(event) {
    if (!this.contains(event.x, event.y)) {
      return
    }
    if (this.onMouseClicked && event.eventType.equals(MouseEvent.MOUSE_CLICKED)) {
      this.onMouseClicked.handle(event);
    }
    if (this.onMouseDragged && event.eventType.equals(MouseEvent.MOUSE_DRAGGED)) {
      this.onMouseDragged.handle(event);
    }
    if (this.onMouseEntered && event.eventType.equals(MouseEvent.MOUSE_ENTERED)) {
      this.onMouseEntered.handle(event);
    }
    if (this.onMouseExited && event.eventType.equals(MouseEvent.MOUSE_EXITED)) {
      this.onMouseExited.handle(event);
    }
    if (this.onMouseMoved && event.eventType.equals(MouseEvent.MOUSE_MOVED)) {
      this.onMouseMoved.handle(event);
    }
    if (this.onMousePressed && event.eventType.equals(MouseEvent.MOUSE_PRESSED)) {
      this.onMousePressed.handle(event);
    }
    if (this.onMouseReleased && event.eventType.equals(MouseEvent.MOUSE_RELEASED)) {
      this.onMouseReleased.handle(event);
    }
  }
  transform(context) {
    if (this.parent) {
      this.parent.transform(context);
    }

    let lb = this.layoutBounds;
    let plb;
    if (!this.parent) {
      plb = new Bounds(0, 0, 0, 0);
    } else {
      plb = this.parent.layoutBounds;
    }
    context.transform(
      1, 0, 0, 1,
      parseInt(lb.minX + lb.width / 2 -
      plb.minX - plb.width / 2),
      parseInt(lb.minY + lb.height / 2 -
      plb.minY - plb.height / 2)
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
    this.children = nodes;
  }
  get layoutBounds() {
    let minXArray = [];
    let minYArray = [];
    let maxXArray = [];
    let maxYArray = [];
    this.children.forEach(function(element) {
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
  contains(x, y) {
    return this.children.some((element) => {
      return element.contains(x, y);
    });
  }
  draw(context) {
    this.children.forEach((element) => {
      element.parent = this;
      element.draw(context);
    });
  }
  handleEvent(event) {
    this.children.forEach((element) => {
      element.handleEvent(event);
    });
  }
}
