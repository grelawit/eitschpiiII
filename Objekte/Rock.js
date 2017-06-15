function Rock(xPos, yPos){
	this.seitenlaenge=50;
	this.shape=new createjs.Bitmap("Media/Pictures/Stein.png");
	this.shape.regX=this.shape.regY=this.seitenlaenge/2;
	this.shape.scaleX=this.shape.scaleY=0;
	this.shape.x = xPos;
	this.shape.y = yPos;
	rocks.push(this);
	stage.addChildAt(this.shape, 1);
	
	
	
	
	this.popUp = function(){
		  createjs.Tween.get(this.shape).to({scaleX:1, scaleY:1}, 250);		  															
	} //popup over
		
	this.trittTest = function(){ //determines wether the king is over the enemy.
		if(this.shape.x-(this.seitenlaenge*0.5)<king.shape.x && this.shape.x+(this.seitenlaenge*0.5)>king.shape.x && this.shape.y-(this.seitenlaenge*0.5)<king.shape.y && this.shape.y+(this.seitenlaenge*0.5)>king.shape.y){return true;}
		}
		
			
	this.popUp();//calling itself after object declaration
	
	
	
} //rock over// JavaScript Document// JavaScript Document