import { Mail, MapPin, ExternalLink } from 'lucide-react';

const footerLinks = {
  Platform: ['Markets', 'Trading', 'Portfolio', 'Analytics', 'API Access'],
  Resources: ['Documentation', 'Tutorials', 'Blog', 'Market News', 'Economic Calendar'],
  Company: ['About Us', 'Careers', 'Press', 'Partners', 'Contact'],
  Legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Risk Disclosure', 'Compliance'],
};

export default function Footer() {
  return (
    <footer className="relative bg-surface border-t border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-neon flex items-center justify-center">
                <span className="text-black font-bold text-sm">E</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                ELITEBLOCK<span className="text-neon">MARKET</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              The premier destination for elite crypto and forex trading. 
              Institutional-grade tools for every trader.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <Mail size={14} className="text-neon" />
                <span>support@eliteblockmarket.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <MapPin size={14} className="text-neon" />
                <span>94 Nith Street, Glasgow, Scotland</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 hover:text-neon text-sm transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link}
                      <ExternalLink
                        size={10}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; 2024 ELITEBLOCKMARKET. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              Terms
            </a>
            <a href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              Privacy
            </a>
            <a href="#" className="text-white/30 hover:text-white text-xs transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
