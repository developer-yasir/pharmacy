import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import RecentlyViewed from './pages/RecentlyViewed';
import ProductComparison from './pages/ProductComparison';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import PrivacyPolicy
import TermsOfService from './pages/TermsOfService'; // Import TermsOfService
import UsernameModal from './components/UsernameModal';
import UserContext from './context/UserContext';
import FloatingCart from './components/FloatingCart';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import CustomerChat from './components/CustomerChat';

function App() {
  const { username } = useContext(UserContext);

  return (
    <Router>
      <Navbar />
      <div className="container mt-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/recently-viewed" element={<RecentlyViewed />} />
          <Route path="/compare" element={<ProductComparison />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Add PrivacyPolicy route */}
          <Route path="/terms-of-service" element={<TermsOfService />} /> {/* Add TermsOfService route */}
        </Routes>
      </div>
      {!username && <UsernameModal />} 
      <FloatingCart />
      <Footer />
      <BackToTopButton />
      <CustomerChat />
    </Router>
  );
}

export default App;
