# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2024-08-11

### Added
- **Auto-focus Modal Input**: Enhanced UX with automatic input focus when title modal opens
- **Modular Demo Architecture**: Refactored demo with clean component separation
- **CSS Separation**: Moved all styles to dedicated CSS file for better maintainability
- **Enhanced Tooltip Management**: Improved tooltip integration with proper DOM subscriptions
- **Comprehensive Documentation**: Updated README files with current features and architecture
- **License Compliance**: Added proper LICENSE files and ACKNOWLEDGMENTS.md
- **Component Breakdown**: Split monolithic App.jsx into focused, reusable components

### Changed
- **Demo Structure**: Reorganized demo into modular components (Toolbar, EditorContainer, RenderedHtmlContainer)
- **Tooltip Integration**: Updated to use main package TooltipManager instead of local version
- **Documentation**: Completely updated README files to reflect current state
- **Build Process**: Enhanced build configuration and file inclusion

### Fixed
- **Tooltip Functionality**: Fixed tooltip hover issues in EditorContainer
- **Import Paths**: Corrected CSS import paths in components
- **License Attribution**: Fixed copyright holder information in LICENSE files
- **Package Files**: Added LICENSE and ACKNOWLEDGMENTS.md to npm package

### Technical Improvements
- **Performance**: CSS classes instead of inline styles
- **Maintainability**: Single responsibility components
- **Reusability**: Modular component architecture
- **Type Safety**: Full TypeScript support throughout
- **Accessibility**: Enhanced focus management and keyboard navigation

## [1.0.5] - Previous Release

### Added
- Initial release with basic title/tooltip functionality
- Tiptap extension integration
- Basic demo application

### Changed
- Core functionality implementation

## [1.0.4-alpha.0] - Previous Release

### Added
- Alpha release with experimental features

## [1.0.5-beta.0] - Previous Release

### Added
- Beta release with testing features
