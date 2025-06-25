import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { 
  Users, 
  Award, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  
  TrendingUp,
  
  Heart,
  
  Star,
  
  GraduationCap,
  Building,
  Rocket,
  Code,
  Database,
  Smartphone,
  Cloud,
  Brain,
  Palette,
  Camera,
 
  BarChart3,
  Calendar,
  
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  
  X,
  Clock,
  Monitor
} from 'lucide-react';

const Home = () => {
  const [selectedService, setSelectedService] = useState(null);
const navigate = useNavigate();

  const heroFeatures = [
    {
      icon: Users,
      title: 'Global Community',
      description: 'Connect with 50,000+ professionals worldwide',
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Certified programs recognized by leading companies',
    },
    {
      icon: Rocket,
      title: 'Career Acceleration',
      description: '95% of members advance their careers within 12 months',
    },
  ];

  const services = [
    {
      icon: Code,
      title: 'Software Development',
      description: 'Full-stack development, mobile apps, and enterprise solutions',
      color: 'from-blue-500 to-cyan-500',
      detailedDescription: 'Our software development services encompass the entire development lifecycle, from initial concept to deployment and maintenance. We specialize in modern web technologies including React, Node.js, Python, and cloud-native architectures. Our team delivers scalable, secure, and high-performance applications tailored to your business needs.',
      keyServices: [
        'Full-Stack Web Development (React, Angular, Vue.js)',
        'Mobile App Development (React Native, Flutter)',
        'Enterprise Software Solutions',
        'API Development and Integration',
        'DevOps and CI/CD Implementation',
        'Code Review and Quality Assurance'
      ],
      technologies: ['JavaScript/TypeScript', 'Python', 'Java', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes']
    },
    {
      icon: Database,
      title: 'Data Analytics',
      description: 'Business intelligence, machine learning, and data visualization',
      color: 'from-purple-500 to-pink-500',
      detailedDescription: 'Transform your raw data into actionable insights with our comprehensive data analytics services. We help organizations make data-driven decisions through advanced analytics, machine learning models, and interactive dashboards that provide real-time business intelligence.',
      keyServices: [
        'Business Intelligence Dashboard Development',
        'Predictive Analytics and Machine Learning',
        'Data Warehouse Design and Implementation',
        'ETL Pipeline Development',
        'Statistical Analysis and Reporting',
        'Data Visualization and Storytelling'
      ],
      technologies: ['Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Apache Spark', 'TensorFlow', 'Pandas']
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'AWS, Azure, and Google Cloud infrastructure and migration',
      color: 'from-green-500 to-teal-500',
      detailedDescription: 'Accelerate your digital transformation with our comprehensive cloud solutions. We provide end-to-end cloud services including migration, architecture design, security implementation, and ongoing optimization to ensure your infrastructure is scalable, secure, and cost-effective.',
      keyServices: [
        'Cloud Migration and Modernization',
        'Infrastructure as Code (IaC)',
        'Serverless Architecture Design',
        'Container Orchestration (Kubernetes)',
        'Cloud Security and Compliance',
        'Cost Optimization and Monitoring'
      ],
      technologies: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Docker', 'Kubernetes', 'CloudFormation', 'Ansible']
    },
    {
      icon: Smartphone,
      title: 'Digital Transformation',
      description: 'Modernize your business with cutting-edge technology',
      color: 'from-orange-500 to-red-500',
      detailedDescription: 'Guide your organization through comprehensive digital transformation initiatives. We help businesses leverage technology to improve operations, enhance customer experiences, and create new revenue streams through strategic planning and implementation.',
      keyServices: [
        'Digital Strategy and Roadmap Development',
        'Process Automation and Optimization',
        'Legacy System Modernization',
        'Customer Experience Enhancement',
        'Digital Workplace Solutions',
        'Change Management and Training'
      ],
      technologies: ['RPA Tools', 'Salesforce', 'Microsoft 365', 'SharePoint', 'Power Platform', 'Workflow Automation']
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Intelligent automation and predictive analytics solutions',
      color: 'from-indigo-500 to-purple-500',
      detailedDescription: 'Harness the power of artificial intelligence to automate processes, gain insights, and create intelligent solutions. Our AI/ML services range from simple automation to complex deep learning models that can transform how your business operates.',
      keyServices: [
        'Custom Machine Learning Model Development',
        'Natural Language Processing (NLP)',
        'Computer Vision Solutions',
        'Intelligent Process Automation',
        'Chatbot and Virtual Assistant Development',
        'AI Strategy and Implementation'
      ],
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI GPT', 'Hugging Face', 'MLflow', 'Jupyter', 'CUDA']
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'User-centered design for web and mobile applications',
      color: 'from-pink-500 to-rose-500',
      detailedDescription: 'Create exceptional user experiences through research-driven design processes. Our UI/UX team combines aesthetic excellence with usability principles to deliver interfaces that are both beautiful and functional, ensuring high user satisfaction and engagement.',
      keyServices: [
        'User Research and Persona Development',
        'Information Architecture and Wireframing',
        'Visual Design and Prototyping',
        'Usability Testing and Optimization',
        'Design System Development',
        'Accessibility and Inclusive Design'
      ],
      technologies: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Principle', 'Framer', 'Miro', 'Hotjar']
    }
  ];

  const industries = [
    { name: 'Technology', icon: Code, count: '15,000+' },
    { name: 'Healthcare', icon: Heart, count: '8,500+' },
    { name: 'Finance', icon: BarChart3, count: '12,000+' },
    { name: 'Education', icon: GraduationCap, count: '6,200+' },
    { name: 'Manufacturing', icon: Building, count: '4,800+' },
    { name: 'Media & Entertainment', icon: Camera, count: '3,500+' }
  ];

  

  const stats = [
    { number: '50,000+', label: 'Global Members', icon: Users },
    { number: '120+', label: 'Countries', icon: Globe },
    { number: '1,500+', label: 'Events Annually', icon: Calendar },
    { number: '98%', label: 'Success Rate', icon: TrendingUp },
  ];

  const certificationPrograms = [
    {
      title: 'Professional Software Development',
      duration: '6 months',
      level: 'Intermediate to Advanced',
      skills: ['Full-Stack Development', 'DevOps', 'System Design', 'Project Management']
    },
    {
      title: 'Data Science & Analytics',
      duration: '4 months',
      level: 'Beginner to Advanced',
      skills: ['Python/R Programming', 'Machine Learning', 'Data Visualization', 'Statistical Analysis']
    },
    {
      title: 'Digital Marketing & Growth',
      duration: '3 months',
      level: 'All Levels',
      skills: ['SEO/SEM', 'Social Media Marketing', 'Content Strategy', 'Analytics']
    },
    {
      title: 'Leadership & Management',
      duration: '5 months',
      level: 'Mid to Senior Level',
      skills: ['Team Leadership', 'Strategic Planning', 'Change Management', 'Executive Communication']
    }
  ];

  const ServiceModal = ({ service, onClose }) => {
    if (!service) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Overview</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{service.detailedDescription}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Services</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {service.keyServices.map((keyService: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-sepnoty-teal mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{keyService}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Technologies & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate('/register')}
                  className="flex-1 bg-gradient-to-r from-sepnoty-blue to-sepnoty-purple text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Get Started
                </button>
                <Link
  to="/schedule-call"
  className="inline-flex items-center space-x-3 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-sepnoty-blue transition-all duration-300"
>
  <Phone className="w-5 h-5" />
  <span>Schedule a Call</span>
</Link>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sepnoty-blue/10 via-sepnoty-purple/10 to-sepnoty-teal/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-sepnoty-blue/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sepnoty-purple/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sepnoty-teal/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sepnoty-blue/10 to-sepnoty-purple/10 text-sepnoty-blue font-medium text-sm border border-sepnoty-blue/20">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 50,000+ Professionals Worldwide
              </span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Elevate Your{' '}
              <span className="gradient-text">
                Career
              </span>
              <br />
              with{' '}
              <span className="gradient-text">
                Sepnoty
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed">
              Join the world's most exclusive professional development platform. Connect with industry leaders, 
              master cutting-edge skills, and accelerate your career growth.
            </p>
            
            <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
              From software development to data science, from startup incubation to executive leadership - 
              we provide the tools, network, and opportunities you need to succeed.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Link to="/register" className="btn-primary group">
                <Rocket className="w-5 h-5 mr-2" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link to="/admin" className="btn-secondary group">
                <Monitor className="w-5 h-5 mr-2" />
                Admin Portal
              </Link>
            </motion.div>

            {/* Hero Features */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {heroFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="glass-effect p-6 rounded-2xl text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-sepnoty-blue to-sepnoty-purple rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Professionals Worldwide</h2>
            <p className="text-xl text-gray-600">Join a community that's making a real impact</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-sepnoty-blue to-sepnoty-purple rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Industry Breakdown */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-3xl border border-blue-100/50">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Members Across Industries</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-sepnoty-blue mx-auto mb-3" />
                    <div className="font-semibold text-gray-900 text-sm mb-1">{industry.name}</div>
                    <div className="text-sepnoty-blue font-bold text-xs">{industry.count}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Professional Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions to accelerate your business and career growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">{service.description}</p>
                  <button 
                    onClick={() => setSelectedService(service)}
                    className="text-white hover:text-gray-300 font-medium flex items-center group"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certification Programs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Certification Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-recognized certifications designed by experts and trusted by leading companies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {certificationPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl border border-gray-100 card-hover"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {program.duration}
                      </span>
                      <span className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        {program.level}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-sepnoty-blue to-sepnoty-purple rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Skills You'll Master:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {program.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-sepnoty-teal mr-2 flex-shrink-0" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Link 
                  to="/register"
                  className="w-full bg-gradient-to-r from-sepnoty-blue to-sepnoty-purple text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-center block"
                >
                  Enroll Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sepnoty-blue via-sepnoty-purple to-sepnoty-teal">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
            <div className="relative z-10 p-12">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Future?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join 50,000+ professionals who have accelerated their careers, built meaningful connections, 
                and achieved their goals through Sepnoty's comprehensive platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link
                  to="/register"
                  className="inline-flex items-center space-x-3 bg-white text-sepnoty-blue px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Users className="w-5 h-5" />
                  <span>Join Sepnoty Today</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link
  to="/schedule-call"
  className="inline-flex items-center space-x-3 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-sepnoty-blue transition-all duration-300"
>
  <Phone className="w-5 h-5" />
  <span>Schedule a Call</span>
</Link>

              </div>
              
              <div className="flex items-center justify-center space-x-8 text-sm opacity-80">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Free 30-day trial
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  No setup fees
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Mail className="w-8 h-8 mx-auto mb-4 text-sepnoty-teal" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300">deepthi.k@sepnoty.com</p>
            </div>
            <div>
              <Phone className="w-8 h-8 mx-auto mb-4 text-sepnoty-teal" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300">+91 8106***764</p>
            </div>
            <div>
              <ExternalLink className="w-8 h-8 mx-auto mb-4 text-sepnoty-teal" />
              <h3 className="text-lg font-semibold mb-2">Visit Website</h3>
              <a href="https://www.sepnoty.com" target="_blank" rel="noopener noreferrer" className="text-sepnoty-teal hover:text-sepnoty-teal/80 transition-colors">
                www.sepnoty.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </div>
  );
};

export default Home;