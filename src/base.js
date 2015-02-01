//


/**
 * @fileoverview
 */


export class Jsfx {
  constructor () {
  }
  static loadApplication(application) {
    new application();
  }
  static get VERSION() {
    return '1.0.0';
  }
  inArray(value, array) {
    return array.some(function(element) {
      return (element === value);
    });
  }
}
