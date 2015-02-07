//


/**
 * @fileoverview
 */


import {JFObject} from '../lang.js';


export class Color extends JFObject {
  constructor(red, green, blue, opacity = 1.0) {
    super();
    this.red_ = red;
    this.green_ = green;
    this.blue_ = blue;
    this.opacity_ = opacity;
  }
  static get BLACK() {
    return Color.web('#000000');
  }
  static get BLUE() {
    return Color.web('#0000ff');
  }
  static get GRAY() {
    return Color.web('#808080');
  }
  static get GREEN() {
    return Color.web('#00ff00');
  }
  static get RED() {
    return Color.web('#ff0000');
  }
  static get WHITE() {
    return Color.web('#ffffff');
  }
  static color(...args) {
    return new Color(...args);
  }
  static rgb(red, green, blue, opacity = 255) {
    red /= 255;
    green /= 255;
    blue /= 255;
    opacity /= 255;
    return new Color(red, green, blue, opacity);
  }
  static web(colorString, opacity = 1.0) {
    // TODO: parse web color string
    colorString = colorString.substr(1);
    switch (colorString.length) {
      case 3:
        colorString =
          colorString.charAt(0) + colorString.charAt(0) +
          colorString.charAt(1) + colorString.charAt(1) +
          colorString.charAt(2) + colorString.charAt(2) +
          ('00' + parseInt(opacity * 255).toString(16)).slice(-2);
        break;
      case 4:
        colorString =
          colorString.charAt(0) + colorString.charAt(0) +
          colorString.charAt(1) + colorString.charAt(1) +
          colorString.charAt(2) + colorString.charAt(2) +
          colorString.charAt(3) + colorString.charAt(3);
        break;
      case 6:
        colorString += ('00' + parseInt(opacity * 255).toString(16)).slice(-2);
        break;
      case 8:
        break;
      default:
        throw new TypeError(`${colorString} is invalid web color string`);
        break;
    }
    let red = parseInt(colorString.substr(0, 2), 16) / 255;
    let green = parseInt(colorString.substr(2, 2), 16) / 255;
    let blue = parseInt(colorString.substr(4, 2), 16) / 255;
    opacity = parseInt(colorString.substr(6, 2), 16) / 255;

    return new Color(red, green, blue, opacity);
  }
  get blue() {
    return this.blue_;
  }
  get green() {
    return this.green_;
  }
  get opacity() {
    return this.opacity_;
  }
  get red() {
    return this.red_;
  }
  get _colorString() {
    return '#' +
      ('00' + parseInt(this.red_ * 255).toString(16)).slice(-2) +
      ('00' + parseInt(this.green_ * 255).toString(16)).slice(-2) +
      ('00' + parseInt(this.blue_ * 255).toString(16)).slice(-2);
  }
}
