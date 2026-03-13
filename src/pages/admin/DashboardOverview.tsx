import { useEffect, useState } from 'react';
import { FileText, TrendingUp, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalListings: 0,
    categories: {} as Record<string, number>,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const { data: listings } = await supabase.from('listings').select('category');

    if (listings) {
      const categories: Record<string, number> = {};
      listings.forEach((listing) => {
        categories[listing.category] = (categories[listing.category] || 0) + 1;
      });

      setStats({
        totalListings: listings.length,
        categories,
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Hoş Geldiniz</h2>
        <p className="text-[#1A1A1A]/60 leading-relaxed">
          Göktürk GYO admin paneline hoş geldiniz. Bu panelden site içeriğini yönetebilir,
          ilanları düzenleyebilir ve site ayarlarını güncelleyebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#B22222]/10 p-3 rounded-lg">
              <FileText className="text-[#B22222]" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#1A1A1A] mb-1">{stats.totalListings}</p>
          <p className="text-[#1A1A1A]/60 text-sm">Toplam İlan</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#B22222]/10 p-3 rounded-lg">
              <TrendingUp className="text-[#B22222]" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#1A1A1A] mb-1">
            {Object.keys(stats.categories).length}
          </p>
          <p className="text-[#1A1A1A]/60 text-sm">Kategori</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#B22222]/10 p-3 rounded-lg">
              <Eye className="text-[#B22222]" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#1A1A1A] mb-1">Aktif</p>
          <p className="text-[#1A1A1A]/60 text-sm">Site Durumu</p>
        </div>
      </div>

      {Object.keys(stats.categories).length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">Kategori Dağılımı</h3>
          <div className="space-y-4">
            {Object.entries(stats.categories).map(([category, count]) => (
              <div key={category}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#1A1A1A] font-medium">{category}</span>
                  <span className="text-[#1A1A1A]/60">{count} ilan</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#B22222] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(count / stats.totalListings) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
