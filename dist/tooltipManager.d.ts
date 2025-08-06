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
export declare class TooltipManager {
    private static instances;
    private static subscriptions;
    /**
     * Initialize tooltips for a container
     */
    static initTooltips(container: Element, options?: TooltipOptions): void;
    /**
     * Cleanup tooltips for a specific container
     */
    static cleanupTooltips(container: Element): void;
    /**
     * Cleanup all tooltips
     */
    static cleanupAll(): void;
    /**
     * Update tooltips for editor and rendered HTML sections
     */
    static updateAllTooltips(editorElement: Element, renderedSelector?: string, options?: TooltipOptions): void;
    /**
     * Create a tooltip for a specific element
     */
    static createTooltip(element: Element, content: string, options?: TooltipOptions): any;
    /**
     * Subscribe to DOM changes and automatically update tooltips
     */
    static subscribe(target: Element | string, options?: TooltipOptions): (() => void) | undefined;
    /**
     * Unsubscribe from DOM changes for a specific element
     */
    static unsubscribe(target: Element | string): void;
    /**
     * Unsubscribe from all DOM changes
     */
    static unsubscribeAll(): void;
}
export default TooltipManager;
//# sourceMappingURL=tooltipManager.d.ts.map