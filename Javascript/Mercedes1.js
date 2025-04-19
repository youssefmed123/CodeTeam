// Change main image when thumbnail is clicked
function changeImage(element) {
    document.getElementById('mainImage').src = element.src;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.style.borderColor = 'transparent';
        thumb.style.opacity = '0.8';
    });
    element.style.borderColor = 'var(--primary)';
    element.style.opacity = '1';
}

// Highlight first thumbnail by default
document.addEventListener('DOMContentLoaded', function() {
    const firstThumbnail = document.querySelector('.thumbnail');
    if (firstThumbnail) {
        firstThumbnail.style.borderColor = 'var(--primary)';
        firstThumbnail.style.opacity = '1';
    }
    
    // Add contact button event listener
    const contactBtn = document.querySelector('.btn-primary');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            alert('Connecting you to the seller...\n\nDealer: Mercedes-Benz Egypt\nPhone: 200-187-813');
        });
    }
});