import { createClient } from "@supabase/supabase-js";
 
const SUPABASE_URL = "https://aedxxixqywibkshwivnr.supabase.co";       
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlZHh4aXhxeXdpYmtzaHdpdm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3OTcxMTMsImV4cCI6MjA5NzM3MzExM30.iEsGOg1stkCcpFKt_AIfTOX5_EemP-0dUwcmaIekWFY";              
 
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 