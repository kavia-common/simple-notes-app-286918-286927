# Notes Frontend

A simple React notes app with clean, modern UI and localStorage persistence.

## Features
- Add, edit, delete, and pin notes
- Local persistence with resilient safe storage
- Search and sorting (Updated, Created, Title)
- Responsive split layout with sticky toolbar
- Accessible labels, focus styles, and aria-live confirmations
- Light theme by default, optional theme toggle

## Getting Started
- npm start — run the app at http://localhost:3000
- npm test — run the default tests

## Usage
- Use the "Add Note" button to create a new note.
- Select a note from the list to edit the title and content.
- Use the pin icon to pin/unpin notes. Pinned notes appear at the top.
- Search by title or content; sorting can be changed from the dropdown.
- Delete a single note from the list or clear all notes from the list header.

## Data Model
Each note:
```
{
  id: string,
  title: string,
  content: string,
  createdAt: number,
  updatedAt: number,
  pinned?: boolean
}
```

## Persistence
Notes are stored in localStorage under the key `notes.v1`. If storage is unavailable or errors occur (e.g., quota exceeded), the app falls back to in-memory state and shows a non-blocking banner.

## Environment
No special env variables are required for this frontend-only app.
