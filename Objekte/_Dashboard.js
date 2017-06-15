// Dashboard
function energyBar(){
	this.energyLeft = 1;
	this.shape = new createjs.Shape();
	this.shape.graphics.beginFill("black").drawRect(0, 0, 600, 10);
	this.shape.regX=0;
	this.shape.regY=5;
	this.shape.x=20;
	this.shape.y=450;
	stage.addChild(this.shape);
	
	this.update = function(){
		this.energyLeft-= 0.00035;
		this.shape.scaleX = this.energyLeft;
		if(this.energyLeft<=0){
			stage.addChild(storyFailure);
			storyOver=false;
			document.getElementById("Knopf").innerHTML="Play again";
			document.getElementById("Knopf").style.display="inline";
			}
		}
	
	}
	
function pause(){
	if(paused==false){ //Wenn das Spiel nicht pausiert war
		paused=true;	//Pausieren
		    text = new createjs.Text("Paused", "100px Arial", "#ff7700");
 			text.x = 240;
			text.y = 100;
		stage.addChild(text);
		stage.update();
	} else {				//Ansonsten (Spiel im PAuse Modus)
		paused=false; //Weiterlaufen lassen
		stage.removeChild(text);
	}
}

function enemyCount(){
	eC = new createjs.Text(enemies.length, "60px Arial", "#FFF");
 			eC.x = 700;
			eC.y = 40;
	stage.addChild(eC);
	this.update=function(){
		eC.text=enemies.length;
		if(enemies.length>=10){
			stage.addChild(storyFailure);
			storyOver=false;
			document.getElementById("Knopf").innerHTML="Play again";
			document.getElementById("Knopf").style.display="inline";
			}//if
		if(enemies.length>=8){
			eC.color="#F00";
			}//if
			else {eC.color="#FFF";}
		}//update
	}//enCo
	
function timer(){
	this.ticks=3600;
	this.showTime= new createjs.Text(this.ticks, "50px Arial", "#FFF");
	this.sign=new createjs.Bitmap("Media/Pictures/watch.png");
	this.sign.scaleX=this.sign.scaleY=0.3;
	this.showTime.x=40;
	this.sign.x=25;
	this.showTime.y=40;
	this.sign.y=48;
	stage.addChild(this.showTime);
	stage.addChild(this.sign);
	this.update=function(){
		this.ticks--;
		this.showTime.text="  "+ Math.round(this.ticks/60);
		if(this.ticks<=0){
			stage.addChild(storySuccess);
			storyOver=false;
			document.getElementById("Knopf").style.top="230px";
			document.getElementById("Knopf").style.left="410px";
			document.getElementById("Knopf").innerHTML="Play again";
			document.getElementById("Knopf").style.display="inline";
			}
		}
	
	}