import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Filter,
  User,
  LogIn,
  Globe,
  Scissors,
  Navigation,
  Heart,
  ChevronDown,
  LogOut,
  X,
  MessageCircle,
  Smartphone,
  CheckCircle,
  LocateFixed
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../App';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'customer' | 'barber' | 'qr') => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export function LandingPage({ onNavigate, onLoginClick, onRegisterClick, isAuthenticated, user, onLogout }: LandingPageProps) {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    rating: 0,
    distance: 10,
    status: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const homeRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
    { code: 'hi' as const, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ar' as const, name: 'العربية', flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  const initialBarberShops = [
    {
      id: 1,
      name: 'Royal Cuts & Shaves',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 245,
      distance: 1.2,
      lat: 12.9750,
      lng: 77.6000,
      address: 'MG Road, Bangalore',
      description: 'Premium grooming experience with expert barbers',
      waitTime: '15 min',
      status: 'open' as const,
      price: 300,
    },
    {
      id: 2,
      name: 'Style Studio Pro',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 189,
      distance: 0.8,
      lat: 12.9800,
      lng: 77.6400,
      address: 'Indiranagar, Bangalore',
      description: 'Modern cuts, traditional service',
      waitTime: '10 min',
      status: 'open' as const,
      price: 250,
    },
    {
      id: 3,
      name: 'Gentleman\'s Corner',
      image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 312,
      distance: 2.0,
      lat: 12.9350,
      lng: 77.6150,
      address: 'Koramangala, Bangalore',
      description: 'Classic barber shop with modern twist',
      waitTime: '20 min',
      status: 'open' as const,
      price: 200,
    },
    {
      id: 4,
      name: 'Urban Trim Lounge',
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 156,
      distance: 1.5,
      lat: 12.9100,
      lng: 77.6400,
      address: 'HSR Layout, Bangalore',
      description: 'Quick cuts, great vibes',
      waitTime: '25 min',
      status: 'closed' as const,
      price: 180,
    },
    {
      id: 5,
      name: 'The Barber Society',
      image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 428,
      distance: 0.5,
      lat: 12.9700,
      lng: 77.7500,
      address: 'Whitefield, Bangalore',
      description: 'Award-winning barbers, luxury service',
      waitTime: '12 min',
      status: 'open' as const,
      price: 400,
    },
    {
      id: 6,
      name: 'Fresh Fade Studio',
      image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop',
      rating: 4.5,
      reviews: 203,
      distance: 1.8,
      lat: 12.9050,
      lng: 77.5900,
      address: 'JP Nagar, Bangalore',
      description: 'Specializing in fades and modern styles',
      waitTime: '18 min',
      status: 'open' as const,
      price: 220,
    },
  ];

  const [barberShops, setBarberShops] = useState(initialBarberShops);

  // Haversine formula to calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return Number(d.toFixed(1));
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        
        // Update distances
        const updatedShops = initialBarberShops.map(shop => ({
          ...shop,
          distance: calculateDistance(latitude, longitude, shop.lat, shop.lng)
        })).sort((a, b) => a.distance - b.distance);
        
        setBarberShops(updatedShops);
        setIsLocating(false);
        toast.success("Location updated! Showing nearest shops.");
      },
      (error) => {
        console.error("Error getting location:", error.code, error.message);
        setIsLocating(false);
        
        let errorMessage = "Unable to retrieve your location.";
        if (error.code === 1) { // PERMISSION_DENIED
          errorMessage = "Location permission denied. Please enable it in your browser settings.";
        } else if (error.code === 2) { // POSITION_UNAVAILABLE
          errorMessage = "Location information is unavailable.";
        } else if (error.code === 3) { // TIMEOUT
          errorMessage = "The request to get user location timed out.";
        }
        
        toast.error(errorMessage);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const filteredShops = barberShops.filter(shop => {
    // Search filter
    if (searchQuery && !shop.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !shop.address.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Rating filter
    if (filters.rating > 0 && shop.rating < filters.rating) {
      return false;
    }
    
    // Distance filter
    if (shop.distance > filters.distance) {
      return false;
    }
    
    // Status filter
    if (filters.status !== 'all' && shop.status !== filters.status) {
      return false;
    }
    
    // Price filter
    if (filters.priceRange === 'budget' && shop.price > 200) {
      return false;
    }
    if (filters.priceRange === 'mid' && (shop.price < 200 || shop.price > 300)) {
      return false;
    }
    if (filters.priceRange === 'premium' && shop.price < 300) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-violet-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                TrimTime
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection(homeRef)}
                className="text-slate-700 hover:text-violet-600 transition font-medium"
              >
                {t('home')}
              </button>
              <button 
                onClick={() => scrollToSection(exploreRef)}
                className="text-slate-700 hover:text-violet-600 transition font-medium"
              >
                {t('explore')}
              </button>
              <button 
                onClick={() => scrollToSection(howItWorksRef)}
                className="text-slate-700 hover:text-violet-600 transition font-medium"
              >
                {t('howItWorks')}
              </button>
              
              {/* Language Selector */}
              <div className="relative">
                <motion.button 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-violet-50 transition"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">{currentLanguage.flag} {currentLanguage.name}</span>
                  <ChevronDown className="w-4 h-4 text-slate-600" />
                </motion.button>

                {showLanguageMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-violet-100 overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-violet-50 transition flex items-center gap-2"
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLanguageMenu(false);
                        }}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {isAuthenticated ? (
                <div className="relative">
                  <motion.button 
                    className="flex items-center gap-2 px-4 py-2 text-violet-600 hover:bg-violet-50 rounded-lg transition font-medium"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </motion.button>

                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-violet-100 overflow-hidden"
                    >
                      <button
                        className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-violet-50 transition flex items-center gap-2"
                        onClick={() => {
                          onLogout();
                          setShowUserMenu(false);
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <>
                  <motion.button 
                    onClick={onLoginClick}
                    className="flex items-center gap-2 px-4 py-2 text-violet-600 hover:bg-violet-50 rounded-lg transition font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogIn className="w-4 h-4" />
                    {t('login')}
                  </motion.button>
                  
                  <motion.button 
                    onClick={onRegisterClick}
                    className="px-5 py-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white rounded-xl transition font-medium shadow-lg shadow-violet-200"
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('register')}
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - HOME */}
      <div ref={homeRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t('skipWait')}
            </span>
            <br />
            <span className="text-slate-800">{t('bookInstantly')}</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('heroDesc')}
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-blue-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-violet-100 border border-violet-100/50 p-2 flex items-center gap-3">
              <Search className="w-5 h-5 text-violet-400 ml-4" />
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400 text-lg"
              />
              <motion.button 
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white rounded-xl transition font-medium shadow-lg shadow-violet-200"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">{t('filters')}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { number: '500+', label: t('happyCustomers') },
            { number: '50+', label: t('partnerShops') },
            { number: '30min', label: t('avgTimeSaved') },
          ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              className="text-center"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* EXPLORE - Barber Shop Cards */}
        <div ref={exploreRef} className="scroll-mt-20">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-slate-800">{t('popularShops')}</h2>
            
            <div className="flex items-center gap-4">
              <motion.button 
                onClick={handleUseLocation}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition font-medium border ${
                  userLocation 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLocating}
              >
                {isLocating ? (
                  <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                ) : userLocation ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <LocateFixed className="w-4 h-4" />
                )}
                {userLocation ? 'Location Active' : 'Use My Location'}
              </motion.button>
              
              <button className="text-violet-600 hover:text-violet-700 font-medium flex items-center gap-2">
                {t('viewAll')}
                <Navigation className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop, idx) => (
              <motion.div 
                key={shop.id}
                className="group relative bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden border border-violet-100/50 shadow-lg shadow-violet-100/50 hover:shadow-xl hover:shadow-violet-200/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  rotateX: 5,
                  transition: { type: 'spring', stiffness: 300 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    src={shop.image} 
                    alt={shop.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  {/* Distance Badge */}
                  <motion.div 
                    className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-sm font-semibold text-slate-700 shadow-lg flex items-center gap-1"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <MapPin className="w-3.5 h-3.5 text-violet-500" />
                    {shop.distance} km
                  </motion.div>

                  {/* Status Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1.5 backdrop-blur-md rounded-full text-xs font-semibold shadow-lg ${
                    shop.status === 'open' 
                      ? 'bg-emerald-100/90 text-emerald-700' 
                      : 'bg-rose-100/90 text-rose-700'
                  }`}>
                    {shop.status === 'open' ? `● ${t('open')}` : `● ${t('closed')}`}
                  </div>

                  {/* Favorite Icon */}
                  <motion.button 
                    className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition shadow-lg group/heart"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="w-5 h-5 text-slate-400 group-hover/heart:text-rose-500 group-hover/heart:fill-rose-500 transition" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{shop.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-amber-700">{shop.rating}</span>
                    </div>
                    <span className="text-sm text-slate-500">({shop.reviews} {t('reviews')})</span>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{shop.address}</span>
                  </div>

                  {/* Wait Time */}
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-violet-500" />
                    <span className="text-sm text-slate-600">{t('waitTime')}: <span className="font-semibold text-violet-600">{shop.waitTime}</span></span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-500 mb-4">{shop.description}</p>

                  {/* Book Now Button */}
                  <motion.button 
                    onClick={() => onNavigate('qr')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-violet-200"
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('bookNow')}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS Section */}
        <div ref={howItWorksRef} className="mt-20 mb-12 scroll-mt-20">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              How It Works
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                icon: <Smartphone className="w-8 h-8" />,
                title: 'Scan QR Code',
                description: 'Scan the shop\'s QR code or click "Get Started"',
              },
              {
                step: '2',
                icon: <MessageCircle className="w-8 h-8" />,
                title: 'WhatsApp Chat',
                description: 'Chat with our bot on WhatsApp to join queue',
              },
              {
                step: '3',
                icon: <Clock className="w-8 h-8" />,
                title: 'Track Position',
                description: 'Get real-time updates on your queue position',
              },
              {
                step: '4',
                icon: <CheckCircle className="w-8 h-8" />,
                title: 'Arrive On Time',
                description: 'Come when it\'s your turn, no waiting!',
              },
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ 
                  y: -10,
                  rotateY: 10,
                  transition: { type: 'spring', stiffness: 300 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-blue-400 rounded-2xl blur opacity-10 group-hover:opacity-30 transition"></div>
                <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-violet-100/50 shadow-lg shadow-violet-100/50 group-hover:shadow-2xl group-hover:shadow-violet-200/50 transition-all">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-violet-200 mt-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 mb-12">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              {t('whyChoose')}
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: t('saveTime'),
                description: t('saveTimeDesc'),
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: t('findNearby'),
                description: t('findNearbyDesc'),
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: t('topRated'),
                description: t('topRatedDesc'),
              },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ 
                  y: -10,
                  rotateX: 10,
                  transition: { type: 'spring', stiffness: 300 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-blue-400 rounded-2xl blur opacity-10 group-hover:opacity-20 transition"></div>
                <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-violet-100/50 shadow-lg shadow-violet-100/50 hover:shadow-xl hover:shadow-violet-200/50 transition-all">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-violet-200"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-20 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-blue-400 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl shadow-violet-300/50">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('readyToSkip')}
            </h2>
            <p className="text-lg text-violet-100 mb-8 max-w-2xl mx-auto">
              {t('joinThousands')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                onClick={() => onNavigate('qr')}
                className="px-8 py-4 bg-white hover:bg-violet-50 text-violet-600 rounded-xl font-bold transition-all shadow-xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                {t('getStarted')}
              </motion.button>
              <motion.button 
                onClick={() => onNavigate('barber')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold transition-all border-2 border-white/30 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Scissors className="w-5 h-5" />
                {t('forBarbers')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-white/50 backdrop-blur-lg border-t border-violet-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200">
                  <Scissors className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  TrimTime
                </span>
              </div>
              <p className="text-slate-600 text-sm">
                Making barber visits effortless, one queue at a time.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-violet-600 transition">Features</a></li>
                <li><a href="#" className="hover:text-violet-600 transition">How it Works</a></li>
                <li><a href="#" className="hover:text-violet-600 transition">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-violet-600 transition">About Us</a></li>
                <li><a href="#" className="hover:text-violet-600 transition">Contact</a></li>
                <li><a href="#" className="hover:text-violet-600 transition">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-violet-600 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-violet-600 transition">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-violet-100/50 mt-8 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2026 TrimTime. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Filter Modal */}
      {showFilters && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition z-10"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-violet-600 to-blue-600 p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Filter Barber Shops</h2>
              <p className="text-violet-100">Find your perfect match</p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Price Range
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'budget', label: '< ₹200' },
                    { value: 'mid', label: '₹200-300' },
                    { value: 'premium', label: '> ₹300' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFilters({ ...filters, priceRange: option.value })}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                        filters.priceRange === option.value
                          ? 'bg-violet-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Minimum Rating: {filters.rating > 0 ? `${filters.rating}+` : 'Any'}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Any</span>
                  <span>5.0</span>
                </div>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Max Distance: {filters.distance} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={filters.distance}
                  onChange={(e) => setFilters({ ...filters, distance: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1 km</span>
                  <span>20 km</span>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'open', label: 'Open Now' },
                    { value: 'closed', label: 'Closed' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFilters({ ...filters, status: option.value })}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                        filters.status === option.value
                          ? 'bg-violet-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setFilters({
                      priceRange: 'all',
                      rating: 0,
                      distance: 10,
                      status: 'all'
                    });
                  }}
                  className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold transition hover:bg-slate-50"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white rounded-xl font-semibold transition shadow-lg shadow-violet-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
