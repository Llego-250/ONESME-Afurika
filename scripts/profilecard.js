function profileShowup() {
    const profileCard = document.querySelector('#profileCard');
    const showProfileBtn = document.querySelector('.signin-btn');

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
}