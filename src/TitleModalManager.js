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

export function createTitleModalManager() {
    if (!globalModalManager) {
        globalModalManager = new TitleModalManager();
    }
    return globalModalManager;
}

export function getTitleModalManager() {
    return globalModalManager;
}

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
