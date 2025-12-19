import React from 'react';
import { 
  Target, 
  Eye, 
  Users, 
  Code, 
  Database, 
  Server,
  GitBranch,
  Shield,
  Award,
  Mail,
  Linkedin,
  Github,
  Globe,
  Cpu,
  Layers
} from 'lucide-react';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Shivani Sharma",
      role: "Frontend Architect & UI/UX Lead",
      responsibilities: [
        "React.js Application Development",
        "Component Library Design",
        "User Interface & Experience",
        "Client-Side State Management",
        "Responsive Design Implementation"
      ],
      techStack: ["React.js", "Redux", "Tailwind CSS", "Material-UI", "Chart.js"],
      email: "shivani@justiceflow.com",
      linkedin: "https://linkedin.com/in/shivanics",
      github: "https://github.com/shivanidev"
    },
    {
      id: 2,
      name: "Jaskirat Kaur",
      role: "Backend Engineer & Database Specialist",
      responsibilities: [
        "Node.js REST API Development",
        "MongoDB Schema Design",
        "Authentication & Authorization",
        "API Integration & Middleware",
        "Performance Optimization"
      ],
      techStack: ["Node.js", "Express.js", "MongoDB", "JWT", "Socket.io"],
      email: "jaskirat@justiceflow.com",
      linkedin: "https://linkedin.com/in/jaskirat-dev",
      github: "https://github.com/jaskiratdb"
    },
    {
      id: 3,
      name: "Krish Raj",
      role: "Full-Stack Developer & DevOps Lead",
      responsibilities: [
        "System Architecture Design",
        "DevOps & Deployment Pipeline",
        "Full-Stack Integration",
        "Testing & Quality Assurance",
        "Project Management"
      ],
      techStack: ["Docker", "AWS", "CI/CD", "Jest", "Nginx"],
      email: "krish@justiceflow.com",
      linkedin: "https://linkedin.com/in/krishfullstack",
      github: "https://github.com/krishdevops"
    }
  ];

  const technologyStack = [
    {
      category: "Frontend",
      technologies: [
        { name: "React.js", description: "Component-based UI development" },
        { name: "Redux Toolkit", description: "State management" },
        { name: "React Router", description: "Navigation and routing" },
        { name: "Axios", description: "HTTP client for API calls" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework" }
      ],
      icon: <Code className="w-8 h-8" />
    },
    {
      category: "Backend",
      technologies: [
        { name: "Node.js", description: "JavaScript runtime environment" },
        { name: "Express.js", description: "Web application framework" },
        { name: "Mongoose", description: "MongoDB object modeling" },
        { name: "JWT", description: "Authentication tokens" },
        { name: "Bcrypt", description: "Password hashing" }
      ],
      icon: <Server className="w-8 h-8" />
    },
    {
      category: "Database",
      technologies: [
        { name: "MongoDB Atlas", description: "Cloud database service" },
        { name: "Mongoose ODM", description: "Schema modeling" },
        { name: "Redis", description: "Caching layer" },
        { name: "MongoDB Compass", description: "GUI for MongoDB" }
      ],
      icon: <Database className="w-8 h-8" />
    }
  ];

  const projectTimeline = [
    {
      phase: "Phase 1 - Planning & Design",
      duration: "2 Weeks",
      tasks: [
        "Requirements gathering",
        "System architecture design",
        "Database schema planning",
        "UI/UX wireframing"
      ],
      lead: "Krish Raj"
    },
    {
      phase: "Phase 2 - Frontend Development",
      duration: "3 Weeks",
      tasks: [
        "React component creation",
        "Redux store setup",
        "API integration",
        "Responsive design implementation"
      ],
      lead: "Shivani Sharma"
    },
    {
      phase: "Phase 3 - Backend Development",
      duration: "3 Weeks",
      tasks: [
        "REST API development",
        "Database modeling",
        "Authentication system",
        "File upload handling"
      ],
      lead: "Jaskirat Kaur"
    },
    {
      phase: "Phase 4 - Integration & Testing",
      duration: "2 Weeks",
      tasks: [
        "Full-stack integration",
        "Unit & integration testing",
        "Performance optimization",
        "Security audit"
      ],
      lead: "All Team Members"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About JusticeFlow DCFM
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              A Differentiated Case Flow Management System built with modern technology
              to revolutionize legal case management.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                <Code className="w-5 h-5" />
                <span>React.js Frontend</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                <Server className="w-5 h-5" />
                <span>Node.js Backend</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                <Database className="w-5 h-5" />
                <span>MongoDB Database</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 text-lg">
                  To transform judicial and administrative case management through 
                  intelligent, differentiated workflow technology that enhances 
                  access to justice, optimizes resource allocation, and builds public trust.
                </p>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-bold text-blue-800 mb-2">Core Objectives:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      Eliminate case backlog through intelligent routing
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      Reduce average case processing time by 60%
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      Provide real-time analytics for decision makers
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 text-lg">
                  To become the global standard for intelligent case management systems, 
                  empowering justice systems worldwide with data-driven insights and 
                  automated workflows that ensure timely and fair case resolution.
                </p>
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h4 className="font-bold text-purple-800 mb-2">Future Goals:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      Expand to 50+ countries within 5 years
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      Integrate AI-powered predictive analytics
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      Develop mobile applications for field officers
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm mb-6">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Development Team</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the talented developers behind JusticeFlow DCFM, built with 
              React, Node.js, and MongoDB
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-blue-600 font-medium">{member.role}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {member.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.techStack.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex justify-center space-x-4">
                      <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-blue-600">
                        <Mail className="w-5 h-5" />
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern MERN Stack implementation for scalable and maintainable application
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {technologyStack.map((stack, index) => (
              <div key={index} className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg p-8 border">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                  {stack.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{stack.category}</h3>
                <div className="space-y-4">
                  {stack.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-bold text-gray-800">{tech.name}</h4>
                      <p className="text-gray-600 text-sm">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Diagram */}
          <div className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">System Architecture</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                  <Code className="w-12 h-12 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-800">React Frontend</h4>
                <p className="text-sm text-gray-600">Client-side Application</p>
              </div>
              <div className="text-blue-600">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                  <Server className="w-12 h-12 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-800">Node.js Backend</h4>
                <p className="text-sm text-gray-600">Express REST API</p>
              </div>
              <div className="text-blue-600">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                  <Database className="w-12 h-12 text-yellow-600" />
                </div>
                <h4 className="font-bold text-gray-800">MongoDB Database</h4>
                <p className="text-sm text-gray-600">NoSQL Data Storage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Timeline Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Project Development Timeline</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              10-week development cycle with clear division of responsibilities
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>

            <div className="space-y-12">
              {projectTimeline.map((phase, index) => (
                <div key={index} className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-900"></div>
                  
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">{phase.phase}</h3>
                        <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                          {phase.duration}
                        </span>
                      </div>
                      <ul className="space-y-2 text-gray-300">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            {task}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <span className="text-blue-300">Lead: {phase.lead}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">JusticeFlow DCFM</div>
              <p className="text-gray-400">
                Differentiated Case Flow Management System built with React, Node.js, and MongoDB
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Development Team</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Shivani Sharma - Frontend Lead</li>
                <li>Jaskirat Kaur - Backend Specialist</li>
                <li>Krish Raj - Full-Stack & DevOps</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-800 rounded text-sm">React.js</span>
                <span className="px-3 py-1 bg-gray-800 rounded text-sm">Node.js</span>
                <span className="px-3 py-1 bg-gray-800 rounded text-sm">MongoDB</span>
                <span className="px-3 py-1 bg-gray-800 rounded text-sm">Express.js</span>
                <span className="px-3 py-1 bg-gray-800 rounded text-sm">Tailwind CSS</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2024 JusticeFlow DCFM. All rights reserved. Academic Project by Shivani Sharma, Jaskirat Kaur, Krish Raj</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;