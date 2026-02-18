let inventory = [];
let isEditing = false;

window.onload = function () {
    loadInventory();
};

async function loadInventory() {
    try {
        const response = await fetch('inventory.json');
        if (!response.ok) throw new Error('Failed to load inventory');
        inventory = await response.json();
        renderTable(inventory);
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

function renderTable(data) {
    const tableBody = document.querySelector("#inventoryTable tbody");
    tableBody.innerHTML = "";
    let totalVal = 0;

    data.forEach((prod, index) => {
        const row = document.createElement("tr");

        // Low stock warning logic
        if (prod.stock < 10) {
            row.classList.add("low-stock");
        }

        row.innerHTML = `
            <td>${prod.id}</td>
            <td>${prod.name}</td>
            <td>${prod.category}</td>
            <td>$${parseFloat(prod.price).toFixed(2)}</td>
            <td>${prod.stock} ${prod.stock < 10 ? '<i class="fas fa-exclamation-triangle" title="Low Stock"></i>' : ''}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct('${prod.id}')"><i class="fas fa-edit"></i> Edit</button>
                <button class="action-btn delete-btn" onclick="deleteProduct('${prod.id}')"><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
        totalVal += prod.price * prod.stock;
    });

    document.getElementById("totalValue").innerText = `Total Value: $${totalVal.toFixed(2)}`;
}

function addOrUpdateProduct() {
    const id = document.getElementById("prodId").value.trim();
    const name = document.getElementById("prodName").value.trim();
    const category = document.getElementById("prodCategory").value.trim();
    const price = parseFloat(document.getElementById("prodPrice").value);
    const stock = parseInt(document.getElementById("prodStock").value);

    if (!id || !name || !category || isNaN(price) || isNaN(stock)) {
        showMessage("Please fill all fields correctly", "error");
        return;
    }

    if (isEditing) {
        // Update existing
        const index = inventory.findIndex(p => p.id === id);
        if (index !== -1) {
            inventory[index] = { id, name, category, price, stock };
            showMessage("Product updated successfully", "success");
        } else {
            showMessage("Product not found", "error"); // Should not happen if ID matches
        }
        isEditing = false;
        document.getElementById("actionBtn").innerText = "Add Product";
        document.getElementById("prodId").disabled = false;
    } else {
        // Add new
        if (inventory.some(p => p.id === id)) {
            showMessage("Product ID already exists", "error");
            return;
        }
        inventory.push({ id, name, category, price, stock });
        showMessage("Product added successfully", "success");
    }

    renderTable(inventory);
    clearForm();
}

function editProduct(id) {
    const prod = inventory.find(p => p.id === id);
    if (prod) {
        document.getElementById("prodId").value = prod.id;
        document.getElementById("prodId").disabled = true;
        document.getElementById("prodName").value = prod.name;
        document.getElementById("prodCategory").value = prod.category;
        document.getElementById("prodPrice").value = prod.price;
        document.getElementById("prodStock").value = prod.stock;

        isEditing = true;
        document.getElementById("actionBtn").innerText = "Update Product";
    }
}

function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        inventory = inventory.filter(p => p.id !== id);
        renderTable(inventory);
        showMessage("Product deleted", "success");
    }
}

function searchProduct() {
    const term = document.getElementById("searchTerm").value.toLowerCase();
    const filtered = inventory.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
    renderTable(filtered);
}

function clearForm() {
    document.getElementById("prodId").value = "";
    document.getElementById("prodId").disabled = false;
    document.getElementById("prodName").value = "";
    document.getElementById("prodCategory").value = "";
    document.getElementById("prodPrice").value = "";
    document.getElementById("prodStock").value = "";
    isEditing = false;
    document.getElementById("actionBtn").innerText = "Add Product";
}

function showMessage(msg, type) {
    const msgDiv = document.getElementById("message");
    msgDiv.innerText = msg;
    msgDiv.style.display = "block";
    msgDiv.style.backgroundColor = type === "error" ? "#f8d7da" : "#d4edda";
    msgDiv.style.color = type === "error" ? "#721c24" : "#155724";
    setTimeout(() => msgDiv.style.display = "none", 3000);
}
