

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  FileText, 
  Users, 
  Calendar, 
  Shield, 
  ArrowRight,
  Settings,
  BarChart,
  Clock,
  CheckCircle,
  Award,
  Briefcase,
  Building,
  Target,
  BookOpen,
  Gavel,
  Star,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Play,
  Search
} from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: <FileText className="h-12 w-12" />,
      title: 'Financial Analysis',
      description: 'Comprehensive case tracking and management system with automated workflows for financial disputes',
      color: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border border-blue-200'
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: 'Long Experience',
      description: '15+ years of judicial management experience ensuring efficient court operations',
      color: 'bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 border border-emerald-200'
    },
    {
      icon: <Briefcase className="h-12 w-12" />,
      title: 'Success Cases',
      description: 'Over 10,000 cases successfully managed with 95% client satisfaction rate',
      color: 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 border border-purple-200'
    }
  ];

  const stats = [
    { value: '2,847', label: 'Total Cases', icon: <FileText className="h-6 w-6" />, color: 'text-blue-600' },
    { value: '48', label: "Active Today", icon: <Calendar className="h-6 w-6" />, color: 'text-emerald-600' },
    { value: '156', label: 'Pending Decisions', icon: <Clock className="h-6 w-6" />, color: 'text-amber-600' }
  ];

  const attorneys = [
    { name: 'Sarah Johnson', role: 'Chief Justice', experience: '15 Years', cases: '850+' },
    { name: 'Michael Chen', role: 'Senior Judge', experience: '12 Years', cases: '720+' },
    { name: 'Robert Wilson', role: 'Court Administrator', experience: '10 Years', cases: '600+' },
    { name: 'Emily Brown', role: 'Legal Advisor', experience: '8 Years', cases: '450+' }
  ];

  // Testimonials
  const testimonials = [
    {
      text: "DCFM has transformed our court operations. The automated scheduling alone has reduced case backlog by 40%.",
      author: "Justice Mark Thompson",
      position: "High Court Chief Justice"
    },
    {
      text: "The case management system is intuitive and efficient. Our team can now handle 30% more cases with the same resources.",
      author: "Lisa Rodriguez",
      position: "Court Administrator"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-blue-200">
                <Scale className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-700">DCFM</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-blue-700 font-semibold hover:text-blue-600 transition-colors border-b-2 border-blue-600 pb-1">
                Home
              </Link>
              <Link to="/cases" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
                Cases
              </Link>
              <a href="#" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
                Schedule
              </a>
              <a href="/Analytics" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
                Analytics
              </a>
              <a href="/Parties" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
                Parties
              </a>
              <a href="#" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
                Dashboard
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl">
                Admin Portal
              </button>
              <button className="lg:hidden">
                <svg className="h-6 w-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Lighter Colors */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Image with Lighter Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/6077123/pexels-photo-6077123.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
            alt="Legal office setting"
            className="w-full h-full object-cover"
          />
          {/* Much Lighter Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/60 via-blue-100/50 to-blue-200/60"></div>
          {/* Subtle gradient effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full filter blur-3xl opacity-40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-900 leading-tight mb-6">
                Trusted and Full Service Representation For Each Court
              </h1>
              <p className="text-xl text-blue-800 mb-8">
                Streamline judicial case management with automated categorization, prioritization, and scheduling for enhanced court efficiency.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/cases"
                  className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center group"
                >
                  First Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-8 py-3.5 border-2 border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Video
                </button>
              </div>
            </div>
            
            {/* Stats Card - Lighter Design */}
            <div className="relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
                <div className="space-y-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/70 rounded-xl border border-blue-50 hover:border-blue-100 transition-all hover:shadow-md">
                      <div>
                        <div className="text-sm font-medium text-blue-800">{stat.label}</div>
                        <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                      </div>
                      <div className="p-3 rounded-full bg-blue-50">
                        <div className={`${stat.color}`}>
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link 
                    to="/cases" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    View all case statistics
                  </Link>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-300 rounded-full opacity-30"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-cyan-300 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className={`p-8 rounded-2xl ${service.color} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
                <div className="mb-6">
                  <div className="p-3 rounded-xl bg-white shadow-sm inline-block">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  to={service.title === 'Financial Analysis' ? '/cases' : '#'}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 group"
                >
                  Learn More
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-800 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                <span className="font-semibold text-blue-700">Pursuit of justice for our clients</span>. Differentiated Case Flow Management (DCFM) is a comprehensive judicial management system designed to streamline court operations. Our system automates case categorization, prioritization, and scheduling to enhance court efficiency and ensure timely justice delivery.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center bg-white/70 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-3" />
                  <span className="text-gray-700">Automated case categorization and prioritization</span>
                </div>
                <div className="flex items-center bg-white/70 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-3" />
                  <span className="text-gray-700">Real-time scheduling and calendar management</span>
                </div>
                <div className="flex items-center bg-white/70 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-3" />
                  <span className="text-gray-700">Comprehensive party and document management</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/cases"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="px-6 py-3 border border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Side - Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '15+', label: 'Years Experience', color: 'bg-blue-100 text-blue-700' },
                { value: '10,000+', label: 'Cases Managed', color: 'bg-emerald-100 text-emerald-700' },
                { value: '95%', label: 'Success Rate', color: 'bg-purple-100 text-purple-700' },
                { value: '24/7', label: 'Support Available', color: 'bg-cyan-100 text-cyan-700' }
              ].map((stat, index) => (
                <div key={index} className={`p-6 rounded-xl ${stat.color} border border-transparent hover:border-white hover:shadow-lg transition-all`}>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-800 mb-4">Our Attorneys</h2>
            <p className="text-xl text-blue-600 max-w-3xl mx-auto">
              Meet our experienced judicial professionals dedicated to ensuring efficient court management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {attorneys.map((attorney, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-b from-white to-blue-50 rounded-2xl shadow-lg overflow-hidden border border-blue-100 group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 shadow-md">
                      {attorney.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{attorney.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{attorney.role}</p>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Award className="h-4 w-4 mr-2 text-blue-400" />
                        <span>{attorney.experience} Experience</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 text-blue-400" />
                        <span>{attorney.cases} Cases Handled</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <button className="w-full py-2 text-blue-600 font-medium hover:text-blue-700 text-sm">
                      View Profile →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-800 mb-4">What Our Users Say</h2>
            <p className="text-xl text-blue-600 max-w-3xl mx-auto">
              Hear from court administrators and legal professionals who trust DCFM
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-blue-600">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Lighter Blue */}
      <div className="py-20 bg-gradient-to-r from-blue-300 via-blue-200 to-cyan-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">
            Ready to Transform Your Court Operations?
          </h2>
          <p className="text-xl text-blue-800 mb-8">
            Join hundreds of courts using DCFM to streamline their case management and improve judicial efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cases"
              className="px-8 py-3.5 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              Start Managing Cases
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="px-8 py-3.5 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              Request Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">DCFM</span>
              </div>
              <p className="text-blue-200 mb-6">
                Differentiated Case Flow Management Software for modern courts.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="p-2 bg-blue-600/50 rounded-lg hover:bg-blue-500/50 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-blue-200 hover:text-white">Features</a></li>
                <li><Link to="/cases" className="text-blue-200 hover:text-white">Case Management</Link></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-blue-200 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-blue-200">
                  <Phone className="h-4 w-4 mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center text-blue-200">
                  <Mail className="h-4 w-4 mr-2" />
                  support@dcfm.gov
                </li>
                <li className="flex items-center text-blue-200">
                  <MapPin className="h-4 w-4 mr-2" />
                  123 Court Street, Judicial District
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-600 mt-8 pt-8 text-center text-blue-300">
            <p>&copy; {new Date().getFullYear()} DCFM System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;