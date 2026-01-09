"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useI18n } from "@/lib/i18n"

export function FAQ() {
  const { t } = useI18n()

  const faqs = [
    { qKey: "faq.q1", aKey: "faq.a1" },
    { qKey: "faq.q2", aKey: "faq.a2" },
    { qKey: "faq.q3", aKey: "faq.a3" },
    { qKey: "faq.q4", aKey: "faq.a4" },
    { qKey: "faq.q5", aKey: "faq.a5" },
  ]

  return (
    <section id="faq" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-foreground">{t("faq.title")}</h2>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed">{t("faq.subtitle")}</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-secondary rounded-lg px-6 border-0 text-foreground"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline text-foreground">
                {t(faq.qKey)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{t(faq.aKey)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
