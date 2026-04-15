import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// ─── Logo ────────────────────────────────────────────────────────────────────
export const Logo = ({ size = "md" }) => {
  const textSize = size === "sm" ? "text-lg" : "text-2xl";
  const iconSize = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  return (
    <div className="flex items-center gap-2">
      <div className={`${iconSize} rounded-lg flex items-center justify-center`} style={{ background: "#1a2d45" }}>
        <svg width={size === "sm" ? 16 : 22} height={size === "sm" ? 16 : 22} viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="4" fill="white" />
          <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="1.5" fill="none" />
          <line x1="11" y1="3" x2="11" y2="19" stroke="white" strokeWidth="1.5" />
          <line x1="3" y1="11" x2="19" y2="11" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>
      <span className={`${textSize} font-bold tracking-tight`} style={{ fontFamily: "'Sora', sans-serif", color: "#1a2d45" }}>
        Learn<span style={{ color: "#17b8a6" }}>Sphere</span>
      </span>
    </div>
  );
};

// ─── Public Navbar (Home Page) ───────────────────────────────────────────────
export const PublicNavbar = ({ activePage = "home" }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", id: "home" },
    { label: "Courses", id: "courses" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');`}</style>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(({ label, id }) => {
              const isActive = activePage === id;
              const isScrollLink = ["courses", "instructors"].includes(id);
              const path = id === "home" ? "/" : `/${id}`;
              
              if (isScrollLink) {
                return (
                  <a
                    key={id}
                    href={`/#${id}`}
                    className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
                    style={{ color: activePage === id ? "#17b8a6" : "#1a2d45" }}
                  >
                    {label}
                  </a>
                );
              }

              return (
                <Link
                  key={id}
                  to={path}
                  className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
                  style={{ color: activePage === id ? "#17b8a6" : "#1a2d45" }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/student-dashboard"
              className="text-sm font-semibold px-4 py-2 rounded-xl border transition-all duration-200 hover:bg-gray-50"
              style={{ color: "#1a2d45", borderColor: "#1a2d45" }}
            >
              Log In
            </a>
            <a
              href="/student-dashboard"
              className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "#1a2d45" }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden p-2 rounded-lg" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a2d45" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a2d45" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            {links.map(({ label, id }) => {
              const isScrollLink = ["courses", "instructors"].includes(id);
              const path = id === "home" ? "/" : `/${id}`;
              if (isScrollLink) {
                return <a key={id} href={`/#${id}`} className="text-sm font-medium" style={{ color: "#1a2d45" }}>{label}</a>
              }
              return <Link key={id} onClick={() => setMenuOpen(false)} to={path} className="text-sm font-medium" style={{ color: "#1a2d45" }}>{label}</Link>
            })}
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <a href="/student-dashboard" className="text-sm font-semibold px-4 py-2 rounded-xl border text-center" style={{ color: "#1a2d45", borderColor: "#1a2d45" }}>Log In</a>
              <a href="/student-dashboard" className="text-sm font-semibold px-4 py-2 rounded-xl text-white text-center" style={{ background: "#1a2d45" }}>Get Started</a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

