# Tiptap TitleMark Plugin Demo

This is a demo application showing how to use the `tiptap-titlemark-plugin` in a React + Tiptap setup.

## Features Demonstrated

- ✅ Basic TitleMark extension integration
- ✅ Custom title button with modal
- ✅ Tooltip functionality using tippy.js
- ✅ Real-time HTML rendering with tooltips
- ✅ Complete working example

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`

## How to Use

1. **Select Text**: Click and drag to select text in the editor
2. **Add Title**: Click the "Add Title" button and enter your tooltip text
3. **View Tooltips**: Hover over the highlighted text to see the tooltip
4. **Remove Titles**: Use the "Remove Title" button to remove titles from selected text

## Code Structure

- `src/App.jsx` - Main demo application
- `src/components/TitleButton.jsx` - Custom button component for adding titles
- `src/components/TooltipPlugin.js` - Tooltip integration using tippy.js

## Integration Guide

This demo shows how to:

1. Import and configure the TitleMark extension
2. Create custom UI components for title management
3. Integrate tooltip functionality
4. Handle editor state and content updates

## Customization

You can customize the demo by:

- Modifying the tooltip styling in `TooltipPlugin.js`
- Changing the button UI in `TitleButton.jsx`
- Adjusting the editor configuration in `App.jsx`
- Adding additional features like title validation or persistence
