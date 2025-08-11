import { Mark, mergeAttributes } from '@tiptap/core';
import tippy from 'tippy.js';

class TitleModalManager {
    constructor() {
        this.isOpen = false;
        this.currentTitle = '';
        this.onSave = null;
        this.modalElement = null;
        this.inputElement = null;
        this.init();
    }

    init() {
        // Create modal HTML
        this.modalElement = document.createElement('div');
        this.modalElement.id = 'title-modal-overlay';
        this.modalElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
      background-color: #242424;
      padding: 20px;
      border-radius: 8px;
      min-width: 300px;
    `;

        const title = document.createElement('h3');
        title.id = 'title-modal-title';
        title.style.cssText = `
      color: #ffffffde;
      margin-top: 0;
      margin-bottom: 10px;
    `;
        title.textContent = 'Add Title';

        const description = document.createElement('p');
        description.style.cssText = `
      color: #ffffffde;
      margin-bottom: 15px;
    `;
        description.textContent = 'Enter a title for the selected text :';

        this.inputElement = document.createElement('input');
        this.inputElement.type = 'text';
        this.inputElement.name = 'title';
        this.inputElement.placeholder = 'Enter title...';
        this.inputElement.style.cssText = `
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #242424;
      color: #ffffffde;
      box-sizing: border-box;
    `;

        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    `;

        const saveButton = document.createElement('button');
        saveButton.id = 'title-modal-save';
        saveButton.style.cssText = `
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
        saveButton.textContent = 'Add Title';

        const cancelButton = document.createElement('button');
        cancelButton.style.cssText = `
      padding: 8px 16px;
      background-color: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
        cancelButton.textContent = 'Cancel';

        // Assemble modal
        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(cancelButton);
        modalContent.appendChild(title);
        modalContent.appendChild(description);
        modalContent.appendChild(this.inputElement);
        modalContent.appendChild(buttonContainer);
        this.modalElement.appendChild(modalContent);

        // Add event listeners
        this.modalElement.addEventListener('click', (e) => {
            if (e.target === this.modalElement) {
                this.closeModal();
            }
        });

        saveButton.addEventListener('click', () => {
            this.handleSave();
        });

        cancelButton.addEventListener('click', () => {
            this.closeModal();
        });

        this.inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleSave();
            } else if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Add to document
        document.body.appendChild(this.modalElement);
    }

    openModal(title = '') {
        this.currentTitle = title;
        this.isOpen = true;

        // Update UI
        const titleElement = document.getElementById('title-modal-title');
        const saveButton = document.getElementById('title-modal-save');
        const isEditingExistingTitle = title !== '';

        titleElement.textContent = isEditingExistingTitle ? 'Edit Title' : 'Add Title';
        this.inputElement.value = title;

        // Update button text
        saveButton.textContent = isEditingExistingTitle
            ? (title.trim() ? 'Update Title' : 'Remove Title')
            : 'Add Title';

        // Show modal
        this.modalElement.style.display = 'flex';
        this.inputElement.focus();
    }

    closeModal() {
        this.isOpen = false;
        this.currentTitle = '';
        this.modalElement.style.display = 'none';
        this.inputElement.value = '';
    }

    handleSave() {
        const title = this.inputElement.value;
        if (this.onSave) {
            this.onSave(title);
        }
        this.closeModal();
    }

    setSaveHandler(handler) {
        this.onSave = handler;
    }

    destroy() {
        if (this.modalElement && this.modalElement.parentNode) {
            this.modalElement.parentNode.removeChild(this.modalElement);
        }
    }
}

// Create global instance
let globalModalManager = null;

// Auto-initialize when imported
if (typeof window !== 'undefined') {
    globalModalManager = new TitleModalManager();
    window.__titleModalManager = globalModalManager;

    // Set up a default save handler that will be overridden by the plugin
    globalModalManager.setSaveHandler((title) => {
        // This will be overridden by the plugin when it initializes
        console.log('TitleModalManager: No save handler set, title:', title);
    });
}

