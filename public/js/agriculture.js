let waterClicks = 0;
let lessonsCompleted = 0;

function startQuiz(lesson) {
  document.getElementById(`quiz${lesson}`).classList.remove("hidden");
}

function checkAnswer(lesson, status) {
  const feedback = document.getElementById(`feedback${lesson}`);
  if (status === "correct") {
    feedback.innerHTML = "✅ Correct! Well done 🎉";
    feedback.className = "mt-2 text-green-600 font-bold";
    completeLesson(lesson);
  } else {
    feedback.innerHTML = "❌ Oops! Try again.";
    feedback.className = "mt-2 text-red-600 font-bold";
  }
}

function waterPlant() {
  waterClicks++;
  const status = document.getElementById("plantStatus");
  if (waterClicks < 3) {
    status.innerHTML = `💧 You watered the seed (${waterClicks}/3)`;
  } else {
    status.innerHTML = "🌱 The plant has grown! Great job!";
    completeLesson("water");
  }
}

function completeLesson(lesson) {
  if (!document.getElementById(`badgeSection`).classList.contains("unlocked")) {
    lessonsCompleted++;
    if (lessonsCompleted >= 3) {
      document.getElementById("badgeSection").classList.remove("hidden");
      document.getElementById("badgeSection").classList.add("unlocked");
    }
  }
}
