//


/**
 * @fileoverview xxx
 */


class Jsfx {
  constructor () {
    //
  }
  inArray(value, array) {
    return array.some(function(element) {
      return (element === value);
    });
  }
  static loadApplication(application) {
    new application();
  }
}


export default Jsfx;