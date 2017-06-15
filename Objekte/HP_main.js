	//<>Comments for Anglophones are labeled with a diamond.
	var paused=false;
	enemies=[];
	boosters=[];
	rocks=[];
	var story1;
	var story2;
	var story3;
	var storySuccess;
	var storyFailure;
	var storyText = ["Boss, Boss! We did it!!", "Huh?!?", "We built that robotic lawn mower you wanted!","But... We kinda ran out of funding.", "We can't afford any Arduinos anymore...","Well...","Who drives that thing then?","<Both> Cheap labour force of low intelligence.. Hum...","How about:","YOU!"];
	var storyTextX=  [50,650,20,50,50,600,400,50,400,300];
	var storyTextY= [140,120,125,80,80,60,60,65,60,60];
	var storyProgress=0;
	var geschichte = new createjs.Text(storyText[storyProgress], "30px Arial", "#000000");
	geschichte.x=storyTextX[storyProgress];
	geschichte.y=storyTextY[storyProgress];
	var storyOver=false;
	
function storyGoOn(){
	storyProgress++;
	if(storyProgress==3){stage.removeChild(story1);}
	if(storyProgress==9){stage.removeChild(story2);geschichte.scaleX=geschichte.scaleY=3;document.getElementById("storyKnopf").innerHTML="Start";}
	if(storyProgress==10){stage.removeChild(story3);storyOver=true;postStory();document.getElementById("storyKnopf").style.display="none";}
	geschichte.x=storyTextX[storyProgress];
	geschichte.y=storyTextY[storyProgress];
	geschichte.text=storyText[storyProgress];
	}
function init(){	
	enemies=[];
	boosters=[];
	rocks=[];
	document.getElementById("Knopf").style.top="380px";
	document.getElementById("Knopf").style.left="310px";
	storyProgress=0;
	geschichte.scaleX=geschichte.scaleY=1;
	document.getElementById("storyKnopf").innerHTML="Proceed";
	document.getElementById("Knopf").style.display="none";
	//Initialisierung des Canvas als "Spielwiese", und Preloadtext.
	//<>Initialisation of Canvas and preloadtext.
	stage=new createjs.Stage("stage");
	preloadText= new createjs.Text("Loading", "40px Verdana", "black");
	preloadText.regX=preloadText.width/2;
	preloadText.regY=preloadText.height/2;
	preloadText.x=300;
	preloadText.y=240;
	stage.addChild(preloadText);
	document.getElementById("storyKnopf").style.display="initial";
	preload();
}

function preload(){
	//Hier wird die Ladefunktion ausgeführt
	//<>Loadfunction
	queue= new createjs.LoadQueue(true);
	queue.on("progress", progress, this);
	queue.on("complete", gameLoaded, this);
	queue.installPlugin(createjs.Sound);
	//add media to load in the array below; image as "blabla.png"; Sounds as: {id: "name", src:""}, {id: "name", src:""}
	  queue.loadManifest([
			"Media/Pictures/Hintergrund3.jpg",			
			"Media/Pictures/enemy1.png",
			"Media/Pictures/king1.png",
			"Media/Pictures/Booster.png",
			"Media/Pictures/story_dz_1.png",
			"Media/Pictures/story_dz_2.png",
			"Media/Pictures/story_dz_3.png",
			"Media/Pictures/story_dz_success.png",
			"Media/Pictures/story_dz_failure.png",
			{id:"hit",src:"Media/Sounds/hit.mp3", data:1},
			{id:"motor",src:"Media/Sounds/147242__qubodup__car-engine-loop.mp3",data:1},
			{id:"bump",src:"Media/Sounds/170141__timgormly__8-bit-bump.mp3",data:1},
			{id:"boost",src:"Media/Sounds/170169__timgormly__8-bit-powerup.mp3",data:1},
			{id:"brick",src:"Media/Sounds/232396__cejordi84__bricks.mp3",data:1}
	  ]);
	}
	
	//Während die loadqueue lädt kommt diese Funktion "progress" zum Zuge.
	//<>The progress function.
