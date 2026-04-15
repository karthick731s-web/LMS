import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import axios from "axios";

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#1a2d45" }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="4" fill="white" />
        <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="1.5" fill="none" />
        <line x1="11" y1="3" x2="11" y2="19" stroke="white" strokeWidth="1.5" />
        <line x1="3" y1="11" x2="19" y2="11" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
    <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: "#1a2d45" }}>
      Learn<span style={{ color: "#17b8a6" }}>Sphere</span>
    </span>
  </div>
);
 

 

 
const StatCard = ({ value, label, icon }) => (
  <div className="flex flex-col items-center justify-center p-8 rounded-2xl" style={{ background: "#1a2d45" }}>
    <div className="text-4xl font-black mb-2" style={{ color: "white", fontFamily: "'Sora', sans-serif" }}>{value}</div>
    <div className="text-sm font-medium text-center" style={{ color: "#17b8a6", fontFamily: "'Sora', sans-serif" }}>{label}</div>
  </div>
);
 
const TestimonialCard = ({ name, role, text }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: "#1a2d45", fontFamily: "'Sora', sans-serif" }}>
        {name[0]}
      </div>
      <div>
        <div className="font-semibold text-sm" style={{ color: "#1a2d45", fontFamily: "'Sora', sans-serif" }}>{name}</div>
        <div className="text-xs" style={{ color: "#9ca3af", fontFamily: "'Sora', sans-serif" }}>{role}</div>
      </div>
    </div>
    <p className="text-sm leading-relaxed" style={{ color: "#4b5563", fontFamily: "'Sora', sans-serif" }}>"{text}"</p>
    <div className="flex gap-1 mt-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#17b8a6">
          <path d="M7 1l1.5 4H13l-3.5 2.5L11 12 7 9.5 3 12l1.5-4.5L1 5h4.5z" />
        </svg>
      ))}
    </div>
  </div>
);
 
