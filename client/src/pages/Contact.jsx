import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { createEnquiryApi } from '../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await createEnquiryApi(formData);
      if (res.data.success) {
        toast.success(res.data.message || 'Message sent successfully!');
        setSent(true);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to send enquiry.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
          Get In Touch
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cafe-cream">
          Contact Concierge
        </h1>
        <p className="text-xs sm:text-sm text-cafe-cream/70 font-light">
          Have a question regarding private bookings, dietary requirements, or general inquiries? Drop us a line.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="font-serif text-2xl font-bold text-cafe-gold">
              Café Details
            </h3>

            <div className="space-y-4 text-xs text-cafe-cream/80 leading-relaxed">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-cafe-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-cafe-cream text-sm">Address</strong>
                  452 Grand Boulevard, Luxury Promenade, NY 10001
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-cafe-gold shrink-0" />
                <div>
                  <strong className="block text-cafe-cream text-sm">Direct Phone</strong>
                  +1 (555) 839-2000
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-cafe-gold shrink-0" />
                <div>
                  <strong className="block text-cafe-cream text-sm">Email Concierge</strong>
                  concierge@auracafe.com
                </div>
              </div>

              <div className="flex items-start gap-4 pt-2 border-t border-cafe-gold/10">
                <Clock className="w-5 h-5 text-cafe-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-cafe-cream text-sm">Hours of Operation</strong>
                  <span>Mon - Thu: 08:00 AM - 10:00 PM</span><br />
                  <span>Fri - Sat: 08:00 AM - 11:30 PM</span><br />
                  <span>Sunday: 09:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-3xl overflow-hidden border border-cafe-gold/20 shadow-xl h-64">
            <iframe
              title="Cafe Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.217707447738!2d-73.98823908459369!3d40.75546297932698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ac043c8d37%3A0x6b63d7634f19b22a!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.7) contrast(1.2)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          {sent ? (
            <div className="glass-panel p-10 rounded-3xl text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-cafe-gold mx-auto animate-bounce" />
              <h3 className="font-serif text-3xl font-bold text-cafe-cream">Message Sent!</h3>
              <p className="text-xs text-cafe-cream/70">
                Thank you for contacting Aura. Our guest experience manager will review your enquiry and get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                }}
                className="px-6 py-2 rounded-full bg-cafe-gold text-cafe-dark text-xs font-bold uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-3xl space-y-6 shadow-2xl">
              <h3 className="font-serif text-2xl font-bold text-cafe-cream mb-2">
                Send Us a Message
              </h3>

              <div>
                <label className="block text-xs text-cafe-cream/80 font-medium mb-1">Your Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Smith"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-cafe-cream/80 font-medium mb-1">Your Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-cafe-cream/80 font-medium mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Private Event Hosting / Menu Question"
                  className="w-full px-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-cafe-cream/80 font-medium mb-1">Your Message *</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your inquiry here..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-cafe-gold hover:bg-cafe-goldHover text-cafe-dark font-serif font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Submit Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
