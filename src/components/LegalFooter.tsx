export function LegalFooter() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '14px 18px', color: 'var(--text-subtle)', fontSize: '0.78rem', display: 'flex', gap: '12px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <span>© {year} Anclora Group — Todos los derechos reservados.</span>
      <span>Anclora GroundSync es una marca comercial operada bajo licencia exclusiva por Anclora Group.</span>
      <nav style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <a href="/terms">Términos</a>
        <a href="/privacy">Privacidad</a>
        <a href="/legal">Aviso legal</a>
        <a href="mailto:hola@anclora.com">hola@anclora.com</a>
        <button type="button" onClick={() => window.dispatchEvent(new Event('anclora:open-cookie-preferences'))} style={{ background: 'transparent', border: 0, color: 'inherit', cursor: 'pointer', padding: 0 }}>Cookies</button>
      </nav>
    </footer>
  );
}
