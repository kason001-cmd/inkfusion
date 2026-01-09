"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Star } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Hero() {
  const { t } = useI18n()

  return (
    <section className="pt-32 pb-20 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-foreground/10 rounded-full text-sm text-foreground/90 font-medium mb-4 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            {t("hero.badge")}
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance text-foreground">
            {t("hero.title")}
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 text-lg px-8 h-14 border-0"
            >
              {t("hero.cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 h-14 border-border text-foreground hover:bg-foreground/10 bg-transparent"
            >
              {t("showcase.viewAll")}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">{t("hero.ctaSub")}</p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-background"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{t("hero.users")}</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="ml-2">{t("hero.rating")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
