"use client"

import { useLanguage } from "@/contexts/language-context"

export function TrustedBy() {
  const { t } = useLanguage()

  const logos = [
    { name: "Sony", width: 100 },
    { name: "Castos", width: 120 },
    { name: "Extendify", width: 140 },
    { name: "Conversion", width: 130 },
    { name: "Dollie", width: 100 },
    { name: "WingArc", width: 120 },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-gray-600 font-medium mb-8">{t("trustedBy.title")}</h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
          {logos.map((logo) => (
            <div key={logo.name} className="h-8 bg-gray-400 rounded" style={{ width: logo.width }} />
          ))}
        </div>
      </div>
    </section>
  )
}
