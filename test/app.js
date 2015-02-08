//


/**
 * @fileoverview xxx
 */


import {KeyFrame, Timeline, FadeTransition} from '../src/animation.js';
import {Application} from '../src/application.js';
import {EventHandler} from '../src/event.js';
import {Scene, Group} from '../src/scene.js';
import {Stage} from '../src/stage.js';
import {Duration} from '../src/util.js';
import {Color} from '../src/scene/paint.js';
import {StrokeType, Circle, Rectangle, Line} from '../src/scene/shape.js';


class TestApp extends Application {
  start(primaryStage) {
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
    circle.onMouseDragged = new (class extends EventHandler {
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
    //})();

    this.testAnimation(circle);

    primaryStage.show();
    setTimeout(() => {
      //primaryStage.hide();
    }, 10000);
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
  testAnimation(node) {
    if (true) {
      var t2 = new Timeline(
        new KeyFrame(
          new Duration(2000),
          (function() {
            var e = new EventHandler();
            e.handle = function(event) {
              console.log(Date.now(), 'fin222');
            };
            return e;
          })()
        )
      );

      var t = new Timeline(
        new KeyFrame(
          new Duration(5000),
          (function() {
            var e = new EventHandler();
            e.handle = function(event) {
              console.log(Date.now(), 'fin');
              t2.play();
            };
            return e;
          })()
        ),
        new KeyFrame(
          new Duration(6000),
          (function() {
            var e = new EventHandler();
            e.handle = function(event) {
              console.log(Date.now(), 'st');
              t2.pause();
            };
            return e;
          })()
        ),
        new KeyFrame(
          new Duration(7000),
          (function() {
            var e = new EventHandler();
            e.handle = function(event) {
              console.log(Date.now(), 'pl');
              t2.play();
            };
            return e;
          })()
        )
      );
      t.play();
    }
    if (false) {
      var ft = new FadeTransition();
      ft.duration = Duration.seconds(3);
      ft.node = node;
      ft.cycleCount = 100;
      ft.autoReverse = true;
      //tt.setToX(100);
      //tt.setToY(50);
      ft.toValue = 0.1;
      ft.play();
    }
  }
}

Application.load(TestApp);
