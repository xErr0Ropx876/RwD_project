// Collection detail page functionality

let currentCollection = null;

// Get collection ID from URL
function getCollectionId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Load collection details
async function loadCollection() {
    const collectionId = getCollectionId();
    
    if (!collectionId) {
        window.location.href = '/collections.html';
        return;
    }
    
    const detailContainer = document.getElementById('collection-detail');
    const resourcesSection = document.getElementById('resources-section');
    const resourcesList = document.getElementById('resources-list');
    
    try {
        const collection = await apiFetch(`/collections/${collectionId}`);
        currentCollection = collection;
        
        // Display collection details
        detailContainer.innerHTML = `
            <h1>${collection.title}</h1>
            <p>${collection.description}</p>
            <div class="collection-meta">
                ${collection.is_featured ? '<span class="tag featured">Featured</span>' : ''}
                <span class="tag">${collection.subject}</span>
                <span class="tag">${collection.semester}</span>
            </div>
            ${auth.isLoggedIn() ? `
                <div class="collection-actions">
                    <button class="btn-primary" onclick="toggleSaveCollection()">
                        Save Collection
                    </button>
                </div>
            ` : ''}
        `;
        
        // Display resources
        if (collection.resources && collection.resources.length > 0) {
            resourcesSection.style.display = 'block';
            resourcesList.innerHTML = collection.resources.map(resource => `
                <a href="/resource.html?id=${resource.id}" class="resource-card">
                    <span class="resource-type">${resource.type.replace('_', ' ')}</span>
                    <h4>${resource.title}</h4>
                    <p>${resource.description}</p>
                    <div class="collection-meta">
                        ${resource.tags ? resource.tags.split(',').map(tag => 
                            `<span class="tag">${tag.trim()}</span>`
                        ).join('') : ''}
                    </div>
                </a>
            `).join('');
        } else {
            resourcesSection.style.display = 'block';
            resourcesList.innerHTML = '<p class="empty-state">No resources available in this collection yet.</p>';
        }
    } catch (error) {
        detailContainer.innerHTML = '<p class="empty-state">Failed to load collection.</p>';
        console.error('Error loading collection:', error);
    }
}

// Toggle save collection
async function toggleSaveCollection() {
    if (!auth.isLoggedIn()) {
        window.location.href = '/login.html';
        return;
    }
    
    try {
        const result = await apiFetch('/users/me/saved-collections', {
            method: 'POST',
            body: JSON.stringify({ collection_id: currentCollection.id })
        });
        
        alert(result.message);
    } catch (error) {
        alert('Failed to save collection. Please try again.');
        console.error('Error saving collection:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCollection();
});
