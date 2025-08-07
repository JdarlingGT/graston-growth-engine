import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface MediaCardProps {
  galleryImages: string[];
  galleryVideos: string[];
}

const MediaCard = ({ galleryImages, galleryVideos }: MediaCardProps) => {
  const hasMedia = galleryImages.length > 0 || galleryVideos.length > 0;

  if (!hasMedia) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Clinic Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full max-w-full mx-auto">
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={`img-${index}`} className="md:basis-1/2 lg:basis-1/3">
                <img src={image} alt={`Gallery image ${index + 1}`} className="object-cover w-full h-64 rounded-lg border" />
              </CarouselItem>
            ))}
            {galleryVideos.map((videoUrl, index) => (
              <CarouselItem key={`vid-${index}`} className="md:basis-1/2 lg:basis-1/3">
                <iframe
                  className="w-full h-64 rounded-lg border"
                  src={videoUrl.includes("youtube.com") ? videoUrl.replace("watch?v=", "embed/") : videoUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Embedded video ${index + 1}`}
                ></iframe>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-14" />
          <CarouselNext className="mr-14" />
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default MediaCard;