import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, PlusCircle, BarChart3, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Contributors', href: '/contributors', icon: Users },
  { label: 'Collection', href: '/collection', icon: PlusCircle },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Notifications', href: '/notifications', icon: Bell },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full gradient-header islamic-pattern">
      <div className="container flex h-16 sm:h-18 items-center justify-between safe-padding-x">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-accent shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-lg sm:text-xl font-bold text-accent-foreground">ب</span>
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary-foreground/90 flex items-center justify-center">
              <span className="text-[8px] text-primary">☪</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-primary-foreground tracking-tight">
              Bahis
            </span>
            <span className="text-[10px] sm:text-xs text-primary-foreground/70 font-medium hidden sm:block">
              Swadakathun Jariyaah
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Settings */}
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/settings">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button - Only show on tablet (md to lg) */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Tablet Navigation Dropdown - Only show on tablet (md to lg) */}
      {isMenuOpen && (
        <div className="hidden md:block lg:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg animate-fade-in">
          <nav className="container safe-padding-x py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-responsive-base font-medium transition-all",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/settings"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-responsive-base font-medium transition-all",
                isActive('/settings')
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
