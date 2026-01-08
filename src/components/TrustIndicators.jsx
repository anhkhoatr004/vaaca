import { useTranslation } from 'react-i18next';
import db from '../data/database';

const TrustIndicators = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-brand-navy border-b border-brand-navyLight py-16 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] tech-grid"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 vaaca-reveal">
          <p className="font-mono text-brand-blue/70 text-xs font-bold uppercase tracking-[0.3em] mb-3">
            {t('trust.sub')}
          </p>
          <h3 className="text-slate-300 font-light text-lg">
            {t('trust.title')}
          </h3>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/5">
          {db.clients.map((client, index) => (
            <div
              key={client.name}
              className={`vaaca-reveal animation-delay-${(index % 2) * 100} group relative h-32 flex items-center justify-center border-r border-b border-white/5 bg-brand-navy hover:bg-white/[0.02] transition-colors`}
            >
              <span className="text-slate-500 group-hover:text-white font-display font-black text-xl md:text-3xl opacity-60 group-hover:opacity-100 transform group-hover:scale-110 transition-transform duration-300">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
