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
        const StoredUsers = [
            {
                fname: 'Ion',
                lname: 'Rusu',
                location: 'Ungheni'
            },
            {
                fname: 'Vasile',
                lname: 'Rotaru',
                location: 'Petresti'
            }
        ];

        const users = StoredUsers;

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

    static clearFields(){
        document.querySelector('#fname').value = '';
        document.querySelector('#lname').value = '';
        document.querySelector('#location').value = '';
    }
}

// Store Class

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
        alert('Please fill in all fields');
    }else{
        // Instantiate user
        const user = new User(fname, lname, location);

        // Add user to list
        UI.addUserToList(user);

        // Clear Fields
        UI.clearFields();
    }
});

// Remove Users
document.querySelector('#user-list').addEventListener('click', (e) => {
    UI.deleteUser(e.target);
});