# Tiptap TitleMark Plugin

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
- ✅ **NEW**: Auto-focus modal input for better UX
- ✅ **NEW**: Refactored demo with modular components

## Installation

```bash
npm install tiptap-titlemark-plugin
```

**🎯 [Try the Live Demo →](https://andoikm.github.io/tiptap-title-editor/)**

> 🎯 **See it in action**: [Live Demo](https://andoikm.github.io/tiptap-title-editor/) | [GitHub Repository](https://github.com/andoikm/tiptap-title-editor)

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

#### `toggleTitleModal()`

Opens the title modal for the currently selected text. This is the recommended way to add titles as it provides a better user experience.

```javascript
editor.chain().focus().toggleTitleModal().run();
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
    const handleAddTitle = () => {
        if (!editor) return;

        const {from, to} = editor.state.selection;
        if (from === to) {
            alert('Please select some text first!');
            return;
        }

        // Use the built-in modal for better UX
        editor.chain().focus().toggleTitleModal().run();
    };

    return (
        <button onClick={handleAddTitle}>
            Add Title
        </button>
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

Then open your browser to `http://localhost:3001` to see the demo.

### Demo Features

The demo showcases:

- ✅ **Modular Component Architecture**: Clean separation of concerns with reusable components
- ✅ **Toolbar Integration**: Complete formatting toolbar with title functionality
- ✅ **Real-time Preview**: Live HTML rendering with tooltip support
- ✅ **Auto-focus Modal**: Enhanced UX with automatic input focus
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **TypeScript Support**: Full type safety throughout

### Demo Structure

```
demo/src/
├── App.jsx                    # Main application component
├── App.css                    # Styles for all components
└── components/
    ├── Toolbar.jsx           # Toolbar with formatting buttons
    ├── EditorContainer.jsx   # Editor wrapper component
    ├── RenderedHtmlContainer.jsx # Rendered HTML display
    ├── Button.jsx            # Reusable button component
    └── TooltipManager.js     # Tooltip management utility
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
