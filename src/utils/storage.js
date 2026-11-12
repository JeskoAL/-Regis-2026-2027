const KEYS = {
  USERS: 'park_users',
  SPOTS: 'park_spots',
  TICKETS: 'park_tickets',
  CURRENT_USER: 'park_current_user',
};

// Pre-load initial data so tables aren't empty on first run
export const initStorage = () => {
  if (!localStorage.getItem(KEYS.SPOTS)) {
    const initialSpots = [
      { id: '1', slotNumber: 'A-01', zone: 'Zone A', type: 'Regular', hourlyRate: 50, status: 'Available' },
      { id: '2', slotNumber: 'A-02', zone: 'Zone A', type: 'Regular', hourlyRate: 50, status: 'Available' },
      { id: '3', slotNumber: 'B-01', zone: 'Zone B', type: 'VIP', hourlyRate: 100, status: 'Available' },
      { id: '4', slotNumber: 'M-01', zone: 'Zone M', type: 'Motorcycle', hourlyRate: 30, status: 'Available' },
    ];
    localStorage.setItem(KEYS.SPOTS, JSON.stringify(initialSpots));
  }
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.TICKETS)) {
    localStorage.setItem(KEYS.TICKETS, JSON.stringify([]));
  }
};

// Generic Get & Save helpers
export const getTable = (tableName) => {
  return JSON.parse(localStorage.getItem(KEYS[tableName])) || [];
};

export const saveTable = (tableName, data) => {
  localStorage.setItem(KEYS[tableName], JSON.stringify(data));
};

// Auth Session helpers
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(KEYS.CURRENT_USER));
};

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
};
