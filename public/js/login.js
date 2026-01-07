// Login page functionality

const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Reset error
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    // Validate
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    // Disable submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        
        // Save token and user
        auth.setToken(data.token);
        auth.setUser(data.user);
        
        // Redirect to dashboard
        window.location.href = '/dashboard.html';
    } catch (error) {
        showError(error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
    }
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

// Redirect if already logged in
if (auth.isLoggedIn()) {
    window.location.href = '/dashboard.html';
}
