export interface Listing {
  id: number;
  graphic: 'plot' | 'villa' | 'topographic';
  title: string;
  location: string;
  price: string;
  area: string;
  type: 'Arsa' | 'Villa' | 'Tarla' | 'Konut';
  description: string;
}

export const listings: Listing[] = [
  {
    id: 1,
    graphic: 'plot',
    title: 'Şile Kabakoz\'da Fırsat Arsa',
    location: 'Şile, Kabakoz',
    price: '2.850.000 TL',
    area: '5.000 m²',
    type: 'Arsa',
    description: 'Şile\'nin en nezih bölgesinde yer alan bu arsa, asfalta cephe ve yatırıma uygun konumuyla özel bir fırsattır. Bölgenin hızlı gelişimi ve turizm potansiyeli göz önüne alındığında, bu gayrimenkul uzun vadeli yatırımlar için ideal bir seçenektir. Su ve elektrik altyapısı hazır durumda olup, imar durumu son derece uygun konumdadır.',
  },
  {
    id: 2,
    graphic: 'villa',
    title: 'Deniz Manzaralı Lüks Villa',
    location: 'Şile, Ağva',
    price: '12.500.000 TL',
    area: '450 m²',
    type: 'Villa',
    description: 'Ağva\'nın en prestijli bölgesinde konumlanan bu lüks villa, deniz manzarası ve modern mimarisi ile dikkat çekmektedir. 450 metrekarelik yaşam alanında 5 yatak odası, gourmet mutfak ve özel spa bölümü yer almaktadır. Özel bahçesi ve havuzu bulunan bu villa, tatil ve yatırım amaçlı kullanıma uygun bir seçenektir.',
  },
  {
    id: 3,
    graphic: 'topographic',
    title: 'İmarlı Tarla - Yatırımlık',
    location: 'Şile, Çayırbaşı',
    price: '4.200.000 TL',
    area: '8.500 m²',
    type: 'Tarla',
    description: 'Çayırbaşı\'nda yer alan bu tarla, imar hakları ile birlikte gelecek projeler için ideal bir potansiyele sahiptir. Bölgenin tarım ve turizm sektöründe hızla gelişmesi, bu alanı yatırımcılar için cazip hale getirmiştir. Elektrik ve su altyapısı bulunmaktadır.',
  },
  {
    id: 4,
    graphic: 'villa',
    title: 'Modern Villa Projesi',
    location: 'Şile, Kurfallı',
    price: '9.750.000 TL',
    area: '380 m²',
    type: 'Villa',
    description: 'Kurfallı\'da inşaası tamamlanan bu modern villa, minimalist tasarım ve en son teknolojilerle donatılmıştır. Akıllı ev sistemi, güneş enerjisi panelleri ve enerji tasarrufu sağlayan yapısıyla çevre dostu bir yaşam sunmaktadır. 3 yatak odası, açık mutfak-salon ve özel teras alanı ile konforlu bir yaşam sunar.',
  },
  {
    id: 5,
    graphic: 'plot',
    title: 'Yatırımlık Arsa Özel Fırsat',
    location: 'Şile, Balibey',
    price: '3.650.000 TL',
    area: '6.200 m²',
    type: 'Arsa',
    description: 'Balibey\'de bulunun bu arsa, konut ve ticari projeler için uygun bir lokasyondadır. Bölgeye planlanan ulaştırma projeleri nedeniyle değer artış potansiyeli oldukça yüksektir. İmar müsaadesi alınmaya hazır durumdadır.',
  },
  {
    id: 6,
    graphic: 'villa',
    title: 'Prestijli Konut Kompleksi',
    location: 'İstanbul, Beykoz',
    price: '7.500.000 TL',
    area: '320 m²',
    type: 'Konut',
    description: 'Beykoz\'un en prestijli konumunda inşa edilen bu konut, 24 saat güvenlik, kapalı otopark ve ortak alanlarından oluşan bir kompleksin parçasıdır. Modern tasarımı, geniş pencereler ve açık bahçesi ile yaşam standartını yükseltmektedir. Okul ve alışveriş merkezlerine yakınlığı ile aile yaşamı için ideal bir tercih sunar.',
  },
];
