import { useState } from 'react';
import { User, Plus, Mail, Clock } from 'lucide-react';
import { Professor } from '../types';

interface ProfessoresProps {
  professores: Professor[];
  onAddProfessor: (professor: Omit<Professor, 'id'>) => void;
  onShowToast: (message: string, type: 'success' | 'warning' | 'error') => void;
}

export default function Professores({
  professores,
  onAddProfessor,
  onShowToast
}: ProfessoresProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    turnos: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email) {
      onShowToast('Preencha todos os campos obrigatórios', 'warning');
      return;
    }

    onAddProfessor({
      nome: formData.nome,
      email: formData.email,
      disponibilidade: ['seg-19h00', 'qua-19h00']
    });

    setFormData({ nome: '', email: '', turnos: [] });
    setShowForm(false);
    onShowToast('Professor adicionado com sucesso', 'success');
  };

  return (
    <div id="page-professores" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Professores</h1>
            <p className="text-gray-600">Gerencie o corpo docente da instituição</p>
          </div>
          <button
            id="btn-novo-professor"
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-3 bg-[#2703A6] text-white rounded-xl hover:bg-[#201AD9] transition-all duration-200 hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Novo Professor
          </button>
        </div>

        {showForm && (
          <div
            id="form-professor"
            className="bg-white rounded-xl p-6 shadow-lg mb-6 animate-fade-in"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Adicionar Professor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  placeholder="Digite o nome completo"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2703A6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  placeholder="professor@uel.br"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2703A6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turnos de trabalho
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Matutino', 'Vespertino', 'Noturno'].map((turno) => (
                    <label
                      key={turno}
                      className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.turnos.includes(turno)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, turnos: [...formData.turnos, turno] });
                          } else {
                            setFormData({
                              ...formData,
                              turnos: formData.turnos.filter((t) => t !== turno)
                            });
                          }
                        }}
                        className="w-4 h-4 text-[#2703A6] rounded"
                      />
                      <span className="text-sm">{turno}</span>
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
                  id="btn-salvar-professor"
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#2703A6] text-white rounded-lg hover:bg-[#201AD9] transition-colors"
                >
                  Salvar Professor
                </button>
              </div>
            </form>
          </div>
        )}

        <div id="list-professores" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {professores.map((professor) => (
            <div
              key={professor.id}
              className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2703A6] to-[#4945BF] flex items-center justify-center flex-shrink-0">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 mb-2 truncate">
                    {professor.nome}
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{professor.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{professor.disponibilidade.length} horários disponíveis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
