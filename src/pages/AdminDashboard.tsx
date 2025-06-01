import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings,
  Trash2,
  Edit2,
  Check,
  X,
  LogOut
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  role: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
  { icon: <Users size={20} />, label: 'Benutzer', path: '/admin/users' },
  { icon: <Settings size={20} />, label: 'Einstellungen', path: '/admin/settings' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('/admin');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
    fetchUsers();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      setIsAdmin(profile?.role === 'admin');

      if (profile?.role !== 'admin') {
        navigate('/');
      }
    } catch (error: any) {
      setError(error.message);
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Möchten Sie diesen Benutzer wirklich löschen?')) return;

    try {
      // Zuerst den Auth-Benutzer löschen
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      if (authError) throw authError;

      // Dann das Profil löschen
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) throw profileError;
      await fetchUsers();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEditUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          email: editEmail,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;
      setEditingUser(null);
      await fetchUsers();
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-md"
          >
            <LogOut size={18} />
            Abmelden
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => setActiveItem(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md ${
                    activeItem === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {error && (
                  <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 rounded-lg">
                    {error}
                  </div>
                )}

                {activeItem === '/admin' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card p-6 rounded-lg shadow">
                      <h3 className="font-semibold text-foreground">Registrierte Benutzer</h3>
                      <p className="text-2xl font-bold text-primary">{users.length}</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow">
                      <h3 className="font-semibold text-foreground">Aktive Benutzer</h3>
                      <p className="text-2xl font-bold text-primary">
                        {users.filter(user => user.last_sign_in_at).length}
                      </p>
                    </div>
                  </div>
                )}

                {activeItem === '/admin/users' && (
                  <div className="space-y-4">
                    <div className="bg-card rounded-lg shadow overflow-hidden">
                      <table className="min-w-full divide-y divide-border">
                        <thead className="bg-accent">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-accent-foreground uppercase tracking-wider">
                              E-Mail
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-accent-foreground uppercase tracking-wider">
                              Rolle
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-accent-foreground uppercase tracking-wider">
                              Erstellt am
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-accent-foreground uppercase tracking-wider">
                              Letzter Login
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-accent-foreground uppercase tracking-wider">
                              Aktionen
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {users.map((user) => (
                            <tr key={user.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {editingUser === user.id ? (
                                  <input
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                                  />
                                ) : (
                                  user.email
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  user.role === 'admin' 
                                    ? 'bg-primary/10 text-primary'
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                  {user.role || 'user'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(user.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {user.last_sign_in_at
                                  ? new Date(user.last_sign_in_at).toLocaleDateString()
                                  : 'Nie'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                {editingUser === user.id ? (
                                  <div className="flex justify-end gap-2">
                                    <button
                                      onClick={() => handleEditUser(user.id)}
                                      className="p-1 text-success hover:bg-success/10 rounded"
                                    >
                                      <Check size={18} />
                                    </button>
                                    <button
                                      onClick={() => setEditingUser(null)}
                                      className="p-1 text-destructive hover:bg-destructive/10 rounded"
                                    >
                                      <X size={18} />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex justify-end gap-2">
                                    <button
                                      onClick={() => {
                                        setEditingUser(user.id);
                                        setEditEmail(user.email);
                                      }}
                                      className="p-1 text-primary hover:bg-primary/10 rounded"
                                    >
                                      <Edit2 size={18} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteUser(user.id)}
                                      className="p-1 text-destructive hover:bg-destructive/10 rounded"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeItem === '/admin/settings' && (
                  <div className="bg-card p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Einstellungen</h2>
                    <p className="text-muted-foreground">Einstellungen werden in Kürze verfügbar sein.</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
} 