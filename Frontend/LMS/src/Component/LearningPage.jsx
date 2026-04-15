import React, { useState, useEffect } from "react";
import axios from "axios";

const LearningPage = ({ course, user, onBack }) => {
  // Course data fallback if props missing (for demo)
  const courseInfo = course || { id: "c1", title: "C++ Programming Language", category: "Software Engineering" };
  const userInfo = user || { name: "Student", role: "student" };

  // Mock Lesson Data
  const sections = [
    { id: 's1', title: 'Getting Started', lessons: [
      { id: 'l1', title: 'Introduction to C++', duration: 8, videoId: 'vLnPwxZdW4Y' },
      { id: 'l2', title: 'Setting Up Your Environment', duration: 12, videoId: 'vLnPwxZdW4Y' },
      { id: 'l3', title: 'Your First C++ Program', duration: 15, videoId: 'vLnPwxZdW4Y' },
    ]},
    { id: 's2', title: 'Core Concepts', lessons: [
      { id: 'l4', title: 'Variables & Data Types', duration: 20, videoId: 'vLnPwxZdW4Y' },
      { id: 'l5', title: 'Control Flow & Loops', duration: 18, videoId: 'vLnPwxZdW4Y' },
      { id: 'l6', title: 'Functions & Scope', duration: 22, videoId: 'vLnPwxZdW4Y' },
      { id: 'l7', title: 'Arrays & Pointers', duration: 25, videoId: 'vLnPwxZdW4Y' },
    ]},
    { id: 's3', title: 'Object Oriented Programming', lessons: [
      { id: 'l8', title: 'Classes & Objects', duration: 28, videoId: 'vLnPwxZdW4Y' },
      { id: 'l9', title: 'Inheritance & Polymorphism', duration: 30, videoId: 'vLnPwxZdW4Y' },
      { id: 'l10', title: 'Encapsulation & Abstraction', duration: 24, videoId: 'vLnPwxZdW4Y' },
    ]},
    { id: 's4', title: 'Standard Template Library', lessons: [
      { id: 'l11', title: 'Vectors & Lists', duration: 20, videoId: 'vLnPwxZdW4Y' },
      { id: 'l12', title: 'Maps & Sets', duration: 18, videoId: 'vLnPwxZdW4Y' },
      { id: 'l13', title: 'Algorithms & Iterators', duration: 22, videoId: 'vLnPwxZdW4Y' },
    ]},
    { id: 's5', title: 'Practice & Problems', lessons: [
      { id: 'l14', title: 'Competitive Programming Tips', duration: 35, videoId: 'vLnPwxZdW4Y' },
      { id: 'l15', title: 'Real World Projects', duration: 40, videoId: 'vLnPwxZdW4Y' },
      { id: 'l16', title: 'Final Assessment', duration: 15, videoId: 'vLnPwxZdW4Y' },
    ]},
  ];

  // State
  const [activeLesson, setActiveLesson] = useState(sections[0].lessons[0]);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [openSections, setOpenSections] = useState(new Set([sections[0].id]));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotesOpen, setIsNotesOpen] = useState(true);

  const toggleSection = (sectionId) => {
    const next = new Set(openSections);
    if (next.has(sectionId)) next.delete(sectionId);
    else next.add(sectionId);
    setOpenSections(next);
  };

  const toggleComplete = (lessonId) => {
    const next = new Set(completedLessons);
    if (next.has(lessonId)) next.delete(lessonId);
    else next.add(lessonId);
    setCompletedLessons(next);
  };

  const handleSaveNote = () => {
    if (!currentNote.trim()) return;
    const lessonNotes = notes[activeLesson.id] || [];
    const newNote = {
      id: Date.now(),
      text: currentNote,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lessonTitle: activeLesson.title
    };
    setNotes({ ...notes, [activeLesson.id]: [newNote, ...lessonNotes] });
    setCurrentNote("");
  };

  const handleDeleteNote = (lessonId, noteId) => {
    const lessonNotes = notes[lessonId].filter(n => n.id !== noteId);
    setNotes({ ...notes, [lessonId]: lessonNotes });
  };

  const totalLessons = sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const progressPercent = Math.round((completedLessons.size / totalLessons) * 100);

  // Lesson Nav
  const allLessons = sections.flatMap(s => s.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
  
  const handleNext = () => {
    if (currentIndex < allLessons.length - 1) {
      toggleComplete(activeLesson.id);
      setActiveLesson(allLessons[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveLesson(allLessons[currentIndex - 1]);
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-['Sora']">
      {/* LEFT SIDEBAR */}
      <aside 
        className={`${isSidebarOpen ? 'w-[260px]' : 'w-0'} bg-[#0f172a] text-white flex flex-col transition-all duration-300 overflow-hidden relative border-r border-slate-800`}
      >
        <div className="p-4 border-b border-slate-800 flex flex-col gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-semibold"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Courses
          </button>
          <h2 className="font-bold text-sm truncate uppercase tracking-wider">{courseInfo.title}</h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {sections.map((section) => (
            <div key={section.id} className="border-b border-slate-800/50">
              <button 
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors group"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 group-hover:text-slate-200">
                  {section.title}
                </span>
                <svg 
                  className={`transition-transform duration-200 text-slate-500 ${openSections.has(section.id) ? 'rotate-180' : ''}`}
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div className={`${openSections.has(section.id) ? 'block' : 'hidden'} pb-2`}>
                {section.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full px-4 py-3 flex items-start gap-3 transition-all ${
                      activeLesson.id === lesson.id ? 'bg-[#14b8a6]/10 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                    }`}
                  >
                    <div 
                      onClick={(e) => { e.stopPropagation(); toggleComplete(lesson.id); }}
                      className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                        completedLessons.has(lesson.id) ? 'bg-[#14b8a6] border-[#14b8a6]' : 'border-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {completedLessons.has(lesson.id) && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><path d="M20 6L9 17l-5-5" /></svg>
                      )}
                    </div>
                    <div className="text-left">
                      <p className={`text-xs font-semibold leading-relaxed ${activeLesson.id === lesson.id ? 'text-[#14b8a6]' : ''}`}>
                        {lesson.title}
                      </p>
                      <span className="text-[10px] opacity-50">{lesson.duration} min</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        {userInfo.role === 'student' && (
          <div className="p-5 bg-slate-900/50 border-t border-slate-800">
            <div className="flex justify-between text-[10px] font-black mb-2 text-slate-400 uppercase tracking-widest">
              <span>Overall Progress</span>
              <span className="text-[#14b8a6]">{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-1.5">
              <div 
                className="h-full bg-[#14b8a6] transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 font-medium">{completedLessons.size} of {totalLessons} lessons completed</p>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full bg-white relative overflow-y-auto">
        {/* Top Header Placeholder */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-8 py-4 border-b border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 md:block"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              </button>
              <div className="w-px h-6 bg-slate-200 hidden md:block" />
              <h1 className="text-sm font-bold text-slate-800 hidden md:block">Module: {sections.find(s => s.lessons.some(l => l.id === activeLesson.id))?.title}</h1>
           </div>
           
           <div className="flex items-center gap-3">
              <button className="text-[10px] font-bold text-white bg-[#14b8a6] px-4 py-2 rounded-lg hover:bg-[#0d9488] transition-all shadow-lg shadow-[#14b8a6]/20">
                Ask AI Assistant
              </button>
           </div>
        </div>

        <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
          {/* Video Container */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl relative group">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeLesson.videoId}?rel=0&modestbranding=1`}
              title="Course Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Lesson Details */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 leading-tight mb-1">{activeLesson.title}</h1>
                <p className="text-xs text-slate-400 font-medium">Last Updated : 27 Mar, 2026</p>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { icon: 'share', label: 'Share' },
                  { icon: 'plus', label: 'More' }
                ].map(btn => (
                  <button key={btn.icon} className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-500 transition-all border border-slate-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      {btn.icon === 'share' ? <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" /> : <path d="M12 5v14M5 12h14" />}
                    </svg>
                  </button>
                ))}
                {userInfo.role === 'instructor' && (
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-[#14b8a6] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#14b8a6]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    Edit Lesson
                  </button>
                )}
              </div>
            </div>

            <div className="text-slate-600 space-y-4 text-sm leading-relaxed">
              <p>
                {courseInfo.description || `${activeLesson.title} is a fundamental concept in ${courseInfo.category}. In this lesson, we break down the core mechanics and industry best practices for mastering this topic effectively.`}
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 pt-2">
                {[
                  "Understanding core terminology and structural patterns.",
                  "Implementation strategies for scalable applications.",
                  "Common pitfalls and how to avoid logical bottlenecks.",
                  "Real-time performance considerations and optimizations.",
                  "Cross-platform compatibility and architectural design."
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#14b8a6] flex-shrink-0" />
                    <span className="font-medium text-slate-500">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications Diagram */}
            <div className="pt-6">
               <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col md:flex-row items-center gap-12">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full border-[12px] border-[#14b8a6]/10 flex items-center justify-center">
                       <h3 className="text-2xl font-black text-[#14b8a6]">Applications</h3>
                    </div>
                    {/* Decorative bits */}
                    <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#14b8a6] animate-pulse" />
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: 'Gaming Engines', color: 'bg-emerald-500', icon: '🎮' },
                      { title: 'Real Time Systems', color: 'bg-indigo-500', icon: '⌚' },
                      { title: 'Operating Systems', color: 'bg-sky-500', icon: '💻' },
                      { title: 'HFT Systems', color: 'bg-rose-500', icon: '📈' }
                    ].map(app => (
                      <div key={app.title} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-[#14b8a6] transition-all cursor-default">
                        <div className={`w-8 h-8 rounded-lg ${app.color} flex items-center justify-center text-white text-sm shadow-inner`}>
                          {app.icon}
                        </div>
                        <span className="text-xs font-bold text-slate-700">{app.title}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="flex items-center justify-between pt-12 pb-20 border-t border-slate-100">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all font-bold text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Previous Lesson
            </button>
            <button 
              onClick={handleNext}
              disabled={currentIndex === allLessons.length - 1}
              className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
            >
              Next Lesson
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </main>

      {/* RIGHT NOTES PANEL */}
      {userInfo.role === 'student' && (
        <aside 
          className={`${isNotesOpen ? 'w-[300px]' : 'w-0'} bg-white border-l border-slate-100 flex flex-col transition-all duration-300 overflow-hidden relative`}
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
             <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#14b8a6]/10 flex items-center justify-center text-[#14b8a6]">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                </div>
                <h2 className="font-black text-slate-800 text-sm">My Notes</h2>
             </div>
             <button 
                onClick={() => setIsNotesOpen(!isNotesOpen)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
             </button>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 space-y-4">
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 italic">Current: {activeLesson.title}</p>
                  <textarea 
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Write your notes here..."
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#14b8a6]/20 resize-none min-h-[120px] placeholder-slate-300 font-medium"
                  />
               </div>
               <button 
                onClick={handleSaveNote}
                className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white py-3.5 rounded-xl font-bold text-xs transition-all shadow-lg shadow-[#14b8a6]/10"
               >
                 Save Note
               </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4 custom-scrollbar">
               {(notes[activeLesson.id] || []).length === 0 ? (
                 <div className="flex flex-col items-center justify-center pt-20 text-slate-300 space-y-3">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
                    <p className="text-[10px] font-bold uppercase tracking-widest">No notes yet</p>
                 </div>
               ) : (
                 notes[activeLesson.id].map(note => (
                   <div key={note.id} className="bg-slate-50 rounded-2xl p-4 relative group hover:bg-slate-100/80 transition-all border border-transparent hover:border-slate-200">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-black text-[#14b8a6] uppercase tracking-[0.1em]">{note.lessonTitle}</span>
                        <button 
                          onClick={() => handleDeleteNote(activeLesson.id, note.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">{note.text}</p>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-bold">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        Saved at {note.timestamp}
                      </div>
                   </div>
                 ))
               )}
            </div>
          </div>
        </aside>
      )}

      {/* MOBILE TRIGGER */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-6 left-6 w-12 h-12 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center z-[100] md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      )}
    </div>
  );
};

export default LearningPage;
