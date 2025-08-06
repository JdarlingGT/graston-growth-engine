import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Graston Provider Growth Engine
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Welcome to the main portal. Please select a dashboard to continue.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/provider">Provider Dashboard</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/admin">Admin Dashboard</Link>
          </Button>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;