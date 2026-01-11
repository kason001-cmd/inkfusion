import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
}

export function createServerSupabaseClient() {
  const cookieStore = cookies()//

  return createServerClient(supabaseUrl, serviceRoleKey, {
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
