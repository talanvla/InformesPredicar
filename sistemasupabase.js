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

/* ===========================
   ACTUALIZAR INSPECCION
   Para cuando se edita una que ya existe: cambia la fila en vez de
   crear otra. Sin esto, editar generaba un duplicado en el historial.
=========================== */

async function actualizarInspeccionSupabase(id, inspeccion) {

    const { data, error } = await db
        .from("inspecciones")
        .update(inspeccion)
        .eq("id", id)
        .select();

    if (error) throw error;

    return data[0];
}


function obtenerNumeroInspeccion(placa){

    const hoy = new Date();

    const fecha =
        hoy.getFullYear().toString() +
        String(hoy.getMonth()+1).padStart(2,"0") +
        String(hoy.getDate()).padStart(2,"0");

    return `${fecha}-${placa.toUpperCase()}`;

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

/* ===========================
   SUBIR FOTO
=========================== */

async function subirFoto(file, numeroInspeccion, seccion){

    const extension = file.name.split(".").pop();

    const nombreArchivo =
        Date.now() + "." + extension;

    const ruta =
        `${numeroInspeccion}/${seccion}/${nombreArchivo}`;

    const { error } = await db.storage

        .from("fotos")

        .upload(ruta, file);

    if(error){

    console.error("Error Storage:", error);

    throw error;

}

    const { data } = db.storage

        .from("fotos")

        .getPublicUrl(ruta);

    return data.publicUrl;

}

/* ===========================
   QUIEN ESTA ENTRANDO

   Tener sesion no dice nada: un usuario de taller inicia sesion contra
   el mismo Supabase que el administrador. Lo que separa a uno de otro
   es la columna "rol" de la tabla perfiles, la misma que ya usa el
   Portal Taller.
=========================== */

async function obtenerPerfilActual(){

    const { data: { user } } = await db.auth.getUser();

    if(!user) return null;

    const { data, error } = await db
        .from("perfiles")
        .select("id, rol")
        .eq("id", user.id)
        .single();

    if(error){

        console.error("Error obteniendo perfil:", error);

        return null;

    }

    return data;

}

async function esAdministrador(){

    const perfil = await obtenerPerfilActual();

    return !!perfil && perfil.rol === "admin";

}
