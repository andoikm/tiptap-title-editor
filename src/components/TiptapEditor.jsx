import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Fragment, useRef, useState } from 'react';

import { TitleMark } from '../extensions/TitleMark';

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

      //Make a fetch backend save it than get and display in renderHtmlWithTitleMark
      setText(content);
    },
    onTransaction: ({ editor }) => {
      // Get current document size
      demoRef.current.innerHTML = editor.getHTML();
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

        <div
          id='demo'
          ref={demoRef}
          style={{
            minHeight: '50px',
            padding: '10px',
            border: '1px solid #ddd',
          }}
        />
        <div
          id='renderHtmlWithTitleMark'
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </Fragment>
  );
};

export default TiptapEditor;
