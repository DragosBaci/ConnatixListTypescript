import { ITask } from '../../interfaces/ITask';
import { setupShadow } from '../../utils/helpers';
import css from './List.css';
import html from './List.html';

export class List extends HTMLElement {
    constructor() {
        super();
        setupShadow(this, html, css);
    }

    connectedCallback() {
        this.renderList();
        document.addEventListener('items-changed', this.renderList.bind(this));
    }

    disconnectedCallback() {
        document.removeEventListener('items-changed', this.renderList.bind(this));
    }

    renderList() {
        const items = this.getItemsFromLocalStorage();
        const list = this.shadowRoot?.querySelector('ul');
        if (list) {
            list.innerHTML = '';
            items.forEach((item: ITask) => {
                const listItem = this.createListItem(item);
                list.appendChild(listItem);
            });
        }
    }

    getItemsFromLocalStorage(): ITask[] {
        return JSON.parse(localStorage.getItem('items') || '[]');
    }

    saveItemsToLocalStorage(items: ITask[]) {
        localStorage.setItem('items', JSON.stringify(items));
        document.dispatchEvent(new CustomEvent('items-changed'));
    }

    createListItem(item: ITask): HTMLLIElement {
        const li = document.createElement('li');
        const container = document.createElement('div');
        container.className = 'container';

        const p = this.createItemTextElement(item);
        const editButton = this.createEditButton(item);
        const deleteButton = this.createDeleteButton(item);

        container.appendChild(editButton);
        container.appendChild(deleteButton);

        li.appendChild(p);
        li.appendChild(container);

        return li;
    }

    createItemTextElement(item: ITask): HTMLParagraphElement {
        const p = document.createElement('p');
        p.textContent = item.text;
        p.className = `item-${item.id}`;
        return p;
    }

    createEditButton(item: ITask): HTMLElement {
        const editButton = document.createElement('custom-button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => this.editItem(item));
        return editButton;
    }

    createDeleteButton(item: ITask): HTMLElement {
        const deleteButton = document.createElement('custom-button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', () => this.removeItem(item));
        return deleteButton;
    }

    editItem(item: ITask) {
        const id = item.id;
        const text = item.text;

        const input = this.createEditInputElement(text);
        const saveButton = this.createSaveChangesButton(item, input);

        const p = this.shadowRoot?.querySelector(`.item-${id}`);
        const editButton = p?.parentElement?.querySelector('custom-button');

        editButton?.replaceWith(saveButton);
        p?.replaceWith(input);
    }

    createEditInputElement(text: string): HTMLElement {
        const input = document.createElement('custom-input');
        input.shadowRoot?.querySelector('input')?.setAttribute('value', text);
        return input;
    }

    createSaveChangesButton(item: ITask, input: HTMLElement): HTMLElement {
        const saveButton = document.createElement('custom-button');
        saveButton.textContent = 'Save';

        saveButton.addEventListener('click', () => {
            const items = this.getItemsFromLocalStorage();
            const newItems = items.map((i: ITask) => {
                if (i.id === item.id) {
                    i.text = input.shadowRoot?.querySelector('input')?.value || '';
                }
                return i;
            });
            this.saveItemsToLocalStorage(newItems);
        });

        return saveButton;
    }

    removeItem(item: ITask) {
        const items = this.getItemsFromLocalStorage();
        const newItems = items.filter((i: ITask) => i.text !== item.text);
        this.saveItemsToLocalStorage(newItems);
    }
}
