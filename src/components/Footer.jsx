import { useTranslation } from 'react-i18next';
import db from '../data/database';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-navyDark border-t border-white/10 pt-20 pb-10 text-sm relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-brand-blue text-white font-display font-bold rounded-sm">
                V
              </div>
              <span className="font-display font-bold text-xl text-white tracking-wide">
                {db.settings.brandName}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed pr-4">{db.footer.description}</p>
          </div>

          {/* Column 2 - Explore */}
          <div>
            <h4 className="font-condensed font-bold text-white uppercase tracking-[0.2em] mb-6">
              {t('footer.explore')}
            </h4>
            <ul className="space-y-3">
              {db.footer.links.explore.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Capabilities */}
          <div>
            <h4 className="font-condensed font-bold text-white uppercase tracking-[0.2em] mb-6">
              {t('nav.capabilities')}
            </h4>
            <ul className="space-y-3">
              {db.footer.links.capabilities.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-condensed font-bold text-white uppercase tracking-[0.2em] mb-6">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <svg
                  className="w-5 h-5 text-brand-gold shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span dangerouslySetInnerHTML={{ __html: t('footer.address') }} />
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <svg
                  className="w-5 h-5 text-brand-gold shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href={`mailto:${db.footer.email}`} className="hover:text-white transition-colors">
                  {db.footer.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="text-slate-500 font-mono">{t('footer.rights')}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
