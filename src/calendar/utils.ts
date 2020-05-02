export function getStartWeekDayOfMonth(date: Date) {
  const weekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // Sunday - Saturday : 0 - 6

  // move into interval -> Monday - Sunday: 0-6
  return (((weekDay - 1) % 7) + 7) % 7; // add modulo intervall end to negative values to get positive modulo result
}

export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function isDateInDayRange(date: Date, begin: Date, end: Date) {
  // ignore clock time in given dates
  const beginTimestamp = Date.UTC(
    begin.getUTCFullYear(),
    begin.getUTCMonth(),
    begin.getUTCDate(),
    12
  );
  const endTimestamp = Date.UTC(
    end.getUTCFullYear(),
    end.getUTCMonth(),
    end.getUTCDate(),
    12
  );
  const dateTimestamp = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    12
  );

  return dateTimestamp >= beginTimestamp && dateTimestamp <= endTimestamp;
}
