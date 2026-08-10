/* =====================================================
   PREDICAR - PORTAL TALLERES
===================================================== */

let APP = {

    session: null,

    perfil: null,

    taller: null,

    screen: "dashboard",

    step: 0,

    numeroInspeccion: "",

    data: {

        datos: {
            fotos: []
        },

        carroceria: {
            fotos: []
        },

        voz_cliente: {
            fotos: []
        },

        estado_inicial: {
            fotos: []
        },

        prueba_manejo: {
            fotos: []
        },

        estado_final: {
            fotos: []
        },

        conclusion: {},

        cliente: {
            fotos: []
        },

        resumen: {}

    }

};


/* =====================================================
   PASOS
===================================================== */

const PASOS = [

    "Datos del vehículo",

    "Carrocería",

    "Voz del cliente",

    "Estado inicial del auto",

    "Prueba de manejo",

    "Estado final del auto",

    "Conclusión",

    "Datos del cliente",

    "Resumen"

];


/* =====================================================
   INICIO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    iniciar
);


async function iniciar(){

    try{

        APP.session =
            await obtenerSesionTaller();

        if(APP.session){

            await cargarUsuario();

        }else{

            mostrarLogin();

        }

    }catch(error){

        console.error(
            "Error iniciando:",
            error
        );

        mostrarLogin();

    }

}


/* =====================================================
   CARGAR USUARIO
===================================================== */

async function cargarUsuario(){

    APP.perfil =
        await obtenerPerfilTaller();

    if(!APP.perfil){

        await cerrarSesionTaller();

        mostrarLogin();

        return;

    }

    APP.taller =
        await obtenerMiTaller();

    if(
        !APP.taller &&
        APP.perfil.rol !== "admin"
    ){

        alert(
            "El usuario no tiene un taller asignado."
        );

        await cerrarSesionTaller();

        mostrarLogin();

        return;

    }

    mostrarDashboard();

}


/* =====================================================
   LOGIN
===================================================== */

function mostrarLogin(){

    document.getElementById("app").innerHTML = `

        <div class="login-page">

            <div class="login-box">

                <div class="login-logo">

                    <h1>PREDICAR</h1>

                    <p>
                        AUTOMOTIVE PERÚ S.A.C.
                    </p>

                </div>

                <form id="loginForm">

                    <label>
                        Usuario / Correo
                    </label>

                    <input
                        id="loginEmail"
                        type="email"
                        placeholder="correo@taller.com"
                        required
                    >

                    <label>
                        Contraseña
                    </label>

                    <input
                        id="loginPassword"
                        type="password"
                        placeholder="••••••••"
                        required
                    >

                    <button
                        class="btn-primary"
                        type="submit"
                    >
                        Ingresar
                    </button>

                </form>

            </div>

        </div>

    `;

    document
        .getElementById("loginForm")
        .onsubmit = realizarLogin;

}


/* =====================================================
   LOGIN
===================================================== */

async function realizarLogin(event){

    event.preventDefault();

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();

    const password =
        document
            .getElementById("loginPassword")
            .value;

    try{

        const data =
            await loginTaller(
                email,
                password
            );

        APP.session =
            data.session;

        await cargarUsuario();

    }catch(error){

        console.error(error);

        alert(
            "Correo o contraseña incorrectos."
        );

    }

}


/* =====================================================
   DASHBOARD
===================================================== */

