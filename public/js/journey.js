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

    // --- Quiz Data for Each Stop ---
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
        }
        // Add more quizzes for stop-3, stop-4 etc. here
    };

    let currentStopId = null; // To remember which stop's quiz we are doing

    // --- Function to open the quiz ---
    function openQuiz(stopId) {
        currentStopId = stopId;
        const quizData = quizzes[stopId];

        if (!quizData) {
            alert('More adventures coming soon!');
            return;
        }

        // Populate the quiz modal with data
        quizTitle.textContent = quizData.title;
        quizQuestion.textContent = quizData.question;
        quizOptions.innerHTML = ''; // Clear old options

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
            // Only open quiz if the stop is not locked
            if (!stop.classList.contains('locked')) {
                openQuiz(stop.id);
            }
        });
    });

    // --- Handle the quiz form submission ---
    quizForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop the form from reloading the page
        
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
            badgeModal.classList.remove('hidden');
            
            // Mark the stop as completed
            const currentStopEl = document.getElementById(currentStopId);
            currentStopEl.classList.remove('active');
            currentStopEl.classList.add('completed');
            currentStopEl.innerHTML = ''; // Remove the number

            // Unlock the next stop
            const nextStopNumber = parseInt(currentStopId.split('-')[1]) + 1;
            const nextStopEl = document.getElementById(`stop-${nextStopNumber}`);
            if (nextStopEl) {
                nextStopEl.classList.remove('locked');
                nextStopEl.classList.add('active');
            }

        } else {
            // Wrong Answer
            alert('Not quite! Try again. 🌱');
        }
    });

    // --- Handle closing the badge modal ---
    closeBadgeModalBtn.addEventListener('click', () => {
        badgeModal.classList.add('hidden');
    });
});