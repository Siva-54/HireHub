import { createClient } from "@supabase/supabase-js";
import { getAuth } from "firebase/auth";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  accessToken: async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user)
    return user ? await user.getIdToken(/* forceRefresh */ false) : null;
  },
});

export default supabase;
