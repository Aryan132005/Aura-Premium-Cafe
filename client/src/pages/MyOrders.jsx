import React, { useState, useEffect } from 'react';
import { getMyOrdersApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Utensils, Clock, CheckCircle2, AlertCircle, ShoppingBag, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrdersApi();
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load your orders.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5 animate-spin" /> Order Received
          </span>
        );
      case 'Preparing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Utensils className="w-3.5 h-3.5 animate-pulse" /> Chef is Preparing
          </span>
        );
      case 'Served':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Served / Ready
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
            <AlertCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-cafe-dark text-cafe-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-cafe-gold font-semibold">
            Live Status & History
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-cafe-cream mt-2">
            My Orders
          </h1>
          <p className="text-cafe-cream/60 text-sm mt-2 max-w-md mx-auto">
            Track your dine-in table orders, takeaway pickups, and online deliveries in real time.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-cafe-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-cafe-card/50 border border-cafe-gold/20 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 bg-cafe-gold/10 border border-cafe-gold/30 rounded-2xl flex items-center justify-center text-cafe-gold mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-cafe-cream">No Orders Placed Yet</h3>
            <p className="text-cafe-cream/60 text-sm mt-2 mb-6">
              Feeling hungry? Sit back, browse our exquisite menu, and place your order directly online!
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cafe-gold text-cafe-dark text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-cafe-goldHover transition-all shadow-lg"
            >
              Browse Menu & Order Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-cafe-card/60 border border-cafe-gold/20 hover:border-cafe-gold/40 rounded-3xl p-6 sm:p-8 transition-all shadow-2xl backdrop-blur-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cafe-gold/15 pb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-lg font-bold text-cafe-gold">
                        #{order.orderNumber}
                      </span>
                      <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-white/5 border border-cafe-gold/30 text-cafe-gold uppercase tracking-wider">
                        {order.orderType}
                      </span>
                      {order.orderType === 'Dine-In' && order.tableNumber && (
                        <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-cafe-gold/20 text-cafe-gold border border-cafe-gold/40 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {order.tableNumber}
                        </span>
                      )}
                    </div>
                    <span className="block text-xs text-cafe-cream/50 mt-1">
                      Placed on {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {getStatusBadge(order.status)}
                    <span className="text-xl font-bold font-mono text-cafe-gold">
                      ${Number(order.totalAmount).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items Breakdown */}
                <div className="mt-6 space-y-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-cafe-gold/80 block">
                    Ordered Dishes
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {order.items &&
                      order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-cafe-gold/20 text-cafe-gold text-xs font-bold flex items-center justify-center">
                              {item.quantity}x
                            </span>
                            <span className="text-sm font-medium text-cafe-cream">
                              {item.itemName}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-cafe-cream/70">
                            ${Number(item.subtotal).toFixed(2)}
                          </span>
                        </div>
                      ))}
                  </div>

                  {order.specialInstructions && (
                    <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200">
                      <strong>Special Request:</strong> {order.specialInstructions}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
