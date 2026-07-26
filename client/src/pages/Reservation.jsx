import React from 'react';
import ReservationForm from '../components/ReservationForm';
import { ShieldCheck, Clock, MapPin, Phone, Award } from 'lucide-react';

const Reservation = () => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
          Exclusive Hospitality
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cafe-cream">
          Reserve Your Table
        </h1>
        <p className="text-xs sm:text-sm text-cafe-cream/70 font-light">
          Guarantee your seating in our main velvet dining lounge or outdoor garden terrace.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="font-serif text-2xl font-bold text-cafe-gold">
              Booking Guidelines
            </h3>

            <div className="space-y-4 text-xs text-cafe-cream/80 leading-relaxed">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-cafe-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-cafe-cream text-sm">Hold Policy</strong>
                  Tables are held for 15 minutes past the reserved time slot before being released to walk-in guests.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-cafe-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-cafe-cream text-sm">Dining Duration</strong>
                  Standard table reservations are allocated 90 minutes for parties up to 4, and 120 minutes for larger parties.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-cafe-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-cafe-cream text-sm">Dress Code</strong>
                  Smart casual attire is appreciated for evening dining slots after 6:00 PM.
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-3 border border-cafe-gold/20">
            <h4 className="font-serif text-lg font-bold text-cafe-cream">Large Parties & Private Events?</h4>
            <p className="text-xs text-cafe-cream/70 leading-relaxed">
              For group bookings over 20 guests or full lounge buyout requests, please contact our events team directly.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-cafe-gold font-medium">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +1 (555) 839-2000</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Grand Promenade</span>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <ReservationForm />
        </div>
      </div>
    </div>
  );
};

export default Reservation;
