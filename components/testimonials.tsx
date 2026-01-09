"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Testimonials() {
  const { t, lang } = useI18n()

  const testimonials =
    lang === "en"
      ? [
          {
            quote:
              "I was skeptical at first, but the AI-generated designs were incredible! I found the perfect tattoo and my artist loved the concept.",
            author: "Sarah Johnson",
            role: "Tattoo Enthusiast",
            rating: 5,
          },
          {
            quote:
              "As a tattoo artist, I appreciate clients coming in with clear, well-designed concepts. This tool is a game-changer for both artists and clients.",
            author: "Mike Chen",
            role: "Professional Tattoo Artist",
            rating: 5,
          },
          {
            quote:
              "The AR preview feature helped me visualize exactly where and how big I wanted my tattoo. Saved me from making a costly mistake!",
            author: "Emma Rodriguez",
            role: "First-time Tattoo Client",
            rating: 5,
          },
        ]
      : [
          {
            quote: "一开始我持怀疑态度，但AI生成的设计太棒了！我找到了完美的纹身，我的纹身师也很喜欢这个概念。",
            author: "李雪梅",
            role: "纹身爱好者",
            rating: 5,
          },
          {
            quote: "作为纹身师，我很欣赏客户带着清晰、设计精良的概念来。这个工具对艺术家和客户来说都是一个改变。",
            author: "张伟",
            role: "专业纹身师",
            rating: 5,
          },
          {
            quote: "AR预览功能帮助我准确地看到纹身的位置和大小。避免了我犯一个代价高昂的错误！",
            author: "王芳",
            role: "初次纹身客户",
            rating: 5,
          },
        ]

  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-foreground">
            {t("testimonials.title")}
          </h2>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed">{t("testimonials.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-shadow bg-card border-border">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-card-foreground mb-6 leading-relaxed">{testimonial.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full" />
                <div>
                  <div className="font-bold text-card-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
