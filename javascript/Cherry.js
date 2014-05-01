function Cherry(grid) {
	
	this.maxTimeout = 3200;
	this.minTimeout = 1500;
	this.timer = null;
	this.brick = null;
	this.grid = grid;
	
	this.onShow = null; // evento disparado quando a cherry é adicionado na tela
	this.onHide = null; // evento disparado quando a cherry é retirada da tela
	this.owner = null;  // Implementador dos eventos (para repassar o contexto)
	
}

Cherry.prototype = {
	
	privateAverageTimeout:function() {
		var average = -1;
		
		while ( average < this.minTimeout ) {
			average = Math.floor(Math.random() * this.maxTimeout);
		}
		return average;
		
	},
	
	privateStartTimer:function() {
		
		var self = this;
		
		setTimeout(
  		    function() {
  		    	self.grid.tryPlaceBrickAt( new Brick('pass', self.brick.posX, self.brick.posY) );
  		    	self.privateDoOnHide();
  		    }, 
			this.privateAverageTimeout()
		);
		
	},
	
	privateDoOnShow:function() {
		if ( (this.onShow != null) && (this.owner != null) ) {
			this.onShow.call(this.owner);
		}
		
	},
	
	privateDoOnHide:function() {
		if ( (this.onHide != null) && (this.owner != null) ) {
			this.onHide.call(this.owner);
		}		
		
	},	
	
	addAt:function(posX, posY) {
		this.brick = new Brick("cherry", posX, posY);
		if (this.grid.getBrick(posX,posY).type === "pass") {
			this.grid.tryPlaceBrickAt(this.brick);
			this.privateDoOnShow();
			this.privateStartTimer();
		}else{
			alert('Não é possível adicionar uma Cherry na posição ' + posX + 'x' + posY);
		}
		
	},
	
	
	
	
}
