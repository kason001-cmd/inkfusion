"use client"

import { Pencil, Sparkles, Eye } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function HowItWorks() {
  const { t } = useI18n()

  const steps = [
    {
      icon: Pencil,
      titleKey: "how.step1.title",
      descKey: "how.step1.desc",
    },
    {
      icon: Sparkles,
      titleKey: "how.step2.title",
      descKey: "how.step2.desc",
    },
    {
      icon: Eye,
      titleKey: "how.step3.title",
      descKey: "how.step3.desc",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-foreground">{t("how.title")}</h2>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed">{t("how.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 -z-10 text-7xl font-bold text-muted/30">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{t(step.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
