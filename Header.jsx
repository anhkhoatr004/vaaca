import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import db from '../data/database';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'vn' : 'en';
    setCurrentLang(newLang);
    i18n.changeLanguage(newLang);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header
        id="vaaca-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-brand-navy/95 backdrop-blur-md border-brand-navyLight shadow-lg py-3'
            : 'bg-transparent border-white/5 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 flex items-center justify-center bg-brand-navyLight border border-brand-blue/30 rounded-sm overflow-hidden transition-all duration-300 group-hover:border-brand-blue/80 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-transparent"></div>
              <span className="font-display font-bold text-brand-blue text-xl relative z-10">V</span>
            </div>
            <div className="flex flex-col">
              <h1 className="font-display font-bold text-xl text-white tracking-wide leading-none group-hover:text-brand-blue transition-colors">
                {db.settings.brandName}
              </h1>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.2em] mt-1 group-hover:text-white transition-colors">
                {db.settings.brandSlogan}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {['capabilities', 'industries', 'supplyChain'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors uppercase tracking-wide group py-2"
              >
                <span>{t(`nav.${item}`)}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span className="text-brand-gold font-bold">{currentLang.toUpperCase()}</span>
            </button>

            <div className="h-4 w-px bg-white/10"></div>

            <a href="#contact" className="btn-primary">
              <span>{t('nav.quote')}</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-xs font-mono text-white border border-white/20 px-2 py-1 rounded"
            >
              {currentLang.toUpperCase()}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 hover:bg-white/5 rounded transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-brand-navy/98 backdrop-blur-xl lg:hidden transition-transform duration-400 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <span className="font-display font-bold text-2xl text-white">MENU</span>
            <button onClick={closeMobileMenu} className="text-slate-400 hover:text-white">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {['capabilities', 'industries', 'supplyChain'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={closeMobileMenu}
                className="text-2xl font-display font-bold text-slate-300 hover:text-brand-gold border-b border-white/5 pb-4"
              >
                {t(`nav.${item}`)}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
