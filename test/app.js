//


/**
 * @fileoverview xxx
 */


import {Application} from '../src/application';
import {EventHandler} from '../src/event';
import {Scene, Group} from '../src/scene';
import {Stage} from '../src/stage';
import {Color} from '../src/scene/paint';
import {StrokeType, Circle, Rectangle, Line} from '../src/scene/shape';


class TestApp extends Application {
  start(primaryStage) {
    console.log('start');
    //document.getElementById('app').innerHTML = 'hoge';

    this.root = new Group();
    this.scene = new Scene(this.root);
    primaryStage.scene = this.scene;

    let children = this.root.children;

    // grid
    children.push(this.getGrid());

    let circle = new Circle(250, 150, 50);
    circle.fill = Color.RED;
    circle.stroke = Color.BLUE;
    circle.strokeWidth = 2;
    circle.strokeType = StrokeType.CENTERED;

    let rectangle = new Rectangle(100, 100, 100, 100);
    rectangle.fill = Color.color(0, 0, 0, 1);
    rectangle.stroke = Color.color(1, 0, 0, 1);
    rectangle.strokeWidth = 2;
    rectangle.strokeType = StrokeType.CENTERED;

    let group = new Group(circle, rectangle);
    children.push(group);

    rectangle.onMouseEntered = (() => {
      var e = new EventHandler();
      e.handle = (event) => {
        rectangle.fill = Color.color(0, 0, 0, 0.5);
      };
      return e;
    })();
    rectangle.onMouseExited = (() => {
      var e = new EventHandler();
      e.handle = (event) => {
        rectangle.fill = Color.color(0, 0, 0, 1);
      };
      return e;
    })();
    circle.onMouseDragged = (() => {
      return new (class extends EventHandler {
        handle(event) {
          console.log(event);
        }
      })();
      //return new Hoge();
      //var e = new EventHandler();
      //e.handle = (event) => {
      //  console.log(event);
      //};
      //return e;
    })();

    primaryStage.show();
  }
  getGrid() {
    let g = new Group();

    for (var i = 0; i <= this.scene.width; i += 10) {
      var y = new Line(i, 0, i, this.scene.height);
      y.stroke = Color.GRAY;
      if (i % 100 == 0) y.strokeWidth = 2.0;
      g.children.push(y);
    }
    for (var j = 0; j <= this.scene.height; j += 10) {
      var x = new Line(0, j, this.scene.width, j);
      x.stroke = Color.GRAY;
      if (j % 100 == 0) x.strokeWidth = 2.0;
      g.children.push(x);
    }

    return g;
  }
}

Application.load(TestApp);
