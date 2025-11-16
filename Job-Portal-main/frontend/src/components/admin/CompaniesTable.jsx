import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Building2, Calendar } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    },[companies, searchCompanyByText]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption className="text-gray-500 py-4">
                    {filterCompany?.length === 0 ? 'No companies found' : 'A list of your registered companies'}
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-semibold text-gray-900">Company</TableHead>
                        <TableHead className="font-semibold text-gray-900">Date Registered</TableHead>
                        <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <motion.tr
                            key={company._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                            <TableCell>
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12 border-2 border-purple-100">
                                        {company.logo ? (
                                            <AvatarImage src={company.logo} alt={company.name} />
                                        ) : (
                                            <AvatarFallback className="bg-purple-100 text-purple-600">
                                                <Building2 className="h-6 w-6" />
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{company.name}</h3>
                                        <p className="text-sm text-gray-500">{company.location || 'Location not set'}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center text-gray-600">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {formatDate(company.createdAt)}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <div className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                                            <MoreHorizontal className="h-5 w-5 text-gray-600" />
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-2">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                            <span>Edit Company</span>
                                        </motion.button>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable