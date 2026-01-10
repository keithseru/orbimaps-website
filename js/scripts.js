// Counter Section
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter-number");

    counters.forEach((counter) => {
        const from = parseInt(counter.getAttribute("data-from")) || 0;
        const to = parseInt(counter.getAttribute("data-to")) || 0;
        const speed = parseInt(counter.getAttribute("data-speed")) || 2000;
        const increment = Math.ceil(to / (speed / 50));

        let current = from;

        const timer = setInterval(() => {
            current += increment;
            if (current >= to) {
                current = to;
                clearInterval(timer);
            }
            counter.textContent = current;
        }, 50);
    });
});

// Add mouse drag functionality to carousel
const carousel = document.querySelector("#testimonialsCarousel");
const carouselInner = carousel.querySelector(".carousel-inner");
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

const carouselInstance = new bootstrap.Carousel(carousel, {
    interval: 5000,
    wrap: true,
});

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("mouseup", dragEnd);
carousel.addEventListener("touchend", dragEnd);
carousel.addEventListener("mousemove", drag);
carousel.addEventListener("touchmove", drag);
carousel.addEventListener("mouseleave", dragEnd);

// Prevent context menu on long press
carousel.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
});

function dragStart(e) {
    if (e.type === "touchstart") {
        startPos = e.touches[0].clientX;
    } else {
        startPos = e.clientX;
        carousel.style.cursor = "grabbing";
    }
    isDragging = true;
    carouselInstance.pause();
}

function drag(e) {
    if (!isDragging) return;

    e.preventDefault();
    const currentPosition =
        e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const diff = currentPosition - startPos;

    // Only trigger slide change if dragged more than 50px
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            // Dragged right - go to previous
            carouselInstance.prev();
        } else {
            // Dragged left - go to next
            carouselInstance.next();
        }
        isDragging = false;
        carousel.style.cursor = "grab";
    }
}

function dragEnd() {
    isDragging = false;
    carousel.style.cursor = "grab";
    carouselInstance.cycle();
}

// Set initial cursor
carousel.style.cursor = "grab";
