import { ArrowLeft, QrCode, MessageCircle, CheckCircle, Clock, Bell, Smartphone, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

interface QRCodePageProps {
  onNavigate: (page: 'landing' | 'customer' | 'barber' | 'qr') => void;
}

export function QRCodePage({ onNavigate }: QRCodePageProps) {
  const [copied, setCopied] = useState(false);
  const whatsappNumber = '+918382930021';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=Hi,%20I%20want%20to%20join%20the%20queue`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(whatsappNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Scan QR Code',
      description: 'Use your phone camera or WhatsApp to scan the QR code below',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Chat with Bot',
      description: 'Send "Hi" to our WhatsApp bot to start the conversation',
      color: 'from-purple-500 to-blue-500',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Join Queue',
      description: 'Follow the bot\'s instructions to join the barber queue',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Get Notified',
      description: 'Receive real-time updates on WhatsApp when it\'s your turn',
      color: 'from-cyan-500 to-teal-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-blue-50/20">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-violet-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 text-slate-700 hover:text-violet-600 transition font-medium"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-blue-500 rounded-3xl shadow-2xl shadow-violet-300/50 mb-6"
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <QrCode className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Join the Queue
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Scan the QR code or click the button below to book your slot via WhatsApp chatbot
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - QR Code */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-blue-400 rounded-3xl blur-2xl opacity-20"></div>
              <motion.div 
                className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-violet-200/50 border border-violet-100"
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 30px 60px rgba(139, 92, 246, 0.3)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* QR Code */}
                <div className="bg-white rounded-2xl p-8 mb-6 border-4 border-violet-100">
                  <motion.div
                    className="w-full aspect-square bg-gradient-to-br from-violet-100 to-blue-100 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {/* QR Code Placeholder - In production, use a real QR code library */}
                    <div className="text-center">
                      <QrCode className="w-48 h-48 text-violet-600 mx-auto mb-4" />
                      <p className="text-sm text-slate-600">Scan with your phone camera</p>
                    </div>
                  </motion.div>
                </div>

                {/* WhatsApp Button */}
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold text-lg transition shadow-lg shadow-green-200"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-6 h-6" />
                  Open WhatsApp Chat
                </motion.a>

                {/* Phone Number */}
                <div className="mt-4 p-4 bg-violet-50 rounded-xl">
                  <p className="text-sm text-slate-600 mb-2 text-center">Or message us directly:</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-lg font-bold text-violet-600">{whatsappNumber}</span>
                    <motion.button
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-white rounded-lg transition"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-violet-600" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6">How to Join the Queue</h2>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                  whileHover={{ 
                    x: 10,
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-blue-400/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-violet-100/50 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start gap-4">
                      {/* Step Number */}
                      <motion.div
                        className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {idx + 1}
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-violet-600">
                            {step.icon}
                          </div>
                          <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
                        </div>
                        <p className="text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              className="mt-8 p-6 bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl border border-violet-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-violet-600" />
                What Happens Next?
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>You'll receive your queue position instantly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Get real-time updates as the queue moves forward</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Receive a notification 5 minutes before your turn</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Arrive at the shop and skip the wait!</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {[
            {
              icon: <MessageCircle className="w-8 h-8" />,
              title: 'WhatsApp Integration',
              description: 'Use the app you already know and love',
            },
            {
              icon: <Bell className="w-8 h-8" />,
              title: 'Live Notifications',
              description: 'Stay updated with real-time queue alerts',
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: 'Save Time',
              description: 'No more standing in long queues',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              whileHover={{ 
                y: -10,
                rotateY: 10,
                transition: { type: 'spring', stiffness: 300 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-blue-400 rounded-2xl blur opacity-10 group-hover:opacity-20 transition"></div>
              <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-violet-100/50 shadow-lg group-hover:shadow-xl transition-all text-center">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-violet-200 mx-auto"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <p className="text-slate-600 mb-4">
            Need help? Contact our support team
          </p>
          <motion.button
            onClick={() => onNavigate('landing')}
            className="px-8 py-3 border-2 border-violet-200 text-violet-600 hover:bg-violet-50 rounded-xl font-semibold transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
