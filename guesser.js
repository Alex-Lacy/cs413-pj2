
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

// A container for the losing screen
var losing_screen = new PIXI.Container();
stage.addChild(losing_screen);
losing_screen.on('mousedown', reset);

function reset(){
	changeView(title_screen);
	load_sprites();
}

// Sets the defaults for when the game is loaded
gameview.visible = false;
gameview.interactive = false;

difficulty_select.visible = false;
difficulty_select.interactive = false;

losing_screen.visible = false;
losing_screen.interactive = false;

title_screen.visible = true;





// Reads in the spritesheet
PIXI.loader
	.add("assets.json")
	.load(load_sprites);

// Creates sprites from spritesheet
function load_sprites() {
	 
	// Sets all of the sprites that use the generic menu background
	var menu_background = PIXI.Texture.fromFrame("menu_bg.png");

	var title_background = new PIXI.Sprite(menu_background);
	title_screen.addChild(title_background);

	var difficulty_select_background = new PIXI.Sprite(menu_background);
	difficulty_select.addChild(difficulty_select_background);

	var game_background = new PIXI.Sprite(menu_background);
	gameview.addChild(game_background);

	var losing_background = new PIXI.Sprite(menu_background);
	losing_screen.addChild(losing_background);



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
	var question_list = [];
	var answer_list = [];
	var correct_answers = [1, 3];
	

	for(var j=1; j<= 2; j++){
		var tempq = new PIXI.Sprite(PIXI.Texture.fromFrame('question_' + j + '.png'));
		gameview.addChild(tempq);
		tempq.anchor.x = 0;
		tempq.anchor.y = .5;
		tempq.position.x = 300;
		tempq.position.y = 200;
		tempq.visible = false;
		tempq.number = j;
		tempq.answer = correct_answers[j-1];
		//after randomized
		// if answers_list[tempq.j] == tempa.i


		for(var i=1; i<=4; i++){
			var tempa = new PIXI.Sprite(PIXI.Texture.fromFrame('answer_' + j + '.' + i + '.png'));

			gameview.addChild(tempa);
			tempa.anchor.x = .5;
			tempa.anchor.y = .5;
			tempa.position.x = i * (renderer.width / 5);
			tempa.position.y = 400;
			tempa.interactive = false;
			tempa.visible = false;
			tempa.number = i;
			tempa.question = j;
			tempa.on('mousedown',isCorrect.bind(null, tempa, j, i));

			answer_list.push(tempa);
		}
		question_list.push(tempq);
	}

	question_list.sort(function () {
		return Math.random() > .5;
	});




	var wrong_texture = PIXI.Texture.fromFrame('wrong.png');
	var wrong1 = new PIXI.Sprite(wrong_texture);
	gameview.addChild(wrong1);
	wrong1.anchor.x = .5;
	wrong1.anchor.y = .5;
	wrong1.position.x = 650;
	wrong1.position.y = 100;
	wrong1.scale.x = .01;
	wrong1.scale.y = .01;
	wrong1.visible = false;



	var wrong2 = new PIXI.Sprite(wrong_texture);
	gameview.addChild(wrong2);
	wrong2.anchor.x = .5;
	wrong2.anchor.y = .5;
	wrong2.position.x = 700;
	wrong2.position.y = 100;
	wrong2.scale.x = .01;
	wrong2.scale.y = .01;
	wrong2.visible = false;


	var wrong3 = new PIXI.Sprite(wrong_texture);
	gameview.addChild(wrong3);
	wrong3.anchor.x = .5;
	wrong3.anchor.y = .5;
	wrong3.position.x = 750;
	wrong3.position.y = 100;
	wrong3.scale.x = .01;
	wrong3.scale.y = .01;
	wrong3.visible = false;


	var you_lose = new PIXI.Sprite(PIXI.Texture.fromFrame('lose_text.png'));
	losing_screen.addChild(you_lose);

	
	/*
	var question1 = new PIXI.Sprite(PIXI.Texture.fromFrame("question_1.png"));
	gameview.addChild(question1);
	question1.anchor.x = 0;
	question1.anchor.y = .5;
	question1.position.x = 300;
	question1.position.y = 200;
*/	

	
	//var num_right = 0;
	var num_wrong = 0;
	//var num_asked = 0;
	var current_question = 0;
	var answer_set = 3; // groups of 3

	var wrong_marks = [wrong1, wrong2, wrong3];


	function isCorrect(sprite, num_q, num_a){

		if(correct_answers[num_q - 1] == num_a.number){
			// add sound effect for getting it right
			positionToAnswer(sprite);

			if(current_question == 2){
				num_wrong = 0;
				current_question = 0;
				answer_set = 3;
				
				window.setTimeout(reset, 2000);
				//display_next_question();
			}
			else{
				window.setTimeout(display_next_question, 2000);
			}
		}

		else{
			// Add sound effect for getting one wrong
			num_wrong += 1;
			wrong_marks[num_wrong - 1].visible = true;
			enlarge(wrong_marks[num_wrong - 1])

			if(num_wrong == 3){
				// add sound effect for getting 3 wrong
				
				num_wrong = 0;
				current_question = 0;
				answer_set = 3;
				changeView(losing_screen);
			}

			

		}
	}


	function display_next_question(){


		if(current_question != 0){
			for(var l=0; l < answer_list.length; l++){
				if(answer_list[l].question == question_list[current_question-1].number){
					answer_list[l].visible = false;
					answer_list[l].interactive = false;

				}

			}
		}

		question_list[current_question].visible = true;
		for (var k=0; k < answer_list.length; k++){
			if(answer_list[k].question == question_list[current_question].number){
				answer_list[k].visible = true;
				answer_list[k].interactive = true;
			}
		}

		answer_set += 4;
		current_question += 1;
	}
/*
	function display_next_question(){

		if (current_question != 0){

			question_list[current_question-1].visible = false;

			for(var l = answer_set - 4; l >= answer_set - 7; l--){
			answer_list[l].visible = false;
			answer_list[l].interactive = false;
			}
		}

		question_list[current_question].visible = true;
		for(var k = answer_set; k >= answer_set - 3; k--){
			answer_list[k].visible = true;
			answer_list[k].interactive = true;

		}
		answer_set += 4;
		current_question += 1;

	}*/

	display_next_question();
} // ends load_title






function positionToAnswer(sprite){


	createjs.Tween.get(sprite.position).to({x: 320, y: 200}, 1000);

}

function enlarge(sprite){
	createjs.Tween.get(sprite.scale).to({x: .5, y: .5}, 1000);
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