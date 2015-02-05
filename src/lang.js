//


/**
 * @fileoverview
 */


export class JFObject {
  constructor() {
  }
  abstractMethod() {
    throw new Error('Implement abstract method.');
  }
  static get VERSION() {
    return '1.0.0';
  }
}
