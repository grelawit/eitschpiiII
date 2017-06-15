function Booster(xPos, yPos){
	this.seitenlaenge=50;
	this.shape=new createjs.Bitmap("Media/Pictures/Booster.png");
	this.shape.regX=this.shape.regY=this.seitenlaenge/2;
	this.shape.scaleX=this.shape.scaleY=0;
	this.shape.x = xPos;
	this.shape.y = yPos;
	this.hits=19;
	boosters.push(this);
	stage.addChildAt(this.shape, 1);
	
	
	
	
	this.popUp = function(){
		  createjs.Tween.get(this.shape).to({scaleX:1, scaleY:1}, 250);		  															
	} //popup over
	
		
	this.trittTest = function(){ //determines wether the king is over the enemy.
		if(this.shape.x-(this.seitenlaenge*0.5)<king.shape.x && this.shape.x+(this.seitenlaenge*0.5)>king.shape.x && this.shape.y-(this.seitenlaenge*0.5)<king.shape.y && this.shape.y+(this.seitenlaenge*0.5)>king.shape.y){return true;}
		}
		
	this.wasHit = function(){//makes the enemy randomly shake when beign hit.
				this.hits++;
				//this.leave();
			}
	
	this.leave = function(){ //is called by main, to make the enemy leave.
		createjs.Sound.play("boost");
		energyBarz.energyLeft+=0.1;
		stage.removeChild(this.shape);
		}
		
	
	this.popUp();//calling itself after object declaration
	
	
	
} //enemy1 over// JavaScript Document