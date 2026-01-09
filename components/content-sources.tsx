"use client"

import { useLanguage } from "@/contexts/language-context"
import { FileText, Globe, Youtube, Database, Cloud, MessageSquare } from "lucide-react"

export function ContentSources() {
  const { t } = useLanguage()

  const sources = [
    { icon: Globe, name: t("sources.website") },
    { icon: FileText, name: t("sources.documents") },
    { icon: Youtube, name: t("sources.youtube") },
    { icon: Database, name: t("sources.database") },
    { icon: Cloud, name: t("sources.cloud") },
    { icon: MessageSquare, name: t("sources.tickets") },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("sources.title")}</h2>
          <p className="text-xl text-gray-600">{t("sources.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sources.map((source) => {
            const Icon = source.icon
            return (
              <div
                key={source.name}
                className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700 text-center">{source.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
