// API Configuration
const API_URL = 'http://localhost:3000/api';

// Authentication utilities
const auth = {
    getToken() {
        return localStorage.getItem('token');
    },
    
    setToken(token) {
        localStorage.setItem('token', token);
    },
    
    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    
    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },
    
    isLoggedIn() {
        return !!this.getToken();
    },
    
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    },
    
    updateNavigation() {
        const authLinks = document.querySelectorAll('.auth-links');
        const userLinks = document.querySelectorAll('.user-links');
        
        if (this.isLoggedIn()) {
            authLinks.forEach(el => el.style.display = 'none');
            userLinks.forEach(el => el.style.display = 'flex');
        } else {
            authLinks.forEach(el => el.style.display = 'flex');
            userLinks.forEach(el => el.style.display = 'none');
        }
    }
};

// API fetch wrapper
async function apiFetch(endpoint, options = {}) {
    const token = auth.getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
    };
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Request failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    auth.updateNavigation();
    
    // Setup logout buttons
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => auth.logout());
    });
});
