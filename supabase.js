const SUPABASE_URL = "https://ecodcojxlxilyfgdctup.supabase.co";

const SUPABASE_KEY = "sb_publishable_glZWqSJZp3wDmcB7X2sMjw_c_k9_Bbc";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* ===========================
   GUARDAR INSPECCIÓN
=========================== */

async function guardarInspeccionSupabase(inspeccion) {

    const { data, error } = await db
        .from("inspecciones")
        .insert([inspeccion])
        .select();

    if (error) throw error;

    return data[0];
}

async function obtenerNumeroInspeccion() {

    const { count, error } = await db
        .from("inspecciones")
        .select("*", { count: "exact", head: true });

    if (error) throw error;

    return "PA-" + String((count || 0) + 1).padStart(6, "0");
}

async function obtenerInspecciones(){

    const { data, error } = await db

        .from("inspecciones")

        .select("*")

        .order("fecha",{ascending:false});

    if(error){

        throw error;

    }

    return data;

}

async function obtenerInspeccion(id){

    const { data, error } = await db
        .from("inspecciones")
        .select("*")
        .eq("id", id)
        .single();

    if(error){
        throw error;
    }

    return data;

}