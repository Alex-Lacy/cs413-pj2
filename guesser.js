

var gameport = document.getElementById("gameport");
var renderer = PIXI.autoDetectRenderer(800, 500);
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var title_screen = new PIXI.Container();
stage.addChild(title_screen);
 
var menu_background = new PIXI.Sprite(PIXI.Texture.fromImage("menu_bg.png"));
title_screen.addChild(menu_background);


var welcome = new PIXI.Sprite(PIXI.Texture.fromImage("welcome_words.png"));
title_screen.addChild(welcome);
welcome.anchor.x = .5;
welcome.anchor.y = .5;
welcome.position.x = 400;
welcome.position.y = 200;



var press_enter = new PIXI.Sprite(PIXI.Texture.fromImage("press_enter.png"));
title_screen.addChild(press_enter);
press_enter.anchor.x = .5;
press_enter.anchor.y = .5;
press_enter.position.x = 400;
press_enter.position.y = 350;



function animate(){
	requestAnimationFrame(animate);
	renderer.render(stage);

}

animate();