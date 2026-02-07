import { useState, createContext, useContext } from 'react';
import { LandingPage } from './components/landing-page';
import { CustomerDashboard } from './components/customer-dashboard';
import { BarberDashboard } from './components/barber-dashboard';
import { QRCodePage } from './components/qr-code-page';
import { LoginModal } from './components/login-modal';
import { RegisterModal } from './components/register-modal';

type Page = 'landing' | 'customer' | 'barber' | 'qr';
type Language = 'en' | 'hi' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    explore: 'Explore',
    howItWorks: 'How it Works',
    login: 'Login',
    register: 'Register',
    searchPlaceholder: 'Search by location, barber name, or service...',
    filters: 'Filters',
    happyCustomers: 'Happy Customers',
    partnerShops: 'Partner Shops',
    avgTimeSaved: 'Avg Time Saved',
    popularShops: 'Popular Barber Shops Near You',
    viewAll: 'View All',
    bookNow: 'Book Now',
    open: 'Open',
    closed: 'Closed',
    waitTime: 'Wait time',
    reviews: 'reviews',
    whyChoose: 'Why Choose TrimTime?',
    saveTime: 'Save Time',
    saveTimeDesc: 'No more waiting in long queues. Book your slot and arrive on time.',
    findNearby: 'Find Nearby',
    findNearbyDesc: 'Discover the best barber shops in your area with live availability.',
    topRated: 'Top Rated',
    topRatedDesc: 'Read reviews and ratings from real customers before booking.',
    readyToSkip: 'Ready to Skip the Wait?',
    joinThousands: 'Join thousands of happy customers and start booking your barber appointments smarter',
    getStarted: 'Get Started Free',
    forBarbers: 'For Barber Shops',
    skipWait: 'Skip the Wait,',
    bookInstantly: 'Book Your Cut Instantly',
    heroDesc: 'Find the best barber shops near you, check live queues, and book your slot on WhatsApp',
  },
  hi: {
    home: 'होम',
    explore: 'एक्सप्लोर',
    howItWorks: 'कैसे काम करता है',
    login: 'लॉगिन',
    register: 'रजिस्टर',
    searchPlaceholder: 'लोकेशन, नाई की दुकान या सेवा से खोजें...',
    filters: 'फ़िल्टर',
    happyCustomers: 'खुश ग्राहक',
    partnerShops: 'पार्टनर दुकानें',
    avgTimeSaved: 'औसत समय बचाया',
    popularShops: 'आपके पास लोकप्रिय नाई की दुकानें',
    viewAll: 'सभी देखें',
    bookNow: 'अभी बुक करें',
    open: 'खुला',
    closed: 'बंद',
    waitTime: 'प्रतीक्षा समय',
    reviews: 'समीक्षाएं',
    whyChoose: 'TrimTime क्यों चुनें?',
    saveTime: 'समय बचाएं',
    saveTimeDesc: 'अब लंबी कतारों में इंतजार नहीं। अपना स्लॉट बुक करें और समय पर पहुंचें।',
    findNearby: 'पास में खोजें',
    findNearbyDesc: 'अपने क्षेत्र में लाइव उपलब्धता के साथ सर्वश्रेष्ठ नाई की दुकानें खोजें।',
    topRated: 'टॉप रेटेड',
    topRatedDesc: 'बुकिंग से पहले असली ग्राहकों की समीक्षाएं और रेटिंग पढ़ें।',
    readyToSkip: 'इंतजार छोड़ने के लिए तैयार हैं?',
    joinThousands: 'हजारों खुश ग्राहकों के साथ जुड़ें और स्मार्ट तरीके से बुकिंग शुरू करें',
    getStarted: 'मुफ्त में शुरू करें',
    forBarbers: 'नाई की दुकानों के लिए',
    skipWait: 'इंतजार छोड़ें,',
    bookInstantly: 'तुरंत अपना कट बुक करें',
    heroDesc: 'अपने पास सर्वश्रेष्ठ नाई की दुकानें खोजें, लाइव कतारें देखें और WhatsApp पर स्लॉट बुक करें',
  },
  ar: {
    home: 'الرئيسية',
    explore: 'استكشف',
    howItWorks: 'كيف يعمل',
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    searchPlaceholder: 'البحث حسب الموقع أو اسم الحلاق أو الخدمة...',
    filters: 'الفلاتر',
    happyCustomers: 'عملاء سعداء',
    partnerShops: 'محلات شريكة',
    avgTimeSaved: 'متوسط الوقت المحفوظ',
    popularShops: 'محلات الحلاقة الشهيرة بالقرب منك',
    viewAll: 'عرض الكل',
    bookNow: 'احجز الآن',
    open: 'مفتوح',
    closed: 'مغلق',
    waitTime: 'وقت الانتظار',
    reviews: 'التقييمات',
    whyChoose: 'لماذا تختار TrimTime؟',
    saveTime: 'وفر الوقت',
    saveTimeDesc: 'لا مزيد من الانتظار في الطوابير الطويلة. احجز موعدك واصل في الوقت المحدد.',
    findNearby: 'ابحث بالقرب منك',
    findNearbyDesc: 'اكتشف أفضل محلات الحلاقة في منطقتك مع التوفر المباشر.',
    topRated: 'الأعلى تقييماً',
    topRatedDesc: 'اقرأ التقييمات والمراجعات من العملاء الحقيقيين قبل الحجز.',
    readyToSkip: 'هل أنت مستعد لتخطي الانتظار؟',
    joinThousands: 'انضم إلى آلاف العملاء السعداء وابدأ بحجز مواعيد الحلاقة بذكاء',
    getStarted: 'ابدأ مجاناً',
    forBarbers: 'لمحلات الحلاقة',
    skipWait: 'تخطى الانتظار،',
    bookInstantly: 'احجز قصتك على الفور',
    heroDesc: 'اعثر على أفضل محلات الحلاقة بالقرب منك، تحقق من الطوابير المباشرة واحجز موعدك على WhatsApp',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  const handleRegister = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowRegisterModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage 
            onNavigate={setCurrentPage}
            onLoginClick={() => setShowLoginModal(true)}
            onRegisterClick={() => setShowRegisterModal(true)}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />
        );
      case 'customer':
        return <CustomerDashboard onNavigate={setCurrentPage} user={user} onLogout={handleLogout} />;
      case 'barber':
        return <BarberDashboard onNavigate={setCurrentPage} user={user} onLogout={handleLogout} />;
      case 'qr':
        return <QRCodePage onNavigate={setCurrentPage} />;
      default:
        return (
          <LandingPage 
            onNavigate={setCurrentPage}
            onLoginClick={() => setShowLoginModal(true)}
            onRegisterClick={() => setShowRegisterModal(true)}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-blue-50/20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {renderPage()}
        
        {showLoginModal && (
          <LoginModal 
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
          />
        )}
        
        {showRegisterModal && (
          <RegisterModal 
            onClose={() => setShowRegisterModal(false)}
            onRegister={handleRegister}
          />
        )}
      </div>
    </LanguageContext.Provider>
  );
}
