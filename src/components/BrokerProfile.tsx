import { Award, TrendingUp, Phone } from 'lucide-react';

export default function BrokerProfile() {
  return (
    <section
      id="hakkimizda"
      className="py-20 bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-[#B22222]/5 text-[#B22222] px-6 py-2 rounded-full font-semibold text-sm border border-[#B22222]/20">
                Kurucumuz
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1A1A]">
              Tolga <span className="text-[#B22222]">Göktürk</span>
            </h2>

            <p className="text-xl text-[#1A1A1A]/70 leading-relaxed">
              Gayrimenkul Danışmanı & GYO Kurucusu
            </p>

            <div className="space-y-4 text-[#1A1A1A]/70 leading-relaxed">
              <p>
                2018 yılından bu yana İstanbul ve Şile bölgesinde faaliyet gösteren Göktürk GYO'nun
                kurucusu olarak, müşterilerimize en iyi yatırım fırsatlarını sunma misyonuyla
                çalışıyoruz.
              </p>
              <p>
                Şile bölgesinde yıllarca edindiğim tecrübe ve piyasa bilgim sayesinde, sizlere
                en doğru yatırım kararlarını almanızda rehberlik ediyorum. Her müşterimle birebir
                ilgilenerek, ihtiyaçlarına özel çözümler üretiyoruz.
              </p>
              <p className="text-[#B22222] font-medium italic">
                "Hayallerinizi dinleyip gerçeğe dönüştürmek için bir kahveye bekliyoruz."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <Award className="text-[#B22222] mb-3" size={32} />
                <p className="text-2xl font-bold text-[#1A1A1A]">7+</p>
                <p className="text-[#1A1A1A]/60">Yıl Deneyim</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <TrendingUp className="text-[#B22222] mb-3" size={32} />
                <p className="text-2xl font-bold text-[#1A1A1A]">500+</p>
                <p className="text-[#1A1A1A]/60">Portföy</p>
              </div>
            </div>

            <a
              href="#iletisim"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('iletisim');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center gap-3 bg-[#B22222] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#9B1C1C] transition-all duration-200 shadow-sm cursor-pointer"
            >
              <Phone size={20} />
              İletişime Geçin
            </a>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-[#B22222]/10 rounded-2xl blur-2xl"></div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-[#B22222] shadow-lg">
              <img
                src="/tolga.png"
                alt="Tolga Göktürk"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
