document.addEventListener('DOMContentLoaded', function () {
    fetchProducts();

    document.getElementById('productForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value)
        };

        fetch('/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                fetchProducts(); // Refresh product list
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});

function fetchProducts() {
    fetch('/api/products/')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#productTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows
            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>${product.description}</td>
                            <td>${product.price}</td>
                            <td>
                                <button onclick="editProduct(${product.id})">Edit</button>
                                <button onclick="deleteProduct(${product.id})">Delete</button>
                            </td>
                        `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function editProduct(id) {
    const newName = prompt('Enter new name:');
    const newDescription = prompt('Enter new description:');
    const newPrice = prompt('Enter new price:');

    if (newName && newDescription && newPrice) {
        fetch(`/api/products/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newName,
                description: newDescription,
                price: parseFloat(newPrice)
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                fetchProducts(); // Refresh product list
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`/api/products/${id}/`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.status === 204) {
                    console.log('Successfully deleted');
                    fetchProducts(); // Refresh product list
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}