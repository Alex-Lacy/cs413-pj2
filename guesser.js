
// Basic game setup to display in HTML
var gameport = document.getElementById("gameport");
var renderer = PIXI.autoDetectRenderer(800, 500);
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();




// A container for the difficulty select screen
var difficulty_select = new PIXI.Container();
stage.addChild(difficulty_select);


// A container for the actual gameplay
var gameview = new PIXI.Container();
stage.addChild(gameview);

// Creates the titlescreen container and functionality
var title_screen = new PIXI.Container();
stage.addChild(title_screen);
title_screen.interactive = true;
title_screen.on('mousedown', changeView.bind(null,difficulty_select));

// Sets the defaults for when the game is loaded
gameview.visible = false;
gameview.interactive = false;

difficulty_select.visible = false;
difficulty_select.interactive = false;

title_screen.visible = true;





// Reads in the spritesheet
PIXI.loader
	.add("assets.json")
	.load(load_title);

// Creates sprites from spritesheet
function load_title(){
	 
	// Sets all of the sprites that use the generic menu background
	var menu_background = PIXI.Texture.fromFrame("menu_bg.png");

	var title_background = new PIXI.Sprite(menu_background);
	title_screen.addChild(title_background);

	var difficulty_select_background = new PIXI.Sprite(menu_background);
	difficulty_select.addChild(difficulty_select_background);

	var game_background = new PIXI.Sprite(menu_background);
	gameview.addChild(game_background);



	// Sets the title screen's sprites
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




	// Sets difficulty select's sprites
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
	normal.interactive = true;
	normal.on('mousedown',changeView.bind(null,gameview));

	var hard = new PIXI.Sprite(PIXI.Texture.fromFrame("hard.png"));
	difficulty_select.addChild(hard);
	hard.anchor.x = .5;
	hard.anchor.y = .5;
	hard.position.x = 400;
	hard.position.y = 250;
	hard.interactive = true;



	// Sets the actual gameplay sprites
	var question1 = new PIXI.Sprite(PIXI.Texture.fromFrame("question_1.png"));
	gameview.addChild(question1);
	question1.anchor.x = 0;
	question1.anchor.y = .5;
	question1.position.x = 300;
	question1.position.y = 200;


	var answer_1_list = [];
	for(var i=1; i<=4; i++){
		var temp = new PIXI.Sprite(PIXI.Texture.fromFrame('answer_1.' + i + '.png'));

		temp.anchor.x = .5;
		temp.anchor.y = .5;
		temp.position.x = i * (renderer.width / 5);
		temp.position.y = 400;
		gameview.addChild(temp);
		temp.interactive = true;
		temp.on('mousedown',positionToAnswer.bind(null,temp));

		answer_1_list.push(temp);
	}

	

}


function positionToAnswer(sprite){


	createjs.Tween.get(sprite.position).to({x: 320, y: 200}, 1000);

}

// Changes the current displaying container
function changeView(view){

	for(var i=0; i<stage.children.length; i++){
		stage.children[i].visible = false;
		stage.children[i].interactive = false;
	}

	view.visible = true;
	view.interactive = true;
}





// Generic animate function that draws the whole thing
function animate(){
	requestAnimationFrame(animate);
	renderer.render(stage);

}

animate();