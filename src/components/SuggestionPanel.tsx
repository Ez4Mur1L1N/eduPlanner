import { X, Lightbulb } from 'lucide-react';
import { Sugestao } from '../types';

interface SuggestionPanelProps {
  isOpen: boolean;
  sugestoes: Sugestao[];
  onClose: () => void;
  onApply: (id: number) => void;
}

export default function SuggestionPanel({
  isOpen,
  sugestoes,
  onClose,
  onApply
}: SuggestionPanelProps) {
  if (!isOpen) return null;

  return (
    <div
      id="painel-sugestoes"
      className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-40 animate-slide-in-right overflow-y-auto"
    >
      <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#2703A6]" />
          <h2 className="text-xl font-semibold text-gray-800">Sugestões</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        {sugestoes.map((sugestao) => (
          <div
            key={sugestao.id}
            id={`suggestion-card-${sugestao.id}`}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              sugestao.aplicada
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-200 hover:border-[#4945BF] hover:shadow-md'
            }`}
          >
            <p className="text-sm text-gray-700 mb-3">{sugestao.texto}</p>
            <button
              onClick={() => onApply(sugestao.id)}
              disabled={sugestao.aplicada}
              className={`w-full py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                sugestao.aplicada
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-[#2703A6] text-white hover:bg-[#201AD9] hover:shadow-md'
              }`}
            >
              {sugestao.aplicada ? 'Aplicada' : 'Aplicar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
