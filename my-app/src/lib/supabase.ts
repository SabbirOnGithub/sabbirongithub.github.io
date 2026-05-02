import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Status = 'planned' | 'in-progress' | 'done'

export interface Category {
  id: string
  name: string
  order_index: number
}

export interface Topic {
  id: string
  category_id: string
  title: string
  description: string
  status: Status
  progress: number
  notes: string
  resources: string[]
  order_index: number
}
