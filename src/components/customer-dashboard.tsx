import { 
  ArrowLeft, 
  User, 
  LogOut, 
  Clock, 
  MapPin, 
  Star, 
  Calendar, 
  ChevronRight,
  Bell,
  Search,
  Home,
  Scissors
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../App';

interface CustomerDashboardProps {
  onNavigate: (page: 'landing' | 'customer' | 'barber' | 'qr') => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export function CustomerDashboard({ onNavigate, user, onLogout }: CustomerDashboardProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'favorites'>('overview');

  // Mock data
  const activeBooking = {
    id: 1,
    shopName: 'Royal Cuts & Shaves',
    service: 'Haircut & Beard Trim',
    time: '14:30',
    date: 'Today',
    status: 'confirmed',
    position: 3,
    estimatedWait: '15 min',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop'
  };

  const recentBookings = [
    {
      id: 2,
      shopName: 'Style Studio Pro',
      date: 'Feb 15, 2026',
      service: 'Haircut',
      price: '₹250',
      rating: 5
    },
    {
      id: 3,
      shopName: 'Urban Trim Lounge',
      date: 'Jan 28, 2026',
      service: 'Beard Trim',
      price: '₹150',
      rating: 4
    }
  ];

  const favorites = [
    {
      id: 1,
      name: 'Royal Cuts & Shaves',
      address: 'MG Road, Bangalore',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'The Barber Society',
      address: 'Whitefield, Bangalore',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-blue-50/20 pb-20 md:pb-0">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-violet-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2" onClick={() => onNavigate('landing')}>
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-200">
                <Scissors className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent hidden sm:block">
                TrimTime
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-600 hover:bg-violet-50 rounded-full transition relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800">{user?.name || 'Guest User'}</p>
                  <p className="text-xs text-slate-500">{user?.email || 'guest@example.com'}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-violet-100 to-blue-100 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  <User className="w-5 h-5 text-violet-600" />
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-violet-100/50 p-4 sticky top-24">
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
                    activeTab === 'overview' 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' 
                      : 'text-slate-600 hover:bg-violet-50'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
                    activeTab === 'bookings' 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' 
                      : 'text-slate-600 hover:bg-violet-50'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  My Bookings
                </button>
                <button 
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
                    activeTab === 'favorites' 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' 
                      : 'text-slate-600 hover:bg-violet-50'
                  }`}
                >
                  <Star className="w-5 h-5" />
                  Favorites
                </button>
                <button 
                  onClick={() => onNavigate('landing')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-violet-50 transition font-medium"
                >
                  <Search className="w-5 h-5" />
                  Explore Shops
                </button>
              </nav>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl p-4 text-white">
                  <p className="text-sm font-medium opacity-90 mb-1">Queue Status</p>
                  <p className="text-2xl font-bold">3rd in line</p>
                  <p className="text-xs opacity-75 mt-2">Est. wait: 15 mins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            {/* Active Booking Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-violet-100/50 p-6 sm:p-8"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-500/10 to-blue-500/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Active Appointment</h2>
                  <p className="text-slate-600">You have an upcoming cut today</p>
                </div>
                <div className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-full text-sm inline-flex items-center gap-2 self-start md:self-auto">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Confirmed
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={activeBooking.image} 
                  alt="Shop" 
                  className="w-full md:w-48 h-32 object-cover rounded-xl shadow-md"
                />
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{activeBooking.shopName}</h3>
                      <p className="text-violet-600 font-medium">{activeBooking.service}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Time</p>
                      <p className="font-bold text-slate-800 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-violet-500" /> {activeBooking.time}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Position</p>
                      <p className="font-bold text-slate-800">#{activeBooking.position}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Est. Wait</p>
                      <p className="font-bold text-slate-800">{activeBooking.estimatedWait}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100 flex gap-4">
                <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition">
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition shadow-lg shadow-violet-200">
                  View Ticket
                </button>
              </div>
            </motion.div>

            {/* Recent History */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Recent History</h2>
                <button className="text-violet-600 hover:text-violet-700 font-medium text-sm flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <motion.div 
                    key={booking.id}
                    className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0 text-violet-600 font-bold">
                        {booking.date.split(' ')[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{booking.shopName}</h4>
                        <p className="text-sm text-slate-500">{booking.service} • {booking.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <p className="font-bold text-slate-800">{booking.price}</p>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold">{booking.rating}.0</span>
                      </div>
                      <button className="text-sm text-violet-600 font-medium hover:underline">
                        Rebook
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Favorite Shops */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Your Favorites</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {favorites.map((shop) => (
                  <motion.div 
                    key={shop.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-32 overflow-hidden relative">
                      <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                      <div className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-slate-800 mb-1">{shop.name}</h4>
                      <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                        <MapPin className="w-3 h-3" />
                        {shop.address}
                      </div>
                      <button className="w-full py-2 bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-600 rounded-lg text-sm font-medium transition">
                        Book Appointment
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 lg:hidden z-50 px-6 py-3">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'overview' ? 'text-violet-600' : 'text-slate-400'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'bookings' ? 'text-violet-600' : 'text-slate-400'}`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">Bookings</span>
          </button>
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'favorites' ? 'text-violet-600' : 'text-slate-400'}`}
          >
            <Star className="w-6 h-6" />
            <span className="text-xs font-medium">Favorites</span>
          </button>
          <button 
             onClick={() => onNavigate('landing')}
             className="flex flex-col items-center gap-1 text-slate-400"
          >
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Explore</span>
          </button>
        </div>
      </div>
    </div>
  );
}
