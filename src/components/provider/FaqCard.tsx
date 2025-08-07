import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "@/types";

interface FaqCardProps {
  faqs: FAQ[];
}

const FaqCard = ({ faqs }: FaqCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="font-medium text-lg text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FaqCard;