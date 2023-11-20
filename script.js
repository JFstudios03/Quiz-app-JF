const questions = [
    {
        question: "What is the capital city of Nigeria?",
        answers: [
            {text: "Abuja", correct: true},
            {text: "Lagos", correct: false},
            {text: "Kano", correct: false},
            {text: "Ibadan", correct: false},
        ]
    },
    {
        question: "In what year did Nigeria gain independence from British rule?",
        answers: [
            {text: "1950", correct: false},
            {text: "1960", correct: true},
            {text: "1970", correct: false},
            {text: "1980", correct: false},
        ]
    },
    {
        question: "Which ethnic group is known for the colorful traditional attire called 'Aso Ebi'?",
        answers: [
            {text: "Igbo", correct: false},
            {text: "Hausa", correct: false},
            {text: "Efik", correct: false},
            {text: "Yoruba", correct: true},
        ]
    },
    {
        question: "Who is Nigeria's Nobel laureate in Literature, known for works like 'Things Fall Apart'?",
        answers: [
            {text: "Chinua Achebe", correct: true},
            {text: "Wole Soyinka", correct: false},
            {text: "Chimamanda Ngozi Adichie", correct: false},
            {text: "Buchi Emecheta", correct: false},
        ]
    },
    {
        question: "What is the official currency of Nigeria?",
        answers: [
            {text: "Cedi", correct: false},
            {text: "Shilling", correct: false},
            {text: "Naira", correct: true},
            {text: "Rand", correct: false},
        ]
    },
    {
        question: "Nigeria has a strong presence in football. What is the nickname of the Nigerian national football team?",
        answers: [
            {text: "Lions", correct: false},
            {text: "Eagles", correct: true},
            {text: "Falcons", correct: false},
            {text: "TIgers", correct: false},
        ]
    },
    {
        question: "Which natural landmark is located in Nigeria and is known for its distinctive rock formations?",
        answers: [
            {text: "Victoria falls", correct: false},
            {text: "Mount Kilimanjaro", correct: false},
            {text: "Zuma rock", correct: true},
            {text: "Table Mountain", correct: false},
        ]
    },
    {
        question: "Who was the first President of Nigeria?",
        answers: [
            {text: "Nnamdi Azikiwe", correct: true},
            {text: "Olusegun Obasanjo", correct: false},
            {text: "Shehu Shagari", correct: false},
            {text: "Goodluck Jonathan", correct: false},
        ]
    },
    {
        question: "English is the official language of Nigeria, but how many major languages are recognized as official languages in the constitution?",
        answers: [
            {text: "1", correct: false},
            {text: "3", correct: true},
            {text: "5", correct: false},
            {text: "8", correct: false},
        ]
    },
    {
        question: "Nigeria celebrates its Independence Day on which date?",
        answers: [
            {text: "October 1st", correct: true},
            {text: "June 12th", correct: false},
            {text: "May 29th", correct: false},
            {text: "December 25th", correct: false},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    shuffleArray(questions);

    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
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
    } else {
        startQuiz();
    }
})

startQuiz();