// Full App object and methods from your script, unchanged except for init
const API_BASE = 'https://app-backend-xil0.onrender.com';
let userToken = localStorage.getItem('token') || '';
let currentUserRole = 'member';
let deferredPrompt;
const App = {
  // ... (your entire App object, data, showSpinner, toast, fetchWithAuth, all methods like memberLogin, nav, renderAll, etc. – paste as-is from previous)
};

// Event listeners and init (updated for module)
document.addEventListener('DOMContentLoaded', () => {
  // Robust splash hide with explicit checks
  const splash = document.getElementById('splash-screen');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('opacity-0', 'pointer-events-none');
    }, 1500);
    setTimeout(() => {
      splash.classList.add('hidden');
      if (userToken) {
        App.memberLogin();  // Auto-login
      }
    }, 2200);
  } else {
    console.warn('Splash element missing – direct to auth');
  }

  // Other listeners
  document.addEventListener('keydown', (e) => {
    const activeId = document.activeElement ? document.activeElement.id : '';
    if (e.key === 'Enter' && (activeId.includes('pin') || activeId.includes('login'))) App.memberLogin();
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  }

  App.initPWA();
});
