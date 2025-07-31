    const toggleBtn = document.getElementById('toggleDark');
    const html = document.documentElement;

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        html.classList.toggle('dark');
        toggleBtn.textContent = html.classList.contains('dark') ? '🌗' : '😎';
      });
    }