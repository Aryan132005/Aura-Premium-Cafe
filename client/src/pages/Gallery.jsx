import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    title: 'Main Velvet Dining Lounge',
    category: 'Ambiance',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Artisanal Latte Pour',
    category: 'Coffee Craft',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Golden Salted Caramel Tart',
    category: 'Gastronomy',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Private VIP Tasting Booth',
    category: 'Ambiance',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Live Acoustic Jazz Night',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Pan-Seared Wagyu Ribeye Sandwich',
    category: 'Gastronomy',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800'
  }
];

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const categories = ['All', 'Ambiance', 'Coffee Craft', 'Gastronomy', 'Events'];

  const filteredItems = filter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
          Visual Showcase
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cafe-cream">
          Atmosphere & Culinary Art
        </h1>
        <p className="text-xs sm:text-sm text-cafe-cream/70 font-light">
          Immerse yourself in the aesthetic splendor of our dining spaces, coffee creations, and vibrant evening events.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
              filter === cat
                ? 'bg-cafe-gold text-cafe-dark shadow-lg'
                : 'border border-cafe-gold/20 text-cafe-cream/70 hover:border-cafe-gold hover:text-cafe-cream'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-cafe-gold/20 glass-card"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cafe-darker via-cafe-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
              <span className="self-end px-3 py-1 rounded-full bg-cafe-gold text-cafe-dark text-[10px] font-bold uppercase tracking-wider">
                {item.category}
              </span>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-cafe-cream">{item.title}</h3>
                <span className="text-xs text-cafe-gold flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5" /> Click to view full image
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-cafe-card border border-cafe-gold/30 rounded-3xl overflow-hidden shadow-2xl space-y-4">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-cafe-gold hover:text-cafe-dark transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] overflow-hidden">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-cafe-darker border-t border-cafe-gold/10 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-2xl font-bold text-cafe-cream">{activeImage.title}</h3>
                <p className="text-xs text-cafe-gold">{activeImage.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
