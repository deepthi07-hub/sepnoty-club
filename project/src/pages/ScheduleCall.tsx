import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { User, Mail, Clock, Calendar as CalendarIcon, Globe, Phone, MessageSquare, Shield } from 'lucide-react';
import profileImg from '../assets/profile.png';
import { useNavigate } from 'react-router-dom';

const ScheduleCall: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string>('Asia/Kolkata');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [purposeOfCall, setPurposeOfCall] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // OTP Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const timezones = [
    { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST +05:30)' },
    { value: 'America/New_York', label: 'America/New_York (EST -05:00)' },
    { value: 'America/Los_Angeles', label: 'America/Los_Angeles (PST -08:00)' },
    { value: 'Europe/London', label: 'Europe/London (GMT +00:00)' },
    { value: 'Europe/Berlin', label: 'Europe/Berlin (CET +01:00)' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST +09:00)' },
    { value: 'Australia/Sydney', label: 'Australia/Sydney (AEDT +11:00)' }
  ];

  const purposeOptions = [
    'Business Consultation',
    'Technical Discussion',
    'Partnership Opportunity',
    'Investment Discussion',
    'Career Guidance',
    'Product Demo',
    'Strategic Planning',
    'Other'
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const sendOtp = async () => {
    if (!validatePhone(clientPhone)) {
      setError('Please enter a valid phone number.');
      return;
    }

    setIsOtpLoading(true);
    setError(null);

    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsOtpSent(true);
      setOtpTimer(60); // 60 seconds timer
      console.log('OTP sent to:', clientPhone);
      
      // For demo purposes, show the OTP in console
      console.log('Demo OTP: 123456');
      
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setIsOtpLoading(true);
    setError(null);

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept 123456 as valid OTP
      if (otp === '123456') {
        setIsOtpVerified(true);
        console.log('OTP verified successfully');
      } else {
        setError('Invalid OTP. Please try again.');
      }
      
    } catch (err) {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Reset error state
    setError(null);

    // Validation
    if (!clientName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!clientEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!validateEmail(clientEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!clientPhone.trim()) {
      setError('Please enter your phone number.');
      return;
    }

    if (!isOtpVerified) {
      setError('Please verify your phone number with OTP.');
      return;
    }

    if (!purposeOfCall.trim()) {
      setError('Please select the purpose of your call.');
      return;
    }

    if (!selectedDate || !selectedTime || !timezone) {
      setError('Please select a date, time slot, and timezone.');
      return;
    }

    setIsLoading(true);

    try {
      const requestData = {
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: clientPhone.trim(),
        purposeOfCall: purposeOfCall,
        date: selectedDate.toISOString(),
        time: selectedTime,
        timezone: timezone,
        formattedDate: formatDate(selectedDate),
        timestamp: new Date().toISOString()
      };

      console.log('Meeting Request Submitted:', requestData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setPurposeOfCall('');
    setOtp('');
    setIsOtpSent(false);
    setIsOtpVerified(false);
    setOtpTimer(0);
    setSelectedDate(new Date());
    setSelectedTime(null);
    setTimezone('Asia/Kolkata');
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800">
      <style jsx>{`
        .react-calendar {
          width: 100% !important;
          max-width: none !important;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-family: inherit;
          line-height: 1.125em;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .react-calendar--doubleView {
          width: 700px;
        }
        
        .react-calendar--doubleView .react-calendar__viewContainer {
          display: flex;
          margin: -0.5em;
        }
        
        .react-calendar--doubleView .react-calendar__viewContainer > * {
          width: 50%;
          margin: 0.5em;
        }
        
        .react-calendar *,
        .react-calendar *:before,
        .react-calendar *:after {
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        
        .react-calendar button {
          margin: 0;
          border: 0;
          outline: none;
        }
        
        .react-calendar button:enabled:hover,
        .react-calendar button:enabled:focus {
          background-color: #f3f4f6;
        }
        
        .react-calendar__navigation {
          display: flex;
          height: 60px;
          margin-bottom: 1em;
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
          border-radius: 12px 12px 0 0;
        }
        
        .react-calendar__navigation button {
          min-width: 44px;
          background: none;
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          transition: all 0.2s ease;
        }
        
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: #e5e7eb;
          color: #1f2937;
        }
        
        .react-calendar__navigation button[disabled] {
          background-color: transparent;
          color: #9ca3af;
        }
        
        .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.75em;
          color: #6b7280;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .react-calendar__month-view__weekdays__weekday {
          padding: 1em 0.5em;
        }
        
        .react-calendar__month-view__weekNumbers .react-calendar__tile {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75em;
          font-weight: bold;
          color: #6b7280;
          background: #f9fafb;
          border-right: 1px solid #e5e7eb;
        }
        
        .react-calendar__month-view__days__day--weekend {
          color: #dc2626;
        }
        
        .react-calendar__month-view__days__day--neighboringMonth {
          color: #9ca3af;
        }
        
        .react-calendar__year-view .react-calendar__tile,
        .react-calendar__decade-view .react-calendar__tile,
        .react-calendar__century-view .react-calendar__tile {
          padding: 2em 0.5em;
        }
        
        .react-calendar__tile {
          max-width: 100%;
          padding: 12px 8px;
          background: none;
          text-align: center;
          line-height: 16px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #dbeafe;
          color: #1d4ed8;
          border-color: #3b82f6;
          transform: scale(1.05);
        }
        
        .react-calendar__tile--now {
          background: #fef3c7;
          color: #92400e;
          font-weight: 600;
          border-color: #f59e0b;
        }
        
        .react-calendar__tile--now:enabled:hover,
        .react-calendar__tile--now:enabled:focus {
          background: #fde68a;
          color: #78350f;
        }
        
        .react-calendar__tile--hasActive {
          background: #3b82f6;
          color: white;
        }
        
        .react-calendar__tile--hasActive:enabled:hover,
        .react-calendar__tile--hasActive:enabled:focus {
          background: #2563eb;
        }
        
        .react-calendar__tile--active {
          background: #3b82f6 !important;
          color: white !important;
          font-weight: 600;
          border-color: #1d4ed8;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
        
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
          background: #2563eb !important;
        }
        
        .react-calendar--selectRange .react-calendar__tile--hover {
          background-color: #dbeafe;
        }
        
        .react-calendar__tile--range {
          background: #bfdbfe;
          color: #1e40af;
        }
        
        .react-calendar__tile--rangeStart {
          background: #3b82f6;
          color: white;
        }
        
        .react-calendar__tile--rangeEnd {
          background: #3b82f6;
          color: white;
        }
      `}</style>

      {/* Left Panel - Professional Profile */}
      <div className="w-full md:w-2/5 bg-white p-8 md:p-12 border-r border-gray-200 shadow-lg">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <img
              src={profileImg}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto shadow-lg border-4 border-white"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Manikumar Pokala</h1>
          <p className="text-blue-600 font-medium mb-1">CEO & Founder of Sepnoty Technologies pvt ltd</p>
          <p className="text-gray-500 text-sm mb-6">Available for consultation</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-semibold text-gray-900">Duration</p>
              <p className="text-sm text-gray-600">30 minutes</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-semibold text-gray-900">Meeting Type</p>
              <p className="text-sm text-gray-600">One-on-one consultation</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">What to expect:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Personalized consultation session</li>
              <li>• Strategic guidance and insights</li>
              <li>• Q&A and discussion time</li>
              <li>• Follow-up recommendations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Panel - Booking Form */}
      <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
        {!submitted ? (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Schedule Your Meeting</h2>
              <p className="text-gray-600">Please fill in your details and select your preferred time slot</p>
            </div>

            {/* Client Information */}
            <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Your Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

          {/* Phone Number with OTP */}
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Phone Number *
  </label>
  <div className="flex gap-2">
    <div className="flex items-center px-4 py-3 border border-gray-300 rounded-lg bg-gray-100">
      <span className="text-gray-700">+91</span>
    </div>
    <input
      type="tel"
      value={clientPhone}
      onChange={(e) => setClientPhone(e.target.value)}
      placeholder="Enter 10-digit phone number"
      disabled={isOtpVerified}
      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
    />
    {!isOtpVerified && (
      <button
        type="button"
        onClick={sendOtp}
        disabled={isOtpLoading || !clientPhone || otpTimer > 0}
        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
      >
        {isOtpLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <Phone className="w-4 h-4" />
            <span>
              {isOtpSent ? (otpTimer > 0 ? `${otpTimer}s` : 'Resend') : 'Send OTP'}
            </span>
          </>
        )}
      </button>
    )}
    {isOtpVerified && (
      <div className="px-4 py-3 bg-green-100 text-green-700 rounded-lg flex items-center space-x-2">
        <Shield className="w-4 h-4" />
        <span>Verified</span>
      </div>
    )}
  </div>
</div>


{/* OTP Input */}
{isOtpSent && !isOtpVerified && (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Enter OTP *
    </label>
    <div className="flex gap-2">
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
        placeholder="Enter 6-digit OTP"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        maxLength={6}
      />
      <button
        type="button"
        onClick={verifyOtp}
        disabled={isOtpLoading || otp.length !== 6}
        className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isOtpLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          'Verify'
        )}
      </button>
    </div>
  </div>
)}

{/* ✅ Error Display */}
    {error && (
      <div className="mb-4 text-red-600">
        <strong>Error:</strong> {error}
      </div>
    )}

    {/* 🔥 reCAPTCHA Container — Correct Placement */}
    <div id="recaptcha-container"></div>
  

              {/* Purpose of Call */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose of Call *
                </label>
                <select
                  value={purposeOfCall}
                  onChange={(e) => setPurposeOfCall(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select purpose of your call</option>
                  {purposeOptions.map((purpose) => (
                    <option key={purpose} value={purpose}>
                      {purpose}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calendar Selection */}
            <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                Select Date
              </h3>
              <div className="calendar-container">
                <Calendar
                  onChange={(date) => setSelectedDate(date as Date)}
                  value={selectedDate}
                  minDate={new Date()}
                  className="mx-auto"
                  showWeekNumbers={true}
                  showNeighboringMonth={true}
                  prev2Label={null}
                  next2Label={null}
                />
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Available Times for {formatDate(selectedDate)}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-3 px-4 border-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedTime === slot
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                          : 'bg-white hover:bg-blue-50 text-gray-700 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Timezone Selection */}
            <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-600" />
                Time Zone
              </h3>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
                <div className="w-5 h-5 mr-3 text-red-500">⚠️</div>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing Request...
                  </div>
                ) : (
                  'Schedule Meeting'
                )}
              </button>

              <button
                onClick={() => navigate(-1)}
                className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                ← Back
              </button>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-10 h-10 text-green-600">✓</div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meeting Scheduled!</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 text-left max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-4">Meeting Details:</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Name:</span> {clientName}</p>
                <p><span className="font-medium">Email:</span> {clientEmail}</p>
                <p><span className="font-medium">Phone:</span> {clientPhone}</p>
                <p><span className="font-medium">Purpose:</span> {purposeOfCall}</p>
                <p><span className="font-medium">Date:</span> {selectedDate && formatDate(selectedDate)}</p>
                <p><span className="font-medium">Time:</span> {selectedTime}</p>
                <p><span className="font-medium">Timezone:</span> {timezones.find(tz => tz.value === timezone)?.label}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-8">
              A confirmation email with meeting details will be sent to <strong>{clientEmail}</strong>
            </p>
            <div className="space-y-4">
              <button
                onClick={resetForm}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Schedule Another Meeting
              </button>
              <button
                onClick={() => navigate(-1)}
                className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleCall;