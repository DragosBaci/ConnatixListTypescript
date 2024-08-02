import { setupShadow } from '../../utils/helpers';
import css from './Button.css';
import html from './Button.html';

export class Button extends HTMLElement {
    constructor() {
        super();
        setupShadow(this, html, css);
    }
}
