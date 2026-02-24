# Sabiduria Capital Web App

Production-ready Next.js + Supabase starter for Sabiduria Capital.

## Setup

1. Copy env file:
   ```bash
   cp .env.example .env.local
   ```
2. Fill Supabase values in `.env.local`.
3. Apply SQL migration in Supabase SQL editor:
   - `supabase/migrations/001_initial_schema.sql`
4. Install deps and run:
   ```bash
   npm install
   npm run dev
   ```

## Included features
- Public marketing pages: home, about, services, blog, newsletter, contact.
- Auth pages: login, forgot password, Google OAuth callback.
- Client library (`/app`) with all published blogs/newsletters.
- Admin CMS pages for blogs and newsletter editions.
- Supabase RLS-ready schema and policies.

## Notes
- You can promote a user to admin by updating `profiles.role = 'admin'` in Supabase.
- Google sign-in requires enabling Google provider in Supabase Auth and setting callback URLs.


## Git setup

This repository is already initialized with an initial commit history.

To set your GitHub remote once you have the repo URL:

```bash
./scripts/setup-git-remote.sh <YOUR_GITHUB_REPO_URL>
```

Then push your current branch:

```bash
git push -u origin work
```
