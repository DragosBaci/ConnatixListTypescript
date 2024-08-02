import { IWindow } from '../interfaces/IWindow';

declare const window: IWindow & typeof globalThis;

export const setupShadow = (element: HTMLElement, html: string, css: string): void => {
    const shadow = element.attachShadow({ mode: 'open' });
    const template = document.createElement('template');

    template.innerHTML = `<style>${css}</style>${attachCallbacks(html, element)}`;
    const templateContent = template.content;
    shadow.appendChild(templateContent.cloneNode(true));
};

const attachCallbacks = (html: string, element: HTMLElement): string => {
    const lastId = window.lastComponentId ?? 0;
    const componentId = lastId + 1;
    window.lastComponentId = componentId;

    const componentName = `component${componentId}`;
    window[componentName] = element;

    return html.replace(/this\./g, `window.${componentName}.`);
};
