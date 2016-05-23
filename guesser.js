
// Basic game setup to display in HTML
var gameport = document.getElementById("gameport");
var renderer = PIXI.autoDetectRenderer(806, 508);
gameport.appendChild(renderer.view);


var stage = new PIXI.Container();


var number_of_questions = 4;
var correct_answers = [1, 3, 4, 3];

// A container for the difficulty select screen
var difficulty_select = new PIXI.Container();
stage.addChild(difficulty_select);

// A container for the actual gameplay
var gameview = new PIXI.Container();
stage.addChild(gameview);

// A container for the credits screen
var credits = new PIXI.Container();
stage.addChild(credits);
credits.interactive = true;
credits.on('mousedown', reset);

// Creates the titlescreen container and functionality
var title_screen = new PIXI.Container();
stage.addChild(title_screen);
title_screen.on('mousedown', changeView.bind(null,difficulty_select));

// A container for the losing screen
var losing_screen = new PIXI.Container();
stage.addChild(losing_screen);
losing_screen.on('mousedown', changeView.bind(null,credits));

// A container for the winning screen
var winning_screen = new PIXI.Container();
stage.addChild(winning_screen);
winning_screen.on('mousedown', changeView.bind(null,credits));

// A container for the turtorial
var turtorial = new PIXI.Container();
stage.addChild(turtorial);


var num_lives = 3; // 3 = normal, 1 = hard


function reset(){
	changeView(title_screen);
	load_game();
}

// Sets the defaults for when the game is loaded
gameview.visible = false;
gameview.interactive = false;

difficulty_select.visible = false;
difficulty_select.interactive = false;

losing_screen.visible = false;
losing_screen.interactive = false;

winning_screen.visible = false;
winning_screen.interactive = false;

turtorial.visible = false;
turtorial.interactive = false;

credits.visible = false;
credits.interactive = false;

title_screen.visible = true;
title_screen.interactive = true;




// Reads in the spritesheet
PIXI.loader
	.add("menu_assets.json")
	.load(load_menus);


// Creates sprites from spritesheet
function load_menus() {
	 
	// Sets all of the sprites that use the generic menu background
	
	var menu_background = PIXI.Texture.fromFrame("menu_bg.png");

	var title_background = new PIXI.Sprite(menu_background);
	title_screen.addChild(title_background);

	var difficulty_select_background = new PIXI.Sprite(menu_background);
	difficulty_select.addChild(difficulty_select_background);

	

	var losing_background = new PIXI.Sprite(menu_background);
	losing_screen.addChild(losing_background);

	var winning_backgroud = new PIXI.Sprite(menu_background);
	winning_screen.addChild(winning_backgroud);

	var credits_background = new PIXI.Sprite(menu_background);
	credits.addChild(credits_background);



	// Sets the title screen's sprites
	var welcome = new PIXI.Sprite(PIXI.Texture.fromFrame("welcome_words.png"));
	title_screen.addChild(welcome);
	welcome.anchor.x = .5;
	welcome.anchor.y = .5;
	welcome.position.x = 400;
	welcome.position.y = 200;

	var click_anywhere = PIXI.Texture.fromFrame("click_anywhere.png");
	var title_click_anywhere = new PIXI.Sprite(click_anywhere);
	title_screen.addChild(title_click_anywhere);
	title_click_anywhere.anchor.x = .5;
	title_click_anywhere.anchor.y = .5;
	title_click_anywhere.position.x = 400;
	title_click_anywhere.position.y = 350;
	title_click_anywhere.scale.x = .8;
	title_click_anywhere.scale.y = .8;




	// Sets difficulty select's sprites
	var pls_select = new PIXI.Sprite(PIXI.Texture.fromFrame("select_difficulty.png"));
	difficulty_select.addChild(pls_select);
	pls_select.anchor.x = .5;
	pls_select.anchor.y = .5;
	pls_select.position.x = 400;
	pls_select.position.y = 150;
	pls_select.scale.x = 1.5;
	pls_select.scale.y = 1.5;

	var enter_turtorial = new PIXI.Sprite(PIXI.Texture.fromFrame("turtorial.png"));
	difficulty_select.addChild(enter_turtorial);
	enter_turtorial.anchor.x = .5;
	enter_turtorial.anchor.y = .5;
	enter_turtorial.position.x = 400;
	enter_turtorial.position.y = 250;
	enter_turtorial.interactive = true;
	enter_turtorial.on('mousedown',changeView.bind(null,turtorial));


	var normal = new PIXI.Sprite(PIXI.Texture.fromFrame("normal.png"));
	difficulty_select.addChild(normal);
	normal.anchor.x = .5;
	normal.anchor.y = .5;
	normal.position.x = 400;
	normal.position.y = 325;
	normal.interactive = true;
	normal.on('mousedown', setDifficulty.bind(null, 3));
	normal.on('mousedown',changeView.bind(null,gameview));

	var hard = new PIXI.Sprite(PIXI.Texture.fromFrame("hard.png"));
	difficulty_select.addChild(hard);
	hard.anchor.x = .5;
	hard.anchor.y = .5;
	hard.position.x = 400;
	hard.position.y = 400;
	hard.interactive = true;
	hard.on('mousedown', setDifficulty.bind(null, 1));
	hard.on('mousedown',changeView.bind(null,gameview));


	// Sets the turtorials sprites

	var page1 = new PIXI.Sprite(PIXI.Texture.fromFrame("turtorial1.png"));
	turtorial.addChild(page1);
	page1.visible = true;
	page1.interactive = true;
	page1.scale.x = 1.007;
	page1.scale.y = 1.013;
	page1.on('mousedown',nextTurtorialPage);

	var page2 = new PIXI.Sprite(PIXI.Texture.fromFrame("turtorial2.png"));
	turtorial.addChild(page2);
	page2.visible = false;
	page2.interactive - false;
	page2.scale.x = 1.007
	page2.scale.y = 1.013;
	page2.on('mousedown', reset);

	function nextTurtorialPage () {
		page1.visible = false;
		page1.interactive = false;
		page2.visible = true;
		page2.interactive = true;

	}

	// Sets the winning screens sprites
	var you_win = new PIXI.Sprite(PIXI.Texture.fromFrame("win_text.png"));
	winning_screen.addChild(you_win);
	you_win.position.x = 100;
	you_win.position.y = 100;


	var win_click_anywhere = new PIXI.Sprite(click_anywhere);
	you_win.addChild(win_click_anywhere);
	win_click_anywhere.anchor.x = .5;
	win_click_anywhere.anchor.y = .5;
	win_click_anywhere.position.x = 400;
	win_click_anywhere.position.y = 350;
	win_click_anywhere.scale.x = .8;
	win_click_anywhere.scale.y = .8;


	// Sets the losing screens sprites
	var you_lose = new PIXI.Sprite(PIXI.Texture.fromFrame('lose_text.png'));
	losing_screen.addChild(you_lose);
	you_lose.position.x = 100;
	you_lose.position.y = 100;


	// Sets the credit screen sprites
	var credit_text = new PIXI.Sprite(PIXI.Texture.fromFrame('credits.png'));
	credits.addChild(credit_text);

	var credits_click_anywhere = new PIXI.Sprite(click_anywhere);
	credits.addChild(credits_click_anywhere);
	credits_click_anywhere.anchor.x = .5;
	credits_click_anywhere.anchor.y = .5;
	credits_click_anywhere.position.x = 600;
	credits_click_anywhere.position.y = 450;
	credits_click_anywhere.scale.x = .8;
	credits_click_anywhere.scale.y = .8;

	
} // ends load_menus




