export function LegalFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="legal-footer">
      <span className="legal-footer__copy">© {year} Anclora Group — Todos los derechos reservados.</span>
      <span className="legal-footer__brand">Anclora GroundSync es una marca comercial operada bajo licencia exclusiva por Anclora Group.</span>
      <nav className="legal-footer__nav">
        <a href="/terms" className="legal-footer__link">Términos</a>
        <a href="/privacy" className="legal-footer__link">Privacidad</a>
        <a href="/legal" className="legal-footer__link">Aviso legal</a>
        <a href="mailto:hola@anclora.com" className="legal-footer__link">hola@anclora.com</a>
        <button
          type="button"
          className="legal-footer__link legal-footer__cookie-btn"
          onClick={() => window.dispatchEvent(new Event('anclora:open-cookie-preferences'))}
        >
          Cookies
        </button>
      </nav>
    </footer>
  );
}
