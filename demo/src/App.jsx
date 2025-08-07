import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import {useEffect, useRef, useState} from 'react';
import {TitleMark} from '../../src/index';
import {TooltipManager} from './components/TooltipManager';
import TitleButton from './components/TitleButton';
import {Button} from "./components/Button.jsx";

// Toolbar component with formatting buttons
const Toolbar = ({editor}) => {
    if (!editor) return null;

    const toggleBold = () => editor.chain().focus().toggleBold().run();
    const toggleItalic = () => editor.chain().focus().toggleItalic().run();
    const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
    const toggleStrike = () => editor.chain().focus().toggleStrike().run();
    const toggleCode = () => editor.chain().focus().toggleCode().run();
    const toggleHeading = (level) => editor.chain().focus().toggleHeading({level}).run();
    const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
    const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();

    return (
        <div style={{
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            alignItems: 'center'
        }}>
            <div style={{fontWeight: 'bold', marginRight: '12px', color: '#ffffffde'}}>
                Formatting:
            </div>

            <Button
                onClick={toggleBold}
                isActive={editor.isActive('bold')}
                title="Bold"
            >
                B
            </Button>

            <Button
                isActive={editor.isActive('italic')}
                onClick={toggleItalic}
                title="Italic"
            >
                I
            </Button>

            <Button
                onClick={toggleUnderline}
                isActive={editor.isActive('underline')}
                title="Underline"
            >
                U
            </Button>

            <Button
                onClick={toggleStrike}
                isActive={editor.isActive('strike')}
                title="Strikethrough"
            >
                S
            </Button>

            <Button
                onClick={toggleCode}
                isActive={editor.isActive('code')}
                title="Code"
            >
                {'</>'}
            </Button>

            <div style={{
                marginLeft: '12px', borderLeft: '1px solid #cbd5e1', paddingLeft: '12px', display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
            }}>
                <Button
                    onClick={() => toggleHeading(1)}
                    isActive={editor.isActive('heading', {level: 1})}
                    title="Heading 1"
                >
                    H1
                </Button>

                <Button
                    onClick={() => toggleHeading(2)}
                    isActive={editor.isActive('heading', {level: 2})}
                    title="Heading 2"
                >
                    H2
                </Button>
            </div>

            <div style={{
                marginLeft: '12px', borderLeft: '1px solid #cbd5e1', paddingLeft: '12px', display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
            }}>
                <Button
                    onClick={toggleBulletList}
                    isActive={editor.isActive('bulletList')}
                    title="Bullet List"
                >
                    •
                </Button>

                <Button
                    onClick={toggleOrderedList}
                    isActive={editor.isActive('orderedList')}
                    title="Numbered List"
                >
                    1.
                </Button>
            </div>
        </div>
    );
};

function App() {
    const [content, setContent] = useState(`
      <h2>Welcome to Tiptap TitleMark Plugin Demo! 🎉</h2>
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
    const renderedHtmlRef = useRef(null);

    const editor = useEditor({
        extensions: [StarterKit, Underline, TitleMark],
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
        <div style={{maxWidth: '900px', margin: '0 auto', padding: '20px'}}>
            <h1 style={{textAlign: 'center', color: '#1e293b', marginBottom: '24px'}}>
                Tiptap TitleMark Plugin Demo
            </h1>

            <div style={{marginBottom: '20px'}}>
                <TitleButton editor={editor}/>
            </div>
            <div>
                <div style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '20px',
                    backgroundColor: 'rgb(36 36 36)'
                }}>
                    <h3 style={{marginTop: '0', color: '#ffffffde'}}>Editor with Formatting Tools</h3>

                    <Toolbar editor={editor}/>

                    <EditorContent editor={editor}/>
                </div>

                {content && (
                    <div style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '20px',
                        backgroundColor: 'rgb(36 36 36)'
                    }}>
                        <h3 style={{marginTop: '0', color: '#ffffffde'}}>Rendered HTML (with tooltips)</h3>
                        <div
                            ref={renderedHtmlRef}
                            data-rendered-html="true"
                            dangerouslySetInnerHTML={{__html: content}}
                            className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
