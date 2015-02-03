//


/**
 * @fileoverview xxx
 */


var test = test || {};



/**
 * @constructor
 * @extends {canvasfx.application.Application}
 */
test.App = function() {
  canvasfx.application.Application.call(this);
};
canvasfx.inherit(test.App, canvasfx.application.Application);


/**
 * @param {canvasfx.stage.Stage} primaryStage
 * @override
 */
test.App.prototype.start = function(primaryStage) {
  var root = new canvasfx.scene.Group();
  var scene = new canvasfx.scene.Scene(root);
  primaryStage.setScene(scene);

  var children = root.getChildren();

  // draw grid
  for (var i = 0; i <= scene.getWidth(); i += 10)
  {
    var y = new canvasfx.scene.shape.Line(
      i, 0,
      i, scene.getHeight()
    );
    y.setStroke(canvasfx.scene.paint.Color.GRAY);
    if (i % 100 == 0) y.setStrokeWidth(2.0);
    children.push(y);
  }
  for (var j = 0; j <= scene.getHeight(); j += 10)
  {
    var x = new canvasfx.scene.shape.Line(
      0, j,
      scene.getWidth(), j
    );
    x.setStroke(canvasfx.scene.paint.Color.GRAY);
    if (j % 100 == 0) x.setStrokeWidth(2.0);
    children.push(x);
  }

  var l = new canvasfx.scene.shape.Line(100, 200, 100, 300);
  l.setStrokeWidth(2);
  l.setStroke(new canvasfx.scene.paint.Color(1, 0, 0, 1));
  //l.setRotate(45);
  //l.setScaleX(1);
  //l.setScaleY(2);
  //l.setRotate(90);

  var circle = new canvasfx.scene.shape.Circle(250, 150, 50);
  //circle.setFill(new canvasfx.scene.paint.Color('#ff0000cc'));
  circle.setFill(canvasfx.scene.paint.Color.RED);
  circle.setStroke(new canvasfx.scene.paint.Color(0, 1, 0, 1));
  circle.setStrokeWidth(2);
  circle.setStrokeType(canvasfx.scene.shape.StrokeType.CENTERED);
  //circle.setRotate(45);
  //circle.setScaleX(1);
  //circle.setScaleY(2);


  var rectangle = new canvasfx.scene.shape.Rectangle(100, 100, 100, 100);
  rectangle.setFill(new canvasfx.scene.paint.Color(0, 0, 0, 1));
  rectangle.setStroke(new canvasfx.scene.paint.Color(1, 0, 0, 1));
  rectangle.setStrokeWidth(2);
  rectangle.setStrokeType(canvasfx.scene.shape.StrokeType.CENTERED);
  //rectangle.setTranslateX(10);
  //rectangle.setRotate(45);
  //rectangle.setScaleX(2);

  var group = new canvasfx.scene.Group(rectangle, l, circle);
  //children.push(rectangle, l, circle);
  //group.setTranslateX(10);
  //group.setRotate(45);
  //group.setScaleX(2);
  children.push(group);


  rectangle.setOnMouseClicked((function() {
    var e = new canvasfx.event.EventHandler();
    e.handle = function(event) {
      console.log(1);
    };
    return e;
  })());

  scene.setOnMouseDragged((function() {
    var e = new canvasfx.event.EventHandler();
    e.handle = function(event) {
      //return;
      group.setTranslateX(event.getX() - 200);
      group.setTranslateY(event.getY() - 200);
    };
    return e;
  })());

  /*
   (function() {
   var start = 0;
   var before = 0;
   var time = 0;
   var sec = 0;

   var t = new canvasfx.animation.AnimationTimer();
   t.handle = function(now) {
   if (!start) start = now;
   time = now - start;

   if (time > sec * 1000) {
   console.log(parseInt(1000 / (now - before)));
   sec++;
   }

   before = now;

   if (time > 10 * 6 * 1000) this.stop();

   this.update();
   };
   t.update = function() {
   var m = circle.getLayoutX();
   circle.setLayoutX(++m);
   };
   return t;
   })().start();
   */

  /*
   var timeline2 = new canvasfx.animation.Timeline(
   new canvasfx.animation.KeyFrame(
   new canvasfx.util.Duration(2000),
   (function() {
   var e = new canvasfx.event.EventHandler();
   e.handle = function(event) {
   console.log(Date.now(), 'fin222');
   };
   return e;
   })()
   )
   );

   var timeline = new canvasfx.animation.Timeline(
   new canvasfx.animation.KeyFrame(
   new canvasfx.util.Duration(5000),
   (function() {
   var e = new canvasfx.event.EventHandler();
   e.handle = function(event) {
   console.log(Date.now(), 'fin');
   timeline2.play();
   };
   return e;
   })()
   ),
   new canvasfx.animation.KeyFrame(
   new canvasfx.util.Duration(6000),
   (function() {
   var e = new canvasfx.event.EventHandler();
   e.handle = function(event) {
   console.log(Date.now(), 'st');
   timeline2.pause();
   };
   return e;
   })()
   ),
   new canvasfx.animation.KeyFrame(
   new canvasfx.util.Duration(7000),
   (function() {
   var e = new canvasfx.event.EventHandler();
   e.handle = function(event) {
   console.log(Date.now(), 'pl');
   timeline2.play();
   };
   return e;
   })()
   )
   );
   timeline.play();
   console.log(Date.now(), 's');
   */
  /*
   var ft = new canvasfx.animation.FadeTransition();
   ft.setDuration(canvasfx.util.Duration.seconds(0.5));
   ft.setNode(circle);
   ft.setCycleCount(3);
   ft.setAutoReverse(true);
   ft.setToValue(0.1);
   ft.play();
   */

  rectangle.setArcHeight(25);
  rectangle.setArcWidth(25);

  var tt = new canvasfx.animation.ScaleTransition();
  tt.setDuration(canvasfx.util.Duration.seconds(3));
  tt.setNode(group);
  //tt.setCycleCount(3);
  //tt.setAutoReverse(true);
  //tt.setToX(100);
  //tt.setToY(50);
  tt.setToX(1.5);
  //tt.play();


  var rt = new canvasfx.animation.RotateTransition();
  rt.setDuration(canvasfx.util.Duration.seconds(3));
  rt.setNode(group);
  rt.setByAngle(360);
  //  rt.setAutoReverse(true);
  //  rt.setCycleCount(canvasfx.animation.Animation.INDEFINITE);
  //rt.play();

  var ft = new canvasfx.animation.StrokeTransition();
  ft.setDuration(canvasfx.util.Duration.seconds(3));
  ft.setShape(circle);
  ft.setToValue(new canvasfx.scene.paint.Color(1, 1, 0));
  ft.play();

  primaryStage.show();
};