function mostrarDashboard(){

    APP.screen = "dashboard";

    document.getElementById("app").innerHTML = `

        <div class="layout">

            <aside class="sidebar">

                <div class="logo">

                    <h2>PREDICAR</h2>

                    <small>
                        Automotive Perú S.A.C.
                    </small>

                </div>

                <nav class="menu">

                    <button
                        class="active"
                        onclick="mostrarDashboard()"
                    >
                        🏠 Dashboard
                    </button>

                    <button
                        onclick="iniciarNuevaInspeccion()"
                    >
                        🚗 Nueva inspección
                    </button>

                    <button
                        onclick="mostrarHistorial()"
                    >
                        📋 Historial
                    </button>

                    <button
                        onclick="alert('Reportes próximamente')"
                    >
                        📄 Reportes
                    </button>

                    <button
                        onclick="cerrarSesion()"
                    >
                        🚪 Cerrar sesión
                    </button>

                </nav>

            </aside>

            <main class="main">

                <div class="topbar">

                    <div>

                        <h1>
                            Dashboard
                        </h1>

                        <p>
                            Portal de Taller
                        </p>

                    </div>

                    <div class="user-info">

                        <strong>
                            ${APP.perfil?.nombre || ""}
                        </strong>

                        <span>
                            ${
                                APP.taller?.nombre ||
                                "Administrador"
                            }
                        </span>

                    </div>

                </div>

                <div class="cards">

                    <div class="card">

                        <div class="card-title">
                            Taller
                        </div>

                        <div class="card-value gold">
                            ${
                                APP.taller?.nombre ||
                                "Administrador"
                            }
                        </div>

                    </div>

                    <div class="card">

                        <div class="card-title">
                            Rol
                        </div>

                        <div class="card-value">
                            ${APP.perfil?.rol || ""}
                        </div>

                    </div>

                    <div class="card">

                        <div class="card-title">
                            Estado
                        </div>

                        <div class="card-value">
                            Activo
                        </div>

                    </div>

                    <div class="card">

                        <div class="card-title">
                            Usuario
                        </div>

                        <div class="card-value">
                            ${APP.perfil?.email || ""}
                        </div>

                    </div>

                </div>

                <div class="actions">

                    <div
                        class="action"
                        onclick="iniciarNuevaInspeccion()"
                    >

                        <h3>
                            + Nueva inspección
                        </h3>

                        <p>
                            Registrar el ingreso
                            de un vehículo.
                        </p>

                    </div>

                    <div
                        class="action"
                        onclick="mostrarHistorial()"
                    >

                        <h3>
                            📋 Historial
                        </h3>

                        <p>
                            Consultar las inspecciones
                            del taller.
                        </p>

                    </div>

                    <div
                        class="action"
                        onclick="alert('Reportes próximamente')"
                    >

                        <h3>
                            📄 Reportes
                        </h3>

                        <p>
                            Generar reportes.
                        </p>

                    </div>

                </div>

            </main>

        </div>

    `;

}


/* =====================================================
   NUEVA INSPECCIÓN
===================================================== */

function iniciarNuevaInspeccion(){

    APP.screen = "inspection";

    APP.step = 0;

    APP.numeroInspeccion = "";

    APP.data = {

        datos: {
            fotos: []
        },

        carroceria: {
            fotos: []
        },

        voz_cliente: {
            fotos: []
        },

        estado_inicial: {
            fotos: []
        },

        prueba_manejo: {
            fotos: []
        },

        estado_final: {
            fotos: []
        },

        conclusion: {},

        cliente: {
            fotos: []
        },

        resumen: {}

    };

    renderInspeccion();

}


/* =====================================================
   RENDER INSPECCIÓN
===================================================== */

function renderInspeccion(){

    document.getElementById("app").innerHTML = `

        <div class="layout">

            <aside class="sidebar">

                <div class="logo">

                    <h2>PREDICAR</h2>

                    <small>
                        Automotive Perú S.A.C.
                    </small>

                </div>

                <nav class="menu">

                    <button
                        onclick="mostrarDashboard()"
                    >
                        🏠 Dashboard
                    </button>

                    <button
                        class="active"
                    >
                        🚗 Nueva inspección
                    </button>

                    <button
                        onclick="mostrarHistorial()"
                    >
                        📋 Historial
                    </button>

                    <button
                        onclick="cerrarSesion()"
                    >
                        🚪 Cerrar sesión
                    </button>

                </nav>

            </aside>

            <main class="main">

                <div class="topbar">

                    <div>

                        <h1>
                            Nueva inspección
                        </h1>

                        <p>
                            ${
                                APP.taller?.nombre || ""
                            }
                        </p>

                    </div>

                </div>

                ${mostrarProgreso()}

                <section id="inspectionContent">

                    ${renderPaso()}

                </section>

            </main>

        </div>

    `;

    prepararFormulario();

}


