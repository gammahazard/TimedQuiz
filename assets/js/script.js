/*create questions*/
var questions = [
    {
      title: "Which is a search engine?",
      choices: ["Google", "Bing", "Yahoo", "All of the above"],
      answer: "All of the above"
    },
    {
      title: "Which is not a property of attribute Behaviour of Marquee tag?",
      choices: ["alternate", "blur", "scroll", "slide"],
      answer: "blur"
    },
    {
      title: "Inside which HTML element do we put the JavaScript?",
      choices: ["javascript", "script", "js", "scripting"],
      answer: "script"
    },
    {
      title: "Which one of the following defines properties for the map?",
      choices: ["mapOptions", "zoom", "center", "mapTypeId"],
      answer: "mapOptions"
    },
    {
      title: "Which navigator object property returns a geolocation object?",
      choices: ["appVersion", "geolocation", " language", "appCodeName"],
      answer: "geolocation"
    },
    {
      title: "What are shared on the Internet and are called as Web pages?",
      choices: ["Programs", "Cables", "Hypertext documents", " None"],
      answer: "Hypertext documents"
    },
    {
      title: "What is the name of the location address of the hypertext documents?",
      choices: ["Uniform Resource Locator", "Web server", "File", " Web address"],
      answer: "Uniform Resource Locator"
    },
    {
      title: "Javascript and Java are the same",
      choices: ["true", "false"],
      answer: "false"
    },
  ];
  /*list variables*/
  var quizContainer = document.getElementById("quizcont");
  var startBtn = document.getElementById("start");
  var checkResBtn = document.getElementById("checkResBtn");
  var questionDiv = document.getElementById("questionDiv");
  var resultsDiv = document.getElementById("resultsDiv");
  var inputscorefield = document.getElementById("inputscore")
  var questionIndex = 0;
  var question = document.getElementById("question");
  var timeCounter = document.getElementById("timeCounter");
  var timer;
  var time = 180
  var correctAnswer = "";
  var restartbtn = document.getElementById("Restart");
 var timeleft = document.getElementById("secondsleft") ; 
 var submitbtn = document.getElementById("submitbtn")  ;
 var hiscore = document.getElementById("highscores");
 
// 70 second left warning function
 function ShowDiv() {
     if (time<=70)
    
     timeleft.style.display = "block"
 }
 function RemoveDiv() {
     if (time<=60)
     timeleft.style.display = "none"
 }
 function outoftime() {
  clearInterval(timer);
  alert("You are out of time!")
  endQuiz()
}
  //display
  questionDiv.style.display = "none";
  CheckResBtn.style.display = "none";
  resultsDiv.style.display = "none";
  timeCounter.style.display = "none";
  restartbtn.style.display = "none";
  timeleft.style.display = "none";
  inputscore.style.display = "none";
  
  /*function to start quiz: make startbutton disappear and questions and time counter to begin at same time*/
  function startQuiz() {
    /*make start button disappear*/
    startBtn.style.display = "none";
    /*make question appear*/
    questionDiv.style.display = "block";
    resultsDiv.style.display = "none";
    /*make timer appear*/
    timeCounter.style.display = "block";
    restartbtn.style.display = "none"
 
  
    /*timer to increment each second*/
  
    timer = setInterval(function() {
        time -= 1
        timeCounter.innerText = time;
        if (time <= 70)
      ShowDiv()
      if (time <= 68)
      RemoveDiv()
      if (time <= 0)
      outoftime()
    // shows 70 second warning for 2 seconds

   
    }, 1000);
  
    loadNextQuestion();
  }

 // next question 
  function loadNextQuestion() {
    var currentQuestion = questions[questionIndex];
    correctAnswer = currentQuestion.answer;
    question.innerHTML = currentQuestion.title;
  
   // looping question choices ..
    for (var i = 0; i < currentQuestion.choices.length; i++) {
      var currentChoice = currentQuestion.choices[i];
      var choiceBtn = document.getElementById("choice" + i);
      choiceBtn.value = currentChoice;
      choiceBtn.innerHTML = currentChoice;
    }
  }
  //check if answer is correct
  function checkAnswer(btnValue) {
    /*check to see for correct question*/
    console.log(btnValue);
    console.log(correctAnswer);
    if (btnValue == correctAnswer) {
//right answer yay
      alert("Correct!");
      /*userAnswers[questionIndex] = 1;*/
    } else {
  // oh no wrong  answer (-10seconds)
      alert("Wrong -10seconds");
      // minus 10 sec from timer
      time -= 10;
      return;
    }
  
    /*create if else statement to ensure quiz ends after final question to resolve issue I was having.*/
    questionIndex++;
    if (questionIndex < questions.length) {
      console.log("Next question");
      loadNextQuestion();
    } else {
      console.log("End of Quiz");
      endQuiz();
    }
  

  

  }
// i cannot for the life of me figure out how to store store multiple values in localstorage

function addscore(){
localStorage.setItem("score", JSON.stringify(time))
}

// end quiz function, clear timer, add score to localstorage, display user score as time left
  function endQuiz() {

    clearInterval(timer);
    questionDiv.style.display = "none";
    inputscore.style.display = "block";
    resultsDiv.style.display = "block";
    resultsDiv.innerHTML = "User score is " + time;
    restartbtn.style.display = "block";
    submitbtn.addEventListener('click', addscore);
    restartbtn.addEventListener('click', startQuiz);

    
   
    

  }

  function showscores() {
    var x = localStorage.getItem(JSON.parse("score"));
    hiscore.addEventListener('click', showscores)
    document.getElementById("scoretable").innerHTML = x;
    
  }



//This method is used to retrieve a value/string from a specific location.
//The index can be passed into the key() function as a parameter.
//var answer = localStorage.key(1);

