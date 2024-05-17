document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('add-product-form');
    const productList = document.getElementById('product-list');

    // Fetch and display products
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const listItem = document.createElement('li');
                listItem.textContent = `${product.name} - $${product.price}`;
                productList.appendChild(listItem);
            });
        });

    // Handle form submission
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(productForm);
        const productData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            category: formData.get('category'),
            imageUrl: formData.get('imageUrl')
        };

        fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(response => response.json())
        .then(newProduct => {
            const listItem = document.createElement('li');
            listItem.textContent = `${newProduct.name} - $${newProduct.price}`;
            productList.appendChild(listItem);
            productForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });
});
