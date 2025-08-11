import {EditorContent} from '@tiptap/react';
import {useEffect, useRef} from 'react';
import {Toolbar} from './Toolbar.jsx';
import {TooltipManager} from '../../../src/index';

export const EditorContainer = ({editor}) => {
    const editorRef = useRef(null);

    // Subscribe to editor DOM for tooltip updates
    useEffect(() => {
        if (editor && editor.view.dom) {
            const unsubscribe = TooltipManager.subscribe(editor.view.dom);
            return unsubscribe;
        }
    }, [editor]);

    return (
        <div className="editor-container">
            <Toolbar editor={editor}/>
            <EditorContent editor={editor} ref={editorRef}/>
        </div>
    );
};
