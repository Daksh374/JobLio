import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl my-5 p-4 md:p-8'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-16 w-16 md:h-24 md:w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                            <AvatarFallback>{user?.fullname?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-lg md:text-xl'>{user?.fullname}</h1>
                            <p className='text-sm md:text-base text-gray-600 dark:text-gray-400'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="sm:text-right w-full sm:w-auto" variant="outline"><Pen className="w-4 h-4 mr-2" /> Edit Profile</Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2 text-sm md:text-base'>
                        <Mail className="w-4 h-4" />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2 text-sm md:text-base'>
                        <Contact className="w-4 h-4" />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-bold mb-2'>Skills</h1>
                    <div className='flex flex-wrap items-center gap-2'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className="px-3 py-1">{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer text-sm md:text-base truncate'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-0'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <div className='overflow-x-auto'>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile