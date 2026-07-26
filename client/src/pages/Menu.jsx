import React, { useState, useEffect } from 'react';
import { Search, Filter, Leaf, Coffee, RefreshCw, ShoppingBag, Utensils, Sparkles, MapPin } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import { fetchMenuApi } from '../services/api';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [isVegFilter, setIsVegFilter] = useState('all');

  const { totalItems, totalAmount, setIsCartOpen } = useCart();

  const categories = ['All', 'Beverages', 'Starters', 'Main Course', 'Desserts'];

  const loadMenu = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (search.trim()) params.search = search;
      if (isVegFilter === 'veg') params.isVeg = true;
      if (isVegFilter === 'non-veg') params.isVeg = false;

      const res = await fetchMenuApi(params);
      if (res.data.success) {
        setMenuItems(res.data.data);
      }
    } catch (error) {
      console.error('Failed to load menu items', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, [category, isVegFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadMenu();
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative">
      {/* Table Ordering Banner */}
      <div className="bg-gradient-to-r from-cafe-gold/20 via-amber-500/10 to-cafe-gold/20 border border-cafe-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-left">
          <div className="w-14 h-14 rounded-2xl bg-cafe-gold text-cafe-dark font-bold flex items-center justify-center shrink-0 shadow-lg">
            <Utensils className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-cafe-gold text-cafe-dark">
                No Waiter Needed!
              </span>
              <span className="text-xs text-cafe-gold font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Instant Kitchen Dispatch
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-cafe-cream mt-1">
              Order Online Directly From Your Table
            </h2>
            <p className="text-xs text-cafe-cream/70 mt-1 max-w-xl">
              Simply select your favorite dishes below, choose your <strong>Table Number</strong>, and our kitchen staff will serve your order straight to your table!
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="px-6 py-3.5 bg-cafe-gold hover:bg-cafe-goldHover text-cafe-dark rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 shrink-0 flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> View Table Cart ({totalItems})
        </button>
      </div>

      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
          Gourmet Offerings
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cafe-cream">
          Digital Culinary Menu
        </h1>
        <p className="text-xs sm:text-sm text-cafe-cream/70 font-light">
          Discover our curated selection of artisanal beverages, savory starters, main entrees, and decadent desserts.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  category === cat
                    ? 'bg-cafe-gold text-cafe-dark shadow-md'
                    : 'bg-cafe-dark/60 text-cafe-cream/70 hover:text-cafe-cream hover:bg-cafe-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search dishes, espresso, ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cafe-dark/90 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold transition-colors"
            />
            <Search className="w-4 h-4 text-cafe-gold absolute left-3 top-3" />
          </form>
        </div>

        {/* Dietary Filters */}
        <div className="flex items-center justify-between pt-3 border-t border-cafe-gold/10 text-xs text-cafe-cream/70">
          <div className="flex items-center gap-3">
            <span className="font-medium text-cafe-gold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Dietary Filter:
            </span>
            <button
              onClick={() => setIsVegFilter('all')}
              className={`px-3 py-1 rounded-lg text-[11px] transition-colors ${
                isVegFilter === 'all' ? 'bg-cafe-gold/20 border border-cafe-gold text-cafe-gold' : 'hover:text-cafe-cream'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setIsVegFilter('veg')}
              className={`px-3 py-1 rounded-lg text-[11px] flex items-center gap-1 transition-colors ${
                isVegFilter === 'veg' ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-400' : 'hover:text-cafe-cream'
              }`}
            >
              <Leaf className="w-3 h-3" /> Veg Only
            </button>
            <button
              onClick={() => setIsVegFilter('non-veg')}
              className={`px-3 py-1 rounded-lg text-[11px] transition-colors ${
                isVegFilter === 'non-veg' ? 'bg-red-950/80 border border-red-500 text-red-400' : 'hover:text-cafe-cream'
              }`}
            >
              Non-Veg Only
            </button>
          </div>

          <button
            onClick={loadMenu}
            className="flex items-center gap-1 text-[11px] text-cafe-gold hover:text-cafe-goldHover"
          >
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
        </div>
      </div>

      {/* Menu Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : menuItems.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-3xl space-y-4">
          <Coffee className="w-12 h-12 text-cafe-gold mx-auto opacity-50" />
          <h3 className="font-serif text-2xl font-bold text-cafe-cream">No Items Found</h3>
          <p className="text-xs text-cafe-cream/60 max-w-sm mx-auto">
            We couldn't find any menu items matching your selected category or search filters.
          </p>
          <button
            onClick={() => {
              setCategory('All');
              setSearch('');
              setIsVegFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-cafe-gold text-cafe-dark text-xs font-bold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuCard key={item.id || item._id} item={item} />
          ))}
        </div>
      )}

      {/* Sticky Bottom Floating Bar when Items are in Cart */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-lg bg-cafe-dark/95 border-2 border-cafe-gold shadow-2xl rounded-2xl p-4 flex items-center justify-between backdrop-blur-xl animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cafe-gold text-cafe-dark font-bold flex items-center justify-center text-sm shadow">
              {totalItems}
            </div>
            <div>
              <span className="text-xs font-bold text-cafe-cream block">Order Ready for Dispatch</span>
              <span className="text-[11px] font-mono text-cafe-gold">Total: ${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="px-5 py-2.5 bg-cafe-gold text-cafe-dark font-extrabold text-xs uppercase tracking-wider rounded-xl shadow hover:bg-cafe-goldHover transition-all flex items-center gap-1.5"
          >
            Review & Order <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
