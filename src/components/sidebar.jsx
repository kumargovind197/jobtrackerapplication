const Sidebar = ({ currentRoute, navigate, isMobileOpen, setIsMobileOpen }) => {
  const menuItems = [
    { label: 'Dashboard', path: '#/', icon: LayoutDashboard },
    { label: 'Applications', path: '#/applications', icon: Briefcase },
    { label: 'Add Application', path: '#/applications/add', icon: PlusCircle },
    { label: 'Settings', path: '#/settings', icon: Settings }
  ];

  const handleNav = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar sidebar element */}
      <aside className={`
        fixed lg:static top-0 left-0 z-40 h-full w-64 bg-slate-900 dark:bg-slate-900 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-slate-800
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Logo Header */}
          <div className="p-6 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-white block">CareerTrack</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Job Application OS</span>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileOpen(false)} 
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.path || (item.path !== '#/' && currentRoute.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile widget at bottom */}
        <div className="p-4 border-t border-slate-800 m-4 rounded-xl bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
              JS
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Job Seeker</p>
              <p className="text-xs text-slate-400 truncate">Pro Dashboard</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};