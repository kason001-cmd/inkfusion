"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Showcase() {
  const { t } = useI18n()

  const showcases = [
    {
      title: "Dragon Phoenix",
      styleKey: "style.traditional",
      image: "/dragon-phoenix-tattoo-traditional-style.jpg",
      likes: "2.4k",
    },
    {
      title: "Minimalist Mountain",
      styleKey: "style.fineLine",
      image: "/minimalist-mountain-tattoo-line-art.jpg",
      likes: "1.8k",
    },
    {
      title: "Cyberpunk Samurai",
      styleKey: "style.neoTraditional",
      image: "/cyberpunk-samurai-tattoo-futuristic.jpg",
      likes: "3.2k",
    },
    {
      title: "Watercolor Butterfly",
      styleKey: "style.watercolor",
      image: "/watercolor-butterfly-tattoo-artistic.jpg",
      likes: "2.1k",
    },
    {
      title: "Geometric Wolf",
      styleKey: "style.geometric",
      image: "/geometric-wolf-tattoo-pattern.jpg",
      likes: "2.7k",
    },
    {
      title: "Koi Fish",
      styleKey: "style.japanese",
      image: "/japanese-koi-fish-tattoo-traditional.jpg",
      likes: "1.9k",
    },
  ]

  return (
    <section id="showcase" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-foreground">{t("showcase.title")}</h2>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed">{t("showcase.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcases.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border bg-card hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-card-foreground">{item.title}</h3>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                    {item.likes}
                  </span>
                </div>
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                  {t(item.styleKey)}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-border text-foreground hover:bg-secondary bg-transparent"
          >
            {t("showcase.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  )
}
