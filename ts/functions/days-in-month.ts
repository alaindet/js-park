// Thanks to https://bobbyhadz.com/blog/javascript-get-all-dates-in-month
function daysInMonth(year: number, month: number): Date[] {
  const d = new Date(year, month, 1);
  const currentMonth = d.getMonth();
  const days: Date[] = [];

  while(d.getMonth() === currentMonth) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  
  return days;
}
