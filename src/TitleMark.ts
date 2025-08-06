import { Mark, mergeAttributes } from '@tiptap/core';

export interface TitleMarkOptions {
  HTMLAttributes?: Record<string, any>;
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
    };
  }
}

export const TitleMark = Mark.create<TitleMarkOptions>({
  name: 'title',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
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
    };
  },
});
