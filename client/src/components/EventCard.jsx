import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const EventCard = ({ event }) => {
  const { title, description, date, time, image, location } = event;

  return (
    <div className="glass-card rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0 group">
      {/* Event Image */}
      <div className="md:col-span-5 relative h-56 md:h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800';
          }}
        />
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-cafe-gold text-cafe-dark font-serif font-bold text-xs shadow-lg uppercase tracking-wider">
          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Content */}
      <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-cafe-gold font-medium mb-3">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> {location || 'Main Lounge'}
            </span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-cafe-cream mb-3 group-hover:text-cafe-gold transition-colors">
            {title}
          </h3>

          <p className="text-xs text-cafe-cream/70 leading-relaxed mb-6">
            {description}
          </p>
        </div>

        <div className="pt-4 border-t border-cafe-gold/10 flex items-center justify-between">
          <span className="text-xs text-cafe-cream/50">Complimentary Entry for Guests</span>
          <a
            href="/reservation"
            className="px-4 py-2 rounded-xl bg-cafe-gold/20 border border-cafe-gold/40 text-cafe-gold hover:bg-cafe-gold hover:text-cafe-dark transition-all text-xs font-semibold uppercase tracking-wider"
          >
            Reserve Table
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
