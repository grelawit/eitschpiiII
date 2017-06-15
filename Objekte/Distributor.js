function distributor(){
	this.doSomething = function(){
		var Zahl=Math.floor(Math.random()*1000);
		if(Zahl==1||Zahl==2||Zahl==3||Zahl==4){
			console.log("Blume");
			var f= new enemy1(Math.floor((Math.random() * 780)+10), Math.floor((Math.random() * 460)+10));
				eC.text++;
			}
		if(Zahl==200){
			console.log("Stein");
			var ro=new Rock(Math.floor((Math.random() * 780)+10), Math.floor((Math.random() * 460)+10));
			}
		if(Zahl==800||Zahl==799){
			console.log("Powerup");
			var bq=new Booster(Math.floor((Math.random() * 780)+10), Math.floor((Math.random() * 460)+10));
			}
		}
	
	}