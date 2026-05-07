import Header from '@/components/Header';
import ScrollDots from '@/components/ScrollDots';
import Hero from '@/components/Hero';
import LiveStatsBar from '@/components/LiveStatsBar';
import HowItWorks from '@/components/HowItWorks';
import CampaignTypes from '@/components/CampaignTypes';
import GlobalReach from '@/components/GlobalReach';
import WhyAdvertisers from '@/components/WhyAdvertisers';
import UKFocus from '@/components/UKFocus';
import Testimonials from '@/components/Testimonials';
import PricingPreview from '@/components/PricingPreview';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <ScrollDots />
      <Hero />
      <LiveStatsBar />
      <div className="section-divider" />
      <HowItWorks />
      <CampaignTypes />
      <div className="section-divider" />
      <GlobalReach />
      <WhyAdvertisers />
      <UKFocus />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
