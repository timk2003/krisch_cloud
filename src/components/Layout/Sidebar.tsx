import { HomeIcon, DumbbellIcon, BookOpenIcon, ListTodoIcon, BookTextIcon, FolderIcon, BanknoteIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationItem } from '../../types';

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: 'HomeIcon' },
  { name: 'Fitness', href: '/fitness', icon: 'DumbbellIcon' },
  { name: 'Schulung', href: '/schulung', icon: 'BookOpenIcon' },
  { name: 'ToDos & Ziele', href: '/todos', icon: 'ListTodoIcon' },
  { name: 'Journal', href: '/journal', icon: 'BookTextIcon' },
  { name: 'Dateien', href: '/dateien', icon: 'FolderIcon' },
  { name: 'Schulden', href: '/schulden', icon: 'BanknoteIcon' },
];

const getIcon = (iconName: string, active: boolean) => {
  const className = `${active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`;
  
  switch (iconName) {
    case 'HomeIcon':
      return <HomeIcon className={className} size={20} />;
    case 'DumbbellIcon':
      return <DumbbellIcon className={className} size={20} />;
    case 'BookOpenIcon':
      return <BookOpenIcon className={className} size={20} />;
    case 'ListTodoIcon':
      return <ListTodoIcon className={className} size={20} />;
    case 'BookTextIcon':
      return <BookTextIcon className={className} size={20} />;
    case 'FolderIcon':
      return <FolderIcon className={className} size={20} />;
    case 'BanknoteIcon':
      return <BanknoteIcon className={className} size={20} />;
    default:
      return <HomeIcon className={className} size={20} />;
  }
};

const Sidebar = ({ open, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  
  return (
    <div 
      className={`${open ? 'w-64' : 'w-20'} h-full bg-card border-r border-border transition-all duration-300 ease-in-out shrink-0 fixed md:relative z-10`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <div className={`${open ? 'flex' : 'hidden'} items-center gap-2`}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            M
          </div>
          <span className="font-semibold text-lg">MeinTag</span>
        </div>
        <div className={`${!open ? 'mx-auto' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            M
          </div>
        </div>
      </div>
      
      <nav className="p-2 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center p-3 rounded-md transition-colors
                ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}
                group
              `}
            >
              {getIcon(item.icon, isActive)}
              <span className={`${open ? 'ml-3 opacity-100' : 'opacity-0 w-0 overflow-hidden'} transition-all duration-300 whitespace-nowrap`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;