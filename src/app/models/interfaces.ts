export interface Disease {
  enfermedad: string | null;
}

export interface Antecedent {
  tipoAntecedente: string | null;
  descripcionAntecedente: string | null;
  fechaAntecedente: string | null;
}

export interface AntecedentRelative {
  tipoAntecedenteF: string | null;
  parentescoF: string | null;
  descripcionAntecedenteF: string | null;
}

export interface Medicament {
  medicamento: string | null;
  laboratorio: string | null;
  formula: string | null;
}

export interface Allergy {
  tipoAlergia: string | null;
  descripcion: string | null;
}

export interface Vaccine {
  vacuna: string | null;
}
