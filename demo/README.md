# Tiptap TitleMark Plugin Demo

This is a demo application showing how to use the `tiptap-titlemark-plugin` (v1.1.0) in a React + Tiptap setup with a modern, modular architecture.

## Features Demonstrated

- ✅ **Complete TitleMark Extension Integration**: Full functionality with modal-based title editing
- ✅ **Modular Component Architecture**: Clean separation of concerns with reusable components
- ✅ **Advanced Toolbar**: Complete formatting toolbar with title functionality
- ✅ **Real-time HTML Preview**: Live rendering with tooltip support
- ✅ **Auto-focus Modal**: Enhanced UX with automatic input focus
- ✅ **Responsive Design**: Works seamlessly on all screen sizes
- ✅ **TypeScript Support**: Full type safety throughout the application
- ✅ **CSS Separation**: Organized styles for better maintainability
- ✅ **Production Ready**: Stable version 1.1.0 with no breaking changes

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3001`

## How to Use

1. **Select Text**: Click and drag to select text in the editor
2. **Add Title**: Click the "T" button in the toolbar and enter your tooltip text
3. **View Tooltips**: Hover over the highlighted text to see the tooltip
4. **Format Text**: Use the toolbar buttons for bold, italic, headings, lists, etc.
5. **Real-time Preview**: See your content rendered in the right panel with working tooltips

## Code Structure

### Main Components

- `src/App.jsx` - Main application component with editor configuration
- `src/App.css` - Centralized styles for all components

### Component Modules

- `src/components/Toolbar.jsx` - Complete formatting toolbar with title functionality
- `src/components/EditorContainer.jsx` - Editor wrapper with tooltip integration
- `src/components/RenderedHtmlContainer.jsx` - Real-time HTML preview with tooltips
- `src/components/Button.jsx` - Reusable button component
- `src/components/TooltipManager.js` - Tooltip management utility

### Architecture Benefits

- **Modularity**: Each component has a single responsibility
- **Reusability**: Components can be easily reused in other projects
- **Maintainability**: Clean separation of concerns
- **Testability**: Smaller components are easier to test
- **Performance**: CSS classes instead of inline styles

## Integration Guide

This demo shows how to:

1. **Import and Configure**: Set up the TitleMark extension with Tiptap
2. **Component Architecture**: Create modular, reusable components
3. **Tooltip Integration**: Use TooltipManager for automatic tooltip handling
4. **State Management**: Handle editor state and content updates
5. **Styling**: Organize CSS for better maintainability
6. **User Experience**: Implement auto-focus and responsive design

## Key Features

### Auto-focus Modal
The title modal automatically focuses the input field when opened, providing a seamless user experience.

### Real-time Preview
The right panel shows a live preview of the rendered HTML with working tooltips, allowing users to see exactly how their content will appear.

### Responsive Toolbar
The toolbar includes all common formatting options:
- Text formatting (Bold, Italic, Underline, Strikethrough, Code)
- Headings (H1, H2)
- Lists (Bullet, Numbered)
- Title functionality (with special styling)

### Tooltip Management
The TooltipManager automatically handles:
- Tooltip initialization
- DOM change subscriptions
- Cleanup and memory management
- Cross-browser compatibility

## Customization

You can customize the demo by:

- **Styling**: Modify `App.css` for different visual themes
- **Components**: Extend or modify individual components
- **Toolbar**: Add new formatting options to the toolbar
- **Modal**: Customize the title modal appearance and behavior
- **Tooltips**: Adjust tooltip styling and behavior via TooltipManager options

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Tech Stack

- **React 18** - UI framework
- **Tiptap 3** - Rich text editor
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tippy.js** - Tooltip library

## Contributing

Feel free to submit issues and enhancement requests!

## License

This demo is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
