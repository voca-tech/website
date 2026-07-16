import { Lexend } from 'next/font/google'
import HeroSection from './sections/Hero';
import ProblemSolutionSelector from './sections/ProblemSolutionSelector';
import PartnersSection from './sections/Partners';
import KPIsSection from './sections/KPIs';
import Functionalities from './sections/Functionalities';
import OurClientsSection from './sections/OurClients';
import TestimonialsSection from './sections/Testimonials';
import Gamification from './sections/Gamification';
import WhyChooseUs from './sections/WhyChooseUs';
import GetInTouchSection from './sections/GetInTouch';

const lexendFont = Lexend({ weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'] })

export default function Home() {
  return (
    <div className={`${lexendFont.className} flex flex-col`}>
      <HeroSection />

      <ProblemSolutionSelector />

      <KPIsSection />

      <Functionalities />

      <Gamification />

      <WhyChooseUs />

      <OurClientsSection />

      <TestimonialsSection />

      <PartnersSection />

      <GetInTouchSection />
    </div>
  )
}