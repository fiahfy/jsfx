//


/**
 * @fileoverview
 */


export class JFObject {
  constructor() {
  }
  static get VERSION() {
    return '1.0.0';
  }
  abstractMethod() {
    throw new Error('Implement abstract method.');
  }
}
