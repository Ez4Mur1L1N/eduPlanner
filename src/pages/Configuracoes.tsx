import { useState } from 'react';
import { Moon, Sun, Bell, Calendar, LogOut } from 'lucide-react';

interface ConfiguracoesProps {
  onLogout: () => void;
  onShowToast: (message: string, type: 'success' | 'warning' | 'error') => void;
}

export default function Configuracoes({ onLogout, onShowToast }: ConfiguracoesProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [googleSync, setGoogleSync] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    onShowToast(
      darkMode ? 'Tema claro ativado' : 'Tema escuro ativado',
      'success'
    );
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    onShowToast(
      notifications ? 'Notificações desativadas' : 'Notificações ativadas',
      'success'
    );
  };

  const handleGoogleSync = () => {
    setGoogleSync(!googleSync);
    onShowToast(
      googleSync
        ? 'Sincronização desconectada'
        : 'Conectado ao Google Calendar',
      'success'
    );
  };

  return (
    <div
      id="page-config"
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1
            className={`text-3xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Configurações
          </h1>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Personalize sua experiência no EduPlanner
          </p>
        </div>

        <div className="space-y-4">
          <div
            className={`rounded-xl p-6 shadow-md ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              Aparência
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-[#2703A6]" />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    Modo escuro
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Alterne entre tema claro e escuro
                  </p>
                </div>
              </div>
              <button
                id="toggle-darkmode"
                onClick={handleDarkModeToggle}
                className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                  darkMode ? 'bg-[#2703A6]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    darkMode ? 'transform translate-x-7' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          <div
            className={`rounded-xl p-6 shadow-md ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              Notificações
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell
                  className={`w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-[#2703A6]'
                  }`}
                />
                <div>
                  <p
                    className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    Notificações no sistema
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Receba alertas e toasts informativos
                  </p>
                </div>
              </div>
              <button
                id="toggle-notifications"
                onClick={handleNotificationsToggle}
                className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                  notifications ? 'bg-[#2703A6]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    notifications ? 'transform translate-x-7' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          <div
            className={`rounded-xl p-6 shadow-md ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              Integrações
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar
                  className={`w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-[#2703A6]'
                  }`}
                />
                <div>
                  <p
                    className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    Google Calendar
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Sincronize sua grade de horários
                  </p>
                </div>
              </div>
              <button
                id="sync-google"
                onClick={handleGoogleSync}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  googleSync
                    ? 'bg-green-100 text-green-700'
                    : 'bg-[#2703A6] text-white hover:bg-[#201AD9]'
                }`}
              >
                {googleSync ? 'Conectado' : 'Conectar'}
              </button>
            </div>
          </div>

          <div
            className={`rounded-xl p-6 shadow-md ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              Conta
            </h2>
            <button
              id="btn-logout"
              onClick={onLogout}
              className="flex items-center gap-3 w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair da conta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
