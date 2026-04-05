import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ModeToggle } from '../ModeToggle'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b-[1px] border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-all duration-300'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Lio</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='hover:text-primary transition-colors duration-200'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='hover:text-primary transition-colors duration-200'><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-primary transition-colors duration-200'><Link to="/">Home</Link></li>
                                    <li className='hover:text-primary transition-colors duration-200'><Link to="/jobs">Jobs</Link></li>
                                    <li className='hover:text-primary transition-colors duration-200'><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    <div className='flex items-center gap-4'>
                        <ModeToggle />
                        {
                            !user ? (
                                <div className='flex items-center gap-3'>
                                    <Link to="/login"><Button variant="outline" className="border-gray-300 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-50 transition-all rounded-full p-5 px-6">Login</Button></Link>
                                    <Link to="/signup"><Button className="bg-primary hover:bg-primary/90 text-white transition-all rounded-full p-5 px-6 shadow-lg shadow-primary/25">Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            <AvatarFallback>{user?.fullname?.charAt(0) || 'U'}</AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className=''>
                                            <div className='flex gap-2 space-y-2'>
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                    <AvatarFallback>{user?.fullname?.charAt(0) || 'U'}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600 dark:text-gray-300'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <User2 />
                                                            <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )
                                                }

                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Navbar