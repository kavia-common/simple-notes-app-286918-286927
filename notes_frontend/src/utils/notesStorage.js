import { useLocalStorage } from '../hooks/useLocalStorage';

export const NOTES_KEY = 'notes.v1';

// Schema guard
function isValidNote(obj) {
  if (!obj || typeof obj !== 'object') return false;
  const required = ['id', 'title', 'content', 'createdAt', 'updatedAt'];
  for (const k of required) {
    if (!(k in obj)) return false;
  }
  return true;
}
function sanitizeNotes(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(isValidNote);
}

// PUBLIC_INTERFACE
export function useSafeNotes() {
  /**
   * React hook returning { notes, setNotes, error } using localStorage with schema checking.
   */
  const { value, setValue, error } = useLocalStorage(NOTES_KEY, []);
  const notes = sanitizeNotes(value);
  return { notes, setNotes: setValue, error };
}

// PUBLIC_INTERFACE
export function safeSaveNotesDirect(notes) {
  /**
   * Pure helper to save notes array directly to localStorage (non-hook).
   * Used for explicit saves when needed; wrapped in try/catch to ignore quota or access errors.
   */
  try {
    window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch {
    // ignore errors, caller may surface a banner via hook error state
  }
}
