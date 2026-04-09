import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isAfter, 
  isBefore,
  isToday,
  eachDayOfInterval
} from 'date-fns';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { isHoliday } from '../utils/holidays';
import './CalendarGrid.css';

const CalendarGrid = ({ currentMonth, setCurrentMonth, selection, setSelection }) => {
  const [hoverDate, setHoverDate] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMonthChange = (newMonth) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentMonth(newMonth);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  const onDateClick = (day) => {
    if (!selection.start || (selection.start && selection.end)) {
      setSelection({ start: day, end: null });
    } else {
      if (isBefore(day, selection.start)) {
        setSelection({ start: day, end: selection.start });
      } else {
        setSelection({ start: selection.start, end: day });
      }
    }
  };

  const isInRange = (day) => {
    if (selection.start && selection.end) {
      return isAfter(day, selection.start) && isBefore(day, selection.end);
    }
    if (selection.start && hoverDate) {
      const rangeStart = isBefore(hoverDate, selection.start) ? hoverDate : selection.start;
      const rangeEnd = isBefore(hoverDate, selection.start) ? selection.start : hoverDate;
      return isAfter(day, rangeStart) && isBefore(day, rangeEnd);
    }
    return false;
  };

  const renderHeader = () => {
    return (
      <div className="grid-header">
        <button className="nav-btn" onClick={() => handleMonthChange(subMonths(currentMonth, 1))}>
          <ChevronLeft size={20} />
        </button>
        <div className="current-month-display">
          {format(currentMonth, 'MMMM yyyy')}
        </div>
        <button className="nav-btn" onClick={() => handleMonthChange(addMonths(currentMonth, 1))}>
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return (
      <div className="days-row">
        {days.map(day => <div key={day} className="day-name">{day}</div>)}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        
        const isSelectedStart = selection.start && isSameDay(day, selection.start);
        const isSelectedEnd = selection.end && isSameDay(day, selection.end);
        const inRange = isInRange(day);
        const holiday = isHoliday(day);
        const isTodayDate = isToday(day);
        
        days.push(
          <div
            className={`cell ${
              !isSameMonth(day, monthStart) ? "disabled" : ""
            } ${isSelectedStart ? "selected-start" : ""} ${isSelectedEnd ? "selected-end" : ""} ${inRange ? "in-range" : ""} ${isTodayDate ? "today" : ""} ${holiday ? "holiday" : ""}`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
            onMouseEnter={() => setHoverDate(cloneDay)}
            onMouseLeave={() => setHoverDate(null)}
          >
            <span className="number">{formattedDate}</span>
            {holiday && !isSelectedStart && !isSelectedEnd && (
              <div className="holiday-dot" title={holiday.name}></div>
            )}
            {holiday && (hoverDate && isSameDay(day, hoverDate)) && (
              <div className="holiday-tooltip">{holiday.name}</div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="grid-body">{rows}</div>;
  };

  return (
    <div className={`calendar-grid ${isAnimating ? 'flip-exit' : 'flip-enter'}`}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default CalendarGrid;
