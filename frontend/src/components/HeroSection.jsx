import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center py-20 bg-gradient-to-b from-white/10 to-transparent'>
            <div className='flex flex-col gap-8 my-10 items-center justify-center max-w-4xl mx-auto px-4'>
                <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='px-6 py-2 rounded-full bg-primary/10 text-primary font-semibold tracking-wide shadow-sm backdrop-blur-sm'
                >
                    The Leading Job Search Platform
                </motion.span>
                
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight'
                >
                    Search, Apply & <br /> Get Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#F83002]'>Dream Jobs</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='text-lg md:text-xl text-gray-500 max-w-2xl'
                >
                    Find high-paying jobs from leading companies — all in one place.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className='flex w-full md:w-[60%] lg:w-[50%] bg-white dark:bg-gray-900 shadow-2xl shadow-primary/10 border border-gray-100 dark:border-gray-800 pl-6 rounded-full items-center gap-4 mx-auto hover:shadow-primary/20 transition-all duration-300'
                >
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full bg-transparent py-4 text-gray-700 dark:text-gray-200 placeholder:text-gray-400'
                    />
                    <Button onClick={searchJobHandler} className="rounded-full bg-primary hover:bg-primary/90 text-white h-12 w-12 p-0 flex items-center justify-center mr-2 shadow-md">
                        <Search className='h-5 w-5' />
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection