
const Navbar = ({ toggleMobileMenu, currentRoute, navigate }) => {
  const { theme, toggleTheme } = useJob();

  const getPageTitle = () => {
    if (currentRoute === '#/' || currentRoute === '') return 'Dashboard';
    if (currentRoute === '#/applications') return 'Applications';
    if (currentRoute === '#/applications/add') return 'Add New Application';
    if (currentRoute.startsWith('#/applications/edit')) return 'Edit Application';
    if (currentRoute.startsWith('#/applications/')) return 'Application Details';
    if (currentRoute === '#/settings') return 'Settings';
    return 'Job Tracker';
  };

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/80 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Add Button */}
        {currentRoute !== '#/applications/add' && (
          <button
            onClick={() => navigate('#/applications/add')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Job</span>
          </button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
        </button>
      </div>
    </header>
  );
};
