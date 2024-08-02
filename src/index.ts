import { Button } from './components/Button/Button';
import { List } from './components/List/List';

customElements.define('custom-button', Button);
customElements.define('custom-list', List);

const button = document.createElement('custom-button');
button.textContent = 'Click me!';
document.body.appendChild(button);

const list = document.createElement('custom-list');
document.body.appendChild(list);
