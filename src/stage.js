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
    this.element = window.document.getElementById(id);
    this.scene_ = null;
    this.height = this.element.offsetHeight;
    this.isShow = false;
    this.width = this.element.offsetWidth;

    this.element.appendChild(this.canvas);
    this.addEventListener();
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
      this.scene_.width = this.width;
      this.scene_.height = this.height;
    }
  }
  addEventListener() {
    let callback = (eventType) => {
      return (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let event = new MouseEvent(eventType, x, y);
        this.scene.handleEvent(event);
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

    this.canvas.addEventListener('mousedown', (e) => {
      let event = e;
      callback(MouseEvent.MOUSE_DRAGGED)(e);

      let mousemove = (e) => {
        event = e;
        callback(MouseEvent.MOUSE_DRAGGED)(e);
      };

      let timer = null;
      (() => {
        timer = new AnimationTimer();
        timer.handle = (now) => {
          mousemove(event);
        };
        return timer;
      })().start();

      let mouseup = () => {
        this.canvas.removeEventListener('mousemove', mousemove);
        this.canvas.removeEventListener('mouseup', mouseup);
        timer.stop();
      };

      this.canvas.addEventListener('mousemove', mousemove);
      this.canvas.addEventListener('mouseup', mouseup);
    });
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
    (() => {
      let timer = new AnimationTimer();
      timer.handle = (now) => {
        if (!this.isShow) {
          return;
        }
        this.redraw();
      };
      return timer;
    })().start();
  }
}
