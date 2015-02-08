//


/**
 * @fileoverview
 */


import {JFObject} from './lang.js';


export class EventType extends JFObject {
  constructor(name = 'ROOT') {
    super();
    this.name_ = name;
  }
  equals(obj) {
    return this.name_ == obj.name;
  }
  get name() {
    return this.name_;
  }
  toString() {
    return this.name_;
  }
}


export class Event extends JFObject {
  constructor() {
    super();
    this.eventType = Event.ANY;
  }
  static get ANY() {
    return new EventType('ANY');
  }
}


export class ActionEvent extends Event {
  constructor() {
    super();
    this.eventType = ActionEvent.ACTION;
  }
  static get ACTION() {
    return new EventType('ACTION');
  }
}


export class EventHandler extends JFObject {
  constructor() {
    super();
  }
  handle() {
    super.abstractMethod();
  }
}
