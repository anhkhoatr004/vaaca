import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import db from '../data/database';

const iconMap = {
  aerospace: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12h20"></path>
      <path d="M13 2l9 10-9 10"></path>
    </svg>
  ),
  automotive: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  ),
  medical: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>
  ),
};

const Industries = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="industries" className="py-24 bg-brand-navyLight border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 vaaca-reveal">
          <span className="text-brand-gold font-mono text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
            {t('industries.sub')}
          </span>
          <h2 className="text-4xl font-display font-bold text-white mb-6">{t('industries.title')}</h2>
        </div>

        {/* Tab Container */}
        <div className="vaaca-reveal animation-delay-100 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 lg:border border-white/10 rounded-sm bg-brand-navy/50 overflow-hidden shadow-2xl">
          {/* Left Navigation */}
          <div className="lg:col-span-4 flex flex-col bg-brand-navy border-r border-white/10">
            {db.industries.items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`industry-btn ${activeTab === index ? 'active' : ''}`}
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                    activeTab === index ? 'bg-brand-blue' : 'bg-transparent'
                  }`}
                ></div>
                <div
                  className={`mt-1 transition-colors duration-300 ${
                    activeTab === index ? 'text-brand-blue' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                >
                  {iconMap[item.icon]}
                </div>
                <div>
                  <h3
                    className={`font-display font-bold text-lg mb-1 transition-colors duration-300 ${
                      activeTab === index ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {t(`industries.items.${index}.title`)}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    {t(`industries.items.${index}.subtitle`)}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="lg:col-span-8 relative min-h-[500px] lg:min-h-auto">
            {db.industries.items.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-600 ${
                  activeTab === index
                    ? 'opacity-100 visible relative transform scale-100 z-10'
                    : 'opacity-0 invisible absolute transform scale-98 z-0'
                }`}
              >
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-navy/80 to-brand-navy"></div>
                </div>

                <div className="relative h-full flex flex-col justify-center p-8 lg:p-16">
                  <span className="text-[100px] font-display font-bold text-white/[0.03] absolute top-4 right-4 animate-pulse-slow">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
                      {t(`industries.items.${index}.title`)}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                      {t(`industries.items.${index}.description`)}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {item.applications.map((_, appIndex) => (
                        <div
                          key={appIndex}
                          className="flex items-center gap-2 text-slate-400 text-sm border-l border-white/10 pl-3"
                        >
                          {t(`industries.items.${index}.app${appIndex + 1}`)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
