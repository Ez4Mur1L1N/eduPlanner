import { useState } from 'react';
import { DoorOpen, Laptop, Building2, Plus, Users } from 'lucide-react';
import { Sala } from '../types';

interface SalasProps {
  salas: Sala[];
  onAddSala: (sala: Omit<Sala, 'id'>) => void;
  onShowToast: (message: string, type: 'success' | 'warning' | 'error') => void;
}

export default function Salas({ salas, onAddSala, onShowToast }: SalasProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'Sala' as 'Sala' | 'Laboratório' | 'Auditório',
    capacidade: '',
    equipamentos: [] as string[]
  });

  const equipamentosDisponiveis = [
    'Projetor',
    'Computadores',
    'Lousa Digital',
    'Ar condicionado',
    'Sistema de som',
    'Microfone'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.capacidade) {
      onShowToast('Preencha todos os campos obrigatórios', 'warning');
      return;
    }

    onAddSala({
      nome: formData.nome,
      tipo: formData.tipo,
      capacidade: parseInt(formData.capacidade),
      equipamentos: formData.equipamentos
    });

    setFormData({ nome: '', tipo: 'Sala', capacidade: '', equipamentos: [] });
    setShowForm(false);
    onShowToast('Sala adicionada com sucesso', 'success');
  };

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'Laboratório':
        return <Laptop className="w-8 h-8 text-[#2703A6]" />;
      case 'Auditório':
        return <Building2 className="w-8 h-8 text-[#2703A6]" />;
      default:
        return <DoorOpen className="w-8 h-8 text-[#2703A6]" />;
    }
  };

  return (
    <div id="page-salas" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Salas e Laboratórios</h1>
            <p className="text-gray-600">Gerencie os espaços físicos da instituição</p>
          </div>
          <button
            id="btn-nova-sala"
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-3 bg-[#2703A6] text-white rounded-xl hover:bg-[#201AD9] transition-all duration-200 hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Adicionar Sala
          </button>
        </div>

        {showForm && (
          <div
            id="form-sala"
            className="bg-white rounded-xl p-6 shadow-lg mb-6 animate-fade-in"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Adicionar Sala</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                <input
                  type="text"
                  placeholder="Ex: Lab 1, Sala 203, Auditório A"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2703A6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
                <select
                  value={formData.tipo}
                  onChange={(e) =>
                    setFormData({ ...formData, tipo: e.target.value as any })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2703A6]"
                >
                  <option value="Sala">Sala</option>
                  <option value="Laboratório">Laboratório</option>
                  <option value="Auditório">Auditório</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacidade *
                </label>
                <input
                  type="number"
                  placeholder="Número de alunos"
                  value={formData.capacidade}
                  onChange={(e) => setFormData({ ...formData, capacidade: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2703A6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipamentos
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {equipamentosDisponiveis.map((equip) => (
                    <label
                      key={equip}
                      className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.equipamentos.includes(equip)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              equipamentos: [...formData.equipamentos, equip]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              equipamentos: formData.equipamentos.filter((eq) => eq !== equip)
                            });
                          }
                        }}
                        className="w-4 h-4 text-[#2703A6] rounded"
                      />
                      <span className="text-sm">{equip}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#2703A6] text-white rounded-lg hover:bg-[#201AD9] transition-colors"
                >
                  Salvar Sala
                </button>
              </div>
            </form>
          </div>
        )}

        <div id="list-salas" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {salas.map((sala) => (
            <div
              key={sala.id}
              className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                  {getIcon(sala.tipo)}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{sala.nome}</h3>
                <span className="text-xs text-gray-500 mb-3">{sala.tipo}</span>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Users className="w-4 h-4" />
                  <span>{sala.capacidade} alunos</span>
                </div>
                {sala.equipamentos && sala.equipamentos.length > 0 && (
                  <div className="w-full pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Equipamentos:</p>
                    <div className="flex flex-wrap gap-1">
                      {sala.equipamentos.map((equip) => (
                        <span
                          key={equip}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {equip}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
