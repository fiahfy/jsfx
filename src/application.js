//


/**
 * @fileoverview
 */


import {Object} from './lang';
import {Stage} from './stage';


export class Application extends Object {
  constructor() {
    super();
    this.id = 'app';
    this.stage = new Stage(this.id);

    this.start(this.stage);
  }
  static load(application) {
    new application();
  }
  start(primaryStage) {
    super.abstractMethod();
  }
}
