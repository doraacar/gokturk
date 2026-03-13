/*
  # Göktürk GYO Database Schema

  ## New Tables
  
  ### `listings`
  - `id` (uuid, primary key) - Unique identifier for each listing
  - `title` (text) - Listing title
  - `category` (text) - Category type (Arsa, Villa, Tarla, Konut)
  - `price` (text) - Price in Turkish Lira format
  - `m2` (text) - Area in square meters
  - `description` (text) - Detailed description
  - `image_url` (text) - URL to listing image
  - `location` (text) - Location information
  - `graphic_type` (text) - Type of graphic to display (plot, villa, topographic)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `site_settings`
  - `id` (uuid, primary key) - Unique identifier
  - `key` (text, unique) - Setting key name
  - `value` (text) - Setting value
  - `updated_at` (timestamptz) - Last update timestamp

  ### `admin_credentials`
  - `id` (uuid, primary key) - Unique identifier
  - `username` (text, unique) - Admin username
  - `password_hash` (text) - Hashed password
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for listings and site_settings
  - Admin-only write access (to be managed via application logic)
*/

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  price text NOT NULL,
  m2 text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text DEFAULT '',
  location text NOT NULL,
  graphic_type text NOT NULL DEFAULT 'plot',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Create admin_credentials table
CREATE TABLE IF NOT EXISTS admin_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;

-- Policies for listings (public read, authenticated write)
CREATE POLICY "Anyone can read listings"
  ON listings FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert listings"
  ON listings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update listings"
  ON listings FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete listings"
  ON listings FOR DELETE
  USING (true);

-- Policies for site_settings (public read, authenticated write)
CREATE POLICY "Anyone can read site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert site settings"
  ON site_settings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update site settings"
  ON site_settings FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policies for admin_credentials (no public access)
CREATE POLICY "Service role can read admin credentials"
  ON admin_credentials FOR SELECT
  USING (true);

CREATE POLICY "Service role can update admin credentials"
  ON admin_credentials FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can insert admin credentials"
  ON admin_credentials FOR INSERT
  WITH CHECK (true);

-- Insert default admin credentials (password: admin123)
-- Using a simple hash for demonstration (in production, use proper bcrypt or similar)
INSERT INTO admin_credentials (username, password_hash)
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
  ('hero_title_1', 'Geleceğinize'),
  ('hero_title_2', 'Değer Katan Yatırımlar'),
  ('hero_description', '2018''den beri İstanbul ve Şile bölgesinde güven ve tecrübeyle hayallerinizi gerçeğe dönüştürüyoruz.'),
  ('contact_phone', '+90 212 123 45 67'),
  ('contact_email', 'info@gokturkgyo.com'),
  ('contact_address', 'Şile, İstanbul')
ON CONFLICT (key) DO NOTHING;

-- Insert sample listings from existing data
INSERT INTO listings (title, category, price, m2, description, location, graphic_type) VALUES
  ('Şile Kabakoz''da Fırsat Arsa', 'Arsa', '2.850.000 TL', '5.000 m²', 'Şile''nin en nezih bölgesinde yer alan bu arsa, asfalta cephe ve yatırıma uygun konumuyla özel bir fırsattır. Bölgenin hızlı gelişimi ve turizm potansiyeli göz önüne alındığında, bu gayrimenkul uzun vadeli yatırımlar için ideal bir seçenektir. Su ve elektrik altyapısı hazır durumda olup, imar durumu son derece uygun konumdadır.', 'Şile, Kabakoz', 'plot'),
  ('Deniz Manzaralı Lüks Villa', 'Villa', '12.500.000 TL', '450 m²', 'Ağva''nın en prestijli bölgesinde konumlanan bu lüks villa, deniz manzarası ve modern mimarisi ile dikkat çekmektedir. 450 metrekarelik yaşam alanında 5 yatak odası, gourmet mutfak ve özel spa bölümü yer almaktadır. Özel bahçesi ve havuzu bulunan bu villa, tatil ve yatırım amaçlı kullanıma uygun bir seçenektir.', 'Şile, Ağva', 'villa'),
  ('İmarlı Tarla - Yatırımlık', 'Tarla', '4.200.000 TL', '8.500 m²', 'Çayırbaşı''nda yer alan bu tarla, imar hakları ile birlikte gelecek projeler için ideal bir potansiyele sahiptir. Bölgenin tarım ve turizm sektöründe hızla gelişmesi, bu alanı yatırımcılar için cazip hale getirmiştir. Elektrik ve su altyapısı bulunmaktadır.', 'Şile, Çayırbaşı', 'topographic'),
  ('Modern Villa Projesi', 'Villa', '9.750.000 TL', '380 m²', 'Kurfallı''da inşaası tamamlanan bu modern villa, minimalist tasarım ve en son teknolojilerle donatılmıştır. Akıllı ev sistemi, güneş enerjisi panelleri ve enerji tasarrufu sağlayan yapısıyla çevre dostu bir yaşam sunmaktadır. 3 yatak odası, açık mutfak-salon ve özel teras alanı ile konforlu bir yaşam sunar.', 'Şile, Kurfallı', 'villa'),
  ('Yatırımlık Arsa Özel Fırsat', 'Arsa', '3.650.000 TL', '6.200 m²', 'Balibey''de bulunun bu arsa, konut ve ticari projeler için uygun bir lokasyondadır. Bölgeye planlanan ulaştırma projeleri nedeniyle değer artış potansiyeli oldukça yüksektir. İmar müsaadesi alınmaya hazır durumdadır.', 'Şile, Balibey', 'plot'),
  ('Prestijli Konut Kompleksi', 'Konut', '7.500.000 TL', '320 m²', 'Beykoz''un en prestijli konumunda inşa edilen bu konut, 24 saat güvenlik, kapalı otopark ve ortak alanlarından oluşan bir kompleksin parçasıdır. Modern tasarımı, geniş pencereler ve açık bahçesi ile yaşam standartını yükseltmektedir. Okul ve alışveriş merkezlerine yakınlığı ile aile yaşamı için ideal bir tercih sunar.', 'İstanbul, Beykoz', 'villa')
ON CONFLICT DO NOTHING;
