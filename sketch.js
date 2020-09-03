
var monkey , monkeyrunning;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,Ground,gameState,edges;

function preload(){
  
  
  monkeyrunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey = createSprite(50,380,10,10);
  monkey.addAnimation("monkey",monkeyrunning);
  monkey.scale = 0.1;
  monkey.debug = true;
  
  edges = createEdgeSprites();
  score = 0;
  
  gameState = "start";
  
  Ground = createSprite(200,380,600,2);
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background('white');
  if(gameState === "start"){if(keyDown("space") && monkey.y >= 348 ){
     monkey.velocityY = -15;
     }
  if(keyDown(RIGHT_ARROW)){
     monkey.velocityX = 2;
     }
  if(keyWentUp(RIGHT_ARROW)){
     monkey.velocityX = 0;
     }
  
  if(keyDown(LEFT_ARROW)){
     monkey.velocityX = -2;
     }
  if(keyWentUp(LEFT_ARROW)){
     monkey.velocityX = 0;
     }
  monkey.collide(edges);
  monkey.velocityY = monkey.velocityY + 0.8;
}
  text("score: " + score,350,10);
  if(FoodGroup.isTouching(monkey)){
    score = score + 1;
    FoodGroup.destroyEach();
     }
if(obstacleGroup.isTouching(monkey)){
   gameState = "end";
   }
  if(gameState === "end"){
     text("Press R to restart",200,200);
    text("Game Over",190,190);
    monkey.velocityY = 0;
    monkey.velocityX = 0;
    FoodGroup.setVelocityYEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    if(keyDown("R")){
       gameState = "start";
       reset();
       }
     }
monkey.collide(Ground);
 
  
  bananas();
  enemies();
  drawSprites();
  
}
function bananas(){
  var rand1 = Math.round(random(50,350));
  
  if(frameCount % 100 === 0){
    banana = createSprite(rand1,-450,10,10);
    banana.velocityY = 4;
    banana.scale = 0.1;
    banana.addImage("fruit",bananaImage);
    banana.lifetime =250; 
    FoodGroup.add(banana);
  } 
  
}
function enemies(){
  if(frameCount % 150 === 0 ){
    obstacle = createSprite(410,350,10,10);
    obstacle.velocityX = -4;
    obstacle.setCollider("rectangle",0,0,55,55);
    obstacle.addImage("enemy",obstaceImage);
    obstacle.scale = 0.17;  
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  
     }
  
}
function reset(){
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0;
}




