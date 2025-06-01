import { ReactNode } from 'react';
import { Menu, BellIcon, UserCircle } from 'lucide-react';

interface TopBarProps {
  children?: ReactNode;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const TopBar = ({ children, toggleSidebar, sidebarOpen }: TopBarProps) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label={sidebarOpen ? 'Sidebar einklappen' : 'Sidebar ausklappen'}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold hidden sm:block">MeinTag Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {children}
        <button
          className="p-2 rounded-full hover:bg-secondary transition-colors relative"
          aria-label="Benachrichtigungen"
        >
          <BellIcon size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
        <button className="p-1 rounded-full hover:bg-secondary transition-colors ml-2">
          <UserCircle size={28} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;