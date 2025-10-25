import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Professores from './pages/Professores';
import Salas from './pages/Salas';
import Configuracoes from './pages/Configuracoes';
import Navigation from './components/Navigation';
import ToastContainer from './components/ToastContainer';
import { Professor, Sala, Aula, Sugestao, Toast } from './types';
import {
  initialProfessores,
  initialSalas,
  initialAulas,
  initialSugestoes
} from './data/mockData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [professores, setProfessores] = useState<Professor[]>(initialProfessores);
  const [salas, setSalas] = useState<Sala[]>(initialSalas);
  const [aulas, setAulas] = useState<Aula[]>(initialAulas);
  const [sugestoes, setSugestoes] = useState<Sugestao[]>(initialSugestoes);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastCounter, setToastCounter] = useState(0);

  const showToast = (message: string, type: 'success' | 'warning' | 'error') => {
    const newToast: Toast = {
      id: toastCounter,
      message,
      type
    };
    setToasts((prev) => [...prev, newToast]);
    setToastCounter((prev) => prev + 1);
  };

  const closeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddProfessor = (professor: Omit<Professor, 'id'>) => {
    const newId = Math.max(0, ...professores.map((p) => p.id)) + 1;
    setProfessores([...professores, { ...professor, id: newId }]);
  };

  const handleAddSala = (sala: Omit<Sala, 'id'>) => {
    const newId = Math.max(0, ...salas.map((s) => s.id)) + 1;
    setSalas([...salas, { ...sala, id: newId }]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    showToast('Login realizado com sucesso', 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
    showToast('Você saiu da sua conta', 'success');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      {currentPage === 'dashboard' && (
        <Dashboard
          professores={professores}
          salas={salas}
          aulas={aulas}
          sugestoes={sugestoes}
          onAddProfessor={handleAddProfessor}
          onAddSala={handleAddSala}
          onUpdateAulas={setAulas}
          onUpdateSugestoes={setSugestoes}
          onShowToast={showToast}
        />
      )}

      {currentPage === 'professores' && (
        <Professores
          professores={professores}
          onAddProfessor={handleAddProfessor}
          onShowToast={showToast}
        />
      )}

      {currentPage === 'salas' && (
        <Salas salas={salas} onAddSala={handleAddSala} onShowToast={showToast} />
      )}

      {currentPage === 'config' && (
        <Configuracoes onLogout={handleLogout} onShowToast={showToast} />
      )}

      <ToastContainer toasts={toasts} onClose={closeToast} />
    </div>
  );
}

export default App;
