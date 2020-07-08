// setting up variables that have the values of questions
var questions = [{
    question: "1. What is the closest planet to the Sun?",
    // The array are set up as multiple choice
    choices: ["The Deathstar", "Jupiter", "Saturn", "Mercury"],
    // Answer relative to the index of the array
    correctAnswer: 3
}, {
    question: "2. What is the great red spot on jupiter?",
    choices: ["Grandma's House", "A Hawaiin Resort", "A storm", "A lake"],
    correctAnswer: 2
}, {
    question: "3. What is the sun mainly made of?",
    choices: ["Cheese", "Hydrogen and helium gas", "Molten lava", "Liquid Iron"],
    correctAnswer: 1
}, {
    question: "4. Which of these is the smallest planet?",
    choices: ["Mercury", "Jupiter", "Asteroid Belt", "Pluto"],
    correctAnswer: 0
}, {
    question: "5. What are comets mostly made of?",
    choices: ["Ice and dust", "Water", "Apple Juice", "Fur"],
    correctAnswer: 0
}, {
    question: "6. How many moons does Mars have?",
    choices: ["54", "2", "13", "12"],
    correctAnswer: 1
}, {
    question: "7. Earth is located in which galaxy?",
    choices: ["We are in a simulation", "Chocolate Milkshake Galaxy", "Andromeda Galaxy", "Milky way galaxy"],
    correctAnswer: 3
}, {
    question: "8. What is the name of the force holding us to the Earth?",
    choices: ["Fusion energy", "Taco tuesdays", "Gravity", "Chuck Norris"],
    correctAnswer: 2
}, {
    question: "9. What is the name of NASA’s most famous space telescope?",
    choices: ["Bubble", "Hubble", "Juggle", "Jungle"],
    correctAnswer: 1
}, {
    question: "10.  What planet is famous for the beautiful rings that surround it?",
    choices: ["Saturn", "Uranus", "Pluto", "Neptune"],
    correctAnswer: 0
}];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c = 180;
var t;
$(document).ready(function () {
    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(this).find(".preButton").attr('disabled', 'disabled');

    timedCount();

    $(this).find(".preButton").on("click", function () {

        if (!quizOver) {
            if (currentQuestion == 0) {
                return false;
            }

            if (currentQuestion == 1) {
                $(".preButton").attr('disabled', 'disabled');
            }

            currentQuestion--; // Since we have already displayed the first question on DOM ready
            if (currentQuestion < questions.length) {
                displayCurrentQuestion();

            }
        } else {
            if (viewingAns == 3) {
                return false;
            }
            currentQuestion = 0;
            viewingAns = 3;
            viewResults();
        }
    });


    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            var val = $("input[type='radio']:checked").val();

            if (val == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();
                if (val == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                iSelectedAnswer[currentQuestion] = val;

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion >= 1) {
                    $('.preButton').prop("disabled", false);
                }
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();

                } else {
                    displayScore();
                    $('#iTimeShow').html('Quiz Time Completed!');
                    $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
                    c = 185;
                    $(document).find(".preButton").text("View Answer");
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                    return false;

                }
            }

        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $('#iTimeShow').html('Time Remaining:');
            iSelectedAnswer = [];
            $(document).find(".nextButton").text("Next Question");
            $(document).find(".preButton").text("Previous Question");
            $(".preButton").attr('disabled', 'disabled');
            resetQuiz();
            viewingAns = 1;
            displayCurrentQuestion();
            hideScore();
        }
    });
});



function timedCount() {
    if (c == 185) {
        return false;
    }

    var hours = parseInt(c / 3600) % 24;
    var minutes = parseInt(c / 60) % 60;
    var seconds = c % 60;
    var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    $('#timer').html(result);

    if (c == 0) {
        displayScore();
        $('#iTimeShow').html('Quiz Time Completed!');
        $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
        c = 185;
        $(document).find(".preButton").text("View Answer");
        $(document).find(".nextButton").text("Play Again?");
        quizOver = true;
        return false;

    }

    /*if(c == 0 )
		{	
			if (!quizOver) 
			{
				var val = $("input[type='radio']:checked").val();
            	if (val == questions[currentQuestion].correctAnswer) 
				{
					correctAnswers++;
				}
				currentQuestion++; // Since we have already displayed the first question on DOM ready
				
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					c=15;
				} 
				else 
				{
					displayScore();
					$('#timer').html('');
					c=16;
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;
				}
			}
			else 
			{ // quiz is over and clicked the next button (which now displays 'Play Again?'
				quizOver = false;
				$(document).find(".nextButton").text("Next Question");
				resetQuiz();
				displayCurrentQuestion();
				hideScore();
			}		
		}	*/
    c = c - 1;
    t = setTimeout(function () {
        timedCount()
    }, 1000);
}


// This displays the current question AND the choices
function displayCurrentQuestion() {

    if (c == 185) {
        c = 180;
        timedCount();
    }
    //console.log("In display current Question");
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;


    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];

        if (iSelectedAnswer[currentQuestion] == i) {
            $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
        } else {
            $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
        }
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}

// This displays the current question AND the choices
function viewResults() {

    if (currentQuestion == 10) {
        currentQuestion = 0;
        return false;
    }
    if (viewingAns == 1) {
        return false;
    }

    hideScore();
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;


    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];

        if (iSelectedAnswer[currentQuestion] == i) {
            if (questions[currentQuestion].correctAnswer == i) {
                $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            } else {
                $('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            }
        } else {
            if (questions[currentQuestion].correctAnswer == i) {
                $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            } else {
                $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            }
        }
    }

    currentQuestion++;

    setTimeout(function () {
        viewResults();
    }, 3000);
}