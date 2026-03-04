import { useMemo } from 'react';
import { Shift, ShiftOrigin, WeeklyStats } from '../../lib/types';
import { aggregateWeeklyStats, filterShiftsByOrigin } from '../../lib/shifts';

interface StatsBarProps {
  currentMonthShifts: Shift[];
  daysInMonth: number;
  currentYearShifts: Shift[];
  daysInYear: number;
}

function buildOriginStats(shifts: Shift[], totalDays: number, origin: ShiftOrigin) {
  return aggregateWeeklyStats(filterShiftsByOrigin(shifts, origin), totalDays);
}

function TotalToken({
  label,
  value,
  suffix,
  className,
}: {
  label: string;
  value: string;
  suffix: string;
  className?: string;
}) {
  return (
    <span className={`totals-token ${className ?? ''}`.trim()}>
      <strong>{label}</strong> {value}{suffix}
    </span>
  );
}

function SectionToken({ label }: { label: string }) {
  return <span className="totals-section-label">{label}</span>;
}

function formatTokenValue(hours: number, days: number): string {
  const normalizedDays = hours === 0 ? 0 : days;
  return `${hours.toFixed(1)}h / ${normalizedDays}d`;
}

function SummaryLine({
  title,
  monthStats,
  yearStats,
}: {
  title: string;
  monthStats: WeeklyStats;
  yearStats: WeeklyStats;
}) {
  return (
    <div className="totals-line">
      <div className="totals-line-title">{title}</div>
      <div className="totals-line-values">
        <SectionToken label="Tot. M." />
        <TotalToken label="Mes" value={formatTokenValue(monthStats.totalWorkedHours, monthStats.totalWorkedDays)} suffix="" />
        <TotalToken label="Regular" value={formatTokenValue(monthStats.hoursByType.Regular, monthStats.daysByType.Regular)} suffix="" className="type-regular" />
        <TotalToken label="JT" value={formatTokenValue(monthStats.hoursByType.JT, monthStats.daysByType.JT)} suffix="" className="type-jt" />
        <TotalToken label="Libres" value={formatTokenValue(monthStats.hoursByType.Libre, monthStats.daysByType.Libre)} suffix="" className="type-libre" />
        <TotalToken label="Extras" value={formatTokenValue(monthStats.hoursByType.Extras, monthStats.daysByType.Extras)} suffix="" className="type-extras" />
        <SectionToken label="Tot. A." />
        <TotalToken label="Año" value={formatTokenValue(yearStats.totalWorkedHours, yearStats.totalWorkedDays)} suffix="" />
        <TotalToken label="Regular" value={formatTokenValue(yearStats.hoursByType.Regular, yearStats.daysByType.Regular)} suffix="" className="type-regular" />
        <TotalToken label="JT" value={formatTokenValue(yearStats.hoursByType.JT, yearStats.daysByType.JT)} suffix="" className="type-jt" />
        <TotalToken label="Libres" value={formatTokenValue(yearStats.hoursByType.Libre, yearStats.daysByType.Libre)} suffix="" className="type-libre" />
        <TotalToken label="Extras" value={formatTokenValue(yearStats.hoursByType.Extras, yearStats.daysByType.Extras)} suffix="" className="type-extras" />
      </div>
    </div>
  );
}

export const StatsBar = ({ currentMonthShifts, daysInMonth, currentYearShifts, daysInYear }: StatsBarProps) => {
  const ownMonthStats = useMemo(() => buildOriginStats(currentMonthShifts, daysInMonth, 'MAN'), [currentMonthShifts, daysInMonth]);
  const ownYearStats = useMemo(() => buildOriginStats(currentYearShifts, daysInYear, 'MAN'), [currentYearShifts, daysInYear]);
  const companyMonthStats = useMemo(() => buildOriginStats(currentMonthShifts, daysInMonth, 'PDF'), [currentMonthShifts, daysInMonth]);
  const companyYearStats = useMemo(() => buildOriginStats(currentYearShifts, daysInYear, 'PDF'), [currentYearShifts, daysInYear]);

  return (
    <div className="totals-ribbon">
      <SummaryLine title="Propios" monthStats={ownMonthStats} yearStats={ownYearStats} />
      <SummaryLine title="Empresa" monthStats={companyMonthStats} yearStats={companyYearStats} />
    </div>
  );
};
