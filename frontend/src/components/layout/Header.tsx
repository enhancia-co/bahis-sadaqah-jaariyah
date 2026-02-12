import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu, X, Home, Users, PlusCircle, BarChart3, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logo from '../../../public/logo.png';
import { clearUser } from '@/redux/authSlice';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Contributors', href: '/contributors', icon: Users },
  { label: 'Collection', href: '/collection', icon: PlusCircle },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  // { label: 'Notifications', href: '/notifications', icon: Bell },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    setIsLogoutOpen(false);
    setIsMenuOpen(false);
    navigate('/login');
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full gradient-header islamic-pattern">
      <div className="container flex h-16 sm:h-18 items-center justify-between safe-padding-x">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <img src={logo} alt="Logo" className="h-9 w -9 sm:h-11 sm:w-11 rounded-xl" />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-primary-foreground tracking-tight">
              Bahis
            </span>
            <span className="text-[10px] sm:text-xs text-primary-foreground/70 font-medium hidden sm:block">
              Sadaqah Jaariyah
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

        {/* Desktop Settings & Logout */}
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
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setIsLogoutOpen(true)}
            aria-label="Log out"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Logout Button */}
        <div className="flex md:hidden items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setIsLogoutOpen(true)}
            aria-label="Log out"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Tablet Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Tablet Navigation Dropdown */}
      {isMenuOpen && (
        <div className="hidden md:block lg:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg animate-fade-in z-40">
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
            <button
              type="button"
              onClick={() => setIsLogoutOpen(true)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-responsive-base font-medium text-foreground hover:bg-muted w-full text-left"
            >
              <LogOut className="h-5 w-5" />
              Log out
            </button>
          </nav>
        </div>
      )}

      {/* Logout confirmation modal */}
      <AlertDialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You will need to sign in again to access the app.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
