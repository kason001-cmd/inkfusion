"use client"

import { I18nProvider } from "@/lib/i18n"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TattooGenerator } from "@/components/tattoo-generator"
import { HowItWorks } from "@/components/how-it-works"
import { Styles } from "@/components/styles"
import { Showcase } from "@/components/showcase"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <TattooGenerator />
          <HowItWorks />
          <Styles />
          <Showcase />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  )
}
