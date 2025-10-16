// Estado do jogo
const state = {
    currentQuestion: 0,
    score: 0,
    questions: [],
    answered: false,
    bestScore: parseInt(localStorage.getItem('darkQuizBestScore')) || 0
};

// Elementos DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreValueEl = document.getElementById('score-value');
const progressEl = document.getElementById('progress');
const finalScoreEl = document.getElementById('final-score-value');
const resultMessageEl = document.getElementById('result-message');
const resultTitleEl = document.getElementById('result-title');
const resultIconEl = document.getElementById('result-icon');
const bestScoreEl = document.getElementById('best-score');
const recordStatusEl = document.getElementById('record-status');

// Funções auxiliares
function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function translateText(text) {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|pt`);
        const data = await response.json();
        return data.responseData.translatedText;
    } catch {
        return text;
    }
}

// Carregar perguntas
async function loadQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=12&category=9&difficulty=easy&type=multiple');
        const data = await response.json();

        if (data.response_code === 0) {
            state.questions = await Promise.all(data.results.map(async q => ({
                question: await translateText(decodeHtml(q.question)),
                correct: await translateText(decodeHtml(q.correct_answer)),
                incorrect: await Promise.all(q.incorrect_answers.map(a => translateText(decodeHtml(a))))
            })));
            loadQuestion();
        }
    } catch (error) {
        questionEl.textContent = 'Erro ao carregar as questões. Recarregue a página.';
    }
}

// Carregar pergunta atual
function loadQuestion() {
    if (state.currentQuestion >= state.questions.length) {
        showResults();
        return;
    }

    const q = state.questions[state.currentQuestion];
    questionEl.textContent = q.question;

    const allAnswers = [...q.incorrect, q.correct];
    shuffle(allAnswers);

    optionsEl.innerHTML = '';
    allAnswers.forEach(answer => {
        const option = document.createElement('div');
        option.className = 'option';
        option.textContent = answer;
        option.addEventListener('click', () => selectOption(option, answer, q.correct));
        optionsEl.appendChild(option);
    });

    state.answered = false;
    nextBtn.disabled = true;
    updateProgress();
}

// Selecionar opção
function selectOption(option, selected, correct) {
    if (state.answered) return;

    state.answered = true;

    if (selected === correct) {
        option.classList.add('correct');
        state.score++;
        scoreValueEl.textContent = state.score;
    } else {
        option.classList.add('incorrect');
        document.querySelectorAll('.option').forEach(opt => {
            if (opt.textContent === correct) opt.classList.add('correct');
        });
    }

    nextBtn.disabled = false;
    updateProgress();
}

// Atualizar progresso
function updateProgress() {
    const percentage = ((state.currentQuestion + 1) / state.questions.length) * 100;
    progressEl.style.width = `${percentage}%`;
}

// Próxima pergunta
function nextQuestion() {
    state.currentQuestion++;
    document.querySelector('.current-q').textContent = state.currentQuestion + 1;
    loadQuestion();
}

// Mostrar resultados
function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    finalScoreEl.textContent = state.score;

    // Verificar recorde
    const isNewRecord = state.score > state.bestScore;
    if (isNewRecord) {
        state.bestScore = state.score;
        localStorage.setItem('darkQuizBestScore', state.bestScore);
    }

    bestScoreEl.textContent = `${state.bestScore} / 12`;

    if (isNewRecord && state.score > 0) {
        recordStatusEl.textContent = 'NOVO RECORDE ALCANÇADO';
        recordStatusEl.classList.add('new-record');
    } else if (state.score === state.bestScore && state.score > 0) {
        recordStatusEl.textContent = 'Você igualou seu melhor desempenho';
    } else {
        recordStatusEl.textContent = '';
    }

    // Mensagem e ícone baseado na pontuação
    if (state.score === 0) {
        resultTitleEl.textContent = 'Derrota Total';
        resultMessageEl.textContent = 'As sombras consumiram seu conhecimento.';
        resultIconEl.innerHTML = '<i class="fas fa-skull-crossbones"></i>';
        resultIconEl.style.color = '#ff3366';
    } else if (state.score <= 3) {
        resultTitleEl.textContent = 'Iniciante das Trevas';
        resultMessageEl.textContent = 'Você ainda tem muito a aprender nas sombras.';
        resultIconEl.innerHTML = '<i class="fas fa-ghost"></i>';
        resultIconEl.style.color = '#666';
    } else if (state.score <= 6) {
        resultTitleEl.textContent = 'Aprendiz Sombrio';
        resultMessageEl.textContent = 'Você começa a desvendar os mistérios obscuros.';
        resultIconEl.innerHTML = '<i class="fas fa-hat-wizard"></i>';
        resultIconEl.style.color = '#8b00ff';
    } else if (state.score <= 9) {
        resultTitleEl.textContent = 'Mestre das Sombras';
        resultMessageEl.textContent = 'Seu conhecimento ilumina as trevas.';
        resultIconEl.innerHTML = '<i class="fas fa-crown"></i>';
        resultIconEl.style.color = '#ffd700';
    } else if (state.score <= 11) {
        resultTitleEl.textContent = 'Lorde Sombrio';
        resultMessageEl.textContent = 'Poucos alcançam tal sabedoria nas trevas.';
        resultIconEl.innerHTML = '<i class="fas fa-chess-king"></i>';
        resultIconEl.style.color = '#ff006e';
    } else {
        resultTitleEl.textContent = 'Senhor Supremo';
        resultMessageEl.textContent = 'Você dominou completamente o reino do conhecimento obscuro.';
        resultIconEl.innerHTML = '<i class="fas fa-fire"></i>';
        resultIconEl.style.color = '#ff6600';
    }
}

// Reiniciar quiz
function restart() {
    state.currentQuestion = 0;
    state.score = 0;
    state.answered = false;
    scoreValueEl.textContent = 0;
    document.querySelector('.current-q').textContent = 1;
    recordStatusEl.classList.remove('new-record');
    progressEl.style.width = '0%';
    
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

// Event Listeners
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestions();
});

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restart);