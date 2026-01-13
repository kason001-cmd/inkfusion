import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// Use the public/publishable (anon) key for SSR auth flows; do NOT use service role in user-session code.
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")
}

export async function createServerSupabaseClient() {
  // In Next 16 route handlers, cookies() is async; await it before use.
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () =>
        cookieStore.getAll().map((item) => ({
          name: item.name,
          value: item.value,
        })),
      setAll: (items) => {
        for (const cookie of items) {
          if (cookie.options) {
            cookieStore.set(cookie.name, cookie.value, cookie.options)
          } else {
            cookieStore.set(cookie.name, cookie.value)
          }
        }
      },
    },
  })
}
