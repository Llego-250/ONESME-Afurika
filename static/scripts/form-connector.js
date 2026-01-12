// Connect all asset forms to database
document.addEventListener('DOMContentLoaded', function() {
    // Immovable asset forms
    const immovableForms = document.querySelectorAll('.res-form');
    immovableForms.forEach(form => {
        if (form.closest('[href*="immovable"]') || window.location.href.includes('immovable')) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());
                
                // Determine asset type from URL
                if (window.location.href.includes('residential')) data.asset_type = 'residential';
                else if (window.location.href.includes('commercial')) data.asset_type = 'commercial';
                else if (window.location.href.includes('industrial')) data.asset_type = 'industrial';
                else if (window.location.href.includes('lands')) data.asset_type = 'land';
                else if (window.location.href.includes('mines')) data.asset_type = 'mine';
                else if (window.location.href.includes('quarry')) data.asset_type = 'quarry';
                else if (window.location.href.includes('brickyard')) data.asset_type = 'brickyard';
                else if (window.location.href.includes('fish_pond')) data.asset_type = 'fish_pond';
                
                try {
                    const response = await fetch('/api/assets/immovable', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    });
                    const result = await response.json();
                    
                    if (result.success) {
                        alert('Asset saved successfully!');
                        this.reset();
                    } else {
                        alert('Error saving asset');
                    }
                } catch (error) {
                    alert('Connection error');
                }
            });
        }
        
        // Movable asset forms
        if (window.location.href.includes('movable')) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());
                
                if (window.location.href.includes('livestock')) data.asset_type = 'livestock';
                else if (window.location.href.includes('vehicles')) data.asset_type = 'vehicle';
                else if (window.location.href.includes('money')) data.asset_type = 'money';
                else if (window.location.href.includes('other')) data.asset_type = 'other';
                
                try {
                    const response = await fetch('/api/assets/movable', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    });
                    const result = await response.json();
                    
                    if (result.success) {
                        alert('Asset saved successfully!');
                        this.reset();
                    } else {
                        alert('Error saving asset');
                    }
                } catch (error) {
                    alert('Connection error');
                }
            });
        }
        
        // Incorporeal asset forms
        if (window.location.href.includes('incorporeal')) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());
                
                if (window.location.href.includes('shares')) data.asset_type = 'shares';
                else if (window.location.href.includes('debts_owed')) data.asset_type = 'debts_owed';
                else if (window.location.href.includes('debts_own')) data.asset_type = 'debts_own';
                
                try {
                    const response = await fetch('/api/assets/incorporeal', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    });
                    const result = await response.json();
                    
                    if (result.success) {
                        alert('Asset saved successfully!');
                        this.reset();
                    } else {
                        alert('Error saving asset');
                    }
                } catch (error) {
                    alert('Connection error');
                }
            });
        }
    });
});