import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Testimonial } from "@/types";
import { Star } from "lucide-react";

interface TestimonialsCardProps {
  testimonials: Testimonial[];
}

const TestimonialsCard = ({ testimonials }: TestimonialsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">What Patients Are Saying</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="border-l-4 border-primary pl-4">
            {testimonial.rating && (
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            )}
            <p className="text-muted-foreground text-lg italic">"{testimonial.quote}"</p>
            <p className="text-sm font-semibold mt-2">- {testimonial.author}</p>
            {testimonial.source && <p className="text-xs text-muted-foreground">Source: {testimonial.source}</p>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TestimonialsCard;