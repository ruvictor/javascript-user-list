// User Class
class User {
    constructor(fname,lname,location) {
        this.fname = fname;
        this.lname = lname;
        this.location = location;
    }
}

// UI Class
class UI {
    static displayUsers(){
        const users = Store.getUsers();

        users.forEach((user) => UI.addUserToList(user));
    }

    static addUserToList(user){
        const list = document.querySelector('#user-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.fname}</td>
            <td>${user.lname}</td>
            <td>${user.location}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
        `;

        list.appendChild(row);
    }

    static deleteUser(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
        }
    }

    static showAlerts(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#user-form');
        container.insertBefore(div, form);

        // Remove after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector('#fname').value = '';
        document.querySelector('#lname').value = '';
        document.querySelector('#location').value = '';
    }
}

// Store Class
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

    static removeUser(location){
        const users = Store.getUsers();
        users.forEach((user, index) => {
            if(user.location === location){
                users.splice(index, 1);
            }
        });

        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Display User
document.addEventListener('DOMContentLoaded', UI.displayUsers);

// Add User
document.querySelector('#user-form').addEventListener('submit', (e) => {
    // prevent actual sumit
    e.preventDefault();
    // get form values
    const fname = document.querySelector('#fname').value;
    const lname = document.querySelector('#lname').value;
    const location = document.querySelector('#location').value;

    // Validate
    if(fname === '' || lname === '' || location === ''){
        UI.showAlerts('Please fill in all fields', 'danger');
    }else{
        // Instantiate user
        const user = new User(fname, lname, location);

        // Add user to list
        UI.addUserToList(user);

        // Add user to store
        Store.addUser(user);

        // Show success message
        UI.showAlerts('User added', 'success');

        // Clear Fields
        UI.clearFields();
    }
});

// Remove Users
document.querySelector('#user-list').addEventListener('click', (e) => {
    // Remove user from UI
    UI.deleteUser(e.target);

    // Remove user from store
    Store.removeUser(e.target.parentElement.previousElementSibling.textContent);

    // Show success message
    UI.showAlerts('User removed', 'success');
});