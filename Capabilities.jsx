import { useTranslation } from 'react-i18next';
import db from '../data/database';

const iconMap = {
  precision: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="21" y1="12" x2="3" y2="12"></line>
      <line x1="12" y1="3" x2="12" y2="21"></line>
      <path d="M7.8 7.8l-1.4-1.4"></path>
      <path d="M16.2 16.2l1.4 1.4"></path>
      <path d="M7.8 16.2l-1.4 1.4"></path>
      <path d="M16.2 7.8l1.4-1.4"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  assembly: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
  ),
  engineering: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
  ),
};

const Capabilities = () => {
  const { t } = useTranslation();

  return (
    <section id="capabilities" className="py-24 bg-brand-navy relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-navyLight/30 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-white/5 pb-8 vaaca-reveal">
          <div className="max-w-2xl">
            <span className="text-brand-gold font-mono text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
              {t('capabilities.sub')}
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              {t('capabilities.title')}
            </h2>
            <p className="text-slate-400 font-light text-lg">{t('capabilities.desc')}</p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {db.capabilities.items.map((item, index) => (
            <div
              key={item.id}
              className={`vaaca-reveal animation-delay-${(index + 1) * 100} capability-card`}
            >
              {/* Top Glow Line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-brand-navy border border-white/10 rounded-sm text-brand-blue group-hover:text-white group-hover:bg-brand-blue transition-all duration-300">
                  {iconMap[item.icon]}
                </div>
                <span className="font-mono text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                  {String(item.id).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-brand-blue transition-colors">
                {t(`capabilities.items.${index}.title`)}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 border-b border-white/5 pb-6">
                {t(`capabilities.items.${index}.description`)}
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8 text-sm text-slate-300">
                {item.features.map((_, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3">
                    <span className="text-brand-gold">✓</span>
                    <span>{t(`capabilities.items.${index}.f${fIndex + 1}`)}</span>
                  </li>
                ))}
              </ul>

              {/* Footer Spec */}
              <div className="flex justify-between items-center pt-4 border-t border-dashed border-white/10">
                <span className="text-[10px] font-mono text-brand-grey uppercase tracking-wider">
                  <span className="text-white">{t(`capabilities.items.${index}.spec`)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
