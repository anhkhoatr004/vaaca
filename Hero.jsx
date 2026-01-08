import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import db from '../data/database';

const Hero = () => {
  const { t } = useTranslation();
  const heroBgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroBgRef.current && scrolled < 800) {
        heroBgRef.current.style.transform = `translateY(${scrolled * 0.4}px) scale(1.05)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-brand-navy">
      {/* Background Image with Parallax */}
      <div
        ref={heroBgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out will-change-transform scale-105"
        style={{
          backgroundImage: `url('${db.hero.backgroundImage}')`,
          backgroundPosition: 'center 30%',
        }}
      ></div>

      {/* Overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/60"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent"></div>
      <div className="absolute inset-0 z-0 opacity-[0.05] tech-grid"></div>
      <div className="scanline"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-24 lg:pt-48 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="vaaca-reveal inline-flex items-center gap-3 border-l-2 border-brand-gold pl-4">
              <span className="text-brand-gold font-condensed font-bold tracking-[0.2em] uppercase text-xs lg:text-sm">
                {t('hero.badge')}
              </span>
            </div>

            {/* Title */}
            <h1 className="vaaca-reveal animation-delay-100 text-3xl md:text-5xl lg:text-7xl font-display font-bold text-white leading-[1.2] lg:leading-[1.1] tracking-tight drop-shadow-2xl">
              <span>{t('hero.titleLine1')}</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
                {t('hero.titleLine2')}
              </span>{' '}
              <br />
              <span>{t('hero.titleLine3')}</span>
            </h1>

            {/* Description */}
            <p className="vaaca-reveal animation-delay-200 text-base lg:text-xl text-slate-300 font-light max-w-2xl leading-relaxed border-l border-white/10 pl-6">
              {t('hero.desc')}
            </p>

            {/* Action Buttons */}
            <div className="vaaca-reveal animation-delay-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 pt-4">
              <a
                href="#capabilities"
                className="w-full sm:w-auto group relative overflow-hidden bg-brand-gold text-brand-navy font-display font-bold uppercase tracking-wider text-xs lg:text-sm px-8 py-4 rounded-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{t('hero.btnPrimary')}</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
              </a>

              <a
                href="#supply-chain"
                className="w-full sm:w-auto btn-secondary transform hover:-translate-y-1"
              >
                <svg className="w-4 h-4 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span>{t('hero.btnSecondary')}</span>
              </a>
            </div>
          </div>

          {/* Right Column - HUD Animation */}
          <div className="hidden lg:block lg:col-span-4 relative h-full min-h-[400px] vaaca-reveal animation-delay-400">
            {/* Rotating Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full animate-spin-slower"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-brand-blue/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>

            {/* Glass Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-navy/60 backdrop-blur-md border border-brand-blue/30 p-6 rounded-sm max-w-xs w-full shadow-2xl animate-tech-glow">
              {/* Card Header */}
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                <span className="text-xs font-mono text-brand-blue animate-pulse">{t('hero.status')}</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-brand-gold rounded-full"></div>
                  <div className="w-1 h-1 bg-brand-gold rounded-full"></div>
                  <div className="w-1 h-1 bg-brand-gold rounded-full"></div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-blue/20 rounded text-brand-blue">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                      <rect x="9" y="9" width="6" height="6"></rect>
                      <line x1="9" y1="1" x2="9" y2="4"></line>
                      <line x1="15" y1="1" x2="15" y2="4"></line>
                      <line x1="9" y1="20" x2="9" y2="23"></line>
                      <line x1="15" y1="20" x2="15" y2="23"></line>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t('hero.cnc')}</div>
                    <div className="text-brand-grey text-xs">{t('hero.cncDesc')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Geo Coordinates */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <div className="text-[10px] font-mono text-slate-500 flex flex-col gap-1">
          <span>LAT: 10.8231° N</span>
          <span>LNG: 106.6297° E</span>
          <span className="text-brand-gold">HCMC, VIETNAM HQ</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
