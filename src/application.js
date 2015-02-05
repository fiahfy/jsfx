//


/**
 * @fileoverview
 */


import {JFObject} from './lang';
import {Stage} from './stage';


export class Application extends JFObject {
  constructor() {
    super();
    this.id_ = 'app';
    this.stage_ = new Stage(this.id_);

    this.start(this.stage_);
  }
  static load(applicationClass) {
    new applicationClass();
  }
  start(primaryStage) {
    super.abstractMethod();
  }
}
