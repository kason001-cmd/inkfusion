"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Sparkles, Wand2, Check } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { createBrowserSupabaseClient } from "@/lib/supabase/client"

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

const placementOptions = [
  { value: "none", labelKey: "placement.none" },
  { value: "arm", labelKey: "placement.arm" },
  { value: "forearm", labelKey: "placement.forearm" },
  { value: "upperArm", labelKey: "placement.upperArm" },
  { value: "shoulder", labelKey: "placement.shoulder" },
  { value: "chest", labelKey: "placement.chest" },
  { value: "back", labelKey: "placement.back" },
  { value: "thigh", labelKey: "placement.thigh" },
  { value: "calf", labelKey: "placement.calf" },
  { value: "stomach", labelKey: "placement.stomach" },
]

type GenerationHistoryItem = {
  id: string
  created_at: string
  prompt: string
  model_prompt?: string | null
  style?: string | null
  color?: string | null
  placement?: string | null
  images: string[]
}

export function TattooGenerator() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("fine-line")
  const [selectedColor, setSelectedColor] = useState("black")
  const [placement, setPlacement] = useState("none")
  const [isGenerating, setIsGenerating] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [promptUsed, setPromptUsed] = useState<string | null>(null)
  const [historyItems, setHistoryItems] = useState<GenerationHistoryItem[]>([])
  const [isHistoryLoading, setIsHistoryLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { t } = useI18n()
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])

  const getLoginHref = () => {
    if (typeof window === "undefined") return "/api/auth/google"
    const next = `${window.location.pathname}${window.location.search}`
    return `/api/auth/google?next=${encodeURIComponent(next)}`
  }

  const loadHistory = useCallback(async () => {
    setIsHistoryLoading(true)
    try {
      const res = await fetch("/api/history", { method: "GET" })
      if (res.status === 401) {
        setHistoryItems([])
        return
      }

      const data: unknown = await res.json()
      const record = (data && typeof data === "object") ? (data as Record<string, unknown>) : {}
      const items = Array.isArray(record.items) ? (record.items as GenerationHistoryItem[]) : []
      setHistoryItems(items)
    } catch {
      setHistoryItems([])
    } finally {
      setIsHistoryLoading(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) return
      setIsLoggedIn(Boolean(data?.user))
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session?.user))
    })
    return () => {
      isMounted = false
      sub?.subscription.unsubscribe()
    }
  }, [supabase])

  useEffect(() => {
    if (isLoggedIn) {
      loadHistory()
    } else {
      setHistoryItems([])
    }
  }, [isLoggedIn, loadHistory])

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData?.user) {
        setError(t("generator.loginRequired"))
        if (typeof window !== "undefined") {
          window.location.href = getLoginHref()
        }
        return
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          style,
          color: selectedColor,
          placement: placement === "none" ? undefined : placement,
        }),
      })
      const data: unknown = await res.json()
      const dataRecord = (data && typeof data === "object") ? (data as Record<string, unknown>) : {}
      if (res.status === 401) {
        setError(t("generator.loginRequired"))
        if (typeof window !== "undefined") {
          window.location.href = getLoginHref()
        }
        return
      }
      if (!res.ok) {
        throw new Error(String(dataRecord.error ?? "Generation failed"))
      }
      setImages(Array.isArray(dataRecord.images) ? (dataRecord.images as string[]) : [])
      setPromptUsed(typeof dataRecord.prompt === "string" ? (dataRecord.prompt as string) : null)
      if (dataRecord.historyItem && typeof dataRecord.historyItem === "object") {
        setHistoryItems((prev) => [dataRecord.historyItem as GenerationHistoryItem, ...prev].slice(0, 50))
      } else if (isLoggedIn) {
        loadHistory()
      }
      if (typeof dataRecord.prompt === "string") {
        // Useful for debugging prompt quality without cluttering the UI
        console.log("[tattoo-generator] prompt used:", dataRecord.prompt)
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Generation failed")
    } finally {
      setIsGenerating(false)
    }
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="placement" className="text-card-foreground">
                  {t("generator.placement")}
                </Label>
                <Select value={placement} onValueChange={setPlacement}>
                  <SelectTrigger id="placement" className="h-12 bg-background border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {placementOptions.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {t(p.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
            ) : images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full overflow-auto">
                {images.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`tattoo-${idx}`}
                    className="w-full h-full object-contain rounded-lg border border-border bg-background"
                  />
                ))}
                {promptUsed && (
                  <div className="sm:col-span-2 text-left">
                    <p className="text-xs text-muted-foreground mb-2">Prompt</p>
                    <pre className="text-xs whitespace-pre-wrap break-words rounded-lg border border-border bg-background p-3 text-foreground/80">
                      {promptUsed}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-secondary flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">{t("generator.subtitle")}</p>
                {error && <p className="text-destructive text-sm">{error}</p>}
              </div>
            )}
          </Card>
        </div>

        <div className="mt-8">
          <Card className="p-6 bg-secondary border-border">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-card-foreground">{t("generator.historyTitle")}</h3>
              {isLoggedIn ? (
                <Button variant="outline" size="sm" onClick={loadHistory} disabled={isHistoryLoading}>
                  {isHistoryLoading ? t("generator.historyLoading") : t("generator.historyRefresh")}
                </Button>
              ) : null}
            </div>

            {!isLoggedIn ? (
              <p className="mt-3 text-sm text-muted-foreground">{t("generator.historyLoginToView")}</p>
            ) : isHistoryLoading ? (
              <p className="mt-3 text-sm text-muted-foreground">{t("generator.historyLoading")}</p>
            ) : historyItems.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">{t("generator.historyEmpty")}</p>
            ) : (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {historyItems.map((item) => (
                  <button
                    key={item.id}
                    className="group rounded-lg border border-border bg-background overflow-hidden text-left"
                    onClick={() => {
                      setImages(Array.isArray(item.images) ? item.images : [])
                      setPromptUsed(item.model_prompt ?? item.prompt)
                    }}
                  >
                    <div className="aspect-square bg-secondary/40">
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.prompt}
                          className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <div className="p-2">
                      <div className="text-xs text-foreground/90 truncate">{item.prompt}</div>
                      <div className="text-[11px] text-muted-foreground mt-1">
                        {new Date(item.created_at).toLocaleString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
