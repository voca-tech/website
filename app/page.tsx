"use client"
import { Lexend } from 'next/font/google'
import HeroSection from './sections/Hero';
import ChallengesSection from './sections/Challenges';
import DashboardPreviewSection from './sections/DashboardsPreview';
import PartnersSection from './sections/Partners';
import KPIsSection from './sections/KPIs';
import Functionalities from './sections/Functionalities';
import OurClientsSection from './sections/OurClients';
import TestimonialsSection from './sections/Testimonials';

const lexendFont = Lexend({ weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'] })

export default function Home() {
  return (
    <div className={`${lexendFont.className} flex flex-col`}>
      <HeroSection />

      <ChallengesSection />

      <KPIsSection />

      <Functionalities />

      <DashboardPreviewSection />

      <OurClientsSection />

      <TestimonialsSection />

      <PartnersSection />
    </div>
  )
}