import { useState, useEffect } from 'react';
import { formatPhilippineTime } from '@/lib/philippineTime';

interface PhilippineClockProps {
  className?: string;
  short?: boolean;
}

export const PhilippineClock = ({ className = '', short = false }: PhilippineClockProps) => {
  const [time, setTime] = useState(formatPhilippineTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatPhilippineTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`text-muted-foreground font-medium ${className}`}>
      {time}
    </div>
  );
};
