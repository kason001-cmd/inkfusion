import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

const resolveNextPath = (path: string | null) => (path && path.startsWith("/") ? path : "/")

export async function GET(request: Request) {
  const supabase = await createServerSupabaseClient()
  const url = new URL(request.url)
  const { searchParams } = url
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    console.error("OAuth error", error, searchParams.get("error_description"))
    return NextResponse.redirect(new URL("/", url.origin))
  }

  if (!code) {
    return NextResponse.redirect(new URL("/", url.origin))
  }

  // Pass the raw code string; some SDK versions mis-handle an object param
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
  if (exchangeError) {
    console.error("Failed to exchange OAuth code", exchangeError)
    return NextResponse.redirect(new URL("/", url.origin))
  }

  const nextPath = resolveNextPath(searchParams.get("next"))
  return NextResponse.redirect(new URL(nextPath, url.origin))
}
