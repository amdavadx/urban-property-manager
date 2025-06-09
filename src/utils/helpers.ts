import { MONTHS } from './constants';

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const getCurrentMonth = (): string => {
  return MONTHS[new Date().getMonth()];
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const calculateOccupancyRate = (occupied: number, total: number): number => {
  return total > 0 ? Math.round((occupied / total) * 100) : 0;
};

export const getUpcomingCheckouts = (guests: any[], days: number = 7) => {
  return guests.filter(guest => {
    if (!guest.isActive) return false;
    const moveInDate = new Date(guest.moveInDate);
    const noticeDate = new Date(moveInDate);
    noticeDate.setDate(noticeDate.getDate() + guest.noticePeriod);
    const daysDiff = Math.ceil((noticeDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= days && daysDiff > 0;
  });
};