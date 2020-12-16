var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var injury=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var stroke;
var gameover;

function preload(){ 
  monkey_running =                         loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

 bananaImage = loadImage("banana.png");
 obstaceImage = loadImage("obstacle.png");
 }

function setup() {
    createCanvas(600, 400)
    ground = createSprite(200, 380, 1900, 40);
    monkey = createSprite(55, 330, 20, 20)

    monkey.addAnimation("mo", monkey_running);
    monkey.scale = 0.1;
    ig = createSprite(200, 390, 1900, 20)
    ig.visible = false;
    fruitGroup = new Group();
    obstacleGroup= new Group();
    obstacleGroup.setLifetimeEach=(-1)
    fruitGroup.setLifetimeEach=(-1)
}

function draw() {
    background("white")
    monkey.collide(ig)
    if(ground.x<0){
        ground.x= ground.width/2
    }
    
    monkey.velocityY = monkey.velocityY + 15
  
// gamestate to play
    if(gameState===PLAY){
    if (keyDown("space") && monkey.y >=150) {
      monkey.velocityY = -12
    }
    
      switch(score){
    case 10: monkey.scale= 0.13
      break;
      case 20: monkey. scale= 0.15;
      break;
      case 30: monkey.scale= 0.19;
      break;
      case 40: monkey. scale= 0.21;
      break;
      default: break;
  }
      
      if(monkey.isTouching(fruitGroup)){
      score=score+2
      fruitGroup.destroyEach();
    }
      
    banana();
    obstacle();

   if(monkey.isTouching(obstacleGroup)){
    injury=injury+1
    obstacleGroup. destroyEach();
     monkey.scale=0.1
     }    
  }  
   if (injury===2){
        gameState=END   
     }
    
  // gamestate to end
    if(gameState===END){
      fruitGroup.setVelocityXEach(0)
       fruitGroup.destroyEach();
      obstacleGroup.destroyEach();
       monkey.velocityY=0
      
      obstacleGroup.setVelocityXEach(0);
      stroke("black");
      textSize(20);
      fill("black");
      text("Gameover",200,200);
      score=0      
    }
    
   stroke("black");
    textSize(20);
    fill("black")
    text("Survival Time:" + score, 300, 50);

//Displaying sprites
    drawSprites();
 }

function banana() {
    if (frameCount % 80 == 0) {
      fruit = createSprite(600, 200, 20, 20);
      fruit.velocityX = -(10+(score/10));
      fruit.y = Math.round(random(120, 360));
      fruit.addImage(bananaImage);
      fruit.scale = 0.2
      fruitGroup.add(fruit);
      fruit.lifetime = 60;
      fruit.velocityX=-10;
    }
    monkey.debug = false
    monkey.setCollider("circle",0,0,200)
  }

function obstacle(){
  if(frameCount%300==0){
    ob=createSprite(600,360,20,20);
    var rand= Math.round(random(1,6));
    ob.velocityX=-(8+(score/10))
    ob.lifetime=60;
    ob.addImage(obstaceImage);
    ob.scale=0.2;
    obstacleGroup.add(ob);
    ob.debug=false
    ob.velocityX=-10;
   }    
} 