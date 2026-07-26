import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Customer Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Reservation from './pages/Reservation';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import MyReservations from './pages/MyReservations';
import MyOrders from './pages/MyOrders';

// Admin Pages
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ManageOrders from './admin/ManageOrders';
import ManageMenu from './admin/ManageMenu';
import ManageReservations from './admin/ManageReservations';
import ManageEvents from './admin/ManageEvents';
import ManageEnquiries from './admin/ManageEnquiries';

import CartDrawer from './components/CartDrawer';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-cafe-dark text-cafe-cream">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1c100b',
            color: '#faf7f2',
            border: '1px solid #c9a227'
          }
        }}
      />

      {/* Global Shopping Cart Drawer */}
      <CartDrawer />

      {/* Show Navbar on customer-facing routes */}
      {!isAdminPath && <Navbar />}

      <div className="flex-1">
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route
            path="/my-reservations"
            element={
              <ProtectedRoute>
                <MyReservations />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="menu" element={<ManageMenu />} />
            <Route path="reservations" element={<ManageReservations />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="enquiries" element={<ManageEnquiries />} />
          </Route>
        </Routes>
      </div>

      {/* Show Footer on customer-facing routes */}
      {!isAdminPath && <Footer />}
    </div>
  );
};

export default App;
