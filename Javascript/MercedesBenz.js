function openPage(model) {
    window.location.href = model + '.html';
}

function sortByName() {
    const container = document.querySelector('.container');
    const boxes = Array.from(container.querySelectorAll('.box'));
    
    boxes.sort((a, b) => {
        const nameA = a.dataset.name.toLowerCase();
        const nameB = b.dataset.name.toLowerCase();
        return nameA.localeCompare(nameB);
    });
    
    boxes.forEach(box => container.appendChild(box));
}

function sortByPrice(order) {
    const container = document.querySelector('.container');
    const boxes = Array.from(container.querySelectorAll('.box'));
    
    boxes.sort((a, b) => {
        const priceA = parseInt(a.dataset.price);
        const priceB = parseInt(b.dataset.price);
        return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
    
    boxes.forEach(box => container.appendChild(box));
}

function sortByYear(order) {
    const container = document.querySelector('.container');
    const boxes = Array.from(container.querySelectorAll('.box'));
    
    boxes.sort((a, b) => {
        const yearA = parseInt(a.dataset.year);
        const yearB = parseInt(b.dataset.year);
        return order === 'asc' ? yearA - yearB : yearB - yearA;
    });
    
    boxes.forEach(box => container.appendChild(box));
} 