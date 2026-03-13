import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Coffee } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    contact_phone: '+90 212 123 45 67',
    contact_email: 'info@gokturkgyo.com',
    contact_address: 'Şile, İstanbul',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['contact_phone', 'contact_email', 'contact_address']);

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

  const handleFooterNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith('#')) {
      const sectionId = href.substring(1);

      if (location.pathname === '/') {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  };

  return (
    <footer id="iletisim" className="bg-white text-[#1A1A1A] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#B22222]">Göktürk GYO</h3>
            <p className="text-[#1A1A1A]/70 leading-relaxed">
              2018'den beri İstanbul ve Şile bölgesinde güven ve tecrübeyle hizmet veriyoruz.
            </p>
            <div className="flex items-center gap-2 text-[#B22222]">
              <Coffee size={20} />
              <span className="text-sm italic">Bir kahve mesafesindeyiz</span>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#B22222]">Hızlı Linkler</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#anasayfa"
                  onClick={(e) => handleFooterNavClick(e, '#anasayfa')}
                  className="text-[#1A1A1A]/70 hover:text-[#B22222] transition-colors duration-200 cursor-pointer"
                >
                  Anasayfa
                </a>
              </li>
              <li>
                <a
                  href="#hakkimizda"
                  onClick={(e) => handleFooterNavClick(e, '#hakkimizda')}
                  className="text-[#1A1A1A]/70 hover:text-[#B22222] transition-colors duration-200 cursor-pointer"
                >
                  Hakkımızda
                </a>
              </li>
              <li>
                <a
                  href="#hizmetlerimiz"
                  onClick={(e) => handleFooterNavClick(e, '#hizmetlerimiz')}
                  className="text-[#1A1A1A]/70 hover:text-[#B22222] transition-colors duration-200 cursor-pointer"
                >
                  Hizmetlerimiz
                </a>
              </li>
              <li>
                <a
                  href="#ilanlar"
                  onClick={(e) => handleFooterNavClick(e, '#ilanlar')}
                  className="text-[#1A1A1A]/70 hover:text-[#B22222] transition-colors duration-200 cursor-pointer"
                >
                  İlanlar
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#B22222]">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#1A1A1A]/70">
                <Phone size={20} className="text-[#B22222] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#1A1A1A]">Telefon</p>
                  <a
                    href={`tel:${settings.contact_phone.replace(/\s/g, '')}`}
                    className="hover:text-[#B22222] transition-colors"
                  >
                    {settings.contact_phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-[#1A1A1A]/70">
                <Mail size={20} className="text-[#B22222] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#1A1A1A]">E-posta</p>
                  <a
                    href={`mailto:${settings.contact_email}`}
                    className="hover:text-[#B22222] transition-colors"
                  >
                    {settings.contact_email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-[#1A1A1A]/70">
                <MapPin size={20} className="text-[#B22222] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#1A1A1A]">Adres</p>
                  <p>{settings.contact_address}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#B22222]">Sosyal Medya</h4>
            <p className="text-[#1A1A1A]/70">
              Güncel ilanlarımız ve haberlerimiz için bizi takip edin
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1A1A1A]/5 p-3 rounded-lg hover:bg-[#B22222] hover:text-white transition-all duration-200 group"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1A1A1A]/5 p-3 rounded-lg hover:bg-[#B22222] hover:text-white transition-all duration-200 group"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1A1A1A]/5 p-3 rounded-lg hover:bg-[#B22222] hover:text-white transition-all duration-200 group"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A]/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#1A1A1A]/70 text-center md:text-left">
              &copy; 2024 Göktürk GYO. Tüm hakları saklıdır.
            </p>
            <p className="text-[#B22222] italic text-center md:text-right">
              "Hayallerinizi dinleyip gerçeğe dönüştürmek için bir kahveye bekliyoruz."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
