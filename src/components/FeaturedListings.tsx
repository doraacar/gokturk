import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Maximize2, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PlotMapGraphic, VillaArchitectureGraphic, TopographicMapGraphic } from './ListingGraphics';

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

export default function FeaturedListings() {
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error loading featured listings:', error);
    } else {
      setFeaturedListings(data || []);
    }
  };

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
    <section
      id="ilanlar"
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#B22222] mb-4">
            Öne Çıkan İlanlar
          </h2>
          <p className="text-[#1A1A1A]/70 text-lg sm:text-xl max-w-3xl mx-auto">
            Seçkin portföyümüzden özenle seçilmiş gayrimenkul yatırım fırsatları
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.map((listing) => (
            <div
              key={listing.id}
              className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#B22222] hover:shadow-lg transition-all duration-200"
            >
              <div className="relative h-64 bg-[#FAFAFA]">
                <div className="w-full h-full">
                  {getGraphicComponent(listing.graphic_type)}
                </div>
                <div className="absolute top-4 right-4 bg-[#B22222] text-white px-4 py-2 rounded-md font-semibold text-sm">
                  {listing.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">
                  {listing.title}
                </h3>

                <p className="text-[#1A1A1A]/60 text-sm mb-4 line-clamp-2">
                  {listing.description}
                </p>

                <div className="flex items-center text-[#1A1A1A]/60 mb-4">
                  <MapPin size={18} className="mr-2 text-[#B22222]" />
                  <span>{listing.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-[#1A1A1A]/60">
                    <Maximize2 size={18} className="mr-2 text-[#B22222]" />
                    <span>{listing.m2}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#B22222]">
                    {listing.price}
                  </span>
                  <Link
                    to={`/ilanlar/${listing.id}`}
                    className="flex items-center gap-2 bg-[#B22222] hover:bg-[#9B1C1C] text-white px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    <Eye size={18} />
                    <span className="font-semibold">Detay</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link
            to="/ilanlar"
            className="px-12 py-4 bg-[#B22222] text-white font-bold text-lg rounded-lg hover:bg-[#9B1C1C] transition-all duration-200 shadow-sm"
          >
            Tüm İlanları Görüntüle
          </Link>
        </div>
      </div>
    </section>
  );
}