/* =====================================================
   PROGRESO
===================================================== */

function mostrarProgreso(){

    return `

        <div class="steps">

            ${PASOS.map((paso, index) => `

                <div
                    class="
                        step
                        ${
                            APP.step === index
                                ? "active"
                                : ""
                        }
                    "
                >

                    <strong>
                        ${index + 1}
                    </strong>

                    <br>

                    ${paso}

                </div>

            `).join("")}

        </div>

    `;

}


/* =====================================================
   RENDER PASO
===================================================== */

function renderPaso(){

    switch(APP.step){

        case 0:
            return pasoDatos();

        case 1:
            return pasoCarroceria();

        default:

            return `

                <div class="panel">

                    <h2>
                        ${PASOS[APP.step]}
                    </h2>

                    <p>
                        Este paso lo construiremos
                        a continuación.
                    </p>

                    <button
                        class="btn-primary"
                        onclick="nextStep()"
                    >
                        Siguiente →
                    </button>

                </div>

            `;

    }

}


/* =====================================================
   PASO 1 - DATOS
===================================================== */

function pasoDatos(){

    return `

        <div class="panel">

            <h2>
                1. Datos del vehículo
            </h2>

            <br>

            <div class="form-grid">

                <div>

                    <label>
                        Placa
                    </label>

                    <input
                        id="placa"
                        value="${
                            APP.data.datos.placa || ""
                        }"
                        placeholder="Ej. AUV042"
                    >

                </div>

                <div>

                    <label>
                        Marca
                    </label>

                    <input
                        id="marca"
                        value="${
                            APP.data.datos.marca || ""
                        }"
                    >

                </div>

                <div>

                    <label>
                        Modelo
                    </label>

                    <input
                        id="modelo"
                        value="${
                            APP.data.datos.modelo || ""
                        }"
                    >

                </div>

                <div>

                    <label>
                        Año
                    </label>

                    <input
                        id="anio"
                        type="number"
                        value="${
                            APP.data.datos.anio || ""
                        }"
                    >

                </div>

                <div>

                    <label>
                        VIN
                    </label>

                    <input
                        id="vin"
                        value="${
                            APP.data.datos.vin || ""
                        }"
                    >

                </div>

                <div>

                    <label>
                        Kilometraje
                    </label>

                    <input
                        id="km"
                        type="number"
                        value="${
                            APP.data.datos.km || ""
                        }"
                    >

                </div>

                <div>

                    <label>
                        Combustible
                    </label>

                    <select id="combustible">

                        ${opcionesSelect(
                            [
                                "Gasolina",
                                "Diésel",
                                "GLP",
                                "GNV",
                                "Híbrido",
                                "Eléctrico"
                            ],
                            APP.data.datos.combustible
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Transmisión
                    </label>

                    <select id="transmision">

                        ${opcionesSelect(
                            [
                                "Mecánica",
                                "Automática",
                                "CVT"
                            ],
                            APP.data.datos.transmision
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Color
                    </label>

                    <input
                        id="color"
                        value="${
                            APP.data.datos.color || ""
                        }"
                    >

                </div>

                <div class="full">

                    <label>
                        Observaciones
                    </label>

                    <textarea
                        id="obs"
                    >${
                        APP.data.datos.obs || ""
                    }</textarea>

                </div>

            </div>

            <br>

            <div
                style="
                    display:flex;
                    justify-content:flex-end;
                "
            >

                <button
                    class="btn-primary"
                    onclick="nextStep()"
                >
                    Siguiente →
                </button>

            </div>

        </div>

    `;

}


/* =====================================================
   PASO 2 - CARROCERÍA
===================================================== */

