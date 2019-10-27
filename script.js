// User Class
class Users {
    constructor(id, name, location){
        this.id = id;
        this.name = name;
        this.location = location;
    }
}

// UI class
class UI {
    static displayUsers(){
        const users = Store.getUsers();

        users.forEach((user) => UI.addUserToList(user));
    }

    static addUserToList(user) {
        const list = document.querySelector('#user-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.location}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
        `;

        list.appendChild(row);
    }

    static deleteUser(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }

    static showNotification(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#user-form');
        container.insertBefore(div, form);

        // remove not in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    // clear fields method
    static clearFileds(){
        document.querySelector('#id').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#location').value = '';
    }
}

// Store class
class Store {
    static getUsers(){
        let users;
        if(localStorage.getItem('users') === null){
            users = [];
        }else{
            users = JSON.parse(localStorage.getItem('users'));
        }

        return users;
    }

    static addUser(user){
        const users = Store.getUsers();

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));
    }

    static removeUser(id){
        const users = Store.getUsers();

        users.forEach((user, index) => {
            if(user.id === id){
                users.splice(index, 1);
            }
        });

        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Event to display users
document.addEventListener('DOMContentLoaded', UI.displayUsers);

// Event to add a user
document.querySelector('#user-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const location = document.querySelector('#location').value;

    // Validate
    if(id === '' || name === '' || location === ''){
        UI.showNotification('All fields are required!', 'danger');
    }else{
        // Instantiate user
        const user = new Users(id, name, location);

        // Add user to table
        UI.addUserToList(user);

        // Add user to storage
        Store.addUser(user);

        // Success not
        UI.showNotification('User added', 'success');

        // Clear form fields
        UI.clearFileds();

        // console.log(user);
    }
});

// Event to remove a user
document.querySelector('#user-list').addEventListener('click', (e) => {

    // delete user from UI
    UI.deleteUser(e.target);

    // delete user from storage
    Store.removeUser(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent)

    UI.showNotification('User Removed', 'success');
});