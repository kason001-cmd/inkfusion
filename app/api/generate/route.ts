import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// Minimal OpenRouter chat-completions call without SDK to avoid extra deps
// Docs: https://openrouter.ai/docs

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
const MODEL = "google/gemini-3-pro-image-preview"

// Map UI styles to richer descriptive phrases for the prompt
const STYLE_LABELS: Record<string, string> = {
  "fine-line": "minimalist fine line style",
  traditional: "bold traditional American tattoo style",
  watercolor: "artistic watercolor tattoo style with soft gradients",
  geometric: "geometric tattoo style with clean shapes and patterns",
  realistic: "realistic blackwork tattoo shading style",
  japanese: "traditional Japanese Irezumi style",
  blackwork: "high-contrast blackwork style",
  "neo-traditional": "neo-traditional tattoo style with enhanced details",
}

const COLOR_PHRASES: Record<string, string> = {
  black: "black and white line art",
  blackGray: "black and gray ink",
  fullColor: "full color ink",
  redBlack: "red and black ink",
  blueBlack: "blue and black ink",
  watercolor: "watercolor ink palette",
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null
  return value as Record<string, unknown>
}

type PlacementConfig = {
  label: string
  composition: string
  placementNote: string
  mockupFraming: string
}

const PLACEMENT_CONFIG: Record<string, PlacementConfig> = {
  arm: {
    label: "arm",
    composition: "Symmetrical and vertical composition.",
    placementNote: "Optimized for a medium-sized arm placement with clean edges and balanced negative space.",
    mockupFraming: "Photorealistic forearm/arm-only framing (no full body), neutral background.",
  },
  forearm: {
    label: "forearm",
    composition: "Elongated vertical composition with a subtle taper at the ends.",
    placementNote: "Optimized to flow along the forearm with a stencil-friendly silhouette and readable details from a distance.",
    mockupFraming: "Photorealistic forearm-only framing from wrist to elbow, neutral background.",
  },
  upperArm: {
    label: "upper arm",
    composition: "Bold vertical composition with a slightly wider center mass.",
    placementNote: "Optimized for upper arm curvature; keep the focal point centered with strong outer contours.",
    mockupFraming: "Photorealistic upper arm-only framing (shoulder to elbow), neutral background.",
  },
  shoulder: {
    label: "shoulder",
    composition: "Rounded, slightly radial composition that reads well from multiple angles.",
    placementNote: "Optimized for shoulder cap placement; avoid overly tall proportions and keep the design cohesive in a circular area.",
    mockupFraming: "Photorealistic shoulder-only framing (upper arm + shoulder cap), neutral background.",
  },
  chest: {
    label: "chest",
    composition: "Wider composition with a centered focal point and gentle horizontal balance.",
    placementNote: "Optimized for chest placement; maintain symmetry and leave clean breathing room around the edges.",
    mockupFraming: "Photorealistic chest-only framing (collarbone to mid-chest), neutral background, non-explicit.",
  },
  back: {
    label: "back",
    composition: "Large-scale composition with layered detail and strong symmetry.",
    placementNote: "Optimized for back placement; increase detail density and maintain a strong central spine axis.",
    mockupFraming: "Photorealistic upper-back-only framing (shoulders to mid-back), neutral background.",
  },
  thigh: {
    label: "thigh",
    composition: "Vertical composition with a broader canvas and room for secondary elements.",
    placementNote: "Optimized for thigh placement; allow for larger shapes and slightly heavier line weight.",
    mockupFraming: "Photorealistic thigh-only framing (hip to knee), neutral background, non-explicit.",
  },
  calf: {
    label: "calf",
    composition: "Tall, narrow vertical composition with clean outer contours.",
    placementNote: "Optimized for calf placement; keep the design readable and aligned with the leg's vertical line.",
    mockupFraming: "Photorealistic calf-only framing (knee to ankle), neutral background.",
  },
  stomach: {
    label: "stomach",
    composition: "Centered composition with smooth curves that complement natural body curvature.",
    placementNote: "Optimized for stomach placement; avoid overly rigid straight lines and keep the silhouette clean.",
    mockupFraming: "Photorealistic stomach-only framing (below chest to above waist), neutral background, non-explicit.",
  },
}

