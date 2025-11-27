
function profileShowup() {
    const profileCard = document.getElementById('profileCard');
    if (profileCard) {
        profileCard.classList.toggle('visible');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const profileCard = document.getElementById('profileCard');
    const signinBtn = document.getElementById('signinBtn');
    
    if (profileCard && signinBtn) {
        
        document.addEventListener('click', (e) => {
            if (!profileCard.contains(e.target) && !signinBtn.contains(e.target)) {
                profileCard.classList.remove('visible');
            }
        });
        
        
        profileCard.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                if (href === '#profile') {
                    window.location.href = '/static/profile_info.html';
                } else if (href === '#logout') {
                    if (confirm('Are you sure you want to logout?')) {
                        localStorage.clear();
                        window.location.href = '/static/auth_id.html';
                    }
                }
                
                profileCard.classList.remove('visible');
            }
        });
    }
});


window.profileShowup = profileShowup;