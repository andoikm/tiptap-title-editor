import { Mark, mergeAttributes } from '@tiptap/core';

export interface TitleMarkOptions {
  HTMLAttributes?: Record<string, any>;
  onSave?: (title: string) => void;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    title: {
      /**
       * Set a title mark
       */
      setTitle: (attributes: { title: string }) => ReturnType;
      /**
       * Toggle a title mark
       */
      toggleTitle: (attributes: { title: string }) => ReturnType;
      /**
       * Unset a title mark
       */
      unsetTitle: () => ReturnType;
      /**
       * Toggle title modal and handle title editing
       */
      toggleTitleModal: () => ReturnType;
      /**
       * Save title from modal
       */
      saveTitle: (title: string) => ReturnType;
    };
  }
}

export const TitleMark = Mark.create<TitleMarkOptions>({
  name: 'title',

  addOptions() {
    return {
      HTMLAttributes: {},
      onSave: () => {},
    };
  },

  onCreate() {
    // Set up the modal manager save handler when the extension is created
    if (typeof window !== 'undefined' && (window as any).__titleModalManager) {
      (window as any).__titleModalManager.setSaveHandler((title: string) => {
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
      setTitle:
        attributes =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleTitle:
        attributes =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetTitle:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
      toggleTitleModal:
        () =>
        ({ editor, commands }) => {
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
          if (typeof window !== 'undefined' && (window as any).__titleModalManager) {
            (window as any).__titleModalManager.openModal(currentTitle);
          }
          
          return true;
        },
      saveTitle:
        (title: string) =>
        ({ commands }) => {
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
