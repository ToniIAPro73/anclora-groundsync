import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { X } from 'lucide-react';
import { Shift } from '../../lib/types';
import { getShiftType, hasShiftTimes } from '../../lib/shifts';
import { durationMinutes } from '../../lib/time';

interface JTDaySummary {
  date: string;
  hoursWorked: number;
}

interface JTPeriodResult {
  totalDaysWithJT: number;
  totalHoursJT: number;
  daySummaries: JTDaySummary[];
}

interface JTCounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  shifts: Shift[];
}

function getTodayISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(value: string): string {
  if (!value) {
    return '';
  }

  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}

function formatHours(value: number): string {
  return value.toFixed(1);
}

function buildPdfFileName(fromDate: string, toDate: string): string {
  const fromSegment = fromDate ? ` desde ${fromDate}` : '';
  return `Nº de días turno JT en periodo${fromSegment} hasta ${toDate}.pdf`;
}

export const JTCounterModal = ({ isOpen, onClose, shifts }: JTCounterModalProps) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState(getTodayISO());
  const [result, setResult] = useState<JTPeriodResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const resetState = () => {
    setFromDate('');
    setToDate(getTodayISO());
    setResult(null);
    setHasCalculated(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    resetState();
  }, [isOpen]);

  const handleCalculate = () => {
    if (!toDate) {
      window.alert('Debes indicar una fecha "Hasta".');
      return;
    }

    if (fromDate && fromDate > toDate) {
      window.alert('La fecha "Desde" no puede ser posterior a la fecha "Hasta".');
      return;
    }

    const periodShifts = shifts.filter((shift) => {
      if (getShiftType(shift) !== 'JT') {
        return false;
      }

      if (shift.date > toDate) {
        return false;
      }

      if (fromDate && shift.date < fromDate) {
        return false;
      }

      return true;
    });

    const hoursByDate = new Map<string, number>();

    for (const shift of periodShifts) {
      const shiftHours = hasShiftTimes(shift)
        ? durationMinutes(shift.startTime, shift.endTime) / 60
        : 0;

      hoursByDate.set(shift.date, (hoursByDate.get(shift.date) ?? 0) + shiftHours);
    }

    const daySummaries = Array.from(hoursByDate.entries())
      .map(([date, hoursWorked]) => ({ date, hoursWorked }))
      .sort((left, right) => right.date.localeCompare(left.date));

    const totalDaysWithJT = daySummaries.length;
    const totalHoursJT = daySummaries.reduce((hours, daySummary) => hours + daySummary.hoursWorked, 0);

    setResult({ totalDaysWithJT, totalHoursJT, daySummaries });
    setHasCalculated(true);
  };

  const handlePrint = () => {
    if (!result || result.totalDaysWithJT <= 0) {
      return;
    }

    const document = new jsPDF();
    const periodLabel = fromDate
      ? `Periodo desde ${formatDisplayDate(fromDate)} hasta ${formatDisplayDate(toDate)}`
      : `Periodo hasta ${formatDisplayDate(toDate)}`;

    document.setFontSize(16);
    document.text('Nº de días turno JT en periodo', 14, 18);
    document.setFontSize(11);
    document.text(periodLabel, 14, 26);

    autoTable(document, {
      startY: 34,
      head: [['Nº días', 'Fecha turno JT', 'Nº horas realizadas']],
      body: result.daySummaries.map((daySummary, index) => [
        String(index + 1),
        formatDisplayDate(daySummary.date),
        formatHours(daySummary.hoursWorked),
      ]),
      foot: [[
        `Total: ${result.totalDaysWithJT}`,
        '',
        `Total: ${formatHours(result.totalHoursJT)}`,
      ]],
      theme: 'grid',
      headStyles: {
        fillColor: [27, 37, 82],
      },
      footStyles: {
        fillColor: [230, 184, 0],
        textColor: [23, 23, 23],
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 10,
      },
    });

    document.save(buildPdfFileName(fromDate, toDate));
  };

  const canPrint = Boolean(result && hasCalculated && result.totalDaysWithJT > 0);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content jt-counter-modal-content" style={{ maxWidth: '980px', width: '96vw', minHeight: '480px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>Contador turnos JT</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button
              className="btn-outline modal-reset-button"
              onClick={handlePrint}
              disabled={!canPrint}
              style={{ padding: '8px 12px', fontWeight: 700 }}
            >
              Imprimir
            </button>
            <button
              className="btn-outline modal-reset-button"
              onClick={resetState}
              disabled={!hasCalculated}
              style={{ padding: '8px 12px', fontWeight: 700 }}
            >
              Nuevo Cálculo
            </button>
            <button onClick={onClose} style={{ color: 'var(--text-subtle)' }}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="jt-counter-modal-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 0.95fr) minmax(0, 1.05fr)', gap: '18px', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Desde (opcional)</span>
                <input
                  className="modal-input"
                  type="date"
                  value={fromDate}
                  onChange={(event) => setFromDate(event.target.value)}
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Hasta</span>
                <input
                  className="modal-input"
                  type="date"
                  value={toDate}
                  onChange={(event) => setToDate(event.target.value)}
                />
              </label>
            </div>

            <button
              className="btn-gold"
              onClick={handleCalculate}
              disabled={!toDate}
              style={{ padding: '14px 16px', width: '100%', minHeight: '52px', fontSize: '0.98rem', fontWeight: 800, opacity: toDate ? 1 : 0.5 }}
            >
              Calcular
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--panel-muted-bg)', borderRadius: '16px', padding: '16px', minWidth: 0 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-accent)', margin: '0 0 14px' }}>Resultado</h3>

            <div style={{ display: 'grid', gap: '12px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Nº total días con turnos JT en el periodo</span>
                <input
                  className="modal-input"
                  type="text"
                  value={result ? String(result.totalDaysWithJT) : ''}
                  readOnly
                  placeholder="Pendiente de cálculo"
                  style={{ fontWeight: 700, fontSize: '0.95rem' }}
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Nº total horas de turnos JT en el periodo</span>
                <input
                  className="modal-input"
                  type="text"
                  value={result ? formatHours(result.totalHoursJT) : ''}
                  readOnly
                  placeholder="Pendiente de cálculo"
                  style={{ fontWeight: 700, fontSize: '0.95rem' }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
