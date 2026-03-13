import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Maximize2, Eye, Search } from 'lucide-react';
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

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['Hepsi', 'Arsa', 'Villa', 'Tarla', 'Konut'];

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading listings:', error);
    } else {
      setListings(data || []);
    }
    setLoading(false);
  };

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Hepsi' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  if (loading) {
    return (
      <div className="pt-24 md:pt-32 min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-[#1A1A1A]">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-4">
            Tüm İlanlar
          </h1>
          <p className="text-[#1A1A1A]/70 text-lg sm:text-xl max-w-3xl mx-auto">
            Kapsamlı gayrimenkul portföyümüzden size uygun yatırım fırsatını bulun
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-4 text-[#1A1A1A]/40" size={20} />
            <input
              type="text"
              placeholder="İlan Ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222] transition-colors text-[#1A1A1A]"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="text-[#1A1A1A] font-semibold flex items-center">
              Kategori:
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#B22222] text-white'
                    : 'bg-gray-200 text-[#1A1A1A] hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-[#1A1A1A]/60 font-medium">
            {filteredListings.length} ilan bulundu
          </p>
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
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
                    <span className="text-sm">{listing.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-[#1A1A1A]/60">
                      <Maximize2 size={18} className="mr-2 text-[#B22222]" />
                      <span className="text-sm">{listing.m2}</span>
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
                      <span className="font-semibold">Detayları Gör</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#1A1A1A]/60 text-lg">
              Arama kriterlerinize uygun ilan bulunamadı.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
