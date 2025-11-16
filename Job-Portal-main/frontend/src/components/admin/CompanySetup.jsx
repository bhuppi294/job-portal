import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileText } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { motion } from 'framer-motion'

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
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('File size should be less than 5MB');
                return;
            }
            setInput({ ...input, file });
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.name.trim()) {
            toast.error('Company name is required');
            return;
        }

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
            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
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
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Button
                        onClick={() => navigate("/admin/companies")}
                        variant="ghost"
                        className="mb-4 hover:bg-gray-100"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Companies
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Setup</h1>
                    <p className="text-gray-600">Complete your company profile to attract the best talent</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onSubmit={submitHandler}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100"
                >
                    <div className="space-y-6">
                        <div className="flex items-center justify-center mb-8">
                            <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center">
                                <Building2 className="w-10 h-10 text-purple-600" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-gray-700 font-medium">Company Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    placeholder="Enter company name"
                                    className="bg-white/50 border-gray-200 focus:border-purple-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-700 font-medium">Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        placeholder="Enter company location"
                                        className="pl-10 bg-white/50 border-gray-200 focus:border-purple-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-700 font-medium">Website</Label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        type="url"
                                        name="website"
                                        value={input.website}
                                        onChange={changeEventHandler}
                                        placeholder="https://company.com"
                                        className="pl-10 bg-white/50 border-gray-200 focus:border-purple-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-700 font-medium">Company Logo</Label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="pl-10 bg-white/50 border-gray-200 focus:border-purple-500"
                                    />
                                </div>
                                <p className="text-sm text-gray-500">Max file size: 5MB</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-gray-700 font-medium">Description</Label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Tell us about your company..."
                                className="w-full h-32 px-4 py-2 bg-white/50 border border-gray-200 rounded-md focus:outline-none focus:border-purple-500 resize-none"
                            />
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/admin/companies")}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    )
}

export default CompanySetup