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

// Load car details based on URL parameter
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');
    
    // Get car data from search.js
    const car = window.cars.find(c => c.id === parseInt(carId));
    
    if (car) {
        // Update car details
        document.querySelector('.car-title h1').textContent = car.name;
        document.querySelector('.car-title p').textContent = `$${car.price.toLocaleString()}`;
        
        // Update car specifications
        const specs = {
            'Make': car.brand.charAt(0).toUpperCase() + car.brand.slice(1),
            'Model': car.name.split(' ').slice(2).join(' '),
            'Year': car.year,
            'Transmission': car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1),
            'Engine': '2.0L 4-Cylinder',
            'Drivetrain': 'Front-Wheel Drive',
            'Exterior Color': 'Silver'
        };
        
        Object.entries(specs).forEach(([label, value]) => {
            const specItem = Array.from(document.querySelectorAll('.spec-item'))
                .find(item => item.querySelector('.spec-label').textContent === label);
            if (specItem) {
                specItem.querySelector('div:last-child').textContent = value;
            }
        });
        
        // Update features
        const featuresList = document.querySelector('.features-list');
        featuresList.innerHTML = car.features.map(feature => {
            const icon = {
                'leather': 'fa-chair',
                'sunroof': 'fa-sun',
                'navigation': 'fa-map-marker-alt',
                'backup-camera': 'fa-camera',
                'bluetooth': 'fa-bluetooth'
            }[feature] || 'fa-check';
            
            return `<li><i class="fas ${icon}"></i> ${feature.charAt(0).toUpperCase() + feature.slice(1)}</li>`;
        }).join('');
    }

    // Highlight first thumbnail by default
    const firstThumbnail = document.querySelector('.thumbnail');
    if (firstThumbnail) {
        firstThumbnail.style.borderColor = 'var(--primary)';
        firstThumbnail.style.opacity = '1';
    }

    // Add event listeners for buttons
    document.getElementById('contactBtn').addEventListener('click', function() {
        alert('Connecting you to the seller...\n\nDealer: [SellerName]\nPhone: [PhoneNumber]');
    });
    
    document.getElementById('testDriveBtn').addEventListener('click', function() {
        alert('Please select your preferred date and time for a test drive:');
    });
});