var dog,sadDog,happyDog;
var feedButton , addButton ; 
var foodObj ;
var foodS , foodStock;
var fedTime , lastFed,database;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database()
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  

  feedButton = createButton("Feed the dog");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog);

  addButton = createButton("Add food");
  addButton.position(800,95);
  addButton.mousePressed(addFoods);



}

function draw() {
  background(46,139,87);
  
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function (data){
    lastFed = data.val();
  })
  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed:" + lastFed %12 + "PM" ,350, 30);
  }
  else if(lastFed == 0){
    text("Last Feed: 12AM",350 , 30)
  }
  else{
    text("Last Feed: "+ lastFed + "AM" , 350,30)
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}