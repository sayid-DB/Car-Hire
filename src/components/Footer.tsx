import React from 'react';
import { Phone, MapPin, ExternalLink, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer
      id="main-footer"
      className="bg-[#1F272D] border-t border-[#30383e] text-white w-full"
    >
      <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6 space-y-4">
            <a
              id="footer-brand-logo"
              href="https://croyancegroup.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Croyance Group Homepage"
              className="inline-flex items-center gap-3 group"
            >
              <img
                src="/croyance-logo.jpg"
                alt="Croyance Group of Companies Limited"
                referrerPolicy="no-referrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-[#19B496]/40 group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-[18px] sm:text-[20px] font-bold text-white tracking-tight group-hover:text-[#19B496] transition-colors flex items-center gap-1.5">
                  Croyance Auto Lease
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </span>
                <span className="text-[11px] font-mono text-[#bfc7cf]">
                  Croyance Group of Companies Limited
                </span>
              </div>
            </a>
            <div className="pt-1 text-[12px] text-[#bfc7cf] flex items-start gap-2 bg-[#283239] p-3.5 rounded-xl border border-[#37434c] max-w-md">
              <MapPin className="w-4 h-4 text-[#19B496] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block text-[11px] uppercase tracking-wider font-mono">
                  New Head Office Address:
                </span>
                <span className="leading-snug">
                  43B, Church Street, Agbelekale Abule-Egba Lagos state Nigeria
                </span>
              </div>
            </div>
          </div>

          {/* Institutional Links & Direct Contact */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C96A0] mb-1 font-bold">
                Direct Contact
              </span>
              <a
                id="footer-tel-contact"
                href="tel:+2349032360163"
                className="text-[#19B496] hover:underline font-bold text-[14px] flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+234 903 236 0163</span>
              </a>
              <a
                href="https://croyancegroup.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#bfc7cf] hover:text-white text-[13px] transition-colors flex items-center gap-1"
              >
                <span>Official Site: croyancegroup.com</span>
                <ExternalLink className="w-3 h-3 text-[#19B496]" />
              </a>
            </div>

            <div className="flex flex-col space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C96A0] mb-1 font-bold">
                Program Links
              </span>
              <a
                href="#vehicle-plans"
                className="text-[#bfc7cf] hover:text-white text-[13px] transition-colors"
              >
                Available Vehicle Fleet
              </a>
              <a
                href="#requirements"
                className="text-[#bfc7cf] hover:text-white text-[13px] transition-colors"
              >
                Documents &amp; Requirements
              </a>
              <a
                href="#important-terms"
                className="text-[#bfc7cf] hover:text-white text-[13px] transition-colors"
              >
                30% Deposit Terms (7 Days)
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#30383e] pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C96A0] font-mono text-center sm:text-left">
          <div>
            © 2025 Croyance Group of Companies Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-3 text-[#bfc7cf]">
            <span>CAC/RC: 1849202</span>
            {onOpenAdmin && (
              <button
                type="button"
                id="btn-admin-lock-portal"
                onClick={onOpenAdmin}
                title="Internal Portal"
                className="text-[#55606a] hover:text-[#19B496] transition-colors p-1 cursor-pointer"
                aria-label="Internal Portal"
              >
                <Lock className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
