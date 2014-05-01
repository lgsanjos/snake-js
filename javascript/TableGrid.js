function TableGrid( htmlPlace, sizeX, sizeY) {
	
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.htmlPlace = htmlPlace;
	this.table;
	this.onHitTheWall = null;
	this.onHitTheCherry = null;
	// constructor ?
	window.document.getElementById(htmlPlace).innerHTML = "";
}


TableGrid.prototype = {
		
	privateCreateMatrixGrid:function () {

		var _firstCol = new Array(this.sizeX); // profundidade	
		for ( var i = 0; i < this.sizeX; i++){
			_firstCol[i] = new Array(this.sizeY);
			for ( var j = 0; j < this.sizeY; j++){
				
				_firstCol[i][j] = new Brick("pass", i, j);
			}	
		}
		
		this.table = _firstCol;
	},
	
	privateDraw:function() {
		var mapa = "";
		
		for ( var i = 0; i < this.sizeX; i++){
			for ( var j = 0; j < this.sizeY; j++){
				mapa += this.privateDrawBrick(this.table[i] [j]);
			}
			mapa += this.privateDrawBrick( new Brick("linebreak", i, j) );
		}	

		window.document.getElementById(this.htmlPlace).innerHTML += mapa;
	},
	
	
	privateCreateWall:function () {
		this.privateCreateMatrixGrid();
		
		for ( var i = 0; i < this.sizeX; i++){
			for ( var j = 0; j < this.sizeY ; j++){
				if ( ( i == 0 ) || ( i == this.sizeX -1 ) || ( j == 0 ) || ( j == this.sizeY - 1) ) {
					this.table[i][j] = new Brick("wall", i, j);	  
				}else{
					this.table[i][j] = new Brick("pass", i, j);
				}
			}
		}
				
	},
			
	privateDrawBrick: function(brick) {
		// Apenas para ficar claro o que pode ser desenhado por essa funcao
		var div = "";
		
		switch (brick.type) {
			case "linebreak": div = '<div style="clear:both;"></div>'; break;
			case "wall":   ;
			case "pass":   ;
			case "cherry": ;
			case "snake":  ;
			default:  div = '<div class="block ' + brick.type + '" id="' +  brick.posX + '_' + brick.posY  + '"></div>';	
		}
		return div;
	},
	
	privatePlaceBrickAt: function(brick) {

		var changeBrick = window.document.getElementById(brick.posX + '_' + brick.posY);
		
		if ( (changeBrick !== undefined) || (changeBrick == null) ) {		
			changeBrick.setAttribute("class", "block " + brick.type);
			this.table[brick.posX][brick.posY] = brick;
		}else{
			alert('Bloco não encontrato: ' + brick.posX + 'x' + brick.posY);
		}
	},
	
	// Public
	
	randomX:function() {
		
		var val = 0;
		while (val <= 1) {
			val = Math.floor(Math.random() * this.sizeX -3);
		}
		return val;
	},
	
	randomY:function() {
		var val = 0;
		while (val <= 1) {
			val = Math.floor(Math.random() * this.sizeY - 3);
		}
		return val;
	},	
	
	tryPlaceBrickAt: function(brick) {
		
		var _actualBrick = this.getBrick(brick.posX, brick.posY);
		
		if ( (_actualBrick === null) || (_actualBrick === undefined) ) {
			 return false;
		}
		
		// *** Regras de negocio ***
		
		// 1 - Snake tenta andar sobre o muro, ou ela mesma
		if ( ((_actualBrick.type === "wall") || (_actualBrick.type === "snake")) && (brick.type === "snake") ) {
			if (this.onHitTheWall !== null) {
				this.privatePlaceBrickAt( new Brick("dead", brick.posX, brick.posY));				
				this.onHitTheWall();
				return false;
			}			
		}
		
		// 2 - Snake tenta andar sobre cherry	
		if ( (_actualBrick.type === "cherry") && (brick.type === "snake") ) {
			if (this.onHitTheCherry != null) {
				this.onHitTheCherry();
			}
		}
		
		// 3 - Aplicar pass sobre snake ou cherry
		if ( (_actualBrick.type === "cherry") && (brick.type === "pass") ) {
			// Criado apenas para explicitar a regra
		}	
		
		// ***
		this.privatePlaceBrickAt(brick);
	},
	
	getBrick:function(posX, posY) {
		if ((posX < 0) || (posX > this.sizeX) ) return null;
		if ((posY < 0) || (posY > this.sizeY) ) return null;
		
		return this.table[posX][posY];	
	},
	
	initialize:function() {
		this.privateCreateMatrixGrid();
		this.privateCreateWall();
		this.privateDraw();
	},	
	
}
