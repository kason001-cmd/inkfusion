"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, lang, setLang } = useI18n()
  const pathname = usePathname() ?? "/"
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()
  const currentPath = `${pathname}${queryString ? `?${queryString}` : ""}`
  const loginHref = `/api/auth/google?next=${encodeURIComponent(currentPath)}`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AT</span>
              </div>
              <span className="font-bold text-xl text-foreground">AI Tattoo</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#generator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.features")}
              </a>
              <a href="#styles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.styles")}
              </a>
              <a href="#showcase" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.gallery")}
              </a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.faq")}
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{lang === "en" ? "EN" : "中文"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("zh")}>中文</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
            >
              <Link href={loginHref}>{t("nav.login")}</Link>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 border-0"
            >
              {t("nav.getStarted")}
            </Button>

            <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <a href="#generator" className="text-sm text-muted-foreground hover:text-foreground">
              {t("nav.features")}
            </a>
            <a href="#styles" className="text-sm text-muted-foreground hover:text-foreground">
              {t("nav.styles")}
            </a>
            <a href="#showcase" className="text-sm text-muted-foreground hover:text-foreground">
              {t("nav.gallery")}
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">
              {t("nav.faq")}
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
