//


/**
 * @fileoverview xxx
 */


import {Jsfx} from '../src/base';
import {Application} from '../src/application';
import {Scene, Group} from '../src/scene';
import {Stage} from '../src/stage';
import {StrokeType, Circle} from '../src/scene/shape';
import {Color} from '../src/scene/paint';


class TestApp extends Application {
  start(primaryStage) {
    console.log('start');
    //document.getElementById('app').innerHTML = 'hoge';

    let root = new Group();
    primaryStage.scene = new Scene(root);

    let children = root.children;

    let circle = new Circle(250, 150, 50);
    circle.fill = Color.RED;
    circle.stroke = Color.BLUE;
    circle.strokeWidth = 2;
    circle.strokeType = StrokeType.INSIDE;
    children.push(circle);

    primaryStage.show();
  }
}

Jsfx.loadApplication(TestApp);
