import React, { useState, useEffect } from 'react';
import { getAllOrdersApi, updateOrderStatusApi, deleteOrderApi } from '../services/api';
import {
  Utensils,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  RefreshCw,
  Trash2,
  Check,
  Flame,
  ShoppingBag,
  MapPin,
  Phone,
  User,
  DollarSign
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [filterStatus, filterType]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrdersApi({
        status: filterStatus,
        orderType: filterType,
        search
      });
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load live orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus, newPaymentStatus) => {
    try {
      const res = await updateOrderStatusApi(id, {
        status: newStatus,
        paymentStatus: newPaymentStatus
      });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchOrders();
      }
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await deleteOrderApi(id);
      if (res.data.success) {
        toast.success('Order deleted');
        fetchOrders();
      }
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case 'Preparing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            <Flame className="w-3.5 h-3.5 text-orange-400" /> Preparing
          </span>
        );
      case 'Served':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <Utensils className="w-3.5 h-3.5 text-emerald-400" /> Served / Ready
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40">
            <AlertCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Refresh Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-cafe-cream">
            Live Order Management Dashboard
          </h1>
          <p className="text-xs text-cafe-cream/60 mt-1">
            Track and manage real-time table orders, takeaway pickups, and deliveries.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 bg-cafe-card border border-cafe-gold/30 hover:border-cafe-gold text-cafe-gold rounded-full text-xs font-semibold transition-all shadow-md"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Live Refresh
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-cafe-card/70 border border-cafe-gold/20 rounded-2xl p-4 flex flex-wrap items-center gap-4 shadow-xl">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-cafe-gold absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Order #, Customer, Phone, Table..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchOrders()}
            className="w-full pl-9 pr-4 py-2 bg-cafe-dark/80 border border-cafe-gold/20 rounded-xl text-xs text-cafe-cream focus:outline-none focus:border-cafe-gold"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-cafe-dark/80 border border-cafe-gold/20 rounded-xl text-xs text-cafe-cream focus:outline-none focus:border-cafe-gold"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Served">Served / Ready</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Order Type Filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 bg-cafe-dark/80 border border-cafe-gold/20 rounded-xl text-xs text-cafe-cream focus:outline-none focus:border-cafe-gold"
        >
          <option value="all">All Order Types</option>
          <option value="Dine-In">Dine-In (Table)</option>
          <option value="Takeaway">Takeaway</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>

      {/* Orders Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-cafe-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-cafe-card/40 border border-cafe-gold/20 rounded-2xl p-12 text-center text-cafe-cream/60">
          No live orders found matching criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`bg-cafe-card border rounded-2xl p-6 transition-all shadow-xl backdrop-blur-xl relative ${
                order.status === 'Pending'
                  ? 'border-amber-500/50 ring-1 ring-amber-500/30'
                  : 'border-cafe-gold/20'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-cafe-gold/15">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-cafe-gold">
                      #{order.orderNumber}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <span className="text-[11px] text-cafe-cream/50 mt-1 block">
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                </div>

                {/* Table Number or Order Type Badge */}
                <div>
                  {order.orderType === 'Dine-In' ? (
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-cafe-gold text-cafe-dark border border-cafe-gold shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
                      <MapPin className="w-4 h-4 fill-cafe-dark" /> {order.tableNumber || 'TABLE N/A'}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-cafe-cream border border-white/20 uppercase tracking-wider">
                      {order.orderType}
                    </span>
                  )}
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-2 my-4 text-xs text-cafe-cream/80 bg-white/5 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-cafe-gold" />
                  <span className="font-semibold text-cafe-cream">{order.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cafe-gold" />
                  <span>{order.customerPhone}</span>
                </div>
                {order.orderType === 'Delivery' && order.deliveryAddress && (
                  <div className="col-span-2 text-cafe-cream/70 mt-1 pt-1 border-t border-white/10">
                    <strong>Delivery Address:</strong> {order.deliveryAddress}
                  </div>
                )}
              </div>

              {/* Ordered Items List */}
              <div className="space-y-2 mb-4">
                <span className="text-[11px] uppercase tracking-wider text-cafe-gold font-semibold block">
                  Items to Serve ({order.items ? order.items.length : 0})
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {order.items &&
                    order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs py-1.5 px-3 bg-cafe-dark/60 rounded-lg border border-cafe-gold/10"
                      >
                        <span className="font-medium text-cafe-cream">
                          <strong className="text-cafe-gold mr-2">{item.quantity}x</strong>
                          {item.itemName}
                        </span>
                        <span className="font-mono text-cafe-cream/70">
                          ${Number(item.subtotal).toFixed(2)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {order.specialInstructions && (
                <div className="mb-4 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
                  <strong className="text-amber-400">Special Note:</strong> {order.specialInstructions}
                </div>
              )}

              {/* Total & Action Bar */}
              <div className="pt-4 border-t border-cafe-gold/15 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-cafe-cream/50 uppercase tracking-wider block">
                    Total ({order.paymentMethod})
                  </span>
                  <span className="text-lg font-bold font-mono text-cafe-gold">
                    ${Number(order.totalAmount).toFixed(2)}
                  </span>
                </div>

                {/* Quick Status Action Buttons */}
                <div className="flex items-center gap-2">
                  {order.status === 'Pending' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'Preparing')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow transition-all flex items-center gap-1"
                    >
                      <Flame className="w-3.5 h-3.5" /> Start Preparing
                    </button>
                  )}

                  {order.status === 'Preparing' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'Served', 'Paid')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition-all flex items-center gap-1"
                    >
                      <Utensils className="w-3.5 h-3.5" /> Mark Served / Ready
                    </button>
                  )}

                  {order.status === 'Served' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'Completed', 'Paid')}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl shadow transition-all flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Complete Order
                    </button>
                  )}

                  {order.status !== 'Cancelled' && order.status !== 'Completed' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'Cancelled')}
                      className="px-2.5 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs rounded-xl border border-red-500/30 transition-all"
                      title="Cancel Order"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(order.id)}
                    className="p-1.5 text-cafe-cream/40 hover:text-red-400 transition-colors"
                    title="Delete Order"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
