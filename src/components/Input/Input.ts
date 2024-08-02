import { setupShadow } from '../../utils/helpers';
import css from './Input.css';
import html from './Input.html';
import { ITask } from '../../interfaces/ITask';

export class Input extends HTMLElement {
    constructor() {
        super();
        setupShadow(this, html, css);
    }

    connectedCallback() {
        const input = this.getInputElement();
        const button = this.getButtonElement();

        if (input && button) {
            button.addEventListener('click', () => this.handleButtonClick(input));
        }
    }

    getInputElement(): HTMLInputElement | null {
        return this.shadowRoot?.querySelector('input') || null;
    }

    getButtonElement(): HTMLElement | null {
        return this.shadowRoot?.querySelector('custom-button') || null;
    }

    handleButtonClick(input: HTMLInputElement) {
        if (!input.value) return;

        const items = this.getItemsFromLocalStorage();
        const currentId = items.length ? items[items.length - 1].id + 1 : 1;

        items.push({ id: currentId.toString(), text: input.value });
        this.saveItemsToLocalStorage(items);

        input.value = '';
        this.dispatchItemsChangedEvent();
    }

    getItemsFromLocalStorage(): ITask[] {
        return JSON.parse(localStorage.getItem('items') || '[]');
    }

    saveItemsToLocalStorage(items: ITask[]) {
        localStorage.setItem('items', JSON.stringify(items));
    }

    dispatchItemsChangedEvent() {
        document.dispatchEvent(new CustomEvent('items-changed'));
    }
}
