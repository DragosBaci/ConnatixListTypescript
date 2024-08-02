import { ITask } from '../../interfaces/ITask';

export class List extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderList();
        document.addEventListener('items-changed', this.renderList.bind(this));
    }

    renderList() {
        const items = JSON.parse(localStorage.getItem('items') || '[]');
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/components/List/List.css">
            <ul>
                ${items
                    .map(
                        (item: ITask) =>
                            `<li>
                        <p>${item.text}</p>
                        <custom-button id="remove-button" data-id="${item.id}">Remove</custom-button>
                    </li>`
                    )
                    .join('')}
            </ul>
        `;
        }
    }

    disconnectedCallback() {
        document.removeEventListener('items-changed', this.renderList.bind(this));
    }
}
