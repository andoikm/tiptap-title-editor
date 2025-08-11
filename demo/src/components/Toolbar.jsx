import {Button} from "./Button.jsx";
import '../App.css';

// Toolbar component with formatting buttons
export const Toolbar = ({editor}) => {
    if (!editor) return null;

    const toggleBold = () => editor.chain().focus().toggleBold().run();
    const toggleItalic = () => editor.chain().focus().toggleItalic().run();
    const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
    const toggleStrike = () => editor.chain().focus().toggleStrike().run();
    const toggleCode = () => editor.chain().focus().toggleCode().run();
    const toggleHeading = (level) => editor.chain().focus().toggleHeading({level}).run();
    const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
    const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
    const toggleTitleModal = () => editor.chain().focus().toggleTitleModal().run();

    return (
        <div className="toolbar">
            <div className="toolbar-section-label">
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

            <div className="toolbar-section">
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

            <div className="toolbar-section">
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

            <div className="toolbar-section">
                <Button
                    isSpecial={true}
                    className="title-button"
                    onClick={toggleTitleModal}
                    isActive={editor.isActive('title')}
                    title="Edit Title"
                >
                    T
                </Button>
            </div>
        </div>
    );
};
