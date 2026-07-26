import React from 'react';
import { Coffee, Award, Users, Flame, Compass } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
          Our Heritage & Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-cafe-cream">
          The Craft Behind Aura
        </h1>
        <p className="text-sm text-cafe-cream/70 leading-relaxed font-light">
          A story born from an obsession with single-origin beans, culinary innovation, and the timeless art of hospitality.
        </p>
      </div>

      {/* Main Narrative Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-cafe-gold/20 aspect-4/3">
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1000"
              alt="Coffee bean roasting process"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif text-3xl font-bold text-cafe-cream">
            From Micro-Lot Farms to Your Cup
          </h2>
          <p className="text-xs sm:text-sm text-cafe-cream/75 leading-relaxed font-light">
            Founded in 2018 by Master Barista Antoine Mercer and Executive Pastry Chef Hélène Vance, Aura Café began with a single vision: to elevate everyday coffee culture into a sensory art form.
          </p>
          <p className="text-xs sm:text-sm text-cafe-cream/75 leading-relaxed font-light">
            We partner directly with high-altitude farms across Yirgacheffe, Huila, and Sidama, ensuring ethical compensation for coffee farmers and guaranteeing that only the top 1% of harvested Arabica cherries reach our roastery.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-cafe-gold/20 bg-cafe-card">
              <span className="block font-serif text-2xl font-bold text-cafe-gold">100%</span>
              <span className="text-xs text-cafe-cream/70">Organic & Direct Trade</span>
            </div>
            <div className="p-4 rounded-xl border border-cafe-gold/20 bg-cafe-card">
              <span className="block font-serif text-2xl font-bold text-cafe-gold">Zero</span>
              <span className="text-xs text-cafe-cream/70">Artificial Additives</span>
            </div>
          </div>
        </div>
      </div>

      {/* Culinary Team */}
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
            Culinary Masters
          </span>
          <h2 className="font-serif text-3xl font-bold text-cafe-cream">
            Meet Our Leadership Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Antoine Mercer',
              role: 'Co-Founder & Head Roaster',
              image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600',
              bio: 'World Barista Champion 2021 with over 15 years dedicated to specialty coffee chemistry.'
            },
            {
              name: 'Chef Hélène Vance',
              role: 'Executive Pastry Chef',
              image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600',
              bio: 'Trained at Le Cordon Bleu Paris, crafting golden pastries and artisanal sourdough breads.'
            },
            {
              name: 'Marcus Sterling',
              role: 'Sommelier & Beverage Director',
              bio: 'Curates our signature mocktails, cold brews, and evening botanical infusions.',
              image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600'
            }
          ].map((member, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden group">
              <div className="h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-xl font-bold text-cafe-cream">{member.name}</h3>
                <p className="text-xs text-cafe-gold font-semibold">{member.role}</p>
                <p className="text-xs text-cafe-cream/60 leading-relaxed pt-2">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
