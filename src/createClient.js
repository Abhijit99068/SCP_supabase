import { createClient } from '@supabase/supabase-js';

export const supabase= createClient(
  "https://lkrngqzwaemewmbtliks.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrcm5ncXp3YWVtZXdtYnRsaWtzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTkyMTY1MywiZXhwIjoyMDQxNDk3NjUzfQ.giR204gqyhLjDBQkxYtHyJVPb1tbCZ0bATU2OzTc8f8"
);
export default supabase;

