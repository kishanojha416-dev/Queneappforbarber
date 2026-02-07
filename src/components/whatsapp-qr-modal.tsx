import { X, MessageCircle, CheckCircle } from 'lucide-react';

interface WhatsAppQRModalProps {
  onClose: () => void;
}

export function WhatsAppQRModal({ onClose }: WhatsAppQRModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition z-10"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-violet-600 to-blue-600 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Join Queue via WhatsApp</h2>
          <p className="text-violet-100">Scan QR code to book your slot instantly</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* QR Code */}
          <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl p-8 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              {/* Mock QR Code */}
              <div className="aspect-square bg-white border-8 border-slate-900 rounded-xl overflow-hidden relative">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <rect x="0" y="0" width="200" height="200" fill="white" />
                  
                  {/* Corner markers */}
                  <rect x="10" y="10" width="50" height="50" fill="black" />
                  <rect x="20" y="20" width="30" height="30" fill="white" />
                  <rect x="25" y="25" width="20" height="20" fill="black" />
                  
                  <rect x="140" y="10" width="50" height="50" fill="black" />
                  <rect x="150" y="20" width="30" height="30" fill="white" />
                  <rect x="155" y="25" width="20" height="20" fill="black" />
                  
                  <rect x="10" y="140" width="50" height="50" fill="black" />
                  <rect x="20" y="150" width="30" height="30" fill="white" />
                  <rect x="25" y="155" width="20" height="20" fill="black" />
                  
                  {/* Mock data pattern */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    Array.from({ length: 20 }).map((_, j) => (
                      Math.random() > 0.5 && i > 7 && j > 7 && (i < 17 || j < 17) && (
                        <rect 
                          key={`${i}-${j}`}
                          x={10 + i * 9} 
                          y={10 + j * 9} 
                          width="7" 
                          height="7" 
                          fill="black" 
                        />
                      )
                    ))
                  ))}
                </svg>

                {/* Logo in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center shadow-xl">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-lg mb-4">How to Join Queue:</h3>
            
            {[
              {
                step: 1,
                title: 'Open Camera App',
                description: 'Point your phone camera at the QR code above',
              },
              {
                step: 2,
                title: 'Tap Notification',
                description: 'Click the WhatsApp notification that appears',
              },
              {
                step: 3,
                title: 'Send Message',
                description: 'Send "Hi" to start the booking chatbot',
              },
              {
                step: 4,
                title: 'Get Queue Number',
                description: 'Receive your queue position and wait time',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          {/* Alternative Button */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 text-center mb-3">
              Don't have a QR scanner?
            </p>
            <button className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Open WhatsApp Directly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
