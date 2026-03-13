import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, Key } from 'lucide-react';
import ListingsManager from './ListingsManager';
import SiteSettingsManager from './SiteSettingsManager';
import ChangePassword from './ChangePassword';
import DashboardOverview from './DashboardOverview';

export default function AdminDashboard() {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Genel Bakış', path: '/admin' },
    { icon: FileText, label: 'İlanlar', path: '/admin/ilanlar' },
    { icon: Settings, label: 'Site Ayarları', path: '/admin/ayarlar' },
    { icon: Key, label: 'Şifre Değiştir', path: '/admin/sifre' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-2">Admin Paneli</h1>
          <p className="text-[#1A1A1A]/60">Site içeriğini yönetin ve düzenleyin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-28">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#B22222] text-white'
                          : 'text-[#1A1A1A] hover:bg-[#B22222]/5'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <Routes>
              <Route index element={<DashboardOverview />} />
              <Route path="ilanlar" element={<ListingsManager />} />
              <Route path="ayarlar" element={<SiteSettingsManager />} />
              <Route path="sifre" element={<ChangePassword />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
