/* =========================================================
   COUNTER ANIMATION
   - Animates numbers from data-from to data-to
   - Runs once when DOM is fully loaded
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter-number");

    // Exit early if no counters exist
    if (!counters.length) return;

    counters.forEach((counter) => {
        // Read configuration from data attributes
        const startValue = parseInt(counter.dataset.from) || 0;
        const endValue = parseInt(counter.dataset.to) || 0;
        const duration = parseInt(counter.dataset.speed) || 2000;

        // Calculate how much to increment per tick
        const step = Math.ceil(endValue / (duration / 50));
        let currentValue = startValue;

        // Animate the counter
        const timer = setInterval(() => {
            currentValue += step;

            // Ensure we do not exceed the target value
            if (currentValue >= endValue) {
                currentValue = endValue;
                clearInterval(timer);
            }

            counter.textContent = currentValue;
        }, 50);
    });
});

/* =========================================================
   TESTIMONIALS CAROUSEL – DRAG / SWIPE SUPPORT
   - Enables swipe on mobile and drag on desktop
   - Prevents accidental text selection
   - Pauses autoplay during interaction
========================================================= */

// Select the carousel safely
const carousel = document.querySelector("#testimonialsCarousel");

// Exit early if carousel does not exist
if (carousel) {
    const carouselInner = carousel.querySelector(".carousel-inner");

    // Drag state variables
    let isDragging = false;
    let startX = 0;

    // Initialize Bootstrap carousel
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true,
        pause: false,
    });

    /* -----------------------------
       EVENT LISTENERS
    ----------------------------- */

    carousel.addEventListener("mousedown", startDrag);
    carousel.addEventListener("touchstart", startDrag, { passive: true });

    carousel.addEventListener("mousemove", onDrag);
    carousel.addEventListener("touchmove", onDrag, { passive: false });

    carousel.addEventListener("mouseup", endDrag);
    carousel.addEventListener("touchend", endDrag);
    carousel.addEventListener("mouseleave", endDrag);

    // Prevent context menu on long press / right click
    carousel.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });

    // Set default cursor
    carousel.style.cursor = "grab";

    /* -----------------------------
       DRAG FUNCTIONS
    ----------------------------- */

    function startDrag(event) {
        isDragging = true;

        // Get starting X position
        startX =
            event.type === "touchstart"
                ? event.touches[0].clientX
                : event.clientX;

        // Visual feedback
        carousel.style.cursor = "grabbing";

        // Pause autoplay during interaction
        carouselInstance.pause();
    }

    function onDrag(event) {
        if (!isDragging) return;

        // Prevent scrolling while swiping horizontally
        if (event.type === "touchmove") {
            event.preventDefault();
        }

        const currentX =
            event.type === "touchmove"
                ? event.touches[0].clientX
                : event.clientX;

        const deltaX = currentX - startX;

        // Trigger slide change only after meaningful drag
        if (Math.abs(deltaX) > 50) {
            deltaX > 0
                ? carouselInstance.prev()
                : carouselInstance.next();

            isDragging = false;
            carousel.style.cursor = "grab";
        }
    }

    function endDrag() {
        if (!isDragging) return;

        isDragging = false;
        carousel.style.cursor = "grab";

        // Resume autoplay
        carouselInstance.cycle();
    }
}
