export interface Listing {
  id: string;
  title: string;
  category: string;
  price: string;
  m2: string;
  description: string;
  image_url: string;
  location: string;
  graphic_type: string;
  created_at?: string;
  updated_at?: string;
}

export interface SiteSettings {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface AdminCredentials {
  id: string;
  username: string;
  password_hash: string;
  updated_at: string;
}
