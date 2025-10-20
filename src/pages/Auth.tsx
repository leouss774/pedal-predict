import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Trophy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AuthResponse {
  access_token: string;
  role: string;
  email?: string;
  msg?: string;
}

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("signup-email") as string;
    const password = formData.get("signup-password") as string;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Account created successfully!",
          description: "You can now sign in to your account.",
          variant: "default",
        });
        const signInTab = document.querySelector('[value="signin"]') as HTMLButtonElement;
        if (signInTab) {
          signInTab.click();
        }
      } else {
        toast({
          title: "Registration error",
          description: data.msg || "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Unable to contact the server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("signin-email") as string;
    const password = formData.get("signin-password") as string;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: AuthResponse = await response.json();

      if (response.ok) {
        login(data.access_token, { email, role: data.role });
        
        toast({
          title: "Login successful!",
          description: `Welcome ${email} (Role: ${data.role})`,
          variant: "default",
        });
        
        navigate('/');
      } else {
        toast({
          title: "Login error",
          description: data.msg || "Email or password incorrect",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Unable to contact the server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <Trophy className="h-12 w-12 text-primary" />
            <span className="text-3xl font-bold">TdF Predictor</span>
          </Link>
          <p className="text-muted-foreground">Predict the next Tour de France winner</p>
        </div>

        <Card className="animate-fade-in shadow-[var(--shadow-elevated)]">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Sign in to access predictions and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="signin-email"
                      type="email"
                      placeholder="admin@aso.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      name="signin-password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="signup-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}