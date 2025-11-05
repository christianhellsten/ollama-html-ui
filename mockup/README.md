# Static UI Mockup - Main Chat Interface

This is a minimal static mockup of the Ollama HTML UI chat interface, built with modern HTML, CSS, and vanilla JavaScript.

## Overview

This mockup demonstrates the **Main Chat Interface** view with feature parity to the existing UI, but using only static HTML/CSS/JavaScript without any build tools or frameworks.

## Features Implemented

### Layout
- **CSS Grid-based layout** with responsive design
- Header with hamburger menu, editable chat title, and settings button
- Collapsible sidebar with chat list
- Main chat area with message history
- Chat controls sidebar with menu and scroll buttons
- Model selector bar
- Chat input form with auto-resizing textarea

### Styling
- **CSS Variables** for theming (colors, spacing, typography, etc.)
- **Dark mode support** via `prefers-color-scheme` media query
- Modern design with rounded corners, shadows, and smooth transitions
- Responsive breakpoints for mobile, tablet, and desktop
- Custom scrollbar styling

### Interactivity (JavaScript)
- ✅ Dropdown menus (sidebar menu, chat menu, model selector)
- ✅ Sidebar toggle (hamburger menu)
- ✅ Chat list selection and management
- ✅ Search functionality for chats
- ✅ New chat creation
- ✅ Chat title editing (contenteditable)
- ✅ Message sending (simulated)
- ✅ Auto-resizing textarea
- ✅ Scroll to top/bottom controls
- ✅ Copy to clipboard functionality
- ✅ Message actions (good/bad/flag/delete)
- ✅ Responsive behavior
- ✅ Delete chat/message confirmations

## File Structure

```
mockup/
├── index.html    # Main HTML structure
├── style.css     # Modern CSS with grid layout and variables
├── script.js     # Interactive behaviors (vanilla JS)
└── README.md     # This file
```

## Technologies Used

- **HTML5**: Semantic markup with accessibility attributes
- **CSS3**: Grid layout, Flexbox, CSS variables, media queries
- **JavaScript (ES6+)**: Classes, arrow functions, template literals, modern DOM APIs

## Key Design Decisions

### CSS Architecture
- **CSS Variables** for all colors, spacing, typography, and layout dimensions
- **CSS Grid** for main layout structure (header, content, footer)
- **Flexbox** for component-level layouts
- **Mobile-first** responsive design
- **Dark mode** support with automatic theme switching

### JavaScript Architecture
- **No dependencies**: Pure vanilla JavaScript
- **State management**: Simple state object for app state
- **Event delegation**: Efficient event handling
- **Modular code**: Organized by feature/concern
- **ES6+ features**: Classes, arrow functions, destructuring, etc.

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Semantic HTML structure

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid support required (>95% global support)
- ES6 JavaScript support required

## Usage

Simply open `index.html` in a web browser. No build process or server required.

```bash
# Open in browser
open mockup/index.html

# Or use a simple HTTP server
cd mockup
python3 -m http.server 8000
# Then open http://localhost:8000
```

## Feature Parity with Original UI

| Feature | Status | Notes |
|---------|--------|-------|
| Chat history display | ✅ | Static sample messages |
| Message input | ✅ | With auto-resize |
| Send message | ✅ | Simulated response |
| Sidebar with chat list | ✅ | Fully functional |
| Chat selection | ✅ | Switches active chat |
| Search chats | ✅ | Client-side filtering |
| New chat | ✅ | Clears chat area |
| Delete chat | ✅ | With confirmation |
| Edit chat title | ✅ | Contenteditable |
| Message actions | ✅ | Copy, good/bad/flag, delete |
| Scroll controls | ✅ | Smooth scrolling |
| Dropdown menus | ✅ | All menus functional |
| Model selector | ✅ | Button with dropdown (placeholder) |
| Responsive design | ✅ | Mobile sidebar toggle |
| Dark mode | ✅ | Auto-switching |
| Settings dialog | ⏳ | Next view to implement |
| Chat settings dialog | ⏳ | Next view to implement |
| IndexedDB persistence | ⏳ | Static mockup only |
| Ollama API integration | ⏳ | Static mockup only |

## Next Steps

The following views/features need to be implemented:

1. **Settings Dialog** - Modal for API configuration, model selection, system prompt
2. **Chat Settings Dialog** - Per-chat configuration overlay
3. **Sidebar** (enhanced) - Export/import functionality
4. **Additional features** - Markdown rendering, code highlighting, etc.

## Notes

- This is a **static mockup** for UI/UX demonstration
- No actual API calls or data persistence
- Messages and AI responses are simulated
- Focus is on layout, styling, and interactive behaviors
- Code is intentionally simple and documented for clarity

## CSS Variables Reference

### Colors
- `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-tertiary`
- `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`
- `--color-border`, `--color-border-light`, `--color-border-dark`
- `--color-primary`, `--color-secondary`, `--color-success`, `--color-warning`, `--color-danger`

### Spacing
- `--space-xs` to `--space-2xl` (0.25rem to 3rem)

### Typography
- `--font-family`, `--font-family-mono`
- `--font-size-xs` to `--font-size-2xl`
- `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed`

### Layout
- `--sidebar-width`, `--chat-controls-width`
- `--header-height`, `--model-selector-height`

### Other
- Border radius, shadows, transitions, z-index values

## Development Tips

To customize the mockup:

1. **Colors**: Edit CSS variables in `:root` selector
2. **Layout**: Adjust grid template columns/rows in main containers
3. **Spacing**: Modify spacing variables
4. **Interactivity**: Add/modify event handlers in script.js
5. **Content**: Edit HTML directly or use JavaScript to generate dynamic content

## License

Same as the parent project.
