"use client"

import { Shield, Lock, Eye, FileCheck } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Security() {
  const { t } = useLanguage()

  const features = [
    { icon: Shield, title: t("security.soc2.title"), description: t("security.soc2.description") },
    { icon: Eye, title: t("security.gdpr.title"), description: t("security.gdpr.description") },
    { icon: Lock, title: t("security.encryption.title"), description: t("security.encryption.description") },
    { icon: FileCheck, title: t("security.access.title"), description: t("security.access.description") },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("security.title")}</h2>
          <p className="text-xl text-gray-300">{t("security.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
