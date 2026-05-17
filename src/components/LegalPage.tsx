import { LegalFooter } from './LegalFooter';

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' | 'legal' }) {
  const title = kind === 'privacy' ? 'Política de privacidad' : kind === 'terms' ? 'Términos del servicio' : 'Aviso legal';
  const body = kind === 'privacy'
    ? 'Anclora Group trata únicamente los datos locales y técnicos necesarios para operar Anclora GroundSync. Contacto: hola@anclora.com.'
    : kind === 'terms'
      ? 'Anclora GroundSync es una herramienta operativa de turnos. No sustituye validación laboral, contractual ni administrativa.'
      : 'Titular y operador: Anclora Group. Anclora GroundSync es una marca comercial operada bajo licencia exclusiva por Anclora Group. No se afirma registro concedido.';
  return (
    <div className="app-shell">
      <main className="dashboard-body" style={{ minHeight: '80vh', display: 'grid', placeItems: 'center' }}>
        <section className="modal-content" style={{ maxWidth: 760 }}>
          <h1>{title}</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{body}</p>
          <p style={{ color: 'var(--text-muted)' }}>Cookies necesarias y preferencias opcionales gestionables desde el botón flotante.</p>
          <a className="btn-gold" href="/">Volver</a>
        </section>
      </main>
      <LegalFooter />
    </div>
  );
}
