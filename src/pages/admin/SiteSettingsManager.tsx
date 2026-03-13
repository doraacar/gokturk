import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Settings {
  hero_title_1: string;
  hero_title_2: string;
  hero_description: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
}

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<Settings>({
    hero_title_1: '',
    hero_title_2: '',
    hero_description: '',
    contact_phone: '',
    contact_email: '',
    contact_address: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data, error } = await supabase.from('site_settings').select('key, value');

    if (error) {
      console.error('Error loading settings:', error);
    } else if (data) {
      const settingsObj: any = {};
      data.forEach((item) => {
        settingsObj[item.key] = item.value;
      });
      setSettings(settingsObj);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccessMessage('');

    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString(),
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from('site_settings')
        .update({ value: update.value, updated_at: update.updated_at })
        .eq('key', update.key);

      if (error) {
        console.error('Error updating setting:', error);
        alert('Ayarlar güncellenirken bir hata oluştu');
        setLoading(false);
        return;
      }
    }

    setSuccessMessage('Ayarlar başarıyla güncellendi');
    setLoading(false);

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1A1A1A]">Site Ayarları</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Ana Sayfa Hero Bölümü</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Başlık 1
              </label>
              <input
                type="text"
                value={settings.hero_title_1}
                onChange={(e) => setSettings({ ...settings, hero_title_1: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Başlık 2
              </label>
              <input
                type="text"
                value={settings.hero_title_2}
                onChange={(e) => setSettings({ ...settings, hero_title_2: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Açıklama
              </label>
              <textarea
                value={settings.hero_description}
                onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">İletişim Bilgileri</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Telefon
              </label>
              <input
                type="text"
                value={settings.contact_phone}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                E-posta
              </label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Adres
              </label>
              <input
                type="text"
                value={settings.contact_address}
                onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              />
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 w-full bg-[#B22222] hover:bg-[#9B1C1C] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 justify-center"
        >
          <Save size={20} />
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </div>
  );
}
