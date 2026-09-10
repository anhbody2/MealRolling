// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './constrants/routes'
import LandingPage from './pages/Home/LandingPage'
import MenuPage from './pages/Menu/MenuPage'
import Navigation from '#components/ui/pixelact-ui/navigation'
function App() {
  return (
    <>
    <Navigation/>
      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route path={ROUTES.MENU} element={<MenuPage/>} />
      </Routes>
    </>
  )
}

export default App
