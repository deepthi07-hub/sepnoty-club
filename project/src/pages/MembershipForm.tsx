import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { CheckCircle, Loader2, Users, Code, Briefcase, Star, Award, Heart, Target, Calendar, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const membershipSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number is too long'),
  college: z.string().min(2, 'College name is required').max(100, 'College name is too long'),
  department: z.string().min(2, 'Department is required').max(50, 'Department name is too long'),
  year: z.string().min(1, 'Year is required'),
  skills: z.array(z.string()).min(1, 'Please select at least one skill area'),
  proficiencyLevel: z.string().min(1, 'Please select your proficiency level'),
  interestAreas: z.array(z.string()).min(1, 'Please select at least one area of interest'),
  whyJoin: z.string().min(20, 'Please tell us why you want to join (minimum 20 characters)'),
  goals: z.string().min(10, 'Please share your goals (minimum 10 characters)'),
  experience: z.string().optional(),
  availability: z.string().min(1, 'Please select your availability'),
  socialMedia: z.string().optional(),
  referral: z.string().optional(),
});

type MembershipFormData = z.infer<typeof membershipSchema>;

interface MembershipFormProps {
  onBack?: () => void;
}

const MembershipForm = ({ onBack }: MembershipFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<MembershipFormData>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      skills: [],
      interestAreas: [],
    },
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const skillCategories = [
    {
      category: 'Programming & Development',
      icon: <Code className="w-5 h-5" />,
      skills: ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Mobile Development', 'Web Development', 'Game Development']
    },
    {
      category: 'Design & Creative',
      icon: <Briefcase className="w-5 h-5" />,
      skills: ['UI/UX Design', 'Graphic Design', 'Video Editing', 'Photography', 'Content Creation', 'Animation', 'Digital Art']
    },
    {
      category: 'Data & Analytics',
      icon: <Star className="w-5 h-5" />,
      skills: ['Data Science', 'Machine Learning', 'Data Analysis', 'Statistics', 'Research', 'Excel/Sheets', 'Database Management']
    },
    {
      category: 'Business & Marketing',
      icon: <Target className="w-5 h-5" />,
      skills: ['Digital Marketing', 'Social Media Marketing', 'Content Marketing', 'SEO', 'Business Analysis', 'Project Management', 'Sales']
    },
    {
      category: 'Communication & Leadership',
      icon: <Users className="w-5 h-5" />,
      skills: ['Public Speaking', 'Writing', 'Team Leadership', 'Event Management', 'Teaching/Mentoring', 'Community Building']
    }
  ];

  const clubInterestAreas = [
    { value: 'workshops', label: 'Technical Workshops & Training', icon: '🎓' },
    { value: 'networking', label: 'Networking Events', icon: '🤝' },
    { value: 'projects', label: 'Collaborative Projects', icon: '💻' },
    { value: 'competitions', label: 'Hackathons & Competitions', icon: '🏆' },
    { value: 'mentorship', label: 'Mentorship Programs', icon: '👥' },
    { value: 'career', label: 'Career Development', icon: '📈' },
    { value: 'innovation', label: 'Innovation & Startups', icon: '💡' },
    { value: 'community', label: 'Community Service', icon: '❤️' },
    { value: 'research', label: 'Research & Development', icon: '🔬' },
    { value: 'social', label: 'Social Events & Fun Activities', icon: '🎉' }
  ];

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Just starting my journey, eager to learn' },
    { value: 'intermediate', label: 'Intermediate', description: 'Have some experience, looking to grow' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced and ready to contribute' },
    { value: 'expert', label: 'Expert', description: 'Skilled professional, ready to mentor others' }
  ];

  const availabilityOptions = [
    { value: 'low', label: '2-5 hours per week', description: 'Attend key events and activities' },
    { value: 'medium', label: '5-10 hours per week', description: 'Regular participation in club activities' },
    { value: 'high', label: '10+ hours per week', description: 'Active involvement and leadership roles' },
    { value: 'flexible', label: 'Flexible schedule', description: 'Availability varies by semester/projects' }
  ];

  const handleSkillToggle = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    
    setSelectedSkills(updatedSkills);
    setValue('skills', updatedSkills);
  };

  const handleInterestToggle = (interest: string) => {
    const updatedInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    
    setSelectedInterests(updatedInterests);
    setValue('interestAreas', updatedInterests);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Fallback: go back in browser history
      window.history.back();
    }
  };

  const onSubmit = async (data: MembershipFormData) => {
    setIsSubmitting(true);
    
    try {
      // Submit to backend API
      await axios.post('/api/club-membership', data);
      
      setIsSubmitted(true);
      toast.success('Club membership application submitted successfully!');
      reset();
      setSelectedSkills([]);
      setSelectedInterests([]);
      // Scroll to top after successful submission
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Toaster position="top-right" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Sepnoty Club!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for applying to join our community. We'll review your application and get back to you soon with next steps.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Submit Another Application
            </button>
            <button
              onClick={handleBack}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Toaster position="top-right" />
      <style jsx>{`
        .skill-tag {
          transition: all 0.2s ease-in-out;
        }
        .skill-tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .skill-tag.selected {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          transform: scale(1.05);
        }
        .interest-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .interest-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        .interest-card.selected {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border-color: transparent;
        }
        .proficiency-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .proficiency-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        .proficiency-card.selected {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border-color: transparent;
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Sepnoty Club</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Become part of our vibrant tech community! Connect with like-minded peers, learn new skills, 
            and grow together through workshops, projects, and networking events.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-600" />
                Personal Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year of Study <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('year')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Alumni">Alumni</option>
                  </select>
                  {errors.year && (
                    <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-blue-600" />
                Academic Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    College/Institution <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('college')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your college or institution"
                  />
                  {errors.college && (
                    <p className="mt-1 text-sm text-red-600">{errors.college.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department/Field <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('department')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., Computer Science, Business, etc."
                  />
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Skills & Interests Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Code className="w-6 h-6 mr-3 text-blue-600" />
                Skills & Expertise
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  What skills do you have or want to develop? <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-4">Select all that apply - this helps us match you with relevant activities and projects.</p>
                
                {skillCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      {category.icon}
                      <span className="ml-2">{category.category}</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className={`skill-tag px-4 py-2 rounded-full text-sm font-medium border-2 ${
                            selectedSkills.includes(skill)
                              ? 'selected border-transparent'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {errors.skills && (
                  <p className="mt-2 text-sm text-red-600">{errors.skills.message}</p>
                )}
              </div>

              {/* Proficiency Level */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Overall Skill Level <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {proficiencyLevels.map((level) => (
                    <label key={level.value} className="cursor-pointer">
                      <input
                        {...register('proficiencyLevel')}
                        type="radio"
                        value={level.value}
                        className="sr-only"
                      />
                      <div className="proficiency-card p-4 border-2 border-gray-200 rounded-xl">
                        <div className="font-semibold text-gray-900">{level.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{level.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.proficiencyLevel && (
                  <p className="mt-2 text-sm text-red-600">{errors.proficiencyLevel.message}</p>
                )}
              </div>
            </div>

            {/* Club Interests Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-blue-600" />
                Club Activities & Interests
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Which club activities interest you most? <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-4">Select all activities you'd like to participate in or learn more about.</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {clubInterestAreas.map((interest) => (
                    <button
                      key={interest.value}
                      type="button"
                      onClick={() => handleInterestToggle(interest.value)}
                      className={`interest-card p-4 border-2 border-gray-200 rounded-xl text-left ${
                        selectedInterests.includes(interest.value) ? 'selected' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{interest.icon}</span>
                        <span className="font-semibold">{interest.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                {errors.interestAreas && (
                  <p className="mt-2 text-sm text-red-600">{errors.interestAreas.message}</p>
                )}
              </div>
            </div>

            {/* Availability Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                Availability & Commitment
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  How much time can you dedicate to club activities? <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {availabilityOptions.map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        {...register('availability')}
                        type="radio"
                        value={option.value}
                        className="sr-only"
                      />
                      <div className="proficiency-card p-4 border-2 border-gray-200 rounded-xl">
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.availability && (
                  <p className="mt-2 text-sm text-red-600">{errors.availability.message}</p>
                )}
              </div>
            </div>

            {/* Motivation & Goals Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-blue-600" />
                Motivation & Goals
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Why do you want to join Sepnoty Club? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('whyJoin')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Share what motivates you to join our community, what you hope to gain, and how you'd like to contribute..."
                  />
                  {errors.whyJoin && (
                    <p className="mt-1 text-sm text-red-600">{errors.whyJoin.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What are your goals for this academic year? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('goals')}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your personal, academic, or career goals that our club can help you achieve..."
                  />
                  {errors.goals && (
                    <p className="mt-1 text-sm text-red-600">{errors.goals.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Previous Experience & Projects (Optional)
                  </label>
                  <textarea
                    {...register('experience')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Share any relevant projects, internships, competitions, or experiences you've had..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Social Media/Portfolio Links (Optional)
                  </label>
                  <input
                    {...register('socialMedia')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="LinkedIn, GitHub, Portfolio, or other relevant links"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    How did you hear about Sepnoty Club? (Optional)
                  </label>
                  <input
                    {...register('referral')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Friend, social media, college event, etc."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <span>Join Sepnoty Club</span>
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-3">
                By submitting this form, you agree to be part of our community and follow club guidelines
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MembershipForm;