const testimonials = [
  { name: "Alex Johnson", role: "Frontend Developer", text: "LearnSphere transformed my career. The structured paths and expert instructors gave me skills I use every day." },
  { name: "Priya Sharma", role: "Data Analyst", text: "The course quality is unmatched. I completed the Data Science track and landed a job within 3 months." },
  { name: "Marcus Lee", role: "Full Stack Developer", text: "From zero to full stack in 6 months. The community and mentorship made all the difference." },
];

 
export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/courses`)
      .then(res => setCourses(res.data))
      .catch(() => setCourses([]))
      .finally(() => setCoursesLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Sora', sans-serif" }}>
      {/* Google Font Import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');`}</style>
 
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
           <Link to="/" className="font-medium text-sm text-[#17b8a6]">Home</Link>
           <a href="#courses" className="font-medium text-sm text-[#1a2d45] hover:text-[#17b8a6] transition-colors">Courses</a>
            <Link to="/about" className="font-medium text-sm text-[#1a2d45] hover:text-[#17b8a6] transition-colors">About</Link>
            <Link to="/contact" className="font-medium text-sm text-[#1a2d45] hover:text-[#17b8a6] transition-colors">Contact</Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate("/login")} className="text-sm font-semibold px-4 py-2 rounded-xl border transition-all duration-200 hover:bg-gray-50" style={{ color: "#1a2d45", borderColor: "#1a2d45" }}>
              Log In
            </button>
            <button onClick={() => navigate("/register")} className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all duration-200" style={{ background: "#1a2d45" }}>
              New user
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a2d45" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            <Link to="/" className="text-sm font-medium" style={{ color: "#1a2d45" }}>Home</Link>
            <a href="#courses" className="text-sm font-medium" style={{ color: "#1a2d45" }}>Courses</a>
            <Link to="/about" className="text-sm font-medium" style={{ color: "#1a2d45" }}>About</Link>
            <Link to="/contact" className="text-sm font-medium" style={{ color: "#1a2d45" }}>Contact</Link>
            <a href="/student-dashboard" className="text-sm font-semibold px-4 py-2 rounded-xl text-white text-center" style={{ background: "#1a2d45" }}>Get Started</a>
          </div>
        )}
      </nav>
 
      {/* HERO */}
      <section className="pt-28 pb-20 px-6" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 60%, #f0fdf4 100%)" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6" style={{ color: "#1a2d45" }}>
              Learn Without
              <br />
              <span style={{ color: "#17b8a6" }}>Limits.</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-md">
              Unlock your potential with expert-led courses, real-world projects, and a global community of learners on LearnSphere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/student-dashboard" className="px-8 py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 text-center shadow-lg" style={{ background: "#1a2d45" }}>
                Start Learning Free
              </a>
              <a href="#courses" className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 border text-center" style={{ color: "#1a2d45", borderColor: "#1a2d45" }}>
                Browse Courses →
              </a>
            </div>
            <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-2">
                {["A","B","C","D"].map((l, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ background: "#1a2d45", zIndex: 4 - i }}>
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <span className="font-bold text-sm" style={{ color: "#1a2d45" }}>50,000+ students</span>
                <p className="text-xs text-gray-400">already enrolled</p>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="w-full h-96 rounded-3xl flex items-center justify-center relative overflow-hidden" style={{ background: "#1a2d45" }}>
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #17b8a6 0%, transparent 50%), radial-gradient(circle at 20% 80%, white 0%, transparent 40%)" }}
              />
              <div className="relative z-10 text-center px-10">
                <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center mx-auto mb-6">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M6 10l14-6 14 6v10c0 8-6.5 13-14 14C12.5 33 6 28 6 20V10z" stroke="white" strokeWidth="2" fill="none" />
                    <path d="M13 20l5 5 9-9" stroke="#17b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-white font-black text-2xl mb-2">LearnSphere LMS</h3>
                <p className="text-white/60 text-sm">Your gateway to world-class education</p>
                <div className="flex gap-4 justify-center mt-6">
                  {["React", "Python", "Design", "Data"].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#1a2d45" }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.8 4.5H16l-3.9 3 1.5 4.5L9 11.5l-4.6 2.5 1.5-4.5L2 6.5h5.2z" fill="white" /></svg>
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: "#1a2d45" }}>4.9 Rating</div>
                  <div className="text-xs text-gray-400">12k+ reviews</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="text-xs font-semibold mb-1" style={{ color: "#1a2d45" }}>Completion Rate</div>
              <div className="text-2xl font-black" style={{ color: "#17b8a6" }}>94%</div>
            </div>
          </div>
        </div>
      </section>
 
      {/* STATS */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value="50K+" label="Active Students" />
          <StatCard value="200+" label="Expert Courses" />
          <StatCard value="95%" label="Job Placement" />
          <StatCard value="120+" label="Instructors" />
        </div>
      </section>
 
      {/* COURSES */}
      <section id="courses" className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#17b8a6" }}>Our Curriculum</span>
            <h2 className="text-4xl font-black mt-2 mb-4" style={{ color: "#1a2d45" }}>Popular Courses</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">Handpicked by industry experts. Learn skills that employers are actively seeking.</p>
          </div>
          {coursesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-48 bg-gray-100" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                    <div className="h-10 bg-gray-100 rounded-2xl mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16 text-gray-300">
              <svg width="56" height="56" className="mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <p className="font-semibold text-sm">No courses published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 6).map(course => (
                <CourseCard
                  key={course._id}
                  title={course.title}
                  description={course.description}
                  image={course.image || "https://ik.imagekit.io/zqdmtrlsv/LMS/Gemini_Generated_Image_u5j363u5j363u5j3.png"}
                  instructor={course.instructorName}
                  duration={course.duration}
                  level={course.level}
                  price={course.price}
                  students={course.totalEnrolled}
                  category={course.category}
                  actionLabel="Enroll Now"
                  onAction={() => navigate("/login")}
                />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <a href="#courses" className="inline-block px-8 py-3 rounded-xl font-semibold text-sm border transition-all" style={{ color: "#1a2d45", borderColor: "#1a2d45" }}>
              View All Courses →
            </a>
          </div>
        </div>
      </section>
 
      {/* HOW IT WORKS */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#17b8a6" }}>Simple Process</span>
            <h2 className="text-4xl font-black mt-2" style={{ color: "#1a2d45" }}>How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create Account", desc: "Sign up for free and explore thousands of courses across every domain." },
              { step: "02", title: "Enroll & Learn", desc: "Pick your course, follow structured lessons, and complete hands-on projects." },
              { step: "03", title: "Get Certified", desc: "Earn recognized certificates and showcase your skills to employers worldwide." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-start p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-all">
                <div className="text-6xl font-black mb-4 opacity-10" style={{ color: "#1a2d45" }}>{step}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1a2d45" }}>{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* TESTIMONIALS */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#17b8a6" }}>Student Stories</span>
            <h2 className="text-4xl font-black mt-2" style={{ color: "#1a2d45" }}>What They Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
          </div>
        </div>
      </section>
 
      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#1a2d45" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-white/60 mb-8 text-lg">Join 50,000+ students already growing with LearnSphere.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-5 py-3 rounded-xl text-sm bg-white/10 text-white placeholder-white/40 border border-white/20 outline-none focus:border-white/50"
            />
            <button className="px-6 py-3 rounded-xl font-semibold text-sm bg-white transition-all" style={{ color: "#1a2d45" }}>
              Get Started Free
            </button>
          </div>
        </div>
      </section>
 
      {/* FOOTER */}
      <footer className="bg-[#1a2d45] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold italic tracking-wider">LMS PORTAL</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering students with the latest educational tools and a seamless learning experience. Your future starts here.
            </p>
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <a key={i} href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#1a2d45] transition-all">
                  <span className="sr-only">Social</span>
                  <div className="h-5 w-5 bg-current rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Student Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Faculty Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Admissions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start space-x-3">
                <svg className="h-5 w-5 text-gray-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Education Lane, Learning City, ED 56789</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@lmsportal.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (234) 567-890</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400 text-xs">
          <p>© 2026 LMS Portal. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}