function buildPrompt(input: { prompt: string; style?: string; color?: string; placement?: string }) {
  const stylePhrase = input.style && STYLE_LABELS[input.style] ? STYLE_LABELS[input.style] : undefined
  const colorPhrase = input.color && COLOR_PHRASES[input.color] ? COLOR_PHRASES[input.color] : undefined
  const placementConfig = input.placement && PLACEMENT_CONFIG[input.placement] ? PLACEMENT_CONFIG[input.placement] : undefined
  const previewPlacementConfig = placementConfig ?? PLACEMENT_CONFIG.forearm

  const subject = input.prompt
  const stylePart = stylePhrase ? `, ${stylePhrase}` : ""
  const detailsPart = colorPhrase
    ? `Features delicate dotwork shading and sharp edges, ${colorPhrase}.`
    : `Features delicate dotwork shading and sharp edges.`
  const compositionPart = placementConfig?.composition ?? "Symmetrical and vertical composition."
  const placementPart = placementConfig?.placementNote ? `${placementConfig.placementNote}` : ""

  const backgroundLineArt =
    input.color === "black" || input.color === "blackGray" ? ", black and white line art" : ", clean line art"
  const flashBackgroundPart = `Clean neutral background (light gray or subtle studio gradient), high contrast${backgroundLineArt}, professional tattoo flash sheet look, 8k resolution. Avoid pure white cutout backgrounds.`

  const flashPrompt = [
    `A professional tattoo flash design of ${subject}${stylePart}.`,
    detailsPart,
    compositionPart,
    placementPart,
    flashBackgroundPart,
  ].filter(Boolean)
    .join(" ")

  const placementPreviewPrompt = [
    "Create a single two-panel image to clearly show placement.",
    "Left panel: the tattoo flash design (no skin), centered on a neutral background (not pure white).",
    "Right panel: a realistic placement preview of the SAME tattoo applied on skin.",
    `Placement: ${previewPlacementConfig.label}.`,
    previewPlacementConfig.mockupFraming,
    "Show enough surrounding skin so the tattoo location on the body part is obvious.",
    "Natural skin texture, realistic shading and perspective matching body curvature, tattoo ink should look freshly healed (not glossy).",
    "Keep the background neutral and uncluttered; avoid full nudity; show only the specified body part.",
    "Ensure the tattoo design matches exactly between panels (same shapes, linework, and composition).",
    "High resolution, studio lighting.",
  ].join(" ")

  return `${flashPrompt}\n\n${placementPreviewPrompt}`
}

export async function POST(req: Request) {
  const supabase = await createServerSupabaseClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Missing OPENROUTER_API_KEY" }, { status: 500 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const bodyRecord = asRecord(body) ?? {}
  const userPrompt = String(bodyRecord.prompt ?? "").trim()
  const style = String(bodyRecord.style ?? "").trim()
  const color = String(bodyRecord.color ?? "").trim()
  const placement = String(bodyRecord.placement ?? "").trim()

  if (!userPrompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
  }

  const finalPrompt = buildPrompt({ prompt: userPrompt, style, color, placement })
  console.log("[openrouter/generate] prompt:", finalPrompt)

  const payload = {
    model: MODEL,
    messages: [
      {
        role: "user",
        content: finalPrompt,
      },
    ],
    modalities: ["image", "text"],
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        // Optional but recommended headers for OpenRouter
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Ink Fusion Art",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      return NextResponse.json(
        { error: `OpenRouter error ${response.status}`, details: text.slice(0, 500) },
        { status: 502 },
      )
    }

    const json = await response.json()

    // Normalize images from various possible shapes into an array of URLs
    const images: string[] = []
    const choice = json?.choices?.[0]
    const msg = choice?.message || choice?.delta || {}

    // Case 1: SDK-like shape: message.images[].image_url.url
    if (Array.isArray(msg?.images)) {
      for (const im of msg.images) {
        const url = im?.image_url?.url || im?.url
        if (typeof url === "string") images.push(url)
      }
    }

    // Case 2: OpenAI-like content array
    const content = msg?.content
    if (Array.isArray(content)) {
      for (const part of content) {
        if (part?.type === "image_url" && typeof part?.image_url?.url === "string") {
          images.push(part.image_url.url)
        }
        if (part?.type === "output_image" && typeof part?.url === "string") {
          images.push(part.url)
        }
      }
    }

    // Fallback: single URL string somewhere
    if (images.length === 0) {
      const maybe = msg?.image_url?.url || msg?.url
      if (typeof maybe === "string") images.push(maybe)
    }

    const text: string | undefined =
      typeof msg?.content === "string" ? msg.content : choice?.message?.text || undefined

    let historyItem: unknown = null
    let historySaved = false
    let historyError: string | null = null

    try {
      const { data, error } = await supabase
        .from("tattoo_generations")
        .insert({
          user_id: authData.user.id,
          prompt: userPrompt,
          model_prompt: finalPrompt,
          style: style || null,
          color: color || null,
          placement: placement || null,
          images,
        })
        .select("id, created_at, prompt, model_prompt, style, color, placement, images")
        .single()

      if (error) {
        historyError = error.message
      } else {
        historySaved = true
        historyItem = data
      }
    } catch (err: unknown) {
      historyError = err instanceof Error ? err.message : String(err)
    }

    return NextResponse.json({ images, text: text ?? null, prompt: finalPrompt, historySaved, historyError, historyItem })
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error: "Request failed",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    )
  }
}
