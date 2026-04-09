import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './NotesSection.css';

const NotesSection = ({ currentMonth }) => {
  const [note, setNote] = useState('');
  const storageKey = `notes-${format(currentMonth, 'yyyy-MM')}`;

  useEffect(() => {
    const savedNote = localStorage.getItem(storageKey);
    if (savedNote) {
      setNote(savedNote);
    } else {
      setNote('');
    }
  }, [storageKey]);

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
    localStorage.setItem(storageKey, newNote);
  };

  return (
    <div className="notes-section">
      <div className="notes-header">
        <h3>MONTHLY NOTES</h3>
        <p>{format(currentMonth, 'MMMM yyyy')}</p>
      </div>
      <div className="notes-paper">
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Jot down your reminders for this month..."
          className="notes-input"
        />
        <div className="lines">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="line"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
