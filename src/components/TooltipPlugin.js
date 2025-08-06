import { useEffect } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export const useTooltipPlugin = editor => {
  useEffect(() => {
    if (!editor) return;

    const updateTooltipsForContainer = (container) => {
      // Remove existing tooltips from this container
      const existingTooltips = container.querySelectorAll('[data-tippy-root]');
      existingTooltips.forEach(tooltip => {
        if (tooltip._tippy) {
          tooltip._tippy.destroy();
        }
      });

      // Add tooltips to title-marked elements in this container
      const titleElements = container.querySelectorAll('[data-title]');
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

    const updateAllTooltips = () => {
      // Update tooltips for the editor content
      const editorElement = editor.view.dom;
      updateTooltipsForContainer(editorElement);

      // Update tooltips for the demo div
      const demoElement = document.getElementById('demo');
      if (demoElement) {
        updateTooltipsForContainer(demoElement);
      }
    };

    // Update tooltips when editor content changes
    editor.on('update', updateAllTooltips);

    // Initial tooltip setup
    updateAllTooltips();

    // Set up a mutation observer to watch for changes in the demo div
    const demoElement = document.getElementById('demo');
    if (demoElement) {
      const observer = new MutationObserver(() => {
        updateTooltipsForContainer(demoElement);
      });
      
      observer.observe(demoElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-title']
      });

      // Cleanup observer on unmount
      return () => {
        editor.off('update', updateAllTooltips);
        observer.disconnect();
        const existingTooltips = document.querySelectorAll('[data-tippy-root]');
        existingTooltips.forEach(tooltip => {
          if (tooltip._tippy) {
            tooltip._tippy.destroy();
          }
        });
      };
    }

    // Cleanup on unmount
    return () => {
      editor.off('update', updateAllTooltips);
      const existingTooltips = document.querySelectorAll('[data-tippy-root]');
      existingTooltips.forEach(tooltip => {
        if (tooltip._tippy) {
          tooltip._tippy.destroy();
        }
      });
    };
  }, [editor]);
};
