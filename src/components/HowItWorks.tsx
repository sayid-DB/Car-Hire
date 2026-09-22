import React from 'react';
import { ChevronRight, Clock, CheckCircle2, Key } from 'lucide-react';

interface HowItWorksProps {
  onExploreFleetClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onExploreFleetClick }) => {
  return (
    <section
      id="how-it-works"
      className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full"
    >
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="font-mono text-[10px] sm:text-[11px] text-[#19B496] uppercase tracking-widest font-bold block mb-2">
          Straightforward Process
        </span>
        <h2 className="text-[26px] sm:text-[30px] md:text-[34px] text-[#501087] tracking-tight font-extrabold mb-2.5 sm:mb-3">
          How the Program Works
        </h2>
        <p className="text-[15px] sm:text-[17px] md:text-[18px] text-[#4A5560]">
          A transparent, structured four-step pathway from initial application to full
          vehicle ownership.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Step 1 */}
        <div
          id="card-how-step-1"
          onClick={onExploreFleetClick}
          className="bg-white border border-[#E2E5E8] p-5 sm:p-6 rounded-2xl shadow-xs hover:border-[#501087] hover:shadow-md transition-all relative flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#f0dbff]/50 border border-[#501087]/20 flex items-center justify-center text-[#501087] font-mono font-bold text-lg sm:text-xl mb-5 group-hover:bg-[#501087] group-hover:text-white transition-colors">
              01
            </div>
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#191919] mb-2">
              Choose Your Vehicle
            </h3>
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#4A5560]">
              Browse the available vehicles and select the option that suits you.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-[#E2E5E8] flex items-center text-[#501087] text-[12px] font-bold">
            <span>Explore 4 fleet tiers</span>
            <ChevronRight className="w-4 h-4 ml-1 text-[#19B496]" />
          </div>
        </div>

        {/* Step 2 */}
        <div
          id="card-how-step-2"
          className="bg-white border border-[#E2E5E8] p-5 sm:p-6 rounded-2xl shadow-xs hover:border-[#501087] hover:shadow-md transition-all relative flex flex-col justify-between group"
        >
          <div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#e8faf6] border border-[#19B496]/30 flex items-center justify-center text-[#006b58] font-mono font-bold text-lg sm:text-xl mb-5 group-hover:bg-[#19B496] group-hover:text-white transition-colors">
              02
            </div>
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#191919] mb-2">
              Make Your 30% Deposit
            </h3>
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#4A5560]">
              A 30% deposit is required to secure your selected vehicle allocation.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-[#E2E5E8] flex items-center text-[#006b58] text-[12px] font-bold">
            <span>Ready in 7 business days</span>
            <Clock className="w-4 h-4 ml-1 text-[#19B496]" />
          </div>
        </div>

        {/* Step 3 */}
        <div
          id="card-how-step-3"
          className="bg-white border border-[#E2E5E8] p-5 sm:p-6 rounded-2xl shadow-xs hover:border-[#501087] hover:shadow-md transition-all relative flex flex-col justify-between group"
        >
          <div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#f0dbff]/50 border border-[#501087]/20 flex items-center justify-center text-[#501087] font-mono font-bold text-lg sm:text-xl mb-5 group-hover:bg-[#501087] group-hover:text-white transition-colors">
              03
            </div>
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#191919] mb-2">
              Submit Your Application
            </h3>
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#4A5560]">
              Provide the required personal information and supporting documents.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-[#E2E5E8] flex items-center text-[#501087] text-[12px] font-bold">
            <span>Verified 24hr underwriting</span>
            <CheckCircle2 className="w-4 h-4 ml-1 text-[#19B496]" />
          </div>
        </div>

        {/* Step 4 */}
        <div
          id="card-how-step-4"
          className="bg-white border border-[#E2E5E8] p-5 sm:p-6 rounded-2xl shadow-xs hover:border-[#501087] hover:shadow-md transition-all relative flex flex-col justify-between group"
        >
          <div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#f0dbff]/50 border border-[#501087]/20 flex items-center justify-center text-[#501087] font-mono font-bold text-lg sm:text-xl mb-5 group-hover:bg-[#501087] group-hover:text-white transition-colors">
              04
            </div>
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#191919] mb-2">
              Make Monthly Payments
            </h3>
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#4A5560]">
              The listed vehicles have a 24-month payment period leading to full
              ownership.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-[#E2E5E8] flex items-center text-[#501087] text-[12px] font-bold">
            <span>100% vehicle transfer</span>
            <Key className="w-4 h-4 ml-1 text-[#19B496]" />
          </div>
        </div>
      </div>
    </section>
  );
};
