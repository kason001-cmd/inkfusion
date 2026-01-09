"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Sparkles, Wand2, Check } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const colorOptions = [
  { value: "black", color: "#000000", labelKey: "color.black" },
  { value: "blackGray", color: "linear-gradient(135deg, #000 50%, #666 50%)", labelKey: "color.blackGray" },
  {
    value: "fullColor",
    color: "linear-gradient(135deg, #ef4444, #f59e0b, #22c55e, #3b82f6)",
    labelKey: "color.fullColor",
  },
  { value: "redBlack", color: "linear-gradient(135deg, #000 50%, #dc2626 50%)", labelKey: "color.redBlack" },
  { value: "blueBlack", color: "linear-gradient(135deg, #000 50%, #2563eb 50%)", labelKey: "color.blueBlack" },
  { value: "watercolor", color: "linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4)", labelKey: "color.watercolor" },
]

export function TattooGenerator() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("fine-line")
  const [selectedColor, setSelectedColor] = useState("black")
  const [isGenerating, setIsGenerating] = useState(false)
  const { t } = useI18n()

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 3000)
  }

  const styles = [
    { value: "fine-line", label: t("style.fineLine") },
    { value: "traditional", label: t("style.traditional") },
    { value: "watercolor", label: t("style.watercolor") },
    { value: "geometric", label: t("style.geometric") },
    { value: "realistic", label: t("style.realistic") },
    { value: "japanese", label: t("style.japanese") },
    { value: "blackwork", label: t("style.blackwork") },
    { value: "neo-traditional", label: t("style.neoTraditional") },
  ]

  return (
    <section id="generator" className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-balance text-card-foreground">{t("generator.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            {t("generator.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="p-6 space-y-6 bg-secondary border-border">
            <div className="space-y-2">
              <Label htmlFor="prompt" className="text-card-foreground">
                {t("generator.title")}
              </Label>
              <Textarea
                id="prompt"
                placeholder={t("generator.placeholder")}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style" className="text-card-foreground">
                {t("generator.style")}
              </Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger id="style" className="h-12 bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-card-foreground">{t("generator.color")}</Label>
              <div className="grid grid-cols-3 gap-3">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedColor(option.value)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                      selectedColor === option.value
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-border bg-background hover:border-muted-foreground/50",
                    )}
                  >
                    <div
                      className="w-10 h-10 rounded-full border border-border/50 shadow-inner"
                      style={{ background: option.color }}
                    />
                    <span className="text-xs text-muted-foreground text-center">{t(option.labelKey)}</span>
                    {selectedColor === option.value && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 border-0"
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
            >
              {isGenerating ? (
                <>
                  <Wand2 className="w-5 h-5 mr-2 animate-spin" />
                  {t("generator.generating")}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t("generator.generate")}
                </>
              )}
            </Button>
          </Card>

          <Card className="p-6 aspect-square flex items-center justify-center bg-secondary/50 border-border">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-4">
                <Wand2 className="w-12 h-12 animate-spin text-purple-500" />
                <p className="text-muted-foreground">{t("generator.generating")}</p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-secondary flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">{t("generator.subtitle")}</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
