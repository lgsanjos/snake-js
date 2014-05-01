function CherriesManager(grid) {

	this.maxActiveCherries = 2;
	this.activeCherries = 0;
	this.refreshTime = 5000;
	this.rating = 40;
	this.timer;
	this.grid = grid;
	
}

CherriesManager.prototype = {
	
	
	privateGetValidBrick:function() {
		var brick;
		
		do{
			brick = this.grid.getBrick( this.grid.randomX(), this.grid.randomY() );
			
		} while( (brick === null) || (brick.type !== "pass") );
		
		return brick;
	},
	
	privateCreateCherry:function() {
		if (this.activeCherries < this.maxActiveCherries) {
			var cherry = null;
			
			cherry = new Cherry(this.grid);
			cherry.owner = this;
			cherry.onShow = this.privateOnCherryShow;
			cherry.onHide = this.privateOnCherryHide;
			
			var validBrick = this.privateGetValidBrick();
			cherry.addAt( validBrick.posX, validBrick.posY );
		} 
		
	},
	
	privateStartTimer:function() {
		this.timer.start(
			function() {
				if ( Math.floor(Math.random() * 100) <= this.rating ){
					this.privateCreateCherry();
				}
			},
			this,
			this.refreshTime
		);
		
	},
	
	privateOnCherryShow:function() {
		this.activeCherries = this.activeCherries + 1; 
	},
	
	privateOnCherryHide:function() {
		this.activeCherries = this.activeCherries - 1;
	},	
	
	start:function() {
		
		this.timer = new Timer();
		this.privateStartTimer();
		
	},
	
	stop: function() {
		
		this.timer.stop();
	}
	
}
