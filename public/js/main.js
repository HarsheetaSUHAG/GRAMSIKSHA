// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.remove("bg-transparent");
    navbar.classList.add("bg-white", "shadow");
    navbar.querySelectorAll("ul li a").forEach(link => link.classList.add("text-gray-700"));
  } else {
    navbar.classList.add("bg-transparent");
    navbar.classList.remove("bg-white", "shadow");
    navbar.querySelectorAll("ul li a").forEach(link => link.classList.remove("text-gray-700"));
  }
});

// Simple scroll animations
const elements = document.querySelectorAll(".animate-slideUp, .animate-fadeIn");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("opacity-100", "translate-y-0");
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => {
  el.classList.add("opacity-0", "translate-y-6", "transition-all", "duration-700");
  observer.observe(el);
});

// Contact form confetti effect
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("🎉 Message Sent! Thank you for contacting us.");
  // You can integrate email backend later
});

