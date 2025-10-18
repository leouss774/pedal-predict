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
    const riderName = formData.get("rider-name") as string;

    // Placeholder for FastAPI integration
    setTimeout(() => {
      setPrediction({
        rider: riderName,
        probability: "78.5%",
        confidence: "High",
        factors: [
          "Strong mountain climbing performance",
          "Consistent time trial results",
          "Recent form improvements"
        ]
      });
      setIsLoading(false);
      toast({
        title: "Prediction Complete",
        description: `Analysis for ${riderName} is ready!`,
      });
    }, 1500);
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
                    <Label htmlFor="rider-name">Rider Name</Label>
                    <Input
                      id="rider-name"
                      name="rider-name"
                      placeholder="e.g., Tadej Pogačar"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team">Team</Label>
                    <Input
                      id="team"
                      name="team"
                      placeholder="e.g., UAE Team Emirates"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recent-wins">Recent Wins</Label>
                    <Input
                      id="recent-wins"
                      name="recent-wins"
                      type="number"
                      placeholder="5"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Analyzing..." : "Predict Winner"}
                  </Button>
                  
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Connect your FastAPI backend by updating the API endpoint in the fetch call.
                      Replace the placeholder timeout with:
                    </p>
                    <code className="block mt-2 p-2 bg-background rounded text-xs">
                      fetch('http://your-fastapi-url/predict', &#123; method: 'POST', ... &#125;)
                    </code>
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
                Embed your Power BI reports and dashboards here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Power BI iframe will be embedded here. Use the Power BI embed code:
                </p>
                <code className="block p-4 bg-background rounded text-sm text-left">
                  &lt;iframe<br/>
                  &nbsp;&nbsp;title="Your Report"<br/>
                  &nbsp;&nbsp;width="100%"<br/>
                  &nbsp;&nbsp;height="600"<br/>
                  &nbsp;&nbsp;src="YOUR_POWER_BI_EMBED_URL"<br/>
                  &nbsp;&nbsp;frameborder="0"<br/>
                  &nbsp;&nbsp;allowFullScreen<br/>
                  &gt;&lt;/iframe&gt;
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
