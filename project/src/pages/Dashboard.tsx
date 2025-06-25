import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { 
  Users, 
  Download, 
  Calendar, 
  Mail, 
  Phone, 
  GraduationCap,
  Search,
  Filter,
  RefreshCw,
  Eye
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface MembershipData {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  interestArea: string;
  whyJoin: string;
  experience?: string;
  expectations?: string;
  submittedAt: string;
}

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<MembershipData | null>(null);
  const [filterYear, setFilterYear] = useState('');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Fetch membership data
  const { data: memberships = [], isLoading, refetch } = useQuery<MembershipData[]>({
    queryKey: ['memberships'],
    queryFn: async () => {
      const response = await axios.get('/api/memberships');
      return response.data;
    },
  });

  // Filter memberships based on search and year filter
  const filteredMemberships = memberships.filter(membership => {
    const matchesSearch = 
      membership.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.college.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = !filterYear || membership.year === filterYear;
    
    return matchesSearch && matchesYear;
  });

  // Export to CSV
  const handleExport = async () => {
    try {
      const response = await axios.get('/api/memberships/export', {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sepnoty-memberships-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Data exported successfully!');
    } catch (error) {
      toast.error('Export failed. Please try again.');
    }
  };

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Professional'];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-xl text-gray-600">Manage Sepnoty membership applications</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={() => refetch()}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 bg-accent-600 text-white px-6 py-2 rounded-lg hover:bg-accent-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{memberships.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {memberships.filter(m => 
                      new Date(m.submittedAt).getMonth() === new Date().getMonth()
                    ).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Students</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {memberships.filter(m => 
                      !m.year.includes('Professional')
                    ).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email, or college..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="sm:w-48">
              <div className="relative">
                <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
          ) : filteredMemberships.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Education
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMemberships.map((membership, index) => (
                    <motion.tr
                      key={membership.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{membership.name}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {membership.email}
                          </p>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{membership.college}</p>
                          <p className="text-sm text-gray-500">{membership.department} • {membership.year}</p>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {membership.phone}
                        </p>
                      </td>
                      
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500">
                          {new Date(membership.submittedAt).toLocaleDateString()}
                        </p>
                      </td>
                      
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedEntry(membership)}
                          className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Modal for viewing details */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Name</h3>
                    <p className="text-gray-900">{selectedEntry.name}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Email</h3>
                    <p className="text-gray-900">{selectedEntry.email}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Phone</h3>
                    <p className="text-gray-900">{selectedEntry.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Year</h3>
                    <p className="text-gray-900">{selectedEntry.year}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">College</h3>
                    <p className="text-gray-900">{selectedEntry.college}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Department</h3>
                    <p className="text-gray-900">{selectedEntry.department}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Areas of Interest</h3>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-xl">{selectedEntry.interestArea}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Why Join Sepnoty?</h3>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-xl">{selectedEntry.whyJoin}</p>
                </div>
                
                {selectedEntry.experience && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Previous Experience</h3>
                    <p className="text-gray-900 bg-gray-50 p-4 rounded-xl">{selectedEntry.experience}</p>
                  </div>
                )}
                
                {selectedEntry.expectations && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Expectations</h3>
                    <p className="text-gray-900 bg-gray-50 p-4 rounded-xl">{selectedEntry.expectations}</p>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    Submitted on {new Date(selectedEntry.submittedAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;