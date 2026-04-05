import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center mx-auto min-h-[80vh] px-4'>
                <form onSubmit={submitHandler} className='w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 my-10 shadow-2xl hover:shadow-primary/10 transition-shadow duration-300'>
                    <h1 className='font-extrabold text-2xl md:text-3xl mb-6 md:mb-8 text-center text-gray-800 dark:text-gray-100'>Welcome Back</h1>
                    <div className='space-y-4'>
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="email@gmail.com"
                                className="rounded-xl"
                            />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="password"
                                className="rounded-xl"
                            />
                        </div>
                    </div>
                    
                    <div className='mt-6'>
                        <RadioGroup className="flex items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer h-4 w-4"
                                />
                                <Label htmlFor="r1" className="cursor-pointer">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer h-4 w-4"
                                />
                                <Label htmlFor="r2" className="cursor-pointer">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    
                    {
                        loading ? (
                            <Button className="w-full my-6 bg-primary hover:bg-primary/90 text-white rounded-full h-12 md:h-14 text-lg font-medium"> 
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait 
                            </Button> 
                        ) : (
                            <Button type="submit" className="w-full my-6 bg-primary hover:bg-primary/90 text-white rounded-full h-12 md:h-14 text-lg font-medium shadow-lg shadow-primary/25 transition-all duration-300">
                                Login
                            </Button>
                        )
                    }
                    
                    <div className='text-center'>
                        <span className='text-sm text-gray-600 dark:text-gray-400'>
                            Don't have an account? <Link to="/signup" className='text-primary hover:underline font-semibold'>Signup</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login