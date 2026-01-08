import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import db from '../data/database';

const iconMap = {
  search: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  audit: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      <path d="M9 14l2 2 4-4"></path>
    </svg>
  ),
  risk: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  ),
  trace: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  ),
};

const Counter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const targetNum = parseFloat(target);
          const increment = targetNum / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < targetNum) {
              setCount(Math.ceil(current));
              requestAnimationFrame(updateCounter);
            } else {
              setCount(targetNum);
            }
          };

          updateCounter();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{count}</span>;
};

const SupplyChain = () => {
  const { t } = useTranslation();

  return (
    <section id="supply-chain" className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 vaaca-reveal">
          <div className="max-w-3xl">
            <span className="text-brand-blue font-mono text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
              {t('supplyChain.sub')}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              <span>{t('supplyChain.titleLine1')}</span> <br />
              <span className="text-brand-blue">{t('supplyChain.titleLine2')}</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed border-l-2 border-brand-gold pl-6">
              {t('supplyChain.desc')}
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {db.supplyChain.steps.map((step, index) => (
            <div
              key={step.id}
              className={`vaaca-reveal animation-delay-${(index + 1) * 100} relative z-10 group bg-brand-navyLight/50 border border-white/5 p-6 backdrop-blur-sm hover:border-brand-gold/50 transition-all duration-300 hover:bg-brand-navyLight/80`}
            >
              <div className="mb-4 text-slate-300 group-hover:text-brand-gold transition-colors">
                {iconMap[step.icon]}
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                {t(`supplyChain.steps.${index}.title`)}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t(`supplyChain.steps.${index}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Counter */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
          {db.supplyChain.stats.map((stat, index) => (
            <div key={index} className={`vaaca-reveal animation-delay-${(index + 1) * 100}`}>
              <div className="text-3xl font-display font-bold text-white mb-1 flex">
                {stat.prefix}
                <Counter target={stat.value} />
                {stat.unit}
              </div>
              <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                {t(`supplyChain.stats.${['delivery', 'defect', 'cycle', 'status'][index]}`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupplyChain;
