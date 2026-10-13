import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

if (typeof window !== 'undefined') {
  throw new Error('SECURITY VIOLATION: Admin Supabase client must NEVER be imported in browser/client components!');
}

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key';

  return createSupabaseClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
