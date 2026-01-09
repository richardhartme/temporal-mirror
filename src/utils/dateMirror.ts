const DATE_INPUT_PATTERN = /^(\d{2})\/(\d{2})\/(\d{4})$/;
export const MS_PER_DAY = 86_400_000;

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC'
});

export const formatDate = (date: Date) => dateFormatter.format(date);

export const parseInputDate = (value: string): Date | null => {
  const match = value.trim().match(DATE_INPUT_PATTERN);

  if (!match) {
    return null;
  }

  const [, dayPart, monthPart, yearPart] = match;
  const day = Number(dayPart);
  const month = Number(monthPart);
  const year = Number(yearPart);

  const parsed = new Date(Date.UTC(year, month - 1, day));

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }

  return parsed;
};

export const calculateMirror = (futureDate: Date, pivotDate: Date) => {
  const offsetDays = Math.floor((futureDate.getTime() - pivotDate.getTime()) / MS_PER_DAY);
  const mirroredDate = new Date(pivotDate.getTime() - offsetDays * MS_PER_DAY);

  return {
    offsetDays,
    mirroredDate
  };
};

export const getTodayString = (now = new Date()) => {
  const todayUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return formatDate(todayUtc);
};

export const getDefaultPivotString = (now = new Date()) => {
  const pivotUtc = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  return formatDate(pivotUtc);
};
