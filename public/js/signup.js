// Signup page functionality

const form = document.getElementById('signup-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Reset error
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    // Validate
    if (!name || !email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    // Disable submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Account...';
    
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Signup failed');
        }
        
        // Save token and user
        auth.setToken(data.token);
        auth.setUser(data.user);
        
        // Redirect to dashboard
        window.location.href = '/dashboard.html';
    } catch (error) {
        showError(error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
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
