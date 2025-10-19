import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Trophy, TrendingUp, User } from "lucide-react";
import predictionBg from "@/assets/prediction-bg.jpg";

export default function Predict() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const { toast } = useToast();

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
        headers: { "Content-Type": "application/json" },
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

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Enter Rider Details
                </CardTitle>
                <CardDescription>
                  Input rider information for prediction analysis
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
                  
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Example:</strong> Year: 2022, Country: USA, Team: UAE Team Emirates, Time: 94 hours
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Prediction Results
                </CardTitle>
                <CardDescription>
                  AI-generated analysis and probability
                </CardDescription>
              </CardHeader>
              <CardContent>
                {prediction ? (
                  <div className="space-y-6">
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
                    
                    <div>
                      <h3 className="font-semibold mb-3">Key Factors</h3>
                      <ul className="space-y-2">
                        {prediction.factors.map((factor: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-sm">{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter rider details to see predictions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 animate-fade-in">
            <CardHeader>
              <CardTitle>Power BI Analytics Integration</CardTitle>
              <CardDescription>
                Tour de France Performance Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  title="Tour de France Analytics Dashboard"
                  width="100%"
                  height="700"
                  src="https://app.powerbi.com/reportEmbed?reportId=d744e19e-74c8-4a16-96ab-3ed3251a36a3&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}