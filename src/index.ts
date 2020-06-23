import './App';
import './styles.css';
import { isDev } from '@app/vendor/helpers';
import './app/vendor/a11y';

isDev && document.body.classList.add('dev');
