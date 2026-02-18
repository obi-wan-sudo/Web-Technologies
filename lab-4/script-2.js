const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const loadingIndicator = document.getElementById('loading');
let debounceTimeout;

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    // Clear previous timeout (Debouncing)
    clearTimeout(debounceTimeout);

    if (query.length === 0) {
        resultsContainer.innerHTML = '';
        return;
    }

    loadingIndicator.style.display = 'block';
    resultsContainer.innerHTML = '';

    // Set new timeout
    debounceTimeout = setTimeout(() => {
        fetchProducts(query);
    }, 500); // 500ms delay
});

function fetchProducts(query) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            loadingIndicator.style.display = 'none';
            if (this.status == 200) {
                const products = JSON.parse(this.responseText);
                filterAndDisplay(products, query);
            } else {
                resultsContainer.innerHTML = '<div class="no-results">Error fetching data.</div>';
            }
        }
    };
    xhr.open("GET", "products.json", true); // In a real scenario, query param would be sent to server
    xhr.send();
}

function filterAndDisplay(products, query) {
    // Client-side filtering to mimic server-side search
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `<div class="no-results">No results found for "${query}"</div>`;
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <div class="product-name">${product.name}</div>
            <div class="product-category">${product.category}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
        `;
        resultsContainer.appendChild(card);
    });
}
