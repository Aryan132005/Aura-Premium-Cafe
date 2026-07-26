import React from 'react';
import { Star, Clock, Leaf, AlertCircle, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MenuCard = ({ item }) => {
  const {
    id,
    name,
    description,
    price,
    category,
    image,
    isVeg,
    isAvailable,
    isFeatured,
    rating,
    prepTime
  } = item;

  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find((i) => i.id === id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className={`group glass-card rounded-2xl overflow-hidden flex flex-col justify-between ${!isAvailable ? 'opacity-70' : ''}`}>
      <div>
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cafe-card via-transparent to-transparent opacity-80" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {isVeg ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md">
                <Leaf className="w-3 h-3" /> VEG
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md">
                NON-VEG
              </span>
            )}

            {isFeatured && (
              <span className="px-2.5 py-1 rounded-full bg-cafe-gold/90 text-cafe-dark text-[10px] font-bold uppercase tracking-wider shadow-md">
                Chef Specialty
              </span>
            )}
          </div>

          {!isAvailable && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-lg bg-red-900/90 text-white text-xs font-semibold flex items-center gap-1.5 border border-red-500/40">
                <AlertCircle className="w-4 h-4" /> Currently Unavailable
              </span>
            </div>
          )}

          {/* Price Tag */}
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-cafe-dark/90 border border-cafe-gold/30 text-cafe-gold font-serif font-bold text-lg backdrop-blur-md shadow-xl">
            ${Number(price).toFixed(2)}
          </div>
        </div>

        {/* Details Container */}
        <div className="p-5 pb-2">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-serif text-xl font-bold text-cafe-cream group-hover:text-cafe-gold transition-colors line-clamp-1">
              {name}
            </h3>
          </div>

          <p className="text-xs text-cafe-cream/70 leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Meta Footer & Add to Cart Button */}
      <div className="p-5 pt-0 space-y-3 mt-auto">
        <div className="flex items-center justify-between text-xs text-cafe-cream/50 pt-2 border-t border-white/5">
          <span className="flex items-center gap-1 text-amber-400 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {rating || 4.8}
          </span>

          <span className="flex items-center gap-1 text-cafe-cream/60">
            <Clock className="w-3.5 h-3.5 text-cafe-gold/70" /> {prepTime || '15 mins'}
          </span>
        </div>

        {/* Add / Quantity Controls */}
        {isAvailable && (
          <div>
            {quantityInCart === 0 ? (
              <button
                onClick={() => addToCart(item, 1)}
                className="w-full py-2.5 rounded-xl bg-cafe-gold/15 hover:bg-cafe-gold text-cafe-gold hover:text-cafe-dark border border-cafe-gold/40 hover:border-cafe-gold font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Order
              </button>
            ) : (
              <div className="flex items-center justify-between bg-cafe-gold/20 border border-cafe-gold/50 rounded-xl p-1 text-xs">
                <button
                  onClick={() => updateQuantity(id, quantityInCart - 1)}
                  className="w-8 h-8 rounded-lg bg-cafe-gold text-cafe-dark font-bold flex items-center justify-center hover:bg-cafe-goldHover transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold font-mono text-cafe-gold text-sm px-3">
                  {quantityInCart} in Order
                </span>
                <button
                  onClick={() => updateQuantity(id, quantityInCart + 1)}
                  className="w-8 h-8 rounded-lg bg-cafe-gold text-cafe-dark font-bold flex items-center justify-center hover:bg-cafe-goldHover transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
