import React from 'react';
import { AlertCircle, Check } from 'lucide-react';

export const DepositNotice: React.FC = () => {
  return (
    <section
      id="important-terms"
      className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full"
    >
      <div
        id="card-deposit-terms"
        className="bg-white border-2 border-[#501087]/20 rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-xs"
      >
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8faf6] border border-[#19B496]/40 mb-3 sm:mb-4">
            <AlertCircle className="w-4 h-4 text-[#19B496] shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#006b58]">
              30% Deposit Required
            </span>
          </div>

          <h3 className="text-[22px] sm:text-[26px] md:text-[32px] font-extrabold text-[#501087] mb-2 sm:mb-3">
            Ready to Get Started?
          </h3>

          <p className="text-[15px] sm:text-[17px] md:text-[18px] text-[#191919] font-medium leading-relaxed mb-5 sm:mb-6">
            Ensure the required deposit is available within 7 business days.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-[13px] sm:text-[14px] text-[#4A5560]">
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#19B496] mt-0.5 shrink-0" />
              <span>
                Vehicle reservation begins immediately after deposit is confirmed in
                the underwriting escrow account.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#19B496] mt-0.5 shrink-0" />
              <span>
                Physical vehicle inspection in Lagos or Abuja can be scheduled prior to
                final contract signing.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
