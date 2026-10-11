import { writeFileSync } from 'node:fs'

const url = (process.env.SUNNITE_SUPABASE_URL || '').trim()
const anon = (process.env.SUNNITE_SUPABASE_ANON_KEY || '').trim()

if (!url || !anon) {
  console.warn(
    'SUNNITE_SUPABASE_URL / SUNNITE_SUPABASE_ANON_KEY not set — writing empty config.js (pages still publish).',
  )
  writeFileSync(
    new URL('../config.js', import.meta.url),
    `window.SUNNITE_CONFIG = { supabaseUrl: '', supabaseAnonKey: '' };\n`,
    'utf8',
  )
  process.exit(0)
}

const body = `window.SUNNITE_CONFIG = ${JSON.stringify(
  { supabaseUrl: url, supabaseAnonKey: anon },
  null,
  2,
)};\n`

writeFileSync(new URL('../config.js', import.meta.url), body, 'utf8')
console.log('Wrote config.js')
