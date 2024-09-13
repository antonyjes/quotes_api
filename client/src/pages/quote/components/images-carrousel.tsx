import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react"

export const ImagesCarrousel = ({setBackgroundImage}: {setBackgroundImage: (image: string) => void}) => {
    const images: string[] = []

    for (let i = 1; i < 11; i++) {
        images.push(`/background-images/bg${i}.png`)
    }
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleImages, setVisibleImages] = useState(images.slice(currentIndex, currentIndex + 4));

    const handlePrev = () => {
        const newIndex = currentIndex - 1;
        if (newIndex < 0) return;
        setCurrentIndex(newIndex);
        setVisibleImages(images.slice(newIndex, newIndex + 4));
    };

    const handleNext = () => {
        const newIndex = currentIndex + 1;
        if (newIndex >= images.length - 3) return;
        setCurrentIndex(newIndex);
        setVisibleImages(images.slice(newIndex, newIndex + 4));
    }

    return(
        <div className="relative w-full h-full">
            <div className="flex justify-center">
                {
                    visibleImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="w-1/4 h-full object-cover cursor-pointer"
                            onClick={() => setBackgroundImage(image)}
                        />
                    ))
                }
            </div>
            <ChevronLeft onClick={handlePrev} className="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full bg-white p-2 cursor-pointer" />
            <ChevronRight onClick={handleNext} className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full bg-white p-2 cursor-pointer" />
        </div>
    )
}