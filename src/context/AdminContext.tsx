import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminStatus = localStorage.getItem('admin_authenticated');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('admin_credentials')
        .select('password_hash')
        .eq('username', 'admin')
        .maybeSingle();

      if (error || !data) {
        console.error('Login error:', error);
        return false;
      }

      if (data.password_hash === password) {
        setIsAdmin(true);
        localStorage.setItem('admin_authenticated', 'true');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('admin_authenticated');
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('admin_credentials')
        .select('password_hash')
        .eq('username', 'admin')
        .maybeSingle();

      if (error || !data) {
        console.error('Error fetching credentials:', error);
        return false;
      }

      if (data.password_hash !== oldPassword) {
        return false;
      }

      const { error: updateError } = await supabase
        .from('admin_credentials')
        .update({ password_hash: newPassword, updated_at: new Date().toISOString() })
        .eq('username', 'admin');

      if (updateError) {
        console.error('Error updating password:', updateError);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Change password error:', error);
      return false;
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, changePassword, loading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
