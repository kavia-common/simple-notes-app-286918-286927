import React from 'react';

// PUBLIC_INTERFACE
export default function EmptyState({ title = 'Nothing here', description = 'Get started by creating a new item.' }) {
  /** Simple, friendly empty state */
  return (
    <div className="empty" role="status" aria-live="polite">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
