import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, Maximize2, Phone, Mail, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PlotMapGraphic, VillaArchitectureGraphic, TopographicMapGraphic } from '../components/ListingGraphics';

interface Listing {
  id: string;
  title: string;
  category: string;
  price: string;
  m2: string;
  description: string;
  location: string;
  graphic_type: string;
}

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadListing();
  }, [id]);

  const loadListing = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error loading listing:', error);
    } else {
      setListing(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="pt-24 md:pt-32 min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-[#1A1A1A]">Yükleniyor...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="pt-24 md:pt-32 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">İlan Bulunamadı</h1>
          <p className="text-[#1A1A1A]/60 text-lg mb-8">
            Aradığınız gayrimenkul ilanı bulunamadı.
          </p>
          <Link
            to="/ilanlar"
            className="inline-flex items-center gap-2 bg-[#B22222] hover:bg-[#9B1C1C] text-white px-6 py-3 rounded-lg transition-all duration-200 font-semibold"
          >
            Tüm İlanlara Dön
          </Link>
        </div>
      </div>
    );
  }

  const getGraphicComponent = (type: string) => {
    switch (type) {
      case 'plot':
        return <PlotMapGraphic />;
      case 'villa':
        return <VillaArchitectureGraphic />;
      case 'topographic':
        return <TopographicMapGraphic />;
      default:
        return <PlotMapGraphic />;
    }
  };

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#B22222] hover:text-[#9B1C1C] font-semibold mb-8 transition-colors"
        >
          <ChevronLeft size={20} />
          Geri Dön
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="relative h-96 bg-[#FAFAFA] rounded-lg overflow-hidden border-4 border-[#B22222] mb-8 shadow-lg">
              <div className="w-full h-full">
                {getGraphicComponent(listing.graphic_type)}
              </div>
              <div className="absolute top-6 right-6 bg-[#B22222] text-white px-6 py-3 rounded-md font-bold text-lg">
                {listing.category}
              </div>
            </div>

            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
                {listing.title}
              </h1>

              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="flex items-center text-[#1A1A1A]/70">
                  <MapPin size={24} className="mr-3 text-[#B22222]" />
                  <div>
                    <p className="text-sm text-[#1A1A1A]/60">Konum</p>
                    <p className="font-semibold text-lg">{listing.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-[#1A1A1A]/70">
                  <Maximize2 size={24} className="mr-3 text-[#B22222]" />
                  <div>
                    <p className="text-sm text-[#1A1A1A]/60">Alan</p>
                    <p className="font-semibold text-lg">{listing.m2}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAFAFA] rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Açıklama</h2>
                <p className="text-[#1A1A1A]/70 text-lg leading-relaxed">
                  {listing.description}
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1A1A1A]">Gayrimenkul Detayları</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <p className="text-[#1A1A1A]/60 text-sm mb-2">Tür</p>
                    <p className="font-bold text-lg text-[#1A1A1A]">{listing.category}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <p className="text-[#1A1A1A]/60 text-sm mb-2">Alan</p>
                    <p className="font-bold text-lg text-[#1A1A1A]">{listing.m2}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <p className="text-[#1A1A1A]/60 text-sm mb-2">Fiyat</p>
                    <p className="font-bold text-lg text-[#B22222]">{listing.price}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <p className="text-[#1A1A1A]/60 text-sm mb-2">Konum</p>
                    <p className="font-bold text-lg text-[#1A1A1A]">{listing.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-[#FAFAFA] rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">
                {listing.price}
              </h2>

              <div className="space-y-4 mb-8">
                <a
                  href="tel:+902121234567"
                  className="flex items-center justify-center gap-3 w-full bg-[#B22222] hover:bg-[#9B1C1C] text-white px-6 py-3 rounded-lg transition-all duration-200 font-semibold"
                >
                  <Phone size={20} />
                  Ara
                </a>
                <a
                  href="mailto:info@gokturkgyo.com"
                  className="flex items-center justify-center gap-3 w-full border-2 border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white px-6 py-3 rounded-lg transition-all duration-200 font-semibold"
                >
                  <Mail size={20} />
                  E-mail Gönder
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-[#1A1A1A] mb-4">İletişim Bilgileri</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[#1A1A1A]/60 mb-1">Telefon</p>
                    <p className="font-semibold text-[#1A1A1A]">+90 212 123 45 67</p>
                  </div>
                  <div>
                    <p className="text-[#1A1A1A]/60 mb-1">E-mail</p>
                    <p className="font-semibold text-[#1A1A1A]">info@gokturkgyo.com</p>
                  </div>
                </div>
              </div>

              <Link
                to="/ilanlar"
                className="block text-center mt-8 text-[#B22222] hover:text-[#9B1C1C] font-semibold transition-colors"
              >
                Tüm İlanlara Dön
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
