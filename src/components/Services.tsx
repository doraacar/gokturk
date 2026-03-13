import { MapPin, Home, MessageSquare } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: MapPin,
      title: 'Arsa & Tarla Yatırımı',
      description:
        'Şile ve İstanbul bölgesinde stratejik konumlardaki arsa ve tarlalarla geleceğe yatırım yapın. Uzun vadeli değer artışı garantisi.',
    },
    {
      icon: Home,
      title: 'Lüks Konut & Villa',
      description:
        'Hayalinizdeki lüks yaşam alanları için özel villa ve konut projeleri. Modern mimari ve doğa ile iç içe yaşam fırsatı.',
    },
    {
      icon: MessageSquare,
      title: 'Gayrimenkul Danışmanlığı',
      description:
        'Profesyonel danışmanlık hizmetimizle en doğru yatırım kararlarını alın. Deneyimli ekibimiz yanınızda.',
    },
  ];

  return (
    <section
      id="hizmetlerimiz"
      className="py-20 bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#B22222] mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-[#1A1A1A]/70 text-lg sm:text-xl max-w-3xl mx-auto">
            Size özel çözümler sunarak gayrimenkul yatırımlarınızda yanınızdayız
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-lg border border-gray-200 hover:border-[#B22222] hover:shadow-lg transition-all duration-200"
              >
                <div className="bg-[#B22222]/5 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#B22222]/10 transition-colors duration-200">
                  <Icon className="text-[#B22222]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                  {service.title}
                </h3>
                <p className="text-[#1A1A1A]/60 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
