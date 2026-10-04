import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export const createSupaBaseCLient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        '';

    return createClient(supabaseUrl, supabaseKey, {
        async accessToken() {
            return ((await auth()).getToken());
        }
    });
};