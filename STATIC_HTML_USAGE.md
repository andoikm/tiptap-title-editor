# TitleMark Functionality for Static HTML Content

This document explains how to use the TitleMark plugin functionality with static HTML content that has been saved to and retrieved from a backend.

## Overview

The TitleMark plugin adds tooltip functionality to text content. When content is saved to a backend and later retrieved, the TitleMark functionality (tooltips) needs to be re-applied to the static HTML content.

## Components

### 1. StaticHtmlRenderer

A reusable component that renders static HTML content with TitleMark tooltip functionality.

```jsx
import StaticHtmlRenderer from './components/StaticHtmlRenderer';

// Basic usage
<StaticHtmlRenderer 
  htmlContent={savedHtmlContent}
  className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto"
/>
```

### 2. SavedContentRenderer

A complete example component that fetches saved content from a backend and renders it with TitleMark functionality.

```jsx
import SavedContentRenderer from './components/SavedContentRenderer';

// Usage with content ID
<SavedContentRenderer 
  contentId="123"
  className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto"
/>
```

### 3. useStaticHtmlTooltips Hook

A custom hook that can be used to add TitleMark functionality to any container with static HTML content.

```jsx
import { useRef } from 'react';
import { useStaticHtmlTooltips } from './components/TooltipPlugin';

const MyComponent = ({ htmlContent }) => {
  const containerRef = useRef(null);
  
  // Apply tooltip functionality
  useStaticHtmlTooltips(containerRef, [htmlContent]);
  
  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
```

## How It Works

1. **HTML Structure**: The TitleMark extension creates HTML elements with `data-title` attributes:
   ```html
   <span data-title="Your tooltip text">Highlighted text</span>
   ```

2. **Tooltip Application**: The `useStaticHtmlTooltips` hook:
   - Finds all elements with `data-title` attributes
   - Applies tippy.js tooltips to these elements
   - Sets up mutation observers to handle dynamic content changes
   - Cleans up tooltips when the component unmounts

3. **Backend Integration**: 
   - Save content using `editor.getHTML()` in the `onUpdate` event
   - Retrieve content from backend
   - Render using `StaticHtmlRenderer` or `useStaticHtmlTooltips`

## Example Workflow

```jsx
// 1. Save content to backend
const editor = useEditor({
  onUpdate: ({ editor }) => {
    const content = editor.getHTML();
    
    // Save to backend
    fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
  }
});

// 2. Retrieve and render content
const SavedContent = ({ contentId }) => {
  const [content, setContent] = useState(null);
  
  useEffect(() => {
    fetch(`/api/content/${contentId}`)
      .then(res => res.json())
      .then(data => setContent(data.htmlContent));
  }, [contentId]);
  
  return content ? (
    <StaticHtmlRenderer htmlContent={content} />
  ) : <div>Loading...</div>;
};
```

## Features

- ✅ Automatic tooltip application to static HTML content
- ✅ Mutation observer for dynamic content changes
- ✅ Proper cleanup to prevent memory leaks
- ✅ Reusable components and hooks
- ✅ TypeScript support
- ✅ Customizable tooltip styling

## Styling

The tooltips use tippy.js with the following default configuration:
- Placement: `top`
- Theme: `light-border`
- Animation: `scale`
- Interactive: `true`

You can customize these settings in the `TooltipPlugin.js` file.

## Best Practices

1. **Always use the provided components/hooks** instead of manually applying tooltips
2. **Include dependencies in the hook array** when using `useStaticHtmlTooltips`
3. **Handle loading and error states** when fetching content from backend
4. **Use proper CSS classes** for consistent styling across editor and static content
5. **Test tooltip functionality** after content updates

## Troubleshooting

### Tooltips not appearing
- Check that HTML content contains `data-title` attributes
- Ensure the container ref is properly set
- Verify that tippy.js is installed and imported

### Tooltips not updating
- Make sure to include content changes in the dependencies array
- Check that mutation observers are properly set up

### Memory leaks
- Ensure cleanup functions are called on component unmount
- Check that tooltips are properly destroyed before creating new ones
