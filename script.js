function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-' + lang + ']');
  elements.forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });

  document.querySelectorAll('.socials span').forEach(btn => btn.classList.remove('active-lang'));
  const activeBtn = document.getElementById('btn-' + lang);
  if (activeBtn) activeBtn.classList.add('active-lang');
}