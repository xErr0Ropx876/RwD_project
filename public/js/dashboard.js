// Dashboard page functionality

// Check if user is logged in
if (!auth.isLoggedIn()) {
    window.location.href = '/login.html';
}

// Load dashboard data
async function loadDashboard() {
    try {
        const data = await apiFetch('/users/me/dashboard');
        
        displaySavedCollections(data.savedCollections);
        displaySavedResources(data.savedResources);
        displayRecentResources(data.recentResources);
    } catch (error) {
        console.error('Error loading dashboard:', error);
        if (error.message.includes('token') || error.message.includes('Invalid')) {
            auth.logout();
        }
    }
}

// Display saved collections
function displaySavedCollections(collections) {
    const container = document.getElementById('saved-collections');
    
    if (!collections || collections.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No saved collections yet</h3>
                <p>Browse collections and save your favorites</p>
                <a href="/collections.html" class="btn-primary" style="margin-top: 16px;">Browse Collections</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = collections.map(collection => `
        <a href="/collection.html?id=${collection.id}" class="collection-card">
            <h3>${collection.title}</h3>
            <p>${collection.description}</p>
            <div class="collection-meta">
                <span class="tag">${collection.subject}</span>
                <span class="tag">${collection.semester}</span>
            </div>
        </a>
    `).join('');
}

// Display saved resources
function displaySavedResources(resources) {
    const container = document.getElementById('saved-resources');
    
    if (!resources || resources.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No saved resources yet</h3>
                <p>Save resources as you learn</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = resources.map(resource => `
        <a href="/resource.html?id=${resource.id}" class="resource-card">
            <span class="resource-type">${resource.type.replace('_', ' ')}</span>
            <h4>${resource.title}</h4>
            <p>${resource.description}</p>
            <div class="collection-meta">
                ${resource.collection_title ? `<span class="tag">${resource.collection_title}</span>` : ''}
                ${resource.tags ? resource.tags.split(',').slice(0, 3).map(tag => 
                    `<span class="tag">${tag.trim()}</span>`
                ).join('') : ''}
            </div>
        </a>
    `).join('');
}

// Display recent resources
function displayRecentResources(resources) {
    const container = document.getElementById('recent-resources');
    
    if (!resources || resources.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No recent activity</h3>
                <p>Resources you view will appear here</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = resources.map(resource => `
        <a href="/resource.html?id=${resource.id}" class="resource-card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                <span class="resource-type">${resource.type.replace('_', ' ')}</span>
                ${resource.is_completed ? '<span class="tag" style="background: #48bb78; color: white;">Completed</span>' : ''}
            </div>
            <h4>${resource.title}</h4>
            <p>${resource.description}</p>
            <div class="collection-meta">
                ${resource.collection_title ? `<span class="tag">${resource.collection_title}</span>` : ''}
                <span class="tag" style="font-size: 11px;">
                    ${formatDate(resource.last_viewed_at)}
                </span>
            </div>
        </a>
    `).join('');
}

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
});
