// Image gallery functionality
function changeImage(element) {
    const mainImage = document.getElementById('mainImage');
    if (!mainImage) {
        console.error('Main image element not found');
        return;
    }
    
    mainImage.src = element.src;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.style.borderColor = 'transparent';
        thumb.style.opacity = '0.8';
    });
    element.style.borderColor = 'var(--primary)';
    element.style.opacity = '1';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Highlight first thumbnail by default
    const firstThumbnail = document.querySelector('.thumbnail');
    if (firstThumbnail) {
        firstThumbnail.style.borderColor = 'var(--primary)';
        firstThumbnail.style.opacity = '1';
    }

    // Add event listeners for buttons
    const contactBtn = document.getElementById('contactBtn');
    const testDriveBtn = document.getElementById('testDriveBtn');

    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            alert('Connecting you to the seller...\n\nDealer: [SellerName]\nPhone: [PhoneNumber]');
        });
    }

    if (testDriveBtn) {
        testDriveBtn.addEventListener('click', function() {
            alert('Please select your preferred date and time for a test drive:');
        });
    }

    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Create dots for each slide
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dots span');

    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
                dots[index].classList.add('active');
            } else {
                slide.classList.remove('active');
                dots[index].classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % 2; // Changed from 3 to 2
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + 2) % 2; // Changed from 3 to 2
        updateSlides();
    }

    // Add event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Initialize the slider
    updateSlides();
}); 