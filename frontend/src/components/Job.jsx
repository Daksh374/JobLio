import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className='p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 group'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full dark:border-gray-700 dark:hover:bg-gray-800" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6 dark:border-gray-700 dark:hover:bg-gray-800" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 dark:text-gray-300'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 font-semibold transition-colors duration-300'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] bg-red-50 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 font-semibold transition-colors duration-300'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-primary bg-primary/10 dark:bg-primary/20 dark:text-purple-400 hover:bg-primary/20 dark:hover:bg-primary/30 font-semibold transition-colors duration-300'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-6'>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline" className="rounded-xl border-gray-300 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-200 flex-1">Details</Button>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md flex-1 transition-colors duration-300">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job