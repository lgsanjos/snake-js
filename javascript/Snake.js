function Snake( grid ) {

	this.tableGrid = grid;
	this.mustGrow = 0;
	this.direction = "left";
	this.body;
	

}

Snake.prototype = {
	
	privateTail: function() {
		return this.body[this.body.length - 1];
	},
	
	privateHead: function() {
		return this.body[0];
	},
	
	privateSize: function(){
		return this.body.length;
	},
	
	privateSetHead:function(brick) {
		this.body.unshift(brick);
	},
	
	privateRemoveTail:function() {
		this.body.pop();
	},
	
	privateClearDraw:function() {
		if ( this.body === undefined ) {
			return false;
		}
				
		for (var i = 0; i < this.privateSize(); i++) {
			this.tableGrid.tryPlaceBrickAt( new Brick("pass", this.body[i].posX, this.body[i].posY) );
		}		
	},
	
	privateDraw:function(){
		
		if ( this.body === undefined ) {
			return false;
		}
		
		for (var i = 0; i < this.privateSize(); i++) {
			this.tableGrid.tryPlaceBrickAt( this.body[i] );	
		}
		
		while ( this.mustGrow > 0 ) {
			this.privateGrow();
			this.mustGrow --;
		}			
		
	},
	
	privateGrow: function() {
		
		this.body.unshift( this.privateCreateNewHead() );
		
	},
	
	privateCreateNewHead:function(){
		var newBrick = null;
		var newBrickPosX = this.privateHead().posX;
		var newBrickPosY = this.privateHead().posY;
		
		switch ( this.direction ) {
			case "up"   : newBrickPosX = this.privateHead().posX - 1; break;
			case "down" : newBrickPosX = this.privateHead().posX + 1; break;
			case "left" : newBrickPosY = this.privateHead().posY - 1; break;
			case "right": newBrickPosY = this.privateHead().posY + 1; break;
		}
		
		return new Brick("snake", newBrickPosX, newBrickPosY); 
	},
	
	// Public
	
	moveUp: function() {
		if (this.direction != "down")
			this.direction = "up";
	},
	moveDown: function() {
		if (this.direction != "up")
			this.direction = "down";
	},
	turnLeft: function() {
		if (this.direction != "right")
			this.direction = "left";
	},
	turnRight: function() {
		if (this.direction != "left")
			this.direction = "right";

	},	
	
	moveFoward: function() {
		this.privateClearDraw();
		try {		
			this.privateRemoveTail();
			this.privateGrow();
		} finally {
			this.privateDraw();
		}
	},
	grow: function() {
		this.mustGrow ++;		
	},
		
	addAt: function(posX, posY, size) {
		if ( this.body === undefined ) {
  		  this.body = new Array(0);
		}
		this.privateClearDraw();
		try {
			var _brick = new Brick("snake", posX, posY);
			this.body.unshift(_brick);
			this.body.unshift(this.privateCreateNewHead());
			this.body.unshift(this.privateCreateNewHead());
		} finally {
			this.privateDraw();
		}
		

	}
};