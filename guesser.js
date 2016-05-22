

var gameport = document.getElementById("gameport");
var renderer = PIXI.autoDetectRenderer(800, 500);
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();


var title_screen = new PIXI.Container();
stage.addChild(title_screen);
title_screen.interactive = true;
title_screen.on('mousedown', toDifficultySelect);

function toDifficultySelect() {

		title_screen.renderable = false;
		difficulty_select.renderable = true;
	}




var difficulty_select = new PIXI.Container();
stage.addChild(difficulty_select);


// Sets the defaults for when the game is loaded
difficulty_select.renderable = false;
title_screen.renderable = true;






PIXI.loader
	.add("menu_assets.json")
	.load(load_title);

function load_title(){


	 
	var menu_background = PIXI.Texture.fromFrame("menu_bg.png");

	var title_background = new PIXI.Sprite(menu_background);
	title_screen.addChild(title_background);

	var difficulty_select_background = new PIXI.Sprite(menu_background);
	difficulty_select.addChild(difficulty_select_background);



	var welcome = new PIXI.Sprite(PIXI.Texture.fromFrame("welcome_words.png"));
	title_screen.addChild(welcome);
	welcome.anchor.x = .5;
	welcome.anchor.y = .5;
	welcome.position.x = 400;
	welcome.position.y = 200;



	var press_enter = new PIXI.Sprite(PIXI.Texture.fromFrame("press_enter.png"));
	title_screen.addChild(press_enter);
	press_enter.anchor.x = .5;
	press_enter.anchor.y = .5;
	press_enter.position.x = 400;
	press_enter.position.y = 350;
	press_enter.scale.x = .8;
	press_enter.scale.y = .8;





	var pls_select = new PIXI.Sprite(PIXI.Texture.fromFrame("select_difficulty.png"));
	difficulty_select.addChild(pls_select);
	pls_select.anchor.x = .5;
	pls_select.anchor.y = .5;
	pls_select.position.x = 400;
	pls_select.position.y = 150;
	pls_select.scale.x = 1.5;
	pls_select.scale.y = 1.5;


var normal = new PIXI.Sprite(PIXI.Texture.fromFrame("normal.png"));
	difficulty_select.addChild(normal);
	normal.anchor.x = .5;
	normal.anchor.y = .5;
	normal.position.x = 400;
	normal.position.y = 200;
	//normal.scale.x = 1.5;
	//normal.scale.y = 1.5;



var hard = new PIXI.Sprite(PIXI.Texture.fromFrame("hard.png"));
	difficulty_select.addChild(hard);
	hard.anchor.x = .5;
	hard.anchor.y = .5;
	hard.position.x = 400;
	hard.position.y = 250;

}








function animate(){
	requestAnimationFrame(animate);
	renderer.render(stage);

}

animate();