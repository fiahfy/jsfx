//


/**
 * @fileoverview
 */


import {Object} from './lang';
import {AnimationTimer} from './animation.js';


export class Stage extends Object {
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
    //
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
        if (!this.isShow) return;
        this.redraw();
        timer.stop();
      };
      return timer;
    })().start();
  }
}
