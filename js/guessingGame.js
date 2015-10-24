function generateNumber() {
  var num = 0;
  while (num === 0) {
    num = Math.floor(Math.random()*101);
  }
  return num;
}

function checkForValidInput() {
  var enteredData = $("#guess-field").val();

  // Check if the user's entered anything at all
  if (enteredData === "") {
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
  } else if (ifGuessedAlready(number)) {
    alert("You've already tried guessing " + number + "!");
    return false; 
  } else {
    usersGuess = $("#guess-field").val();
    return true;
  }
}

function ifGuessedAlready(numToCheck) {
  var guessedAlready = false;
  for (var x = 0; x < previousGuesses.length; x++) {
    if (numToCheck == previousGuesses[x]) { 
      guessedAlready = true;
    } 
  }
  return guessedAlready;
}

function saveGuess() {
  previousGuesses.push(usersGuess);
}

function closenessToNumInJar(num) {
  return Math.abs((numInJar - num));
}

function compareNumbers() {
  $('#fail').fadeOut(200);
  numberOfGuessesRemaining -= 1;
  if (numberOfGuessesRemaining <= 0) {
    gameOver();
    return;
  }

  if (usersGuess == numInJar) {
    $('.number-of-marbles').text(numInJar);
    $('#guess-form').fadeOut(400);
    $('#fail').fadeOut(400);
    $('#hint').fadeOut(400);
    $('#win').fadeIn(200);
  } else if (previousGuesses.length <= 1) { 
    // If no guesses have been made.. 
    if (usersGuess > numInJar) {
      $('#guess-status').text("guessing too high");
      $('#number-of-guesses').text(numberOfGuessesRemaining);
      $('#fail').fadeIn(200);
    } else if (usersGuess < numInJar) {
      $('#guess-status').text("guessing too low");
      $('#number-of-guesses').text(numberOfGuessesRemaining);
      $('#fail').fadeIn(200);
    }
  } else {
    var secondMostRecentGuess = previousGuesses[previousGuesses.length - 2];
    if (closenessToNumInJar(usersGuess) <= closenessToNumInJar(secondMostRecentGuess)) {
      if (usersGuess > numInJar) {
        $('#guess-status').text("guessing too high, but you're getting warmer");
      } else {
        $('#guess-status').text("guessing too low, but you're getting warmer");
      }
      $('#number-of-guesses').text(numberOfGuessesRemaining);
      $('#fail').fadeIn(200);
    } else if (closenessToNumInJar(usersGuess) > closenessToNumInJar(secondMostRecentGuess)) {
      if (usersGuess < numInJar) {
        $('#guess-status').text("guessing too low, and you're getting colder");
      } else {
        $('#guess-status').text("guessing too high, and you're getting colder");
      }
      $('#number-of-guesses').text(numberOfGuessesRemaining);
      $('#fail').fadeIn(200);
    }
  }
}

function gameOver() {
  $('.number-of-marbles').text(numInJar);
  $('#guess-form').fadeOut(400);
  $('#lose').css("display", "block");
}

function evaluateInput() {
  if (checkForValidInput()) { 
    saveGuess();
    compareNumbers();
  } else {
    $("#guess-field").val("");
  }
}

var previousGuesses = [];
var numInJar = generateNumber();
var usersGuess = 0;
var numberOfGuessesRemaining = 8;

$("#guess-field").keydown(function(e) {
  if (e.which == 13) {
    evaluateInput();
    e.stopPropagation();
    e.preventDefault();
  }
});

$("#guess-button").click(function(e) {
  e.preventDefault();
  evaluateInput();
});

// If 'Play again?' button is clicked
$(".play-again-button").click(function() {
  location.reload();
  $("#guess-field").val("");
});

// If 'I give up!' button is clicked
$(".give-up-button").click(function() {
  $('.number-of-marbles').text(numInJar);
  $('#guess-form').fadeOut(400);
  $('#fail').fadeOut(400);
  $('#hint').fadeOut(400);
  $('#lose').fadeIn(200);
});