import { Lexend } from 'next/font/google'
import HeroSection from './sections/Hero';
import SocialProofSection from './sections/SocialProof';
import ProblemSolutionSelector from './sections/ProblemSolutionSelector';
import CasesShowcase from './sections/CasesShowcase';
import AudienceVideo from './sections/AudienceVideo';
import MissionStatement from './sections/MissionStatement';
import WhyVocaTeaser from './sections/WhyVocaTeaser';
import ComplianceSecurity from './sections/ComplianceSecurity';
import GetInTouchSection from './sections/GetInTouch';

const lexendFont = Lexend({ weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'] })

export default function Home() {
  return (
    <div className={`${lexendFont.className} flex flex-col`}>
      <HeroSection />

      <SocialProofSection />

      <ProblemSolutionSelector />

      <CasesShowcase />

      <AudienceVideo />

      <MissionStatement />

      <WhyVocaTeaser />

      <ComplianceSecurity />

      <GetInTouchSection />
    </div>
  )
}