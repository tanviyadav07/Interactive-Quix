const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "HotMail", correct: false},
            {text: "HyperText Markup Language", correct: true},
            {text: "How to Make Lasagna", correct: false},
            {text: "All of the mentioned above", correct: false},
        ]
    },
    {
        question: "How many tags are in a regular HTML element?",
        answers: [
            {text: "1", correct: false},
            {text: "3", correct: false},
            {text: "2", correct: true},
            {text: "0", correct: false},
        ]
    },
    {
        question: "What is CSS?",
        answers: [
            {text: "CSS is a style sheet language", correct: false},
            {text: "CSS is designed to separate the presentation and content, including layout, colors, and fonts", correct: false},
            {text: "CSS is the language used to style the HTML documents", correct: false},
            {text: "All of the mentioned", correct: true},
        ]
    },
    {
        question: "Which of the following has introduced text, list, box, margin, border, color, and background properties?",
        answers: [
            {text: "HTML", correct: false},
            {text: "PHP", correct: false},
            {text: "CSS", correct: true},
            {text: "Ajax", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();