import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LiveStatsBar from '@/components/LiveStatsBar';
import HowItWorks from '@/components/HowItWorks';
import CampaignTypes from '@/components/CampaignTypes';
import GlobalReach from '@/components/GlobalReach';
import WhyAdvertisers from '@/components/WhyAdvertisers';
import UKFocus from '@/components/UKFocus';
import Testimonials from '@/components/Testimonials';
import PricingPreview from '@/components/PricingPreview';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <LiveStatsBar />
      <HowItWorks />
      <CampaignTypes />
      <GlobalReach />
      <WhyAdvertisers />
      <UKFocus />
      <Testimonials />
      <PricingPreview />
      <FinalCTA />
      <Footer />
    </main>
  );
}
