import { PageFade } from '../components/motion'
import { content, type InfoVariant } from './InfoPage/content'
import DealerSupportSection from './InfoPage/components/DealerSupportSection'
import InfoHero from './InfoPage/components/InfoHero'
import PolicyDetailsSection from './InfoPage/components/PolicyDetailsSection'

type InfoPageProps = {
  variant: InfoVariant
}

const InfoPage = ({ variant }: InfoPageProps) => {
  const data = content[variant]

  return (
    <PageFade>
      <InfoHero data={data} />
      <PolicyDetailsSection sections={'policySections' in data ? data.policySections : undefined} />
      <DealerSupportSection variant={variant} />
    </PageFade>
  )
}

export default InfoPage
