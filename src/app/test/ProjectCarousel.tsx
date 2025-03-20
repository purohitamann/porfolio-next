import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import GitHubPreview from "./GithubPreview";

const projectLinks = [
    "https://github.com/purohitamann/BrainTumorClassficationModel",
    "https://github.com/purohitamann/ChurnPredictionModel",
    "https://github.com/purohitamann/Pentagram"
];
import { useEffect, useRef } from "react";

export default function ProjectCarousel() {
    const carouselRef = useRef<{ next: () => void } | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            carouselRef.current?.next(); // Moves to the next slide
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center items-center py-8">
            <Carousel ref={carouselRef} className="w-full max-w-4xl mx-auto px-4">
                <CarouselContent>
                    {projectLinks.map((url, index) => (
                        <CarouselItem key={index} className="flex justify-center">
                            <GitHubPreview url={url} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
