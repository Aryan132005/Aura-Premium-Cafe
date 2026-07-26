import React, { useState, useEffect } from 'react';
import { fetchEnquiriesApi, updateEnquiryStatusApi, deleteEnquiryApi } from '../services/api';
import { MessageSquare, Mail, Trash2, CheckCircle2, Clock, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;

      const res = await fetchEnquiriesApi(params);
      if (res.data.success) {
        setEnquiries(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter]);

  const handleStatusChange = async (id, status) => {
    if (!id) return;
    try {
      const res = await updateEnquiryStatusApi(id, status);
      if (res.data.success) {
        toast.success(`Marked as ${status}`);
        loadEnquiries();
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Delete this message?')) return;
    try {
      const res = await deleteEnquiryApi(id);
      if (res.data.success) {
        toast.success('Enquiry deleted');
        loadEnquiries();
      }
    } catch (err) {
      toast.error('Failed to delete enquiry');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
          Customer Messages
        </span>
        <h1 className="font-serif text-3xl font-bold text-cafe-cream">
          Manage Enquiries
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['all', 'unread', 'read', 'resolved'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
              statusFilter === st
                ? 'bg-cafe-gold text-cafe-dark shadow-md'
                : 'bg-cafe-dark/60 text-cafe-cream/70 hover:text-cafe-cream'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Enquiries List */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl" />)}
        </div>
      ) : enquiries.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl space-y-2">
          <MessageSquare className="w-10 h-10 text-cafe-gold mx-auto opacity-50" />
          <h3 className="font-serif text-xl font-bold text-cafe-cream">No Messages Found</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((e) => {
            const enquiryId = e.id || e._id;
            return (
              <div key={enquiryId} className="glass-panel p-6 rounded-2xl space-y-3 border border-cafe-gold/20">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-cafe-gold" />
                    <div>
                      <h4 className="font-bold text-cafe-cream text-sm">{e.name}</h4>
                      <span className="text-xs text-cafe-cream/60">{e.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      e.status === 'unread' ? 'bg-amber-950 text-amber-400 border border-amber-500/40' :
                      e.status === 'read' ? 'bg-blue-950 text-blue-400 border border-blue-500/40' :
                      'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {e.status}
                    </span>
                    <span className="text-[11px] text-cafe-cream/50">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>
                  <strong className="text-xs text-cafe-gold block mb-1">Subject: {e.subject}</strong>
                  <p className="text-xs text-cafe-cream/80 leading-relaxed bg-black/30 p-3 rounded-xl border border-cafe-gold/10">
                    "{e.message}"
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  {e.status === 'unread' && (
                    <button
                      onClick={() => handleStatusChange(enquiryId, 'read')}
                      className="px-3 py-1 rounded-lg bg-blue-950 text-blue-300 text-xs font-semibold hover:bg-blue-900 flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> Mark Read
                    </button>
                  )}
                  {e.status !== 'resolved' && (
                    <button
                      onClick={() => handleStatusChange(enquiryId, 'resolved')}
                      className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 text-xs font-semibold hover:bg-emerald-900 flex items-center gap-1 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Resolved
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(enquiryId)}
                    className="p-1.5 rounded-lg bg-red-950 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageEnquiries;