const TitleMark = Mark.create({
    name: 'title',
    addOptions() {
        return {
            HTMLAttributes: {},
            onSave: () => { },
        };
    },
    onCreate() {
        // Set up the modal manager save handler when the extension is created
        if (typeof window !== 'undefined' && window.__titleModalManager) {
            window.__titleModalManager.setSaveHandler((title) => {
                // Use the editor instance to save the title
                if (this.editor) {
                    this.editor.chain().focus().saveTitle(title).run();
                }
            });
        }
    },
    addAttributes() {
        return {
            title: {
                default: null,
                parseHTML: element => element.getAttribute('data-title'),
                renderHTML: attributes => {
                    if (!attributes.title) {
                        return {};
                    }
                    return {
                        'data-title': attributes.title,
                    };
                },
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'span[data-title]',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            mergeAttributes(this.options.HTMLAttributes || {}, HTMLAttributes),
            0,
        ];
    },
    addCommands() {
        return {
            setTitle: attributes => ({ commands }) => {
                return commands.setMark(this.name, attributes);
            },
            toggleTitle: attributes => ({ commands }) => {
                return commands.toggleMark(this.name, attributes);
            },
            unsetTitle: () => ({ commands }) => {
                return commands.unsetMark(this.name);
            },
            toggleTitleModal: () => ({ editor, commands }) => {
                const { from, to } = editor.state.selection;
                // Check if there's a selection
                if (from === to) {
                    alert('Please select some text first!');
                    return false;
                }
                // Get current title if it exists
                let currentTitle = '';
                if (editor.isActive('title')) {
                    const attributes = editor.getAttributes('title');
                    currentTitle = attributes.title || '';
                }
                // Open the modal using the global modal manager
                if (typeof window !== 'undefined' && window.__titleModalManager) {
                    window.__titleModalManager.openModal(currentTitle);
                }
                return true;
            },
            saveTitle: (title) => ({ commands }) => {
                // If input is empty, remove the title
                if (!title.trim()) {
                    return commands.unsetMark(this.name);
                }
                // Set or update the title
                return commands.setMark(this.name, { title: title.trim() });
            },
        };
    },
});

// @ts-ignore
class TooltipManager {
    /**
     * Initialize tooltips for a container
     */
    static initTooltips(container, options = {}) {
        if (!container)
            return;
        // Remove existing tooltips from this container
        this.cleanupTooltips(container);
        // Add tooltips to title-marked elements
        const titleElements = container.querySelectorAll('[data-title]');
        titleElements.forEach(element => {
            const title = element.getAttribute('data-title');
            if (title) {
                const instance = tippy(element, {
                    content: title,
                    placement: options.placement || 'top',
                    arrow: options.arrow !== false,
                    theme: options.theme || 'light-border',
                    animation: options.animation || 'scale',
                    duration: options.duration || [200, 150],
                    interactive: options.interactive !== false,
                    appendTo: () => document.body,
                    zIndex: options.zIndex || 9999,
                    trigger: options.trigger || 'mouseenter',
                    hideOnClick: options.hideOnClick !== false,
                });
                this.instances.set(element, instance);
            }
        });
    }
    /**
     * Cleanup tooltips for a specific container
     */
    static cleanupTooltips(container) {
        const existingTooltips = container.querySelectorAll('[data-tippy-root]');
        existingTooltips.forEach(tooltip => {
            // @ts-ignore
            if (tooltip._tippy) {
                // @ts-ignore
                tooltip._tippy.destroy();
            }
        });
        // Clean up tracked instances
        this.instances.forEach((instance, element) => {
            if (container.contains(element)) {
                instance.destroy();
                this.instances.delete(element);
            }
        });
    }
    /**
     * Cleanup all tooltips
     */
    static cleanupAll() {
        this.instances.forEach(instance => {
            instance.destroy();
        });
        this.instances.clear();
    }
    /**
     * Update tooltips for editor and rendered HTML sections
     */
    static updateAllTooltips(editorElement, renderedSelector = '[data-rendered-html]', options) {
        // Update tooltips in the editor
        this.initTooltips(editorElement, options);
        // Update tooltips in the rendered HTML section
        const renderedSection = document.querySelector(renderedSelector);
        if (renderedSection) {
            this.initTooltips(renderedSection, options);
        }
    }
    /**
     * Create a tooltip for a specific element
     */
    static createTooltip(element, content, options) {
        const instance = tippy(element, {
            content,
            placement: options?.placement || 'top',
            arrow: options?.arrow !== false,
            theme: options?.theme || 'light-border',
            animation: options?.animation || 'scale',
            duration: options?.duration || [200, 150],
            interactive: options?.interactive !== false,
            appendTo: () => document.body,
            zIndex: options?.zIndex || 9999,
            trigger: options?.trigger || 'mouseenter',
            hideOnClick: options?.hideOnClick !== false,
        });
        this.instances.set(element, instance);
        return instance;
    }
    /**
     * Subscribe to DOM changes and automatically update tooltips
     */
    static subscribe(target, options) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element) {
            console.warn('TooltipManager.subscribe: Target element not found');
            return;
        }
        // Cleanup existing subscription
        this.unsubscribe(element);
        // Initial tooltip setup
        this.initTooltips(element, options);
        // Create mutation observer to watch for DOM changes
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    shouldUpdate = true;
                }
            });
            if (shouldUpdate) {
                this.initTooltips(element, options);
            }
        });
        // Start observing
        observer.observe(element, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-title']
        });
        // Store the subscription
        this.subscriptions.set(element, observer);
        return () => this.unsubscribe(element);
    }
    /**
     * Unsubscribe from DOM changes for a specific element
     */
    static unsubscribe(target) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element)
            return;
        const observer = this.subscriptions.get(element);
        if (observer) {
            observer.disconnect();
            this.subscriptions.delete(element);
        }
    }
    /**
     * Unsubscribe from all DOM changes
     */
    static unsubscribeAll() {
        this.subscriptions.forEach(observer => {
            observer.disconnect();
        });
        this.subscriptions.clear();
    }
}
TooltipManager.instances = new Map();
TooltipManager.subscriptions = new Map();

export { TitleMark, TooltipManager, TooltipManager as TooltipManagerDefault };
//# sourceMappingURL=index.esm.js.map
