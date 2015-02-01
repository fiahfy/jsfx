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
//var fact = (
//    (f = n => n>1 ? n*f(n-1) : 1) => f
//)();
//var fact1 = (
//    (f1 = (n) => { return n>1 ? n*f1(n-1) : 1; } ) => f1
//)();
//var a = ((b = () => { return 2; }) => b)();
//console.log(fact1(5));
