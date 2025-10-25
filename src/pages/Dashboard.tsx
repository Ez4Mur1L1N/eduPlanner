import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Professor, Sala, Aula, Sugestao } from '../types';
import { diasSemana, horarios } from '../data/mockData';
import ProfessorCard from '../components/ProfessorCard';
import SalaCard from '../components/SalaCard';
import ScheduleBlock from '../components/ScheduleBlock';
import SuggestionPanel from '../components/SuggestionPanel';

interface DashboardProps {
  professores: Professor[];
  salas: Sala[];
  aulas: Aula[];
  sugestoes: Sugestao[];
  onAddProfessor: (professor: Omit<Professor, 'id'>) => void;
  onAddSala: (sala: Omit<Sala, 'id'>) => void;
  onUpdateAulas: (aulas: Aula[]) => void;
  onUpdateSugestoes: (sugestoes: Sugestao[]) => void;
  onShowToast: (message: string, type: 'success' | 'warning' | 'error') => void;
}

export default function Dashboard({
  professores,
  salas,
  aulas,
  sugestoes,
  onAddProfessor,
  onAddSala,
  onUpdateAulas,
  onUpdateSugestoes,
  onShowToast
}: DashboardProps) {
  const [draggedProfessor, setDraggedProfessor] = useState<Professor | null>(null);
  const [draggedSala, setDraggedSala] = useState<Sala | null>(null);
  const [hoveredProfessor, setHoveredProfessor] = useState<Professor | null>(null);
  const [showAddProfessor, setShowAddProfessor] = useState(false);
  const [showAddSala, setShowAddSala] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [novoProfessor, setNovoProfessor] = useState({ nome: '', email: '' });
  const [novaSala, setNovaSala] = useState({ nome: '', capacidade: '', tipo: 'Sala' as const });

  const handleProfessorDragStart = (e: React.DragEvent, professor: Professor) => {
    setDraggedProfessor(professor);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSalaDragStart = (e: React.DragEvent, sala: Sala) => {
    setDraggedSala(sala);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (dia: string, hora: string) => {
    if (hora === '20h30') return;

    const aulaId = `${dia.toLowerCase().slice(0, 3)}-${hora}`;
    const existingAula = aulas.find((a) => a.dia === dia && a.hora === hora);

    if (draggedProfessor) {
      // *** INÍCIO DA MODIFICAÇÃO ***
      // 1. Verificar disponibilidade do professor
      const diaAbrev = dia.toLowerCase().slice(0, 3);
      const isAvailable = draggedProfessor.disponibilidade.includes(`${diaAbrev}-${hora}`);

      // 2. Se não estiver disponível, mostrar erro e parar
      if (!isAvailable) {
        onShowToast('Professor indisponível nesse horário', 'error');
        setDraggedProfessor(null);
        return;
      }

      // 3. Remover a verificação de 'professorConflict' antiga e incorreta
      /*
      const professorConflict = aulas.some(
        (a) => a.professor === draggedProfessor.nome && a.hora === hora && a.dia !== dia
      );
      */

      // A verificação de conflito existente (se já há um professor no slot) está correta
      if (existingAula && existingAula.professor) {
        onShowToast('Já existe um professor alocado neste horário', 'error');
        setDraggedProfessor(null);
        return;
      }
      // *** FIM DA MODIFICAÇÃO ***

      const newAulas = existingAula
        ? aulas.map((a) =>
            a.dia === dia && a.hora === hora
              ? { ...a, professor: draggedProfessor.nome }
              : a
          )
        : [
            ...aulas,
            {
              id: aulaId,
              professor: draggedProfessor.nome,
              sala: '',
              dia,
              hora
            }
          ];

      onUpdateAulas(newAulas);
      onShowToast('Professor adicionado com sucesso', 'success');
      setDraggedProfessor(null);
    }

    if (draggedSala) {
      // Lógica da sala (mantida)
      const salaConflict = aulas.some(
        (a) => a.sala === draggedSala.nome && a.hora === hora && a.dia !== dia
      );

      if (salaConflict) {
        onShowToast('Essa sala já está alocada em outro dia neste horário', 'error');
        setDraggedSala(null);
        return;
      }

      const newAulas = existingAula
        ? aulas.map((a) =>
            a.dia === dia && a.hora === hora ? { ...a, sala: draggedSala.nome } : a
          )
        : [
            ...aulas,
            {
              id: aulaId,
              professor: '',
              sala: draggedSala.nome,
              dia,
              hora
            }
          ];

      onUpdateAulas(newAulas);
      onShowToast('Sala adicionada com sucesso', 'success');
      setDraggedSala(null);
    }
  };

  const handleAddProfessor = () => {
    if (!novoProfessor.nome || !novoProfessor.email) return;

    onAddProfessor({
      nome: novoProfessor.nome,
      email: novoProfessor.email,
      disponibilidade: ['seg-19h00', 'qua-19h00'] // Disponibilidade padrão
    });

    setNovoProfessor({ nome: '', email: '' });
    setShowAddProfessor(false);
    onShowToast('Professor adicionado com sucesso', 'success');
  };

  const handleAddSala = () => {
    if (!novaSala.nome || !novaSala.capacidade) return;

    onAddSala({
      nome: novaSala.nome,
      capacidade: parseInt(novaSala.capacidade),
      tipo: novaSala.tipo,
      equipamentos: [] // Adicionado para conformar com o tipo
    });

    setNovaSala({ nome: '', capacidade: '', tipo: 'Sala' });
    setShowAddSala(false);
    onShowToast('Sala adicionada com sucesso', 'success');
  };

  const handleApplySuggestion = (id: number) => {
    const newSugestoes = sugestoes.map((s) =>
      s.id === id ? { ...s, aplicada: true } : s
    );
    onUpdateSugestoes(newSugestoes);
    onShowToast('Sugestão aplicada', 'success');
  };

  const isSlotHighlighted = (dia: string, hora: string) => {
    if (!hoveredProfessor) return false;
    const diaAbrev = dia.toLowerCase().slice(0, 3);
    return hoveredProfessor.disponibilidade.includes(`${diaAbrev}-${hora}`);
  };

  return (
    // Adicionando classes de dark mode
    <div id="page-dashboard" className="min-h-screen p-6">
      <div className="max-w-[1800px] mx-auto grid grid-cols-12 gap-6">
        <div id="dashboard-professores" className="col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Professores</h2>
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="p-2 rounded-lg bg-[#2703A6] text-white hover:bg-[#201AD9] transition-colors"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {professores.map((professor) => (
              <ProfessorCard
                key={professor.id}
                professor={professor}
                onDragStart={handleProfessorDragStart}
                onMouseEnter={() => setHoveredProfessor(professor)}
                onMouseLeave={() => setHoveredProfessor(null)}
              />
            ))}

            {!showAddProfessor ? (
              <button
                id="btn-add-professor"
                onClick={() => setShowAddProfessor(true)}
                className="w-full bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:border-[#4945BF] hover:text-[#4945BF] dark:hover:border-[#4945BF] dark:hover:text-[#4945BF] transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Adicionar professor</span>
              </button>
            ) : (
              <div
                id="form-professor"
                className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-3 border border-gray-200 dark:border-gray-700 animate-fade-in"
              >
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={novoProfessor.nome}
                  onChange={(e) => setNovoProfessor({ ...novoProfessor, nome: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#2703A6]"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={novoProfessor.email}
                  onChange={(e) => setNovoProfessor({ ...novoProfessor, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#2703A6]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddProfessor(false)}
                    className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    id="btn-salvar-professor"
                    onClick={handleAddProfessor}
                    className="flex-1 px-3 py-2 bg-[#2703A6] text-white rounded-lg text-sm hover:bg-[#201AD9] transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="grade-horarios" className="col-span-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Grade de Horários</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="grid grid-cols-6 gap-3">
              <div className="font-semibold text-gray-700 dark:text-gray-300 text-center text-sm"></div>
              {diasSemana.map((dia) => (
                <div
                  key={dia}
                  id={`col-${dia.toLowerCase()}`}
                  className="font-semibold text-gray-700 dark:text-gray-300 text-center text-sm"
                >
                  {dia}
                </div>
              ))}

              {horarios.map((hora) => (
                <>
                  <div
                    key={`label-${hora}`}
                    id={`slot-${hora}`}
                    className="font-medium text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center"
                  >
                    {hora}
                  </div>
                  {diasSemana.map((dia) => {
                    const aula = aulas.find((a) => a.dia === dia && a.hora === hora);
                    const isIntervalo = hora === '20h30';
                    return (
                      <ScheduleBlock
                        key={`${dia}-${hora}`}
                        dia={dia}
                        hora={hora}
                        aula={aula}
                        isHighlighted={isSlotHighlighted(dia, hora)}
                        isIntervalo={isIntervalo}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                      />
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>

        <div id="dashboard-salas" className="col-span-3">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Salas</h2>
          <div className="grid grid-cols-2 gap-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {salas.map((sala) => (
              <SalaCard key={sala.id} sala={sala} onDragStart={handleSalaDragStart} />
            ))}

            {!showAddSala ? (
              <button
                id="btn-add-sala"
                onClick={() => setShowAddSala(true)}
                className="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:border-[#4945BF] hover:text-[#4945BF] dark:hover:border-[#4945BF] dark:hover:text-[#4945BF] transition-all duration-200"
              >
                <Plus className="w-6 h-6" />
                <span className="text-sm font-medium">Adicionar sala</span>
              </button>
            ) : (
              <div
                id="form-sala"
                className="col-span-2 bg-white dark:bg-gray-800 rounded-xl p-4 space-y-3 border border-gray-200 dark:border-gray-700 animate-fade-in"
              >
                <input
                  type="text"
                  placeholder="Nome"
                  value={novaSala.nome}
                  onChange={(e) => setNovaSala({ ...novaSala, nome: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#2703A6]"
                />
                <select
                  value={novaSala.tipo}
                  onChange={(e) => setNovaSala({ ...novaSala, tipo: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#2703A6]"
                >
                  <option value="Sala">Sala</option>
                  <option value="Laboratório">Laboratório</option>
                  <option value="Auditório">Auditório</option>
                </select>
                <input
                  type="number"
                  placeholder="Capacidade"
                  value={novaSala.capacidade}
                  onChange={(e) => setNovaSala({ ...novaSala, capacidade: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#2703A6]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddSala(false)}
                    className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddSala}
                    className="flex-1 px-3 py-2 bg-[#2703A6] text-white rounded-lg text-sm hover:bg-[#201AD9] transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SuggestionPanel
        isOpen={showSuggestions}
        sugestoes={sugestoes}
        onClose={() => setShowSuggestions(false)}
        onApply={handleApplySuggestion}
      />

      {showSuggestions && (
        <div
          onClick={() => setShowSuggestions(false)}
          className="fixed inset-0 bg-black bg-opacity-20 z-30 animate-fade-in"
        />
      )}
    </div>
  );
}
