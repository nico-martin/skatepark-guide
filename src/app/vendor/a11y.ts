const CHECK_CLASS = 'no-outline';

document.body.classList.add(CHECK_CLASS);

window.addEventListener('keydown', function(e) {
  const code = e.keyCode ? e.keyCode : e.which;
  if (code === 9) {
    document.body.classList.remove(CHECK_CLASS);
  }
});

window.addEventListener('mousemove', function(e) {
  document.body.classList.add(CHECK_CLASS);
});
