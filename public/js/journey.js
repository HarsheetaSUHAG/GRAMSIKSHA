document.addEventListener('DOMContentLoaded', () => {
    // --- Get all the HTML elements we need ---
    const stops = document.querySelectorAll('.journey-stop');
    const quizModal = document.getElementById('quiz-modal');
    const badgeModal = document.getElementById('badge-modal');
    const quizForm = document.getElementById('quiz-form');
    const quizTitle = document.getElementById('quiz-title');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const closeBadgeModalBtn = document.getElementById('close-badge-modal');

    // --- Quiz Data - Expanded for 5 stops ---
    const quizzes = {
        'stop-1': {
            title: 'Quiz 1: The Mighty Seed',
            question: 'What is the first thing a seed needs to start growing?',
            options: ['Sunlight', 'Water', 'Music', 'A toy car'],
            correctAnswer: 'Water'
        },
        'stop-2': {
            title: 'Quiz 2: Helping Hands',
            question: 'Which tool is used for digging small holes for seeds?',
            options: ['A spoon', 'A trowel', 'A hammer', 'A rake'],
            correctAnswer: 'A trowel'
        },
        // No quiz for stop-3, it's a game placeholder
        'stop-4': {
            title: 'Quiz 4: Sunny Days',
            question: 'What process do plants use to make food from sunlight?',
            options: ['Photosynthesis', 'Photocopying', 'Teleportation', 'Napping'],
            correctAnswer: 'Photosynthesis'
        },
        'stop-5': {
            title: 'Quiz 5: The Harvest',
            question: 'When a plant is fully grown, what is it time for?',
            options: ['A party', 'Watering it more', 'The Harvest', 'Singing to it'],
            correctAnswer: 'The Harvest'
        }
    };

    let currentStopId = null; 

    // --- Function to unlock the next stop ---
    function completeAndUnlockNext(stopId) {
        const currentStopEl = document.getElementById(stopId);
        currentStopEl.classList.remove('active');
        currentStopEl.classList.add('completed');
        currentStopEl.innerHTML = ''; // Remove the number

        const nextStopNumber = parseInt(stopId.split('-')[1]) + 1;
        const nextStopEl = document.getElementById(`stop-${nextStopNumber}`);
        if (nextStopEl) {
            nextStopEl.classList.remove('locked');
            nextStopEl.classList.add('active');
        }
    }

    // --- Function to open the quiz ---
    function openQuiz(stopId) {
        currentStopId = stopId;
        const quizData = quizzes[stopId];

        // Populate the quiz modal with data
        quizTitle.textContent = quizData.title;
        quizQuestion.textContent = quizData.question;
        quizOptions.innerHTML = ''; 

        quizData.options.forEach(optionText => {
            const label = document.createElement('label');
            label.className = 'quiz-option';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'answer';
            radio.value = optionText;
            radio.required = true;
            
            label.appendChild(radio);
            label.append(` ${optionText}`);
            quizOptions.appendChild(label);
        });

        quizModal.classList.remove('hidden');
    }

    // --- Add a click listener to each stop ---
    stops.forEach(stop => {
        stop.addEventListener('click', () => {
            if (stop.classList.contains('locked')) return; // Do nothing if locked

            // *** NEW: Special placeholder for the game at Stop 3 ***
            if (stop.id === 'stop-3') {
                alert('Mini-game coming soon! You can now move to the next stop.');
                completeAndUnlockNext(stop.id);
            } else {
                // For all other stops, open the quiz
                openQuiz(stop.id);
            }
        });
    });

    // --- Handle the quiz form submission ---
    quizForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const selectedOption = quizForm.querySelector('input[name="answer"]:checked');
        if (!selectedOption) {
            alert('Please choose an answer!');
            return;
        }

        const userAnswer = selectedOption.value;
        const correctAnswer = quizzes[currentStopId].correctAnswer;

        if (userAnswer === correctAnswer) {
            // Correct Answer!
            quizModal.classList.add('hidden');
            
            // *** NEW: Only show badge at the very end (Stop 5) ***
            if (currentStopId === 'stop-5') {
                badgeModal.classList.remove('hidden');
            }
            
            // Mark the stop as completed and unlock the next one
            completeAndUnlockNext(currentStopId);

        } else {
            // Wrong Answer
            alert('Not quite! Try again. 🌱');
        }
    });

    // --- Handle closing the badge modal (or restarting) ---
    closeBadgeModalBtn.addEventListener('click', () => {
        // This will simply reload the page to restart the journey
        window.location.reload();
    });
});