import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dumbbell, 
  GraduationCap, 
  CheckSquare, 
  BookOpen, 
  FileText, 
  CreditCard,
  Settings,
  Bell,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
  { icon: <Dumbbell size={20} />, label: 'Fitness', path: '/fitness' },
  { icon: <GraduationCap size={20} />, label: 'Schulung', path: '/schulung' },
  { icon: <CheckSquare size={20} />, label: 'Todos', path: '/todos' },
  { icon: <BookOpen size={20} />, label: 'Journal', path: '/journal' },
  { icon: <FileText size={20} />, label: 'Dateien', path: '/dateien' },
  { icon: <CreditCard size={20} />, label: 'Schulden', path: '/schulden' },
];

export default function MainLayout() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme !== null) {
        return savedTheme === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-foreground">MeinTag</h1>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-md"
              >
                <User size={18} />
                Admin
              </Link>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-foreground hover:bg-accent rounded-md"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
            <button className="p-2 text-foreground hover:bg-accent rounded-md">
              <Bell size={20} />
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-md"
            >
              <LogOut size={18} />
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}