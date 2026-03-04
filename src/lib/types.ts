export type ShiftCategory = 'Mañana' | 'Tarde' | 'Noche';
export type ShiftOrigin = 'MAN' | 'PDF';

export interface Shift {
  id: string;
  date: string; // ISO YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  location: string;
  origin: ShiftOrigin;
}

export interface ShiftWithDerived extends Shift {
  category: ShiftCategory;
  duration: number; // in hours
}

export interface WeeklyStats {
  totalWorkedHours: number;
  totalWorkedDays: number;
  freeDays: number;
  hoursByType: {
    Regular: number;
    JT: number;
    Extras: number;
    Libre: number;
  };
  daysByType: {
    Regular: number;
    JT: number;
    Extras: number;
    Libre: number;
  };
}
