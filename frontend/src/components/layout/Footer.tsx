import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative gradient-header islamic-pattern overflow-hidden">
      {/* Decorative Crescent */}
      <div className="absolute top-4 right-8 text-4xl text-primary-foreground/10 hidden md:block">
        ☪
      </div>
      
      <div className="container safe-padding-x py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <span className="text-lg font-bold text-accent-foreground">ب</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary-foreground">Bahis</h3>
                <p className="text-xs text-primary-foreground/70">Swadakathun Jariyaah</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              A trusted platform for managing charitable contributions and Sadaqah Jariyah funds with transparency and efficiency.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Dashboard', href: '/' },
                { label: 'Contributors', href: '/contributors' },
                { label: 'Add Collection', href: '/collection' },
                { label: 'Reports', href: '/reports' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 text-accent" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 text-accent" />
                <span>info@bahis.org</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <span>Islamic Center, Main Road, City</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
              Support the Cause
            </h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Every contribution makes a difference. Support ongoing charitable initiatives.
            </p>
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Heart className="h-4 w-4" />
              Contribute Now
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/60 text-center sm:text-left">
              © {currentYear} Bahis - Swadakathun Jariyaah. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-primary-foreground/60">
              <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
