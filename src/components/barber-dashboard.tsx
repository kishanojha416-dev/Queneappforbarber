import { 
  ArrowLeft, 
  User, 
  LogOut, 
  Clock, 
  Users, 
  DollarSign, 
  TrendingUp,
  MoreVertical,
  CheckCircle,
  XCircle,
  Phone,
  MessageCircle,
  Scissors,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../App';
import { Switch } from './ui/switch';

interface BarberDashboardProps {
  onNavigate: (page: 'landing' | 'customer' | 'barber' | 'qr') => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export function BarberDashboard({ onNavigate, user, onLogout }: BarberDashboardProps) {
  const { t } = useLanguage();
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [currentQueue, setCurrentQueue] = useState([
    {
      id: 101,
      name: 'Rahul Sharma',
      service: 'Haircut & Beard',
      timeJoined: '14:15',
      waitTime: '15 min',
      phone: '+919876543210',
      status: 'waiting'
    },
    {
      id: 102,
      name: 'Amit Kumar',
      service: 'Haircut',
      timeJoined: '14:30',
      waitTime: '30 min',
      phone: '+919876543211',
      status: 'waiting'
    },
    {
      id: 103,
      name: 'Priya Singh',
      service: 'Hair Spa',
      timeJoined: '14:45',
      waitTime: '45 min',
      phone: '+919876543212',
      status: 'waiting'
    }
  ]);

  const [servingCustomer, setServingCustomer] = useState<{
    id: number;
    name: string;
    service: string;
    startTime: string;
  } | null>({
    id: 99,
    name: 'Vikram Malhotra',
    service: 'Full Grooming Package',
    startTime: '14:00'
  });

  const handleNextCustomer = () => {
    if (currentQueue.length > 0) {
      const next = currentQueue[0];
      setServingCustomer({
        id: next.id,
        name: next.name,
        service: next.service,
        startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setCurrentQueue(currentQueue.slice(1));
    } else {
      setServingCustomer(null);
    }
  };

  const handleRemoveCustomer = (id: number) => {
    setCurrentQueue(currentQueue.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-blue-50/20">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-violet-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2" onClick={() => onNavigate('landing')}>
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-200">
                <Scissors className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent hidden sm:block">
                TrimTime <span className="text-slate-400 font-medium text-base ml-1">Business</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                <span className={`w-2.5 h-2.5 rounded-full ${isShopOpen ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></span>
                <span className="text-sm font-medium text-slate-600 hidden sm:block">{isShopOpen ? 'Shop Open' : 'Shop Closed'}</span>
                <Switch 
                  checked={isShopOpen} 
                  onCheckedChange={setIsShopOpen}
                />
              </div>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800">Royal Cuts</p>
                  <p className="text-xs text-slate-500">Barber Admin</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                  <span className="font-bold">RC</span>
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
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Today\'s Revenue', value: '₹4,250', icon: <DollarSign className="w-5 h-5" />, color: 'text-green-600', bg: 'bg-green-100' },
            { label: 'Customers Served', value: '18', icon: <Users className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-100' },
            { label: 'Avg Wait Time', value: '14 min', icon: <Clock className="w-5 h-5" />, color: 'text-amber-600', bg: 'bg-amber-100' },
            { label: 'Queue Efficiency', value: '94%', icon: <TrendingUp className="w-5 h-5" />, color: 'text-violet-600', bg: 'bg-violet-100' },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Queue Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Currently Serving */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-violet-200"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-violet-100 font-medium mb-1">Currently Serving</h2>
                  {servingCustomer ? (
                    <h3 className="text-3xl font-bold">{servingCustomer.name}</h3>
                  ) : (
                    <h3 className="text-3xl font-bold opacity-50">No active customer</h3>
                  )}
                </div>
                {servingCustomer && (
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                    <span className="font-mono text-lg font-bold">{servingCustomer.startTime}</span>
                  </div>
                )}
              </div>

              {servingCustomer ? (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="px-3 py-1 bg-white/10 rounded-lg text-sm backdrop-blur-sm border border-white/10">
                      {servingCustomer.service}
                    </div>
                    <div className="px-3 py-1 bg-white/10 rounded-lg text-sm backdrop-blur-sm border border-white/10">
                      ID: #{servingCustomer.id}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={handleNextCustomer}
                      className="flex-1 py-4 bg-white text-violet-600 rounded-xl font-bold hover:bg-violet-50 transition shadow-lg flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Complete & Call Next
                    </button>
                    <button className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition backdrop-blur-sm border border-white/20">
                      <Clock className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={handleNextCustomer}
                  className="w-full py-4 bg-white text-violet-600 rounded-xl font-bold hover:bg-violet-50 transition shadow-lg flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Call Next Customer
                </button>
              )}
            </motion.div>

            {/* Waiting Queue */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  Waiting Queue 
                  <span className="px-2 py-1 bg-violet-100 text-violet-600 text-xs rounded-full">{currentQueue.length}</span>
                </h2>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                <AnimatePresence>
                  {currentQueue.map((customer, idx) => (
                    <motion.div 
                      key={customer.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 hover:bg-slate-50 transition flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-600 transition">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{customer.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>{customer.service}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {customer.waitTime} wait
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                          <MessageCircle className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Phone className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleRemoveCustomer(customer.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {currentQueue.length === 0 && (
                  <div className="p-12 text-center text-slate-500">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>Queue is empty</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-slate-50 hover:bg-violet-50 rounded-xl border border-slate-200 hover:border-violet-200 transition text-center group">
                  <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition">
                    <User className="w-5 h-5 text-violet-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-violet-700">Add Walk-in</span>
                </button>
                <button className="p-4 bg-slate-50 hover:bg-violet-50 rounded-xl border border-slate-200 hover:border-violet-200 transition text-center group">
                  <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition">
                    <Clock className="w-5 h-5 text-violet-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-violet-700">Add Break</span>
                </button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4">Upcoming Appointments</h3>
              <div className="space-y-4">
                {[
                  { time: '16:00', name: 'Suresh Raina', type: 'Booking' },
                  { time: '16:45', name: 'Virat K.', type: 'Booking' },
                  { time: '17:30', name: 'MS Dhoni', type: 'Booking' },
                ].map((apt, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="font-mono font-bold text-slate-600 bg-white px-2 py-1 rounded-lg text-sm shadow-sm">
                      {apt.time}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{apt.name}</p>
                      <p className="text-xs text-violet-600 font-medium">{apt.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
