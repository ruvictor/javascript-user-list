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
        const StoredUsers = [
            {
                id: 1,
                name: 'John',
                location: 'Chicago'
            }
        ];
        const users = StoredUsers;

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

    // clear fields method
    static clearFileds(){
        document.querySelector('#id').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#location').value = '';
    }
}

// Store class

// Event to display users
document.addEventListener('DOMContentLoaded', UI.displayUsers);

// Event to add a user
document.querySelector('#user-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const location = document.querySelector('#location').value;

    // Instantiate user
    const user = new Users(id, name, location);

    // Add user to table
    UI.addUserToList(user);

    // Clear form fields
    UI.clearFileds();

    // console.log(user);
});

// Event to remove a user