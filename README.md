# Tiptap TitleMark Plugin

> ⚠️ **This package is currently under active development and is not production-ready. Breaking changes may occur at any time.**

A Tiptap extension that adds title/tooltip functionality to text selections. This plugin allows users to add custom
titles to selected text, which are displayed as tooltips on hover.

## 🎯 Live Demo

**[🌐 Try the Live Demo](https://andoikm.github.io/tiptap-title-editor/)**

> **Interactive Demo**: Select text in the editor and add custom titles that appear as tooltips on hover!

## Features

- ✅ Add titles to selected text in Tiptap editor
- ✅ Tooltip display on hover using tippy.js
- ✅ TypeScript support with full type definitions
- ✅ Compatible with Tiptap v2 and v3
- ✅ Lightweight and performant
- ✅ Easy to integrate and customize
- ✅ **NEW**: TooltipManager utility - No useEffect required!

## Installation

```bash
npm install tiptap-titlemark-plugin
```

**🎯 [Try the Live Demo →](https://andoikm.github.io/tiptap-title-editor/)**

> 🎯 **See it in action
**: [Live Demo](https://andoikm.github.io/tiptap-title-editor/) | [GitHub Repository](https://github.com/andoikm/tiptap-title-editor)

## Basic Usage

```javascript
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {TitleMark, TooltipManager} from 'tiptap-titlemark-plugin';

const MyEditor = () => {
    const editor = useEditor({
        extensions: [StarterKit, TitleMark],
        content: '<p>Select some text and add a title!</p>',
        onUpdate: ({editor}) => {
            // Update tooltips when content changes - No useEffect needed!
            if (editor && editor.view.dom) {
                TooltipManager.updateAllTooltips(editor.view.dom);
            }
        },
    });

    return <EditorContent editor={editor}/>;
};
```

## TooltipManager Utility

The `TooltipManager` provides a clean way to handle tooltips without useEffect:

### Basic Usage

```javascript
import {TooltipManager} from 'tiptap-titlemark-plugin';

// Initialize tooltips for a container
TooltipManager.initTooltips(containerElement);

// Subscribe to automatic tooltip updates (recommended)
TooltipManager.subscribe('[data-rendered-html]');

// Update tooltips for editor and rendered HTML sections
TooltipManager.updateAllTooltips(editorElement);

// Cleanup tooltips
TooltipManager.cleanupAll();
```

### Advanced Usage

```javascript
import {TooltipManager, TooltipOptions} from 'tiptap-titlemark-plugin';

const options: TooltipOptions = {
    placement: 'top',
    arrow: true,
    theme: 'light-border',
    animation: 'scale',
    duration: [200, 150],
    interactive: true,
    zIndex: 9999,
    trigger: 'mouseenter',
    hideOnClick: false,
};

// Initialize with custom options
TooltipManager.initTooltips(container, options);

// Create a tooltip for a specific element
TooltipManager.createTooltip(element, 'Custom tooltip text', options);
```

## API Reference

### TitleMark Extension

The `TitleMark` extension provides the following commands:

#### `setTitle(attributes)`

Adds a title to the currently selected text.

```javascript
editor.chain().focus().setTitle({title: 'Your tooltip text'}).run();
```

#### `toggleTitle(attributes)`

Toggles a title on the currently selected text.

```javascript
editor.chain().focus().toggleTitle({title: 'Your tooltip text'}).run();
```

#### `unsetTitle()`

Removes the title from the currently selected text.

```javascript
editor.chain().focus().unsetTitle().run();
```

### TooltipManager Class

#### `initTooltips(container, options?)`

Initialize tooltips for all `[data-title]` elements in a container.

#### `subscribe(target, options?)`

Subscribe to DOM changes and automatically update tooltips. Returns an unsubscribe function.

```javascript
// Subscribe to a selector
const unsubscribe = TooltipManager.subscribe('[data-rendered-html]');

// Subscribe to an element
const unsubscribe = TooltipManager.subscribe(elementRef);

// Cleanup
unsubscribe();
```

#### `unsubscribe(target)`

Unsubscribe from DOM changes for a specific element.

#### `unsubscribeAll()`

Unsubscribe from all DOM changes.

#### `updateAllTooltips(editorElement, renderedSelector?, options?)`

Update tooltips for both editor and rendered HTML sections.

#### `cleanupTooltips(container)`

Remove all tooltips from a specific container.

#### `cleanupAll()`

Remove all tooltips from the entire application.

#### `createTooltip(element, content, options?)`

Create a tooltip for a specific element.

### Options

The `TitleMark` extension accepts the following options:

```javascript
import {TitleMark} from 'tiptap-titlemark-plugin';

const TitleMarkWithOptions = TitleMark.configure({
    HTMLAttributes: {
        class: 'my-custom-title-class',
    },
});
```

## Complete Example

Here's a complete example showing how to use the TitleMark plugin with TooltipManager:

```jsx
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {useState} from 'react';
import {TitleMark, TooltipManager} from 'tiptap-titlemark-plugin';

const TitleButton = ({editor}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleText, setTitleText] = useState('');

    const handleAddTitle = () => {
        if (!editor || !titleText.trim()) return;

        const {from, to} = editor.state.selection;
        if (from === to) {
            alert('Please select some text first!');
            return;
        }

        editor.chain().focus().setTitle({title: titleText.trim()}).run();
        setTitleText('');
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>
                Add Title
            </button>

            {isModalOpen && (
                <div className="modal">
                    <input
                        type="text"
                        value={titleText}
                        onChange={(e) => setTitleText(e.target.value)}
                        placeholder="Enter title..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAddTitle();
                            }
                        }}
                    />
                    <button onClick={handleAddTitle}>Add</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
            )}
        </>
    );
};

const MyEditor = () => {
    const editor = useEditor({
        extensions: [StarterKit, TitleMark],
        content: '<p>Select some text and try the Title feature!</p>',
        onUpdate: ({editor}) => {
            // Update tooltips when content changes - No useEffect needed!
            if (editor && editor.view.dom) {
                TooltipManager.updateAllTooltips(editor.view.dom);
            }
        },
    });

    if (!editor) return null;

    return (
        <div>
            <TitleButton editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    );
};
```

## HTML Output

The TitleMark extension generates HTML with `data-title` attributes:

```html
<span data-title="Your tooltip text">Highlighted text</span>
```

## Demo

### 🌐 Live Demo

**[Try the live demo →](https://andoikm.github.io/tiptap-title-editor/)**

### 🏃‍♂️ Local Development

To run the demo locally:

```bash
cd demo
npm install
npm run dev
```

Then open your browser to `http://localhost:3000` to see the demo.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
