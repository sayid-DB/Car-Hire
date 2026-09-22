import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/vehicleData.ts';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<number[]>([]);

  const toggleFaq = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq"
      className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto w-full"
    >
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <span className="font-mono text-[10px] sm:text-[11px] text-[#19B496] uppercase tracking-widest font-bold block mb-2">
          Clarity &amp; Terms
        </span>
        <h2 className="text-[26px] sm:text-[30px] md:text-[32px] text-[#501087] tracking-tight font-extrabold mb-2.5 sm:mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-[15px] sm:text-[17px] md:text-[18px] text-[#4A5560]">
          Essential insights into the Croyance Auto Lease finance mechanism.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openIds.includes(item.id);

          return (
            <div
              key={item.id}
              id={`faq-item-${item.id}`}
              className="border border-[#E2E5E8] rounded-2xl overflow-hidden bg-white shadow-xs transition-all"
            >
              <button
                type="button"
                id={`btn-faq-toggle-${item.id}`}
                onClick={() => toggleFaq(item.id)}
                className="w-full p-4 sm:p-5 text-left flex justify-between items-center hover:bg-[#F5F5F5] transition-colors cursor-pointer"
              >
                <span className="font-bold text-[#191919] text-[15px] sm:text-[17px] pr-2">
                  {item.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#501087] shrink-0 ml-2 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#8C96A0] shrink-0 ml-2 transition-transform duration-200" />
                )}
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${item.id}`}
                  className="p-4 sm:p-5 pt-0 text-[13px] sm:text-[14px] text-[#4A5560] border-t border-[#E2E5E8] leading-relaxed bg-[#F5F5F5]/40"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
