import { useEffect, useState } from 'react';
import { Plus, CreditCard as Edit2, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Listing {
  id?: string;
  title: string;
  category: string;
  price: string;
  m2: string;
  description: string;
  image_url: string;
  location: string;
  graphic_type: string;
}

export default function ListingsManager() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Listing>({
    title: '',
    category: 'Arsa',
    price: '',
    m2: '',
    description: '',
    image_url: '',
    location: '',
    graphic_type: 'plot',
  });
  const [loading, setLoading] = useState(false);

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
  };

  const handleAdd = async () => {
    setLoading(true);
    const { error } = await supabase.from('listings').insert([formData]);

    if (error) {
      console.error('Error adding listing:', error);
      alert('İlan eklenirken bir hata oluştu');
    } else {
      await loadListings();
      setShowAddForm(false);
      resetForm();
    }
    setLoading(false);
  };

  const handleUpdate = async (id: string) => {
    setLoading(true);
    const listing = listings.find((l) => l.id === id);
    if (!listing) return;

    const { error } = await supabase
      .from('listings')
      .update({
        title: listing.title,
        category: listing.category,
        price: listing.price,
        m2: listing.m2,
        description: listing.description,
        image_url: listing.image_url,
        location: listing.location,
        graphic_type: listing.graphic_type,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating listing:', error);
      alert('İlan güncellenirken bir hata oluştu');
    } else {
      await loadListings();
      setEditingId(null);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ilanı silmek istediğinizden emin misiniz?')) return;

    setLoading(true);
    const { error } = await supabase.from('listings').delete().eq('id', id);

    if (error) {
      console.error('Error deleting listing:', error);
      alert('İlan silinirken bir hata oluştu');
    } else {
      await loadListings();
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Arsa',
      price: '',
      m2: '',
      description: '',
      image_url: '',
      location: '',
      graphic_type: 'plot',
    });
  };

  const updateListing = (id: string, field: keyof Listing, value: string) => {
    setListings(
      listings.map((listing) =>
        listing.id === id ? { ...listing, [field]: value } : listing
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">İlan Yönetimi</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#B22222] text-white rounded-lg hover:bg-[#9B1C1C] transition-colors font-semibold"
        >
          <Plus size={20} />
          İlan Ekle
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#1A1A1A]">Yeni İlan Ekle</h3>
            <button
              onClick={() => {
                setShowAddForm(false);
                resetForm();
              }}
              className="text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              >
                <option value="Arsa">Arsa</option>
                <option value="Villa">Villa</option>
                <option value="Tarla">Tarla</option>
                <option value="Konut">Konut</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Fiyat
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="örn: 2.850.000 TL"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Alan (m²)
              </label>
              <input
                type="text"
                value={formData.m2}
                onChange={(e) => setFormData({ ...formData, m2: e.target.value })}
                placeholder="örn: 5.000 m²"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Konum
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="örn: Şile, Kabakoz"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Grafik Tipi
              </label>
              <select
                value={formData.graphic_type}
                onChange={(e) => setFormData({ ...formData, graphic_type: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              >
                <option value="plot">Arsa Grafiği</option>
                <option value="villa">Villa Grafiği</option>
                <option value="topographic">Topografik Grafik</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Görsel URL
              </label>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
              />
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={loading}
            className="w-full bg-[#B22222] hover:bg-[#9B1C1C] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      )}

      <div className="space-y-4">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-lg border border-gray-200 p-6">
            {editingId === listing.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Başlık
                    </label>
                    <input
                      type="text"
                      value={listing.title}
                      onChange={(e) => updateListing(listing.id!, 'title', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Kategori
                    </label>
                    <select
                      value={listing.category}
                      onChange={(e) => updateListing(listing.id!, 'category', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
                    >
                      <option value="Arsa">Arsa</option>
                      <option value="Villa">Villa</option>
                      <option value="Tarla">Tarla</option>
                      <option value="Konut">Konut</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Fiyat
                    </label>
                    <input
                      type="text"
                      value={listing.price}
                      onChange={(e) => updateListing(listing.id!, 'price', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Alan (m²)
                    </label>
                    <input
                      type="text"
                      value={listing.m2}
                      onChange={(e) => updateListing(listing.id!, 'm2', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Konum
                    </label>
                    <input
                      type="text"
                      value={listing.location}
                      onChange={(e) => updateListing(listing.id!, 'location', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Grafik Tipi
                    </label>
                    <select
                      value={listing.graphic_type}
                      onChange={(e) => updateListing(listing.id!, 'graphic_type', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
                    >
                      <option value="plot">Arsa Grafiği</option>
                      <option value="villa">Villa Grafiği</option>
                      <option value="topographic">Topografik Grafik</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Görsel URL
                    </label>
                    <input
                      type="text"
                      value={listing.image_url}
                      onChange={(e) => updateListing(listing.id!, 'image_url', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={listing.description}
                      onChange={(e) => updateListing(listing.id!, 'description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#B22222]"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(listing.id!)}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2 bg-[#B22222] text-white rounded-lg hover:bg-[#9B1C1C] transition-colors font-semibold disabled:opacity-50"
                  >
                    <Save size={18} />
                    Kaydet
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-6 py-2 border-2 border-gray-200 text-[#1A1A1A] rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    İptal
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{listing.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-[#1A1A1A]/60">
                      <span className="bg-[#B22222]/10 text-[#B22222] px-3 py-1 rounded-full font-semibold">
                        {listing.category}
                      </span>
                      <span>{listing.location}</span>
                      <span>{listing.m2}</span>
                      <span className="font-bold text-[#B22222]">{listing.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(listing.id!)}
                      className="p-2 text-[#B22222] hover:bg-[#B22222]/10 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(listing.id!)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-[#1A1A1A]/60 text-sm line-clamp-2">{listing.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
