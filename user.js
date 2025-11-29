const userForm = document.getElementById('userForm')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const addbtn = document.getElementById('addbtn')
const userTable = document.getElementById('userTable')

let users = JSON.parse(localStorage.getItem('users')) || [];

userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
    };

    users.push(user);
    localStorage.setItem('user', JSON.stringify(users));
    userForm.reset();
    renderUserTable();
});

function renderUserTable() {
    userTable.innerHTML = '';
    users.forEach((u, index) => {
        userTable.innerHTML += `
        <tr>
        <td>${index + 1}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>
        <button class="deletebtn" onclick="deleteUser(${index})">Delete</button>
        <button class="editbtn" onclick="editUser(${index})">Edit</button>
        </td>
        </tr>
        `;
    });
};

function deleteUser(index) {
    users.splice(index, 1);

    localStorage.setItem('users', JSON.stringify(users));
    renderUserTable();
    userForm.reset();
};

function editUser(index) {
    const u = users[index];
    nameInput.value = u.name;
    emailInput.value = u.email;

    addbtn.textContent = 'Update';
    addbtn.onclick = function(e) {
        e.preventDefault();

        u.name = nameInput.value;
        u.email = emailInput.value;

        addbtn.textContent = 'Add';
        addbtn.onclick = null;

        localStorage.setItem('users', JSON.stringify(users));
        userForm.reset();
        renderUserTable();
    };
};

renderUserTable();