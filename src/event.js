//


/**
 * @fileoverview
 */


import {JFObject} from './lang';


export class EventType extends JFObject {
  constructor(name = 'ROOT') {
    super();
    this.name = name;
  }
  equals(obj) {
    return this.name == obj.name;
  }
  toString() {
    return this.name;
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


export class EventListener extends JFObject {
  constructor() {
    super();
  }
}


export class EventHandler extends EventListener {
  constructor() {
    super();
  }
  hander() {
    super.abstractMethod();
  }
}
