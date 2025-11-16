// Philippine Time (PST, UTC+8) utilities

export const getPhilippineTime = (): Date => {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
};

export const formatPhilippineTime = (date: Date = getPhilippineTime()): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila',
  };
  
  return date.toLocaleString('en-PH', options).replace(',', ' |');
};

export const formatShortTime = (date: Date = getPhilippineTime()): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila',
  };
  
  return date.toLocaleString('en-PH', options);
};
