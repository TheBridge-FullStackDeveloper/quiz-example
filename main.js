const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let currentQuestionIndex;

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Is web development fun?",
    answers: [
      { text: "Kinda", correct: false },
      { text: "YES!!!", correct: true },
      { text: "Um no", correct: false },
      { text: "IDK", correct: false },
    ],
  },
  {
    question: "What is 4 * 2?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true },
      { text: "Yes", correct: false },
    ],
  },
];

//empieza el juego
function startGame() {
  startButton.classList.add("hide"); //esconde botón start
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide"); //muestra contenedor preguntas
  setNextQuestion();
}

function showQuestion(questionObject) {
  questionElement.innerText = questionObject.question;
  questionObject.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;

    if (answer.correct === true) {
      button.dataset.correct = true;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function setStatusClass(element) {
  if (element.dataset.correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function setNextQuestion() {
  resetState();//limpia la pregunta que había
  showQuestion(questions[currentQuestionIndex]);//llamamos la función y le pasamos la pregunta actual
}

//cambía el color de los botones
function selectAnswer() {
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button);
  });

  if (questions.length > currentQuestionIndex + 1) {// si quedan preguntas muestra el btn next
    nextButton.classList.remove("hide");
  } else {//no quedan preguntas entonces muestra el boton restart (que es el btn start)
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

//limpía la pregunta que estaba
function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;//la pregunta en la que estamos le sumamos uno para pasar a la siguiente
  setNextQuestion();
});
