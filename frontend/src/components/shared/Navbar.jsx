import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ModeToggle } from '../ModeToggle'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const navLinks = user && user.role === 'recruiter' ? [
        { name: 'Companies', path: '/admin/companies' },
        { name: 'Jobs', path: '/admin/jobs' },
    ] : [
        { name: 'Home', path: '/' },
        { name: 'Jobs', path: '/jobs' },
        { name: 'Browse', path: '/browse' },
    ];

    return (
        <div className='sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b-[1px] border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-all duration-300'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                <div>
                    <Link to="/">
                        <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Lio</span></h1>
                    </Link>
                </div>
                
                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-6'>
                        {navLinks.map((link) => (
                            <li key={link.path} className='hover:text-primary transition-colors duration-200'>
                                <Link to={link.path}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className='flex items-center gap-4'>
                        <ModeToggle />
                        {
                            !user ? (
                                <div className='flex items-center gap-3'>
                                    <Link to="/login"><Button variant="outline" className="border-gray-300 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-50 transition-all rounded-full px-6">Login</Button></Link>
                                    <Link to="/signup"><Button className="bg-primary hover:bg-primary/90 text-white transition-all rounded-full px-6 shadow-lg shadow-primary/25">Signup</Button></Link>
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
                                                    <p className='text-sm text-muted-foreground line-clamp-2'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600 dark:text-gray-300'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <User2 className="w-4 h-4" />
                                                            <Button variant="link" className="p-0 h-auto"> <Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )
                                                }

                                                <div className='flex w-fit items-center gap-2 cursor-pointer mt-1'>
                                                    <LogOut className="w-4 h-4" />
                                                    <Button onClick={logoutHandler} variant="link" className="p-0 h-auto">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className='md:hidden flex items-center gap-2'>
                    <ModeToggle />
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="relative z-50 hover:bg-transparent"
                    >
                        {isMenuOpen ? <X className="w-6 h-6 text-primary animate-in fade-in zoom-in duration-300" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -20, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className='md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 absolute top-16 left-0 right-0 z-50 shadow-2xl overflow-y-auto max-h-[calc(100vh-64px)]'
                        >
                            <div className='px-6 py-8 space-y-6 font-semibold'>
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.path} 
                                        to={link.path} 
                                        className='block text-lg hover:text-primary transition-colors border-b border-gray-50 dark:border-gray-800/50 pb-2 active:scale-95 origin-left'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                {
                                    !user ? (
                                        <div className='flex flex-col gap-4 pt-4'>
                                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                                <Button variant="outline" className="w-full rounded-full h-12 text-lg border-gray-300 dark:border-gray-700">Login</Button>
                                            </Link>
                                            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                                                <Button className="w-full rounded-full h-12 text-lg bg-primary shadow-lg shadow-primary/25">Signup</Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className='pt-6 border-t border-gray-100 dark:border-gray-800 space-y-6'>
                                            <div className='flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl'>
                                                <Avatar className="h-12 w-12 border-2 border-primary/20">
                                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                                    <AvatarFallback className="bg-primary/10 text-primary">{user?.fullname?.charAt(0) || 'U'}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className='font-bold text-lg'>{user?.fullname}</p>
                                                    <p className='text-sm text-muted-foreground'>{user?.email}</p>
                                                </div>
                                            </div>
                                            <div className='space-y-5 px-2'>
                                                {user.role === 'student' && (
                                                    <Link 
                                                        to="/profile" 
                                                        className='flex items-center gap-3 text-lg hover:text-primary transition-colors'
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <User2 className="w-5 h-5 text-gray-500" />
                                                        View Profile
                                                    </Link>
                                                )}
                                                <button 
                                                    onClick={() => { logoutHandler(); setIsMenuOpen(false); }}
                                                    className='flex items-center gap-3 text-lg text-red-500 hover:text-red-600 transition-colors w-full text-left'
                                                >
                                                    <LogOut className="w-5 h-5" />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Navbar