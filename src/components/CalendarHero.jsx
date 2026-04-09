import React from 'react';
import './CalendarHero.css';

const CalendarHero = ({ currentMonth }) => {
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  return (
    <div className="calendar-hero">
      <div className="hero-image-container">
        <img src="/assets/hero.png" alt="Hero" className="hero-image" />
        <div className="hero-overlay">
          <div className="hero-date">
            <span className="year">{year}</span>
            <span className="month">{monthName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHero;
