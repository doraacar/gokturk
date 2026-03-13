import Hero from '../components/Hero';
import Services from '../components/Services';
import FeaturedListings from '../components/FeaturedListings';
import BrokerProfile from '../components/BrokerProfile';
import StatsBar from '../components/StatsBar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Services />
      <FeaturedListings />
      <BrokerProfile />
      <StatsBar />
    </div>
  );
}
