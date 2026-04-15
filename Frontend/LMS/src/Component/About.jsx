import React from 'react';
import { PublicNavbar } from './Navbar';
import { Footer } from './Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white font-['Sora']">
      <PublicNavbar activePage="about" />
      
      <main className="pt-24 pb-16">
        {/* Banner Section */}
        <section className="bg-[#1a2d45] py-20 px-6 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" 
            style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #17b8a6 0%, transparent 60%)" }} 
          />
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl font-black mb-6">About LearnSphere</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We are on a mission to democratize education and empower learners worldwide with industry-leading skills.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#17b8a6] font-bold uppercase tracking-widest text-sm">Our Story</span>
              <h2 className="text-4xl font-black text-[#1a2d45] mt-4 mb-6">Built by Educators, for the Future.</h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                LearnSphere started with a simple observation: the gap between traditional education and industry requirements was widening. We set out to build a platform that doesn't just teach theory, but provides the practical, hands-on experience needed to thrive in the modern workforce.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Today, we serve thousands of students globally, offering a curated curriculum designed by experts who are actively working in their fields.
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-12 flex items-center justify-center relative">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#17b8a6] rounded-full opacity-10 animate-pulse" />
              <div className="w-full h-80 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-black text-[#1a2d45] mb-2">10+</div>
                  <div className="text-[#17b8a6] font-bold uppercase tracking-widest text-xs">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-50 py-20 px-6">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-black text-[#1a2d45]">Our Core Values</h2>
          </div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { title: "Accessibility", desc: "Education should be available to everyone, regardless of their location or background." },
              { title: "Practicality", desc: "We focus on real-world skills and projects that translate directly to career success." },
              { title: "Community", desc: "Learning is better together. We foster a supportive environment for all our students." },
            ].map((v, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-[#1a2d45] text-[#17b8a6] rounded-2xl flex items-center justify-center mb-6">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                   </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1a2d45] mb-4">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
