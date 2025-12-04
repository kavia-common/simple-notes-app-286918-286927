import { useCallback, useMemo } from 'react';
import { useSafeNotes, safeSaveNotesDirect } from '../utils/notesStorage';
import { uid } from '../utils/id';

// PUBLIC_INTERFACE
export function useNotes() {
  /**
   * Encapsulates notes state with localStorage persistence and resilient fallback.
   */
  const { notes, setNotes, error } = useSafeNotes();

  const addNote = useCallback(() => {
    const now = Date.now();
    const newNote = {
      id: uid(),
      title: '',
      content: '',
      createdAt: now,
      updatedAt: now,
      pinned: false,
    };
    const next = [newNote, ...notes];
    setNotes(next);
    safeSaveNotesDirect(next);
    return newNote;
  }, [notes, setNotes]);

  const updateNote = useCallback((id, patch) => {
    const next = notes.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: patch.updatedAt ?? Date.now() } : n));
    setNotes(next);
    safeSaveNotesDirect(next);
  }, [notes, setNotes]);

  const deleteNote = useCallback((id) => {
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    safeSaveNotesDirect(next);
  }, [notes, setNotes]);

  const togglePin = useCallback((id) => {
    const next = notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned, updatedAt: Date.now() } : n));
    setNotes(next);
    safeSaveNotesDirect(next);
  }, [notes, setNotes]);

  const bulkDelete = useCallback((ids) => {
    const setIds = new Set(ids);
    const next = notes.filter((n) => !setIds.has(n.id));
    setNotes(next);
    safeSaveNotesDirect(next);
  }, [notes, setNotes]);

  const clearAll = useCallback(() => {
    setNotes([]);
    safeSaveNotesDirect([]);
  }, [setNotes]);

  const getNoteById = useCallback((id) => {
    return notes.find((n) => n.id === id) || null;
  }, [notes]);

  const getSortedFilteredNotes = useCallback((query, sortMode) => {
    const q = (query || '').trim().toLowerCase();
    let filtered = !q
      ? notes
      : notes.filter((n) => (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q));

    const compare = {
      updatedDesc: (a, b) => b.updatedAt - a.updatedAt,
      createdDesc: (a, b) => b.createdAt - a.createdAt,
      titleAsc: (a, b) => (a.title || '').localeCompare(b.title || ''),
    }[sortMode || 'updatedDesc'];

    filtered = [...filtered].sort(compare);
    // Group pinned first while preserving the internal sort order
    const pinned = filtered.filter((n) => n.pinned);
    const others = filtered.filter((n) => !n.pinned);
    return [...pinned, ...others];
  }, [notes]);

  return useMemo(() => ({
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
  }), [notes, addNote, updateNote, deleteNote, togglePin, bulkDelete, clearAll, getNoteById, getSortedFilteredNotes, error]);
}
