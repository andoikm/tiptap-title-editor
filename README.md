# Tiptap Title Editor

A React-based rich text editor built with Tiptap that includes a custom Title mark extension with tooltip functionality.

## Features

- **Rich Text Editing**: Full-featured text editor with bold, italic, and strike formatting
- **Custom Title Mark**: Add titles to selected text that display as tooltips on hover
- **Interactive Tooltips**: Hover over title-marked text to see the associated title
- **Modern UI**: Clean, responsive design with a beautiful gradient background
- **Modal Interface**: Easy-to-use modal dialog for adding titles to selected text

## How to Use

1. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/`

2. **Adding Titles to Text**:
   - Select any text in the editor
   - Click the "Add Title" button
   - Enter a title in the modal dialog
   - Click "Add Title" to apply

3. **Viewing Titles**:
   - Hover over any text that has a title applied
   - A tooltip will appear showing the title

4. **Removing Titles**:
   - Place your cursor on title-marked text
   - Click the "Remove Title" button

## Technical Implementation

### Custom TitleMark Extension
- Works as a mark (similar to bold/italic)
- Stores title attribute in `data-title` HTML attribute
- Provides commands: `setTitle`, `toggleTitle`, `unsetTitle`

### Tooltip Plugin
- Uses `tippy.js` for smooth, interactive tooltips
- Automatically attaches tooltips to elements with `data-title` attributes
- Handles tooltip cleanup and reattachment on editor updates

### Styling
- Title-marked text has a dotted blue underline
- Light blue background highlight
- Smooth hover transitions
- Cursor changes to "help" on title-marked text

## Project Structure

```
src/
├── components/
│   ├── TiptapEditor.jsx      # Main editor component
│   ├── TiptapEditor.css      # Editor styles
│   ├── TitleButton.jsx       # Title management UI
│   ├── TitleButton.css       # Button and modal styles
│   └── TooltipPlugin.js      # Tippy.js integration
├── extensions/
│   └── TitleMark.js          # Custom title mark extension
└── App.jsx                   # Main app component
```

## Dependencies

- `@tiptap/react` - React integration for Tiptap
- `@tiptap/core` - Core Tiptap functionality
- `@tiptap/starter-kit` - Basic editor extensions
- `tippy.js` - Tooltip library

## Development

This project was built with:
- **Vite** - Fast build tool and dev server
- **React 18** - Modern React with hooks
- **Tiptap** - Extensible rich text editor
- **CSS** - Custom styling with modern design

## Testing the Features

1. **Basic Editing**: Try the bold, italic, and strike buttons
2. **Title Feature**: 
   - Select some text
   - Click "Add Title" 
   - Enter a title like "Important note"
   - Hover over the text to see the tooltip
3. **Title Removal**: Click "Remove Title" to remove the title mark

The editor includes sample content to get you started. All features are fully functional and ready to use!
