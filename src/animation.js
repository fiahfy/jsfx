//


/**
 * @fileoverview
 */


import {JFObject} from './lang';


export class KeyFrame extends JFObject {
  constructor(time, onFinished) {
    super();
    this.onFinished = onFinished;
    this.time = time;
  }
}


export class AnimationTimer extends JFObject {
  constructor() {
    super();
    this.id = null;
  }
  static requestAnimationFrame() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      (callback => { window.setTimeout(callback, 1000 / 60); });
  }
  static cancelAnimationFrame() {
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
  start() {
    this.stop();

    let animationLoop = () => {
      this.id = AnimationTimer.requestAnimationFrame()(animationLoop);
      this.handle(Date.now());
    };
    animationLoop();
  }
  stop() {
    AnimationTimer.cancelAnimationFrame()(this.id);
    this.id = null;
  }
}
