//


/**
 * @fileoverview
 */


import {JFObject} from './lang';
import {Stage} from './stage';


export class Application extends JFObject {
  constructor() {
    super();
    this.id = 'app';
    this.stage = new Stage(this.id);

    this.start(this.stage);
  }
  static load(applicationClass) {
    new applicationClass();
  }
  start(primaryStage) {
    super.abstractMethod();
  }
}
