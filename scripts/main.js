// Main interactive functionality for the application
document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initNavigation();
    initProfileCard();
    initDashboard();
});

// Sidebar functionality
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const collapseBtn = document.getElementById('collapseBtn');
    
    if (collapseBtn && sidebar) {
        collapseBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Submenu toggle
    document.querySelectorAll('.menu-item > a').forEach(link => {
        link.addEventListener('click', (e) => {
            const parent = link.parentElement;
            const submenu = parent.querySelector('.submenu');
            
            if (submenu) {
                e.preventDefault();
                
                // Close other open submenus
                document.querySelectorAll('.menu-item.active').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current submenu
                parent.classList.toggle('active');
            }
        });
    });
}

// Navigation functionality
function initNavigation() {
    const menuItems = document.querySelectorAll('.menu-item a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            
            // Handle navigation based on href
            if (href && href !== '#' && !item.closest('.menu-item').querySelector('.submenu')) {
                // Navigate to page only if it's not a submenu parent
                navigateToPage(href);
            }
        });
    });
}

// Profile card functionality
function initProfileCard() {
    const profileCard = document.getElementById('profileCard');
    const signinBtn = document.getElementById('signinBtn');
    
    if (profileCard && signinBtn) {
        // Close profile card when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileCard.contains(e.target) && !signinBtn.contains(e.target)) {
                profileCard.classList.remove('visible');
            }
        });
        
        // Handle profile actions
        profileCard.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                if (href === '#profile') {
                    navigateToPage('profile_info.html');
                } else if (href === '#logout') {
                    handleLogout();
                }
                
                profileCard.classList.remove('visible');
            }
        });
    }
}

// Dashboard functionality
function initDashboard() {
    // Animate welcome message
    const welcomeMsg = document.getElementById('usr_name');
    if (welcomeMsg) {
        welcomeMsg.style.opacity = '0';
        setTimeout(() => {
            welcomeMsg.style.transition = 'opacity 0.5s ease';
            welcomeMsg.style.opacity = '1';
        }, 100);
    }
    
    // Add click handlers for asset cards
    addAssetCardHandlers();
}

// Asset card handlers
function addAssetCardHandlers() {
    const assetLinks = document.querySelectorAll('.menu-item a');
    
    assetLinks.forEach(link => {
        const text = link.querySelector('.text')?.textContent;
        
        if (text === 'Movable Asset') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showAssetOptions('movable');
            });
        }
    });
}

// Show asset options modal
function showAssetOptions(assetType) {
    const modal = createModal(assetType);
    document.body.appendChild(modal);
    
    setTimeout(() => modal.classList.add('visible'), 10);
}

// Create modal for asset options
function createModal(assetType) {
    const modal = document.createElement('div');
    modal.className = 'asset-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${assetType.charAt(0).toUpperCase() + assetType.slice(1)} Asset Options</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${getAssetOptions(assetType)}
            </div>
        </div>
    `;
    
    // Close modal handlers
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
    
    return modal;
}

// Get asset options based on type
function getAssetOptions(assetType) {
    if (assetType === 'movable') {
        return `
            <div class="asset-options">
                <button class="asset-option" onclick="showComingSoon()">
                    <span class="option-icon">🚗</span>
                    <span class="option-text">Vehicles</span>
                </button>
                <button class="asset-option" onclick="showComingSoon()">
                    <span class="option-icon">💎</span>
                    <span class="option-text">Jewelry & Valuables</span>
                </button>
                <button class="asset-option" onclick="showComingSoon()">
                    <span class="option-icon">🖥️</span>
                    <span class="option-text">Electronics</span>
                </button>
            </div>
        `;
    }
    return '';
}

// Close modal
function closeModal(modal) {
    modal.classList.remove('visible');
    setTimeout(() => modal.remove(), 300);
}

// Navigation function
function navigateToPage(page) {
    // Simple page navigation - in a real app, this would use a router
    if (page.startsWith('immovable/')) {
        window.location.href = `/static/${page}`;
    } else if (page.endsWith('.html')) {
        window.location.href = `/static/${page}`;
    } else {
        console.log(`Navigating to: ${page}`);
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear any stored data
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to login
        window.location.href = '/static/auth_id.html';
    }
}

// Show coming soon message
function showComingSoon() {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = 'Coming soon!';
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Global functions for onclick handlers
window.navigateToPage = navigateToPage;
window.showComingSoon = showComingSoon;