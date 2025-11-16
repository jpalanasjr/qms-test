import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { loadCounters } from '@/lib/queueManager';
import { PhilippineClock } from './PhilippineClock';

export const TVDisplayMode = () => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const counters = loadCounters();

  // Mock serving data
  const nowServing = [
    { counter: 1, number: `C${String(Math.max(1, counters.C - 2)).padStart(3, '0')}` },
    { counter: 2, number: `P${String(Math.max(1, counters.P - 1)).padStart(3, '0')}` },
    { counter: 3, number: `C${String(Math.max(1, counters.C - 1)).padStart(3, '0')}` },
    { counter: 4, number: `Q${String(Math.max(1, counters.Q - 1)).padStart(3, '0')}` },
  ];

  const getNextNumbers = (prefix: 'C' | 'P' | 'Q' | 'O', count: number = 5) => {
    const current = counters[prefix];
    return Array.from({ length: count }, (_, i) => 
      `${prefix}${String(Math.max(1, current - count + i + 1)).padStart(3, '0')}`
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Philippine Banking
          </h1>
          <PhilippineClock className="text-2xl text-primary-foreground/90 justify-center flex" />
        </div>

        {/* Now Serving */}
        <Card className="mb-8 p-8 bg-card/95 backdrop-blur">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Now Serving</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {nowServing.map(({ counter, number }) => (
              <div key={counter} className="text-center p-6 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-2">Counter {counter}</p>
                <p className="text-5xl font-bold text-primary">{number}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Next in Queue */}
        <Card className="p-8 bg-card/95 backdrop-blur">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Next in Queue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground border-b pb-2">Cash/Check (C)</h3>
              <div className="flex flex-wrap gap-3">
                {getNextNumbers('C').map(num => (
                  <span key={num} className="px-4 py-2 bg-muted rounded-lg font-bold text-foreground">
                    {num}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground border-b pb-2">Priority Lane (P)</h3>
              <div className="flex flex-wrap gap-3">
                {getNextNumbers('P').map(num => (
                  <span key={num} className="px-4 py-2 bg-accent/20 rounded-lg font-bold text-accent-foreground">
                    {num}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground border-b pb-2">QR Transactions (Q)</h3>
              <div className="flex flex-wrap gap-3">
                {getNextNumbers('Q').map(num => (
                  <span key={num} className="px-4 py-2 bg-muted rounded-lg font-bold text-foreground">
                    {num}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground border-b pb-2">Other Services (O)</h3>
              <div className="flex flex-wrap gap-3">
                {getNextNumbers('O').map(num => (
                  <span key={num} className="px-4 py-2 bg-muted rounded-lg font-bold text-foreground">
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Marquee */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-full text-xl font-semibold animate-pulse">
            Thank you for banking with BPI!
          </div>
        </div>
      </div>
    </div>
  );
};
