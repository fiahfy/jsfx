//


/**
 * @fileoverview
 */


import {Stage} from './stage';
import {Object} from './object';


export class Application extends Object {
  constructor() {
    super();
    this.id = 'app';
    this.stage = new Stage(this.id);

    this.start(this.stage);
  }
  start(primaryStage) {
    super.abstractMethod();
  }
}
