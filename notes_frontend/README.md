# Notes Frontend

A simple React notes app with a clean, modern light UI and local-only persistence via browser localStorage. No backend is required.

## Features
- Create, edit, pin/unpin, and delete notes
- Local-only persistence with resilient, safe storage and in-memory fallback
- Fast search with client-side filtering and flexible sorting (Updated, Created, Title)
- Responsive split layout, sticky toolbar, and keyboard accessible interactions
- Accessible labels, visible focus styles, aria-live confirmations, and semantic roles
- Light theme by default with an optional header theme toggle (Light/Dark)

## Getting Started
- npm install — install dependencies
- npm start — run the app at http://localhost:3000
- npm test — run the default tests

No environment variables are required for local development or running the app.

## Usage
The app is a single page with a notes list on the left and an editor on the right (on wide screens). Typical flow:
- Click “+ Add Note” to create a new empty note. The new note is selected automatically.
- Click a note in the list to select it. Edit the Title and Content fields in the editor.
- Use the pin button on a note to pin/unpin it. Pinned notes are grouped at the top.
- Use the search field to filter by title or content. Use the sort dropdown to change order:
  - Updated (newest), Created (newest), or Title (A–Z).
- Use Clear all to remove all notes or Delete filtered to remove only the currently filtered set.
- To delete a single note, use the delete icon in the list or the Delete button in the editor.

### Keyboard shortcuts
- Ctrl+S (Windows/Linux) or Cmd+S (macOS): Save updates to the currently selected note. Pressing this triggers an update to the note’s updatedAt timestamp and announces “Note saved.”
- Enter or Space on a focused list item: Select the note.
- Standard Tab/Shift+Tab navigation: Move between toolbar controls, the list, and editor fields.

### Accessibility
- Labels: Inputs have associated labels (including screen-reader-only labels) for search, title, content, and sort controls.
- Roles and live regions: The main app and lists use semantic roles. User actions (create, save, delete) are announced via a visually hidden aria-live region.
- Focus: All interactive controls show clear focus states and support keyboard interaction for selecting, pinning, and deleting.

### Local-only persistence
- Storage: Notes are saved under the localStorage key notes.v1.
- Resilience: If localStorage is unavailable or fails (e.g., quota exceeded), the app falls back to an in-memory copy and shows a non-blocking “Storage issue” banner. Changes may not persist across reloads in that state.
- Privacy: All data stays in the user’s browser and never leaves the device.

### Responsiveness
- Layout adapts to screen size:
  - Desktop: Two-column split (list and editor side-by-side).
  - Tablet: Adjusted column ratios for comfortable editing.
  - Mobile/smaller widths: Single-column stacked sections with a sticky toolbar.
- The toolbar remains sticky under the header for quick access to search, add, and sort.

## Data Model
Each note object is stored with the following shape:
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "createdAt": 1733318400000,
  "updatedAt": 1733318400000,
  "pinned": false
}
```

## Environment
This is a frontend-only application. It does not consume a backend and requires no environment variables to run or build.
