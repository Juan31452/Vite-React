export const TipoConexion = {
    apiUrl: (window.location.hostname === 'localhost') ? 'http://localhost:4000' : `http://${window.location.hostname}:4000`
  }