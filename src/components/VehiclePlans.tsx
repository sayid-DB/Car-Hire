import React from 'react';
import { VehiclePlan } from '../types.ts';
import { VEHICLE_PLANS } from '../data/vehicleData.ts';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface VehiclePlansProps {
  onSelectVehicle: (plan: VehiclePlan) => void;
}

export const VehiclePlans: React.FC<VehiclePlansProps> = ({ onSelectVehicle }) => {
  return (
    <section
      id="vehicle-plans"
      className="py-14 sm:py-16 md:py-20 bg-[#F5F5F5] border-y border-[#E2E5E8] w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#19B496] uppercase tracking-widest font-bold block mb-1.5 sm:mb-2">
              Verified Inventory
            </span>
            <h2 className="text-[26px] sm:text-[30px] md:text-[34px] text-[#501087] tracking-tight font-extrabold">
              Choose Your Vehicle
            </h2>
            <p className="text-[15px] sm:text-[17px] md:text-[18px] text-[#4A5560] mt-1">
              Explore our available Lease-to-Own vehicle options.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold text-[#191919] bg-white px-3.5 py-2 rounded-full border border-[#19B496]/40 shadow-xs self-start md:self-auto">
            <CheckCircle2 className="w-4 h-4 text-[#19B496] shrink-0" />
            <span>Verified registration &amp; roadworthiness</span>
          </div>
        </div>

        {/* 4 Cards Responsive Grid (1 col on mobile, 2 cols on tablet, 4 cols on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {VEHICLE_PLANS.map((plan) => (
            <div
              key={plan.id}
              id={`vehicle-card-${plan.id}`}
              className="bg-white border border-[#E2E5E8] rounded-2xl overflow-hidden shadow-xs flex flex-col hover:border-[#501087] hover:shadow-lg transition-all"
            >
              {/* Vehicle Image Container */}
              <div className="relative h-44 sm:h-48 bg-[#1F272D] overflow-hidden group">
                <img
                  src={plan.imageUrl}
                  alt={plan.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md font-mono text-[10px] text-[#501087] font-bold border border-[#501087]/20 shadow-xs">
                  {plan.tag}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-[#191919] mb-3 sm:mb-4 leading-snug sm:min-h-[48px]">
                    {plan.name}
                  </h3>
                  <div className="space-y-2.5 sm:space-y-3 font-mono text-[12px] sm:text-[13px] border-t border-[#E2E5E8] pt-3.5 sm:pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#4A5560]">Total cost:</span>
                      <span className="font-bold text-[#191919]">
                        {plan.totalCostFormatted}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#4A5560]">30% deposit:</span>
                      <span className="font-bold text-[#501087]">
                        {plan.depositFormatted}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#4A5560]">Payment period:</span>
                      <span className="text-[#191919] font-medium">
                        {plan.paymentPeriodMonths} months
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-[#8C96A0]">Registration cost:</span>
                      <span className="text-[#191919]">
                        {plan.registrationCostFormatted}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E2E5E8]">
                  <div className="mb-3.5 sm:mb-4">
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#8C96A0] uppercase tracking-wider block font-semibold">
                      MONTHLY PAYMENT
                    </span>
                    <div className="text-[22px] sm:text-[24px] font-mono font-bold text-[#501087]">
                      {plan.monthlyFormatted}
                      <span className="text-[12px] sm:text-[13px] font-normal text-[#4A5560]">
                        /mo
                      </span>
                    </div>
                  </div>
                  <button
                    id={`btn-apply-vehicle-${plan.id}`}
                    type="button"
                    onClick={() => onSelectVehicle(plan)}
                    className="w-full h-11 py-2.5 px-4 bg-[#501087] hover:bg-[#35005f] text-white rounded-xl text-[13px] font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
                  >
                    <span>Apply for this vehicle</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
