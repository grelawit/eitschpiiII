function enemy1(xPos, yPos){
	this.seitenlaenge=50;
	this.shape=new createjs.Bitmap("Media/Pictures/enemy1.png");
	this.shape.regX=this.shape.regY=this.seitenlaenge/2;
	this.shape.scaleX=this.shape.scaleY=0;
	this.shape.x = xPos;
	this.shape.y = yPos;
	this.hits = 0;
	enemies.push(this);
	stage.addChildAt(this.shape, 1);
	
	
	
	
	this.popUp = function(){
		  createjs.Tween.get(this.shape).to({scaleX:1, scaleY:1}, 250);		  															
	} //popup over
		
	this.trittTest = function(){ //determines wether the king is over the enemy.
		if(this.shape.x-(this.seitenlaenge*0.5)<king.shape.x && this.shape.x+(this.seitenlaenge*0.5)>king.shape.x && this.shape.y-(this.seitenlaenge*0.5)<king.shape.y && this.shape.y+(this.seitenlaenge*0.5)>king.shape.y){return true;}
		}
		
	this.wasHit = function(){//makes the enemy randomly shake when beign hit.
				createjs.Sound.play("hit");
				if(Math.random()<=0.5){
				this.shape.x+=Math.random()*5;
				this.shape.y+=Math.random()*5;
				this.hits++;
				} else {
				this.shape.x-=Math.random()*5;
				this.shape.y-=Math.random()*5;
				this.hits++;
				}
			}
	
	this.leave = function(){ //is called by main, to make the enemy leave.
		stage.removeChild(this.shape);
		}
		
	
	this.popUp();//calling itself after object declaration
	
	
	
} //enemy1 over