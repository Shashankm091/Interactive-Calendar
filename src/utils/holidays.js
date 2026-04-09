export const holidays = [
  { date: '2026-01-01', name: 'New Year\'s Day' },
  { date: '2026-02-14', name: 'Valentine\'s Day' },
  { date: '2026-03-17', name: 'St. Patrick\'s Day' },
  { date: '2026-04-05', name: 'Easter Sunday' },
  { date: '2026-05-01', name: 'Labor Day' },
  { date: '2026-06-21', name: 'Father\'s Day' },
  { date: '2026-07-04', name: 'Independence Day' },
  { date: '2026-10-31', name: 'Halloween' },
  { date: '2026-11-26', name: 'Thanksgiving' },
  { date: '2026-12-25', name: 'Christmas Day' },
];

export const isHoliday = (date) => {
  const dateStr = date.toISOString().split('T')[0];
  return holidays.find(h => h.date === dateStr);
};
