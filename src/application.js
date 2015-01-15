//


/**
 * @fileoverview xxx
 */


import Stage from '../src/stage';


class Application {
  constructor() {
    this.id = 'app';
    this.stage = new Stage(this.id);
    this.start(this.stage);
  }
  start() {
    throw new Error();
  }
}


export default Application;
