import React, { useState, useEffect } from 'react';
import { fetchEventsApi, createEventApi, updateEventApi, deleteEventApi } from '../services/api';
import { Plus, Edit3, Trash2, X, Calendar, Clock, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00 - 22:00',
    image: '',
    location: 'Main Dining Lounge & Terrace',
    isActive: true
  });
  const [imageFile, setImageFile] = useState(null);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await fetchEventsApi();
      if (res.data.success) {
        setEvents(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '19:00 - 22:00',
      image: '',
      location: 'Main Dining Lounge & Terrace',
      isActive: true
    });
    setImageFile(null);
    setModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      image: event.image,
      location: event.location || 'Main Dining Lounge',
      isActive: event.isActive
    });
    setImageFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);
    data.append('time', formData.time);
    data.append('location', formData.location);
    data.append('isActive', formData.isActive);

    if (imageFile) {
      data.append('imageFile', imageFile);
    } else {
      data.append('image', formData.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800');
    }

    try {
      const eventId = editingEvent ? (editingEvent.id || editingEvent._id) : null;
      if (editingEvent && eventId) {
        const res = await updateEventApi(eventId, data);
        if (res.data.success) {
          toast.success('Event updated successfully');
        }
      } else {
        const res = await createEventApi(data);
        if (res.data.success) {
          toast.success('Event created successfully');
        }
      }
      setModalOpen(false);
      loadEvents();
    } catch (err) {
      toast.error('Failed to save event');
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await deleteEventApi(id);
      if (res.data.success) {
        toast.success('Event deleted');
        loadEvents();
      }
    } catch (err) {
      toast.error('Failed to delete event');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
            Promotions & Announcements
          </span>
          <h1 className="font-serif text-3xl font-bold text-cafe-cream">
            Manage Café Events
          </h1>
        </div>
        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-full bg-cafe-gold text-cafe-dark font-serif font-bold text-xs uppercase tracking-wider hover:bg-cafe-goldHover transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Create Event
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[1, 2].map(i => <div key={i} className="h-48 bg-white/5 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => {
            const eventId = event.id || event._id;
            return (
              <div key={eventId} className="glass-panel p-6 rounded-2xl space-y-4 border border-cafe-gold/20 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-44 rounded-xl overflow-hidden relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      event.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-red-950 text-red-400'
                    }`}>
                      {event.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-cafe-cream">{event.title}</h3>
                  <p className="text-xs text-cafe-cream/70 line-clamp-2">{event.description}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-cafe-gold pt-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {event.time}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
                  <button
                    onClick={() => openEditModal(event)}
                    className="px-3 py-1.5 rounded-lg bg-cafe-gold/20 text-cafe-gold text-xs font-semibold hover:bg-cafe-gold hover:text-cafe-dark transition-colors flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(eventId)}
                    className="px-3 py-1.5 rounded-lg bg-red-950/80 text-red-400 text-xs font-semibold hover:bg-red-600 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-cafe-gold/20 pb-4">
              <h3 className="font-serif text-2xl font-bold text-cafe-cream">
                {editingEvent ? 'Edit Event' : 'Create Event'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-cafe-cream/60 hover:text-cafe-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-cafe-cream/80 mb-1 font-medium">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-cafe-dark border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-cafe-cream/80 mb-1 font-medium">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-cafe-dark border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs text-cafe-cream/80 mb-1 font-medium">Time Slot *</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g. 19:00 - 22:00"
                    className="w-full px-4 py-2.5 rounded-xl bg-cafe-dark border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-cafe-cream/80 mb-1 font-medium">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-cafe-dark border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
                />
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
                <label className="block text-xs text-cafe-cream/80 mb-1 font-medium">Or Upload Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full text-xs text-cafe-cream/60 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cafe-gold file:text-cafe-dark"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs text-cafe-cream cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="accent-cafe-gold"
                  /> Published & Active Event
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
                  {editingEvent ? 'Save Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
