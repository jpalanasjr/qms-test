// Queue Management System for Bank Kiosk
// Handles queue number generation and persistence

export type ServiceType = 'cash' | 'priority' | 'qr' | 'other';
export type QueuePrefix = 'C' | 'P' | 'Q' | 'O';

export interface QueueTicket {
  queueNumber: string;
  serviceType: string;
  timestamp: number;
  estimatedWait: number; // in minutes
}

export interface QueueCounters {
  C: number;
  P: number;
  Q: number;
  O: number;
}

const STORAGE_KEY = 'bpi_queue_counters';
const QUEUE_LOG_KEY = 'bpi_queue_log';

// Get prefix based on service type
export const getPrefixForService = (serviceType: ServiceType): QueuePrefix => {
  const prefixMap: Record<ServiceType, QueuePrefix> = {
    cash: 'C',
    priority: 'P',
    qr: 'Q',
    other: 'O',
  };
  return prefixMap[serviceType];
};

// Load counters from localStorage
export const loadCounters = (): QueueCounters => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading counters:', error);
  }
  return { C: 0, P: 0, Q: 0, O: 0 };
};

// Save counters to localStorage
export const saveCounters = (counters: QueueCounters): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
  } catch (error) {
    console.error('Error saving counters:', error);
  }
};

// Generate next queue number
export const generateQueueNumber = (serviceType: ServiceType): QueueTicket => {
  const prefix = getPrefixForService(serviceType);
  const counters = loadCounters();
  
  // Increment counter
  counters[prefix] = counters[prefix] + 1;
  saveCounters(counters);
  
  // Format number with leading zeros
  const number = counters[prefix].toString().padStart(3, '0');
  const queueNumber = `${prefix}${number}`;
  
  // Calculate estimated wait (mock: 5 mins per person ahead)
  const estimatedWait = Math.max(5, counters[prefix] * 5);
  
  const ticket: QueueTicket = {
    queueNumber,
    serviceType: getServiceTypeName(prefix),
    timestamp: Date.now(),
    estimatedWait,
  };
  
  // Log the queue ticket
  logQueueTicket(ticket);
  
  return ticket;
};

// Get service type display name
const getServiceTypeName = (prefix: QueuePrefix): string => {
  const names: Record<QueuePrefix, string> = {
    C: 'Cash/Check Transaction',
    P: 'Priority Lane',
    Q: 'Scan QR',
    O: 'Other Transaction',
  };
  return names[prefix];
};

// Log queue ticket for admin
const logQueueTicket = (ticket: QueueTicket): void => {
  try {
    const log = getQueueLog();
    log.push(ticket);
    localStorage.setItem(QUEUE_LOG_KEY, JSON.stringify(log));
  } catch (error) {
    console.error('Error logging ticket:', error);
  }
};

// Get queue log
export const getQueueLog = (): QueueTicket[] => {
  try {
    const stored = localStorage.getItem(QUEUE_LOG_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading queue log:', error);
  }
  return [];
};

// Reset counters (admin function)
export const resetCounters = (): void => {
  saveCounters({ C: 0, P: 0, Q: 0, O: 0 });
  localStorage.removeItem(QUEUE_LOG_KEY);
};

// Export queue log as CSV
export const exportQueueLog = (): string => {
  const log = getQueueLog();
  const headers = ['Queue Number', 'Service Type', 'Date & Time', 'Estimated Wait'];
  const rows = log.map(ticket => [
    ticket.queueNumber,
    ticket.serviceType,
    new Date(ticket.timestamp).toLocaleString('en-PH', { timeZone: 'Asia/Manila' }),
    `${ticket.estimatedWait} mins`,
  ]);
  
  return [headers, ...rows].map(row => row.join(',')).join('\n');
};
