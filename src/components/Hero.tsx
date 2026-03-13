import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Hero() {
  const [settings, setSettings] = useState({
    hero_title_1: 'Geleceğinize',
    hero_title_2: 'Değer Katan Yatırımlar',
    hero_description: "2018'den beri İstanbul ve Şile bölgesinde güven ve tecrübeyle hayallerinizi gerçeğe dönüştürüyoruz.",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['hero_title_1', 'hero_title_2', 'hero_description']);

    if (error) {
      console.error('Error loading settings:', error);
    } else if (data) {
      const settingsObj: any = {};
      data.forEach((item) => {
        settingsObj[item.key] = item.value;
      });
      setSettings((prev) => ({ ...prev, ...settingsObj }));
    }
  };

  return (
    <section
      id="anasayfa"
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-24 md:pt-32"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-[#B22222]">{settings.hero_title_1}</span>
              <span className="block text-[#1A1A1A]">{settings.hero_title_2}</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-[#1A1A1A]/70 font-light leading-relaxed">
              {settings.hero_description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 sm:pt-8">
              <a
                href="#ilanlar"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('ilanlar');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-8 sm:px-10 py-4 bg-[#B22222] text-white font-semibold text-base sm:text-lg rounded-lg hover:bg-[#9B1C1C] transition-all duration-200 shadow-sm text-center cursor-pointer"
              >
                İlanları Keşfedin
              </a>
              <a
                href="#iletisim"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('iletisim');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-8 sm:px-10 py-4 border-2 border-[#B22222] text-[#B22222] font-semibold text-base sm:text-lg rounded-lg hover:bg-[#B22222] hover:text-white transition-all duration-200 text-center cursor-pointer"
              >
                İletişime Geçin
              </a>
            </div>
          </div>

          <div className="relative opacity-0 animate-[fadeIn_0.6s_ease-out_0.3s_forwards] max-w-lg mx-auto lg:max-w-none">
            <div className="border-4 border-[#B22222] rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Lüks Villa"
                className="w-full h-full object-cover aspect-square"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
