import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Toolbar from './Toolbar';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';
import EmptyState from './EmptyState';
import { useNotes } from '../hooks/useNotes';

// PUBLIC_INTERFACE
export default function NotesApp() {
  /**
   * Parent layout orchestrating Toolbar, NotesList, NoteEditor.
   * Manages selectedNoteId, searchQuery, sortMode; handles responsive layout and aria-live announcements.
   */
  const {
    notes,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    bulkDelete,
    clearAll,
    getNoteById,
    getSortedFilteredNotes,
    error,
  } = useNotes();

  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState('updatedDesc'); // updatedDesc | createdDesc | titleAsc

  const liveRef = useRef(null);
  useEffect(() => {
    liveRef.current = document.getElementById('aria-live-region');
  }, []);

  const announce = useCallback((msg) => {
    if (liveRef.current) {
      liveRef.current.textContent = msg;
      setTimeout(() => {
        if (liveRef.current) liveRef.current.textContent = '';
      }, 1200);
    }
  }, []);

  const handleAddNote = useCallback(() => {
    const newNote = addNote();
    setSelectedNoteId(newNote.id);
    announce('New note created');
  }, [addNote, announce]);

  const handleSelect = useCallback((id) => {
    setSelectedNoteId(id);
  }, []);

  const handleDelete = useCallback((id) => {
    deleteNote(id);
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
    announce('Note deleted');
  }, [deleteNote, selectedNoteId, announce]);

  const handleTogglePin = useCallback((id) => {
    togglePin(id);
  }, [togglePin]);

  const selectedNote = useMemo(() => {
    return selectedNoteId ? getNoteById(selectedNoteId) : null;
  }, [selectedNoteId, getNoteById]);

  const filteredSorted = useMemo(() => {
    return getSortedFilteredNotes(searchQuery, sortMode);
  }, [getSortedFilteredNotes, searchQuery, sortMode]);

  const hasNotes = notes.length > 0;

  return (
    <section aria-label="Notes application" className="notes-app">
      {error && (
        <div role="status" aria-live="polite" className="card" style={{ padding: 12, borderColor: 'var(--color-error)' }}>
          <strong style={{ color: 'var(--color-error)' }}>Storage issue:</strong>{' '}
          Using in-memory fallback. Your changes might not persist.
        </div>
      )}

      <div className="toolbar">
        <div className="container">
          <Toolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddNote={handleAddNote}
            sortMode={sortMode}
            onSortChange={setSortMode}
          />
        </div>
      </div>

      <div className="layout">
        <div className="card notes-list" aria-label="Notes list">
          <div className="notes-list-header">
            <div className="note-meta">
              <strong>Notes</strong>
              <span className="note-time">{filteredSorted.length} items</span>
            </div>
            {hasNotes ? (
              <div className="note-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    if (window.confirm('Delete ALL notes? This cannot be undone.')) {
                      clearAll();
                      setSelectedNoteId(null);
                      announce('All notes cleared');
                    }
                  }}
                >
                  Clear all
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    const toDelete = filteredSorted.map(n => n.id);
                    if (toDelete.length && window.confirm(`Delete ${toDelete.length} filtered note(s)?`)) {
                      bulkDelete(toDelete);
                      if (toDelete.includes(selectedNoteId)) setSelectedNoteId(null);
                      announce('Filtered notes deleted');
                    }
                  }}
                >
                  Delete filtered
                </button>
              </div>
            ) : null}
          </div>
          <div className="notes-scroll" role="list">
            <NotesList
              notes={filteredSorted}
              selectedId={selectedNoteId}
              onSelect={handleSelect}
              onDelete={handleDelete}
              onTogglePin={handleTogglePin}
            />
          </div>
        </div>

        <div className="card editor" aria-label="Note editor">
          {selectedNote ? (
            <NoteEditor
              note={selectedNote}
              onChange={(patch) => {
                updateNote(selectedNote.id, patch);
                if (patch.title || patch.content) {
                  announce('Note saved');
                }
              }}
              onDelete={() => handleDelete(selectedNote.id)}
            />
          ) : hasNotes ? (
            <EmptyState title="Select a note" description="Choose a note from the list to view or edit its contents." />
          ) : (
            <EmptyState
              title="No notes yet"
              description="Create your first note with the Add Note button."
            />
          )}
        </div>
      </div>
    </section>
  );
}
