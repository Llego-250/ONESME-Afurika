// Basic interactions: sidebar toggle, mobile toggle, simple form validation
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const collapseBtn = document.getElementById('collapseBtn');
  const mobileToggle = document.getElementById('mobileToggle');

  collapseBtn.addEventListener('click', () => {
    if (sidebar.style.width === '68px') {
      sidebar.style.width = '260px';
    } else {
      sidebar.style.width = '68px';
    }
  });

  // mobile toggle (for small screens)
  mobileToggle.addEventListener('click', () => {
    if (sidebar.style.display === 'none' || getComputedStyle(sidebar).display === 'none') {
      sidebar.style.display = 'flex';
    } else {
      sidebar.style.display = 'none';
    }
  });

  // simple submenu toggling (if you click an active item)
  document.querySelectorAll('.menu-item > a').forEach(a => {
    a.addEventListener('click', (e) => {
      const parent = a.parentElement;
      const submenu = parent.querySelector('.submenu');
      // only toggle if submenu exists
      if (submenu) {
        e.preventDefault();
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

  // form handling
  const form = document.getElementById('declarationForm');
  const formMsg = document.getElementById('formMsg');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    formMsg.textContent = '';

    const required = [...form.querySelectorAll('[required]')];
    const missing = required.filter(f => !f.value || f.value.trim() === '');

    if (missing.length) {
      formMsg.style.color = '#b00020';
      formMsg.textContent = 'Please fill all required fields.';
      missing[0].focus();
      return;
    }

    // mock submit behavior
    const data = new FormData(form);
    const obj = Object.fromEntries(data.entries());
    console.log('Submitting', obj);

    // display success
    formMsg.style.color = '#0b6623';
    formMsg.textContent = 'Declaration submitted successfully (mock).';
    form.reset();

    // small visual feedback
    setTimeout(() => {
      formMsg.textContent = '';
    }, 4000);
  });
});
