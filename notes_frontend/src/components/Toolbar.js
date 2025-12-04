import React from 'react';

// PUBLIC_INTERFACE
export default function Toolbar({ searchQuery, onSearchChange, onAddNote, sortMode, onSortChange }) {
  /** Toolbar controls: search, add, sort */
  return (
    <div className="toolbar-row" role="region" aria-label="Toolbar">
      <div className="input-with-icon">
        <label htmlFor="search-notes" className="sr-only">Search notes</label>
        <input
          id="search-notes"
          className="input"
          type="search"
          placeholder="Search notes..."
          aria-label="Search notes"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={onAddNote} aria-label="Add note">
        + Add Note
      </button>
      <div>
        <label htmlFor="sort-notes" className="sr-only">Sort notes</label>
        <select
          id="sort-notes"
          className="select"
          value={sortMode}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort notes"
        >
          <option value="updatedDesc">Updated (newest)</option>
          <option value="createdDesc">Created (newest)</option>
          <option value="titleAsc">Title (A–Z)</option>
        </select>
      </div>
    </div>
  );
}
