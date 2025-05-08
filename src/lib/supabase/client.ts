'use client'

import { createBrowserClient } from '@supabase/ssr'

export const createBrowserSupabaseClient = () => {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('SUPABASE_URL 또는 SUPABASE_ANON_KEY가 없습니다.')
  }

  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

export const supabase = createBrowserSupabaseClient()
