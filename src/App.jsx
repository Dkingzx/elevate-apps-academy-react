/* Elevate Apps Academy — React/Vite application
 * Original UI preserved; this file is now compiled by Vite instead of Babel in the browser.
 */
import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import logo from './assets/Elogo.png';

    // Helper for rendering Lucide icons dynamically in React
    const Icon = ({ name, className = "w-5 h-5", ...props }) => {
      const iconRef = React.useRef(null);
      useEffect(() => {
        if (iconRef.current) {
          iconRef.current.innerHTML = `<i data-lucide="${name}" class="${className}"></i>`;
          if (window.lucide) {
            window.lucide.createIcons({
              attrs: { class: className },
              nameAttr: 'data-lucide'
            });
          }
        }
      }, [name, className]);
      return <span ref={iconRef} className="inline-flex items-center justify-center" {...props} />;
    };

    function App() {
      const [selectedCategory, setSelectedCategory] = useState('All');
      const [counselingModalOpen, setCounselingModalOpen] = useState(false);
      const [selectedCourseForCounseling, setSelectedCourseForCounseling] = useState('');
      const [activeCourseModal, setActiveCourseModal] = useState(null);
      const [speedDialOpen, setSpeedDialOpen] = useState(false);
      const [getInTouchHovered, setGetInTouchHovered] = useState(false);
      const [counselingSubmitted, setCounselingSubmitted] = useState(false);
      const [zipping, setZipping] = useState(false);

      const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        program: 'Full Stack Web Development',
        mode: 'Classroom Training'
      });

      const courses = [
        {
          id: 'fullstack',
          title: 'Full Stack Web Development',
          badge: 'Most Popular Track',
          category: 'Job-Oriented',
          duration: '16 Weeks',
          hours: '180+ Hrs Live',
          shortDesc: 'Master MERN Stack (MongoDB, Express, React, Node) with real-world enterprise projects, system design, and deployment pipelines.',
          accentText: 'text-blue-600',
          accentBg: 'bg-blue-50',
          accentBorder: 'border-blue-200',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
          tools: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Tailwind', 'Git'],
          syllabus: [
            'Module 1: HTML5, CSS3, Modern JS (ES6+) & Responsive Web Systems',
            'Module 2: React Core, State Management (Redux Toolkit) & Hooks',
            'Module 3: Server Architecture with Node.js, Express & REST APIs',
            'Module 4: MongoDB Database Design, Aggregations & Security',
            'Module 5: DevOps, Docker Fundamentals, CI/CD & Vercel/AWS Deployment'
          ]
        },
        {
          id: 'mobile',
          title: 'Mobile App Development',
          badge: 'High Demand',
          category: 'Career Track',
          duration: '14 Weeks',
          hours: '150+ Hrs Live',
          shortDesc: 'Build cross-platform iOS & Android mobile apps using React Native and Flutter with offline storage, camera, and push engines.',
          accentText: 'text-emerald-600',
          accentBg: 'bg-emerald-50',
          accentBorder: 'border-emerald-200',
          image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
          tools: ['React Native', 'Flutter', 'Firebase', 'Redux', 'App Store Deploy'],
          syllabus: [
            'Module 1: Cross-Platform Mobile Fundamentals & UI Layouts',
            'Module 2: React Native Components, Navigation & Animations',
            'Module 3: Native Device API Access (Camera, GPS, Biometrics)',
            'Module 4: Backend Sync, Firebase & Real-time Push Notifications',
            'Module 5: App Store & Google Play Publishing Workflow'
          ]
        },
        {
          id: 'uiux',
          title: 'UI/UX Design & Product Strategy',
          badge: 'Creative Track',
          category: 'Creative',
          duration: '12 Weeks',
          hours: '120+ Hrs Live',
          shortDesc: 'Design intuitive, high-converting digital product interfaces. Master Figma wireframing, design systems, and usability testing.',
          accentText: 'text-purple-600',
          accentBg: 'bg-purple-50',
          accentBorder: 'border-purple-200',
          image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
          tools: ['Figma', 'Adobe XD', 'Prototyping', 'Design Systems', 'Usability Hub'],
          syllabus: [
            'Module 1: UX Research, User Personas & Empathy Mapping',
            'Module 2: Wireframing, Information Architecture & User Flows',
            'Module 3: Design Systems, Auto-Layout & UI Components in Figma',
            'Module 4: Interactive Micro-Animations & High-Fidelity Prototypes',
            'Module 5: Usability Testing, Developer Hand-off & Portfolio Building'
          ]
        },
        {
          id: 'automation',
          title: 'Software Automation Testing',
          badge: 'Industry Essential',
          category: 'Job-Oriented',
          duration: '12 Weeks',
          hours: '130+ Hrs Live',
          shortDesc: 'Ensure enterprise software reliability with Selenium, Playwright, Cypress, REST Assured, and CI/CD test automation.',
          accentText: 'text-amber-600',
          accentBg: 'bg-amber-50',
          accentBorder: 'border-amber-200',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
          tools: ['Selenium', 'Playwright', 'Java/JS', 'TestNG', 'Postman', 'Jenkins'],
          syllabus: [
            'Module 1: Manual QA Methodology, Test Cases & Bug Lifecycle',
            'Module 2: Java/JavaScript Foundations for QA Automation',
            'Module 3: Selenium WebDriver Framework Design & Page Object Model',
            'Module 4: API Automation Testing with Postman & REST Assured',
            'Module 5: Continuous Integration with Jenkins & GitHub Actions'
          ]
        },
        {
          id: 'marketing',
          title: 'Digital Marketing & Growth',
          badge: 'Performance Growth',
          category: 'Industry-Focused',
          duration: '10 Weeks',
          hours: '100+ Hrs Live',
          shortDesc: 'Drive real revenue with Meta Ads, Google Performance Max, SEO strategies, GA4 analytics, and growth conversion funnels.',
          accentText: 'text-rose-600',
          accentBg: 'bg-rose-50',
          accentBorder: 'border-rose-200',
          image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
          tools: ['Google Ads', 'Meta Ads Manager', 'SEO', 'GA4 Analytics', 'HubSpot'],
          syllabus: [
            'Module 1: Search Engine Optimization (Technical, On-Page, Off-Page)',
            'Module 2: Google PPC & Performance Max Search Campaigns',
            'Module 3: Meta (Facebook/Instagram) Paid Ad Funnels',
            'Module 4: GA4 Event Tracking, Data Dashboards & Attribution',
            'Module 5: Conversion Rate Optimization (CRO) & Email Funnels'
          ]
        },
        {
          id: 'datascience',
          title: 'Data Science & AI Foundations',
          badge: 'Future Tech',
          category: 'Career Track',
          duration: '16 Weeks',
          hours: '160+ Hrs Live',
          shortDesc: 'Learn Python, SQL, exploratory data analysis, machine learning algorithms, and real-world AI prompt engineering.',
          accentText: 'text-cyan-600',
          accentBg: 'bg-cyan-50',
          accentBorder: 'border-cyan-200',
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
          tools: ['Python', 'Pandas', 'Scikit-Learn', 'SQL', 'Tableau', 'PowerBI'],
          syllabus: [
            'Module 1: Python Programming for Data Science & Pandas Analysis',
            'Module 2: Advanced SQL Queries & Relational Data Engineering',
            'Module 3: Statistics, Machine Learning (Regression, Classification)',
            'Module 4: Data Visualization with Tableau & PowerBI Dashboards',
            'Module 5: Practical Generative AI, LLM Fine-Tuning & Prompt Design'
          ]
        },
        {
          id: 'network',
          title: 'Network & Cloud Infrastructure',
          badge: 'Enterprise Infrastructure',
          category: 'Industry-Focused',
          duration: '12 Weeks',
          hours: '120+ Hrs Live',
          shortDesc: 'Understand modern enterprise networking, routing protocols, Linux administration, and foundational AWS Cloud deployment.',
          accentText: 'text-indigo-600',
          accentBg: 'bg-indigo-50',
          accentBorder: 'border-indigo-200',
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
          tools: ['Cisco CCNA', 'AWS Cloud', 'Linux CLI', 'Subnetting', 'Wireshark'],
          syllabus: [
            'Module 1: IPv4/IPv6 Addressing, Subnetting & OSI Layer Models',
            'Module 2: Router & Switch Configuration (VLANs, OSPF, STP)',
            'Module 3: Linux Server System Administration & Shell Scripting',
            'Module 4: AWS Cloud Architecture (EC2, S3, VPC, IAM)',
            'Module 5: Network Security Hardening, Firewalls & VPN Setup'
          ]
        }
      ];

      const filteredCourses = selectedCategory === 'All'
        ? courses
        : courses.filter(c => c.category === selectedCategory);

      const handleFormSubmit = (e) => {
        e.preventDefault();
        setCounselingSubmitted(true);
        setTimeout(() => {
          setCounselingSubmitted(false);
          setCounselingModalOpen(false);
        }, 2500);
      };

      // Function to generate and download ZIP file directly
      const downloadProjectZip = async () => {
        setZipping(true);
        try {
          const zip = new JSZip();

          // Package files inside zip
          zip.file("index.html", document.documentElement.outerHTML);
          
          zip.file("README.md", `# Elevate Apps Academy - Next-Gen IT Career Portal\n\nThis is the complete source code for Elevate Apps Academy portal.\n\n## How to run:\nSimply open \`index.html\` in any web browser!`);

          zip.file("package.json", JSON.stringify({
            name: "elevate-apps-academy",
            version: "1.0.0",
            private: true,
            scripts: {
              start: "npx serve ."
            }
          }, null, 2));

          const content = await zip.generateAsync({ type: "blob" });
          saveAs(content, "Elevate_Apps_Academy_Source.zip");
        } catch (err) {
          alert("Could not create ZIP. You can save this HTML page directly!");
        } finally {
          setZipping(false);
        }
      };

      return (
        <div className="min-h-screen flex flex-col">
          
          {/* TOP ANNOUNCEMENT BAR */}
          <div className="bg-slate-900 text-slate-200 px-4 py-2 text-xs font-medium flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>New 2026 Practical Cohorts Open • White Town, Pondicherry</span>
            </div>

            <div className="flex items-center gap-4">
              <a href="tel:+918122005234" className="hover:text-cyan-400 transition-colors">
                Hotline: +91 81220 05234
              </a>
            </div>
          </div>

          {/* HEADER & NAVBAR */}
          <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              
              {/* Brand Logo */}
             <img
  src={logo}
  alt="Elevate Apps Academy"
  className="site-logo"
/>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
                <a href="#courses" className="hover:text-blue-600 transition-colors">Career Tracks</a>
                <a href="#methodology" className="hover:text-blue-600 transition-colors">Learning Model</a>
                <a href="#contact" className="hover:text-blue-600 transition-colors">Contact Academy</a>
              </nav>

              {/* Morphing CTA Button */}
              <div className="flex items-center gap-4">
                <div 
                  className="relative cursor-pointer"
                  onMouseEnter={() => setGetInTouchHovered(true)}
                  onMouseLeave={() => setGetInTouchHovered(false)}
                  onClick={() => { setSelectedCourseForCounseling('General Enquiry'); setCounselingModalOpen(true); }}
                >
                  <div className={`px-6 py-2.5 rounded-full transition-all duration-300 font-bold text-sm flex items-center gap-2.5 shadow-md ${
                    getInTouchHovered 
                      ? 'bg-lime-400 text-slate-950 shadow-lime-400/30 scale-105' 
                      : 'bg-slate-900 text-white shadow-slate-900/20'
                  }`}>
                    <span>{getInTouchHovered ? "Don't be shy" : "Get in touch"}</span>
                    {getInTouchHovered ? (
                      <div className="w-6 h-6 rounded-full bg-slate-950 text-lime-400 flex items-center justify-center font-bold text-xs">
                        →
                      </div>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
                    )}
                  </div>

                  {getInTouchHovered && (
                    <div className="absolute -bottom-10 right-0 bg-white border border-slate-200 rounded-2xl px-3 py-1 shadow-lg text-xs font-bold text-slate-800 flex items-center gap-2 animate-bounce">
                      <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-[10px]">
                        👋
                      </div>
                      <span>Hi! Talk to a Mentor</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </header>

          {/* HERO SECTION WITH ANIMATED GRID MATRIX */}
          <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Copy Column */}
                <div className="lg:col-span-6 flex flex-col items-start">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-extrabold uppercase tracking-widest mb-6">
                    <Icon name="sparkles" className="w-3.5 h-3.5 text-blue-600" />
                    <span>100% Practical Tech Education</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12] tracking-tight font-serif">
                    Launch Your Tech Career with <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">Real Skills.</span>
                  </h1>

                  <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                    Elevate Apps Academy provides industry-oriented, hands-on training in Full Stack Development, Mobile Apps, UI/UX Design, and QA. Bridge the gap between learning and real enterprise software jobs.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4 items-center">
                    <button 
                      onClick={() => { setSelectedCourseForCounseling('Hero Section'); setCounselingModalOpen(true); }}
                      className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2.5 cursor-pointer"
                    >
                      <span>Book Free Counseling</span>
                      <Icon name="arrow-right" className="w-4 h-4" />
                    </button>

                    <a 
                      href="#courses"
                      className="px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-extrabold text-sm transition-all shadow-sm flex items-center gap-2"
                    >
                      <Icon name="book-open" className="w-4 h-4 text-blue-600" />
                      <span>Explore 7 Programs</span>
                    </a>
                  </div>

                  {/* HIGH-TECH ANIMATED GRID MATRIX BOX */}
                  <div className="mt-10 w-full max-w-xl relative rounded-3xl bg-slate-900 text-white p-6 border border-slate-800 shadow-2xl overflow-hidden group">
                    
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-60 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-grid-scan-h pointer-events-none" />
                    <div className="absolute top-0 left-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent animate-grid-scan-v pointer-events-none" />

                    <div className="absolute top-2 left-3 font-mono text-[10px] text-cyan-400/80 font-extrabold">+</div>
                    <div className="absolute top-2 right-3 font-mono text-[10px] text-cyan-400/80 font-extrabold">+</div>
                    <div className="absolute bottom-2 left-3 font-mono text-[10px] text-cyan-400/80 font-extrabold">+</div>
                    <div className="absolute bottom-2 right-3 font-mono text-[10px] text-cyan-400/80 font-extrabold">+</div>

                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                          <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                            LIVE ACADEMY MATRIX
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          2026 ACTIVE LABS
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-1">
                        <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
                          <div className="flex items-center justify-between mb-1.5">
                            <Icon name="code" className="w-4 h-4 text-cyan-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          </div>
                          <p className="text-[11px] font-bold text-slate-200">MERN Stack</p>
                          <p className="text-[9px] text-slate-400 font-mono mt-0.5">Enterprise</p>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-emerald-400 transition-all duration-300 hover:scale-105">
                          <div className="flex items-center justify-between mb-1.5">
                            <Icon name="laptop" className="w-4 h-4 text-emerald-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          </div>
                          <p className="text-[11px] font-bold text-slate-200">Mobile Native</p>
                          <p className="text-[9px] text-slate-400 font-mono mt-0.5">iOS/Android</p>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-purple-400 transition-all duration-300 hover:scale-105">
                          <div className="flex items-center justify-between mb-1.5">
                            <Icon name="layers" className="w-4 h-4 text-purple-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                          </div>
                          <p className="text-[11px] font-bold text-slate-200">UI/UX Figma</p>
                          <p className="text-[9px] text-slate-400 font-mono mt-0.5">Design System</p>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-amber-400 transition-all duration-300 hover:scale-105">
                          <div className="flex items-center justify-between mb-1.5">
                            <Icon name="shield" className="w-4 h-4 text-amber-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          </div>
                          <p className="text-[11px] font-bold text-slate-200">QA Automation</p>
                          <p className="text-[9px] text-slate-400 font-mono mt-0.5">Playwright</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800 text-center">
                        <div>
                          <p className="text-xl font-extrabold text-white font-mono">100%</p>
                          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Practical Labs</p>
                        </div>
                        <div>
                          <p className="text-xl font-extrabold text-cyan-400 font-mono">1-on-1</p>
                          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Code Mentors</p>
                        </div>
                        <div>
                          <p className="text-xl font-extrabold text-emerald-400 font-mono">7 Tracks</p>
                          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Future Ready</p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Right Human Visual Column */}
                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white p-2">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" 
                      alt="Students studying in practical tech lab" 
                      className="w-full h-[380px] sm:h-[420px] object-cover rounded-2xl"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent rounded-2xl" />

                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                      <div>
                        <p className="text-xs font-extrabold text-slate-900">Live Classroom & Labs</p>
                        <p className="text-[10px] font-bold text-slate-500">Pondicherry Academy Hub</p>
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-[10px] font-extrabold uppercase tracking-widest">
                        Real Classroom & Lab Sessions
                      </span>
                      <h3 className="text-lg font-bold font-serif mt-2">
                        Collaborative Study Environments with Active Software Engineers
                      </h3>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3.5 max-w-xs animate-float-slow hidden sm:flex">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Icon name="award" className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">Industry Certification</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Portfolio output & placement support</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* COURSES SECTION - ANIMATED LEFT-TO-RIGHT GRID */}
          <section id="courses" className="py-20 lg:py-28 bg-white border-t border-slate-200/80 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-80" />
            <div className="absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent animate-grid-scan-h pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-3">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span>Industry-Oriented Programs</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
                  Choose Your Career Path
                </h2>
                <p className="text-slate-600 mt-3 text-sm sm:text-base">
                  Explore our career tracks moving in a live interactive grid. Hover over any course to pause and inspect details.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {['All', 'Job-Oriented', 'Creative', 'Industry-Focused', 'Career Track'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat === 'All' ? 'All 7 Programs' : cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Moving Grid Track (Left to Right Marquee) */}
            <div className="w-full overflow-hidden py-4 relative z-10">
              <div className="animate-scroll-ltr flex gap-6 px-4">
                {[...filteredCourses, ...filteredCourses].map((course, idx) => (
                  <div 
                    key={`${course.id}-${idx}`}
                    className="w-[340px] sm:w-[380px] shrink-0 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-2xl flex flex-col justify-between group overflow-hidden"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        
                        <div className="absolute top-4 left-4">
                          <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full ${course.accentBg} ${course.accentText} border ${course.accentBorder}`}>
                            {course.badge}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                          <span className="text-xs font-extrabold flex items-center gap-1">
                            <Icon name="clock" className="w-3.5 h-3.5 text-cyan-400" />
                            {course.duration}
                          </span>
                          <span className="text-xs font-extrabold flex items-center gap-1">
                            <Icon name="zap" className="w-3.5 h-3.5 text-amber-400" />
                            {course.hours}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-900 font-serif group-hover:text-blue-600 transition-colors mb-2">
                          {course.title}
                        </h3>

                        <p className="text-slate-600 text-xs leading-relaxed mb-4">
                          {course.shortDesc}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {course.tools.slice(0, 4).map((tool, tIdx) => (
                            <span key={tIdx} className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex items-center gap-2">
                      <button
                        onClick={() => setActiveCourseModal(course)}
                        className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Syllabus & Details</span>
                        <Icon name="chevron-right" className="w-3.5 h-3.5" />
                      </button>
                      
                      <button
                        onClick={() => { setSelectedCourseForCounseling(course.title); setCounselingModalOpen(true); }}
                        className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
                        title="Enquire Now"
                      >
                        <Icon name="send" className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LEARNING METHODOLOGY SECTION */}
          <section id="methodology" className="py-20 bg-slate-900 text-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">The 4 Pillars Methodology</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-serif mt-2">How We Train Future Developers</h2>
                <p className="text-slate-400 mt-3 text-sm sm:text-base">A proven study structure focused on active coding over passive watching.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 relative">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl mb-4">
                    01
                  </div>
                  <h3 className="text-lg font-bold font-serif mb-2">Structured Paths</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Step-by-step curriculum starting from core syntax to complex cloud systems.</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 relative">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl mb-4">
                    02
                  </div>
                  <h3 className="text-lg font-bold font-serif mb-2">Hands-On Labs</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">80% of class time spent building real applications with mentor code reviews.</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 relative">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xl mb-4">
                    03
                  </div>
                  <h3 className="text-lg font-bold font-serif mb-2">Portfolio Output</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Graduate with 3+ production-ready GitHub projects ready for interviews.</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 relative">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl mb-4">
                    04
                  </div>
                  <h3 className="text-lg font-bold font-serif mb-2">Placement Support</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Mock interviews, resume optimization, and direct hiring partner referrals.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ACADEMY CONTACT & LOCATION SECTION */}
          <section id="contact" className="py-20 bg-slate-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                <div className="lg:col-span-5">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Visit Pondicherry Center</span>
                  <h2 className="text-3xl font-extrabold font-serif text-slate-900 mt-2">
                    Start Your Journey Today
                  </h2>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    Have questions about course fees, class timings, or career scope? Speak directly with an academic advisor.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Icon name="map-pin" className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Academy Address</h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          No. 90, 2nd Floor, Montierser Street, White Town, Pondicherry – 605001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Icon name="phone" className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Counseling Hotline</h4>
                        <p className="text-xs text-slate-600 mt-0.5">+91 81220 05234</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Icon name="mail" className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Official Email</h4>
                        <p className="text-xs text-slate-600 mt-0.5">contact@elevateappsacademy.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 font-serif mb-4">Request a Free Career Session</h3>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Your Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Ramesh Kumar" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+91 98765 43210" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Program Interest</label>
                        <select 
                          value={formData.program}
                          onChange={(e) => setFormData({...formData, program: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                        >
                          {courses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Submit & Book Free Session</span>
                      <Icon name="send" className="w-4 h-4" />
                    </button>
                  </form>
                </div>

              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm">E</div>
                <span className="font-bold text-white text-sm">Elevate Apps Academy</span>
                <span>© 2026 All Rights Reserved.</span>
              </div>
              <div className="flex gap-6 font-semibold">
                <a href="#courses" className="hover:text-white">Courses</a>
                <a href="#methodology" className="hover:text-white">Methodology</a>
                <a href="#contact" className="hover:text-white">Contact</a>
              </div>
            </div>
          </footer>

          {/* FLOATING SPEED DIAL ACTION MENU */}
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {speedDialOpen && (
              <div className="flex flex-col items-end gap-2 mb-2 animate-bounce">
                <button 
                  onClick={() => { setSpeedDialOpen(false); setSelectedCourseForCounseling('Speed Dial Syllabus'); setCounselingModalOpen(true); }}
                  className="bg-white text-slate-800 hover:bg-slate-50 px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Icon name="file-text" className="w-4 h-4 text-blue-600" />
                  <span>Download Full Brochure</span>
                </button>

                <button 
                  onClick={() => { setSpeedDialOpen(false); setSelectedCourseForCounseling('Speed Dial Mentor'); setCounselingModalOpen(true); }}
                  className="bg-white text-slate-800 hover:bg-slate-50 px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Icon name="message-circle" className="w-4 h-4 text-blue-600" />
                  <span>Ask a Software Mentor</span>
                </button>
              </div>
            )}

            <button 
              onClick={() => setSpeedDialOpen(!speedDialOpen)}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 cursor-pointer ${
                speedDialOpen ? 'bg-rose-600 rotate-45' : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'
              }`}
              title="Quick Actions"
            >
              <Icon name="plus" className="w-7 h-7" />
            </button>
          </div>

          {/* COURSE SYLLABUS MODAL */}
          {activeCourseModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
                <button 
                  onClick={() => setActiveCourseModal(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
                >
                  <Icon name="x" className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${activeCourseModal.accentBg} ${activeCourseModal.accentText}`}>
                    {activeCourseModal.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">{activeCourseModal.duration}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 font-serif mb-2">
                  {activeCourseModal.title}
                </h3>
                <p className="text-xs text-slate-600 mb-6">{activeCourseModal.shortDesc}</p>

                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 mb-3">
                  Module Curriculum Breakdown
                </h4>

                <div className="space-y-2.5 mb-6">
                  {activeCourseModal.syllabus.map((mod, mIdx) => (
                    <div key={mIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-start gap-2.5">
                      <Icon name="check-circle-2" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => { 
                    setSelectedCourseForCounseling(activeCourseModal.title); 
                    setActiveCourseModal(null); 
                    setCounselingModalOpen(true); 
                  }}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-colors shadow-md cursor-pointer"
                >
                  Reserve Seat for {activeCourseModal.title}
                </button>
              </div>
            </div>
          )}

          {/* COUNSELING MODAL */}
          {counselingModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl relative">
                <button 
                  onClick={() => setCounselingModalOpen(false)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
                >
                  <Icon name="x" className="w-5 h-5" />
                </button>

                {counselingSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                      <Icon name="check-circle-2" className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold font-serif text-slate-900">Booking Confirmed!</h3>
                    <p className="text-xs text-slate-600 mt-2">An academic counselor from Elevate Apps Academy will call you within 2 hours.</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold font-serif text-slate-900 mb-1">
                      Book Free Academic Counseling
                    </h3>
                    <p className="text-xs text-slate-500 mb-6">
                      Selected Interest: <span className="font-bold text-blue-600">{selectedCourseForCounseling || 'General Enquiry'}</span>
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-3.5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Enter your name" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">Mobile Phone Number</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+91 98765 43210" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-colors shadow-md mt-2 cursor-pointer"
                      >
                        Confirm Free Counseling Booking
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      );
    }
export default App;