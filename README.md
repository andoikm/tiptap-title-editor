# Tiptap Title Editor

A React-based rich text editor using Tiptap with a custom title feature.

## Features

- Rich text editing with Tiptap
- Custom title mark extension
- Tooltip functionality
- Modern React with hooks

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Code Quality Configuration

This project uses a comprehensive setup for code quality and formatting:

### ESLint Configuration

The project uses ESLint with the following features:

- **React-specific rules**: Enforces React best practices and hooks rules
- **Accessibility rules**: Ensures JSX elements follow accessibility guidelines
- **Import organization**: Automatically sorts and organizes imports
- **Code quality rules**: Prevents common JavaScript errors and enforces best practices
- **Prettier integration**: Works seamlessly with Prettier for consistent formatting

### Prettier Configuration

Prettier is configured with the following settings:

- **Single quotes**: Uses single quotes for strings
- **Semicolons**: Adds semicolons where needed
- **Trailing commas**: Adds trailing commas in objects and arrays
- **80 character line width**: Wraps lines at 80 characters
- **2 space indentation**: Uses 2 spaces for indentation
- **JSX formatting**: Properly formats JSX elements

### VS Code Integration

The project includes VS Code configuration for optimal development experience:

- **Auto-formatting**: Code is automatically formatted on save
- **ESLint integration**: ESLint errors are shown in the editor
- **Recommended extensions**: Suggests useful extensions for development

### Configuration Files

- `.prettierrc` - Prettier configuration
- `.prettierignore` - Files to ignore during formatting
- `eslint.config.js` - ESLint configuration
- `.vscode/settings.json` - VS Code settings
- `.vscode/extensions.json` - Recommended VS Code extensions

### Best Practices

1. **Run linting before commits**: Use `npm run lint` to check for issues
2. **Auto-fix when possible**: Use `npm run lint:fix` to automatically fix issues
3. **Format code regularly**: Use `npm run format` to maintain consistent formatting
4. **Check formatting in CI**: Use `npm run format:check` in CI/CD pipelines

## Project Structure

```
src/
├── components/
│   ├── TiptapEditor.jsx
│   ├── TitleButton.jsx
│   └── TooltipPlugin.js
├── extensions/
│   └── TitleMark.js
├── App.jsx
└── main.jsx
```

## Usage

1. Start the development server: `npm run dev`
2. Open your browser to the local development URL
3. Select text in the editor and use the "Add Title" button to add titles
4. Use the "Remove Title" button to remove titles from selected text

## Contributing

1. Ensure all code passes linting: `npm run lint`
2. Format code before committing: `npm run format`
3. Follow the established code style and conventions
