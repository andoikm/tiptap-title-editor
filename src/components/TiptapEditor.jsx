import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Fragment, useRef, useState } from 'react';

import { TitleMark } from '../extensions/TitleMark';

import StaticHtmlRenderer from './StaticHtmlRenderer';
import TitleButton from './TitleButton';
import { useTooltipPlugin } from './TooltipPlugin';

const TiptapEditor = () => {
  const demoRef = useRef(null);
  const [text, setText] = useState(null);

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
      setText(content);
    },
    onTransaction: ({ editor }) => {
      // Get current document size
      //  demoRef.current.innerHTML = editor.getHTML();
    },
  });

  // Use the tooltip plugin hook for the editor
  useTooltipPlugin(editor);

  if (!editor) {
    return null;
  }

  return (
    <Fragment>
      <div className='editor-container'>
        <TitleButton editor={editor} />

        <EditorContent editor={editor} />


        <StaticHtmlRenderer
          htmlContent={text}
          className='prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto'
        />
      </div>
    </Fragment>
  );
};

export default TiptapEditor;
