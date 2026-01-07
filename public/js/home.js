// Home page functionality

// Load popular collections
async function loadPopularCollections() {
    const container = document.getElementById('popular-collections');
    
    try {
        const collections = await apiFetch('/collections?is_featured=true');
        
        if (collections.length === 0) {
            container.innerHTML = '<p class="empty-state">No collections available yet.</p>';
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
    } catch (error) {
        container.innerHTML = '<p class="empty-state">Failed to load collections.</p>';
        console.error('Error loading collections:', error);
    }
}

// Load trending resources
async function loadTrendingResources() {
    const container = document.getElementById('trending-resources');
    
    try {
        const resources = await apiFetch('/resources/trending');
        
        if (resources.length === 0) {
            container.innerHTML = '<p class="empty-state">No resources available yet.</p>';
            return;
        }
        
        container.innerHTML = resources.map(resource => `
            <a href="/resource.html?id=${resource.id}" class="resource-card">
                <span class="resource-type">${resource.type.replace('_', ' ')}</span>
                <h4>${resource.title}</h4>
                <p>${resource.description}</p>
                <div class="collection-meta">
                    <span class="tag">${resource.subject}</span>
                    ${resource.tags ? resource.tags.split(',').map(tag => 
                        `<span class="tag">${tag.trim()}</span>`
                    ).join('') : ''}
                </div>
            </a>
        `).join('');
    } catch (error) {
        container.innerHTML = '<p class="empty-state">Failed to load resources.</p>';
        console.error('Error loading resources:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPopularCollections();
    loadTrendingResources();
});
