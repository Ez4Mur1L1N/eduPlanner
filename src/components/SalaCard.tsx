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
        return <Laptop className="w-6 h-6 text-[#2703A6]" />;
      case 'Auditório':
        return <Building2 className="w-6 h-6 text-[#2703A6]" />;
      default:
        return <DoorOpen className="w-6 h-6 text-[#2703A6]" />;
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, sala)}
      className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg cursor-move transition-all duration-200 hover:scale-[1.02] border border-gray-100"
    >
      <div className="flex items-center justify-center mb-3">
        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center">
          {getIcon()}
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-gray-800 mb-1">{sala.nome}</h3>
        <p className="text-xs text-gray-500">{sala.capacidade} alunos</p>
      </div>
    </div>
  );
}
