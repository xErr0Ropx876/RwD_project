// Collections page functionality

let allCollections = [];

// Load all collections
async function loadCollections(filters = {}) {
    const container = document.getElementById('collections-list');
    container.innerHTML = '<div class="loading">Loading collections...</div>';
    
    try {
        // Build query string
        const queryParams = new URLSearchParams();
        if (filters.subject) queryParams.append('subject', filters.subject);
        if (filters.semester) queryParams.append('semester', filters.semester);
        if (filters.search) queryParams.append('search', filters.search);
        
        const queryString = queryParams.toString();
        const endpoint = `/collections${queryString ? '?' + queryString : ''}`;
        
        const collections = await apiFetch(endpoint);
        allCollections = collections;
        
        displayCollections(collections);
    } catch (error) {
        container.innerHTML = '<p class="empty-state">Failed to load collections.</p>';
        console.error('Error loading collections:', error);
    }
}

// Display collections
function displayCollections(collections) {
    const container = document.getElementById('collections-list');
    
    if (collections.length === 0) {
        container.innerHTML = '<p class="empty-state">No collections found.</p>';
        return;
    }
    
    container.innerHTML = collections.map(collection => `
        <a href="/collection.html?id=${collection.id}" class="collection-card">
            <h3>${collection.title}</h3>
            <p>${collection.description}</p>
            <div class="collection-meta">
                ${collection.is_featured ? '<span class="tag featured">Featured</span>' : ''}
                <span class="tag">${collection.subject}</span>
                <span class="tag">${collection.semester}</span>
            </div>
        </a>
    `).join('');
}

// Apply filters
function applyFilters() {
    const search = document.getElementById('search-input').value.trim();
    const subject = document.getElementById('subject-filter').value;
    const semester = document.getElementById('semester-filter').value;
    
    const filters = {};
    if (search) filters.search = search;
    if (subject) filters.subject = subject;
    if (semester) filters.semester = semester;
    
    loadCollections(filters);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCollections();
    
    // Setup filter button
    const applyBtn = document.getElementById('apply-filters');
    applyBtn.addEventListener('click', applyFilters);
    
    // Setup search on Enter key
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });
});
