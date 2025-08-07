import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { useState, useEffect, useRef } from 'react';
import { TitleMark } from '../../src/index';
import { TooltipManager } from './components/TooltipManager';
import TitleButton from './components/TitleButton';

// Toolbar component with formatting buttons
const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor.chain().focus().toggleStrike().run();
  const toggleCode = () => editor.chain().focus().toggleCode().run();
  const toggleHeading = (level) => editor.chain().focus().toggleHeading({ level }).run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();

  return (
    <div style={{ 
      border: '1px solid #e2e8f0', 
      borderRadius: '8px', 
      padding: '12px', 
      marginBottom: '16px',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      alignItems: 'center'
    }}>
      <div style={{ fontWeight: 'bold', marginRight: '12px', color: '#475569' }}>
        Formatting:
      </div>
      
      <button
        onClick={toggleBold}
        style={{
          padding: '6px 12px',
          border: '1px solid #cbd5e1',
          borderRadius: '4px',
          backgroundColor: editor.isActive('bold') ? '#3b82f6' : '#ffffff',
          color: editor.isActive('bold') ? '#ffffff' : '#374151',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
        title="Bold"
      >
        B
      </button>

      <button
        onClick={toggleItalic}
        style={{
          padding: '6px 12px',
          border: '1px solid #cbd5e1',
          borderRadius: '4px',
          backgroundColor: editor.isActive('italic') ? '#3b82f6' : '#ffffff',
          color: editor.isActive('italic') ? '#ffffff' : '#374151',
          cursor: 'pointer',
          fontSize: '14px',
          fontStyle: 'italic'
        }}
        title="Italic"
      >
        I
      </button>

      <button
        onClick={toggleUnderline}
        style={{
          padding: '6px 12px',
          border: '1px solid #cbd5e1',
          borderRadius: '4px',
          backgroundColor: editor.isActive('underline') ? '#3b82f6' : '#ffffff',
          color: editor.isActive('underline') ? '#ffffff' : '#374151',
          cursor: 'pointer',
          fontSize: '14px',
          textDecoration: 'underline'
        }}
        title="Underline"
      >
        U
      </button>

      <button
        onClick={toggleStrike}
        style={{
          padding: '6px 12px',
          border: '1px solid #cbd5e1',
          borderRadius: '4px',
          backgroundColor: editor.isActive('strike') ? '#3b82f6' : '#ffffff',
          color: editor.isActive('strike') ? '#ffffff' : '#374151',
          cursor: 'pointer',
          fontSize: '14px',
          textDecoration: 'line-through'
        }}
        title="Strikethrough"
      >
        S
      </button>

      <button
        onClick={toggleCode}
        style={{
          padding: '6px 12px',
          border: '1px solid #cbd5e1',
          borderRadius: '4px',
          backgroundColor: editor.isActive('code') ? '#3b82f6' : '#ffffff',
          color: editor.isActive('code') ? '#ffffff' : '#374151',
          cursor: 'pointer',
          fontSize: '14px',
          fontFamily: 'monospace'
        }}
        title="Code"
      >
        {'</>'}
      </button>

      <div style={{ marginLeft: '12px', borderLeft: '1px solid #cbd5e1', paddingLeft: '12px' }}>
        <button
          onClick={() => toggleHeading(1)}
          style={{
            padding: '6px 12px',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            backgroundColor: editor.isActive('heading', { level: 1 }) ? '#3b82f6' : '#ffffff',
            color: editor.isActive('heading', { level: 1 }) ? '#ffffff' : '#374151',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
          title="Heading 1"
        >
          H1
        </button>

        <button
          onClick={() => toggleHeading(2)}
          style={{
            padding: '6px 12px',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            backgroundColor: editor.isActive('heading', { level: 2 }) ? '#3b82f6' : '#ffffff',
            color: editor.isActive('heading', { level: 2 }) ? '#ffffff' : '#374151',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
          title="Heading 2"
        >
          H2
        </button>
      </div>

      <div style={{ marginLeft: '12px', borderLeft: '1px solid #cbd5e1', paddingLeft: '12px' }}>
        <button
          onClick={toggleBulletList}
          style={{
            padding: '6px 12px',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            backgroundColor: editor.isActive('bulletList') ? '#3b82f6' : '#ffffff',
            color: editor.isActive('bulletList') ? '#ffffff' : '#374151',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          title="Bullet List"
        >
          •
        </button>

        <button
          onClick={toggleOrderedList}
          style={{
            padding: '6px 12px',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            backgroundColor: editor.isActive('orderedList') ? '#3b82f6' : '#ffffff',
            color: editor.isActive('orderedList') ? '#ffffff' : '#374151',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          title="Numbered List"
        >
          1.
        </button>
      </div>
    </div>
  );
};

function App() {
  const [content, setContent] = useState('');
  const renderedHtmlRef = useRef(null);

  const editor = useEditor({
    extensions: [StarterKit, Underline, TitleMark],
    content: `
      <h1>Welcome to Tiptap TitleMark Plugin Demo! 🎉</h1>
      <p>This demo showcases the <strong>TitleMark plugin</strong> alongside common text formatting features.</p>
      <p>Try these features:</p>
      <ul>
        <li><strong>Format text</strong> using the toolbar buttons above</li>
        <li><em>Select any text</em> and click "Add Title" to add tooltips</li>
        <li><u>Hover over text</u> with titles to see tooltips in action</li>
        <li><code>Combine formatting</code> with tooltips for rich content</li>
      </ul>
      <p>Select some text and try the Title feature!</p>
    `,
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
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '24px' }}>
        Tiptap TitleMark Plugin Demo
      </h1>
      
      <div style={{ marginBottom: '20px' }}>
        <TitleButton editor={editor} />
      </div>

      <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '20px', backgroundColor: '#ffffff' }}>
        <h3 style={{ marginTop: '0', color: '#475569' }}>Editor with Formatting Tools</h3>
        
        <Toolbar editor={editor} />
        
        <EditorContent editor={editor} />
      </div>

      {content && (
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', backgroundColor: '#ffffff' }}>
          <h3 style={{ marginTop: '0', color: '#475569' }}>Rendered HTML (with tooltips)</h3>
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
