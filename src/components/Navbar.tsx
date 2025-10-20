import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLogoutDialogOpen(false);
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Trophy className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">TdF Predictor</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/predict" className="text-sm font-medium hover:text-primary transition-colors">
            Predict
          </Link>
          <Link to="/analytics" className="text-sm font-medium hover:text-primary transition-colors">
            Analytics
          </Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="hidden sm:block">
                  <div className="font-medium">{user?.email}</div>
                  <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
                </div>
              </div>

              <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Log Out</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to log out? You will need to sign in again to access your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleLogout}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Yes, Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}