function pasoCarroceria(){

    return `

        <div class="panel">

            <h2>
                2. Carrocería
            </h2>

            <br>

            <div class="form-grid">

                <div>

                    <label>
                        Estado de carrocería
                    </label>

                    <select id="estado_carroceria">

                        ${opcionesSelect(
                            [
                                "Excelente",
                                "Buena",
                                "Regular",
                                "Mala"
                            ],
                            APP.data.carroceria.estado_carroceria
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Estado de pintura
                    </label>

                    <select id="estado_pintura">

                        ${opcionesSelect(
                            [
                                "Excelente",
                                "Buena",
                                "Regular",
                                "Mala"
                            ],
                            APP.data.carroceria.estado_pintura
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Llantas
                    </label>

                    <select id="llantas">

                        ${opcionesSelect(
                            [
                                "Excelentes",
                                "Buenas",
                                "Regulares",
                                "Malas"
                            ],
                            APP.data.carroceria.llantas
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Frenos
                    </label>

                    <select id="frenos">

                        ${opcionesSelect(
                            [
                                "Excelentes",
                                "Buenos",
                                "Regulares",
                                "Malos"
                            ],
                            APP.data.carroceria.frenos
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Suspensión
                    </label>

                    <select id="suspension">

                        ${opcionesSelect(
                            [
                                "Excelente",
                                "Buena",
                                "Regular",
                                "Mala"
                            ],
                            APP.data.carroceria.suspension
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Choques estructurales
                    </label>

                    <select id="choques">

                        ${opcionesSelect(
                            [
                                "No",
                                "Sí"
                            ],
                            APP.data.carroceria.choques
                        )}

                    </select>

                </div>

                <div class="full">

                    <label>
                        Hallazgos
                    </label>

                    <textarea
                        id="hallazgos_carroceria"
                    >${
                        APP.data.carroceria.hallazgos_carroceria || ""
                    }</textarea>

                </div>

                <div class="full">

                    <label>
                        Fotografías de carrocería
                    </label>

                    <input
                        type="file"
                        id="fotoCarroceria"
                        multiple
                        accept="image/*"
                    >

                    <div
                        id="previewCarroceria"
                        class="preview"
                    ></div>

                </div>

            </div>

            <br>

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                "
            >

                <button
                    class="secondary"
                    onclick="prevStep()"
                >
                    ← Anterior
                </button>

                <button
                    class="btn-primary"
                    onclick="nextStep()"
                >
                    Siguiente →
                </button>

            </div>

        </div>

    `;

}


/* =====================================================
   SELECT
===================================================== */

function opcionesSelect(
    opciones,
    valor
){

    return opciones.map(opcion => `

        <option
            value="${opcion}"
            ${
                valor === opcion
                    ? "selected"
                    : ""
            }
        >
            ${opcion}
        </option>

    `).join("");

}


/* =====================================================
   PREPARAR FORMULARIO
===================================================== */

function prepararFormulario(){

    const seccion =
        APP.step === 0
            ? "datos"
            : APP.step === 1
                ? "carroceria"
                : null;

    if(!seccion)
        return;

    activarGuardadoAutomatico(
        seccion
    );

    if(APP.step === 1){

        activarInputPreviewTaller(
            "fotoCarroceria",
            "previewCarroceria",
            "carroceria"
        );

    }

}


/* =====================================================
   GUARDADO AUTOMÁTICO
===================================================== */

function activarGuardadoAutomatico(
    seccion
){

    const cont =
        document.querySelector(
            ".form-grid"
        );

    if(!cont)
        return;

    cont.querySelectorAll(
        "input,select,textarea"
    ).forEach(c => {

        if(c.type === "file")
            return;

        const guardar = () => {

            APP.data[seccion][c.id] =
                c.value;

            /* Generar número apenas
               tenemos placa */

            if(
                seccion === "datos" &&
                c.id === "placa" &&
                c.value.trim()
            ){

                APP.numeroInspeccion =
                    obtenerNumeroInspeccionTaller(
                        c.value
                    );

            }

        };

        c.oninput = guardar;

        c.onchange = guardar;

    });

}


