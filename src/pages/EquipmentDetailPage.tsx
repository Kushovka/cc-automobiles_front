import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { FaArrowLeft } from 'react-icons/fa6'
import { getEquipmentDetail } from '../api/equipment'
import LeadForm from '../components/LeadForm'
import { PageFade, Reveal } from '../components/motion'
import { DetailSkeleton } from '../components/Skeleton'
import type { EquipmentDetail } from '../types/equipment'
import { trackViewContent } from '../utils/metaPixel'
import BeforeVisitCard from './EquipmentDetailPage/components/BeforeVisitCard'
import EquipmentDetails from './EquipmentDetailPage/components/EquipmentDetails'
import MobileDetailActions from './EquipmentDetailPage/components/MobileDetailActions'

const EquipmentDetailPage = () => {
  const { slug } = useParams()
  const [item, setItem] = useState<EquipmentDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) {
      return
    }

    getEquipmentDetail(slug)
      .then((data) => {
        setItem(data)
        trackViewContent(data.id, data.title, data.price)
      })
      .catch(() => setItem(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <DetailSkeleton />
  }

  if (!item) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-stone-950">Machine not found</h1>
        <Link to="/catalog" className="mt-5 inline-flex rounded-md bg-emerald-800 px-5 py-3 font-bold text-white">
          Back to Inventory
        </Link>
      </section>
    )
  }

  return (
    <PageFade>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/catalog" className="inline-flex items-center gap-2 rounded-md bg-white/80 px-3 py-2 text-sm font-semibold text-emerald-900 shadow-sm ring-1 ring-stone-200 transition hover:bg-white hover:text-emerald-950">
          <FaArrowLeft /> Back to Inventory
        </Link>

        <MobileDetailActions />

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <EquipmentDetails item={item} />
          </Reveal>

          <aside id="quote-form" className="scroll-mt-28 lg:sticky lg:top-24 lg:h-fit">
            <LeadForm
              equipmentId={item.id}
              equipmentTitle={item.title}
              equipmentPrice={item.price}
              title="Ask About This Machine"
            />
            <BeforeVisitCard />
          </aside>
        </div>
      </section>
    </PageFade>
  )
}

export default EquipmentDetailPage
