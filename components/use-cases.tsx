"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, TrendingUp, Search, FileText } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function UseCases() {
  const { t } = useLanguage()

  const cases = [
    {
      icon: MessageSquare,
      title: t("useCases.support.title"),
      description: t("useCases.support.description"),
      features: [t("useCases.support.feature1"), t("useCases.support.feature2"), t("useCases.support.feature3")],
    },
    {
      icon: TrendingUp,
      title: t("useCases.sales.title"),
      description: t("useCases.sales.description"),
      features: [t("useCases.sales.feature1"), t("useCases.sales.feature2"), t("useCases.sales.feature3")],
    },
    {
      icon: Search,
      title: t("useCases.knowledge.title"),
      description: t("useCases.knowledge.description"),
      features: [t("useCases.knowledge.feature1"), t("useCases.knowledge.feature2"), t("useCases.knowledge.feature3")],
    },
    {
      icon: FileText,
      title: t("useCases.research.title"),
      description: t("useCases.research.description"),
      features: [t("useCases.research.feature1"), t("useCases.research.feature2"), t("useCases.research.feature3")],
    },
  ]

  return (
    <section id="use-cases" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("useCases.title")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("useCases.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((useCase) => {
            const Icon = useCase.icon
            return (
              <Card key={useCase.title} className="p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-6">{useCase.description}</p>
                <ul className="space-y-3 mb-6">
                  {useCase.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full bg-transparent">
                  {t("useCases.learnMore")}
                </Button>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
