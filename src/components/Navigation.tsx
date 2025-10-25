import { LayoutDashboard, Users, DoorOpen, Settings, GraduationCap } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Painel', icon: LayoutDashboard },
    { id: 'professores', label: 'Professores', icon: Users },
    { id: 'salas', label: 'Salas', icon: DoorOpen },
    { id: 'config', label: 'Configurações', icon: Settings }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-[#2703A6]" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#2703A6] to-[#4945BF] bg-clip-text text-transparent">
              EduPlanner
            </h1>
          </div>

          <div className="flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#2703A6] text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
