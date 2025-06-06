// Counter Animation Script for E-Waste Management Website
document.addEventListener("DOMContentLoaded", () => {
    // Find all elements with numbers to animate
    const counterElements = document.querySelectorAll(".counter-box h3");
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
                // Get the target number, removing any '+' symbol and commas
                const targetText = entry.target.textContent.replace(/[+,]/g, "");
                const target = parseInt(targetText);
                
                // Start the animation
                animateCounter(entry.target, target);
                entry.target.classList.add("counted");
            }
        });
    }, { threshold: 0.5 });
    
    // Observe counter elements
    counterElements.forEach(counter => observer.observe(counter));
});

// Animate counter from 0 to target
function animateCounter(element, target) {
    let current = 0;
    const duration = 2000; // 2 seconds
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            // Add back the plus symbol if it was there originally
            element.textContent = formatNumber(target) + (element.textContent.includes("+") ? "+" : "");
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, stepTime);
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
