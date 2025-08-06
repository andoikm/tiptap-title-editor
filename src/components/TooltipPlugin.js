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

      // Update tooltips for the renderHtmlWithTitleMark div
      const renderHtmlElement = document.getElementById('renderHtmlWithTitleMark');
      if (renderHtmlElement) {
        updateTooltipsForContainer(renderHtmlElement);
      }
    };

    // Handle custom updateTooltips event
    const handleUpdateTooltips = (event) => {
      const { container } = event.detail;
      if (container) {
        updateTooltipsForContainer(container);
      }
    };

    // Update tooltips when editor content changes
    editor.on('update', updateAllTooltips);

    // Listen for custom updateTooltips events
    document.addEventListener('updateTooltips', handleUpdateTooltips);

    // Initial tooltip setup
    updateAllTooltips();

    // Set up mutation observers to watch for changes in the demo and renderHtmlWithTitleMark divs
    const demoElement = document.getElementById('demo');
    const renderHtmlElement = document.getElementById('renderHtmlWithTitleMark');
    
    const observers = [];

    if (demoElement) {
      const demoObserver = new MutationObserver(() => {
        updateTooltipsForContainer(demoElement);
      });
      
      demoObserver.observe(demoElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-title']
      });
      
      observers.push(demoObserver);
    }

    if (renderHtmlElement) {
      const renderHtmlObserver = new MutationObserver(() => {
        updateTooltipsForContainer(renderHtmlElement);
      });
      
      renderHtmlObserver.observe(renderHtmlElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-title']
      });
      
      observers.push(renderHtmlObserver);
    }

    // Cleanup observers and tooltips on unmount
    return () => {
      editor.off('update', updateAllTooltips);
      document.removeEventListener('updateTooltips', handleUpdateTooltips);
      observers.forEach(observer => observer.disconnect());
      const existingTooltips = document.querySelectorAll('[data-tippy-root]');
      existingTooltips.forEach(tooltip => {
        if (tooltip._tippy) {
          tooltip._tippy.destroy();
        }
      });
    };
  }, [editor]);
};

// Hook for static HTML content with TitleMark functionality
export const useStaticHtmlTooltips = (containerRef, dependencies = []) => {
  useEffect(() => {
    if (!containerRef?.current) return;

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

    const container = containerRef.current;
    updateTooltipsForContainer(container);

    // Set up mutation observer to watch for changes
    const observer = new MutationObserver(() => {
      updateTooltipsForContainer(container);
    });
    
    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-title']
    });

    // Cleanup on unmount
    return () => {
      observer.disconnect();
      const existingTooltips = container.querySelectorAll('[data-tippy-root]');
      existingTooltips.forEach(tooltip => {
        if (tooltip._tippy) {
          tooltip._tippy.destroy();
        }
      });
    };
  }, [containerRef, ...dependencies]);
};
