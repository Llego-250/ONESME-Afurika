// /*
// 	profile-dropdown.js (deprecated shim)

// 	This file used to implement a profile toggle. The project now uses
// 	`scripts/profilecard.js`. Keep this file as a backwards-compatible shim
// 	that won't overwrite the `profileShowup` function that `profilecard.js`
// 	exposes. If `profileShowup` is missing (older pages), provide a minimal
// 	fallback.
// */

// if (!window.profileShowup) {
// 	// Minimal fallback implementation (keeps behavior consistent)
// 	window.profileShowup = function () {
// 		const profileCard = document.getElementById('profileCard');
// 		if (profileCard) profileCard.classList.toggle('visible');
// 	};

// 	document.addEventListener('DOMContentLoaded', function () {
// 		const profileCard = document.getElementById('profileCard');
// 		const signinBtn = document.getElementById('signinBtn');
// 		if (!profileCard || !signinBtn) return;

// 		document.addEventListener('click', function (e) {
// 			if (!profileCard.contains(e.target) && !signinBtn.contains(e.target)) {
// 				profileCard.classList.remove('visible');
// 			}
// 		});

// 		profileCard.addEventListener('click', function (e) {
// 			const link = e.target.closest('a');
// 			if (!link) return;
// 			e.preventDefault();
// 			const href = link.getAttribute('href');
// 			if (href === '#profile') window.location.href = '/static/profile_info.html';
// 			if (href === '#logout' && confirm('Are you sure you want to logout?')) {
// 				localStorage.clear();
// 				window.location.href = '/static/auth_id.html';
// 			}
// 			profileCard.classList.remove('visible');
// 		});
// 	});
// } else {
// 	console.info('profile-dropdown.js: profileShowup already defined (profilecard.js will be used). Shim left in place.');
// }

// // function profileShowup() {
// //     const profileCard = document.getElementById('profileCard');
// //     if (profileCard) {
// //         profileCard.classList.toggle('visible');
// //     }

// //     document.addEventListener('DOMContentLoaded', function() {
// //     const profileCard = document.getElementById('profileCard');
// //     const signinBtn = document.getElementById('signinBtn');
    
// //     if (profileCard && signinBtn) {
        
// //         document.addEventListener('click', (e) => {
// //             if (!profileCard.contains(e.target) && !signinBtn.contains(e.target)) {
// //                 profileCard.classList.remove('visible');
// //             }
// //         });
        
        
// //         profileCard.addEventListener('click', (e) => {
// //             const link = e.target.closest('a');
// //             if (link) {
// //                 e.preventDefault();
// //                 const href = link.getAttribute('href');
                
// //                 if (href === '#profile') {
// //                     window.location.href = '/static/profile_info.html';
// //                 } else if (href === '#logout') {
// //                     if (confirm('Are you sure you want to logout?')) {
// //                         localStorage.clear();
// //                         window.location.href = '/static/auth_id.html';
// //                     }
// //                 }
                
// //                 profileCard.classList.remove('visible');
// //             }
// //         });
// //     }
// // });
 
// // console.log('------------------------------------');
// // console.log('Profile card toggled. Current HTML:');
// // console.log('------------------------------------');

// // window.profileShowup = profileShowup;
// // }


