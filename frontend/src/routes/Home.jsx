import React, { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import HeroSlider from "../components/HeroSlider";
import TestimonialsSlider from "../components/TestimonialsSlider";
import PlantModal from "../components/PlantModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import PlantCardSkeleton from "../components/PlantCardSkeleton";
import Toast from "../components/Toast";
import CartSuccessModal from "../components/CartSuccessModal";
import CartModal from "../components/CartModal";
import ThankYouModal from "../components/ThankYouModal";
import PaymentModal from "../components/PaymentModal";
import { getPlants } from "../services/plantService";

function Home() {
  const [plants, setPlants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
  const [cartModal, setCartModal] = useState({ isOpen: false, plant: null });
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [thankYouModal, setThankYouModal] = useState({ isOpen: false, orderData: null });
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, orderData: null });
  
  const categories = [
    "Indoor Plants", 
    "Outdoor Plants", 
    "Succulents", 
    "Air Purifying", 
    "Low Maintenance",
    "Flowering Plants"
  ];

  const fetchPlants = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPlants();
      setPlants(data);
      setFiltered(data);
    } catch (error) {
      console.error('Error fetching plants:', error);
      setError('Failed to load plants. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    const results = plants.filter(
      (plant) =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === "" || plant.categories.includes(category))
    );
    setFiltered(results);
  }, [searchTerm, category, plants]);

  const handleAddToCart = (plant) => {
    // Add to cart items
    setCartItems(prev => {
      const existingItem = prev.find(item => item._id === plant._id);
      if (existingItem) {
        return prev.map(item => 
          item._id === plant._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...plant, quantity: 1 }];
      }
    });
    
    // Show success modal
    setCartModal({
      isOpen: true,
      plant: plant
    });
  };

  const closeToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  const closeCartModal = () => {
    setCartModal({ isOpen: false, plant: null });
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const handleProceedToPayment = (orderData) => {
    setPaymentModal({ isOpen: true, orderData });
  };

  const closeThankYou = () => {
    setThankYouModal({ isOpen: false, orderData: null });
  };

  const handlePaymentSuccess = (orderData) => {
    setThankYouModal({ isOpen: true, orderData });
  };

  const showOrderNotification = (notification) => {
    setToast({
      isVisible: true,
      message: notification.message,
      type: notification.type
    });
  };

  const closePayment = () => {
    setPaymentModal({ isOpen: false, orderData: null });
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prev => 
      prev.map(item => 
        item._id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item._id !== itemId));
  };

  return (
    <div>
      <div className="container">
        {/* Hero Slider */}
        <HeroSlider />
        {/* Search and Filter Section */}
        <div className="card card-glow p-4 mb-4 fade-in">
          <div className="grid grid-2 gap-3">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <FilterDropdown 
              categories={categories} 
              selected={category} 
              setSelected={setCategory} 
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-2 mb-4 gap-3">
          <div className="card card-glow p-4 text-center scale-in floating">
            <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>🌱</div>
            <h3 style={{color: 'var(--secondary-green)', fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.25rem'}}>
              {plants.length}
            </h3>
            <p style={{color: 'var(--text-light)', fontWeight: '500'}}>Total Plants Available</p>
          </div>
          <div className="card card-glow p-4 text-center scale-in floating">
            <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>🔍</div>
            <h3 style={{color: 'var(--accent-green)', fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.25rem'}}>
              {filtered.length}
            </h3>
            <p style={{color: 'var(--text-light)', fontWeight: '500'}}>Plants Found</p>
          </div>
        </div>

        {/* Plants Section */}
        <div id="plants-section">
          <div className="text-center mb-4">
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'var(--primary-green)',
              marginBottom: '1rem'
            }}>
              🌿 Our Plant Collection
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-light)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover our carefully curated selection of healthy, beautiful plants
            </p>
          </div>

          {/* Plants Grid */}
          {error ? (
            <ErrorMessage 
              message={error}
              onRetry={fetchPlants}
            />
          ) : isLoading ? (
            <div className="grid grid-4">
              {[...Array(8)].map((_, index) => (
                <PlantCardSkeleton key={index} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="card card-glow p-6 text-center fade-in">
              <div className="floating" style={{fontSize: '4rem', marginBottom: '1.5rem'}}>🌱</div>
              <h3 style={{color: 'var(--text-dark)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '600'}}>No Plants Found</h3>
              <p style={{color: 'var(--text-light)', fontSize: '1.1rem'}}>Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {setSearchTerm(''); setCategory('');}}
                className="btn btn-primary"
                style={{marginTop: '1.5rem'}}
              >
                🔄 Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-4">
              {filtered.map((plant, index) => (
                <div key={plant._id} className="fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <PlantCard 
                    plant={plant} 
                    onClick={(plant) => {
                      setSelectedPlant(plant);
                      setIsModalOpen(true);
                    }}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Testimonials Section */}
        <div style={{marginTop: '4rem', marginBottom: '3rem'}}>
          <TestimonialsSlider />
        </div>

        {/* Info Section */}
        <div className="grid grid-3 mb-4">
          <div className="card card-glow p-4 text-center floating">
            <div className="floating" style={{fontSize: '3rem', marginBottom: '1.5rem'}}>🌱</div>
            <h4 style={{color: 'var(--secondary-green)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600'}}>Fresh & Healthy</h4>
            <p style={{color: 'var(--text-light)', fontSize: '1rem', lineHeight: '1.5'}}>All plants are carefully selected and nurtured for optimal health</p>
          </div>
          <div className="card card-glow p-4 text-center floating">
            <div className="floating" style={{fontSize: '3rem', marginBottom: '1.5rem'}}>🚚</div>
            <h4 style={{color: 'var(--secondary-green)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600'}}>Safe Delivery</h4>
            <p style={{color: 'var(--text-light)', fontSize: '1rem', lineHeight: '1.5'}}>Secure packaging ensures your plants arrive in perfect condition</p>
          </div>
          <div className="card card-glow p-4 text-center floating">
            <div className="floating" style={{fontSize: '3rem', marginBottom: '1.5rem'}}>💚</div>
            <h4 style={{color: 'var(--secondary-green)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600'}}>Expert Care Tips</h4>
            <p style={{color: 'var(--text-light)', fontSize: '1rem', lineHeight: '1.5'}}>Get personalized care instructions with every plant purchase</p>
          </div>
        </div>
      </div>
      
      {/* Plant Details Modal */}
      <PlantModal 
        plant={selectedPlant}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPlant(null);
        }}
        onAddToCart={handleAddToCart}
      />
      
      {/* Toast Notification */}
      <Toast 
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={closeToast}
        type={toast.type}
      />
      
      {/* Cart Success Modal */}
      <CartSuccessModal 
        isOpen={cartModal.isOpen}
        plant={cartModal.plant}
        onClose={closeCartModal}
        onViewCart={openCart}
      />
      
      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={closeCart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onProceedToPayment={handleProceedToPayment}
      />
      
      {/* Payment Modal */}
      <PaymentModal 
        isOpen={paymentModal.isOpen}
        orderData={paymentModal.orderData}
        onClose={closePayment}
        onPaymentSuccess={handlePaymentSuccess}
        onShowNotification={showOrderNotification}
      />
      
      {/* Thank You Modal */}
      <ThankYouModal 
        isOpen={thankYouModal.isOpen}
        orderData={thankYouModal.orderData}
        onClose={closeThankYou}
      />
    </div>
  );
}

export default Home;
