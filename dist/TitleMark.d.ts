import { Mark } from '@tiptap/core';
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
            setTitle: (attributes: {
                title: string;
            }) => ReturnType;
            /**
             * Toggle a title mark
             */
            toggleTitle: (attributes: {
                title: string;
            }) => ReturnType;
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
export declare const TitleMark: Mark<TitleMarkOptions, any>;
//# sourceMappingURL=TitleMark.d.ts.map