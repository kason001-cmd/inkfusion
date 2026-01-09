import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

const resolveNextPath = (path: string | null) => (path && path.startsWith("/") ? path : "/")

export async function GET(request: Request) {
  const supabase = createServerSupabaseClient()
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    console.error("OAuth error", error, searchParams.get("error_description"))
    return NextResponse.redirect("/")
  }

  if (!code) {
    return NextResponse.redirect("/")
  }

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession({ code })
  if (exchangeError) {
    console.error("Failed to exchange OAuth code", exchangeError)
    return NextResponse.redirect("/")
  }

  return NextResponse.redirect(resolveNextPath(searchParams.get("next")))
}
