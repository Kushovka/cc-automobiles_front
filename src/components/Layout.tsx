import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Outlet, useLocation, useMatch } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileLeadBar } from './MobileLeadBar'
import { ScrollToTop } from './ScrollToTop'
import { CookieBanner } from './CookieBanner'
import { initMetaPixel, trackPageView } from '../utils/metaPixel'

export const Layout = () => {
  const location = useLocation()
  const isVehicleDetailPage = Boolean(useMatch('/inventory/:slug'))

  useEffect(() => {
    initMetaPixel()
    trackPageView()
  }, [location.pathname, location.search])

  return (
    <>
      <ScrollToTop />
      <Header />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <CookieBanner />
      {isVehicleDetailPage ? null : <MobileLeadBar />}
    </>
  )
}
