export interface Solicitud {
  id?: string;
  montoSolicitado: number;
  plazo: number;
  ingresoMensual: number;
  antiguedadLaboral: number;
  estado: string
  evaluacionAutomatica?: string;
}