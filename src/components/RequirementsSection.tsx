import React from 'react';
import { BadgeCheck, FolderCheck, CheckCircle2, Info } from 'lucide-react';

export const RequirementsSection: React.FC = () => {
  const infoRequirements = [
    'Full Legal Name & Address',
    'Date of Birth & Marital Status',
    'Active Phone & WhatsApp Contact',
    'Place of Work / Employer / Business Name',
    'Driving Experience & Route History',
    "Driver's Licence Number (FRSC)",
    'Bank Account & Source of Funds',
    '30% Down Payment Capability',
  ];

  const docRequirements = [
    {
      title: 'Means of ID',
      desc: "National Identification Number (NIN), International Passport, or Voter's Card.",
    },
    {
      title: "Driver's Licence",
      desc: "Valid, unexpired FRSC driver's licence.",
    },
    {
      title: 'NEPA / Utility Bill',
      desc: 'Recent utility bill (DisCo/NEPA receipt) issued within last 3 months matching residence.',
    },
    {
      title: 'Guarantor ID',
      desc: 'Valid identification document of a verifiable business or professional guarantor.',
    },
  ];

  return (
    <section
      id="requirements"
      className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full"
    >
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="font-mono text-[10px] sm:text-[11px] text-[#19B496] uppercase tracking-widest font-bold block mb-2">
          Underwriting Standards
        </span>
        <h2 className="text-[26px] sm:text-[30px] md:text-[34px] text-[#501087] tracking-tight font-extrabold mb-2.5 sm:mb-3">
          What You'll Need
        </h2>
        <p className="text-[15px] sm:text-[17px] md:text-[18px] text-[#4A5560]">
          Ensure you have the required personal details and documentation ready
          before initiating your application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Column 1: Information Required */}
        <div
          id="card-info-required"
          className="bg-white border border-[#E2E5E8] rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-4 border-b border-[#E2E5E8]">
              <div className="w-10 h-10 rounded-xl bg-[#f0dbff]/60 flex items-center justify-center text-[#501087] shrink-0">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[17px] sm:text-[19px] font-bold text-[#191919]">
                  Information Required
                </h3>
                <p className="text-[12px] sm:text-[13px] text-[#4A5560]">
                  Personal &amp; occupational records
                </p>
              </div>
            </div>

            <ul className="space-y-2.5 sm:space-y-3 font-medium text-[13px] sm:text-[14px] text-[#191919]">
              {infoRequirements.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F5F5F5] border border-[#E2E5E8]"
                >
                  <span className="pr-2">{item}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#19B496] shrink-0" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 2: Documents Required */}
        <div
          id="card-documents-required"
          className="bg-white border border-[#E2E5E8] rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-4 border-b border-[#E2E5E8]">
              <div className="w-10 h-10 rounded-xl bg-[#f0dbff]/60 flex items-center justify-center text-[#501087] shrink-0">
                <FolderCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[17px] sm:text-[19px] font-bold text-[#191919]">
                  Documents Required
                </h3>
                <p className="text-[12px] sm:text-[13px] text-[#4A5560]">
                  Clear digital scans or photographs
                </p>
              </div>
            </div>

            <ul className="space-y-2.5 sm:space-y-3 text-[13px] sm:text-[14px] text-[#191919]">
              {docRequirements.map((doc, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-[#F5F5F5] border border-[#E2E5E8]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#19B496] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#191919] block text-[13px] sm:text-[14px]">
                      {doc.title}
                    </span>
                    <span className="text-[12px] sm:text-[13px] text-[#4A5560] leading-snug">
                      {doc.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-[#e8faf6] border border-[#19B496]/40 text-[12px] sm:text-[13px] text-[#006b58] flex items-center gap-3">
            <Info className="w-5 h-5 text-[#19B496] shrink-0" />
            <span>
              Digital files can be uploaded directly during Step 5 of the online
              application form below.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
