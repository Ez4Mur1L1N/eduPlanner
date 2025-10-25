import { DoorOpen, Laptop, Building2 } from 'lucide-react';
import { Sala } from '../types';

interface SalaCardProps {
  sala: Sala;
  onDragStart: (e: React.DragEvent, sala: Sala) => void;
}

export default function SalaCard({ sala, onDragStart }: SalaCardProps) {
  const getIcon = () => {
    switch (sala.tipo) {
      case 'Laboratório':
        return <Laptop className="w-6 h-6 text-[#2703A6] dark:text-blue-300" />;
      case 'Auditório':
        return <Building2 className="w-6 h-6 text-[#2703A6] dark:text-blue-300" />;
      default:
        return <DoorOpen className="w-6 h-6 text-[#2703A6] dark:text-blue-300" />;
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, sala)}
      className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg cursor-move transition-all duration-200 hover:scale-[1.02] border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex items-center justify-center mb-3">
        <div className="w-14 h-14 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
          {getIcon()}
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{sala.nome}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">{sala.capacidade} alunos</p>
      </div>
    </div>
  );
}
