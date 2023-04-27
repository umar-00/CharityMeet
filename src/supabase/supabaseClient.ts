import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_KEY } from "../../apikeys.js"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);