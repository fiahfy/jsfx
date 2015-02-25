//


/**
 * @fileoverview xxx
 */


import {KeyFrame, Timeline, FadeTransition, FillTransition, RotateTransition, ScaleTransition, StrokeTransition, TranslateTransition} from '../src/animation.js';
import {Application} from '../src/application.js';
import {EventHandler} from '../src/event.js';
import {Scene, Group} from '../src/scene.js';
import {Stage} from '../src/stage.js';
import {Duration} from '../src/util.js';
import {Color} from '../src/scene/paint.js';
import {StrokeType, StrokeLineCap, Circle, Rectangle, Line} from '../src/scene/shape.js';
import {Text} from '../src/scene/text.js';


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
    circle.stroke = Color.color(0, 0, 1, 0.5);
    circle.strokeWidth = 10;
    circle.strokeType = StrokeType.OUTSIDE;

    let rectangle = new Rectangle(100, 100, 100, 100);
    rectangle.fill = Color.color(0, 0, 0, 1);
    rectangle.stroke = Color.color(0.5, 0, 0, 0.5);
    rectangle.strokeWidth = 30;
    rectangle.strokeType = StrokeType.OUTSIDE;
    rectangle.arcWidth = 0;
    rectangle.arcHeight = 0;

    let line = new Line(300, 300, 250, 300);
    line.strokeWidth = 50;
    line.strokeLineCap = StrokeLineCap.SQUARE;

    let text = new Text(200, 300, "This is a test");

    let group = new Group(circle, rectangle, text);
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
    group.onMouseClicked = new (class extends EventHandler {
      handle(event) {
        console.log('click');
      }
    })();
    group.onMouseMoved = new (class extends EventHandler {
      handle(event) {
        console.log('move');
        //console.log(window.event);
      }
    })();
    group.onMouseDragged = new (class extends EventHandler {
      handle(event) {
        console.log('drag');
        //console.log(window.event);
      }
    })();
    group.onMousePressed = new (class extends EventHandler {
      handle(event) {
        console.log('press');
        //console.log(window.event);
      }
    })();
    group.onMouseReleased = new (class extends EventHandler {
      handle(event) {
        console.log('release');
        //console.log(window.event);
      }
    })();
    group.onMouseEntered = new (class extends EventHandler {
      handle(event) {
        circle.fill = Color.GREEN;
        console.log('enter');
        //console.log(window.event);
      }
    })();
    group.onMouseExited = new (class extends EventHandler {
      handle(event) {
        circle.fill = Color.RED;
        console.log('exit');
        //console.log(window.event);
      }
    })();
      //return new Hoge();
      //var e = new EventHandler();
      //e.handle = (event) => {
      //  console.log(event);
      //};
      //return e;
    //})();

    this.testAnimation(circle, rectangle, group);

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
  testAnimation(node, n2, n3) {
    if (0) {
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
    if (0) {
      var ft = new FadeTransition();
      ft.duration = Duration.seconds(3);
      ft.node = n3;
      ft.cycleCount = 100;
      ft.autoReverse = true;
      //tt.setToX(100);
      //tt.setToY(50);
      ft.toValue = 0.1;
      ft.play();
    }
    if (0) {
      var ft = new FillTransition();
      ft.duration = Duration.seconds(3);
      ft.shape = node;
      ft.cycleCount = 100;
      ft.autoReverse = true;
      //tt.setToX(100);
      //tt.setToY(50);
      ft.toValue = new Color(0, 1, 0);
      ft.play();
    }
    if (0) {
      var ft = new StrokeTransition();
      ft.duration = Duration.seconds(3);
      ft.shape = node;
      ft.cycleCount = 100;
      ft.autoReverse = true;
      //tt.setToX(100);
      //tt.setToY(50);
      ft.toValue = new Color(0, 1, 0);
      ft.play();
    }
    if (0) {
      var ft = new RotateTransition();
      ft.duration = Duration.seconds(3);
      ft.node = n3;
      ft.cycleCount = 100;
      ft.autoReverse = false;
      //tt.setToX(100);
      //tt.setToY(50);
      ft.toAngle = 360;
      ft.play();
    }
    if (0) {
      var ft = new ScaleTransition();
      ft.duration = Duration.seconds(3);
      ft.node = n3;
      ft.cycleCount = 100;
      ft.autoReverse = true;
      //tt.setToX(100);
      //tt.setToY(50);
      ft.toX = 2;
      ft.toY = 1.5;
      ft.play();
    }
    if (0) {
      var ft = new TranslateTransition();
      ft.duration = Duration.seconds(3);
      ft.node = n3;
      ft.cycleCount = 100;
      ft.autoReverse = true;
      //tt.setToX(100);
      //tt.setToY(50);
      ft.toX = 100;
      ft.toY = 200;
      ft.play();
    }
  }
}

Application.load(TestApp);
