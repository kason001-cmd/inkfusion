"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { createBrowserSupabaseClient } from "@/lib/supabase/client"

export function CTA() {
  const { t } = useI18n()
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])

  const getLoginHref = () => {
    if (typeof window === "undefined") return "/api/auth/google"
    const next = `${window.location.pathname}${window.location.search}${window.location.hash}`
    return `/api/auth/google?next=${encodeURIComponent(next)}`
  }

  const handleStartCreating = async () => {
    const { data } = await supabase.auth.getUser()
    if (!data?.user) {
      if (typeof window !== "undefined") {
        window.location.href = getLoginHref()
      }
      return
    }

    if (typeof window !== "undefined") {
      document.getElementById("generator")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="py-20 px-4 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-background to-pink-900/30" />

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-foreground">{t("cta.title")}</h2>
        <p className="text-xl text-muted-foreground mb-8 text-balance leading-relaxed">{t("cta.subtitle")}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="text-lg px-8 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 border-0"
            onClick={handleStartCreating}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {t("cta.button")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 h-14 border-border text-foreground hover:bg-foreground/10 bg-transparent"
          >
            {t("nav.pricing")}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-6">{t("cta.note")}</p>
      </div>
    </section>
  )
}
