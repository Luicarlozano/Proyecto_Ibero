export interface Entry {
  _id: string;
  codigoTRX: string;
  fecha: Date;
  tipoMovimiento: string;
  producto: string;
  cantidad: number;
  descripcion: string;
  usuario: string;
}
