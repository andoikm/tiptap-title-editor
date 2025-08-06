import { Mark } from '@tiptap/core';
export interface TitleMarkOptions {
    HTMLAttributes?: Record<string, any>;
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
        };
    }
}
export declare const TitleMark: Mark<TitleMarkOptions, any>;
//# sourceMappingURL=TitleMark.d.ts.map