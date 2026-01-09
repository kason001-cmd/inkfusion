import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

const ensureSafePath = (path: string | null) => {
  if (!path) {
    return "/"
  }
  return path.startsWith("/") ? path : "/"
}

export async function GET(request: Request) {
  const supabase = createServerSupabaseClient()
  const url = new URL(request.url)
  const safeNext = ensureSafePath(url.searchParams.get("next"))
  const callbackUrl = new URL("/auth/callback", url.origin)
  callbackUrl.searchParams.set("next", safeNext)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl.toString(),
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  })

  if (error || !data.url) {
    return NextResponse.json(
      { error: error?.message ?? "Unable to start Google login" },
      { status: 500 },
    )
  }

  return NextResponse.redirect(data.url)
}
