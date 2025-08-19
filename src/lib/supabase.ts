import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface WaterMeter {
  id: number
  meter_label: string
  account_number: string
  label: 'L1' | 'L2' | 'L3' | 'L4' | 'DC'
  zone: string
  parent_meter: string
  type: string
  jan_25: number
  feb_25: number
  mar_25: number
  apr_25: number
  may_25: number
  jun_25: number
  jul_25: number
  created_at: string
  updated_at: string
}

export async function getWaterMeters(): Promise<WaterMeter[]> {
  const { data, error } = await supabase
    .from('water_meters')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    throw error
  }

  return data || []
}