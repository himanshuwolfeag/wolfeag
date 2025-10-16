// var swiper = new Swiper(".slide-content", {
//     slidesPerView: 3,
//     spaceBetween: 25,
//     loop: true,
//     centerSlide: 'true',
//     fade: 'true',
//     grabCursor: 'true',
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//       dynamicBullets: true,
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     breakpoints:{
//         0: {
//             slidesPerView: 1,
//         },
//         520: {
//             slidesPerView: 2,
//         },
//         950: {
//             slidesPerView: 3,
//         },
//     },
//   });




// Register the ScrollTrigger plugin with GSAP


gsap.registerPlugin(ScrollTrigger);

// Select the horizontal container and all slides within it
const horizontalContainer = document.getElementById('horizontal-container');
const slides = gsap.utils.toArray('.horizontal-slide');

// Calculate the total width the horizontal container needs to scroll
// This is the sum of all slide widths minus one viewport width (since the first slide is already visible)
let scrollWidth = 0;
slides.forEach(slide => {
    scrollWidth += slide.offsetWidth;
});
// The amount to translate horizontally: total width - viewport width
// We subtract window.innerWidth because the first slide is visible when pinning starts.
// So, we only need to translate by the width of the subsequent slides.
const transformXValue = -(scrollWidth - window.innerWidth);

// Create the ScrollTrigger animation for the horizontal section
ScrollTrigger.create({
    trigger: "#section2-wrapper", // The section that, when scrolled to, will trigger the effect
    pin: true,                   // Pin this section in place when its trigger point is met
    start: "top top",            // Start the pin when the top of #section2-wrapper hits the top of the viewport
    end: () => "+=" + scrollWidth, // The end point for the scroll animation.
                                  // This makes the vertical scroll distance equal to the total horizontal content width.
    scrub: 1,                    // Smoothly links the animation progress to scroll progress. 'true' for immediate, number for smoothing.
    
    // Create an animation timeline that will be controlled by ScrollTrigger
    animation: gsap.to(horizontalContainer, {
        x: transformXValue,       // Animate the 'x' (translateX) property of the horizontal container
        ease: "none"              // Linear easing for direct scroll control
    }),

    // Optional: Add markers for debugging (remove in production)
    // markers: true, 
    
    // Optional: Callbacks for debugging or custom logic
    onEnter: () => console.log("Entering horizontal section"),
    onLeave: () => console.log("Leaving horizontal section (scrolling down past it)"),
    onEnterBack: () => console.log("Entering horizontal section (scrolling up to it)"),
    onLeaveBack: () => console.log("Leaving horizontal section (scrolling up past it)")
});

// --- Optional: Responsive adjustments for ScrollTrigger ---
// You might need to refresh ScrollTrigger if the layout changes (e.g., on window resize)
window.addEventListener('resize', () => {
    // Recalculate scrollWidth on resize
    scrollWidth = 0;
    slides.forEach(slide => {
        scrollWidth += slide.offsetWidth;
    });
    const newTransformXValue = -(scrollWidth - window.innerWidth);

    // Update the GSAP animation's target properties (x and end point)
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === document.getElementById('section2-wrapper')) {
            trigger.animation.vars.x = newTransformXValue;
            trigger.end = () => "+=" + scrollWidth; // Recalculate end for pinning duration
            trigger.refresh(); // Important: Refresh the ScrollTrigger instance
        }
    });
});

// Initial refresh to ensure calculations are correct on load
ScrollTrigger.refresh();
