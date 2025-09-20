// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-md", "bg-white/90", "backdrop-blur-md");
    } else {
      navbar.classList.remove("shadow-md", "bg-white/90", "backdrop-blur-md");
    }
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

// Contact form submit listener
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("🎉 Message Sent! Thank you for contacting us.");
});