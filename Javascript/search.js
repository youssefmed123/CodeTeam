document.addEventListener('DOMContentLoaded', function() {
    // Sample car data
    window.cars = [
        {
            id: 1,
            name: "2023 Mercedes-Benz C-Class",
            price: 45000,
            year: 2023,
            brand: "mercedes",
            transmission: "automatic",
            fuel: "petrol",
            features: ["leather", "sunroof", "navigation", "backup-camera", "bluetooth"],
            image: "https://postcdn.haraj.com.sa/userfiles30/2025-04-01/1179x777_57DD0FD6-A918-4D0C-84DE-30660DF5385A.jpg/900/webp",
            type: "new",
            link: "../Html/Mercedes1.html"
        },
        {
            id: 2,
            name: "2023 Mercedes-Benz A-Class",
            price: 55000,
            year: 2023,
            brand: "mercedes",
            transmission: "automatic",
            fuel: "petrol",
            features: ["leather", "sunroof", "navigation", "backup-camera", "bluetooth"],
            image: "https://images.dubizzle.com.eg/thumbnails/132980303-800x600.webp",
            type: "new",
            link: "../Html/Mercedes2.html"
        },
        {
            id: 3,
            name: "2023 Mercedes-Benz S-Class",
            price: 110000,
            year: 2023,
            brand: "mercedes",
            transmission: "automatic",
            fuel: "petrol",
            features: ["leather", "sunroof", "navigation", "backup-camera", "bluetooth"],
            image: "https://postcdn.haraj.com.sa/userfiles30/2025-04-02/1600x1044_110EC8A4-FAFD-4BD7-95DE-FF6E0F32EB5C.jpg/900/webp",
            type: "new",
            link: "../Html/Mercedes3.html"
        },
        {
            id: 4,
            name: "2023 Mercedes-Benz GLE",
            price: 48000,
            year: 2023,
            brand: "mercedes",
            transmission: "automatic",
            fuel: "petrol",
            features: ["leather", "sunroof", "navigation", "backup-camera", "bluetooth"],
            image: "https://postcdn.haraj.com.sa/userfiles30/2025-03-27/1179x872_BBACE0B0-E106-41D4-9042-EC5ACA3E2F9D.jpg/900/webp",
            type: "new",
            link: "../Html/Mercedes 4.html"
        },
        {
            id: 5,
            name: "2023 Mercedes-Benz GLS",
            price: 58000,
            year: 2023,
            brand: "mercedes",
            transmission: "automatic",
            fuel: "petrol",
            features: ["leather", "sunroof", "navigation", "backup-camera", "bluetooth"],
            image: "//postcdn.haraj.com.sa/userfiles30/2025-03-28/900x675-1_-GO__MTc0MzIwNTAyODMzNDg0ODQ5MjQ1Nw.jpg/900/webp",
            type: "new",
            link: "../Html/Mercedes 5.html"
        },
        {
            id: 6,
            name: "2023 Mercedes-Benz E-Class",
            price: 78000,
            year: 2023,
            brand: "mercedes",
            transmission: "automatic",
            fuel: "petrol",
            features: ["leather", "sunroof", "navigation", "backup-camera", "bluetooth"],
            image: "https://postcdn.haraj.com.sa/userfiles30/2025-04-01/1124x840_DEE5D5B5-6AA7-4BF9-A6DF-D90CA2F3876B.jpg/900/webp",
            type: "new",
            link: "../Html/Mercedes 6.html"
        },
        {
            id: 7,
            name: "2023 Mercedes-Benz GLA",
            price: 120000,
            year: 2023,
            brand: "mercedes",
            transmission: "automatic",
            fuel: "petrol",
            features: ["leather", "sunroof", "navigation", "backup-camera", "bluetooth"],
            image: "https://postcdn.haraj.com.sa/userfiles30/2025-03-21/1280x960_810A3855-1775-43F8-8F02-E8C1D7DC2E6C.jpg/900/webp",
            type: "new",
            link: "../Html/Mercedes 7.html"
        },
        {
            id: 8,
            name: "2023 Mercedes-Benz CLA",
            price: 110000,
            year: 2023,
            brand: "mercedes",
            transmission: "automatic",
            fuel: "petrol",
            features: ["leather", "sunroof", "navigation", "backup-camera", "bluetooth"],
            image: "https://postcdn.haraj.com.sa/userfiles30/2025-03-13/900x548-1_-GO__MTc0MTg5NTYyNzI1MDQxODUzNDI5Mg.jpg/900/webp",
            type: "new",
            link: "../Html/Mercedes 8.html"
        },
        
    ];

    // DOM Elements
    const filterForm = document.querySelector('.filters-sidebar');
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const clearAllBtn = document.querySelector('.clear-all');
    const filterTags = document.querySelector('.filter-tags');
    const sortSelect = document.getElementById('sort-by');
    const carGrid = document.querySelector('.car-grid');
    const resultCount = document.getElementById('result-count');

    // State
    let currentFilters = {
        price: { min: null, max: null },
        year: { min: null, max: null },
        brands: [],
        transmissions: [],
        fuel: [],
        features: [],
        type: null
    };

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const carType = urlParams.get('type');
    
    // Highlight active navigation item
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === `/search.html?type=${carType}`) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
    
    if (carType === 'used' || carType === 'new') {
        currentFilters.type = carType;
        // Pre-select the appropriate car type filter
        const typeCheckbox = document.querySelector(`input[value="${carType}"]`);
        if (typeCheckbox) {
            typeCheckbox.checked = true;
        }
        // Apply the filter immediately
        applyFilters();
    }

    // Event Listeners
    applyFiltersBtn.addEventListener('click', applyFilters);
    clearFiltersBtn.addEventListener('click', clearFilters);
    clearAllBtn.addEventListener('click', clearAllFilters);
    sortSelect.addEventListener('change', handleSort);

    // Initialize display
    displayCars(window.cars);

    function applyFilters() {
        // Get filter values
        currentFilters.price.min = document.getElementById('min-price').value;
        currentFilters.price.max = document.getElementById('max-price').value;
        currentFilters.year.min = document.getElementById('min-year').value;
        currentFilters.year.max = document.getElementById('max-year').value;
        
        // Get car type filter
        const usedCarsCheckbox = document.querySelector('input[value="used"]');
        const newCarsCheckbox = document.querySelector('input[value="new"]');
        
        if (usedCarsCheckbox && usedCarsCheckbox.checked) {
            currentFilters.type = 'used';
        } else if (newCarsCheckbox && newCarsCheckbox.checked) {
            currentFilters.type = 'new';
        } else {
            currentFilters.type = null;
        }
        
        // Get checkbox values
        currentFilters.brands = Array.from(document.querySelectorAll('input[type="checkbox"][value="hyundai"], input[type="checkbox"][value="toyota"], input[type="checkbox"][value="nissan"], input[type="checkbox"][value="honda"], input[type="checkbox"][value="ford"]'))
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        currentFilters.transmissions = Array.from(document.querySelectorAll('input[type="checkbox"][value="automatic"], input[type="checkbox"][value="manual"], input[type="checkbox"][value="cvt"]'))
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        currentFilters.fuel = Array.from(document.querySelectorAll('input[type="checkbox"][value="petrol"], input[type="checkbox"][value="diesel"], input[type="checkbox"][value="electric"], input[type="checkbox"][value="hybrid"]'))
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        currentFilters.features = Array.from(document.querySelectorAll('input[type="checkbox"][value="leather"], input[type="checkbox"][value="sunroof"], input[type="checkbox"][value="navigation"], input[type="checkbox"][value="backup-camera"], input[type="checkbox"][value="bluetooth"]'))
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Filter and display cars
        const filteredCars = filterCars(window.cars);
        displayCars(filteredCars);
        updateFilterTags();
    }

    function filterCars(cars) {
        return cars.filter(car => {
            // Price filter
            if (currentFilters.price.min && car.price < currentFilters.price.min) return false;
            if (currentFilters.price.max && car.price > currentFilters.price.max) return false;

            // Year filter
            if (currentFilters.year.min && car.year < currentFilters.year.min) return false;
            if (currentFilters.year.max && car.year > currentFilters.year.max) return false;

            // Brand filter
            if (currentFilters.brands.length > 0 && !currentFilters.brands.includes(car.brand)) return false;

            // Transmission filter
            if (currentFilters.transmissions.length > 0 && !currentFilters.transmissions.includes(car.transmission)) return false;

            // Fuel filter
            if (currentFilters.fuel.length > 0 && !currentFilters.fuel.includes(car.fuel)) return false;

            // Features filter
            if (currentFilters.features.length > 0) {
                return currentFilters.features.every(feature => car.features.includes(feature));
            }

            // Type filter
            if (currentFilters.type && car.type !== currentFilters.type) return false;

            return true;
        });
    }

    function displayCars(cars) {
        carGrid.innerHTML = '';
        resultCount.textContent = cars.length;

        cars.forEach(car => {
            const carElement = createCarElement(car);
            carGrid.appendChild(carElement);
        });
    }

    function createCarElement(car) {
        const article = document.createElement('article');
        article.className = 'car-item';
        article.innerHTML = `
            <img src="${car.image}" alt="${car.name}" width="300" height="200">
            <div class="car-details">
                <h3>${car.name}</h3>
                <p class="price">$${car.price.toLocaleString()}</p>
                <a href="${car.link || `/DetailsCars.html?id=${car.id}`}" class="view-details">View Details</a>
            </div>
        `;
        return article;
    }

    function updateFilterTags() {
        filterTags.innerHTML = '';
        
        // Add car type tag
        if (currentFilters.type) {
            const typeTag = document.createElement('span');
            typeTag.className = 'filter-tag';
            typeTag.innerHTML = `Type: ${currentFilters.type.charAt(0).toUpperCase() + currentFilters.type.slice(1)} Cars <i class="fas fa-times"></i>`;
            filterTags.appendChild(typeTag);
        }
        
        if (currentFilters.price.min || currentFilters.price.max) {
            const priceTag = document.createElement('span');
            priceTag.className = 'filter-tag';
            priceTag.innerHTML = `Price: $${currentFilters.price.min || '0'} - $${currentFilters.price.max || '∞'} <i class="fas fa-times"></i>`;
            filterTags.appendChild(priceTag);
        }

        if (currentFilters.year.min || currentFilters.year.max) {
            const yearTag = document.createElement('span');
            yearTag.className = 'filter-tag';
            yearTag.innerHTML = `Year: ${currentFilters.year.min || '1900'} - ${currentFilters.year.max || '2024'} <i class="fas fa-times"></i>`;
            filterTags.appendChild(yearTag);
        }

        // Add other filter tags...
    }

    function clearFilters() {
        // Reset all filter inputs
        document.getElementById('min-price').value = '';
        document.getElementById('max-price').value = '';
        document.getElementById('min-year').value = '';
        document.getElementById('max-year').value = '';
        
        // Uncheck all checkboxes
        document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        // Reset filter state
        currentFilters = {
            price: { min: null, max: null },
            year: { min: null, max: null },
            brands: [],
            transmissions: [],
            fuel: [],
            features: [],
            type: null
        };

        // Update display
        displayCars(window.cars);
        updateFilterTags();
    }

    function clearAllFilters() {
        clearFilters();
        filterTags.innerHTML = '';
    }

    function handleSort() {
        const sortValue = sortSelect.value;
        const sortedCars = [...window.cars].sort((a, b) => {
            switch(sortValue) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'year-new':
                    return b.year - a.year;
                case 'year-old':
                    return a.year - b.year;
                default:
                    return 0;
            }
        });
        displayCars(sortedCars);
    }
}); 