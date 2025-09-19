// Toggle between Login & Signup
function showSignup() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("signupForm").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("signupForm").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
}

// Redirect after login/signup
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      // Basic validation (optional)
      const mobile = document.getElementById("loginMobile").value.trim();
      const pass = document.getElementById("loginPassword").value.trim();

      if (mobile && pass) {
        window.location.href = "courses.html"; // redirect
      } else {
        alert("Please enter Mobile Number and Password");
      }
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      const name = document.getElementById("signupName").value.trim();
      const mobile = document.getElementById("signupMobile").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const pass = document.getElementById("signupPassword").value.trim();

      if (name && mobile && email && pass) {
        window.location.href = "courses.html"; // redirect
      } else {
        alert("Please fill all fields before signing up");
      }
    });
  }
});
