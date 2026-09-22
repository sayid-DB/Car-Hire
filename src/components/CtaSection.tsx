import React from 'react';

interface CtaSectionProps {
  onApplyClick: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onApplyClick }) => {
  return (
    <section
      id="cta-section"
      className="py-14 sm:py-16 md:py-20 bg-[#1F272D] text-white px-4 sm:px-6 lg:px-12 text-center relative overflow-hidden w-full"
    >
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#501087]/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#19B496]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 relative z-10">
        <h2 className="text-[24px] sm:text-[28px] md:text-[34px] font-extrabold tracking-tight">
          Ready to Work Towards Vehicle Ownership?
        </h2>
        <p className="text-[15px] sm:text-[17px] md:text-[18px] text-[#bfc7cf] leading-relaxed">
          Choose your preferred vehicle and start your application.
        </p>

        <div className="pt-3 sm:pt-4 flex items-center justify-center">
          <button
            type="button"
            id="btn-cta-apply"
            onClick={onApplyClick}
            className="w-full sm:w-auto min-w-[200px] h-12 sm:h-13 px-8 py-3.5 bg-[#501087] hover:bg-[#612798] text-white font-bold rounded-xl text-[13px] sm:text-[14px] shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center"
          >
            APPLY NOW
          </button>
        </div>
      </div>
    </section>
  );
};
