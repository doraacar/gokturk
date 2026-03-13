import { TrendingUp, Briefcase, Users, Award } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      icon: Award,
      value: '7+',
      label: 'Yıl Deneyim',
    },
    {
      icon: Briefcase,
      value: '500+',
      label: 'Portföy',
    },
    {
      icon: Users,
      value: '1000+',
      label: 'Mutlu Müşteri',
    },
    {
      icon: TrendingUp,
      value: '%98',
      label: 'Memnuniyet',
    },
  ];

  return (
    <section className="py-16 mb-8 bg-[#B22222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-200"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-white/10 p-4 rounded-full group-hover:bg-white/20 transition-colors duration-200">
                    <Icon className="text-white" size={32} />
                  </div>
                </div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-white font-semibold text-lg">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
