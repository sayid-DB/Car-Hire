import React from 'react';
import { HERO_IMAGE_URL } from '../data/vehicleData.ts';
import { FileText, Calendar, ShieldCheck, CheckCircle, Clock } from 'lucide-react';

interface HeroSectionProps {
  onApplyClick: () => void;
  onViewVehiclesClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onApplyClick,
  onViewVehiclesClick,
}) => {
  return (
    <section
      id="hero-section"
      className="relative bg-[#F5F5F5] overflow-hidden border-b border-[#E2E5E8] pt-8 sm:pt-12 pb-14 sm:pb-16 md:py-20 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Content (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-white border border-[#19B496]/40 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#19B496]"></span>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#501087] tracking-wider uppercase font-bold">
              NIGERIAN AUTOMOTIVE LEASE-TO-OWN INITIATIVE
            </span>
          </div>

          <div className="flex flex-col gap-2.5 sm:gap-3">
            <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] font-extrabold text-[#501087] tracking-tight leading-[1.15]">
              CAR HIRE PROGRAM
            </h1>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] text-[#19B496] font-bold leading-snug">
              Get behind the wheel today and work towards owning your vehicle.
            </p>
          </div>

          <p className="text-[14px] sm:text-[16px] md:text-[17px] text-[#4A5560] max-w-2xl leading-relaxed">
            Select an eligible vehicle, make the required 30% deposit and pay the
            remaining amount through structured monthly payments over 24 months.
            Designed for executives, professionals, and entrepreneurs seeking
            guaranteed ownership without lump-sum capital lockup.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <button
              id="btn-hero-apply"
              type="button"
              onClick={onApplyClick}
              className="bg-[#501087] hover:bg-[#35005f] text-white px-6 sm:px-8 py-3.5 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>APPLY FOR LEASE-TO-OWN</span>
              <FileText className="w-4 h-4" />
            </button>
            <button
              id="btn-hero-view-vehicles"
              type="button"
              onClick={onViewVehiclesClick}
              className="bg-white border-2 border-[#501087] text-[#501087] hover:bg-[#f0dbff]/30 px-6 sm:px-7 py-3.5 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all shadow-xs flex items-center justify-center cursor-pointer active:scale-98"
            >
              VIEW VEHICLES
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-5 sm:pt-6 border-t border-[#E2E5E8] mt-1 sm:mt-2">
            <div className="flex items-center gap-2 p-2 sm:p-0 rounded-lg bg-white/70 sm:bg-transparent border sm:border-0 border-[#E2E5E8]">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#19B496] shrink-0" />
              <span className="text-[11px] sm:text-[12px] font-mono text-[#191919] font-medium leading-tight">
                Fixed 24-Month Term
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 sm:p-0 rounded-lg bg-white/70 sm:bg-transparent border sm:border-0 border-[#E2E5E8]">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#19B496] shrink-0" />
              <span className="text-[11px] sm:text-[12px] font-mono text-[#191919] font-medium leading-tight">
                100% Path to Ownership
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 sm:p-0 rounded-lg bg-white/70 sm:bg-transparent border sm:border-0 border-[#E2E5E8]">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#19B496] shrink-0" />
              <span className="text-[11px] sm:text-[12px] font-mono text-[#191919] font-medium leading-tight">
                Zero Hidden Fees
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 sm:p-0 rounded-lg bg-white/70 sm:bg-transparent border sm:border-0 border-[#E2E5E8]">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#19B496] shrink-0" />
              <span className="text-[11px] sm:text-[12px] font-mono text-[#191919] font-medium leading-tight">
                7-Day Deposit
              </span>
            </div>
          </div>
        </div>

        {/* Right Hero Visual (5 Cols) */}
        <div className="lg:col-span-5 relative mt-4 lg:mt-0">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E2E5E8] bg-[#1F272D]">
            <img
              src={HERO_IMAGE_URL}
              alt="Croyance Auto Lease Executive Vehicle in Lagos Showroom"
              className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F272D]/90 via-transparent to-transparent pointer-events-none"></div>

            {/* Floating Repayment Chip */}
            <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-[#E2E5E8] shadow-lg flex items-center justify-between gap-2">
              <div>
                <span className="font-mono text-[9px] sm:text-[11px] text-[#4A5560] block uppercase tracking-wider font-semibold">
                  MONTHLY INSTALLMENT FROM
                </span>
                <span className="font-mono text-[18px] sm:text-[22px] md:text-[24px] text-[#501087] font-bold">
                  ₦300,000
                  <span className="text-[12px] sm:text-[13px] font-normal text-[#4A5560]">/mo</span>
                </span>
              </div>
              <span className="px-2.5 sm:px-3 py-1 bg-[#19B496]/15 border border-[#19B496]/40 text-[#006b58] text-[10px] sm:text-[12px] font-bold rounded-full whitespace-nowrap">
                24 Months Term
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
