const questions = [
    {
      text: "А когда с человеком может произойти дрожемент?",
      answers: [
        "Когда он влюбляется",
        "Когда он идет шопиться",
        "Когда он слышит смешную шутку",
        "Когда он боится, пугается"
      ],
      correct: 3,
      explanation: "Лексема «дрожемент» имплицирует состояние крайнего напряжения и страха."
    },
    {
      text: "Говорят, Антон заовнил всех. Это еще как понимать?",
      answers: [
        "Как так, заовнил? Ну и хамло.",
        "Антон очень надоедливый человек",
        "Молодец, Антон, всех победил!",
        "Нет ничего плохого в этом"
      ],
      correct: 2,
      explanation: "«Заовнить» от английского own — «победить, завладеть»."
    },
    {
      text: "А фразу «заскамить мамонта» как понимать?",
      answers: [
        "Разозлить кого-то из родителей",
        "Увлекаться археологией",
        "Развести недотепу на деньги",
        "Оскорбить пожилого человека"
      ],
      correct: 2,
      explanation: "«Заскамить мамонта» — обмануть пожилого человека на деньги."
    },
    {
      text: "Кто такие бефефе?",
      answers: [
        "Вши",
        "Милые котики",
        "Лучшие друзья",
        "Люди, которые не держат слово"
      ],
      correct: 2,
      explanation: "Бефефе — от английского Best Friends Forever (лучшие друзья)."
    }
  ];
  
  let current = 0;
  let correctCount = 0;
  
  const questionArea = document.getElementById("question-area");
  const message = document.getElementById("message");
  const stats = document.getElementById("stats");
  
  shuffleArray(questions);
  
  function showQuestion() {
    const container = document.createElement("div");
    container.className = "question-block";
  
    if (current >= questions.length) {
      message.classList.remove("hidden");
      stats.classList.remove("hidden");
      stats.textContent = `Вы ответили правильно на ${correctCount} из ${questions.length} вопросов.`;
  
      enableReviewMode();
      return;
    }
  
    const q = questions[current];
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `${current + 1}. ${q.text}`;
    container.appendChild(questionDiv);
  
    const answersDiv = document.createElement("div");
    answersDiv.className = "answers";
    const answers = [...q.answers];
    shuffleArray(answers);
  
    answers.forEach((ansText) => {
      const ansDiv = document.createElement("div");
      ansDiv.className = "answer";
      ansDiv.textContent = ansText;
      ansDiv.addEventListener("click", () => handleAnswer(ansDiv, ansText, q, container));
      answersDiv.appendChild(ansDiv);
    });
  
    container.appendChild(answersDiv);
    questionArea.appendChild(container);
  }
  
  function handleAnswer(selected, ansText, q, container) {
    const answers = container.querySelectorAll(".answer");
    const answersDiv = container.querySelector(".answers");
    answers.forEach(a => a.style.pointerEvents = "none");
  
    const correctText = q.answers[q.correct];
    const isCorrect = ansText === correctText;
    q.userAnswer = ansText;
  
    if (isCorrect) {
      correctCount++;
      selected.classList.add("correct");
      const expl = document.createElement("div");
      expl.className = "explanation";
      expl.textContent = q.explanation;
      selected.appendChild(expl);
  
      const marker = document.createElement("span");
      marker.className = "marker";
      marker.textContent = "✅";
      container.querySelector(".question").appendChild(marker);
    } else {
      selected.classList.add("incorrect");
      const marker = document.createElement("span");
      marker.className = "marker";
      marker.textContent = "❌";
      container.querySelector(".question").appendChild(marker);
    }
  
    
    setTimeout(() => {
      answers.forEach(a => a.classList.add("slide-right"));
  
     
      setTimeout(() => {
        answersDiv.remove(); 
        current++;
        showQuestion();
      }, 800);
    }, 1500);
  }
  
  
  function enableReviewMode() {
    const allQuestions = document.querySelectorAll(".question-block");
  
    allQuestions.forEach((block, index) => {
      const q = questions[index];
      block.addEventListener("click", () => {

        document.querySelectorAll(".review-explanation").forEach(el => el.remove());
  

        const correctAnswer = q.answers[q.correct];
        const reviewDiv = document.createElement("div");
        reviewDiv.className = "review-explanation";
        reviewDiv.innerHTML = `<b>Правильный ответ:</b> ${correctAnswer}<br>${q.explanation}`;
  
        block.appendChild(reviewDiv);
      });
    });
  }
  
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  showQuestion();
  