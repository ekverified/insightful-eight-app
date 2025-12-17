// Your entire const API_BASE = ... ; document.addEventListener('DOMContentLoaded', ...) block – exact copy from <script> in source index.html
const API_BASE = 'https://app-backend-xil0.onrender.com';
let userToken = localStorage.getItem('token') || '';
let currentUserRole = 'member';
let deferredPrompt;
const App = {
  // ... (full App object, data, showSpinner, toast, fetchWithAuth, memberLogin, nav, renderAll, etc. – no changes needed)
};
// Event listeners and init (use DOMContentLoaded for safety)
document.addEventListener('DOMContentLoaded', () => {
  try {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      setTimeout(() => splash.classList.add('opacity-0', 'pointer-events-none'), 1500);
      setTimeout(() => {
        splash.classList.add('hidden');
        if (userToken) App.memberLogin();
      }, 2200);
    }
    // Keydown listener
    document.addEventListener('keydown', (e) => {
      const activeId = document.activeElement ? document.activeElement.id : '';
      if (e.key === 'Enter' && (activeId.includes('pin') || activeId.includes('login'))) App.memberLogin();
    });
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(console.error);
    App.initPWA();
  } catch (err) {
    console.error('App init error:', err);
    const splash = document.getElementById('splash-screen');
    if (splash) splash.classList.add('hidden');
  }
});
