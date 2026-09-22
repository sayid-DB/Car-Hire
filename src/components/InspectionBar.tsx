import React from 'react';
import { ViewportMode } from '../types.ts';
import { Laptop, Tablet, Smartphone } from 'lucide-react';

interface InspectionBarProps {
  currentMode: ViewportMode;
  onModeChange: (mode: ViewportMode) => void;
}

export const InspectionBar: React.FC<InspectionBarProps> = ({
  currentMode,
  onModeChange,
}) => {
  return (
    <aside
      id="inspection-toolbar"
      aria-label="Responsive preview toolbar"
      className="w-full bg-[#1F272D] text-white text-[13px] py-2 px-4 border-b border-[#30383e] flex items-center justify-between sticky top-0 z-50 shadow-md"
    >
      <div className="flex items-center gap-3">
        <span
          id="badge-inspection"
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#501087] text-white font-mono text-[11px] font-semibold tracking-wide shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#19B496] animate-pulse"></span>
          INSPECTION TOOL
        </span>
        <span className="hidden sm:inline text-[#99a1a9] text-[13px]">
          Preview Responsive Breakpoints:
        </span>
      </div>

      <div className="flex items-center bg-[#30383e] rounded-lg p-0.5 border border-white/10">
        <button
          id="btn-desktop"
          onClick={() => onModeChange('desktop')}
          title="Desktop View (100% / 1440px)"
          className={`px-3 py-1 rounded text-[12px] font-semibold transition-all flex items-center gap-1.5 ${
            currentMode === 'desktop'
              ? 'bg-[#501087] text-white shadow-sm'
              : 'text-[#dbe3ec] hover:text-white'
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Desktop</span>
        </button>
        <button
          id="btn-tablet"
          onClick={() => onModeChange('tablet')}
          title="Tablet View (768px)"
          className={`px-3 py-1 rounded text-[12px] font-semibold transition-all flex items-center gap-1.5 ${
            currentMode === 'tablet'
              ? 'bg-[#501087] text-white shadow-sm'
              : 'text-[#dbe3ec] hover:text-white'
          }`}
        >
          <Tablet className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Tablet (768px)</span>
        </button>
        <button
          id="btn-mobile"
          onClick={() => onModeChange('mobile')}
          title="Mobile View (390px)"
          className={`px-3 py-1 rounded text-[12px] font-semibold transition-all flex items-center gap-1.5 ${
            currentMode === 'mobile'
              ? 'bg-[#501087] text-white shadow-sm'
              : 'text-[#dbe3ec] hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Mobile (390px)</span>
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-2 text-[#bfc7cf] text-[11px] font-mono">
        <span className="text-[#19B496] font-semibold">CROYANCE GROUP</span>
        <span className="text-[#7d7483]">•</span>
        <span>LAGOS HQ: VI &amp; IKEJA</span>
        <span className="text-[#7d7483]">•</span>
        <span>ABUJA: MAITAMA</span>
      </div>
    </aside>
  );
};
