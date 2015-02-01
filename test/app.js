//


/**
 * @fileoverview xxx
 */


import {Application} from '../src/application';
import {Scene, Group} from '../src/scene';
import {Stage} from '../src/stage';
import {Color} from '../src/scene/paint';
import {StrokeType, Circle, Rectangle, Line} from '../src/scene/shape';


class TestApp extends Application {
  start(primaryStage) {
    console.log('start');
    //document.getElementById('app').innerHTML = 'hoge';

    let root = new Group();
    let scene = new Scene(root);
    primaryStage.scene = scene;

    let children = root.children;

    // draw grid
    for (var i = 0; i <= scene.width; i += 10)
    {
      var y = new Line(i, 0, i, scene.height);
      y.stroke = Color.GRAY;
      if (i % 100 == 0) y.strokeWidth = 2.0;
      children.push(y);
    }
    for (var j = 0; j <= scene.height; j += 10)
    {
      var x = new Line(0, j, scene.width, j);
      x.stroke = Color.GRAY;
      if (j % 100 == 0) x.strokeWidth = 2.0;
      children.push(x);
    }

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

    primaryStage.show();
  }
}

Application.load(TestApp);
