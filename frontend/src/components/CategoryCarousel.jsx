import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
// 1. Import the Autoplay plugin
import Autoplay from "embla-carousel-autoplay";

const category = [
    "AI Engineer",
    "Data Scientist",
    "FullStack Developer", 
    "Frontend Developer",
    "Backend Developer",
    "Graphic Designer",
    "Data Analyst",
    "Product Manager",
    "DevOps Engineer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 2. Initialize the plugin
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false })
    );

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className='w-full flex justify-center my-12 md:my-20 px-10'>
            <Carousel 
                // 3. Apply the plugin and set loop to true
                plugins={[plugin.current]}
                opts={{
                    align: "start",
                    loop: true,
                }} 
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                className="w-full max-w-5xl"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {category.map((cat, index) => (
                        <CarouselItem 
                            key={index} 
                            // basis-auto ensures the width fits the text
                            className="pl-2 md:pl-4 basis-auto" 
                        >
                            <div className="p-1">
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    variant="outline" 
                                    className="rounded-full px-6 py-2 border-gray-300 shadow-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 whitespace-nowrap text-sm md:text-base"
                                >
                                    {cat}
                                </Button>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                
                {/* Navigation arrows hidden on mobile, visible on small screens and up */}
                <CarouselPrevious className="-left-12 hidden md:flex" />
                <CarouselNext className="-right-12 hidden md:flex" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;