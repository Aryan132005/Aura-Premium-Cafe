import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Award, Sparkles, Utensils, Star, ArrowRight, Clock, ShieldCheck, Heart } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import ReservationForm from '../components/ReservationForm';
import { fetchMenuApi } from '../services/api';

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await fetchMenuApi();
        if (res.data.success) {
          const featured = res.data.data.filter(item => item.isFeatured).slice(0, 4);
          setFeaturedItems(featured.length > 0 ? featured : res.data.data.slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching featured items', err);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Banner Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1920')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cafe-dark via-cafe-dark/80 to-cafe-darker/70 z-0" />

        {/* Floating Decorative Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cafe-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cafe-gold/40 bg-cafe-gold/10 text-cafe-gold text-xs uppercase tracking-[0.25em] font-semibold backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5" /> Welcome to Aura Culinary Haven
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-cafe-cream tracking-tight leading-[1.1]">
            Where Artistry Meets <br />
            <span className="text-gold-gradient italic font-normal">Single-Origin Excellence</span>
          </h1>

          <p className="text-sm sm:text-base text-cafe-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Experience hand-picked artisanal coffee beans, Michelin-inspired pastries, and an intimate luxury lounge tailored for life’s finest moments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/reservation"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-cafe-gold hover:bg-cafe-goldHover text-cafe-dark font-serif font-bold text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-cafe-gold/30 hover:scale-105"
            >
              Book A Private Table
            </Link>
            <Link
              to="/menu"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-cafe-gold/40 hover:border-cafe-gold text-cafe-cream hover:text-cafe-gold font-serif font-bold text-sm uppercase tracking-wider backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              Explore Digital Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="pt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto border-t border-cafe-gold/15">
            <div>
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-cafe-gold">100%</span>
              <span className="text-[10px] text-cafe-cream/60 uppercase tracking-widest">Arabica Beans</span>
            </div>
            <div>
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-cafe-gold">4.9★</span>
              <span className="text-[10px] text-cafe-cream/60 uppercase tracking-widest">Guest Rating</span>
            </div>
            <div>
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-cafe-gold">15+</span>
              <span className="text-[10px] text-cafe-cream/60 uppercase tracking-widest">Master Baristas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
              Our Heritage & Soul
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cafe-cream leading-tight">
              Crafted with Passion, <br />
              Served with <span className="text-gold-gradient">Elegance</span>
            </h2>
            <p className="text-xs sm:text-sm text-cafe-cream/70 leading-relaxed font-light">
              Founded in 2018, Aura Café was created out of a deep reverence for the bean and the plate. Every cup is brewed using custom water mineral profiles, while our pastry kitchen works continuously from 4 AM to bake buttery croissants and delicate caramel tarts.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl glass-panel space-y-2 border border-cafe-gold/10">
                <Coffee className="w-6 h-6 text-cafe-gold" />
                <h4 className="font-serif text-base font-bold text-cafe-cream">Direct Trade Coffee</h4>
                <p className="text-[11px] text-cafe-cream/60">Sourced directly from micro-lot farms in Ethiopia and Colombia.</p>
              </div>
              <div className="p-4 rounded-2xl glass-panel space-y-2 border border-cafe-gold/10">
                <Utensils className="w-6 h-6 text-cafe-gold" />
                <h4 className="font-serif text-base font-bold text-cafe-cream">Gourmet Dining</h4>
                <p className="text-[11px] text-cafe-cream/60">Seasonal menus featuring organic, locally-sourced produce.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-cafe-gold/20 aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1000"
                alt="Barista brewing espresso"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-cafe-card/95 border border-cafe-gold/30 p-6 rounded-2xl shadow-2xl backdrop-blur-md hidden sm:flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cafe-gold/20 border border-cafe-gold flex items-center justify-center text-cafe-gold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-serif text-base font-bold text-cafe-cream">Best Luxury Café 2025</h5>
                <p className="text-xs text-cafe-gold font-medium">International Gastronomy Guild</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Items Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
              Handpicked Delights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cafe-cream mt-1">
              Featured Menu Highlights
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-xs font-bold uppercase tracking-wider text-cafe-gold hover:text-cafe-goldHover flex items-center gap-2"
          >
            View Full Digital Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <MenuCard key={item.id || item._id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* Table Reservation CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
              Seamless Online Booking
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cafe-cream">
              Secure Your Table in Seconds
            </h2>
            <p className="text-xs sm:text-sm text-cafe-cream/70 leading-relaxed font-light">
              Planning a birthday dinner, business brunch, or romantic coffee date? Choose your preferred date, time slot, and guest count for guaranteed seating.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-cafe-cream">
                <ShieldCheck className="w-4 h-4 text-cafe-gold" /> Instant Real-Time Table Confirmation
              </div>
              <div className="flex items-center gap-3 text-xs text-cafe-cream">
                <Clock className="w-4 h-4 text-cafe-gold" /> Flexible Time Slot Choices
              </div>
              <div className="flex items-center gap-3 text-xs text-cafe-cream">
                <Heart className="w-4 h-4 text-cafe-gold" /> Custom Special Request Hospitality
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ReservationForm />
          </div>
        </div>
      </section>

      {/* Customer Testimonials Carousel/Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
            Guest Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cafe-cream">
            What Our Patrons Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Sophia Laurent',
              role: 'Food Critic & Author',
              quote: 'The Gold Leaf Espresso is transcendent. Aura combines the warmth of a neighborhood café with the sophistication of a Michelin-starred lounge.',
              rating: 5
            },
            {
              name: 'David K. Vance',
              role: 'Architect',
              quote: 'Sensational ambiance. The truffle crostini and saffron risotto are remarkable. My go-to location for evening meetings and weekend brunches.',
              rating: 5
            },
            {
              name: 'Elena Rostova',
              role: 'Classical Musician',
              quote: 'The Jazz & Espresso nights are unforgettable. Impeccable service, incredible pastries, and an atmosphere that immediately feels like home.',
              rating: 5
            }
          ].map((t, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs italic text-cafe-cream/80 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-cafe-gold/10">
                <h4 className="font-serif text-base font-bold text-cafe-cream">{t.name}</h4>
                <p className="text-[11px] text-cafe-gold">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