function progress(e){
	var percent = Math.round(e.progress*100);
	preloadText.text="Loading..." + percent + "%";
	stage.update();
	}
	
function gameLoaded(){
	stage.removeChild(preloadText);
	//<>onTick function creation. Game will be tickbased from now on.
	createjs.Ticker.setFPS(60);
	//Von nun an läuft das Spiel Tickgesteuert.
	createjs.Ticker.addEventListener("tick", onTick); 
	//Der Hintergrund. Wird später ein Video, weiss ich auch schon wie machen. 
	//<>Background, will later be turned into a video.
	var background=new createjs.Bitmap("Media/Pictures/Hintergrund3.jpg");
	stage.addChild(background);
	//Die steuerbare Hauptfigur wird (als globale Variable) erzeugt.
	//<>Initialisation of main character, as global variable.
	king = new King();
	energyBarz = new energyBar();
	enemyCounter=new enemyCount();
	stopwatch=new timer();
	Verteiler=new distributor();
	//... und mit Steuerfähigkeiten ausgestattet.
	//<>... made steerable.
	//window.onkeydown = king.bewegen;
	//Enemy-Array	
	paused=false; //New games are otherwise frozen instantly.
	storySuccess=new createjs.Bitmap("Media/Pictures/story_dz_success.png");
	storyFailure=new createjs.Bitmap("Media/Pictures/story_dz_failure.png");
	story3=new createjs.Bitmap("Media/Pictures/story_dz_3.png");
	story2=new createjs.Bitmap("Media/Pictures/story_dz_2.png");
	story1=new createjs.Bitmap("Media/Pictures/story_dz_1.png");
	stage.addChild(story3);
	stage.addChild(story2);
	stage.addChild(story1);
	stage.addChild(geschichte);
	
}

function postStory(){
	window.onkeydown = king.bewegen;
	}


//<<<<<-------------- The game starts here  ----------->>>>>>>>>
function onTick(e){
	//<>Your everyday pause-breaker.
	if(paused==false){playing();}  
	}

function playing(){
	if(storyOver==true){
	// Statt den Heartbeat mit listener im Objekt selber zu haben habe ich ihn hier hin gepackt. Ruft bei jedem Tick eine Methode auf und refresht den canvas.
	//<>I moved the ticker here, instead of having a seperate king-ticklistener. For structure and the later pauselogic to work.
	king.makeStep();
	energyBarz.update();    
	enemyCounter.update();
	stopwatch.update();
	Verteiler.doSomething();
	
	for(i=0;i<enemies.length;i++){ //this loops through the enemylist once per tick
		if(enemies[i].trittTest()){enemies[i].wasHit();} //if king is over an enemy, this makes it rumble
		if(enemies[i].hits>12){ //after the twelve hits (-----Add Functionality of different levels of hardness!!!----------)...
			enemies[i].leave(); //...the enemy dissappears from the stage...
			enemies.splice(i, 1); //...and from the enemy list.
			}	
	}
	for(i=0;i<boosters.length;i++){ //this loops through the enemylist once per tick
		if(boosters[i].trittTest()){boosters[i].wasHit();} //if king is over an enemy, this makes it rumble
		if(boosters[i].hits>19){ //after the nineteen hits (-----Add Functionality of different levels of hardness!!!----------)...
			boosters[i].leave(); //...the enemy dissappears from the stage...
			boosters.splice(i, 1); //...and from the enemy list.
			}	
	}
	for(i=0;i<rocks.length;i++){ //this loops through the enemylist once per tick
		if(rocks[i].trittTest()){king.overRock=0.3;createjs.Sound.play("brick");energyBarz.energyLeft-=0.0002;break;}else{king.overRock=1;} //if king is over an enemy, this makes it rumble
	}
	}
	stage.update();
	}

