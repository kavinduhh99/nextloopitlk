import { 
  Code2, 
  Search, 
  ShoppingCart, 
  Globe, 
  CreditCard, 
  Megaphone, 
  Cpu,
  Palette,
  Layers,
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
  X,
  MessageSquare,
  Send,
  Bot,
  User,
  Loader2,
  MinusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const services = [
  {
    title: "Web App Development",
    description: "Custom, scalable web applications built with modern frameworks for optimal performance and user experience.",
    icon: Code2,
    color: "text-blue-400"
  },
  {
    title: "SEO & Optimization",
    description: "Boost your search engine rankings and drive organic traffic with our data-driven optimization strategies.",
    icon: Search,
    color: "text-emerald-400"
  },
  {
    title: "E-commerce Solutions",
    description: "Robust online stores with seamless checkout experiences, inventory management, and secure payments.",
    icon: ShoppingCart,
    color: "text-purple-400"
  },
  {
    title: "Domain & Hosting",
    description: "Reliable, high-speed hosting and domain management to keep your business online 24/7.",
    icon: Globe,
    color: "text-orange-400"
  },
  {
    title: "Payment Integration",
    description: "Secure and flexible payment gateway integrations for global transactions and local preferences.",
    icon: CreditCard,
    color: "text-pink-400"
  },
  {
    title: "Digital Marketing",
    description: "Comprehensive marketing campaigns across social media, search, and email to grow your brand.",
    icon: Megaphone,
    color: "text-yellow-400"
  },
  {
    title: "AI Automation",
    description: "Streamline your workflows and enhance productivity with custom AI-powered automation tools.",
    icon: Cpu,
    color: "text-cyan-400"
  },
  {
    title: "Design",
    description: "User-centric UI/UX design that combines aesthetics with functionality for a memorable brand experience.",
    icon: Palette,
    color: "text-indigo-400"
  },
  {
    title: "Product Build",
    description: "End-to-end product development from concept to launch, ensuring quality and scalability at every step.",
    icon: Layers,
    color: "text-red-400"
  }
];

const projects = [
  {
    title: "shopx.lk",
    category: "Multi-Seller Platform",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    description: "A high-performance multi-vendor e-commerce marketplace built with Next.js for superior speed and SEO.",
    link: "https://shopx.lk"
  },
  {
    title: "CODShield",
    category: "eCommerce Risk Intelligence",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    description: "Advanced risk intelligence platform for e-commerce to detect and prevent fraudulent COD orders.",
    link: "https://codshield.vercel.app/"
  }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Code2 className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight">NextLoop<span className="text-blue-400">IT</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all">
            Get Started
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t-0 p-6 flex flex-col gap-4 md:hidden"
          >
            {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-lg font-medium text-slate-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="bg-blue-600 text-white px-5 py-3 rounded-xl text-center font-semibold">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-bold tracking-wider uppercase text-blue-400 mb-6">
            Launching • April 6, 2026
          </span>
          <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-tight mb-8 leading-[1.1]">
            Innovating Your Digital <br />
            <span className="text-gradient">Journey with NextLoop IT</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            We deliver cutting-edge technology solutions to help your business thrive in the digital age. From custom apps to AI automation, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group"
            >
              Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#services"
              className="w-full sm:w-auto glass hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all text-center"
            >
              View Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">Our Expertise</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Comprehensive IT services tailored to your business needs. We combine innovation with reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-3xl hover:bg-white/10 transition-all group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className={`w-6 h-6 ${service.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">Our Products</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore the digital products we've built from the ground up. We turn complex ideas into functional, scalable realities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[32px] glass p-4 block hover:bg-white/10 transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6 relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    Visit Site <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
              <div className="px-4 pb-4">
                <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">Why NextLoop IT?</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Founded on April 6, 2026, NextLoop IT is a forward-thinking technology partner dedicated to bridging the gap between complex challenges and elegant digital solutions.
              </p>
              <div className="space-y-4">
                {[
                  "Client-centric approach to every project",
                  "Expert team with deep industry knowledge",
                  "Cutting-edge tech stack for all solutions",
                  "Reliable support and maintenance"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-400 w-5 h-5 flex-shrink-0" />
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="aspect-square rounded-3xl glass p-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                  alt="Software Development" 
                  className="w-full h-full object-cover rounded-2xl opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl z-20 animate-bounce-slow">
                <div className="text-3xl font-bold text-blue-400">100%</div>
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Commitment</div>
              </div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] -z-10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web App Development',
    message: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', service: 'Web App Development', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-[40px] overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/3 bg-blue-600 p-12 text-white">
            <h2 className="text-3xl font-display font-bold mb-6">Let's Talk</h2>
            <p className="text-blue-100 mb-10">
              Ready to start your next project? Reach out to us and let's build something amazing together.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span>hello@nextloopit.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+94 78 892 0777</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>Sri Lanka</span>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 p-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-400">Service Interested In</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                >
                  <option>Web App Development</option>
                  <option>SEO & Optimization</option>
                  <option>AI Automation</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-400">Message</label>
                <textarea 
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" 
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="md:col-span-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              
              {status === 'success' && (
                <p className="md:col-span-2 text-emerald-400 text-sm font-medium">Message sent successfully! We'll get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="md:col-span-2 text-red-400 text-sm font-medium">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hi! I'm the NextLoop IT assistant. How can I help you with your digital journey today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'bot', text: "I'm sorry, the AI assistant is currently unavailable because the API key is not configured. Please add GEMINI_API_KEY to your environment variables." }]);
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: "You are a helpful AI assistant for NextLoop IT, a professional IT services company. Your goal is to provide information about the company's services (Web app development, SEO, E-commerce, Domain & Hosting, Payment Integration, Digital Marketing, AI automation, Design, Product Build). Be professional, concise, and encourage users to contact the team for specific projects. The company was founded on April 6, 2026. The website is nextloopit.com. Phone: +94 78 892 0777. Location: Sri Lanka.",
        }
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass w-[350px] sm:w-[400px] h-[500px] rounded-3xl overflow-hidden flex flex-col mb-4 shadow-2xl border-white/20"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">NextLoop Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-blue-100 uppercase font-bold tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <MinusCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                    <span className="text-xs text-slate-400 italic">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-slate-900/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-slate-800 rotate-90' : 'bg-blue-600 hover:scale-110'
        }`}
      >
        {isOpen ? <X className="text-white w-6 h-6" /> : <MessageSquare className="text-white w-6 h-6" />}
      </button>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded flex items-center justify-center">
              <Code2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight">NextLoop<span className="text-blue-400">IT</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="text-slate-400 hover:text-white transition-colors">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <p className="text-slate-500 text-sm">
            © 2026 NextLoop IT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}
