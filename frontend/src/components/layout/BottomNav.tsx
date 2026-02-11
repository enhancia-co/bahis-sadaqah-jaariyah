import { Link, useLocation } from 'react-router-dom';
import { Home, Users, PlusCircle, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Contributors', href: '/contributors', icon: Users },
    { label: 'Collection', href: '/collection', icon: PlusCircle },
    { label: 'Reports', href: '/reports', icon: BarChart3 },
    { label: 'Settings', href: '/settings', icon: Settings },
];

export function BottomNav() {
    const location = useLocation();

    const isActive = (href: string) => {
        if (href === '/') return location.pathname === '/';
        return location.pathname.startsWith(href);
    };

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
            <div className="grid grid-cols-5 h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 transition-all duration-200",
                                active
                                    ? "text-primary bg-primary/5"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "h-5 w-5 transition-all",
                                    active && "scale-110"
                                )}
                            />
                            <span className={cn(
                                "text-[10px] font-medium",
                                active && "font-semibold"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
