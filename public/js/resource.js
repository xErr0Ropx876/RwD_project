// Resource detail page functionality

let currentResource = null;

// Get resource ID from URL
function getResourceId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Load resource details
async function loadResource() {
    const resourceId = getResourceId();
    
    if (!resourceId) {
        window.location.href = '/collections.html';
        return;
    }
    
    const detailContainer = document.getElementById('resource-detail');
    const backLink = document.getElementById('back-link');
    
    try {
        const resource = await apiFetch(`/resources/${resourceId}`);
        currentResource = resource;
        
        // Update back link
        if (resource.collection_id) {
            backLink.href = `/collection.html?id=${resource.collection_id}`;
        } else {
            backLink.href = '/collections.html';
        }
        
        // Update progress if logged in
        if (auth.isLoggedIn()) {
            updateProgress(resourceId, false);
        }
        
        // Display resource details
        detailContainer.innerHTML = `
            <h1>${resource.title}</h1>
            <p>${resource.description}</p>
            
            <div class="collection-meta">
                <span class="resource-type">${resource.type.replace('_', ' ')}</span>
                ${resource.collection_title ? `<span class="tag">${resource.collection_title}</span>` : ''}
                ${resource.subject ? `<span class="tag">${resource.subject}</span>` : ''}
                ${resource.semester ? `<span class="tag">${resource.semester}</span>` : ''}
            </div>
            
            ${resource.tags ? `
                <div class="collection-meta" style="margin-top: 16px;">
                    ${resource.tags.split(',').map(tag => 
                        `<span class="tag">${tag.trim()}</span>`
                    ).join('')}
                </div>
            ` : ''}
            
            <div class="resource-actions">
                ${resource.url && resource.url !== '#' ? `
                    <a href="${resource.url}" class="btn-primary" target="_blank">
                        ${resource.type === 'pdf' ? 'Open PDF' : 'Open Resource'}
                    </a>
                ` : ''}
                
                ${auth.isLoggedIn() ? `
                    <button class="btn-primary" onclick="toggleSaveResource()">
                        Save Resource
                    </button>
                    <button class="btn-secondary" onclick="markCompleted()">
                        Mark as Completed
                    </button>
                ` : `
                    <a href="/login.html" class="btn-primary">Login to Save</a>
                `}
            </div>
        `;
    } catch (error) {
        detailContainer.innerHTML = '<p class="empty-state">Failed to load resource.</p>';
        console.error('Error loading resource:', error);
    }
}

// Toggle save resource
async function toggleSaveResource() {
    if (!auth.isLoggedIn()) {
        window.location.href = '/login.html';
        return;
    }
    
    try {
        const result = await apiFetch('/users/me/saved-resources', {
            method: 'POST',
            body: JSON.stringify({ resource_id: currentResource.id })
        });
        
        alert(result.message);
    } catch (error) {
        alert('Failed to save resource. Please try again.');
        console.error('Error saving resource:', error);
    }
}

// Mark resource as completed
async function markCompleted() {
    if (!auth.isLoggedIn()) {
        window.location.href = '/login.html';
        return;
    }
    
    try {
        await updateProgress(currentResource.id, true);
        alert('Resource marked as completed!');
    } catch (error) {
        alert('Failed to update progress. Please try again.');
        console.error('Error updating progress:', error);
    }
}

// Update resource progress
async function updateProgress(resourceId, isCompleted) {
    if (!auth.isLoggedIn()) return;
    
    try {
        await apiFetch('/users/me/progress', {
            method: 'POST',
            body: JSON.stringify({ 
                resource_id: resourceId, 
                is_completed: isCompleted 
            })
        });
    } catch (error) {
        console.error('Error updating progress:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadResource();
});
