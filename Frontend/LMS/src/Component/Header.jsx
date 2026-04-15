import React from 'react';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-50">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-bold text-[#1a2d45]">Student Dashboard</h2>
      </div>
      
      <div className="flex-1 max-w-lg mx-6 hidden md:block">
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-[#1a2d45] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search..." 
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20 focus:border-[#1a2d45] focus:bg-white transition-all sm:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        
        <div className="flex items-center space-x-3 cursor-pointer p-1 pr-3 hover:bg-gray-100 rounded-full transition-colors">
          <div className="h-9 w-9 bg-[#1a2d45] rounded-full flex items-center justify-center text-white overflow-hidden uppercase font-semibold">
            <span className="text-sm">AS</span>
          </div>
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
};
