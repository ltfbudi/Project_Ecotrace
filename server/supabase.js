import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://jypykbtfrbxpvziieqpo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cHlrYnRmcmJ4cHZ6aWllcXBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzcxNTEwMSwiZXhwIjoyMDc5MjkxMTAxfQ.rng7SOegoGWyKoQ186nrZ7KNxZFUe5-3j5U1E086r3o"
);
