import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Fragment, useState } from 'react';

import { TitleMark } from '../extensions/TitleMark';

import TitleButton from './TitleButton';
import { useTooltipPlugin } from './TooltipPlugin';

const TiptapEditor = () => {
  const [state, setState] = useState(null);
  const editor = useEditor({
    extensions: [StarterKit, TitleMark],
    content:
      '<p>Hello World! 👋</p><p>Select some text and try the Title feature!</p>',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setState(content);
      console.log('Content changed:', content);
    },
  });

  // Use the tooltip plugin hook
  useTooltipPlugin(editor);

  if (!editor) {
    return null;
  }

  return (
    <Fragment>
      <div className='editor-container'>
        <TitleButton editor={editor} />

        <EditorContent editor={editor} />
      </div>
    </Fragment>
  );
};

export default TiptapEditor;
