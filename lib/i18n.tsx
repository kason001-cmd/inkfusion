"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "zh"

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    "nav.features": "Features",
    "nav.styles": "Styles",
    "nav.gallery": "Gallery",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.login": "Log In",
    "nav.getStarted": "Get Started Free",

    // Hero
    "hero.badge": "AI-Powered Tattoo Design",
    "hero.title": "Create Your Perfect",
    "hero.titleHighlight": "Tattoo Design",
    "hero.titleEnd": "with AI",
    "hero.description":
      "Transform your ideas into stunning, unique tattoo designs in seconds. Choose from multiple artistic styles and preview directly on your skin with AR technology.",
    "hero.cta": "Design Your Tattoo Now",
    "hero.ctaSub": "Try it free, no credit card required",
    "hero.users": "Join 50,000+ tattoo enthusiasts",
    "hero.rating": "4.9/5 rating from 2,000+ reviews",

    // Generator
    "generator.title": "AI Tattoo Generator",
    "generator.subtitle": "Describe your dream tattoo and let AI create it for you",
    "generator.placeholder":
      "Describe your tattoo idea... (e.g., a phoenix rising from flames with geometric patterns)",
    "generator.style": "Select Style",
    "generator.placement": "Placement",
    "generator.color": "Select Color",
    "generator.generate": "Generate Tattoo",
    "generator.generating": "Creating your design...",
    "generator.loginRequired": "Please log in to generate a tattoo.",
    "generator.historyTitle": "Your History",
    "generator.historyLoading": "Loading your history...",
    "generator.historyEmpty": "No generations yet.",
    "generator.historyLoginToView": "Log in to view your generation history.",
    "generator.historyRefresh": "Refresh",

    // Placement options
    "placement.none": "No Body Mockup",
    "placement.arm": "Arm",
    "placement.forearm": "Forearm",
    "placement.upperArm": "Upper Arm",
    "placement.shoulder": "Shoulder",
    "placement.chest": "Chest",
    "placement.back": "Back",
    "placement.thigh": "Thigh",
    "placement.calf": "Calf",
    "placement.stomach": "Stomach",

    // Color options
    "color.black": "Black",
    "color.blackGray": "Black & Gray",
    "color.fullColor": "Full Color",
    "color.redBlack": "Red & Black",
    "color.blueBlack": "Blue & Black",
    "color.watercolor": "Watercolor",

    // Styles
    "styles.title": "Explore Tattoo Styles",
    "styles.subtitle": "From minimalist to bold, find the perfect style for your unique expression",
    "style.fineLine": "Fine Line",
    "style.fineLineDesc": "Delicate, precise lines for elegant minimalist designs",
    "style.traditional": "Traditional",
    "style.traditionalDesc": "Bold outlines and vibrant colors in classic American style",
    "style.watercolor": "Watercolor",
    "style.watercolorDesc": "Soft, flowing colors that mimic watercolor paintings",
    "style.geometric": "Geometric",
    "style.geometricDesc": "Sharp lines and shapes creating modern patterns",
    "style.realistic": "Realistic",
    "style.realisticDesc": "Photo-realistic portraits and detailed imagery",
    "style.japanese": "Japanese",
    "style.japaneseDesc": "Traditional Irezumi with waves, koi, and dragons",
    "style.blackwork": "Blackwork",
    "style.blackworkDesc": "Bold black ink designs with intricate patterns",
    "style.neoTraditional": "Neo-Traditional",
    "style.neoTraditionalDesc": "Modern twist on traditional with enhanced details",

    // How it works
    "how.title": "How It Works",
    "how.subtitle": "Create your perfect tattoo in three simple steps",
    "how.step1.title": "Describe Your Vision",
    "how.step1.desc": "Tell us about your dream tattoo - the theme, style, and any specific elements you want included",
    "how.step2.title": "AI Creates Designs",
    "how.step2.desc": "Our advanced AI generates multiple unique designs based on your description in seconds",
    "how.step3.title": "Preview & Customize",
    "how.step3.desc": "Use AR to see how it looks on your skin, then refine until it's perfect",

    // Showcase
    "showcase.title": "Design Gallery",
    "showcase.subtitle": "Get inspired by designs created with our AI",
    "showcase.viewAll": "View All Designs",

    // Testimonials
    "testimonials.title": "What Our Users Say",
    "testimonials.subtitle": "Join thousands of satisfied customers who found their perfect tattoo design",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Everything you need to know about AI Tattoo Art",
    "faq.q1": "How does the AI tattoo generator work?",
    "faq.a1":
      "Our AI analyzes your text description and generates unique tattoo designs using advanced machine learning. Simply describe what you want, select a style, and get multiple design options in seconds.",
    "faq.q2": "Can I use these designs for a real tattoo?",
    "faq.a2":
      "All designs you create are yours to use. We recommend bringing the design to a professional tattoo artist who can adapt it perfectly for your body placement.",
    "faq.q3": "How does the AR preview feature work?",
    "faq.a3":
      "Our AR feature uses your phone's camera to overlay the tattoo design on your skin in real-time. This helps you visualize exactly how the tattoo will look before committing.",
    "faq.q4": "Is my design unique?",
    "faq.a4":
      "Yes! Each design is generated uniquely based on your specific description. No two outputs are exactly the same, ensuring your tattoo is one-of-a-kind.",
    "faq.q5": "What styles are available?",
    "faq.a5":
      "We offer 8+ styles including Fine Line, Traditional, Watercolor, Geometric, Realistic, Japanese, Blackwork, and Neo-Traditional. More styles are added regularly.",

    // CTA
    "cta.title": "Ready to Design Your Dream Tattoo?",
    "cta.subtitle": "Join thousands of users creating unique tattoo designs with AI",
    "cta.button": "Start Creating Now",
    "cta.note": "No credit card required • Free to start",

    // Footer
    "footer.description": "AI-powered tattoo design platform helping you visualize your perfect ink.",
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.legal": "Legal",
    "footer.features": "Features",
    "footer.pricing": "Pricing",
    "footer.gallery": "Gallery",
    "footer.about": "About",
    "footer.blog": "Blog",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.cookies": "Cookie Policy",
    "footer.rights": "All rights reserved.",
  },
  zh: {
    // Header
    "nav.features": "功能特点",
    "nav.styles": "纹身风格",
    "nav.gallery": "作品展示",
    "nav.pricing": "价格方案",
    "nav.faq": "常见问题",
    "nav.login": "登录",
    "nav.getStarted": "免费开始",

    // Hero
    "hero.badge": "AI 驱动的纹身设计",
    "hero.title": "用 AI 创造你的",
    "hero.titleHighlight": "完美纹身",
    "hero.titleEnd": "设计",
    "hero.description":
      "几秒钟内将您的想法转化为独特的纹身设计。从多种艺术风格中选择，并通过 AR 技术直接在皮肤上预览效果。",
    "hero.cta": "立即设计你的纹身",
    "hero.ctaSub": "免费试用，无需信用卡",
    "hero.users": "已有 50,000+ 纹身爱好者加入",
    "hero.rating": "来自 2,000+ 条评价的 4.9/5 评分",

    // Generator
    "generator.title": "AI 纹身生成器",
    "generator.subtitle": "描述你梦想中的纹身，让 AI 为你创造",
    "generator.placeholder": "描述你的纹身想法...（例如：一只凤凰从火焰中升起，带有几何图案）",
    "generator.style": "选择风格",
    "generator.placement": "身体部位",
    "generator.color": "选择颜色",
    "generator.generate": "生成纹身",
    "generator.generating": "正在创建您的设计...",
    "generator.loginRequired": "请先登录，再生成纹身。",
    "generator.historyTitle": "历史记录",
    "generator.historyLoading": "正在加载历史记录...",
    "generator.historyEmpty": "暂无生成记录。",
    "generator.historyLoginToView": "登录后可查看生成历史。",
    "generator.historyRefresh": "刷新",

    // Placement options
    "placement.none": "不展示部位效果图",
    "placement.arm": "手臂",
    "placement.forearm": "前臂",
    "placement.upperArm": "上臂",
    "placement.shoulder": "肩部",
    "placement.chest": "胸部",
    "placement.back": "后背",
    "placement.thigh": "大腿",
    "placement.calf": "小腿",
    "placement.stomach": "腹部",

    // Color options
    "color.black": "纯黑",
    "color.blackGray": "黑灰",
    "color.fullColor": "全彩",
    "color.redBlack": "红黑",
    "color.blueBlack": "蓝黑",
    "color.watercolor": "水彩色",

    // Styles
    "styles.title": "探索纹身风格",
    "styles.subtitle": "从极简到大胆，找到最适合你独特表达的风格",
    "style.fineLine": "细线条",
    "style.fineLineDesc": "精致、精确的线条，打造优雅的极简设计",
    "style.traditional": "传统美式",
    "style.traditionalDesc": "经典美式风格的粗线条和鲜艳色彩",
    "style.watercolor": "水彩",
    "style.watercolorDesc": "模仿水彩画的柔和流动色彩",
    "style.geometric": "几何",
    "style.geometricDesc": "锐利的线条和形状创造现代图案",
    "style.realistic": "写实",
    "style.realisticDesc": "照片级真实的肖像和细节图像",
    "style.japanese": "日式",
    "style.japaneseDesc": "传统入墨风格，包含浪花、锦鲤和龙",
    "style.blackwork": "黑工",
    "style.blackworkDesc": "大胆的黑色墨水设计，带有复杂图案",
    "style.neoTraditional": "新传统",
    "style.neoTraditionalDesc": "传统风格的现代演绎，细节更加丰富",

    // How it works
    "how.title": "使用方法",
    "how.subtitle": "三个简单步骤创建您的完美纹身",
    "how.step1.title": "描述您的想法",
    "how.step1.desc": "告诉我们您梦想中的纹身 - 主题、风格以及任何您想包含的特定元素",
    "how.step2.title": "AI 创建设计",
    "how.step2.desc": "我们先进的 AI 会根据您的描述在几秒钟内生成多个独特设计",
    "how.step3.title": "预览与定制",
    "how.step3.desc": "使用 AR 查看它在您皮肤上的效果，然后调整直到完美",

    // Showcase
    "showcase.title": "设计展廊",
    "showcase.subtitle": "从我们 AI 创建的设计中获取灵感",
    "showcase.viewAll": "查看所有设计",

    // Testimonials
    "testimonials.title": "用户评价",
    "testimonials.subtitle": "加入数千名找到完美纹身设计的满意用户",

    // FAQ
    "faq.title": "常见问题",
    "faq.subtitle": "关于 AI 纹身艺术您需要知道的一切",
    "faq.q1": "AI 纹身生成器如何工作？",
    "faq.a1":
      "我们的 AI 分析您的文字描述，使用先进的机器学习生成独特的纹身设计。只需描述您想要的内容，选择风格，几秒钟内即可获得多个设计选项。",
    "faq.q2": "我可以把这些设计用于真正的纹身吗？",
    "faq.a2": "当然可以！您创建的所有设计都归您所有。我们建议将设计带给专业纹身师，他们可以根据您的身体部位完美调整。",
    "faq.q3": "AR 预览功能如何工作？",
    "faq.a3":
      "我们的 AR 功能使用您手机的摄像头实时将纹身设计叠加在您的皮肤上。这可以帮助您在决定之前准确地看到纹身的效果。",
    "faq.q4": "我的设计是独一无二的吗？",
    "faq.a4": "是的！每个设计都是根据您的具体描述独特生成的。没有两个输出完全相同，确保您的纹身是独一无二的。",
    "faq.q5": "有哪些风格可选？",
    "faq.a5": "我们提供 8 种以上风格，包括细线条、传统美式、水彩、几何、写实、日式、黑工和新传统。更多风格持续添加中。",

    // CTA
    "cta.title": "准备好设计你的梦想纹身了吗？",
    "cta.subtitle": "加入数千名使用 AI 创建独特纹身设计的用户",
    "cta.button": "立即开始创作",
    "cta.note": "无需信用卡 • 免费开始",

    // Footer
    "footer.description": "AI 驱动的纹身设计平台，帮助您可视化完美的纹身。",
    "footer.product": "产品",
    "footer.company": "公司",
    "footer.legal": "法律",
    "footer.features": "功能特点",
    "footer.pricing": "价格方案",
    "footer.gallery": "作品展示",
    "footer.about": "关于我们",
    "footer.blog": "博客",
    "footer.contact": "联系我们",
    "footer.privacy": "隐私政策",
    "footer.terms": "服务条款",
    "footer.cookies": "Cookie 政策",
    "footer.rights": "版权所有。",
  },
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[lang][key as keyof (typeof translations)["en"]] || key
  }

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
