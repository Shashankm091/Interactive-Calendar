import React, { useState } from 'react';
import CalendarHero from './components/CalendarHero';
import CalendarGrid from './components/CalendarGrid';
import NotesSection from './components/NotesSection';
import './App.css';

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selection, setSelection] = useState({ start: null, end: null });

  return (
    <div className="app-container">
      <div className="calendar-wrapper">
        <header className="app-header">
          <h1>Interactive Calendar</h1>
          <p>Plan your adventures with precision.</p>
        </header>

        <main className="calendar-layout">
          <section className="layout-hero">
            <CalendarHero currentMonth={currentMonth} />
          </section>

          <section className="layout-content">
            <div className="grid-area">
              <CalendarGrid 
                currentMonth={currentMonth} 
                setCurrentMonth={setCurrentMonth}
                selection={selection}
                setSelection={setSelection}
              />
            </div>
            
            <div className="notes-area">
              <NotesSection currentMonth={currentMonth} />
            </div>
          </section>
        </main>

        <footer className="app-footer">
          <div className="selection-status">
            {selection.start && (
              <p>
                Selected Range: <strong>{selection.start.toLocaleDateString()}</strong>
                {selection.end && <> to <strong>{selection.end.toLocaleDateString()}</strong></>}
              </p>
            )}
          </div>
          <p className="copyright">&copy; 2026 Interactive Wall Calendar challenge</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
