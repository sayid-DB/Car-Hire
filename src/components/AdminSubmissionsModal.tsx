import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Users,
  RefreshCw,
  Phone,
  Mail,
  Car,
  FileText,
  CheckCircle,
  Lock,
  KeyRound,
  ShieldCheck,
  Send,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface StoredApplication {
  referenceNumber: string;
  submittedAt: string;
  vehicle: string;
  fullName: string;
  dob: string;
  fullAddress: string;
  maritalStatus: string;
  phoneNumber: string;
  placeOfWork: string;
  drivingExperience: string;
  licenseNumber: string;
  depositAvailable: string;
  proofOfPaymentFile?: string | null;
  meansOfIdFile?: string | null;
  driversLicenseFile?: string | null;
  nepaBillFile?: string | null;
  guarantorIdFile?: string | null;
}

interface AdminSubmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSubmissionsModal: React.FC<AdminSubmissionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [applications, setApplications] = useState<StoredApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<StoredApplication | null>(null);
  const [adminEmail, setAdminEmail] = useState('info@croyancegroup.com');
  const [smtpConfigured, setSmtpConfigured] = useState(false);
  const [testEmailLoading, setTestEmailLoading] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'submissions' | 'email-settings'>(
    'submissions'
  );

  const handleVerifyPin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.authorized) {
        setIsAuthorized(true);
        if (data.adminEmail) setAdminEmail(data.adminEmail);
        setSmtpConfigured(Boolean(data.smtpConfigured));
        fetchApplications(pin.trim());
      } else {
        setAuthError(data.error || 'Invalid Admin PIN. Access denied.');
      }
    } catch (err) {
      setAuthError('Connection error validating PIN.');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (authPin: string = pin.trim()) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/applications?pin=${encodeURIComponent(authPin)}`, {
        headers: { 'x-admin-pin': authPin },
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
        if (data.adminEmail) setAdminEmail(data.adminEmail);
        setSmtpConfigured(Boolean(data.smtpConfigured));
      } else {
        setIsAuthorized(false);
        setAuthError('Session expired or PIN no longer valid.');
      }
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestEmail = async () => {
    setTestEmailLoading(true);
    setTestEmailResult(null);
    try {
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pin.trim(),
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTestEmailResult(
          data.result?.sent
            ? `✓ Test email delivered to ${data.recipient}`
            : `ℹ ${data.result?.message || 'Email queued (configure SMTP to send live)'}`
        );
      } else {
        setTestEmailResult(`Failed: ${data.error || 'Unable to test email'}`);
      }
    } catch (err) {
      setTestEmailResult('Network error sending test email.');
    } finally {
      setTestEmailLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setPin('');
    setApplications([]);
    setSelectedApp(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen && isAuthorized) {
      fetchApplications();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="admin-submissions-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden border border-[#E2E5E8]">
        {/* Header */}
        <div className="px-6 py-5 bg-[#501087] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#19B496]" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold">
                Underwriting &amp; Executive Admin Portal
              </h2>
              <p className="text-[12px] text-white/80">
                Private management database for submitted lease applications
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthorized && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      activeTab === 'submissions'
                        ? 'email-settings'
                        : 'submissions'
                    )
                  }
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'email-settings'
                      ? 'bg-white text-[#501087]'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Settings</span>
                </button>
                <a
                  href={`/api/applications/export?pin=${encodeURIComponent(
                    pin.trim()
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#19B496] hover:bg-[#149980] text-white text-[12px] font-bold rounded-lg transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV (Excel)</span>
                </a>
                <button
                  onClick={() => fetchApplications()}
                  title="Refresh list"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                  />
                </button>
              </>
            )}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close and lock"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isAuthorized ? (
          /* PIN SECURITY LOGIN SCREEN */
          <div className="p-8 sm:p-12 text-center bg-[#F5F5F5]/60 flex flex-col items-center justify-center my-auto min-h-[380px]">
            <div className="w-16 h-16 rounded-2xl bg-[#501087]/10 border border-[#501087]/20 flex items-center justify-center text-[#501087] mb-5 shadow-xs">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-[20px] font-bold text-[#191919]">
              Restricted Executive Access
            </h3>
            <p className="text-[13px] text-[#4A5560] max-w-sm mt-1 leading-relaxed">
              Customer submissions and applicant records are encrypted. Enter
              your administrative PIN to proceed.
            </p>

            <form
              onSubmit={handleVerifyPin}
              className="mt-6 w-full max-w-xs space-y-3"
            >
              <div className="relative">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter Admin PIN"
                  autoFocus
                  className="w-full h-12 px-4 rounded-xl border border-[#E2E5E8] focus:border-[#501087] focus:ring-2 focus:ring-[#501087]/20 text-center tracking-widest font-mono text-[16px] outline-none bg-white"
                />
              </div>

              {authError && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[12px] flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!pin.trim() || loading}
                className="w-full h-12 bg-[#501087] hover:bg-[#35005f] text-white font-bold text-[13px] rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                <KeyRound className="w-4 h-4" />
                <span>{loading ? 'Verifying...' : 'Unlock Underwriting Register'}</span>
              </button>
            </form>

            <div className="mt-6 text-[11px] font-mono text-[#8C96A0] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#19B496]" />
              <span>Default PIN: 8820 (Configurable via ADMIN_PIN)</span>
            </div>
          </div>
        ) : activeTab === 'email-settings' ? (
          /* EMAIL SETTINGS & NOTIFICATIONS PANEL */
          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white space-y-6">
            <div className="p-5 rounded-xl border border-[#19B496]/30 bg-[#e8faf6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#006b58] font-bold block mb-1">
                  CURRENT NOTIFICATION RECIPIENT
                </span>
                <div className="text-[17px] font-bold text-[#191919] flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#19B496]" />
                  <span>{adminEmail}</span>
                </div>
                <p className="text-[12px] text-[#4A5560] mt-1">
                  All completed customer applications automatically compile an
                  executive summary and dispatch an email alert to this address.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSendTestEmail}
                disabled={testEmailLoading}
                className="px-4 py-2.5 bg-[#501087] hover:bg-[#35005f] text-white text-[12px] font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {testEmailLoading ? 'Sending...' : 'Send Test Notification Email'}
                </span>
              </button>
            </div>

            {testEmailResult && (
              <div
                className={`p-3.5 rounded-lg text-[13px] font-mono border ${
                  testEmailResult.startsWith('✓')
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                {testEmailResult}
              </div>
            )}

            <div className="border border-[#E2E5E8] rounded-xl p-5 bg-[#F5F5F5]/60 space-y-3">
              <h4 className="text-[14px] font-bold text-[#191919] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#501087]" />
                <span>How Real-Time Email Delivery Works</span>
              </h4>
              <p className="text-[13px] text-[#4A5560] leading-relaxed">
                When an applicant submits the 5-step form, our backend records
                their answers in the database and invokes Nodemailer to notify{' '}
                <strong>{adminEmail}</strong>.
              </p>
              <div className="text-[12px] text-[#4A5560] space-y-2 pt-1 font-mono">
                <div className="p-3 bg-white rounded-lg border border-[#E2E5E8]">
                  <strong>1. Dedicated Server Database:</strong> Form entries are
                  always securely recorded in <code className="text-[#501087]">applications.json</code>.
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E2E5E8]">
                  <strong>2. Zoho Mail Live SMTP Setup:</strong> To deliver alerts straight to <code className="text-[#501087]">info@croyancegroup.com</code>, add these in Settings &gt; Environment Variables:
                  <div className="mt-1 text-[11px] text-[#4A5560] space-y-0.5">
                    <div><span className="font-semibold text-[#191919]">SMTP_HOST</span> = smtppro.zoho.com</div>
                    <div><span className="font-semibold text-[#191919]">SMTP_PORT</span> = 465</div>
                    <div><span className="font-semibold text-[#191919]">SMTP_USER</span> = info@croyancegroup.com</div>
                    <div><span className="font-semibold text-[#191919]">SMTP_PASS</span> = &lt;Zoho App-Specific Password&gt;</div>
                    <div><span className="font-semibold text-[#191919]">ADMIN_EMAIL</span> = info@croyancegroup.com</div>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E2E5E8]">
                  <strong>3. Applicant WhatsApp Sync:</strong> Applicants also have
                  an instant button on their screen to forward their full
                  reference packet directly to your WhatsApp at{' '}
                  <strong className="text-[#006b58]">07062343398</strong>.
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('submissions')}
                className="px-5 py-2.5 bg-[#501087] text-white text-[12px] font-bold rounded-lg hover:bg-[#35005f] transition-colors cursor-pointer"
              >
                Return to Applications List
              </button>
            </div>
          </div>
        ) : (
          /* SUBMISSIONS REGISTER TABLE */
          <div className="flex-1 overflow-y-auto p-6 bg-[#F5F5F5]/50">
            {applications.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-[#E2E5E8] p-8">
                <FileText className="w-12 h-12 text-[#8C96A0] mx-auto mb-3" />
                <h3 className="text-[16px] font-bold text-[#191919] mb-1">
                  No Applications In Register Yet
                </h3>
                <p className="text-[13px] text-[#4A5560] max-w-md mx-auto">
                  When prospective applicants fill out the 5-step underwriting form,
                  their records and attachments will be saved here and dispatched to{' '}
                  <strong>{adminEmail}</strong>.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Applications List */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between text-[12px] font-mono text-[#4A5560] px-1">
                    <span>Total Registered Applicants: {applications.length}</span>
                    <span>Admin PIN Verified ✓</span>
                  </div>

                  <div className="space-y-3">
                    {applications.map((app) => {
                      const isSelected =
                        selectedApp?.referenceNumber === app.referenceNumber;
                      return (
                        <div
                          key={app.referenceNumber}
                          onClick={() => setSelectedApp(app)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer bg-white ${
                            isSelected
                              ? 'border-[#501087] ring-2 ring-[#501087]/20 shadow-sm'
                              : 'border-[#E2E5E8] hover:border-[#19B496]'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-mono text-[11px] font-bold text-[#501087]">
                                {app.referenceNumber}
                              </span>
                              <h4 className="text-[15px] font-bold text-[#191919] mt-0.5">
                                {app.fullName}
                              </h4>
                            </div>
                            <span className="text-[11px] font-mono text-[#8C96A0]">
                              {new Date(app.submittedAt).toLocaleDateString([], {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>

                          <div className="mt-2.5 flex flex-wrap gap-2 text-[12px]">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#f0dbff]/50 text-[#501087] font-semibold">
                              <Car className="w-3.5 h-3.5" />
                              {app.vehicle}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e8faf6] text-[#006b58] font-medium">
                              <Phone className="w-3.5 h-3.5" />
                              {app.phoneNumber}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Detail Preview Panel */}
                <div className="lg:col-span-5">
                  {selectedApp ? (
                    <div className="bg-white rounded-xl border border-[#E2E5E8] p-5 sticky top-0 space-y-4 shadow-sm">
                      <div className="flex items-start justify-between border-b border-[#E2E5E8] pb-3">
                        <div>
                          <span className="text-[11px] font-mono text-[#19B496] font-bold block">
                            APPLICANT DOSSIER
                          </span>
                          <h3 className="text-[17px] font-bold text-[#501087]">
                            {selectedApp.fullName}
                          </h3>
                          <span className="text-[12px] font-mono text-[#4A5560]">
                            Ref: {selectedApp.referenceNumber}
                          </span>
                        </div>
                        <a
                          href={`https://wa.me/${selectedApp.phoneNumber.replace(
                            /[^0-9]/g,
                            ''
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 bg-[#25D366] text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-xs hover:bg-[#1ebd5a] transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      <div className="space-y-2 text-[12px]">
                        <div>
                          <span className="text-[#8C96A0] block">Vehicle Requested:</span>
                          <span className="font-bold text-[#191919]">
                            {selectedApp.vehicle}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#8C96A0] block">Phone Number:</span>
                          <span className="font-semibold text-[#191919]">
                            {selectedApp.phoneNumber}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#8C96A0] block">Residential Address:</span>
                          <span className="text-[#191919]">
                            {selectedApp.fullAddress}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div>
                            <span className="text-[#8C96A0] block">Place of Work:</span>
                            <span className="font-medium text-[#191919]">
                              {selectedApp.placeOfWork || 'Not provided'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#8C96A0] block">Driving Experience:</span>
                            <span className="font-medium text-[#191919]">
                              {selectedApp.drivingExperience || 'Not provided'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="text-[#8C96A0] block">Driver License No:</span>
                          <span className="font-mono text-[#191919]">
                            {selectedApp.licenseNumber || 'Not provided'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#8C96A0] block">30% Deposit Ready:</span>
                          <span className="inline-flex items-center gap-1 text-[#006b58] font-bold">
                            <CheckCircle className="w-3.5 h-3.5 text-[#19B496]" />
                            {selectedApp.depositAvailable} (within 7 business days)
                          </span>
                        </div>
                      </div>

                      {/* Attached Files List */}
                      <div className="pt-3 border-t border-[#E2E5E8] space-y-1.5">
                        <span className="text-[11px] font-mono text-[#4A5560] font-bold block">
                          ATTACHED PROOF FILES
                        </span>
                        <div className="space-y-1 text-[11px]">
                          <div className="flex items-center justify-between p-1.5 bg-[#F5F5F5] rounded-md">
                            <span className="text-[#4A5560]">Means of ID:</span>
                            <span className="font-mono font-medium text-[#191919]">
                              {selectedApp.meansOfIdFile || 'Uploaded on form'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-1.5 bg-[#F5F5F5] rounded-md">
                            <span className="text-[#4A5560]">Driver License:</span>
                            <span className="font-mono font-medium text-[#191919]">
                              {selectedApp.driversLicenseFile || 'Uploaded on form'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-1.5 bg-[#F5F5F5] rounded-md">
                            <span className="text-[#4A5560]">NEPA Bill (Address):</span>
                            <span className="font-mono font-medium text-[#191919]">
                              {selectedApp.nepaBillFile || 'Uploaded on form'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-1.5 bg-[#F5F5F5] rounded-md">
                            <span className="text-[#4A5560]">Guarantor ID:</span>
                            <span className="font-mono font-medium text-[#191919]">
                              {selectedApp.guarantorIdFile || 'Uploaded on form'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl border border-[#E2E5E8] p-6 text-center text-[#8C96A0] text-[13px]">
                      Select any applicant on the left to inspect their dossier.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-[#E2E5E8] flex items-center justify-between text-[12px] text-[#4A5560]">
          <span className="font-mono text-[11px]">
            Security Status:{' '}
            {isAuthorized ? (
              <span className="text-[#19B496] font-bold">
                ✓ Authenticated (PIN Verified)
              </span>
            ) : (
              <span className="text-amber-600 font-bold">
                🔒 Locked (Requires PIN)
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-1.5 bg-[#501087] text-white rounded-lg font-bold text-[12px] hover:bg-[#35005f] transition-colors cursor-pointer"
          >
            {isAuthorized ? 'Lock & Exit' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
