function profileShowp() {
    const profileCard = document.querySelector('#profileCard');
    const showProfileBtn = document.querySelector('#signinBtn');

    if (!profileCard || !showProfileBtn) return;

    // Populate the card only once
    if (profileCard.innerHTML.trim() === '') {
        const profileOption = document.createElement('div');
        profileOption.className = 'profile-option';
        profileOption.innerHTML = `
            <span class="profile-icon">👤</span>
            <a href="#profile" class="profile-link">My Profile</a>
        `;

        const logoutOption = document.createElement('div');
        logoutOption.className = 'profile-option';
        logoutOption.innerHTML = `
            <span class="logout-icon">🚪</span>
            <a href="#logout" class="logout-link">Logout</a>
        `;

        profileCard.appendChild(profileOption);
        profileCard.appendChild(logoutOption);
    }

    // Toggle visibility immediately (this function is called by the button's onclick)
    profileCard.classList.toggle('visible');

    console.log('------------------------------------');
    console.log('Profile card toggled. Current HTML:');
    console.log(profileCard.innerHTML);
    console.log('------------------------------------');
}

// expose the function under a consistent name used in index.html
window.profileShowup = profileShowp;

// Attach handlers once on page load so click-away and link handling work
document.addEventListener('DOMContentLoaded', function () {
    const profileCard = document.querySelector('#profileCard');
    const showProfileBtn = document.querySelector('#signinBtn');

    if (!profileCard || !showProfileBtn) return;

    // Close the dropdown when clicking outside the profile area
    document.addEventListener('click', (e) => {
        // If the click target is not inside the profileCard and not the signin button, hide the card
        if (!profileCard.contains(e.target) && !showProfileBtn.contains(e.target)) {
            profileCard.classList.remove('visible');
        }
    });

    // Handle clicks on links inside the profile card (e.g., profile and logout)
    profileCard.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        e.preventDefault();
        const href = link.getAttribute('href');

        if (href === '#profile') {
            // navigate to profile page
            window.location.href = '/static/profile_info.html';
        } else if (href === '#logout') {
            // confirm logout then clear localStorage and redirect
            if (confirm('Are you sure you want to logout?')) {
                localStorage.clear();
                window.location.href = '/static/auth_id.html';
            }
        }

        // close the dropdown after action
        profileCard.classList.remove('visible');
    });
});