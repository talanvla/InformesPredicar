const SUPABASE_URL =
    "https://ecodcojxlxilyfgdctup.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_glZWqSJZp3wDmcB7X2sMjw_c_k9_Bbc";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =====================================================
   LOGIN
===================================================== */

async function loginTaller(email, password) {

    const {
        data,
        error
    } = await db.auth.signInWithPassword({

        email: email,

        password: password

    });

    if (error) {

        console.error(
            "Error login:",
            error
        );

        throw error;

    }

    return data;

}


/* =====================================================
   CERRAR SESIÓN
===================================================== */

async function cerrarSesionTaller() {

    const {
        error
    } = await db.auth.signOut();

    if (error) {

        console.error(
            "Error cerrando sesión:",
            error
        );

        throw error;

    }

}


/* =====================================================
   SESIÓN ACTUAL
===================================================== */

async function obtenerSesionTaller() {

    const {
        data,
        error
    } = await db.auth.getSession();

    if (error) {

        throw error;

    }

    return data.session;

}


/* =====================================================
   PERFIL DEL USUARIO
===================================================== */

async function obtenerPerfilTaller() {

    const {
        data: {
            user
        }
    } = await db.auth.getUser();

    if (!user) {

        return null;

    }

    const {
        data,
        error
    } = await db
        .from("perfiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {

        console.error(
            "Error obteniendo perfil:",
            error
        );

        throw error;

    }

    return data;

}


/* =====================================================
   TALLER DEL USUARIO
===================================================== */

async function obtenerMiTaller() {

    const perfil =
        await obtenerPerfilTaller();

    if (!perfil) {

        return null;

    }

    if (!perfil.taller_id) {

        return null;

    }

    const {
        data,
        error
    } = await db
        .from("talleres")
        .select("*")
        .eq("id", perfil.taller_id)
        .single();

    if (error) {

        console.error(
            "Error obteniendo taller:",
            error
        );

        throw error;

    }

    return data;

}

/* =====================================================
   NÚMERO DE INSPECCIÓN
===================================================== */

function obtenerNumeroInspeccionTaller(placa){

    const hoy = new Date();

    const fecha =
        hoy.getFullYear().toString() +
        String(hoy.getMonth() + 1).padStart(2, "0") +
        String(hoy.getDate()).padStart(2, "0");

    const placaLimpia =
        String(placa || "")
            .trim()
            .toUpperCase()
            .replace(/\s+/g, "");

    return `PS-${fecha}-${placaLimpia}`;
}


/* =====================================================
   CREAR INGRESO
===================================================== */

async function guardarIngresoTaller(ingreso) {

    const {
        data,
        error
    } = await db
        .from("ingresos_taller")
        .insert([ingreso])
        .select()
        .single();

    if (error) {

        console.error(
            "Error guardando ingreso:",
            error
        );

        throw error;

    }

    return data;

}


/* =====================================================
   HISTORIAL DEL TALLER
===================================================== */

async function obtenerHistorialTaller() {

    const {
        data,
        error
    } = await db
        .from("ingresos_taller")
        .select("*")
        .order(
            "fecha",
            {
                ascending: false
            }
        );

    if (error) {

        console.error(
            "Error obteniendo historial:",
            error
        );

        throw error;

    }

    return data;

}


/* =====================================================
   OBTENER INSPECCIÓN
===================================================== */

async function obtenerIngresoTaller(id) {

    const {
        data,
        error
    } = await db
        .from("ingresos_taller")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {

        console.error(
            "Error obteniendo ingreso:",
            error
        );

        throw error;

    }

    return data;

}


/* =====================================================
   GUARDAR REGISTRO DE FOTO
===================================================== */

async function guardarFotoTaller(foto) {

    const {
        data,
        error
    } = await db
        .from("fotos_taller")
        .insert([foto])
        .select()
        .single();

    if (error) {

        console.error(
            "Error guardando foto:",
            error
        );

        throw error;

    }

    return data;

}


/* =====================================================
   OBTENER FOTOS
===================================================== */

async function obtenerFotosTaller(ingresoId) {

    const {
        data,
        error
    } = await db
        .from("fotos_taller")
        .select("*")
        .eq(
            "ingreso_id",
            ingresoId
        )
        .order(
            "created_at",
            {
                ascending: true
            }
        );

    if (error) {

        console.error(
            "Error obteniendo fotos:",
            error
        );

        throw error;

    }

    return data;

}

/* =====================================================
   SUBIR FOTO - TALLERES
===================================================== */

async function subirFotoTaller(
    file,
    numeroInspeccion,
    tallerId,
    seccion
){

    if(!file){

        throw new Error(
            "No se recibió ningún archivo."
        );

    }

    if(!numeroInspeccion){

        throw new Error(
            "No existe número de inspección."
        );

    }

    if(!tallerId){

        throw new Error(
            "No existe taller asignado."
        );

    }

    if(!seccion){

        throw new Error(
            "No existe sección."
        );

    }


    const extension =
        file.name
            .split(".")
            .pop()
            .toLowerCase();


    const nombreArchivo =
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 8) +
        "." +
        extension;


    const ruta =
        `taller-${tallerId}/` +
        `${numeroInspeccion}/` +
        `${seccion}/` +
        `${nombreArchivo}`;


    console.log(
        "Subiendo foto:",
        ruta
    );


    const { error } =
        await db.storage

            .from("fotos")

            .upload(
                ruta,
                file,
                {
                    cacheControl: "3600",
                    upsert: false,
                    contentType:
                        file.type || "image/jpeg"
                }
            );


    if(error){

        console.error(
            "ERROR STORAGE:",
            error
        );

        throw error;

    }


    const { data } =
        db.storage

            .from("fotos")

            .getPublicUrl(ruta);


    if(!data || !data.publicUrl){

        throw new Error(
            "No se pudo obtener la URL pública de la fotografía."
        );

    }


    return {

        url:
            data.publicUrl,

        ruta:
            ruta,

        nombre:
            nombreArchivo

    };

}