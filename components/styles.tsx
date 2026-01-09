"use client"

import { Card } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"

export function Styles() {
  const { t } = useI18n()

  const styles = [
    {
      nameKey: "style.fineLine",
      descKey: "style.fineLineDesc",
      image: "/fine-line-minimalist-tattoo-design.jpg",
    },
    {
      nameKey: "style.traditional",
      descKey: "style.traditionalDesc",
      image: "/traditional-american-tattoo-bold-colors.jpg",
    },
    {
      nameKey: "style.watercolor",
      descKey: "style.watercolorDesc",
      image: "/watercolor-tattoo-artistic-soft-colors.jpg",
    },
    {
      nameKey: "style.geometric",
      descKey: "style.geometricDesc",
      image: "/geometric-tattoo-sharp-lines-patterns.jpg",
    },
    {
      nameKey: "style.realistic",
      descKey: "style.realisticDesc",
      image: "/realistic-tattoo-portrait-detailed.jpg",
    },
    {
      nameKey: "style.japanese",
      descKey: "style.japaneseDesc",
      image: "/japanese-irezumi-tattoo-koi-dragon.jpg",
    },
    {
      nameKey: "style.blackwork",
      descKey: "style.blackworkDesc",
      image: "/blackwork-tattoo-bold-black-patterns.jpg",
    },
    {
      nameKey: "style.neoTraditional",
      descKey: "style.neoTraditionalDesc",
      image: "/neo-traditional-tattoo-modern-detailed.jpg",
    },
  ]

  return (
    <section id="styles" className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-foreground">{t("styles.title")}</h2>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed">{t("styles.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((style, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all cursor-pointer group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={style.image || "/placeholder.svg"}
                  alt={t(style.nameKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-card-foreground">{t(style.nameKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(style.descKey)}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
