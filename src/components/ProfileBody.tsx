"use client";

import React from "react";
import { Provider } from "@/types/provider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface ProfileBodyProps {
  provider: Provider;
}

const ProfileBody: React.FC<ProfileBodyProps> = ({ provider }) => {
  return (
    <Tabs defaultValue="about" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="specialties">Specialties</TabsTrigger>
        <TabsTrigger value="training">Training</TabsTrigger>
        <TabsTrigger value="reviews">Reviews & FAQs</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
      </TabsList>

      <TabsContent value="about">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">About {provider.provider_name}</h3>
          </CardHeader>
          <CardContent className="prose max-w-none dark:prose-invert">
            <p>{provider.bio_experience.provider_bio}</p>
            <div className="mt-4 not-prose">
              <p className="text-sm text-muted-foreground">
                <strong>{provider.bio_experience.years_experience} years experience</strong>
              </p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                <strong>Associations:</strong> {provider.bio_experience.associations_affiliations}
              </p>
            </div>
            <Separator className="my-4" />
            <h4 className="font-semibold">About Our Clinic</h4>
            <div dangerouslySetInnerHTML={{ __html: provider.media_content.about_clinic }} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specialties">
        <Card>
          <CardHeader><h3 className="text-lg font-medium">Conditions Treated</h3></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {provider.specialties.conditions_treated.map(c => <Badge key={c.id} variant="secondary">{c.name}</Badge>)}
          </CardContent>
          <Separator />
          <CardHeader><h3 className="text-lg font-medium">Insurance Accepted</h3></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {provider.specialties.insurance_accepted.map(i => <Badge key={i.id} variant="secondary">{i.name}</Badge>)}
          </CardContent>
          <Separator />
          <CardHeader><h3 className="text-lg font-medium">Payment Methods</h3></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {provider.specialties.payment_methods.map(m => <Badge key={m} variant="secondary">{m}</Badge>)}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="training">
        <Card>
          <CardHeader><h3 className="text-lg font-medium">Training & CEUs ({provider.training_and_ceus.ceu_credits} total credits)</h3></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="text-left">
                <tr><th className="p-2">Course</th><th className="p-2">Date</th><th className="p-2">CEU</th><th className="p-2">Certificate</th></tr>
              </thead>
              <tbody>
                {provider.training_and_ceus.training_completed.map((t, i) => (
                  <tr key={i} className="border-t"><td className="p-2">{t.training_name}</td><td className="p-2">{t.training_date}</td><td className="p-2">{t.ceu_value}</td>
                    <td className="p-2"><a href={t.certificate_upload.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{t.certificate_upload.filename}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews">
        <Card className="mb-6">
          <CardHeader><h3 className="text-lg font-medium">Testimonials (Avg. {provider.reviews_and_faqs.avg_rating} ★)</h3></CardHeader>
          <CardContent className="space-y-4">
            {provider.reviews_and_faqs.testimonials.map((r, i) => (
              <div key={i} className="border-t pt-4 first:border-t-0 first:pt-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-bold">{r.patient_name_initials}</span>
                  <span className="text-sm text-yellow-500">{"★".repeat(r.testimonial_rating)}{"☆".repeat(5-r.testimonial_rating)}</span>
                </div>
                <p className="text-sm text-muted-foreground italic">"{r.testimonial_text}"</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><h3 className="text-lg font-medium">Frequently Asked Questions</h3></CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {provider.reviews_and_faqs.faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{f.question}</AccordionTrigger>
                  <AccordionContent className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: f.answer }} />
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="media">
        <Card className="mb-6">
            <CardHeader><h3 className="text-lg font-medium">Video Introduction</h3></CardHeader>
            <CardContent>
                <div className="aspect-video">
                    <iframe title="intro-video" src={provider.media_content.video_intro.replace("watch?v=", "embed/")} width="100%" height="100%" allowFullScreen className="rounded-md"/>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader><h3 className="text-lg font-medium">Clinic Gallery</h3></CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {provider.media_content.clinic_gallery.map((img, i) => (
                    <img key={i} src={img.url} alt={img.alt} className="w-full h-40 object-cover rounded-md" />
                ))}
            </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileBody;