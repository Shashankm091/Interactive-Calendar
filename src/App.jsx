import React, { useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';
import CalendarHero from './components/CalendarHero';
import CalendarGrid from './components/CalendarGrid';
import NotesSection from './components/NotesSection';
import './App.css';

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selection, setSelection] = useState({ start: null, end: null });

  useEffect(() => {
    // Dynamic theme colors based on month
    const themes = [
      '#3b82f6', // Jan (Blue)
      '#ec4899', // Feb (Pink)
      '#10b981', // Mar (Green)
      '#f59e0b', // Apr (Orange)
      '#06b6d4', // May (Cyan)
      '#f43f5e', // Jun (Rose)
      '#8b5cf6', // Jul (Violet)
      '#6366f1', // Aug (Indigo)
      '#ef4444', // Sep (Red)
      '#d946ef', // Oct (Fuchsia)
      '#f97316', // Nov (Orange-Red)
      '#4f46e5'  // Dec (Deep Blue)
    ];
    const monthIndex = currentMonth.getMonth();
    document.documentElement.style.setProperty('--primary', themes[monthIndex]);
  }, [currentMonth]);

  const totalDays = selection.start && selection.end 
    ? differenceInDays(selection.end, selection.start) + 1 
    : 1;

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
                <span className="days-badge">{totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
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
