// @ts-ignore
import tippy from 'tippy.js';

export interface TooltipOptions {
  placement?: 'top' | 'bottom' | 'left' | 'right';
  arrow?: boolean;
  theme?: string;
  animation?: string;
  duration?: [number, number];
  interactive?: boolean;
  zIndex?: number;
  trigger?: string;
  hideOnClick?: boolean;
}

export class TooltipManager {
  private static instances: Map<Element, any> = new Map();
  private static subscriptions: Map<Element, MutationObserver> = new Map();

  /**
   * Initialize tooltips for a container
   */
  static initTooltips(container: Element, options: TooltipOptions = {}) {
    if (!container) return;

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
  static cleanupTooltips(container: Element) {
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
  static updateAllTooltips(editorElement: Element, renderedSelector: string = '[data-rendered-html]', options?: TooltipOptions) {
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
  static createTooltip(element: Element, content: string, options?: TooltipOptions) {
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
  static subscribe(target: Element | string, options?: TooltipOptions) {
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
  static unsubscribe(target: Element | string) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

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

// Default export for convenience
export default TooltipManager;
