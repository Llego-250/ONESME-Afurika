async function updateAssetCounters() {
    try {
        const response = await fetch('/api/assets/count');
        const data = await response.json();
        
        // Update Business Asset counter
        const businessBadge = document.querySelector('a[href="/static/business_asset.html"] .badge');
        if (businessBadge) {
            businessBadge.textContent = data.business_assets || 0;
        }
        
        // Update Sold Asset counter
        const soldBadge = document.querySelector('a[href="/static/sold_asset.html"] .badge');
        if (soldBadge) {
            soldBadge.textContent = data.sold_assets || 0;
        }
    } catch (error) {
        console.error('Failed to update counters:', error);
    }
}

// Update counters when page loads
document.addEventListener('DOMContentLoaded', updateAssetCounters);

// Update counters every 30 seconds
setInterval(updateAssetCounters, 30000);