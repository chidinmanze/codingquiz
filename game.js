const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnsers = true; 
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [

    {
        question: "What are the three building blocks of web development?",
        choice1: "HTML, jQuery, Javascript",
        choice2: "HTML, Databases, Web Browsers",
        choice3: "HTML, CSS, Javascript",
        choice4: "HTML, Node.js, Python",
        answer: 3 
    },

    {
        question: "Which of the following is a self-closing tag?",
        choice1: "<img>",
        choice2: "<title>",
        choice3: "<p>",
        choice4: "<h1>",
        answer: 1 
    },

    {
        question: "Which of the following is a code editor?",
        choice1: "GitBash",
        choice2: "Mozilla Developer",
        choice3: "GitLab",
        choice4: "Visual Studio Code",
        answer: 4 
    },

    {
        question: "The difference between and HTML class and and HTML id is:",
        choice1: "There is no difference between HTML classes and ids.",
        choice2: "An HTML class relates to many items, but an HTML id relates to one item.",
        choice3: "HTML ids are larger than HTML classes.",
        choice4: "When adding CSS styling, HTML classes are preferred over HTML ids.",
        answer: 2 
    },

    {
        question: "Where does the link to the stylesheet go in an HTML file?",
        choice1: "In the body tag.",
        choice2: "In the title tag.",
        choice3: "In the head tag.",
        choice4: "In the script tag.",
        answer: 3 
    },

    {
        question: "In Javascript _________ are blocks of code used execute actions repeatedly:",
        choice1: "variables",
        choice2: "constants",
        choice3: "functions",
        choice4: "objects",
        answer: 3 
    },

    {
        question: "CSS stands for:",
        choice1: "Cascading Style Sheet",
        choice2: "Control Style Sheet",
        choice3: "Centered Style Set",
        choice4: "Creative Sheet Set",
        answer: 1 
    },

]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        // go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random()* availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    
    acceptingAnswers = true;


    choices.forEach(choice => {
        choice.addEventListener("click", e => {
            if(!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];

           const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
            
            if(classToApply === 'correct') {
                incrementScore(CORRECT_BONUS);
            }
            
            else(setTimeout('Decrement()', 10000));
        
            selectedChoice.parentElement.classList.add(classToApply);
            setTimeout( () => {getNewQuestion
            selectedChoice.parentElement.classList.remove(classToApply);
             getNewQuestion();
            }, 1000);
            
        });
    });

   incrementScore = num => {
       score +=num;
       scoreText.innerText = score;
   } 
};

startGame();

// Timer
        //set minutes 
        var mins = 5; 
  
        //calculate the seconds 
        var secs = mins * 60; 
  
        //countdown function is evoked when page is loaded 
        function countdown() { 
            setTimeout('Decrement()', 60); 
        } 
  
        //Decrement function decrement the value. 
        function Decrement() { 
            if (document.getElementById) { 
                minutes = document.getElementById("minutes"); 
                seconds = document.getElementById("seconds"); 
  
                //if less than a minute remaining 
                //Display only seconds value. 
                if (seconds < 59) { 
                    seconds.value = secs; 
                } 
  
                //Display both minutes and seconds 
                //getminutes and getseconds is used to 
                //get minutes and seconds 
                else { 
                    minutes.value = getminutes(); 
                    seconds.value = getseconds(); 
                } 
                //when less than a minute remaining 
                //colour of the minutes and seconds 
                //changes to red 
                if (mins < 1) { 
                    minutes.style.color = "red"; 
                    seconds.style.color = "red"; 
                } 
                //if seconds becomes zero, 
                //then page alert time up 
                if (mins < 0) { 
                    return window.location.assign("end.html");
                    minutes.value = 0; 
                    seconds.value = 0; 
                } 
                //if seconds > 0 then seconds is decremented 
                else { 
                    secs--; 
                    setTimeout('Decrement()', 1000); 
                } 
            } 
        } 
  
        function getminutes() { 
            //minutes is seconds divided by 60, rounded down 
            mins = Math.floor(secs / 60); 
            return mins; 
        } 
  
        function getseconds() { 
            //take minutes remaining (as seconds) away  
            //from total seconds remaining 
            return secs - Math.round(mins * 60); 
        } 
