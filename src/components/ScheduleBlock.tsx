import { useState } from 'react';
import { Aula } from '../types';

interface ScheduleBlockProps {
  dia: string;
  hora: string;
  aula: Aula | undefined;
  isHighlighted: boolean;
  isIntervalo: boolean;
  onDrop: (dia: string, hora: string) => void;
  onDragOver: (e: React.DragEvent) => void;
}

export default function ScheduleBlock({
  dia,
  hora,
  aula,
  isHighlighted,
  isIntervalo,
  onDrop,
  onDragOver
}: ScheduleBlockProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (isIntervalo) {
    return (
      <div
        id={`slot-${hora}`}
        className="bg-[#D9D9D9] rounded-lg p-3 flex items-center justify-center border border-gray-300"
      >
        <p className="text-xs text-gray-600 font-medium">Intervalo 20h30–20h45</p>
      </div>
    );
  }

  const hasConflict = aula && aula.professor && aula.sala;

  return (
    <div
      id={`schedule-block-${dia}-${hora}`}
      onDrop={() => onDrop(dia, hora)}
      onDragOver={onDragOver}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={`relative rounded-lg p-3 min-h-[80px] border-2 transition-all duration-200 ${
        isHighlighted
          ? 'bg-blue-50 border-[#4945BF] shadow-md'
          : aula
          ? hasConflict
            ? 'bg-red-50 border-[#FF0000] animate-shake'
            : 'bg-white border-gray-200'
          : 'bg-gray-50 border-gray-200 border-dashed'
      } ${!aula && 'hover:bg-blue-50 hover:border-[#4945BF]'}`}
    >
      {aula ? (
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-800">{aula.professor}</p>
          <p className="text-xs text-gray-600">{aula.sala}</p>
        </div>
      ) : (
        <p className="text-xs text-gray-400 text-center">Disponível</p>
      )}

      {showTooltip && aula && (
        <div className="absolute z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap animate-fade-in shadow-lg">
          <p className="font-medium">{aula.professor}</p>
          <p className="text-gray-300">{aula.sala}</p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}

      {hasConflict && showTooltip && (
        <div className="absolute z-10 top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[#FF0000] text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap animate-fade-in shadow-lg">
          Conflito de horário detectado
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-[#FF0000]" />
        </div>
      )}
    </div>
  );
}
