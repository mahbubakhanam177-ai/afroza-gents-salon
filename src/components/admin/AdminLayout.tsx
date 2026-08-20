import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Scissors, 
  Tag, 
  Image as ImageIcon, 
  Star, 
  Settings, 
  LogOut, 
  Globe, 
  Menu, 
  X,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { AdminRoute } from '../../types';
import { useSalon } from '../../context/SalonContext';

interface AdminLayoutProps {
  currentRoute: AdminRoute;
  onNavigate: (route: AdminRoute) => void;
  onNavigatePublic: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentRoute,
  onNavigate,
  onNavigatePublic,
  children
}) => {
  const { config, adminUser, logoutAdmin } = useSalon();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', route: '/admin' as AdminRoute, icon: LayoutDashboard },
    { label: 'Appointments', route: '/admin/appointments' as AdminRoute, icon: CalendarCheck },
    { label: 'Services & Prices', route: '/admin/services' as AdminRoute, icon: Scissors },
    { label: 'Offers', route: '/admin/offers' as AdminRoute, icon: Tag },
    { label: 'Gallery', route: '/admin/gallery' as AdminRoute, icon: ImageIcon },
    { label: 'Reviews', route: '/admin/reviews' as AdminRoute, icon: Star },
    { label: 'Settings', route: '/admin/settings' as AdminRoute, icon: Settings },
  ];

  const handleNavClick = (route: AdminRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    onNavigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col md:flex-row selection:bg-amber-500 selection:text-stone-950">
      
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden bg-stone-900 border-b border-stone-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-stone-950 text-sm">
            AG
          </div>
          <div>
            <span className="font-heading font-extrabold text-stone-100 text-sm block leading-none">
              {config.salonName}
            </span>
            <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider block mt-0.5">
              Admin Control Panel
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-stone-800 text-stone-200 hover:text-amber-400 border border-stone-700"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Sidebar / Mobile Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-stone-900 border-r border-stone-800 flex flex-col justify-between transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:z-auto
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Brand Header */}
        <div>
          <div className="p-6 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black text-lg shadow-lg shadow-amber-500/20 shrink-0">
                A
              </div>
              <div>
                <h1 className="font-heading font-black text-stone-100 text-base tracking-tight uppercase leading-snug">
                  AFROZA GENTS SALON
                </h1>
                <p className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400 inline" />
                  Owner Admin
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                    ${isActive 
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/10' 
                      : 'text-stone-300 hover:bg-stone-800 hover:text-stone-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-amber-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-stone-950" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-stone-800 space-y-2">
          <button
            onClick={onNavigatePublic}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-stone-300 hover:bg-stone-800 hover:text-stone-100 border border-stone-800 transition-colors"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>View Public Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 border border-stone-800 hover:border-rose-900 transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Log Out Admin</span>
          </button>

          <div className="pt-2 text-[10px] text-stone-400 text-center font-mono">
            Logged in as: {adminUser?.email || 'admin@afrozagentssalon.ae'}
          </div>
        </div>
      </aside>

      {/* Overlay backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Main Admin Content Container */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header Bar for Desktop */}
        <header className="hidden md:flex bg-stone-900/80 border-b border-stone-800 px-8 py-4 items-center justify-between backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-lg font-bold font-heading text-stone-100">
              {navItems.find(i => i.route === currentRoute)?.label || 'Salon Admin'}
            </h2>
            <p className="text-xs text-stone-300">
              International City Phase 2 / Warsan 4, Dubai
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onNavigatePublic}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-stone-700 flex items-center gap-2 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Preview Website</span>
            </button>

            <div className="flex items-center gap-2 pl-4 border-l border-stone-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-bold">
                A
              </div>
              <span className="text-xs font-medium text-stone-300">
                {adminUser?.email || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* Route Page Children */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
