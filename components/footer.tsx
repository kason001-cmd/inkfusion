"use client"

import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-card text-card-foreground py-12 px-4 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AT</span>
              </div>
              <span className="font-bold text-xl">AI Tattoo</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{t("footer.description")}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.product")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#generator" className="hover:text-foreground transition-colors">
                  {t("footer.features")}
                </a>
              </li>
              <li>
                <a href="#styles" className="hover:text-foreground transition-colors">
                  {t("nav.styles")}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  {t("footer.pricing")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.blog")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.terms")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("footer.cookies")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>© 2025 Ink Fusion Art. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  )
}
