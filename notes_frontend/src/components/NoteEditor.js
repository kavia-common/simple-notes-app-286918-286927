import React, { useEffect, useRef } from 'react';
import { formatRelativeTime } from '../utils/time';

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onChange, onDelete }) {
  /**
   * Controlled editor for a selected note.
   * Saves on change via onChange; supports Ctrl/Cmd+S to announce save.
   */
  const titleRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const isSave = (e.ctrlKey || e.metaKey) && (e.key === 's' || e.code === 'KeyS');
      if (isSave) {
        e.preventDefault();
        // Announce via aria-live in parent (onChange triggers parent announce)
        onChange({ updatedAt: Date.now() });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onChange]);

  return (
    <>
      <div className="editor-row">
        <h2 className="editor-title">Editor</h2>
        <div className="editor-controls">
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => {
              if (window.confirm('Delete this note?')) onDelete();
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onChange({ updatedAt: Date.now() })}
          >
            Save
          </button>
        </div>
      </div>
      <label className="sr-only" htmlFor="note-title">Title</label>
      <input
        id="note-title"
        ref={titleRef}
        className="input"
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={(e) =>
          onChange({ title: e.target.value, updatedAt: Date.now() })
        }
      />
      <label className="sr-only" htmlFor="note-content">Content</label>
      <textarea
        id="note-content"
        className="textarea"
        placeholder="Write your note here..."
        value={note.content}
        onChange={(e) =>
          onChange({ content: e.target.value, updatedAt: Date.now() })
        }
      />
      <div className="editor-row">
        <span className="editor-updated">
          Last updated {formatRelativeTime(note.updatedAt)}
        </span>
      </div>
    </>
  );
}
