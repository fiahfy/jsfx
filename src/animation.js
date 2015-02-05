//


/**
 * @fileoverview
 */


import {JFObject} from './lang';


export class KeyFrame extends JFObject {
  constructor(time, onFinished) {
    super();
    this.onFinished_ = onFinished;
    this.time_ = time;
  }
  get onFinished() {
    return this.onFinished_;
  }
  get time() {
    return this.time_;
  }
}


export class AnimationTimer extends JFObject {
  constructor() {
    super();
    this.id_ = null;
  }
  static cancelAnimationFrame_() {
    return window.cancelAnimationFrame ||
      window.cancelRequestAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      window.oCancelRequestAnimationFrame ||
      window.msCancelRequestAnimationFrame ||
      (id => { window.clearTimeout(id); });
  }
  handle(now) {
    super.abstractMethod();
  }
  static requestAnimationFrame_() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      (callback => { window.setTimeout(callback, 1000 / 60); });
  }
  start() {
    this.stop();

    let animationLoop = () => {
      this.id_ = AnimationTimer.requestAnimationFrame_()(animationLoop);
      this.handle(Date.now());
    };
    animationLoop();
  }
  stop() {
    AnimationTimer.cancelAnimationFrame_()(this.id_);
    this.id_ = null;
  }
}
