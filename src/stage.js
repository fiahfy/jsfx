//


/**
 * @fileoverview
 */


import {JFObject} from './lang';
import {AnimationTimer} from './animation.js';
import {MouseEvent} from './scene/input.js';


export class JFWindow extends JFObject {
  constructor() {
    super();
    this.canvas_ = window.document.createElement('canvas');
    this.context_ = this.canvas_.getContext('2d');
    this.dragEvent_ = null;
    this.dragging_ = false;
    this.element_ = null;
    this.height_ = 0;
    this.id_ = null;
    this.scene_ = null;
    this.showing_ = false;
    this.width_ = 0;
  }
  _setId(value) {
    this.id_ = value;
    this.element_ = window.document.getElementById(this.id_);
    this.height_ = this.element_.offsetHeight;
    this.width_ = this.element_.offsetWidth;
    this.element_.appendChild(this.canvas_);
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
}


export class Stage extends JFWindow {
  constructor() {
    super();
    this._update();
  }
  _clear() {
    this.context_.setTransform(1, 0, 0, 1, 0, 0);
    this.context_.clearRect(0, 0, this.width_, this.height_);
  }
  _draw() {
    this.scene.root._draw(this.context_);
  }
  _update() {
    let callback = (eventType) => {
      return (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let event = new MouseEvent(eventType, x, y);
        this.scene._handleEvent(event);
      };
    };

    let eventMap = {
      'click': MouseEvent.MOUSE_CLICKED,
      'mouseover': MouseEvent.MOUSE_ENTERED,
      'mouseout': MouseEvent.MOUSE_EXITED,
      'mousemove': MouseEvent.MOUSE_MOVED,
      'mousedown': MouseEvent.MOUSE_PRESSED,
      'mouseup': MouseEvent.MOUSE_RELEASED
    };

    for (let key of Object.keys(eventMap)) {
      this.canvas_.addEventListener(key, callback(eventMap[key]));
    }

    // attach drag event listener
    this.canvas_.addEventListener('mousemove', (e) => {
      this.dragEvent_ = e;
    });

    this.canvas_.addEventListener('mousedown', (e) => {
      this.dragEvent_ = e;
      this.dragging_ = true;

      let mouseup = (e) => {
        this.dragEvent_ = e;
        this.dragging_ = false;
        this.canvas_.removeEventListener('mouseup', mouseup);
      };

      this.canvas_.addEventListener('mouseup', mouseup);
    });

    // animation loop
    (() => {
      let timer = new AnimationTimer();
      timer.handle = (now) => {
        this._clear();
        if (!this.showing_) {
          return;
        }
        this._draw();
        if (this.dragging_) {
          callback(MouseEvent.MOUSE_DRAGGED)(this.dragEvent_);
        }
      };
      return timer;
    })().start();
  }
  close() {
    this.hide();
  }
}