// ─── Dashboard Sidebar (Student & Instructor shared) ─────────────────────────
export const DashboardSidebar = ({
  role = "student",
  activePage = "dashboard",
  userName = "Alex",
  isOpen = false,
  onClose = () => {},
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const studentLinks = [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "my-courses", label: "My Courses", icon: "book" },
    { id: "catalog", label: "Catalog", icon: "catalog" },
    { id: "profile", label: "Profile", icon: "user" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  const instructorLinks = [
    { id: "overview", label: "Overview", icon: "grid" },
    { id: "manage-users", label: "Manage Users", icon: "users" },
    { id: "manage-courses", label: "Manage Courses", icon: "book" },
    { id: "profile", label: "Profile", icon: "user" },
    { id: "reports", label: "Reports", icon: "chart" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  const adminLinks = [
    { id: "admin-overview", label: "Admin Dashboard", icon: "grid" },
    { id: "students", label: "Manage Students", icon: "users" },
    { id: "instructors", label: "Manage Instructors", icon: "book" },
    { id: "profile", label: "Profile", icon: "user" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  let links = studentLinks;
  if (role === "instructor") links = instructorLinks;
  if (role === "admin") links = adminLinks;

  const icons = {
    grid: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="6" height="6" rx="1" /><rect x="10" y="2" width="6" height="6" rx="1" />
        <rect x="2" y="10" width="6" height="6" rx="1" /><rect x="10" y="10" width="6" height="6" rx="1" />
      </svg>
    ),
    book: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3h5a2 2 0 012 2v10a2 2 0 01-2-2H3V3z" /><path d="M15 3h-5a2 2 0 00-2 2v10a2 2 0 002-2h5V3z" />
      </svg>
    ),
    catalog: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="6" height="6" rx="1" /><rect x="10" y="2" width="6" height="6" rx="1" />
        <rect x="2" y="10" width="3" height="3" rx="0.5" /><rect x="7" y="10" width="3" height="3" rx="0.5" /><rect x="12" y="10" width="3" height="3" rx="0.5" />
      </svg>
    ),
    user: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="6" r="3" /><path d="M3 15c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    ),
    users: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="7" cy="6" r="2.5" /><circle cx="13" cy="6" r="2" />
        <path d="M2 14c0-2.8 2.2-5 5-5s5 2.2 5 5" /><path d="M13 9c1.7 0 3 1.3 3 3" />
      </svg>
    ),
    chart: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 14l4-5 4 3 4-6" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="2" y1="16" x2="16" y2="16" />
      </svg>
    ),
    settings: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="9" r="2.5" />
        <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.2 3.2l1.4 1.4M13.4 13.4l1.4 1.4M3.2 14.8l1.4-1.4M13.4 4.6l1.4-1.4" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');`}</style>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] md:hidden transition-opacity" 
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[101] md:relative flex flex-col h-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "w-16" : "w-64 md:w-60"}`}
        style={{ background: "white", borderRight: "1px solid #f1f5f9", fontFamily: "'Sora', sans-serif" }}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-4 border-b border-gray-100 flex-shrink-0">
          {collapsed ? (
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto" style={{ background: "#1a2d45" }}>
              <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="4" fill="white" />
                <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="1.5" fill="none" />
                <line x1="11" y1="3" x2="11" y2="19" stroke="white" strokeWidth="1.5" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <Logo size="sm" />
              <button onClick={onClose} className="md:hidden p-1 text-gray-400 hover:text-[#1a2d45]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1 custom-scrollbar">
          {links.map(({ id, label, icon }) => {
            const isActive = activePage === id;
            let path = "/";
            if (role === "student") {
              path = id === "dashboard" ? "/dashboard" : `/student/${id}`;
            } else if (role === "admin") {
              path = id === "admin-overview" ? "/admin-dashboard" : `/admin/${id}`;
            } else {
              // Instructor
              path = id === "overview" ? "/instructor-dashboard" : `/instructor/${id}`;
            }

            // Correction for shared paths
            if (id === "profile") {
              path = role === "student" ? "/student/profile" : role === "admin" ? "/admin/profile" : "/instructor/profile";
            }
            if (id === "manage-courses" && role === "instructor") {
              path = "/instructor/manage-courses";
            }
            if (id === "manage-users" && role === "instructor") {
              path = "/instructor/manage-users";
            }

            return (
              <Link
                key={id}
                to={path}

                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${collapsed ? "justify-center" : ""}`}
                style={{
                  background: isActive ? "#1a2d45" : "transparent",
                  color: isActive ? "white" : "#64748b",
                }}
                title={collapsed ? label : undefined}
              >
                <div className={isActive ? "text-[#17b8a6]" : "text-gray-300"}>{icons[icon]}</div>
                {!collapsed && <span className="truncate">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 p-3 space-y-2 flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-gray-50/80">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "#1a2d45" }}>
                {userName[0]}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold truncate text-[#1a2d45]">{userName}</div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-[#17b8a6]">{role}</div>
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all w-full ${collapsed ? "justify-center" : ""}`}
            title="Logout"
          >
            <div className="flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4.5l3.5 3.5m0 0l-3.5 3.5m3.5-3.5H6m3-8.5l-6 1a2 2 0 00-1.7 2v10a2 2 0 001.7 2l6 1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {!collapsed && <span>Logout</span>}
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-50 transition-all w-full"
          >
            <div className="flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                {collapsed ? <path d="M6 3l5 5-5 5" /> : <path d="M11 3l-5 5 5 5" />}
              </svg>
            </div>
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

// ─── Dashboard Top Bar ────────────────────────────────────────────────────────
export const DashboardTopBar = ({ breadcrumb = [], userName = "Alex", onMenuClick = () => {} }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <header 
      className="h-16 flex items-center px-4 md:px-6 bg-white border-b border-gray-100 gap-4 z-40"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      {/* Mobile Toggle */}
      <button 
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-xl text-[#1a2d45] hover:bg-gray-100 transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Centered Search Bar */}
      <div className="flex-1 flex justify-center order-2 md:order-none mx-2">
        <div className="group w-full max-w-2xl px-3 md:px-4 py-2 bg-gray-50/80 border border-transparent rounded-2xl flex items-center gap-2 md:gap-3 transition-all focus-within:bg-white focus-within:border-[#1a2d45] focus-within:ring-4 focus-within:ring-[#1a2d45]/5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" className="group-focus-within:text-[#17b8a6] transition-colors shrink-0">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input 
            type="text" 
            placeholder="Search..." 
            className="flex-1 bg-transparent border-none outline-none text-[12px] md:text-sm font-medium text-[#1a2d45] placeholder-[#94a3b8] w-full min-w-0"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto order-3">
        <button className="relative p-2 rounded-xl text-[#64748b] hover:bg-gray-100 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
        </button>

        <div className="relative group cursor-pointer">
          <div className="flex items-center gap-2 px-1.5 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md" style={{ background: "#1a2d45" }}>
              {userName[0]}
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3" className="hidden sm:block">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="p-2">
              <button 
                onClick={handleLogout}
                className="w-full text-left px-3 py-2.5 text-sm text-red-500 font-bold hover:bg-red-50 rounded-xl flex items-center gap-3 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// ─── Default export: all combined as a demo preview ──────────────────────────
export default function NavbarDemo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');`}</style>
      
      {/* Public Navbar Demo */}
      <div className="mb-8">
        <PublicNavbar activePage="home" />
        <div className="pt-20 px-6 pb-4 text-center">
          <span className="text-xs text-gray-400" style={{ fontFamily: "'Sora', sans-serif" }}>↑ Public Navbar (used on HomePage)</span>
        </div>
      </div>

      {/* Dashboard Layout Demo */}
      <div className="flex-1 flex mx-4 rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white relative" style={{ height: 400 }}>
        <DashboardSidebar 
          role="student" 
          activePage="dashboard" 
          userName="Alex Johnson" 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardTopBar 
            breadcrumb={["Student Dashboard", "Dashboard"]} 
            userName="Alex Johnson" 
            onMenuClick={() => setMobileMenuOpen(true)}
          />
          <div className="flex-1 flex items-center justify-center p-6" style={{ background: "#f9fafb" }}>
            <span className="text-sm text-center text-gray-400" style={{ fontFamily: "'Sora', sans-serif" }}>
              ← Mobile Ready Sidebar + Centered Large Search Bar
            </span>
          </div>
        </div>
      </div>
      <div className="text-center py-3">
        <span className="text-xs text-gray-400" style={{ fontFamily: "'Sora', sans-serif" }}>↑ DashboardSidebar + DashboardTopBar (used in StudentDashboard & InstructorDashboard)</span>
      </div>
    </div>
  );
}