/* =====================================================
   GUARDAR FORMULARIO
===================================================== */

function guardarFormulario(
    seccion
){

    const cont =
        document.querySelector(
            ".form-grid"
        );

    if(!cont)
        return;

    cont.querySelectorAll(
        "input,select,textarea"
    ).forEach(c => {

        if(c.type === "file")
            return;

        APP.data[seccion][c.id] =
            c.value;

    });

}


/* =====================================================
   FOTOS
===================================================== */

function activarInputPreviewTaller(
    inputId,
    previewId,
    seccion
){

    const input =
        document.getElementById(
            inputId
        );

    const cont =
        document.getElementById(
            previewId
        );

    if(!input || !cont)
        return;


    if(!APP.data[seccion].fotos)
        APP.data[seccion].fotos = [];


    cont.innerHTML = "";


    APP.data[seccion].fotos.forEach(
        foto => {

            const img =
                document.createElement(
                    "img"
                );

            img.src =
                foto.url;

            cont.appendChild(img);

        }
    );


    input.onchange = async () => {

        if(!APP.numeroInspeccion){

            guardarFormulario("datos");

            if(
                !APP.data.datos.placa
            ){

                alert(
                    "Primero ingresa la placa."
                );

                input.value = "";

                return;

            }

            APP.numeroInspeccion =
                obtenerNumeroInspeccionTaller(
                    APP.data.datos.placa
                );

        }


        for(
            const file of input.files
        ){

            try{

                const resultado =
                    await subirFotoTaller(

                        file,

                        APP.numeroInspeccion,

                        APP.taller.id,

                        seccion

                    );


                APP.data[seccion]
                    .fotos
                    .push({

                        url:
                            resultado.url,

                        ruta:
                            resultado.ruta,

                        nombre:
                            resultado.nombre

                    });


                const img =
                    document.createElement(
                        "img"
                    );

                img.src =
                    resultado.url;

                cont.appendChild(img);


                console.log(
                    "Foto guardada:",
                    resultado.ruta
                );


            }catch(error){

                console.error(
                    "Error subiendo foto:",
                    error
                );

                alert(
                    "No se pudo subir la foto."
                );

            }

        }


        /* Permite volver a seleccionar
           incluso el mismo archivo */

        input.value = "";

    };

}


/* =====================================================
   SIGUIENTE
===================================================== */

function nextStep(){

    if(APP.step === 0){

        guardarFormulario(
            "datos"
        );

        if(
            !APP.data.datos.placa ||
            !APP.data.datos.placa.trim()
        ){

            alert(
                "Ingresa la placa del vehículo."
            );

            return;

        }

        APP.numeroInspeccion =
            obtenerNumeroInspeccionTaller(
                APP.data.datos.placa
            );

    }


    if(APP.step === 1){

        guardarFormulario(
            "carroceria"
        );

    }


    if(
        APP.step <
        PASOS.length - 1
    ){

        APP.step++;

        renderInspeccion();

    }

}


/* =====================================================
   ANTERIOR
===================================================== */

function prevStep(){

    if(APP.step > 0){

        APP.step--;

        renderInspeccion();

    }

}


/* =====================================================
   HISTORIAL
===================================================== */

async function mostrarHistorial(){

    try{

        const historial =
            await obtenerHistorialTaller();

        console.log(
            "Historial:",
            historial
        );

        alert(
            "Historial cargado: " +
            historial.length +
            " registros."
        );

    }catch(error){

        console.error(error);

        alert(
            "No se pudo cargar el historial."
        );

    }

}


/* =====================================================
   CERRAR SESIÓN
===================================================== */

async function cerrarSesion(){

    try{

        await cerrarSesionTaller();

        APP.session = null;

        APP.perfil = null;

        APP.taller = null;

        mostrarLogin();

    }catch(error){

        console.error(error);

        alert(
            "No se pudo cerrar la sesión."
        );

    }

}