const SUPABASE_URL = "";
const SUPABASE_KEY = "";

let db = null;

function conectarSupabase(){

    if(!SUPABASE_URL) return;

    db = supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

}