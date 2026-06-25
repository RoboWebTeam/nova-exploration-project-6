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

export default function Index() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PromoBanner />
      <Philosophy />
      <Stats />
      <WhyUs />
      <Promos />
      <Projects />
      <Expertise />
      <FAQ />
      <CallToAction />
      <Footer />
      <PromoPopup />
    </main>
  )
}