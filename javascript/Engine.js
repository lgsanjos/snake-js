/**
 * @author SAnjos
 */
function Game(grid) {
	this.grid = grid;
	this.snake = null;
	this.cherries = null;
	this.timer = null;
	this.speed;
	this.gameover = false;
	
}

Game.prototype = {
	
	privateCreateSnake:function() {
		this.snake = null;
		this.snake = new Snake( this.grid );
		this.snake.addAt( this.randomX(), this.randomY() );
	},
	
	privateCreateCherriesManager:function() {
		this.cherries = null;
		this.cherries = new CherriesManager(this.grid);
	    this.cherries.maxActiveCherries = 2;
		this.cherries.refreshTime = 5000;
		this.cherries.rating = 40;

	},
	
	privateSetSnakeTimer:function() {
		this.timer = null;
		this.timer = new Timer();
	
		this.timer.start(
			function() { 
				try{
					this.snake.moveFoward();
				}catch(e){
					alert(e);
				}	
				
			   },
			this,
			this.speed);
		
	},
	
	// Public
	
	setCherryRating:function(value) {
		this.cherries.rating = value; 
	},
	
	getCherryRating:function() {
		return this.cherries.rating;
	},
	
	setCherryRefreshTime:function(value) {
		this.cherries.refreshTime = value; 
	},
	
	getCherryRefreshTime:function() {
		return this.cherries.refreshTime;
	},
	
	setCherryMaxActive:function(value) {
		this.cherries.maxActiveCherries = value; 
	},
	
	getCherryMaxActive:function() {
		return this.cherries.maxActiveCherries;
	},	
	
	doOnHitTheWall:function() {
		document.game.gameOver();
	},
		
	doOnHitTheCherry:function() {
		document.game.snake.grow();
	},
		
	randomX:function() {
		return this.grid.randomX();
	},
	
	randomY:function() {
		return this.grid.randomY();
	},
	
	gameOver:function() {
		if (!this.gameover) {
			this.cherries.stop();
			this.stop();
			this.gameover = true;
			alert('Game Over!!!');
		}
		
	},
	
	start:function() {
				
		document.onkeydown = function(e) {
			
			if ( e.keyCode == 37) { document.game.snake.turnLeft();  return false; }
			if ( e.keyCode == 38) { document.game.snake.moveUp();    return false; }
			if ( e.keyCode == 39) { document.game.snake.turnRight(); return false; }
			if ( e.keyCode == 40) { document.game.snake.moveDown();  return false; }
		};	
		
		if (!this.gameover) {
			this.privateSetSnakeTimer();
			this.cherries.start();
		}	

	},
	
	stop:function() {		
		this.timer.stop();
	    this.cherries.stop();
	},
	
	initialize:function() {
		this.grid.onHitTheWall = this.doOnHitTheWall;
		this.grid.onHitTheCherry = this.doOnHitTheCherry;
		this.privateCreateSnake();
		this.privateCreateCherriesManager();
	},
}

function startTheGame(divId, tableSizeX, tableSizeY, speed) {
	
	// cria mapa
	this.mapa = null;
	this.mapa = new TableGrid(divId, tableSizeY, tableSizeX);
	this.mapa.initialize();
	
	document.game = null;
	document.game = new Game(this.mapa);
	document.game.speed = speed;
	document.game.initialize();
	this.game = document.game;

}



