import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string | string[];
  fallback?: ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  fallback = null 
}) => {
  const { hasRole } = useAuth();
  
  if (!hasRole(allowedRoles)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

// Composants spécialisés pour chaque rôle - MAINTENANT EXCLUSIFS
const AdminOnly: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ 
  children, 
  fallback 
}) => {
  const { user } = useAuth();
  
  // ✅ Uniquement pour les admins (pas pour team_manager ou partner)
  if (user?.role !== 'admin') {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

const TeamManagerOnly: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ 
  children, 
  fallback 
}) => {
  const { user } = useAuth();
  
  // ✅ Uniquement pour les team_managers (pas pour admin ou partner)
  if (user?.role !== 'team_manager') {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

const PartnerOnly: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ 
  children, 
  fallback 
}) => {
  const { user } = useAuth();
  
  // ✅ Uniquement pour les partners (pas pour admin ou team_manager)
  if (user?.role !== 'partner') {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

// ✅ Exporter tous les composants
export { RoleGuard, AdminOnly, TeamManagerOnly, PartnerOnly };