import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface NewsCardProps {
  title: string;
  description: string;
  date?: string;
  category?: string;
}

export const NewsCard = ({ title, description, date, category }: NewsCardProps) => {
  return (
    <Card className="hover:shadow-[var(--shadow-yellow)] transition-all duration-300 hover:scale-105 cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          {category && (
            <Badge variant="secondary" className="shrink-0">
              {category}
            </Badge>
          )}
        </div>
        {date && (
          <CardDescription className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {date}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
