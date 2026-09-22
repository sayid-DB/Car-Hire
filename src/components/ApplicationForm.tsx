import React, { useState, ChangeEvent } from 'react';
import { VEHICLE_PLANS } from '../data/vehicleData.ts';
import { VehiclePlan, ApplicationFormData } from '../types.ts';
import {
  ArrowRight,
  ArrowLeft,
  Send,
  Upload,
  BadgeCheck,
  CreditCard,
  Receipt,
  UserCheck,
  Lock,
  CheckCircle2,
  Phone,
  Loader2,
} from 'lucide-react';

interface ApplicationFormProps {
  selectedVehicle: VehiclePlan;
  onVehicleChange: (plan: VehiclePlan) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  selectedVehicle,
  onVehicleChange,
  currentStep,
  setCurrentStep,
}) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    vehicle: selectedVehicle.name,
    fullName: '',
    dob: '',
    fullAddress: '',
    maritalStatus: '',
    phoneNumber: '',
    placeOfWork: '',
    drivingExperience: '',
    licenseNumber: '',
    depositAvailable: 'Yes',
    proofOfPaymentFile: null,
    meansOfIdFile: null,
    driversLicenseFile: null,
    nepaBillFile: null,
    guarantorIdFile: null,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const steps = [
    { number: 1, label: 'Vehicle' },
    { number: 2, label: 'Personal' },
    { number: 3, label: 'Employment' },
    { number: 4, label: 'Deposit' },
    { number: 5, label: 'Documents' },
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError(null);
  };

  const handleFileChange = (field: keyof ApplicationFormData, fileName: string) => {
    setFormData((prev) => ({ ...prev, [field]: fileName }));
    if (validationError) setValidationError(null);
  };

  const handleVehicleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const plan = VEHICLE_PLANS.find((p) => p.name === e.target.value);
    if (plan) {
      onVehicleChange(plan);
      setFormData((prev) => ({ ...prev, vehicle: plan.name }));
    }
  };

  const validateStep = (step: number): boolean => {
    if (step === 2) {
      if (!formData.fullName.trim()) {
        setValidationError('Please enter your full legal name.');
        return false;
      }
      if (!formData.dob) {
        setValidationError('Please specify your date of birth.');
        return false;
      }
      if (!formData.fullAddress.trim()) {
        setValidationError('Please provide your residential address.');
        return false;
      }
      if (!formData.maritalStatus) {
        setValidationError('Please select your marital status.');
        return false;
      }
      if (!formData.phoneNumber.trim()) {
        setValidationError('Please provide a valid Nigerian phone number.');
        return false;
      }
    }

    if (step === 3) {
      if (!formData.placeOfWork.trim()) {
        setValidationError('Please state your place of work or business name.');
        return false;
      }
      if (!formData.drivingExperience) {
        setValidationError('Please specify your driving experience.');
        return false;
      }
      if (!formData.licenseNumber.trim()) {
        setValidationError("Please enter your valid FRSC Driver's Licence number.");
        return false;
      }
    }

    if (step === 4) {
      if (!formData.proofOfPaymentFile) {
        setValidationError(
          'Please attach proof of payment ability (statement or slip).'
        );
        return false;
      }
    }

    if (step === 5) {
      if (
        !formData.meansOfIdFile ||
        !formData.driversLicenseFile ||
        !formData.nepaBillFile ||
        !formData.guarantorIdFile
      ) {
        setValidationError(
          'Please attach all four required underwriting documents before submission.'
        );
        return false;
      }
    }

    setValidationError(null);
    return true;
  };

  const scrollToFormTop = () => {
    const el = document.getElementById('application-form');
    if (el) {
      const navHeight = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(5, currentStep + 1));
      scrollToFormTop();
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
    setValidationError(null);
    scrollToFormTop();
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    const ref = `CAL-${new Date().getFullYear()}-${Math.floor(
      10000 + Math.random() * 90000
    )}`;
    setReferenceNumber(ref);
    setIsSubmitting(true);

    try {
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          vehicle: selectedVehicle.name,
          referenceNumber: ref,
        }),
      });
    } catch (err) {
      console.error('Error saving application to server database:', err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setCurrentStep(1);
    setFormData({
      vehicle: selectedVehicle.name,
      fullName: '',
      dob: '',
      fullAddress: '',
      maritalStatus: '',
      phoneNumber: '',
      placeOfWork: '',
      drivingExperience: '',
      licenseNumber: '',
      depositAvailable: 'Yes',
      proofOfPaymentFile: null,
      meansOfIdFile: null,
      driversLicenseFile: null,
      nepaBillFile: null,
      guarantorIdFile: null,
    });
    setValidationError(null);
  };

  return (
    <section
      id="application-form"
      className="py-14 sm:py-16 md:py-20 bg-[#F5F5F5] border-t border-[#E2E5E8] w-full"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-8 sm:mb-10">
          <span className="font-mono text-[10px] sm:text-[11px] text-[#19B496] uppercase tracking-widest font-bold block mb-2">
            Direct Underwriting Portal
          </span>
          <h2 className="text-[26px] sm:text-[30px] md:text-[34px] text-[#501087] tracking-tight font-extrabold mb-2">
            Start Your Lease-to-Own Application
          </h2>
          <p className="text-[15px] sm:text-[17px] md:text-[18px] text-[#4A5560]">
            Tell us about yourself and the vehicle you're interested in.
          </p>
        </div>

        {/* Responsive Step Indicator */}
        <div className="mb-6 sm:mb-10">
          {/* Mobile Step Header (< 640px) */}
          <div className="sm:hidden bg-white p-4 rounded-2xl border border-[#E2E5E8] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-mono font-bold text-[#501087] uppercase tracking-wider">
                Step {currentStep} of 5: {steps[currentStep - 1].label}
              </span>
              <span className="text-[12px] font-mono text-[#19B496] font-bold">
                {Math.round((currentStep / 5) * 100)}%
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#E2E5E8] rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-[#501087] transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
            {/* Step Pills */}
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {steps.map((s) => {
                const isCurrent = currentStep === s.number;
                const isCompleted = currentStep > s.number;
                return (
                  <button
                    key={s.number}
                    type="button"
                    onClick={() => {
                      if (s.number < currentStep) setCurrentStep(s.number);
                    }}
                    className={`py-1.5 text-center rounded-lg text-[11px] font-mono font-bold transition-all ${
                      isCurrent
                        ? 'bg-[#501087] text-white shadow-xs'
                        : isCompleted
                        ? 'bg-[#e8faf6] text-[#006b58]'
                        : 'bg-[#F5F5F5] text-[#8C96A0]'
                    }`}
                  >
                    {s.number}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tablet & Desktop Stepper (>= 640px) */}
          <div className="hidden sm:block">
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => {
                const isCurrent = currentStep === s.number;
                const isCompleted = currentStep > s.number;

                return (
                  <React.Fragment key={s.number}>
                    <div
                      id={`step-indicator-${s.number}`}
                      onClick={() => {
                        if (s.number < currentStep) {
                          setCurrentStep(s.number);
                        }
                      }}
                      className={`flex flex-col items-center cursor-pointer transition-opacity ${
                        isCurrent || isCompleted ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full font-bold flex items-center justify-center font-mono text-sm transition-all shadow-xs ${
                          isCurrent
                            ? 'bg-[#501087] text-white ring-4 ring-[#501087]/20 scale-105'
                            : isCompleted
                            ? 'bg-[#19B496] text-white'
                            : 'bg-[#E2E5E8] text-[#191919]'
                        }`}
                      >
                        {s.number}
                      </div>
                      <span
                        className={`text-[11px] md:text-[12px] font-semibold mt-2 text-center whitespace-nowrap ${
                          isCurrent
                            ? 'text-[#501087] font-bold'
                            : isCompleted
                            ? 'text-[#19B496]'
                            : 'text-[#8C96A0]'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>

                    {idx < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 transition-colors ${
                          currentStep > idx + 1 ? 'bg-[#19B496]' : 'bg-[#E2E5E8]'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Card Container */}
        <div className="bg-white border border-[#E2E5E8] rounded-2xl p-5 sm:p-8 md:p-10 shadow-xs">
          {validationError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] sm:text-[14px]">
              {validationError}
            </div>
          )}

          {!formSubmitted ? (
            <form id="lease-application-form" onSubmit={handleSubmit}>
              {/* STEP 1: VEHICLE SELECTION */}
              {currentStep === 1 && (
                <div id="step-1" className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-[19px] sm:text-[22px] font-bold text-[#191919] mb-1">
                      Step 1: Select Your Vehicle
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-[#4A5560]">
                      Choose the vehicle configuration for your 24-month lease tenure.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="vehicle_selection"
                      className="block text-[13px] text-[#191919] font-semibold mb-2"
                    >
                      Select Your Vehicle *
                    </label>
                    <select
                      id="vehicle_selection"
                      value={selectedVehicle.name}
                      onChange={handleVehicleSelect}
                      className="w-full h-12 px-4 rounded-xl border border-[#E2E5E8] bg-white focus:border-[#501087] focus:ring-2 focus:ring-[#501087]/20 text-[16px] sm:text-[14px] text-[#191919] outline-none transition-all"
                    >
                      {VEHICLE_PLANS.map((v) => (
                        <option key={v.id} value={v.name}>
                          {v.name} — {v.monthlyFormatted}/month
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Live Summary Breakdown Card */}
                  <div className="p-4 sm:p-6 rounded-xl bg-[#F5F5F5] border border-[#E2E5E8] space-y-3 font-mono">
                    <span className="text-[10px] sm:text-[11px] text-[#19B496] uppercase tracking-wider font-bold block">
                      Live Financial Breakdown
                    </span>
                    <div className="flex justify-between items-center text-[13px] sm:text-[14px]">
                      <span className="text-[#4A5560]">Selected Model:</span>
                      <span
                        id="summary-model"
                        className="font-bold text-[#191919] text-right"
                      >
                        {selectedVehicle.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] sm:text-[14px]">
                      <span className="text-[#4A5560]">Total Vehicle Cost:</span>
                      <span id="summary-cost" className="font-bold text-[#191919]">
                        {selectedVehicle.totalCostFormatted}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] sm:text-[14px]">
                      <span className="text-[#4A5560]">Required 30% Deposit:</span>
                      <span id="summary-deposit" className="font-bold text-[#501087]">
                        {selectedVehicle.depositFormatted}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] sm:text-[14px]">
                      <span className="text-[#4A5560]">
                        Monthly Payment:
                      </span>
                      <span
                        id="summary-monthly"
                        className="font-bold text-[16px] sm:text-[20px] text-[#501087]"
                      >
                        {selectedVehicle.monthlyFormatted} / mo
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] sm:text-[12px] text-[#8C96A0] border-t border-[#E2E5E8] pt-2.5 sm:pt-3">
                      <span>Registration Fee:</span>
                      <span className="text-[#191919] font-medium">
                        {selectedVehicle.registrationCostFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3 sm:pt-4">
                    <button
                      type="button"
                      id="btn-step-1-next"
                      onClick={nextStep}
                      className="w-full sm:w-auto h-12 px-6 sm:px-7 bg-[#501087] hover:bg-[#35005f] text-white rounded-xl text-[13px] sm:text-[14px] font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98"
                    >
                      <span>Continue to Personal Information</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PERSONAL INFORMATION */}
              {currentStep === 2 && (
                <div id="step-2" className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-[19px] sm:text-[22px] font-bold text-[#191919] mb-1">
                      Step 2: Personal Information
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-[#4A5560]">
                      Provide your legal identity records matching your official
                      documentation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="full_name"
                        className="block text-[13px] text-[#191919] font-semibold mb-2"
                      >
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Babatunde Olumide Adeyemi"
                        required
                        className="w-full h-12 px-4 rounded-xl border border-[#E2E5E8] bg-white focus:border-[#501087] focus:ring-2 focus:ring-[#501087]/20 text-[16px] sm:text-[14px] text-[#191919] outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-[13px] text-[#191919] font-semibold mb-2"
                      >
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        required
                        className="w-full h-12 px-4 rounded-xl border border-[#E2E5E8] bg-white focus:border-[#501087] focus:ring-2 focus:ring-[#501087]/20 text-[16px] sm:text-[14px] text-[#191919] outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="full_address"
                        className="block text-[13px] text-[#191919] font-semibold mb-2"
                      >
                        Full Residential Address *
                      </label>
                      <input
                        type="text"
                        id="full_address"
                        name="fullAddress"
                        value={formData.fullAddress}
                        onChange={handleInputChange}
                        placeholder="Residential address (must match NEPA bill)"
                        required
                        className="w-full h-12 px-4 rounded-xl border border-[#E2E5E8] bg-white focus:border-[#501087] focus:ring-2 focus:ring-[#501087]/20 text-[16px] sm:text-[14px] text-[#191919] outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="marital_status"
                        className="block text-[13px] text-[#191919] font-semibold mb-2"
                      >
                        Marital Status *
                      </label>
                      <select
                        id="marital_status"
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleInputChange}
                        required
                        className="w-full h-12 px-4 rounded-xl border border-[#E2E5E8] bg-white focus:border-[#501087] focus:ring-2 focus:ring-[#501087]/20 text-[16px] sm:text-[14px] text-[#191919] outline-none"
                      >
                        <option value="">Select status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="phone_number"
                        className="block text-[13px] text-[#191919] font-semibold mb-2"
                      >
                        Active Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone_number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="080XXXXXXXX or +234..."
                        required
                        className="w-full h-12 px-4 rounded-xl border border-[#E2E5E8] bg-white focus:border-[#501087] focus:ring-2 focus:ring-[#501087]/20 text-[16px] sm:text-[14px] text-[#191919] outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#E2E5E8]">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto h-12 px-6 border border-[#8C96A0] text-[#191919] hover:bg-[#F5F5F5] rounded-xl text-[13px] sm:text-[14px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full sm:w-auto h-12 px-6 sm:px-7 bg-[#501087] hover:bg-[#35005f] text-white rounded-xl text-[13px] sm:text-[14px] font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98"
                    >
                      <span>Continue to Employment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: EMPLOYMENT & DRIVING */}
              {currentStep === 3 && (
                <div id="step-3" className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-[19px] sm:text-[22px] font-bold text-[#191919] mb-1">
                      Step 3: Employment &amp; Driving
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-[#4A5560]">
                      Occupational verification and driving qualification records.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="place_of_work"
                        className="block text-[13px] text-[#191919] font-semibold mb-2"
                      >
                        Place of Work / Business Name &amp; Address *
                      </label>
                      <input
                        type="text"
                        id="place_of_work"
                        name="placeOfWork"
                        value={formData.placeOfWork}
                        onChange={handleInputChange}
                        placeholder="Company or Business Name & Office Address"
                        required
                        className="w-full h-12 px-4 rounded-xl border border-[#E2E5E8] bg-white focus:border-[#501087] focus:ring-2 focus:ring-[#501087]/20 text-[16px] sm:text-[14px] text-[#191919] outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="driving_experience"
                        className="block text-[13px] text-[#191919] font-semibold mb-2"
                      >
                        Driving Experience *
                      </label>
                      <select
                        id="driving_experience"
                        name="drivingExperience"
                        value={formData.drivingExperience}
                        onChange={handleInputChange}
                        required
                        className="w-full h-12 px-4 rounded-xl border border-[#E2E5E8] bg-white focus:border-[#501087] focus:ring-2 focus:ring-[#501087]/20 text-[16px] sm:text-[14px] text-[#191919] outline-none"
                      >
                        <option value="">Select experience</option>
                        <option value="1-3 years">1–3 years active driving</option>
                        <option value="3-5 years">3–5 years active driving</option>
                        <option value="5-10 years">5–10 years active driving</option>
                        <option value="10+ years">10+ years active driving</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="license_number"
                        className="block text-[13px] text-[#191919] font-semibold mb-2"
                      >
                        Driver's Licence Number (FRSC) *
                      </label>
                      <input
                        type="text"
                        id="license_number"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        placeholder="FRSC Number (e.g. AAA00000AA0)"
                        required
                        className="w-full h-12 px-4 rounded-xl border border-[#E2E5E8] bg-white focus:border-[#501087] focus:ring-2 focus:ring-[#501087]/20 text-[16px] sm:text-[14px] uppercase font-mono text-[#191919] outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#E2E5E8]">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto h-12 px-6 border border-[#8C96A0] text-[#191919] hover:bg-[#F5F5F5] rounded-xl text-[13px] sm:text-[14px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full sm:w-auto h-12 px-6 sm:px-7 bg-[#501087] hover:bg-[#35005f] text-white rounded-xl text-[13px] sm:text-[14px] font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98"
                    >
                      <span>Continue to Deposit</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: PAYMENT CONFIRMATION */}
              {currentStep === 4 && (
                <div id="step-4" className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-[19px] sm:text-[22px] font-bold text-[#191919] mb-1">
                      Step 4: Deposit &amp; Payment Confirmation
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-[#4A5560]">
                      Confirm your liquidity for the required 30% upfront lease deposit (
                      {selectedVehicle.depositFormatted}).
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[13px] text-[#191919] font-semibold">
                      Do you have the required 30% deposit available? *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <label
                        className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                          formData.depositAvailable === 'Yes'
                            ? 'border-[#501087] bg-[#f0dbff]/20'
                            : 'border-[#E2E5E8] bg-[#F5F5F5]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="depositAvailable"
                          value="Yes"
                          checked={formData.depositAvailable === 'Yes'}
                          onChange={handleInputChange}
                          className="accent-[#501087] w-4 h-4"
                        />
                        <span className="font-medium text-[13px] sm:text-[14px] text-[#191919]">
                          Yes, available within 7 business days
                        </span>
                      </label>

                      <label
                        className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                          formData.depositAvailable === 'No'
                            ? 'border-[#501087] bg-[#f0dbff]/20'
                            : 'border-[#E2E5E8] bg-[#F5F5F5]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="depositAvailable"
                          value="No"
                          checked={formData.depositAvailable === 'No'}
                          onChange={handleInputChange}
                          className="accent-[#501087] w-4 h-4"
                        />
                        <span className="font-medium text-[13px] sm:text-[14px] text-[#191919]">
                          No, will require additional time
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] text-[#191919] font-semibold mb-2">
                      Proof of Down Payment Capability *
                    </label>
                    <label className="border-2 border-dashed border-[#E2E5E8] hover:border-[#501087] rounded-xl p-5 sm:p-6 text-center bg-[#F5F5F5]/60 cursor-pointer block transition-colors">
                      <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-[#501087] mx-auto mb-2" />
                      <span className="block text-[13px] sm:text-[14px] font-medium text-[#191919]">
                        {formData.proofOfPaymentFile
                          ? `Selected: ${formData.proofOfPaymentFile}`
                          : 'Upload Bank Statement / Proof of Funds'}
                      </span>
                      <span className="text-[11px] sm:text-[12px] text-[#8C96A0] mt-1 block">
                        PDF, JPG, or PNG (Max 5MB)
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileChange(
                              'proofOfPaymentFile',
                              e.target.files[0].name
                            );
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#E2E5E8]">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto h-12 px-6 border border-[#8C96A0] text-[#191919] hover:bg-[#F5F5F5] rounded-xl text-[13px] sm:text-[14px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full sm:w-auto h-12 px-6 sm:px-7 bg-[#501087] hover:bg-[#35005f] text-white rounded-xl text-[13px] sm:text-[14px] font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98"
                    >
                      <span>Continue to Document Uploads</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: DOCUMENT UPLOADS */}
              {currentStep === 5 && (
                <div id="step-5" className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-[19px] sm:text-[22px] font-bold text-[#191919] mb-1">
                      Step 5: Document Uploads
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-[#4A5560]">
                      Attach digital copies of required underwriting documents.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {/* Means of ID */}
                    <div className="border border-[#E2E5E8] rounded-xl p-4 bg-[#F5F5F5]">
                      <div className="flex items-center gap-2 mb-2">
                        <BadgeCheck className="w-4 h-4 text-[#501087] shrink-0" />
                        <span className="font-bold text-[#191919] text-[13px] sm:text-[14px]">
                          Means of ID *
                        </span>
                      </div>
                      <input
                        type="file"
                        required
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileChange('meansOfIdFile', e.target.files[0].name);
                          }
                        }}
                        className="block w-full text-[12px] text-[#8C96A0] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-[#501087] file:text-white hover:file:bg-[#35005f] cursor-pointer"
                      />
                      {formData.meansOfIdFile && (
                        <span className="text-[11px] text-[#19B496] mt-1.5 flex items-center gap-1 font-medium truncate">
                          <CheckCircle2 className="w-3 h-3 shrink-0" /> Attached:{' '}
                          {formData.meansOfIdFile}
                        </span>
                      )}
                    </div>

                    {/* Driver's Licence */}
                    <div className="border border-[#E2E5E8] rounded-xl p-4 bg-[#F5F5F5]">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="w-4 h-4 text-[#501087] shrink-0" />
                        <span className="font-bold text-[#191919] text-[13px] sm:text-[14px]">
                          Driver's Licence *
                        </span>
                      </div>
                      <input
                        type="file"
                        required
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileChange(
                              'driversLicenseFile',
                              e.target.files[0].name
                            );
                          }
                        }}
                        className="block w-full text-[12px] text-[#8C96A0] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-[#501087] file:text-white hover:file:bg-[#35005f] cursor-pointer"
                      />
                      {formData.driversLicenseFile && (
                        <span className="text-[11px] text-[#19B496] mt-1.5 flex items-center gap-1 font-medium truncate">
                          <CheckCircle2 className="w-3 h-3 shrink-0" /> Attached:{' '}
                          {formData.driversLicenseFile}
                        </span>
                      )}
                    </div>

                    {/* NEPA Bill */}
                    <div className="border border-[#E2E5E8] rounded-xl p-4 bg-[#F5F5F5]">
                      <div className="flex items-center gap-2 mb-2">
                        <Receipt className="w-4 h-4 text-[#501087] shrink-0" />
                        <span className="font-bold text-[#191919] text-[13px] sm:text-[14px]">
                          NEPA Bill showing Address *
                        </span>
                      </div>
                      <input
                        type="file"
                        required
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileChange('nepaBillFile', e.target.files[0].name);
                          }
                        }}
                        className="block w-full text-[12px] text-[#8C96A0] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-[#501087] file:text-white hover:file:bg-[#35005f] cursor-pointer"
                      />
                      {formData.nepaBillFile && (
                        <span className="text-[11px] text-[#19B496] mt-1.5 flex items-center gap-1 font-medium truncate">
                          <CheckCircle2 className="w-3 h-3 shrink-0" /> Attached:{' '}
                          {formData.nepaBillFile}
                        </span>
                      )}
                    </div>

                    {/* Guarantor ID */}
                    <div className="border border-[#E2E5E8] rounded-xl p-4 bg-[#F5F5F5]">
                      <div className="flex items-center gap-2 mb-2">
                        <UserCheck className="w-4 h-4 text-[#501087] shrink-0" />
                        <span className="font-bold text-[#191919] text-[13px] sm:text-[14px]">
                          Guarantor ID *
                        </span>
                      </div>
                      <input
                        type="file"
                        required
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileChange(
                              'guarantorIdFile',
                              e.target.files[0].name
                            );
                          }
                        }}
                        className="block w-full text-[12px] text-[#8C96A0] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-[#501087] file:text-white hover:file:bg-[#35005f] cursor-pointer"
                      />
                      {formData.guarantorIdFile && (
                        <span className="text-[11px] text-[#19B496] mt-1.5 flex items-center gap-1 font-medium truncate">
                          <CheckCircle2 className="w-3 h-3 shrink-0" /> Attached:{' '}
                          {formData.guarantorIdFile}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Trust Verification Box */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#e8faf6] border border-[#19B496]/40 flex items-start gap-3">
                    <Lock className="w-5 h-5 text-[#19B496] shrink-0 mt-0.5" />
                    <p className="text-[12px] sm:text-[13px] text-[#006b58] leading-relaxed">
                      Your information is securely handled in compliance with
                      regulatory standards for vehicle lease underwriting.
                    </p>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#E2E5E8]">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto h-12 px-6 border border-[#8C96A0] text-[#191919] hover:bg-[#F5F5F5] rounded-xl text-[13px] sm:text-[14px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      id="btn-submit-application"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto h-12 px-8 py-3 bg-[#501087] hover:bg-[#35005f] text-white rounded-xl text-[13px] sm:text-[14px] font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>SUBMITTING...</span>
                        </>
                      ) : (
                        <>
                          <span>SUBMIT APPLICATION</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* SUCCESS CONFIRMATION MODAL STATE */
            <div
              id="form-success-banner"
              className="text-center py-8 sm:py-10 space-y-4 sm:space-y-5"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#e8faf6] border-2 border-[#19B496] flex items-center justify-center text-[#19B496] mx-auto shadow-xs">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div>
                <h3 className="text-[20px] sm:text-[24px] font-bold text-[#501087]">
                  Application Submitted Successfully
                </h3>
                <div className="mt-1 font-mono text-[12px] sm:text-[13px] text-[#4A5560]">
                  Reference ID:{' '}
                  <span className="font-bold text-[#501087]">{referenceNumber}</span>
                </div>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-[#F5F5F5] border border-[#E2E5E8] text-left text-[12px] sm:text-[13px] font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#4A5560]">Selected Vehicle:</span>
                  <span className="font-bold text-[#191919]">
                    {selectedVehicle.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5560]">Applicant:</span>
                  <span className="font-bold text-[#191919]">
                    {formData.fullName || 'Registered Applicant'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5560]">Required 30% Deposit:</span>
                  <span className="font-bold text-[#501087]">
                    {selectedVehicle.depositFormatted}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A5560]">Monthly Installment:</span>
                  <span className="font-bold text-[#191919]">
                    {selectedVehicle.monthlyFormatted} / mo
                  </span>
                </div>
              </div>

              <p className="text-[13px] sm:text-[14px] text-[#4A5560] max-w-lg mx-auto leading-relaxed">
                Thank you. Your Lease-to-Own file has been registered in the
                underwriting system. An Underwriting Specialist will contact you
                and your guarantor within 24 business hours to verify your 30%
                deposit allocation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <a
                  id="btn-forward-whatsapp-application"
                  href={`https://wa.me/2347062343398?text=${encodeURIComponent(
                    `*CROYANCE LEASE-TO-OWN APPLICATION*\n• Reference ID: ${referenceNumber}\n• Vehicle: ${selectedVehicle.name}\n• Applicant Name: ${formData.fullName}\n• Phone Number: ${formData.phoneNumber}\n• Address: ${formData.fullAddress}\n• Place of Work: ${formData.placeOfWork}\n• Driving Experience: ${formData.drivingExperience}\n• Driver License No: ${formData.licenseNumber}\n• 30% Deposit: Available within 7 business days (${selectedVehicle.depositFormatted})\n• Documents: Provided on form`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-xl text-[13px] font-bold shadow-xs transition-all cursor-pointer text-center"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Forward Details to WhatsApp</span>
                </a>

                <button
                  type="button"
                  id="btn-reset-form"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3.5 border-2 border-[#501087] text-[#501087] rounded-xl text-[13px] font-bold hover:bg-[#f0dbff]/30 transition-colors cursor-pointer"
                >
                  Submit Another Vehicle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
