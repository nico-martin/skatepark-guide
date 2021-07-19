import './App';
import './styles.css';

declare global {
  interface Window {
    installEvent: any;
  }
}

window.installEvent = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.installEvent = e;
});
