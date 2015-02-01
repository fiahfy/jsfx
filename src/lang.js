//


/**
 * @fileoverview
 */


export class Object {
  constructor() {
  }
  static get VERSION() {
    return '1.0.0';
  }
  abstractMethod() {
    throw new Error('Implement abstract method.');
  }
}
