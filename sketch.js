
var trex ,trex_running, trex_collided
var edges
var ground ,ground_moving, invisible_ground
var cloud_image, cloud
var cloud_group
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacle,obstacle_group
var gameOver, restart
var gameOverImage, restart_image
var checkpoint, die, jump
var score = 0
var gamestate = 1

function preload()
{
  trex_running= loadAnimation("trex1.png","trex3.png","trex4.png")
  ground_moving= loadImage("ground2.png")
  cloud_image = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  trex_collided = loadAnimation("trex_collided.png")
  gameOverImage = loadImage("gameOver.png")
  restart_image = loadImage("restart.png")
  checkpoint = loadSound("checkpoint.mp3")
  die = loadSound("die.mp3")
  jump = loadSound("jump.mp3")
}

function setup()
{
  createCanvas(600,200)

  cloud_group = createGroup()
  obstacle_group = createGroup()

  //create a trex sprite
  trex = createSprite(50,180)
  trex.addAnimation("trexRunning",trex_running)
  trex.addAnimation("trexDead",trex_collided)
  trex.scale=0.5
  //trex.debug = true
  trex.setCollider("rectangle",0,0,100,trex.height)
    
  ground = createSprite(300,180)
  ground.addImage (ground_moving)

  invisible_ground = createSprite(50,187,50,5)
  invisible_ground.visible = false

  gameOver = createSprite(300,75)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.5
  gameOver.visible = false

  restart = createSprite(300,125)
  restart.addImage(restart_image)
  restart.scale = 0.5
  restart.visible = false

  edges = createEdgeSprites()
}

function draw()
{
  //console.log(trex.y)
  
  background("lightblue")
  drawSprites()
  //console.log(frameCount)

  if (gamestate == 1)
  {
    makeClouds()
    makeObstacles()

    score += Math.round(getFrameRate()/60)

    if (ground.x<0)
   {
    ground.x = ground.width/2
   }
   if(keyDown("space") && trex.y>160)
   {
     trex.velocityY = -10
     jump.play()
   }
   trex.velocityY += 0.5

   if (trex.isTouching(obstacle_group))
   {
     trex.changeAnimation ("trexDead",trex_collided)
     gamestate = 0
     die.play()
     //jump.play()
     //trex.velocityY = -10
   }
   ground.velocityX = -(4 + score/100)
   if (score%100 == 0 && score != 0)
   {
     checkpoint.play()
   }
  }
  else
  {
    ground.velocityX = 0
    cloud_group.setVelocityXEach(0)
    obstacle_group.setVelocityXEach(0)
    trex.setVelocity(0,0)
    cloud_group.setLifetimeEach(-1)
    obstacle_group.setLifetimeEach(-1)
    gameOver.visible = true
    restart.visible = true

    if (mousePressedOver(restart))
    {
      reset()
    }
  }

  fill("black")
  text("SCORE : " + score,500,20)

  trex.collide(invisible_ground)
}

function reset ()
{
  gamestate = 1
  score = 0
  obstacle_group.destroyEach()
  cloud_group.destroyEach()
  gameOver.visible = false
  restart.visible = false
  trex.changeAnimation("trexRunning",trex_running)
}
function makeClouds()
{
  if(frameCount%60 == 0)
  {
    cloud = createSprite(600,random(10,100))
    cloud.addImage(cloud_image)
    cloud.velocityX = - (5 + score/100)
    cloud.scale = random(0.4,1)
    cloud_group.add(cloud)
    cloud.depth = trex.depth
    trex.depth +=1
    cloud.lifetime = 120
  }
}
function makeObstacles ()
{
  if(frameCount%60 == 0)
  {
    obstacle = createSprite(600,165)
    obstacle.velocityX = - (5 + score/100)
    obstacle.scale = 0.5
    obstacle_group.add(obstacle)
    obstacle.lifetime = 120
    //obstacle.debug = true

    r = Math.round(random(1,6))
    switch (r)
    {
      case 1 : obstacle.addImage(obstacle1)
      break
      case 2 : obstacle.addImage(obstacle2)
      break
      case 3 : obstacle.addImage(obstacle3)
      break
      case 4 : obstacle.addImage(obstacle4)
      break
      case 5 : obstacle.addImage(obstacle5)
      break
      case 6 : obstacle.addImage(obstacle6)
      break
    }
  }
}