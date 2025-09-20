document.addEventListener('DOMContentLoaded', () => {
    // --- Get all HTML elements ---
    const stops = document.querySelectorAll('.journey-stop');
    const quizModal = document.getElementById('quiz-modal');
    const badgeModal = document.getElementById('badge-modal');
    const resultsModal = document.getElementById('results-modal');
    const funFactModal = document.getElementById('fun-fact-modal'); // New
    const progressButton = document.getElementById('progress-button');
    const closeResultsModalBtn = document.getElementById('close-results-modal');
    const closeFunFactModalBtn = document.getElementById('close-fun-fact-modal'); // New
    const funFactText = document.getElementById('fun-fact-text'); // New
    const quizForm = document.getElementById('quiz-form');
    const quizTitle = document.getElementById('quiz-title');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const closeBadgeModalBtn = document.getElementById('close-badge-modal');

    // --- Data Objects ---
    const quizzes = {
        'stop-1': { title: 'Quiz 1: The Mighty Seed', question: 'What is the first thing a seed needs to start growing?', options: ['Sunlight', 'Water', 'Music', 'A toy car'], correctAnswer: 'Water' },
        'stop-2': { title: 'Quiz 2: Helping Hands', question: 'Which tool is used for digging small holes for seeds?', options: ['A spoon', 'A trowel', 'A hammer', 'A rake'], correctAnswer: 'A trowel' },
        'stop-4': { title: 'Quiz 4: Sunny Days', question: 'What process do plants use to make food from sunlight?', options: ['Photosynthesis', 'Photocopying', 'Teleportation', 'Napping'], correctAnswer: 'Photosynthesis' },
        'stop-5': { title: 'Quiz 5: The Harvest', question: 'When a plant is fully grown, what is it time for?', options: ['A party', 'Watering it more', 'The Harvest', 'Singing to it'], correctAnswer: 'The Harvest' }
    };
    
    // NEW: Data for the fun facts
    const funFacts = {
        'stop-1': "Some seeds, like the Arctic Lupin, can still grow after being frozen for thousands of years!",
        'stop-2': "A trowel is like a mini-shovel, perfect for making a cozy bed for a new seed.",
        'stop-4': "Plants 'breathe in' a gas called carbon dioxide, which is what we breathe out!",
        'stop-5': "Farmers in India grow over 100 different types of rice. That's a lot of variety!"
    };
    
    let currentStopId = null;

    // --- Progress Tracking Functions ---
    function getProgress() {
        const progress = localStorage.getItem('agriculture-progress');
        return progress ? JSON.parse(progress) : { completedStops: [] };
    }
    function saveProgress(stopId) {
        const progress = getProgress();
        if (!progress.completedStops.includes(stopId)) {
            progress.completedStops.push(stopId);
        }
        localStorage.setItem('agriculture-progress', JSON.stringify(progress));
    }
    function loadProgress() {
        const progress = getProgress();
        let lastCompletedNum = 0;
        progress.completedStops.forEach(stopId => {
            const stopEl = document.getElementById(stopId);
            if (stopEl) {
                stopEl.classList.remove('active', 'locked');
                stopEl.classList.add('completed');
                stopEl.innerHTML = '';
                const stopNum = parseInt(stopId.split('-')[1]);
                if (stopNum > lastCompletedNum) lastCompletedNum = stopNum;
            }
        });
        const nextStopEl = document.getElementById(`stop-${lastCompletedNum + 1}`);
        if (nextStopEl) {
            nextStopEl.classList.remove('locked');
            nextStopEl.classList.add('active');
        }
        if(progress.completedStops.length === 0) {
            document.getElementById('stop-1').classList.add('active');
        }
    }
    function showResults() {
        const progress = getProgress();
        const stopsCompleted = progress.completedStops.length;
        document.getElementById('stops-completed-results').textContent = `${stopsCompleted} / 5`;
        if (stopsCompleted >= 5) {
            document.getElementById('badges-earned-results').textContent = 'Master Farmer Badge!';
        } else {
            document.getElementById('badges-earned-results').textContent = 'Keep going!';
        }
        resultsModal.classList.add('active');
    }

    // --- Core Game Logic ---
    function completeAndUnlockNext(stopId) {
        saveProgress(stopId);
        loadProgress();
    }
    function openQuiz(stopId) {
        currentStopId = stopId;
        const quizData = quizzes[stopId];
        quizTitle.textContent = quizData.title;
        quizQuestion.textContent = quizData.question;
        quizOptions.innerHTML = ''; 
        quizData.options.forEach(optionText => {
            const label = document.createElement('label');
            label.className = 'quiz-option';
            const radio = document.createElement('input');
            radio.type = 'radio'; radio.name = 'answer'; radio.value = optionText; radio.required = true;
            label.appendChild(radio);
            label.append(` ${optionText}`);
            quizOptions.appendChild(label);
        });
        quizModal.classList.add('active');
    }

    // --- NEW: This function shows the fun fact modal ---
    function showFunFact(stopId) {
        const fact = funFacts[stopId];
        if (fact) {
            funFactText.textContent = fact;
            funFactModal.classList.add('active');
        } else {
            // If there's no fact for this stop, just continue
            completeAndUnlockNext(stopId);
        }
    }

    // --- Event Listeners ---
    stops.forEach(stop => {
        stop.addEventListener('click', () => {
            if (stop.classList.contains('locked')) return;
            if (stop.id === 'stop-3') {
                alert('Mini-game coming soon! You can now move to the next stop.');
                completeAndUnlockNext(stop.id);
            } else {
                openQuiz(stop.id);
            }
        });
    });

    // MODIFIED: The quiz form now shows a fun fact after a correct answer
    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedOption = quizForm.querySelector('input[name="answer"]:checked');
        if (!selectedOption) return alert('Please choose an answer!');
        
        if (selectedOption.value === quizzes[currentStopId].correctAnswer) {
            quizModal.classList.remove('active');
            
            // Show the fun fact instead of directly unlocking the next stop
            showFunFact(currentStopId); 
            
            if (currentStopId === 'stop-5') {
                // We'll let the fun fact modal handle the badge popup
            }
        } else {
            alert('Not quite! Try again. 🌱');
        }
    });

    // NEW: Event listener for closing the fun fact modal
    closeFunFactModalBtn.addEventListener('click', () => {
        funFactModal.classList.remove('active');
        
        // Show final badge *after* the last fun fact is closed
        if (currentStopId === 'stop-5') {
            badgeModal.classList.add('active');
        }
        
        // Now unlock the next stop
        completeAndUnlockNext(currentStopId);
    });

    closeBadgeModalBtn.addEventListener('click', () => {
        localStorage.removeItem('agriculture-progress');
        window.location.reload();
    });

    progressButton.addEventListener('click', showResults);
    
    closeResultsModalBtn.addEventListener('click', () => {
        resultsModal.classList.remove('active');
    });

    // --- Initial setup ---
    loadProgress();
});

