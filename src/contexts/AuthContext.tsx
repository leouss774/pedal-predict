import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isLoading: boolean;
  hasRole: (roles: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const token = localStorage.getItem('access_token');
    const savedRole = localStorage.getItem('user_role');
    const savedEmail = localStorage.getItem('user_email');

    if (token && savedRole && savedEmail) {
      setUser({ email: savedEmail, role: savedRole });
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_role', userData.role);
    localStorage.setItem('user_email', userData.email);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');
    setUser(null);
  };

  // Fonction utilitaire pour vérifier les rôles
  const hasRole = (roles: string | string[]): boolean => {
    if (!user) return false;
    
    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    return requiredRoles.includes(user.role);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};