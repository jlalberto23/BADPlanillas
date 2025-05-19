export enum MesEnum {
  ENERO = '01',
  FEBRERO = '02',
  MARZO = '03',
  ABRIL = '04',
  MAYO = '05',
  JUNIO = '06',
  JULIO = '07',
  AGOSTO = '08',
  SEPTIEMBRE = '09',
  OCTUBRE = '10',
  NOVIEMBRE = '11',
  DICIEMBRE = '12'
}

export const MesNombres: Record<MesEnum, string> = {
  [MesEnum.ENERO]: 'Enero',
  [MesEnum.FEBRERO]: 'Febrero',
  [MesEnum.MARZO]: 'Marzo',
  [MesEnum.ABRIL]: 'Abril',
  [MesEnum.MAYO]: 'Mayo',
  [MesEnum.JUNIO]: 'Junio',
  [MesEnum.JULIO]: 'Julio',
  [MesEnum.AGOSTO]: 'Agosto',
  [MesEnum.SEPTIEMBRE]: 'Septiembre',
  [MesEnum.OCTUBRE]: 'Octubre',
  [MesEnum.NOVIEMBRE]: 'Noviembre',
  [MesEnum.DICIEMBRE]: 'Diciembre'
}
