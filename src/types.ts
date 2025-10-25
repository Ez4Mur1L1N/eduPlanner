export interface Professor {
  id: number;
  nome: string;
  email: string;
  disponibilidade: string[];
  foto?: string;
}

export interface Sala {
  id: number;
  nome: string;
  capacidade: number;
  tipo: 'Laboratório' | 'Sala' | 'Auditório';
  equipamentos?: string[];
}

export interface Aula {
  id: string;
  professor: string;
  sala: string;
  dia: string;
  hora: string;
}

export interface Sugestao {
  id: number;
  texto: string;
  aplicada: boolean;
}

export type ToastType = 'success' | 'warning' | 'error';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}
