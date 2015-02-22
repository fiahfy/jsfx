//


/**
 * @fileoverview
 */


import {JFObject} from './lang.js';
import {AnimationTimer} from './animation.js';
import {MouseEvent} from './scene/input.js';


export class JFWindow extends JFObject {
  constructor() {
    super();
    this.canvas_ = window.document.createElement('canvas');
    this.context_ = this.canvas_.getContext('2d');
    this.dragging_ = false;
    this.element_ = null;
    this.height_ = 0;
    this.id_ = null;
    this.scene_ = null;
    this.showing_ = false;
    this.width_ = 0;
  }
  get height() {
    return this.height_;
  }
  hide() {
    this.showing_ = false;
  }
  get scene() {
    return this.scene_;
  }
  set scene(value) {
    this.scene_ = value;
    if (this.scene_.width && this.scene_.height) {
      this.width_ = this.scene_.width;
      this.height_ = this.scene_.height;
    } else {
      this.scene_._setWidth(this.width_);
      this.scene_._setHeight(this.height_);
    }
    this.canvas_.width = this.width_;
    this.canvas_.height = this.height_;
  }
  show() {
    this.showing_ = true;
  }
  get showing() {
    return this.showing_;
  }
  get width() {
    return this.width_;
  }
  _setId(value) {
    this.id_ = value;
    this.element_ = window.document.getElementById(this.id_);
    this.height_ = this.element_.offsetHeight;
    this.width_ = this.element_.offsetWidth;
    this.element_.appendChild(this.canvas_);
    this.canvas_.oncontextmenu = () => false;
  }
}


export class Stage extends JFWindow {
  constructor() {
    super();
    this._update();
  }
  close() {
    this.hide();
  }
  _clear() {
    this.context_.setTransform(1, 0, 0, 1, 0, 0);
    this.context_.clearRect(0, 0, this.width_, this.height_);
  }
  _draw() {
    this.scene.root._setContext(this.context_);
    this.scene.root._draw();
  }
  _update() {
    let events = [
      'click',
      'mouseover',
      'mouseout',
      'mousemove',
      'mousedown',
      'mouseup'
    ];

    events.forEach(element => {
      this.canvas_.addEventListener(element, (e) => {
        this.scene.root._handle();
      });
    });

    // animation loop
    var self = this;
    new (class extends AnimationTimer {
      handle(now) {
        self._clear();
        if (!self.showing_) {
          return;
        }
        self._draw();
      }
    })().start();
  }
}
