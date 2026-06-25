import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { Philosophy } from "../components/Philosophy"
import { Stats } from "../components/Stats"
import { Projects } from "../components/Projects"
import { Expertise } from "../components/Expertise"
import { FAQ } from "../components/FAQ"
import { CallToAction } from "../components/CallToAction"
import { Footer } from "../components/Footer"
import { PromoBanner } from "../components/PromoBanner"
import { Promos } from "../components/Promos"
import { PromoPopup } from "../components/PromoPopup"
import { WhyUs } from "../components/WhyUs"
import { Calculator } from "../components/Calculator"
import { Reviews } from "../components/Reviews"
import { Process } from "../components/Process"
import { FloatChat } from "../components/FloatChat"

export default function Index() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PromoBanner />
      <Philosophy />
      <Stats />
      <WhyUs />
      <Process />
      <Promos />
      <Calculator />
      <Projects />
      <Reviews />
      <Expertise />
      <FAQ />
      <CallToAction />
      <Footer />
      <PromoPopup />
      <FloatChat />
    </main>
  )
}