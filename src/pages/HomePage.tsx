import { useEffect, useState } from 'react'
import { getEquipment } from '../api/equipment'
import { PageFade, Reveal } from '../components/motion'
import type { Equipment } from '../types/equipment'
import BrandsStrip from './HomePage/components/BrandsStrip'
import DealerDeskSection from './HomePage/components/DealerDeskSection'
import FeaturedEquipmentSection from './HomePage/components/FeaturedEquipmentSection'
import HeroSection from './HomePage/components/HeroSection'
import QuickBrowseSection from './HomePage/components/QuickBrowseSection'
import TrustProcessSection from './HomePage/components/TrustProcessSection'

const HomePage = () => {
  const [featured, setFeatured] = useState<Equipment[]>([])
  const [loadingFeatured, setLoadingFeatured] = useState(true)

  useEffect(() => {
    getEquipment({ page: 1, page_size: 3, featured: true })
      .then((data) => setFeatured(data.items))
      .catch(() => setFeatured([]))
      .finally(() => setLoadingFeatured(false))
  }, [])

  return (
    <PageFade>
      <HeroSection />
      <QuickBrowseSection />
      <BrandsStrip />
      <Reveal>
        <FeaturedEquipmentSection items={featured} loading={loadingFeatured} />
      </Reveal>
      <Reveal>
        <TrustProcessSection />
      </Reveal>
      <Reveal>
        <DealerDeskSection />
      </Reveal>
    </PageFade>
  )
}

export default HomePage
