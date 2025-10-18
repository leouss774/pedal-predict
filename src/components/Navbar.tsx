import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Trophy className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">TdF Predictor</span>
          </Link>
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
