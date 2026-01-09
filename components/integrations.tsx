"use client"

import { useLanguage } from "@/contexts/language-context"

export function Integrations() {
  const { t } = useLanguage()

  const integrations = [
    "Slack",
    "Teams",
    "Zendesk",
    "Intercom",
    "Discord",
    "Gmail",
    "HubSpot",
    "Asana",
    "Google Drive",
    "Zapier",
    "Notion",
    "Airtable",
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("integrations.title")}</h2>
          <p className="text-xl text-gray-600">{t("integrations.subtitle")}</p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            {[...integrations, ...integrations].map((integration, index) => (
              <div
                key={`${integration}-${index}`}
                className="flex-shrink-0 w-32 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center"
              >
                <span className="text-sm font-medium text-gray-700">{integration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
