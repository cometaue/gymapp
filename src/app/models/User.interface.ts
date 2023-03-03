export interface User {
  id?: string;
  nombre: string;
  apellido: string;
  email: string;
  mobile: number;
  weight: number;
  height: number;
  bmi: number;
  bmiResult: string;
  trainer: string;
  gender: string;
  tiempoPago: string;
  objetivos: string[];
  firstTimeGym: string;
  fechaInicio: string;
  action?: string;
}
