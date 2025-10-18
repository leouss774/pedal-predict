import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { NewsCard } from "@/components/NewsCard";
import { Trophy, TrendingUp, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-cycling.jpg";

export default function Index() {
  // Latest Tour de France updates from web scraping
  const tdfUpdates = [
    {
      title: "Tadej Pogačar Claims Fourth Tour Title",
      description: "Slovenian cyclist Tadej Pogačar has won his fourth Tour de France in six years, cementing his position as one of cycling's greatest champions.",
      date: "July 27, 2025",
      category: "Results"
    },
    {
      title: "2025 Tour de France Route Announced",
      description: "The 2025 Tour de France features 21 stages covering 3,301.9 km, starting from Lille Métropole and ending in Paris. Mountain stages include Hautacam and Mont-Dore.",
      date: "October 2024",
      category: "Route"
    },
    {
      title: "Vingegaard vs Pogačar Rivalry Continues",
      description: "Jonas Vingegaard (Visma–Lease a Bike) aims for his third title after wins in 2022 and 2023, setting up another epic battle with Pogačar.",
      date: "Pre-Season 2025",
      category: "Preview"
    },
    {
      title: "Green Jersey Battle Heats Up",
      description: "2024 winner Biniam Girmay faces fierce competition from Jasper Philipsen, Tim Merlier, and Jonathan Milan in the sprint classification.",
      date: "Season 2025",
      category: "Sprinters"
    }
  ];

  const features = [
    {
      icon: Trophy,
      title: "AI Predictions",
      description: "Machine learning models analyze rider performance, team dynamics, and historical data"
    },
    {
      icon: TrendingUp,
      title: "Live Analytics",
      description: "Real-time Power BI dashboards with race insights and performance metrics"
    },
    {
      icon: Users,
      title: "Rider Profiles",
      description: "Comprehensive database of top contenders and their statistics"
    },
    {
      icon: Target,
      title: "Accuracy Tracking",
      description: "Historical prediction accuracy and model performance insights"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center z-10 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Predict the Next <br />
            <span className="text-primary">Tour de France</span> Winner
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            AI-powered predictions backed by machine learning and comprehensive cycling analytics
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/predict">
              <Button variant="hero" size="xl">
                Make Prediction
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="xl" className="border-2 border-white text-white hover:bg-white hover:text-foreground">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Why TdF Predictor?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-lg bg-card hover:shadow-[var(--shadow-yellow)] transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Latest Tour de France Updates</h2>
            <p className="text-muted-foreground text-lg">
              Stay informed with the latest news, results, and insights
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tdfUpdates.map((update, index) => (
              <div 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <NewsCard {...update} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <Trophy className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Ready to Predict the Winner?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our community and access AI-powered predictions for the next Tour de France
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/predict">
              <Button variant="default" size="xl">
                Start Predicting
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="xl">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 TdF Predictor. Powered by AI and Machine Learning.</p>
        </div>
      </footer>
    </div>
  );
}
