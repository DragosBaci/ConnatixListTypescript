import { Button } from './components/Button/Button';
import { List } from './components/List/List';
import { Input } from './components/Input/Input';
import { ITask } from './interfaces/ITask';

customElements.define('custom-button', Button);
customElements.define('custom-list', List);
customElements.define('custom-input', Input);

const mainContainer = document.getElementById('root');

const input = document.createElement('custom-input');

const addItem = () => {
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    const currentId = items.length ? items[items.length - 1].id + 1 : 1;
    const inputElement = input.shadowRoot?.querySelector('input');
    if (!inputElement?.value) return;
    items.push({ id: currentId, text: inputElement.value });
    localStorage.setItem('items', JSON.stringify(items));
    inputElement.value = '';
    document.dispatchEvent(new CustomEvent('items-changed'));
};

const addButton = document.createElement('custom-button');
addButton.textContent = 'Add';
addButton.addEventListener('click', addItem);

const inputContainer = input.shadowRoot?.getElementById('inputContainer');

input.shadowRoot?.querySelector('input')?.setAttribute('placeholder', 'Add a new task');
mainContainer?.appendChild(input);
inputContainer?.appendChild(addButton);

const list = document.createElement('custom-list');
mainContainer?.appendChild(list);
