import React from 'react';

export const Hero = () => {
  return (
    <section className="relative bg-white pt-10 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 text-left z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1a2d45] leading-tight mb-6">
              Unlock Your Potential with <span className="text-opacity-90 underline decoration-[#1a2d45]/20">Smart Learning</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-xl">
              Experience a new way of learning with our advanced student dashboard. Track progress, manage courses, and connect with peers all in one professional platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-[#1a2d45] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Get Started Today
              </button>
              <button className="flex items-center justify-center space-x-2 text-[#1a2d45] px-8 py-4 rounded-xl font-bold text-lg border-2 border-[#1a2d45] hover:bg-[#1a2d45] hover:text-white transition-all duration-300">
                <span>Watch Demo</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="mt-12 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 bg-gray-200 border-2 border-white rounded-full flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 font-medium">
                Joined by <span className="text-[#1a2d45] font-bold">12k+</span> students worldwide
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-[#1a2d45] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
              <div className="absolute -bottom-8 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
              <div className="relative bg-white p-2 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="/hero-image.png" 
                  alt="LMS Hero" 
                  className="rounded-2xl w-full h-auto object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center justify-between border border-white/50">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-[#1a2d45] rounded-lg flex items-center justify-center text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">New Course</p>
                      <p className="text-sm font-bold text-[#1a2d45]">AI & Machine Learning</p>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-[#1a2d45] flex items-center justify-center text-[#1a2d45] font-bold text-xs">
                    75%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
