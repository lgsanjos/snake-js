function Timer() {
	this.enabled = false;
	this.enabled = false;
	this.method;
	this.miliseconds;
	this.contextCall;
	
}

Timer.prototype = {
	
	
	privateCheckTime:function(){

		function executa(obj){
			setTimeout( function() { 
					executa.call(obj, obj);
					} , this.miliseconds);
					
			try{
				if ( this.enabled ){
					this.method.call(this.contextCall);
				}	
			}catch(e){
				alert(e);
			}	
		}
		
		if (this.enabled) {
			executa.call(this, this)
		}
				
	},
	
	start:function(pMethod, pContextCall, pMiliseconds){
		
		this.enabled = true;
		this.method = pMethod;
		this.miliseconds = pMiliseconds;
		this.contextCall = pContextCall;
		this.privateCheckTime();
		
	},
	
	stop:function(){
		
		this.enabled = false;
		
	}
	
	
	
}
