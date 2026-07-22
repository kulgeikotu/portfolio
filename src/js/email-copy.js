// Клик по email в футере — копирует адрес в буфер обмена и показывает
// toast-уведомление (закрывается по крестику или само через 3 секунды).
export function initEmailCopy() {
  const link = document.querySelector('[data-copy-email]');
  const toast = document.getElementById('emailToast');
  const closeBtn = document.getElementById('emailToastClose');
  if (!link || !toast || !closeBtn) return;

  let hideTimer;

  function showToast() {
    toast.setAttribute('data-open', 'true');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideToast, 3000);
  }

  function hideToast() {
    toast.setAttribute('data-open', 'false');
    clearTimeout(hideTimer);
  }

  link.addEventListener('click', async (e) => {
    const email = link.dataset.copyEmail;
    if (!navigator.clipboard) return; // нет Clipboard API — уйдёт по mailto: как обычно

    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      showToast();
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });

  closeBtn.addEventListener('click', hideToast);
}
