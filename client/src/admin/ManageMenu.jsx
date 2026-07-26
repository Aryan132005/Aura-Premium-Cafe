import React, { useState, useEffect } from 'react';
import { fetchMenuApi, createMenuItemApi, updateMenuItemApi, deleteMenuItemApi } from '../services/api';
import { Plus, Edit3, Trash2, Check, X, Leaf, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Beverages',
    image: '',
    isVeg: true,
    isAvailable: true,
    isFeatured: false,
    prepTime: '15 mins'
  });
  const [imageFile, setImageFile] = useState(null);

  const categories = ['Beverages', 'Starters', 'Main Course', 'Desserts'];

  const loadMenu = async () => {
    setLoading(true);
    try {
      const res = await fetchMenuApi();
      if (res.data.success) {
        setItems(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Beverages',
      image: '',
      isVeg: true,
      isAvailable: true,
      isFeatured: false,
      prepTime: '15 mins'
    });
    setImageFile(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      isVeg: item.isVeg,
      isAvailable: item.isAvailable,
      isFeatured: item.isFeatured,
      prepTime: item.prepTime || '15 mins'
    });
    setImageFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('isVeg', formData.isVeg);
    data.append('isAvailable', formData.isAvailable);
    data.append('isFeatured', formData.isFeatured);
    data.append('prepTime', formData.prepTime);

    if (imageFile) {
      data.append('imageFile', imageFile);
    } else {
      data.append('image', formData.image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600');
    }

    try {
      const itemId = editingItem ? (editingItem.id || editingItem._id) : null;
      if (editingItem && itemId) {
        const res = await updateMenuItemApi(itemId, data);
        if (res.data.success) {
          toast.success('Menu item updated!');
        }
      } else {
        const res = await createMenuItemApi(data);
        if (res.data.success) {
          toast.success('Menu item created!');
        }
      }
      setModalOpen(false);
      loadMenu();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await deleteMenuItemApi(id);
      if (res.data.success) {
        toast.success('Menu item deleted');
        loadMenu();
      }
    } catch (err) {
      toast.error('Failed to delete item');
    }
  };

  const toggleAvailability = async (item) => {
    const itemId = item.id || item._id;
    if (!itemId) return;
    try {
      const res = await updateMenuItemApi(itemId, { isAvailable: !item.isAvailable });
      if (res.data.success) {
        toast.success(`Item marked as ${!item.isAvailable ? 'Available' : 'Out of Stock'}`);
        loadMenu();
      }
    } catch (err) {
      toast.error('Failed to toggle availability');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
            Inventory & Offerings
          </span>
          <h1 className="font-serif text-3xl font-bold text-cafe-cream">
            Manage Digital Menu
          </h1>
        </div>
        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-full bg-cafe-gold text-cafe-dark font-serif font-bold text-xs uppercase tracking-wider hover:bg-cafe-goldHover transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Menu Item
        </button>
      </div>

      {/* Menu Items Table */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl" />)}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-cafe-gold/20 text-cafe-gold uppercase font-semibold bg-cafe-dark/90">
                  <th className="py-4 px-6">Item</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Dietary</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-cafe-cream/80">
                {items.map((item) => {
                  const itemId = item.id || item._id;
                  return (
                    <tr key={itemId} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover border border-cafe-gold/20 shrink-0"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600';
                            }}
                          />
                          <div>
                            <h4 className="font-serif text-sm font-bold text-cafe-cream">{item.name}</h4>
                            <p className="text-[11px] text-cafe-cream/50 line-clamp-1">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-cafe-gold">{item.category}</td>
                      <td className="py-4 px-4 font-serif font-bold text-cafe-cream">${Number(item.price).toFixed(2)}</td>
                      <td className="py-4 px-4">
                        {item.isVeg ? (
                          <span className="text-emerald-400 font-medium flex items-center gap-1"><Leaf className="w-3 h-3" /> Veg</span>
                        ) : (
                          <span className="text-red-400 font-medium">Non-Veg</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleAvailability(item)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                            item.isAvailable
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                              : 'bg-red-950 text-red-400 border border-red-500/40'
                          }`}
                        >
                          {item.isAvailable ? 'Available' : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 rounded-lg bg-cafe-gold/20 text-cafe-gold hover:bg-cafe-gold hover:text-cafe-dark transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(itemId)}
                          className="p-2 rounded-lg bg-red-950/80 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Dialog for Add/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-cafe-gold/20 pb-4">
              <h3 className="font-serif text-2xl font-bold text-cafe-cream">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-cafe-cream/60 hover:text-cafe-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-cafe-cream/80 mb-1 font-medium">Item Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-cafe-dark border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
                />
              </div>

              <div>
                <label className="block text-xs text-cafe-cream/80 mb-1 font-medium">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-cafe-dark border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-cafe-cream/80 mb-1 font-medium">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-cafe-dark border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs text-cafe-cream/80 mb-1 font-medium">Prep Time</label>
                  <input
                    type="text"
                    value={formData.prepTime}
                    onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                    placeholder="e.g. 15 mins"
                    className="w-full px-4 py-2.5 rounded-xl bg-cafe-dark border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-cafe-cream/80 mb-1 font-medium">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-cafe-dark border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
                />
              </div>

              <div>
                <label className="block text-xs text-cafe-cream/80 mb-1 font-medium">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-cafe-dark border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
                />
              </div>

              <div>
                <label className="block text-xs text-cafe-cream/80 mb-1 font-medium">Or Upload Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full text-xs text-cafe-cream/60 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cafe-gold file:text-cafe-dark hover:file:bg-cafe-goldHover"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/5">
                <label className="flex items-center gap-2 text-xs text-cafe-cream cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVeg}
                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                    className="accent-cafe-gold"
                  /> Veg Item
                </label>

                <label className="flex items-center gap-2 text-xs text-cafe-cream cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="accent-cafe-gold"
                  /> Available
                </label>

                <label className="flex items-center gap-2 text-xs text-cafe-cream cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-cafe-gold"
                  /> Chef Specialty
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-cafe-gold/30 text-cafe-cream text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-cafe-gold text-cafe-dark font-serif font-bold text-xs uppercase tracking-wider hover:bg-cafe-goldHover"
                >
                  {editingItem ? 'Save Changes' : 'Create Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMenu;
