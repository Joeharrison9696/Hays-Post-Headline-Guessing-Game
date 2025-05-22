document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const gameTitleEl = document.getElementById('game-title');
    const lastUpdatedEl = document.getElementById('last-updated');
    
    const startScreenEl = document.getElementById('start-screen');
    const questionAreaEl = document.getElementById('question-area');
    const scoreAreaEl = document.getElementById('score-area');

    const headlineStartEl = document.getElementById('headline-start');
    const optionsContainerEl = document.getElementById('options-container');
    const feedbackEl = document.getElementById('feedback');
    const storyLinkContainerEl = document.getElementById('story-link-container'); // New
    const readStoryLinkEl = document.getElementById('read-story-link'); // New
    
    const finalScoreEl = document.getElementById('final-score');
    const shareTextDisplayEl = document.getElementById('share-text-display'); // Changed from shareTextEl
    const copyButtonEl = document.getElementById('copy-button');
    const copyFeedbackEl = document.getElementById('copy-feedback');
    
    const startButtonEl = document.getElementById('start-button');
    const nextQuestionButtonEl = document.getElementById('next-question-button');

    // Game State
    let gameData = null;
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswersHistory = []; // Stores '🟩' or '🟥'
    let currentStoryURL = ''; // To store the URL for the current question

    const JSON_FILE_NAME = 'hayspost_headlines.json'; // Make sure this matches your JSON file name

    // --- 1. FETCHING DATA ---
    async function loadGameData() {
        try {
            const response = await fetch(JSON_FILE_NAME);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} while fetching ${JSON_FILE_NAME}`);
            }
            gameData = await response.json();
            if (!gameData || typeof gameData !== 'object') {
                 throw new Error("Invalid JSON structure: Root is not an object.");
            }
            // Validate that questions have storyURL (optional, but good for debugging)
            if (gameData.questions && gameData.questions.some(q => typeof q.storyURL === 'undefined')) {
                console.warn("Some questions are missing the 'storyURL' field in the JSON data.");
            }
            initializeGameScreen();
        } catch (error) {
            console.error("Could not load or parse game data:", error);
            gameTitleEl.textContent = "Error Loading Game!";
            lastUpdatedEl.textContent = `Please check the console for more details and ensure '${JSON_FILE_NAME}' is present, correctly formatted, and includes 'storyURL' for each question.`;
            startScreenEl.classList.add('hidden');
            questionAreaEl.classList.add('hidden');
            scoreAreaEl.classList.add('hidden');
        }
    }

    // --- 2. INITIALIZING GAME SCREEN ---
    function initializeGameScreen() {
        if (!gameData || !gameData.questions || gameData.questions.length === 0) {
            console.error("Game data is invalid or has no questions.");
            gameTitleEl.textContent = "No Questions Available";
            lastUpdatedEl.textContent = "Please add questions to the JSON file.";
            startScreenEl.classList.add('hidden');
            return;
        }
        gameTitleEl.textContent = gameData.gameTitle || "Headline Challenge";
        if (gameData.lastUpdated) {
            lastUpdatedEl.textContent = `News from week of: ${gameData.lastUpdated}`;
        }
        
        startScreenEl.classList.remove('hidden');
        questionAreaEl.classList.add('hidden');
        scoreAreaEl.classList.add('hidden');
        nextQuestionButtonEl.classList.add('hidden');
        storyLinkContainerEl.classList.add('hidden'); // Hide story link initially
        copyFeedbackEl.classList.add('hidden');
    }

    // --- Event Listeners ---
    startButtonEl.addEventListener('click', startGame);
    nextQuestionButtonEl.addEventListener('click', loadNextQuestion);
    copyButtonEl.addEventListener('click', copyShareText);

    // --- 3. STARTING GAME & DISPLAYING QUESTIONS ---
    function switchScreen(showScreen) {
        startScreenEl.classList.add('hidden');
        questionAreaEl.classList.add('hidden');
        scoreAreaEl.classList.add('hidden');
        
        if (showScreen) {
            showScreen.classList.remove('hidden');
            showScreen.style.animation = 'none';
            showScreen.offsetHeight; 
            showScreen.style.animation = ''; 
        }
    }
    
    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        userAnswersHistory = [];
        switchScreen(questionAreaEl);
        nextQuestionButtonEl.classList.add('hidden'); 
        storyLinkContainerEl.classList.add('hidden'); // Ensure it's hidden at game start
        displayQuestion();
    }

    function displayQuestion() {
        feedbackEl.textContent = '';
        feedbackEl.className = ''; 
        storyLinkContainerEl.classList.add('hidden'); // Hide story link for new question
        const question = gameData.questions[currentQuestionIndex];
        headlineStartEl.textContent = question.headlineStart;
        currentStoryURL = question.storyURL || '#'; // Store URL, default to '#' if missing
        optionsContainerEl.innerHTML = ''; 

        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);

        shuffledOptions.forEach(optionText => {
            const button = document.createElement('button');
            button.textContent = optionText;
            button.addEventListener('click', () => handleAnswer(optionText, question.correctAnswer, button));
            optionsContainerEl.appendChild(button);
        });
    }

    // --- 4. HANDLING ANSWERS ---
    function handleAnswer(selectedOption, correctAnswer, clickedButtonEl) {
        const optionButtons = optionsContainerEl.querySelectorAll('button');
        optionButtons.forEach(btn => {
            btn.classList.add('disabled'); 
            if (btn.textContent === correctAnswer) {
                 btn.classList.add('reveal-correct'); 
            }
        });

        if (selectedOption === correctAnswer) {
            score++;
            feedbackEl.textContent = "Correct!";
            feedbackEl.style.color = 'var(--correct-color)';
            clickedButtonEl.classList.add('correct'); 
            userAnswersHistory.push('🟩');
        } else {
            feedbackEl.textContent = `Incorrect. The right one was: "${correctAnswer}"`;
            feedbackEl.style.color = 'var(--incorrect-color)';
            clickedButtonEl.classList.add('incorrect'); 
            userAnswersHistory.push('🟥');
        }

        // Show story link
        if (currentStoryURL && currentStoryURL !== '#') {
            readStoryLinkEl.href = currentStoryURL;
            storyLinkContainerEl.classList.remove('hidden');
        } else {
            storyLinkContainerEl.classList.add('hidden'); // Keep hidden if no valid URL
        }


        if (currentQuestionIndex < gameData.questions.length - 1) {
            nextQuestionButtonEl.classList.remove('hidden');
        } else {
            setTimeout(endGame, 1200); // Slightly longer delay to see story link
        }
    }

    function loadNextQuestion() {
        currentQuestionIndex++;
        displayQuestion();
        nextQuestionButtonEl.classList.add('hidden');
        storyLinkContainerEl.classList.add('hidden'); // Hide story link for next question
    }

    // --- 5. ENDING GAME & SHARING ---
    function endGame() {
        switchScreen(scoreAreaEl);
        
        const totalQuestions = gameData.questions.length;
        finalScoreEl.textContent = `You got ${score} out of ${totalQuestions} correct!`;

        const emojiString = userAnswersHistory.join(' '); 
        const fullShareText = `${gameData.siteName || 'My'} Headline Challenge Results:\n${emojiString}\nScore: ${score}/${totalQuestions}\nPlayed on: ${gameData.gameTitle || 'Headline Challenge'}`;
        
        // Set text to the new div, newlines will be preserved by 'white-space: pre-wrap;'
        shareTextDisplayEl.textContent = fullShareText; 

        copyButtonEl.textContent = "Copy Results"; 
        copyFeedbackEl.classList.add('hidden');
    }

    function copyShareText() {
        const textToCopy = shareTextDisplayEl.textContent; // Get text from the div
        
        // Use a temporary textarea to execute the copy command
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999); // For mobile devices

        try {
            document.execCommand('copy');
            copyFeedbackEl.textContent = "Copied to clipboard!";
            copyFeedbackEl.classList.remove('hidden');
            copyButtonEl.textContent = "Copied!";
            setTimeout(() => { 
                copyButtonEl.textContent = "Copy Results";
                copyFeedbackEl.classList.add('hidden');
            }, 2500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            copyFeedbackEl.textContent = "Failed to copy. Please copy manually.";
            copyFeedbackEl.style.color = 'var(--incorrect-color)';
            copyFeedbackEl.classList.remove('hidden');
        } finally {
            document.body.removeChild(tempTextArea); // Clean up the temporary textarea
        }
    }

    // --- LOAD INITIAL DATA ---
    loadGameData();
});
