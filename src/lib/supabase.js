import { createClient } from "@supabase/supabase-js";
 
const SUPABASE_URL = "https://mdagqumdyljvolhnmiqn.supabase.co";       
const SUPABASE_ANON_KEY = "sb_publishable_zl-TGHCHsjGs1EkFFd6uQA_uBXYk0Yr";              
 
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 