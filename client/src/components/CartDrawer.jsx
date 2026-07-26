import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrderApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Plus,
  Minus,
  Trash2,
  MapPin,
  ShoppingBag,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  DollarSign
} from 'lucide-react';
import toast from 'react-hot-toast';

const CartDrawer = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    orderType,
    setOrderType,
    tableNumber,
    setTableNumber,
    isCartOpen,
    setIsCartOpen,
    totalItems,
    subtotal,
    tax,
    totalAmount
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash / Pay at Counter');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  if (!isCartOpen) return null;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Your order cart is empty.');
      return;
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error('Please enter customer name and phone number.');
      return;
    }

    if (orderType === 'Dine-In' && !tableNumber) {
      toast.error('Please select your table number.');
      return;
    }

    if (orderType === 'Delivery' && !deliveryAddress.trim()) {
      toast.error('Please enter your delivery address.');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        customerName,
        customerPhone,
        orderType,
        tableNumber: orderType === 'Dine-In' ? tableNumber : '',
        deliveryAddress: orderType === 'Delivery' ? deliveryAddress : '',
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        paymentMethod,
        specialInstructions
      };

      const res = await createOrderApi(orderPayload);
      if (res.data.success) {
        setPlacedOrder(res.data.data);
        clearCart();
        toast.success(`Order placed successfully! #${res.data.data.orderNumber}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const tableOptions = Array.from({ length: 15 }, (_, i) => `Table ${i + 1}`);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-cafe-dark border-l border-cafe-gold/30 h-full flex flex-col justify-between shadow-2xl relative animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-cafe-gold/20 flex items-center justify-between bg-cafe-darker">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cafe-gold/20 border border-cafe-gold flex items-center justify-center text-cafe-gold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-cafe-cream">Your Order Cart</h2>
              <span className="text-xs text-cafe-gold font-medium">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCartOpen(false);
              setPlacedOrder(null);
            }}
            className="p-2 rounded-full text-cafe-cream/60 hover:text-cafe-gold hover:bg-white/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        {placedOrder ? (
          <div className="p-8 text-center space-y-6 my-auto">
            <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-cafe-gold font-semibold">
                Order Received!
              </span>
              <h3 className="font-serif text-2xl font-bold text-cafe-cream mt-1">
                Order #{placedOrder.orderNumber}
              </h3>
              <p className="text-xs text-cafe-cream/70 mt-2">
                Thank you! Your order has been sent directly to the kitchen & barista staff.
              </p>
            </div>

            <div className="bg-cafe-card p-4 rounded-2xl border border-cafe-gold/20 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-cafe-cream/60">Order Type:</span>
                <span className="font-bold text-cafe-gold">{placedOrder.orderType}</span>
              </div>
              {placedOrder.orderType === 'Dine-In' && (
                <div className="flex justify-between">
                  <span className="text-cafe-cream/60">Table Assignment:</span>
                  <span className="font-extrabold text-cafe-gold text-sm">📍 {placedOrder.tableNumber}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-cafe-cream/60">Total Amount:</span>
                <span className="font-bold text-cafe-cream font-mono">${Number(placedOrder.totalAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cafe-cream/60">Estimated Prep Time:</span>
                <span className="font-semibold text-amber-300">12-15 mins</span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setPlacedOrder(null);
                  navigate('/my-orders');
                }}
                className="w-full py-3 bg-cafe-gold text-cafe-dark rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-cafe-goldHover transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Track Live Order Status <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="p-8 text-center my-auto space-y-4">
            <div className="w-16 h-16 bg-cafe-gold/10 border border-cafe-gold/20 rounded-full flex items-center justify-center text-cafe-gold/60 mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-cafe-cream">Cart is Empty</h3>
            <p className="text-xs text-cafe-cream/60 max-w-xs mx-auto">
              Add your favorite coffees, appetizers, gourmet entrees, and desserts from our digital menu!
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Items List */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-cafe-gold font-semibold block">
                Selected Dishes
              </span>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-cafe-card/70 border border-cafe-gold/15 rounded-xl gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover border border-cafe-gold/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-cafe-cream truncate">{item.name}</h4>
                    <span className="text-[11px] text-cafe-gold font-mono">
                      ${Number(item.price).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-cafe-gold/30 rounded-lg bg-cafe-dark">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-cafe-gold text-cafe-cream/70"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-cafe-gold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-cafe-gold text-cafe-cream/70"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-cafe-cream/40 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Mode Selection */}
            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-cafe-gold font-semibold block">
                Select Order Type
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setOrderType('Dine-In')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    orderType === 'Dine-In'
                      ? 'bg-cafe-gold text-cafe-dark border-cafe-gold shadow-md'
                      : 'bg-cafe-card border-cafe-gold/20 text-cafe-cream/80 hover:border-cafe-gold/50'
                  }`}
                >
                  📍 Dine-In
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('Takeaway')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    orderType === 'Takeaway'
                      ? 'bg-cafe-gold text-cafe-dark border-cafe-gold shadow-md'
                      : 'bg-cafe-card border-cafe-gold/20 text-cafe-cream/80 hover:border-cafe-gold/50'
                  }`}
                >
                  🛍️ Takeaway
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('Delivery')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    orderType === 'Delivery'
                      ? 'bg-cafe-gold text-cafe-dark border-cafe-gold shadow-md'
                      : 'bg-cafe-card border-cafe-gold/20 text-cafe-cream/80 hover:border-cafe-gold/50'
                  }`}
                >
                  🛵 Delivery
                </button>
              </div>

              {/* Dine-In Table Selection */}
              {orderType === 'Dine-In' && (
                <div className="bg-cafe-gold/10 border border-cafe-gold/30 rounded-xl p-3 space-y-1.5">
                  <label className="text-[11px] font-bold text-cafe-gold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Select Your Table Number:
                  </label>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full p-2 rounded-lg bg-cafe-dark border border-cafe-gold/40 text-cafe-cream text-xs font-bold focus:outline-none"
                  >
                    {tableOptions.map((tbl) => (
                      <option key={tbl} value={tbl}>
                        {tbl}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-cafe-cream/60 block">
                    No waiter needed! Staff will bring food straight to this table.
                  </span>
                </div>
              )}

              {/* Delivery Address Input */}
              {orderType === 'Delivery' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-cafe-cream/80">Delivery Address:</label>
                  <textarea
                    rows={2}
                    placeholder="Enter complete address..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-cafe-card border border-cafe-gold/20 text-xs text-cafe-cream focus:outline-none focus:border-cafe-gold"
                  />
                </div>
              )}
            </div>

            {/* Customer Details Form */}
            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-cafe-gold font-semibold block">
                Contact Information
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-cafe-cream/70 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-cafe-card border border-cafe-gold/20 text-xs text-cafe-cream focus:outline-none focus:border-cafe-gold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-cafe-cream/70 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555-0000"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-cafe-card border border-cafe-gold/20 text-xs text-cafe-cream focus:outline-none focus:border-cafe-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-cafe-cream/70 block mb-1">Special Notes for Chef</label>
                <input
                  type="text"
                  placeholder="e.g. Extra hot coffee, less spicy, no onions..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-cafe-card border border-cafe-gold/20 text-xs text-cafe-cream focus:outline-none focus:border-cafe-gold"
                />
              </div>

              <div>
                <label className="text-[11px] text-cafe-cream/70 block mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-cafe-card border border-cafe-gold/20 text-xs text-cafe-cream focus:outline-none focus:border-cafe-gold"
                >
                  <option value="Cash / Pay at Counter">Cash / Pay at Counter</option>
                  <option value="UPI / Card">UPI / Card</option>
                  <option value="Online">Online</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Footer Summary & Checkout Button */}
        {!placedOrder && cartItems.length > 0 && (
          <div className="p-6 border-t border-cafe-gold/20 bg-cafe-darker space-y-4">
            <div className="space-y-1.5 text-xs text-cafe-cream/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-cafe-cream">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Service (5%)</span>
                <span className="font-mono text-cafe-cream">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-cafe-gold">
                <span>Total Amount</span>
                <span className="font-mono">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={submitting}
              className="w-full py-3.5 bg-cafe-gold hover:bg-cafe-goldHover text-cafe-dark rounded-xl font-bold text-xs uppercase tracking-wider shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>Placing Order...</>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Place Order ({orderType === 'Dine-In' ? `${tableNumber}` : orderType})
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
