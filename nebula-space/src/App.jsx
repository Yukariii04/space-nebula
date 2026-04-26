import Scene3D from './components/Scene3D'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBand from './components/StatsBand'
import Marquee from './components/Marquee'
import Missions from './components/Missions'
import Technology from './components/Technology'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <CustomCursor />
      <Scene3D />
      <Navbar />
      <Hero />
      <StatsBand />
      <Marquee />
      <Missions />
      <Technology />
      <Timeline />
      <Contact />
      <Footer />
    </>
  )
}

export default App
