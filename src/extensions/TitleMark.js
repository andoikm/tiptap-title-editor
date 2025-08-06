import { Mark, mergeAttributes } from '@tiptap/core';

export const TitleMark = Mark.create({
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
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
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
