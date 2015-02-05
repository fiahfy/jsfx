//


/**
 * @fileoverview
 */


import {EventType, Event} from '../event';


export class InputEvent extends Event {
  constructor(eventType) {
    super();
    this.eventType = eventType;
  }
}


export class MouseEvent extends InputEvent {
  constructor(eventType, x, y) {
    super(eventType);
    this.x_ = x;
    this.y_ = y;
  }
  static get MOUSE_CLICKED() {
    return new EventType('MOUSE_CLICKED');
  }
  static get MOUSE_DRAGGED() {
    return new EventType('MOUSE_DRAGGED');
  }
  static get MOUSE_ENTERED() {
    return new EventType('MOUSE_ENTERED');
  }
  static get MOUSE_EXITED() {
    return new EventType('MOUSE_EXITED');
  }
  static get MOUSE_MOVED() {
    return new EventType('MOUSE_MOVED');
  }
  static get MOUSE_PRESSED() {
    return new EventType('MOUSE_PRESSED');
  }
  static get MOUSE_RELEASED() {
    return new EventType('MOUSE_RELEASED');
  }
  get x() {
    return this.x_;
  }
  get y() {
    return this.y_;
  }
}
