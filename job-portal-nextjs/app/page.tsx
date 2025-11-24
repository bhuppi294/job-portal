import { Navbar } from '@/components/shared/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { CategoryCarousel } from '@/components/CategoryCarousel'
import { LatestJobs } from '@/components/LatestJobs'
import { Footer } from '@/components/shared/Footer'

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}
