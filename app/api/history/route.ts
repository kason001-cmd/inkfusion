import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { data, error } = await supabase
      .from("tattoo_generations")
      .select("id, created_at, prompt, model_prompt, style, color, placement, images")
      .eq("user_id", authData.user.id)
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) {
      return NextResponse.json({ items: [], error: error.message }, { status: 200 })
    }

    return NextResponse.json({ items: data ?? [] })
  } catch (err: unknown) {
    return NextResponse.json(
      { items: [], error: err instanceof Error ? err.message : String(err) },
      { status: 200 },
    )
  }
}
