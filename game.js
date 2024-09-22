let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;


/*
document.addEventListener("keydown", function() {
  if(!started) {
    document.querySelector("#level-title").innerHTML = "level" + level
    nextSequence();
    started = true;
  }
})
*/
$(document).keydown(function() {
  
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } 
  
  else {
    console.log("Wrong");
    
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    playSound("wrong")
    $("#level-title").text("Game Over, Press Any Key To Restart");

    startOver();
  }
}



function nextSequence() {
  userClickedPattern = [];
  
  level++;
  $("#level-title").text("level " + level);

  let randomNumber = Math.floor(Math.random()*3 + 1);
  let randomChosenColour = buttonColours[randomNumber];
  
  gamePattern.push(randomChosenColour);
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name) {
  const audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}