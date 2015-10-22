function generateNumber() {
  var num = 0;
  while (num == 0) {
    num = Math.floor(Math.random()*101);
  }
  return num;
}

function checkForValidInput() {
  var enteredData = $("#guess-field").val();

  // Check if the user's entered anything at all
  if (enteredData == "") {
    alert("Please enter a value from 1 to 100!");
  }

  // Convert the entered data to an integer
  var number = parseInt(enteredData);
  if (isNaN(number)) { 
    // If the integer can't be converted...
    alert("Hey! That's not a number!");
    return false;
  } else if (number > 100 || number < 1) {
    // If the integer is too big or too small... 
    alert("That's outside of the range of 1 to 100. Try again!");
    return false;
  } else {
    usersGuess = $("#guess-field").val();
    return true;
  }
}

function compareNumbers() {
  $('#fail').fadeOut(200);
  numberOfGuessesRemaining -= 1;
  if (numberOfGuessesRemaining < 0) {
    gameOver();
    return;
  }

  if (usersGuess == numInJar) {
    $('.number-of-marbles').text(numInJar);
    $('#fail').fadeOut(200);
    $('#win').fadeIn(200);
  } else if (usersGuess > numInJar) {
    $('#guess-status').text("guessing too high");
    $('#number-of-guesses').text(numberOfGuessesRemaining);
    $('#fail').fadeIn(200);
  } else if (usersGuess < numInJar) {
    $('#guess-status').text("guessing too low");
    $('#number-of-guesses').text(numberOfGuessesRemaining);
    $('#fail').fadeIn(200);
  }
}

function gameOver() {
  $('.number-of-marbles').text(numInJar);
  $('#guess-form').fadeOut(400);
  $('#lose').css("display", "block");
}

var numInJar = generateNumber();
var usersGuess = 0;
var numberOfGuessesRemaining = 8;
console.log(numInJar);

$("#guess-field").keydown(function(e) {
  if (e.which == 13) {
    if (checkForValidInput()) { 
      compareNumbers();
    } else {
      $("#guess-field").val("");
    }
    e.stopPropagation();
    e.preventDefault();
  };
});

$("#guess-button").click(function(e) {
  e.preventDefault();
  if (checkForValidInput()) { compareNumbers() }
});

$(".play-again-button").click(function() {
  location.reload();
  $("#guess-field").val("");
});