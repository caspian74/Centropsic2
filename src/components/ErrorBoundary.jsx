import { Component } from 'react';

/**
 * Si una página falla (por ejemplo, un archivo que no terminó de descargarse
 * tras publicar una versión nueva), muestra un mensaje amable en lugar de
 * una pantalla en blanco.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('[Centro Psicoterapéutico] Error al mostrar la página:', error);
  }

  render() {
    if (this.props.silent && this.state.failed) return null;

    if (this.state.failed) {
      return (
        <section className="container-x flex min-h-[70vh] flex-col items-start justify-center py-32">
          <p className="eyebrow text-salmon-700">Algo no salió bien</p>
          <h1 className="display-lg mt-4 max-w-2xl">No pudimos mostrar esta página.</h1>
          <p className="lead mt-6 max-w-xl">
            Puede ser un problema temporal de conexión. Vuelve a cargar la página para intentarlo
            de nuevo.
          </p>
          <button
            type="button"
            className="btn btn-primary mt-8"
            onClick={() => window.location.reload()}
          >
            <span>Recargar la página</span>
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}
