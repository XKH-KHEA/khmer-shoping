document.addEventListener('DOMContentLoaded', () => {
    const productDetails = document.getElementById('product-details');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <div class="product-details">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p><strong>Price:</strong> $${product.price}</p>
                        <p><strong>Category:</strong> ${product.category}</p>
                        <button id="buy-button">Buy Now</button>
                    </div>
                `;
                productDetails.appendChild(productCard);

                const buyButton = document.getElementById('buy-button');
                buyButton.addEventListener('click', () => {
                    alert('Product purchased!');
                });
            })
            .catch(error => console.error('Error:', error));
    } else {
        productDetails.innerHTML = '<p>Product not found.</p>';
    }
});
