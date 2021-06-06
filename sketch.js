var dog, happyDog, database;
var foodS, FoodStock;
var fedTime, lastFed;
var feed, addFood;
var foodObj;
var dogimg, happyDogImg;

function preload() {
  dogimg= loadImage("images/dog.png");
  happyDogImg= loadImage("images/Happy.png");
}

function setup(){
  createCanvas(1000,400);
  database= firebase.database();

  foodObj= new Food();

  FoodStock=database.ref('Food');
  FoodStock.on("value",readStock);

  dog= createSprite(800,200,150,150);
  dog.addImage(dogimg);
  dog.scale= 0.5;

feed= createButton("Feed The Dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood= createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);
}

function draw() {
   background("green");
   foodObj.display();

   fedTime= database.ref('FeedTime');
   fedTime.on("value",function(data) { 
      lastFed=data.val()
   })

   fill(255,255,254);
   textSize(15);
   if(lastFed>=12){
     text("Last Feed : "+ lastFed%12 + " PM", 350,30);
    }else if(lastFed==0){
      text("Last Feed : 12 AM",350,30);
    }else{
      text("Last Feed : "+ lastFed + " AM", 350,30);
    }

    drawSprites();

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImg);

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






