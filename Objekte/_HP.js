//Diese zwei Variablen pack ich ins Objekt sobald die Unklarheiten weg sind.
//<>Those globals will be turned into attributes when the other problems are resolved.
var vertCredit=0;
var horCredit=0;

function King(){
	this.shape=new createjs.Bitmap("Media/Pictures/king1.png");
	this.shape.regX=129;
	this.shape.regY=150;
	this.shape.scaleX=this.shape.scaleY=0.25;
	this.shape.x=380;
	this.shape.y=400;
	
	stage.addChild(this.shape);
	this.rotationCredit=0;
	this.speed=0;
	this.overRock=1;
	

	this.makeStep = function(){
		if(this.shape.x<=0){createjs.Tween.get(this.shape).to({x:100}, 150); this.damaged();}
		if(this.shape.x>=800){createjs.Tween.get(this.shape).to({x:700}, 150); this.damaged();}
		if(this.shape.y<=0){createjs.Tween.get(this.shape).to({y:100}, 150); this.damaged();}
		if(this.shape.y>=480){createjs.Tween.get(this.shape).to({y:380}, 150); this.damaged();}
		//Die Idee: Bei Tastendruck erhöht sich der "rotationCredit", und wird gleichmässig über Ticks abgebaut. So gibt es kein "Springen".
		//<>To inhibit "jumping", rotation is built up in a variable and realized steadily on ticks.
		if(this.rotationCredit<0){
			this.shape.rotation--;
			this.rotationCredit++;
			if(this.shape.rotation==-360){this.shape.rotation=0;}
			}
		if(this.rotationCredit>0){
			this.shape.rotation++;
			this.rotationCredit--;
			if(this.shape.rotation==360){this.shape.rotation=0;}
			}
		//Abhängig von der Rotiertheit(!) des Königs bewegt ihn diese Funktion automatisch in die richtige Richtung.
		//<>This moves the king into the right direction depending on it's "rotatedness".
		if(this.speed!=0){
			this.shape.y-=Math.cos(this.shape.rotation*Math.PI/180)*this.speed*this.overRock;
			this.shape.x+=Math.sin(this.shape.rotation*Math.PI/180)*this.speed*this.overRock;
			}
		if(this.speed!=0){
		createjs.Sound.play("motor");
		}else{createjs.Sound.stop("motor");}
		
	}//end of function
	
	//Wenn Pfeiltasten gedrückt werden, kommt diese Funktion ins Spiel.
	//<>on mousedown in main.js
	var that=this; //Erklärung warum dies funktioniert: http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/
	this.bewegen=function(e){
		//<>First: if! this keeps hp from gaining up rotation and speed while on pause
		//if(paused!=true){ -->Doesn't work, as "p"is blocked as well. So it kinda does. Implementing the if into every case except for p.
		switch(e.keyCode) {
			case 37://linksPfeil	   <>left
				if(paused!=true){
				if(that.rotationCredit>-30){that.rotationCredit-=10;}
				}//end if
				break;
			case 38://obenPfeil    <>up
				if(paused!=true){
				that.speed+=.1;
				}
				break;
			case 39://rechtsPfeil	<>right
				if(paused!=true){
				if(that.rotationCredit<30){that.rotationCredit+=10;}
				}
				break;		
			case 40://untenPfeil		<>down
				if(paused!=true){
				that.speed=0;
				}
				break;
			case 80:
				pause();
		}//switch bewegen closed
	}//func bewegen closed
	
	
	this.damaged=function(){
		createjs.Sound.play("bump");
		energyBarz.energyLeft-=0.06;
		}
}//class HP closed