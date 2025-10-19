import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/public/RollerData.png" 
              alt="RollerData Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"             />
            <span className="text-xl font-bold">CyclerData</span>
          </Link>

          {/* Navbar Links */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link to="/predict">
              <Button variant="ghost">Predict Winner</Button>
            </Link>
            <Link to="/auth">
              <Button variant="default" size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};