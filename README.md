# SUNNITE

Official developer site for **붇다의 범어교실** (Budda Beomeo Classroom).

- Landing + Play org verification
- Public Q&A + Netlify Forms feedback
- **1:1 secret inquiries** (`inquiry.html`) via Supabase Edge Functions
- Admin replies: `admin.html` (uses `SITE_INQUIRY_ADMIN_SECRET`)

## Netlify env

Site settings → Environment variables:

| Name | Value |
|------|--------|
| `SUNNITE_SUPABASE_URL` | `https://YOUR-PROJECT.supabase.co` |
| `SUNNITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |

Build runs `node scripts/write-config.mjs` → writes `config.js` (gitignored).

Local preview: copy `config.example.js` → `config.js` and fill values.

## Supabase (from capacitor-app)

```bash
cd ../capacitor-app
supabase db push
supabase secrets set SITE_INQUIRY_ADMIN_SECRET="choose-a-long-admin-password"
supabase functions deploy site-inquiry-create --no-verify-jwt
supabase functions deploy site-inquiry-view --no-verify-jwt
supabase functions deploy site-inquiry-admin --no-verify-jwt
```

## Admin workflow

1. Open `https://sunnite.netlify.app/admin.html`
2. Enter the same value as `SITE_INQUIRY_ADMIN_SECRET`
3. Reply to open inquiries
4. Optionally email the user that a reply is ready (they open with code + PIN on `inquiry.html`)
