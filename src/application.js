//


/**
 * @fileoverview
 */


import {JFObject} from './lang.js';
import {Stage} from './stage.js';


export class Application extends JFObject {
  constructor() {
    super();
    this.id_ = 'app';
    this.stage_ = new Stage();

    this.init();
    this.stage_._setId(this.id_);
    this.start(this.stage_);
  }
  init() {
  }
  static load(applicationClass) {
    new applicationClass();
  }
  start(primaryStage) {
    super.abstractMethod();
  }
}
