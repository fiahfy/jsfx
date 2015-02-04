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
  }
  static load(applicationClass) {
    let application = new applicationClass();
    application.start(application.stage);
  }
  start(primaryStage) {
    super.abstractMethod();
  }
}
