//


/**
 * @fileoverview
 */


import {JFObject} from './lang.js';


export class Duration extends JFObject {
  constructor(millis) {
    super();
    this.millis_ = millis;
  }
  static get INDEFINITE() {
    return new Duration(Infinity);
  }
  static get ONE() {
    return new Duration(1);
  }
  static get ZERO() {
    return new Duration(0);
  }
  add(other) {
    return new Duration(this.millis_ + other.toMillis());
  }
  equals(obj) {
    return this.millis_ == obj.toMillis();
  }
  greaterThan(other) {
    return this.millis_ > other.toMillis();
  }
  greaterThanOrEqualTo(other) {
    return this.millis_ >= other.toMillis();
  }
  static hours(h) {
    return new Duration(h * 60 * 60 * 1000);
  }
  lessThan(other) {
    return this.millis_ < other.toMillis();
  }
  lessThanOrEqualTo(other) {
    return this.millis_ <= other.toMillis();
  }
  static millis(ms) {
    return new Duration(ms);
  }
  static minutes(m) {
    return new Duration(m * 60 * 1000);
  }
  static seconds(s) {
    return new Duration(s * 1000);
  }
  toHours() {
    return this.millis_ / 1000 / 60 / 60;
  }
  toMillis() {
    return this.millis_;
  }
  toMinutes() {
    return this.millis_ / 1000 / 60;
  }
  toSeconds() {
    return this.millis_ / 1000;
  }
}
