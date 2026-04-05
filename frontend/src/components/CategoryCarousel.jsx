import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "AI Engineer",
    "Data Scientist",
    "FullStack Developer", 
    "Frontend Developer",
    "Backend Developer",
    "Graphic Designer",
    "Data Analyst",
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='flex justify-center my-12 md:my-20 px-4'>
            <Carousel className="w-[85%] md:w-full max-w-xl mx-auto">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="basis-1/2 md:basis-1/2 lg:basis-1/3 p-1">
                                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full w-full border-gray-200 shadow-sm hover:shadow-md hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-sm md:text-base">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel