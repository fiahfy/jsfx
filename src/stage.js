//


/**
 * @fileoverview
 */


import {JFObject} from './lang';
import {AnimationTimer} from './animation.js';
import {MouseEvent} from './scene/input.js';


export class Stage extends JFObject {
  constructor(id) {
    super();
    this.canvas = window.document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.dragEvent = null;
    this.dragging = false;
    this.element = window.document.getElementById(id);
    this.scene_ = null;
    this.height = this.element.offsetHeight;
    this.isShow = false;
    this.width = this.element.offsetWidth;

    this.element.appendChild(this.canvas);
    this.update();
  }
  get scene() {
    return this.scene_;
  }
  set scene(value) {
    this.scene_ = value;
    if (this.scene_.width && this.scene_.height) {
      this.width = this.scene_.width;
      this.height = this.scene_.height;
    } else {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.scene_.width_ = this.width;
      this.scene_.height_ = this.height;
    }
  }
  clear() {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.width, this.height);
  }
  draw() {
    this.scene.root.draw(this.context);
  }
  redraw() {
    this.clear();
    this.draw();
  }
  show() {
    this.isShow = true;
  }
  update() {
    let callback = (eventType) => {
      return (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let event = new MouseEvent(eventType, x, y);
        this.scene.handleEvent_(event);
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
      this.canvas.addEventListener(key, callback(eventMap[key]));
    }

    this.canvas.addEventListener('mousemove', (e) => {
      this.dragEvent = e;
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.dragEvent = e;
      this.dragging = true;

      let mouseup = (e) => {
        this.dragEvent = e;
        this.dragging = false;
        this.canvas.removeEventListener('mouseup', mouseup);
      };

      this.canvas.addEventListener('mouseup', mouseup);
    });

    (() => {
      let timer = new AnimationTimer();
      timer.handle = (now) => {
        if (this.isShow) {
          this.redraw();
        }
        if (this.dragging) {
          callback(MouseEvent.MOUSE_DRAGGED)(this.dragEvent);
        }
      };
      return timer;
    })().start();
  }
}
