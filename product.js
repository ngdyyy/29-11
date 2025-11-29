const productForm = document.getElementById('productForm')
const nameInput = document.getElementById('name')
const priceInput = document.getElementById('price')
const addbtn = document.getElementById('addbtn')
const productTable = document.getElementById('productTable')

let products = JSON.parse(localStorage.getItem('products')) || [];

productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const product = {
        name: nameInput.value.trim(),
        price: priceInput.value.trim()
    };

    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    productForm.reset();
    renderProductTable();
});

function renderProductTable() {
    productTable.innerHTML = '';
    products.forEach((p, index) => {
        productTable.innerHTML += `
        <tr>
        <td>${index + 1}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>
        <button class="deletebtn" onclick="deleteProdcut(${index})">Delete</button>
        <button class="editbtn" onclick="editProduct(${index})">Edit</button>
        </td>
        </tr>
        `;
    });
};

function deleteProdcut(index) {
    products.splice(index, 1);

    localStorage.setItem('products', JSON.stringify(products));
    productForm.reset();
    renderProductTable();
};

function editProduct(index) {
    const p = products[index];
    nameInput.value = p.name;
    priceInput.value = p.price;

    addbtn.textContent = 'Update';
    addbtn.onclick = function(e) {
        e.preventDefault();

        p.name = nameInput.value;
        p.price = priceInput.value;

        addbtn.textContent = 'Add'
        addbtn.onclick = null;

        localStorage.setItem('products', JSON.stringify(products));
        productForm.reset();
        renderProductTable();
    };
};

renderProductTable();