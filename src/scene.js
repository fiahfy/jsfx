//


/**
 * @fileoverview
 */


import {Object} from './lang';
import {Bounds} from './geometry';


export class Scene extends Object {
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
    //
  }
}


export class Node extends Object {
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
    //
  }
  transform(context) {
    if (this.parent) {
      this.parent.transform(context);
    }

    var lb = this.layoutBounds;
    var plb;
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
    var minXArray = [];
    var minYArray = [];
    var maxXArray = [];
    var maxYArray = [];
    this.children.forEach(function(element) {
      var lb = element.layoutBounds;
      minXArray.push(lb.minX);
      minYArray.push(lb.minY);
      maxXArray.push(lb.maxX);
      maxYArray.push(lb.maxY);
    });
    var minX = Math.min.apply(null, minXArray);
    var minY = Math.min.apply(null, minYArray);
    var maxX = Math.max.apply(null, maxXArray);
    var maxY = Math.max.apply(null, maxYArray);
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
