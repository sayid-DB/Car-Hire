import React, { useState, useEffect } from 'react';
import {
  Phone,
  ArrowRight,
  Menu,
  X,
  Car,
  FileText,
  HelpCircle,
  AlertCircle,
  MapPin,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface NavbarProps {
  onApplyClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onApplyClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works', icon: ShieldCheck },
    { name: 'Vehicle Plans', href: '#vehicle-plans', icon: Car },
    { name: 'Requirements', href: '#requirements', icon: FileText },
    { name: 'Deposit Terms', href: '#important-terms', icon: AlertCircle },
    { name: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleApplyFromNav = () => {
    setMobileMenuOpen(false);
    onApplyClick();
  };

  return (
    <>
      <header
        id="main-navigation"
        className="bg-white/95 backdrop-blur-md border-b border-[#E2E5E8] shadow-xs sticky top-0 z-40 w-full transition-all duration-200"
      >
        <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-12 h-16 sm:h-18 md:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Brand Identity */}
          <a
            id="nav-brand-logo"
            href="#hero-section"
            onClick={(e) => handleNavClick(e, '#hero-section')}
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
            title="Croyance Auto Lease"
          >
            <div className="relative">
              <img
                src="/croyance-logo.jpg"
                alt="Croyance Group Logo"
                referrerPolicy="no-referrer"
                className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full object-cover shadow-xs border border-[#19B496]/30 group-hover:scale-105 transition-transform duration-200"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#19B496] border-2 border-white rounded-full"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[#501087] text-[15px] sm:text-[18px] md:text-[19px] tracking-tight leading-tight group-hover:text-[#35005f] transition-colors">
                Croyance Auto Lease
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#4A5560] leading-none tracking-wide hidden xs:inline sm:inline">
                Croyance Group Limited
              </span>
              <span className="text-[9px] font-mono text-[#19B496] leading-none tracking-wide xs:hidden">
                Lease-to-Own Nigeria
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Large Screens >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[13px] xl:text-[14px] font-semibold text-[#4A5560] hover:text-[#501087] transition-colors py-1 hover:border-b-2 hover:border-[#501087]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action & Toggle Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Phone link on extra wide screens */}
            <a
              id="nav-phone-direct"
              href="tel:+2349032360163"
              title="Call Office: +234 903 236 0163"
              className="hidden md:flex items-center gap-1.5 text-[#501087] text-[12px] font-bold hover:text-[#19B496] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-[#F5F5F5] border border-transparent hover:border-[#E2E5E8]"
            >
              <Phone className="w-3.5 h-3.5 text-[#19B496]" />
              <span className="font-mono tracking-tight">+234 903 236 0163</span>
            </a>

            {/* Primary Apply Button */}
            <button
              id="btn-apply-navbar"
              onClick={handleApplyFromNav}
              className="bg-[#501087] hover:bg-[#35005f] text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-xl text-[12px] sm:text-[13px] font-bold transition-all duration-150 transform active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Mobile & Tablet Clean Hamburger Toggle (< 1024px) */}
            <button
              id="btn-mobile-nav-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-[#4A5560] hover:text-[#501087] hover:bg-[#F5F5F5] active:bg-[#E2E5E8] transition-colors cursor-pointer border border-[#E2E5E8]"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Clean Slide-Over Navigation Drawer (Mobile & Tablet) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-full bg-white shadow-2xl flex flex-col z-10 animate-slideInRight border-l border-[#E2E5E8]">
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-[#E2E5E8] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <img
                  src="/croyance-logo.jpg"
                  alt="Croyance Logo"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-[#19B496]/40"
                />
                <div>
                  <div className="text-[15px] font-bold text-[#501087] leading-none">
                    Croyance Auto Lease
                  </div>
                  <div className="text-[10px] font-mono text-[#4A5560] mt-0.5">
                    Menu &amp; Program Links
                  </div>
                </div>
              </div>
              <button
                type="button"
                id="btn-close-mobile-menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F5F5F5] hover:bg-[#E2E5E8] text-[#4A5560] hover:text-[#501087] transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 custom-scrollbar">
              {/* Navigation Links */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C96A0] font-bold px-2 block mb-2">
                  Program Overview
                </span>
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-semibold text-[#191919] hover:bg-[#f0dbff]/30 hover:text-[#501087] active:bg-[#f0dbff]/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#501087]/10 flex items-center justify-center text-[#501087]">
                            <IconComponent className="w-3.5 h-3.5 text-[#501087]" />
                          </div>
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#8C96A0]" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Main Action Button */}
              <div>
                <button
                  type="button"
                  id="btn-drawer-apply"
                  onClick={handleApplyFromNav}
                  className="w-full h-12 bg-[#501087] hover:bg-[#35005f] text-white font-bold text-[13px] sm:text-[14px] rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
                >
                  <span>Start Lease Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Direct Support Options */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C96A0] font-bold px-2 block mb-2">
                  Direct Contact & Support
                </span>
                <div className="space-y-2">
                  <a
                    href="tel:+2349032360163"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F5F5F5] border border-[#E2E5E8] text-[#501087] font-bold text-[13px] active:bg-[#E2E5E8] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#501087] text-white flex items-center justify-center">
                        <Phone className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span>Call Office: +234 903 236 0163</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#8C96A0]">
                      Direct
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#E2E5E8] bg-[#F5F5F5] text-[11px] text-[#4A5560] space-y-1">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#19B496] shrink-0 mt-0.5" />
                <span className="leading-tight">
                  43B, Church Street, Agbelekale Abule-Egba Lagos
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#8C96A0] pt-1">
                CAC/RC: 1849202
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
