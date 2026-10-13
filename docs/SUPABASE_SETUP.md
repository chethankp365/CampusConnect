# Supabase Setup Guide for Campus Connect

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Under **Project Settings > Database**, make sure the `pgvector` and `pg_trgm` extensions are enabled (or let the script enable them).
3. Open the **SQL Editor** in your Supabase dashboard and run the entire contents of `supabase/setup.sql`.
4. Run the seed data script `supabase/seed.sql` to populate 15 colleges, 120+ categorized skills, and 12+ achievement badges.
5. In **Project Settings > API**, copy your `Project URL`, `anon public` key, and `service_role` secret into `.env.local`.
