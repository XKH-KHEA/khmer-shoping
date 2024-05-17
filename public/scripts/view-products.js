document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('products');

    // Fetch and display products
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <div class="product-details">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p><strong>Price:</strong> $${product.price}</p>
                        <p><strong>Category:</strong> ${product.category}</p>
                    </div>
                `;
                productCard.addEventListener('click', () => {
                    window.location.href = `buy-product.html?id=${product._id}`;
                });
                productContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error:', error));
});
