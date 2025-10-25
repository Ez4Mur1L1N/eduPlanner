import { User } from 'lucide-react';
import { Professor } from '../types';

interface ProfessorCardProps {
  professor: Professor;
  onDragStart: (e: React.DragEvent, professor: Professor) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function ProfessorCard({
  professor,
  onDragStart,
  onMouseEnter,
  onMouseLeave
}: ProfessorCardProps) {
  const diasAbreviados = professor.disponibilidade
    .map((d) => {
      const dia = d.split('-')[0];
      const map: { [key: string]: string } = {
        seg: 'Seg',
        ter: 'Ter',
        qua: 'Qua',
        qui: 'Qui',
        sex: 'Sex'
      };
      return map[dia] || dia;
    })
    .filter((v, i, a) => a.indexOf(v) === i)
    .join(', ');

  return (
    <div
      id={`professor-card-${professor.id}`}
      draggable
      onDragStart={(e) => onDragStart(e, professor)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg cursor-move transition-all duration-200 hover:scale-[1.02] border border-gray-100"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2703A6] to-[#4945BF] flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{professor.nome}</h3>
          <p className="text-xs text-gray-500">{diasAbreviados}</p>
        </div>
      </div>
    </div>
  );
}