PIXI.loader
	.add("game_assets.json")
	.load(load_game);

function load_game(){



	var menu_background = PIXI.Texture.fromFrame("menu_bg.png");
	var game_background = new PIXI.Sprite(menu_background);
	gameview.addChild(game_background);

// Sets the actual gameplay sprites
	var question_list = [];
	var answer_list = [];
	
	

	for(var j=1; j<= number_of_questions; j++){
		var tempq = new PIXI.Sprite(PIXI.Texture.fromFrame('question_' + j + '.png'));
		gameview.addChild(tempq);
		tempq.anchor.x = 0;
		tempq.anchor.y = .5;
		tempq.position.x = 100;
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
			tempa.position.x = (i * (renderer.width / 4)) - 100;
			tempa.position.y = 400;
			tempa.interactive = false;
			tempa.visible = false;
			tempa.number = i;
			tempa.question = j;
			tempa.on('mousedown',isCorrect.bind(null, tempa, tempq));

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




	
	//var num_right = 0;
	var num_wrong = 0;
	//var num_asked = 0;
	var current_question = 0;
	var answer_set = 3; // groups of 3

	var wrong_marks = [wrong1, wrong2, wrong3];

	// need to fix correct
	function isCorrect(answer_sprite, question_sprite){

		if(question_sprite.answer == answer_sprite.number){
			// add sound effect for getting it right
			positionToAnswer(answer_sprite);

			if(current_question == number_of_questions){
				num_wrong = 0;
				current_question = 0;
				answer_set = 3;
				
				window.setTimeout(changeView.bind(null,winning_screen), 2000);
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

			if(num_wrong == num_lives){
				// add sound effect for getting 3 wrong
				
				num_wrong = 0;
				current_question = 0;
				answer_set = 3;
				window.setTimeout(changeView.bind(null, losing_screen), 2000);
			}

			

		}
	}



	function display_next_question(){


		if(current_question != 0){
			for(var l=0; l < answer_list.length; l++){
				if(answer_list[l].question == question_list[current_question-1].number){
					question_list[current_question-1].visible = false;
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

	display_next_question();
}









function setDifficulty(new_lives){

	num_lives = new_lives;
}




function positionToAnswer(sprite){


	createjs.Tween.get(sprite.position).to({x: 175, y: 198}, 1000);

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