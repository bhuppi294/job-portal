import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { motion } from 'framer-motion'
import { Building2, ArrowLeft } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Please enter a company name');
            return;
        }

        try {
            setIsLoading(true);
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Company</h1>
                    <p className="text-gray-600">Set up your company profile to start posting jobs</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100"
                >
                    <div className="space-y-6">
                        <div className="flex items-center justify-center mb-8">
                            <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center">
                                <Building2 className="w-10 h-10 text-purple-600" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-gray-700 font-medium">Company Name</Label>
                            <Input
                                type="text"
                                placeholder="Enter your company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full bg-white/50 border-gray-200 focus:border-purple-500"
                            />
                            <p className="text-sm text-gray-500">
                                This will be your company's display name. You can change it later.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button
                                variant="outline"
                                onClick={() => navigate("/admin/companies")}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={registerNewCompany}
                                disabled={isLoading || !companyName.trim()}
                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                {isLoading ? 'Creating...' : 'Create Company'}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CompanyCreate