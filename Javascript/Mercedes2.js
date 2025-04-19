document.addEventListener('DOMContentLoaded', function() {
    // Image gallery functionality
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Highlight first thumbnail by default
    if (thumbnails.length > 0) {
        thumbnails[0].style.borderColor = 'var(--primary)';
        thumbnails[0].style.opacity = '1';
    }
    
    // Add click event to thumbnails
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Change main image
            mainImage.src = this.src;
            
            // Update active thumbnail
            thumbnails.forEach(thumb => {
                thumb.style.borderColor = 'transparent';
                thumb.style.opacity = '0.8';
            });
            this.style.borderColor = 'var(--primary)';
            this.style.opacity = '1';
        });
    });
    
    // Contact button functionality
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            alert('Connecting you to the seller...\n\nDealer: Mercedes-Benz Egypt\nPhone: 200-187-813');
        });
    }
});