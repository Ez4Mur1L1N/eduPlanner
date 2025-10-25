import { Professor, Sala, Aula, Sugestao } from '../types';

export const initialProfessores: Professor[] = [
  {
    id: 1,
    nome: 'Ana Souza',
    email: 'ana@uel.br',
    disponibilidade: ['seg-19h00', 'qua-20h45', 'sex-19h00']
  },
  {
    id: 2,
    nome: 'Carlos Lima',
    email: 'carlos@uel.br',
    disponibilidade: ['ter-19h00', 'qui-20h45', 'sex-20h45']
  },
  {
    id: 3,
    nome: 'Beatriz Oliveira',
    email: 'beatriz@uel.br',
    disponibilidade: ['seg-20h45', 'qua-19h00', 'qui-19h00']
  }
];

export const initialSalas: Sala[] = [
  {
    id: 1,
    nome: 'Lab 1',
    capacidade: 20,
    tipo: 'Laboratório',
    equipamentos: ['Computadores', 'Projetor']
  },
  {
    id: 2,
    nome: 'Sala 203',
    capacidade: 40,
    tipo: 'Sala',
    equipamentos: ['Projetor', 'Ar condicionado']
  },
  {
    id: 3,
    nome: 'Lab 3',
    capacidade: 30,
    tipo: 'Laboratório',
    equipamentos: ['Computadores', 'Lousa Digital']
  },
  {
    id: 4,
    nome: 'Auditório A',
    capacidade: 100,
    tipo: 'Auditório',
    equipamentos: ['Sistema de som', 'Projetor', 'Microfone']
  }
];

export const initialAulas: Aula[] = [
  {
    id: 'seg-19h00-1',
    professor: 'Ana Souza',
    sala: 'Lab 1',
    dia: 'Segunda',
    hora: '19h00'
  }
];

export const initialSugestoes: Sugestao[] = [
  {
    id: 1,
    texto: 'Sugerir troca da Sala 2 pela Sala 5 na terça às 19h',
    aplicada: false
  },
  {
    id: 2,
    texto: 'Professor Carlos Lima tem disponibilidade na quinta às 19h00',
    aplicada: false
  },
  {
    id: 3,
    texto: 'Lab 3 está disponível na sexta às 20h45',
    aplicada: false
  }
];

export const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
export const horarios = ['19h00', '20h45', '22h15'];
