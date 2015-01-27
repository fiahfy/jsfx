//


/**
 * @fileoverview xxx
 */


//import Stage from 'stage';


class Stage {
  constructor(id) {
    this.canvas = window.document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.element = window.document.getElementById(id);
    this.scene = null;
    this.height = this.element.offsetHeight;
    this.isShow = false;
    this.width = this.element.offsetWidth;

    this.element.appendChild(this.canvas);
    //this.addEventListener();
    this.update();
  }
  clear() {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.width, this.height);
  }
  draw() {
    //this.scene.getRoot().draw(this.context);
  }
  redraw() {
    this.clear();
    this.draw();
  }
  setScene(value) {
    this.scene_ = value;
    if (this.scene_.getWidth() && this.scene_.getHeight()) {
      this.width_ = this.scene_.getWidth();
      this.height_ = this.scene_.getHeight();
    } else {
      this.canvas_.width = this.width_;
      this.canvas_.height = this.height_;
      this.scene_.setWidth(this.width_);
      this.scene_.setHeight(this.height_);
    }
  }
  show() {
    this.isShow = true;
  }
  update() {
    //
  }
}


export default Stage;
