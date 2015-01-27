//


/**
 * @fileoverview xxx
 */


import Jsfx from '../src/base';
import Application from '../src/application';


class TestApp extends Application {
  start() {
    console.log('start');
    //document.getElementById('app').innerHTML = 'hoge';
  }
}

Jsfx.loadApplication(TestApp);
