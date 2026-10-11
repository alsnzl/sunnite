import { writeFileSync } from 'node:fs'

const url = (process.env.SUNNITE_SUPABASE_URL || '').trim()
const anon = (process.env.SUNNITE_SUPABASE_ANON_KEY || '').trim()

if (!url || !anon) {
  console.error(
    'Missing SUNNITE_SUPABASE_URL or SUNNITE_SUPABASE_ANON_KEY (set in Netlify env).',
  )
  process.exit(1)
}

const body = `window.SUNNITE_CONFIG = ${JSON.stringify(
  { supabaseUrl: url, supabaseAnonKey: anon },
  null,
  2,
)};\n`

writeFileSync(new URL('../config.js', import.meta.url), body, 'utf8')
console.log('Wrote config.js')
