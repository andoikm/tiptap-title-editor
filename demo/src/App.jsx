import {useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import {useState} from 'react';
import {TitleMark, TooltipManager} from '../../src/index';
import {EditorContainer} from './components/EditorContainer';
import {RenderedHtmlContainer} from './components/RenderedHtmlContainer';
import './App.css';

function App() {
    const [content, setContent] = useState(`
      <h3>Welcome to Tiptap TitleMark Plugin Demo! 🎉</h3>
      <p>This demo showcases the <strong>TitleMark plugin</strong> alongside common text formatting features.</p>
      <p>Try these features:</p>
      <ul>
        <li><strong>Format text</strong> using the toolbar buttons above</li>
        <li><em>Select any text</em> and click "Add Title" to add tooltips</li>
        <li><u>Hover over text</u> with titles to see tooltips in action</li>
        <li><code>Combine formatting</code> with tooltips for rich content</li>
      </ul>
      <p>Select some text and try the Title feature!</p>
    `);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TitleMark
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },
        },
        onUpdate: ({editor}) => {
            const html = editor.getHTML();
            setContent(html);

            // Update tooltips when content changes
            if (editor && editor.view.dom) {
                TooltipManager.updateAllTooltips(editor.view.dom);
            }
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="app-container">
            <h1 className="app-title">
                Tiptap TitleMark Plugin Demo
            </h1>

            <div className="app-grid">
                <EditorContainer editor={editor}/>
                <RenderedHtmlContainer content={content}/>
            </div>
        </div>
    );
}

export default App;
