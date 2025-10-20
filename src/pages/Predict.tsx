import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Trophy, TrendingUp, User } from "lucide-react";
import predictionBg from "@/assets/prediction-bg.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { RoleGuard, AdminOnly, TeamManagerOnly, PartnerOnly } from "@/components/RoleGuard";

export default function Predict() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const { toast } = useToast();
  const { user, isAuthenticated, hasRole } = useAuth();

  const handlePredict = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const year = Number(formData.get("race-year"));
    const country = formData.get("rider-country") as string;
    const team = formData.get("team") as string;
    const timeHours = Number(formData.get("time-hours"));

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          year: year,
          time_hours: timeHours,
          country: country,
          team: team
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check if there's an error in the response
      if (data.error) {
        throw new Error(data.error);
      }

      setPrediction({
        year: year,
        country: country,
        team: team,
        timeHours: timeHours,
        probability: data.probability,
        confidence: data.confidence,
        winnerPrediction: data.winner_prediction,
        factors: [
          `Race Year: ${year}`,
          `Rider's Country: ${country}`,
          `Team: ${team}`,
          `Time: ${timeHours} hours`,
          `Prediction: ${data.winner_prediction === 1 ? 'Likely Winner 🏆' : 'Not Predicted to Win'}`,
        ],
      });

      toast({
        title: "Prediction Complete",
        description: `Analysis for ${country} rider is ready!`,
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div 
            className="rounded-2xl p-12 mb-12 text-center relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${predictionBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-white mb-4">Winner Prediction</h1>
            <p className="text-xl text-white/90">
              AI-powered machine learning model to predict Tour de France winners
            </p>
          </div>

          {/* Bannière d'information selon le rôle */}
          {isAuthenticated && (
            <div className="mb-8 animate-fade-in">
              <AdminOnly>
                <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">🚀 Administrator Access</h3>
                  <p className="text-yellow-700">
                    You have full access to all prediction data, analytics dashboards, and system controls.
                  </p>
                </div>
              </AdminOnly>
              
              <TeamManagerOnly>
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">👥 Team Manager Access</h3>
                  <p className="text-blue-700">
                    Access to team-specific predictions and performance analytics. Your team is auto-filled in forms.
                  </p>
                </div>
              </TeamManagerOnly>
              
              <PartnerOnly>
                <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">💼 Partner Access</h3>
                  <p className="text-green-700">
                    Access to winner predictions and media impact analytics for sponsorship evaluation.
                  </p>
                </div>
              </PartnerOnly>
              
              <RoleGuard allowedRoles={['viewer']}>
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 Viewer Access</h3>
                  <p className="text-gray-700">
                    Basic access to prediction features and public Tour de France statistics.
                  </p>
                </div>
              </RoleGuard>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Enter Rider Details
                  {/* Badge de rôle */}
                  {isAuthenticated && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      {user?.role}
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  {hasRole(['admin', 'team_manager']) 
                    ? "Input rider information for prediction analysis" 
                    : "Make predictions based on available data"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePredict} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="race-year">Race Year</Label>
                    <Input
                      id="race-year"
                      name="race-year"
                      placeholder="e.g., 2022"
                      type="number"
                      min="1900"
                      max="2030"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rider-country">Rider's Country</Label>
                    <Input
                      id="rider-country"
                      name="rider-country"
                      placeholder="e.g., USA"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="team">Team</Label>
                    <Input
                      id="team"
                      name="team"
                      placeholder="e.g., UAE Team Emirates"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time-hours">Time in Hours</Label>
                    <Input
                      id="time-hours"
                      name="time-hours"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 94.5"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Analyzing..." : "Predict Winner"}
                  </Button>

                </form>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Prediction Results
                  {/* Indicateur de confidentialité */}
                  <RoleGuard allowedRoles={['admin', 'team_manager', 'partner']}>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      🔒 Full Access
                    </span>
                  </RoleGuard>
                  <RoleGuard allowedRoles={['viewer']}>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      🔒 Basic Access
                    </span>
                  </RoleGuard>
                </CardTitle>
                <CardDescription>
                  {hasRole(['admin', 'team_manager', 'partner']) 
                    ? "Complete AI-generated analysis and probability"
                    : "Basic prediction results"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {prediction ? (
                  <div className="space-y-6">
                    {/* Section Probabilité - Visible par tous */}
                    <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Win Probability</p>
                      <p className="text-5xl font-bold text-primary mb-2">{prediction.probability}</p>
                      <p className="text-sm text-muted-foreground">Confidence: {prediction.confidence}</p>
                      <div className="mt-4">
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                          prediction.winnerPrediction === 1 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        }`}>
                          {prediction.winnerPrediction === 1 ? '🏆 Predicted Winner' : '❌ Not Predicted to Win'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Facteurs détaillés - Uniquement pour admin, team_manager, partner */}
                    <RoleGuard allowedRoles={['admin', 'team_manager', 'partner']}>
                      <div>
                        <h3 className="font-semibold mb-3">Detailed Analysis</h3>
                        <ul className="space-y-2">
                          {prediction.factors.map((factor: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-sm">{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </RoleGuard>

                    {/* Facteurs basiques - Pour les viewers */}
                    <RoleGuard allowedRoles={['viewer']}>
                      <div>
                        <h3 className="font-semibold mb-3">Prediction Summary</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-sm">Win Probability: {prediction.probability}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-sm">
                              Result: {prediction.winnerPrediction === 1 ? 'Likely Winner 🏆' : 'Not Predicted to Win'}
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-sm">Confidence Level: {prediction.confidence}</span>
                          </li>
                        </ul>
                      </div>
                    </RoleGuard>

                    {/* Informations sensibles - Uniquement pour admin */}
                    <AdminOnly>
                      <div className="p-4 border-2 border-yellow-200 bg-yellow-50 rounded-lg">
                        <h3 className="font-semibold text-yellow-800 mb-2">🔐 Admin Analytics</h3>
                        <p className="text-sm text-yellow-700">
                          Model accuracy: 87.3% | Training data: 2024-01-15 | Confidence threshold: 0.65
                        </p>
                      </div>
                    </AdminOnly>

                    {/* Informations d'équipe - Pour team_manager */}
                    <TeamManagerOnly>
                      <div className="p-4 border-2 border-blue-200 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">👥 Team Insights</h3>
                        <p className="text-sm text-blue-700">
                          Your team performance: 92% completion rate | Best rider: Thomas Pidcock
                        </p>
                      </div>
                    </TeamManagerOnly>

                    {/* Informations sponsor - Pour partner */}
                    <PartnerOnly>
                      <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                        <h3 className="font-semibold text-green-800 mb-2">💼 Media Value</h3>
                        <p className="text-sm text-green-700">
                          Estimated media exposure: $2.4M | Social media impact: 15M impressions
                        </p>
                      </div>
                    </PartnerOnly>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter rider details to see predictions</p>
                    {!isAuthenticated && (
                      <p className="text-xs mt-2">Please sign in to access predictions</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Power BI Dashboard - Accès différencié */}
          <AdminOnly>
            <Card className="mt-8 animate-fade-in border-2 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 Complete Analytics Dashboard
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Admin Full Access
                  </span>
                </CardTitle>
                <CardDescription>
                  Full access to all Tour de France analytics, rider performance, and team statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    title="Tour de France Analytics Dashboard - Admin"
                    width="100%"
                    height="700"
                    src="https://app.powerbi.com/reportEmbed?reportId=d744e19e-74c8-4a16-96ab-3ed3251a36a3&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </AdminOnly>

          <TeamManagerOnly>
            <Card className="mt-8 animate-fade-in border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📈 Team Performance Dashboard
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Team Manager Access
                  </span>
                </CardTitle>
                <CardDescription>
                  Team-specific analytics and rider performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    title="Tour de France Team Dashboard"
                    width="100%"
                    height="500"
                    src="https://app.powerbi.com/reportEmbed?reportId=team-specific-report&autoAuth=true"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </TeamManagerOnly>

          <PartnerOnly>
            <Card className="mt-8 animate-fade-in border-2 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 Media & Sponsorship Dashboard
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Partner Access
                  </span>
                </CardTitle>
                <CardDescription>
                  Winner statistics and media impact analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    title="Tour de France Media Dashboard"
                    width="100%"
                    height="500"
                    src="https://app.powerbi.com/reportEmbed?reportId=media-report&autoAuth=true"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </PartnerOnly>

          <RoleGuard allowedRoles={['viewer']}>
            <Card className="mt-8 animate-fade-in border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 Public Statistics
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    Public Access
                  </span>
                </CardTitle>
                <CardDescription>
                  General Tour de France winner statistics and historical data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    title="Tour de France Public Dashboard"
                    width="100%"
                    height="400"
                    src="https://app.powerbi.com/reportEmbed?reportId=public-report&autoAuth=true"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </RoleGuard>
        </div>
      </div>
    </div>
  );
}