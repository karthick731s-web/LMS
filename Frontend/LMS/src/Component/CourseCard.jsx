import React from "react";

const CourseCard = ({ 
  title, 
  description, 
  image, 
  instructor, 
  duration, 
  level, 
  price, 
  students, 
  category, 
  progress, 
  showProgress = false,
  actionLabel = "Enroll Now",
  onAction
}) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
      
      {/* Top Image Section */}
      <div className="relative h-40 md:h-48 overflow-hidden">
        <img
          src={image || "https://ik.imagekit.io/zqdmtrlsv/LMS/Gemini_Generated_Image_u5j363u5j363u5j3.png"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2d45]/80 via-transparent to-transparent opacity-60" />
        
        {/* Category Tag */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#1a2d45] text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
              {category}
            </span>
          </div>
        )}

        {/* Level Tag */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-[#17b8a6] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-lg">
            {level || "Beginner"}
          </span>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="p-4 md:p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-lg md:text-xl font-black text-[#1a2d45] leading-tight line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
            {title}
          </h2>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">
          {description || "Master the skills needed for a successful career with this comprehensive expert-led course."}
        </p>

        {/* Stats Section */}
        <div className="flex items-center justify-between py-3 md:py-4 border-t border-gray-50 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4 md:mb-6">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {duration || "24 hrs"}
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
            {students || "1.2k"}
          </div>
          <div className="text-[#1a2d45] font-black">
            {price === 0 || price === "Free" ? "FREE" : `$${price}`}
          </div>
        </div>

        {/* Progress Bar (Dashboard specific) */}
        {showProgress && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-[10px] font-black text-[#1a2d45] mb-2 uppercase tracking-widest">
              <span>Course Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 bg-[#17b8a6]" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-auto">
          <button 
            onClick={onAction}
            className="w-full bg-[#1a2d45] hover:bg-[#142338] text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#1a2d45]/20"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;