// Load sidebar component
function loadSidebar() {
    fetch('/components/sidebar.html')
        .then(response => response.text())
        .then(html => {
            const sidebarContainer = document.getElementById('sidebar-container');
            if (sidebarContainer) {
                sidebarContainer.innerHTML = html;
                initSidebarEvents();
            }
        })
        .catch(error => console.error('Error loading sidebar:', error));
}

// Initialize sidebar events
function initSidebarEvents() {
    const sidebar = document.getElementById('sidebar');
    const collapseBtn = document.getElementById('collapseBtn');
    
    if (collapseBtn) {
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
    
    // Mobile responsive
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    });
}

// Load sidebar when DOM is ready
document.addEventListener('DOMContentLoaded', loadSidebar);