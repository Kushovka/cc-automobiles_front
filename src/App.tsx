import { Navigate, Route, Routes, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import CatalogPage from './pages/CatalogPage'
import EquipmentDetailPage from './pages/EquipmentDetailPage'
import HomePage from './pages/HomePage'
import InfoPage from './pages/InfoPage'
import { initMetaPixel, trackPageView } from './utils/metaPixel'

const App = () => {
  const location = useLocation()

  useEffect(() => {
    initMetaPixel()
  }, [])

  useEffect(() => {
    trackPageView()
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="equipment/:slug" element={<EquipmentDetailPage />} />
          <Route path="service" element={<InfoPage variant="service" />} />
          <Route path="delivery" element={<InfoPage variant="delivery" />} />
          <Route path="warranty" element={<InfoPage variant="warranty" />} />
          <Route path="team" element={<InfoPage variant="team" />} />
          <Route path="contacts" element={<InfoPage variant="contacts" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
