import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div>
            <Navbar />
            <div className='max-w-2xl mx-auto my-10 px-4'>
                <form onSubmit={submitHandler} className='border border-gray-200 dark:border-gray-800 rounded-2xl p-4 md:p-8 shadow-lg bg-white dark:bg-gray-900'>
                    <div className='flex items-center gap-5 mb-8'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold rounded-full px-4">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl md:text-2xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                        <div className='space-y-2'>
                            <Label className="font-semibold text-gray-700 dark:text-gray-300">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="rounded-xl"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className="font-semibold text-gray-700 dark:text-gray-300">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="rounded-xl"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className="font-semibold text-gray-700 dark:text-gray-300">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="rounded-xl"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className="font-semibold text-gray-700 dark:text-gray-300">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="rounded-xl"
                            />
                        </div>
                        <div className='space-y-2 col-span-1 md:col-span-2'>
                            <Label className="font-semibold text-gray-700 dark:text-gray-300">Company Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="rounded-xl cursor-pointer"
                            />
                        </div>
                    </div>
                    {
                        loading ? (
                            <Button className="w-full mt-8 bg-primary rounded-full h-12"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
                        ) : (
                            <Button type="submit" className="w-full mt-8 bg-primary hover:bg-primary/90 rounded-full h-12 shadow-lg shadow-primary/20 transition-all font-semibold">Update Details</Button>
                        )
                    }
                </form>
            </div>

        </div>
    )
}

export default CompanySetup