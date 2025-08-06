import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState, useEffect, useRef } from 'react';
import { TitleMark, TooltipManager } from '../../src/index';
import TitleButton from './components/TitleButton';

function App() {
  const [content, setContent] = useState('');
  const renderedHtmlRef = useRef(null);

  const editor = useEditor({
    extensions: [StarterKit, TitleMark],
    content: '<p>Hello World! 👋</p><p>Select some text and try the Title feature!</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      
      // Update tooltips when content changes
      if (editor && editor.view.dom) {
        TooltipManager.updateAllTooltips(editor.view.dom);
      }
    },
  });

  // Subscribe to rendered HTML section for automatic tooltip updates
  useEffect(() => {
    if (content && renderedHtmlRef.current) {
      const unsubscribe = TooltipManager.subscribe(renderedHtmlRef.current);
      return unsubscribe;
    }
  }, [content]);

  if (!editor) {
    return null;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Tiptap TitleMark Plugin Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <TitleButton editor={editor} />

      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
        <h3>Editor</h3>
        <EditorContent editor={editor} />
      </div>

      {content && (
        <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '20px' }}>
          <h3>Rendered HTML (with tooltips)</h3>
          <div 
            ref={renderedHtmlRef}
            data-rendered-html="true"
            dangerouslySetInnerHTML={{ __html: content }}
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto"
          />
        </div>
      )}
    </div>
  );
}

export default App;
