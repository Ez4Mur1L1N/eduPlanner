import { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div id="page-login" className="min-h-screen bg-gradient-to-br from-[#2703A6] to-[#4945BF] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="w-10 h-10 text-[#2703A6]" />
            <h1
              id="logo-eduplanner"
              className="text-4xl font-bold bg-gradient-to-r from-[#2703A6] to-[#4945BF] bg-clip-text text-transparent"
            >
              EduPlanner
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Sistema de Gestão de Horários Acadêmicos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="input-email" className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              id="input-email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2703A6] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="input-password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="input-password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2703A6] focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              id="link-forgot-password"
              className="text-[#2703A6] hover:text-[#201AD9] transition-colors"
            >
              Esqueci minha senha
            </button>
          </div>

          <button
            id="btn-login"
            type="submit"
            className="w-full bg-gradient-to-r from-[#2703A6] to-[#4945BF] text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
          >
            Entrar
          </button>
        </form>

        {!isRegistering ? (
          <div className="mt-6 text-center">
            <button
              id="btn-register"
              onClick={() => setIsRegistering(true)}
              className="text-sm text-[#2703A6] hover:text-[#201AD9] transition-colors"
            >
              Cadastrar nova conta
            </button>
          </div>
        ) : (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl space-y-3 animate-fade-in">
            <h3 className="font-semibold text-gray-800 mb-3">Criar nova conta</h3>
            <input
              type="text"
              placeholder="Nome completo"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2703A6] text-sm"
            />
            <input
              type="email"
              placeholder="E-mail institucional"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2703A6] text-sm"
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2703A6] text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setIsRegistering(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={onLogin}
                className="flex-1 px-4 py-2 bg-[#2703A6] text-white rounded-lg text-sm hover:bg-[#201AD9] transition-colors"
              >
                Cadastrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
