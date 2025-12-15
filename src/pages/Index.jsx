import { Scale, Clock, Users, FileText, ArrowRight, CheckCircle, BarChart3, Shield, Zap } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Scale,
      title: "Smart Case Categorization",
      description: "Automatically classify cases based on complexity, urgency, and type for optimal resource allocation."
    },
    {
      icon: Clock,
      title: "Priority Scheduling",
      description: "Intelligent scheduling system that prioritizes cases based on deadlines and judicial availability."
    },
    {
      icon: Users,
      title: "Workload Distribution",
      description: "Evenly distribute cases among judges and staff to prevent bottlenecks and backlogs."
    },
    {
      icon: FileText,
      title: "Automated Documentation",
      description: "Generate case reports, notices, and schedules automatically with built-in templates."
    }
  ];

  const steps = [
    { number: "01", title: "Case Registration", description: "New cases are registered with all relevant details and documents." },
    { number: "02", title: "Classification", description: "DCFM algorithm categorizes cases into tracks based on complexity." },
    { number: "03", title: "Scheduling", description: "Cases are automatically scheduled based on priority and availability." },
    { number: "04", title: "Tracking", description: "Real-time monitoring and updates throughout the case lifecycle." }
  ];

  const stats = [
    { value: "40%", label: "Faster Case Resolution" },
    { value: "60%", label: "Reduced Backlog" },
    { value: "85%", label: "Scheduling Accuracy" },
    { value: "3x", label: "Efficiency Improvement" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-width flex items-center justify-between py-4 px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Scale className="w-8 h-8 text-primary" />
            <span className="font-serif text-xl font-semibold text-foreground">DCFM</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#impact" className="text-muted-foreground hover:text-foreground transition-colors">Impact</a>
          </div>
          <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center pt-20">
        <div className="container-width px-4 md:px-8">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-primary-foreground/90 text-sm font-medium">Judicial Innovation</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Streamlining Justice Through{" "}
              <span className="text-gradient">Differentiated Case Flow Management</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-8 max-w-2xl">
              Transform manual case listing and management in courts. Our DCFM software automates categorization, prioritization, and scheduling for a faster, more efficient judicial process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 bg-gold text-gold-foreground px-8 py-4 rounded-md font-semibold hover:opacity-90 transition-opacity">
                Request Demo
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-md font-semibold hover:bg-primary-foreground/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="section-padding bg-secondary">
        <div className="container-width">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                The Challenge in Today's Courts
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Manual case listing and management in courts often leads to delays, inefficiencies, and backlog due to the lack of a structured workflow. Cases pile up, deadlines are missed, and justice is delayed.
              </p>
              <ul className="space-y-4">
                {["Unstructured case workflows", "Inconsistent prioritization", "Manual scheduling errors", "Resource allocation issues"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">Our Solution</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                DCFM software brings structure to chaos. By categorizing cases into different tracks based on complexity and urgency, we ensure optimal resource utilization and faster resolutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive tools designed specifically for judicial case management
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border card-hover">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section-padding bg-primary text-primary-foreground">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              How DCFM Works
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              A streamlined four-step process for efficient case management
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-serif font-bold text-primary-foreground/10 mb-4">
                  {step.number}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {step.description}
                </p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-primary-foreground/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="impact" className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Measurable Impact
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real results from courts implementing DCFM solutions
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-5xl md:text-6xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-width">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Court's Efficiency?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Join courts worldwide in modernizing case management with our DCFM software solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 bg-gold text-gold-foreground px-8 py-4 rounded-md font-semibold hover:opacity-90 transition-opacity">
                Schedule a Demo
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-md font-semibold hover:bg-primary-foreground/10 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4 md:px-8">
        <div className="container-width">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6" />
              <span className="font-serif text-lg font-semibold">DCFM Software</span>
            </div>
            <p className="text-background/60 text-sm">
              Development of Software for Streamlining Case Listing
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">Privacy</a>
              <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">Terms</a>
              <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
