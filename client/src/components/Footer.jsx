import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cafe-darker border-t border-cafe-gold/20 pt-16 pb-12 text-cafe-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cafe-gold/20 border border-cafe-gold flex items-center justify-center text-cafe-gold">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-cafe-cream">
                  AURA
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-cafe-gold uppercase">
                  Café & Lounge
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-cafe-cream/60">
              An extraordinary culinary retreat where single-origin roasts meet artisanal gastronomy. Experiential dining at its finest.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-cafe-gold/30 flex items-center justify-center text-cafe-gold hover:bg-cafe-gold hover:text-cafe-dark transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-cafe-gold/30 flex items-center justify-center text-cafe-gold hover:bg-cafe-gold hover:text-cafe-dark transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-cafe-gold/30 flex items-center justify-center text-cafe-gold hover:bg-cafe-gold hover:text-cafe-dark transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-cafe-gold font-semibold tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/menu" className="hover:text-cafe-gold transition-colors">Digital Menu</Link></li>
              <li><Link to="/about" className="hover:text-cafe-gold transition-colors">Our Heritage</Link></li>
              <li><Link to="/gallery" className="hover:text-cafe-gold transition-colors">Ambiance Gallery</Link></li>
              <li><Link to="/events" className="hover:text-cafe-gold transition-colors">Events & Tastings</Link></li>
              <li><Link to="/reservation" className="hover:text-cafe-gold transition-colors">Book a Table</Link></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-cafe-gold font-semibold tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4" /> Opening Hours
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex justify-between border-b border-cafe-gold/10 pb-1">
                <span>Mon - Thu:</span>
                <span className="text-cafe-cream">08:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-cafe-gold/10 pb-1">
                <span>Fri - Sat:</span>
                <span className="text-cafe-cream">08:00 AM - 11:30 PM</span>
              </li>
              <li className="flex justify-between pb-1">
                <span>Sunday:</span>
                <span className="text-cafe-cream">09:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-cafe-gold font-semibold tracking-wide">
              Contact & Location
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cafe-gold shrink-0 mt-0.5" />
                <span>452 Grand Boulevard, Luxury Promenade, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cafe-gold shrink-0" />
                <span>+1 (555) 839-2000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cafe-gold shrink-0" />
                <span>concierge@auracafe.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cafe-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-cafe-cream/50 gap-4">
          <p>© 2026 Aura Premium Café & Lounge. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cafe-gold">Privacy Policy</a>
            <a href="#" className="hover:text-cafe-gold">Terms of Service</a>
            <a href="#" className="hover:text-cafe-gold">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
