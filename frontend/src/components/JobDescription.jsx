import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 px-4'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6'>
                <div>
                    <h1 className='font-bold text-2xl md:text-3xl'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 dark:text-blue-400 font-bold'} variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className={'text-[#F83002] dark:text-red-400 font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] dark:text-purple-400 font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg text-white w-full sm:w-auto px-8 py-6 sm:py-2 text-lg sm:text-base ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 dark:border-b-gray-700 font-medium py-4 mt-8'>Job Description</h1>
            <div className='my-6 space-y-4'>
                <h1 className='font-bold flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0'>Role: <span className='sm:pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.title}</span></h1>
                <h1 className='font-bold flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0'>Location: <span className='sm:pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.location}</span></h1>
                <h1 className='font-bold flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0'>Description: <span className='sm:pl-4 font-normal text-gray-800 dark:text-gray-300 text-sm md:text-base'>{singleJob?.description}</span></h1>
                <h1 className='font-bold flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0'>Experience: <span className='sm:pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.experience} yrs</span></h1>
                <h1 className='font-bold flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0'>Salary: <span className='sm:pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0'>Total Applicants: <span className='sm:pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0'>Posted Date: <span className='sm:pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription