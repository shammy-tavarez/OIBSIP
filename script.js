if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

checkAuth();

function showRegister() {
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('registerContainer').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('registerContainer').classList.add('hidden');
    document.getElementById('loginContainer').classList.remove('hidden');
}

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    const existingUser = users.find(user => user.username === username);
    
    if (existingUser) {
        document.getElementById('regError').textContent = 'Username already exists!';
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('regError').textContent = '';
        showLogin();
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        sessionStorage.setItem('authenticated', username);
        checkAuth();
    } else {
        document.getElementById('loginError').textContent = 'Invalid credentials!';
    }
});

function checkAuth() {
    const authenticatedUser = sessionStorage.getItem('authenticated');
    if (authenticatedUser) {
        document.getElementById('registerContainer').classList.add('hidden');
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('securedPage').classList.remove('hidden');
        document.getElementById('loggedInUser').textContent = authenticatedUser;
    } else {
        document.getElementById('securedPage').classList.add('hidden');
        showLogin();
    }
}

function logout() {
    sessionStorage.removeItem('authenticated');
    checkAuth();
}