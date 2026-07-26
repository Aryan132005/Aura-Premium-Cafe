import React, { useState } from 'react';
import { Calendar, Clock, Users, Mail, Phone, User, MessageSquare, CheckCircle2 } from 'lucide-react';
import { createReservationApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ReservationForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: 2,
    specialRequest: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = [
    '09:00', '10:30', '12:00', '13:30', '15:00',
    '17:00', '18:30', '19:30', '20:30', '21:30'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      toast.error('Please fill in all mandatory booking fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await createReservationApi(formData);
      if (res.data.success) {
        toast.success(res.data.message || 'Reservation confirmed!');
        setSubmitted(true);
        if (onSuccess) onSuccess(res.data.data);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to submit reservation. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center max-w-lg mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-cafe-gold/20 border-2 border-cafe-gold flex items-center justify-center text-cafe-gold mx-auto animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-cafe-cream">
          Reservation Received!
        </h3>
        <p className="text-xs text-cafe-cream/70 leading-relaxed">
          Thank you, <strong className="text-cafe-gold">{formData.name}</strong>. Your table booking for <strong className="text-cafe-gold">{formData.guests} guests</strong> on <strong className="text-cafe-gold">{formData.date} at {formData.time}</strong> has been logged. Our concierge will send a confirmation details shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: user?.name || '',
              email: user?.email || '',
              phone: user?.phone || '',
              date: new Date().toISOString().split('T')[0],
              time: '19:00',
              guests: 2,
              specialRequest: ''
            });
          }}
          className="px-6 py-2.5 rounded-full bg-cafe-gold text-cafe-dark text-xs font-bold uppercase tracking-wider hover:bg-cafe-goldHover transition-all shadow-lg"
        >
          Book Another Table
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-3xl space-y-6 shadow-2xl">
      <div className="text-center space-y-2 mb-6">
        <span className="text-[10px] uppercase tracking-[0.25em] text-cafe-gold font-bold">
          Experiential Dining
        </span>
        <h2 className="font-serif text-3xl font-bold text-cafe-cream">
          Reserve Your Table
        </h2>
        <p className="text-xs text-cafe-cream/60 max-w-md mx-auto">
          Immerse yourself in our elegant atmosphere. Book your table in advance for guaranteed seating.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs text-cafe-cream/80 font-medium mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-cafe-gold" /> Guest Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Eleanor Vance"
            required
            className="w-full px-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold transition-colors"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs text-cafe-cream/80 font-medium mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-cafe-gold" /> Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="eleanor@example.com"
            required
            className="w-full px-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold transition-colors"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs text-cafe-cream/80 font-medium mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-cafe-gold" /> Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 019-2834"
            required
            className="w-full px-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold transition-colors"
          />
        </div>

        {/* Guest Count */}
        <div>
          <label className="block text-xs text-cafe-cream/80 font-medium mb-1.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cafe-gold" /> Number of Guests *
          </label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold transition-colors"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
              <option key={num} value={num} className="bg-cafe-card text-cafe-cream">
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-xs text-cafe-cream/80 font-medium mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cafe-gold" /> Date *
          </label>
          <input
            type="date"
            name="date"
            min={new Date().toISOString().split('T')[0]}
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold transition-colors"
          />
        </div>

        {/* Time Slot Selection */}
        <div>
          <label className="block text-xs text-cafe-cream/80 font-medium mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cafe-gold" /> Preferred Time *
          </label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold transition-colors"
          >
            {timeSlots.map((slot) => (
              <option key={slot} value={slot} className="bg-cafe-card text-cafe-cream">
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-xs text-cafe-cream/80 font-medium mb-1.5 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-cafe-gold" /> Special Requests (Dietary, Anniversary, Seating)
        </label>
        <textarea
          name="specialRequest"
          rows={3}
          value={formData.specialRequest}
          onChange={handleChange}
          placeholder="Let us know if you require high chairs, anniversary cake service, or quiet corner seating..."
          className="w-full px-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-cafe-gold hover:bg-cafe-goldHover text-cafe-dark font-serif font-bold text-base uppercase tracking-wider transition-all shadow-xl hover:shadow-cafe-gold/20 disabled:opacity-50"
      >
        {loading ? 'Processing Booking...' : 'Confirm Table Booking'}
      </button>
    </form>
  );
};

export default ReservationForm;
