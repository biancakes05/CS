document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => document.documentElement.classList.toggle('dark'));

  const form = document.getElementById('contactForm');
  const result = document.getElementById('formResult');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    result.textContent = `Thanks, ${data.get('name')} — your message was received.`;
    form.reset();
  });

  // Example dynamic action: show a small notification after load
  setTimeout(() => {
    const note = document.createElement('div');
    note.textContent = 'This is a dummy dynamic message.';
    note.style.cssText = 'position:fixed;right:1rem;bottom:1rem;padding:.5rem 1rem;background:#111;color:#fff;border-radius:6px';
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 3500);
  }, 600);
});