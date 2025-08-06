import { useEffect } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export const useTooltipPlugin = editor => {
  useEffect(() => {
    if (!editor) return;

    const updateTooltips = () => {
      // Remove existing tooltips
      const existingTooltips = document.querySelectorAll('[data-tippy-root]');
      existingTooltips.forEach(tooltip => {
        if (tooltip._tippy) {
          tooltip._tippy.destroy();
        }
      });

      // Add tooltips to title-marked elements
      const titleElements = document.querySelectorAll('[data-title]');
      titleElements.forEach(element => {
        const title = element.getAttribute('data-title');
        if (title) {
          tippy(element, {
            content: title,
            placement: 'top',
            arrow: true,
            theme: 'light-border',
            animation: 'scale',
            duration: [200, 150],
            interactive: true,
            appendTo: () => document.body,
          });
        }
      });
    };

    // Update tooltips when editor content changes
    editor.on('update', updateTooltips);

    // Initial tooltip setup
    updateTooltips();

    // Cleanup on unmount
    return () => {
      editor.off('update', updateTooltips);
      const existingTooltips = document.querySelectorAll('[data-tippy-root]');
      existingTooltips.forEach(tooltip => {
        if (tooltip._tippy) {
          tooltip._tippy.destroy();
        }
      });
    };
  }, [editor]);
};
