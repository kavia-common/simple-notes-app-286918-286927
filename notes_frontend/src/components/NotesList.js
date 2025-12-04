import React, { useMemo } from 'react';
import { formatRelativeTime } from '../utils/time';

// PUBLIC_INTERFACE
export default function NotesList({ notes, selectedId, onSelect, onDelete, onTogglePin }) {
  /**
   * Renders notes with pinned items grouped at top under a subtle divider.
   */
  const groups = useMemo(() => {
    const pinned = [];
    const others = [];
    for (const n of notes) {
      (n.pinned ? pinned : others).push(n);
    }
    return { pinned, others };
  }, [notes]);

  const renderNote = (n) => {
    const isSelected = selectedId === n.id;
    const title = n.title?.trim() || 'Untitled';
    const excerpt = (n.content || '').trim().slice(0, 120).replace(/\s+/g, ' ');
    const updated = formatRelativeTime(n.updatedAt);
    return (
      <li key={n.id} role="listitem">
        <div
          className="note-item"
          onClick={() => onSelect(n.id)}
          role="button"
          tabIndex={0}
          aria-selected={isSelected ? 'true' : 'false'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(n.id);
            }
          }}
        >
          <div>
            <h3 className="note-title">{title}</h3>
            <p className="note-excerpt">{excerpt || 'No content yet.'}</p>
            <span className="note-time">Updated {updated}</span>
          </div>
          <div className="note-actions" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="icon-btn"
              title={n.pinned ? 'Unpin note' : 'Pin note'}
              aria-label={n.pinned ? 'Unpin note' : 'Pin note'}
              onClick={() => onTogglePin(n.id)}
            >
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M14 2l6 6-3 3 2 6-6-2-3 3-6-6 3-3L8 2l6 0zM5 19l4-4" />
              </svg>
            </button>
            <button
              type="button"
              className="icon-btn"
              title="Delete note"
              aria-label="Delete note"
              onClick={() => {
                if (window.confirm('Delete this note?')) onDelete(n.id);
              }}
            >
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M9 3h6l1 2h5v2H3V5h5l1-2zm1 6h2v10h-2V9zm4 0h2v10h-2V9z" />
              </svg>
            </button>
          </div>
        </div>
      </li>
    );
  };

  const hasPinned = groups.pinned.length > 0;

  return (
    <ul aria-label="Notes" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {hasPinned && (
        <li style={{ padding: '8px 14px', background: 'rgba(59,130,246,0.06)', fontSize: 12, color: 'var(--color-secondary)' }}>
          Pinned
        </li>
      )}
      {groups.pinned.map(renderNote)}
      {hasPinned && groups.others.length > 0 && (
        <li style={{ padding: '6px 14px', background: 'transparent', fontSize: 12, color: 'var(--color-secondary)', borderTop: '1px solid var(--color-border)' }}>
          Others
        </li>
      )}
      {groups.others.map(renderNote)}
      {notes.length === 0 && (
        <li className="empty">
          <p>No notes match your search.</p>
        </li>
      )}
    </ul>
  );
}
