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
    ingresoId:null,

    fotosPendientes: [],

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

                    <select
                        id="selectorAnio"
                        onchange="cargarEstadisticasDashboard()"
                    >
                    </select>


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

<div class="cards">

    <div class="card">
        <div class="card-title">
            Servicios este mes
        </div>

        <div
            class="card-value"
            id="serviciosMes"
        >
            0
        </div>
    </div>


    <div class="card">
        <div class="card-title">
            Facturado este mes
        </div>

        <div
            class="card-value gold"
            id="facturadoMes"
        >
            S/ 0.00
        </div>
    </div>


    <div class="card">
        <div class="card-title">
            Servicios este año
        </div>

        <div
            class="card-value"
            id="serviciosAnio"
        >
            0
        </div>
    </div>


    <div class="card">
        <div class="card-title">
            Facturado este año
        </div>

        <div
            class="card-value gold"
            id="facturadoAnio"
        >
            S/ 0.00
        </div>
    </div>

</div>


<div
    class="panel"
    style="margin-top:25px;"
>

    <h2>
        Servicios por mes
    </h2>

    <div id="graficoServicios"></div>

</div>


<div
    class="panel"
    style="margin-top:25px;"
>

    <h2>
        Facturación por mes
    </h2>

    <div id="graficoFacturacion"></div>

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

    cargarEstadisticasDashboard();

}


/* =====================================================
   NUEVA INSPECCIÓN
===================================================== */

function iniciarNuevaInspeccion(){

    APP.screen = "inspection";

    APP.step = 0;

    APP.numeroInspeccion = "";
    APP.ingresoId=null;

    APP.fotosPendientes=[];

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

    APP.step = Number(APP.step);

    switch(APP.step){

        case 0:
            return pasoDatos();

        case 1:
            return pasoCarroceria();

        case 2:
            return pasoVozCliente();

        case 3:
            return pasoEstadoInicial();

        case 4:
            return pasoPruebaManejo();
        case 5:
            return pasoEstadoFinal();
        case 6:
            return pasoConclusion();
        case 7:
            return pasoDatosCliente();
        case 8:
            return pasoResumen();

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

                    <div
                        style="
                            display:flex;
                            justify-content:space-between;
                            gap:15px;
                            margin-top:25px;
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

}

/* =====================================================
   PASO 4 - ESTADO INICIAL DEL AUTO
===================================================== */

function pasoEstadoInicial(){

    return `

        <div class="panel">

            <h2>
                4. Estado inicial del auto
            </h2>

            <br>

            <div class="form-grid">

                <div>

                    <label>
                        Estado general
                    </label>

                    <select id="estado_general">

                        ${opcionesSelect(
                            [
                                "Excelente",
                                "Bueno",
                                "Regular",
                                "Malo"
                            ],
                            APP.data.estado_inicial.estado_general
                        )}

                    </select>

                </div>


                <div>

                    <label>
                        Luces
                    </label>

                    <select id="luces">

                        ${opcionesSelect(
                            [
                                "Funcionan correctamente",
                                "Presentan observaciones",
                                "No funcionan"
                            ],
                            APP.data.estado_inicial.luces
                        )}

                    </select>

                </div>


                <div>

                    <label>
                        Neumáticos
                    </label>

                    <select id="neumaticos">

                        ${opcionesSelect(
                            [
                                "Buen estado",
                                "Desgaste moderado",
                                "Desgaste excesivo"
                            ],
                            APP.data.estado_inicial.neumaticos
                        )}

                    </select>

                </div>


                <div>

                    <label>
                        Interior
                    </label>

                    <select id="interior">

                        ${opcionesSelect(
                            [
                                "Buen estado",
                                "Regular",
                                "Mal estado"
                            ],
                            APP.data.estado_inicial.interior
                        )}

                    </select>

                </div>


                <div>

                    <label>
                        Exterior
                    </label>

                    <select id="exterior">

                        ${opcionesSelect(
                            [
                                "Buen estado",
                                "Regular",
                                "Mal estado"
                            ],
                            APP.data.estado_inicial.exterior
                        )}

                    </select>

                </div>


                <div>

                    <label>
                        Tablero
                    </label>

                    <select id="tablero">

                        ${opcionesSelect(
                            [
                                "Sin observaciones",
                                "Con observaciones"
                            ],
                            APP.data.estado_inicial.tablero
                        )}

                    </select>

                </div>


                <div class="full">

                    <label>
                        Observaciones
                    </label>

                    <textarea
                        id="observaciones"
                        placeholder="Describa el estado en que recibe el vehículo..."
                    >${
                        APP.data.estado_inicial.observaciones || ""
                    }</textarea>

                </div>


                <div class="full">

                    <label>
                        Fotografías del estado inicial
                    </label>

                    <input
                        type="file"
                        id="fotoEstadoInicial"
                        multiple
                        accept="image/*"
                    >

                    <div
                        id="previewEstadoInicial"
                        class="preview"
                    ></div>

                </div>

            </div>


            <br>


            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    gap:15px;
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
   PASO 7 - CONCLUSIÓN
===================================================== */

function pasoConclusion(){

    return `

        <div class="panel">

            <h2>
                7. Conclusión
            </h2>

            <br>

            <div class="form-grid">

                <div class="full">

                    <label>
                        Diagnóstico general
                    </label>

                    <textarea
                        id="diagnostico_general"
                        placeholder="Ingrese el diagnóstico general del vehículo..."
                    >${
                        APP.data.conclusion.diagnostico_general || ""
                    }</textarea>

                </div>


                <div>

                    <label>
                        Prioridad
                    </label>

                    <select id="prioridad">

                        ${opcionesSelect(
                            [
                                "Baja",
                                "Media",
                                "Alta",
                                "Crítica"
                            ],
                            APP.data.conclusion.prioridad
                        )}

                    </select>

                </div>


                <div>

                    <label>
                        Resultado general
                    </label>

                    <select id="resultado_general">

                        ${opcionesSelect(
                            [
                                "Conforme",
                                "Con observaciones",
                                "Requiere reparación",
                                "No conforme"
                            ],
                            APP.data.conclusion.resultado_general
                        )}

                    </select>

                </div>


                <div class="full">

                    <label>
                        Trabajos recomendados
                    </label>

                    <textarea
                        id="trabajos_recomendados"
                        placeholder="Indique los trabajos o reparaciones recomendadas..."
                    >${
                        APP.data.conclusion.trabajos_recomendados || ""
                    }</textarea>

                </div>


                <div class="full">

                    <label>
                        Observaciones finales
                    </label>

                    <textarea
                        id="observaciones_finales"
                        placeholder="Ingrese las observaciones finales..."
                    >${
                        APP.data.conclusion.observaciones_finales || ""
                    }</textarea>

                </div>

            </div>

            <br>

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    gap:15px;
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
   PASO 8 - DATOS DEL CLIENTE
===================================================== */

function pasoDatosCliente(){

    return `

        <div class="panel">

            <h2>
                8. Datos del cliente
            </h2>

            <br>

            <div class="form-grid">

                <div>

                    <label>
                        Nombre / Razón social
                    </label>

                    <input
                        id="nombre"
                        value="${
                            APP.data.cliente.nombre || ""
                        }"
                        placeholder="Nombre del cliente"
                    >

                </div>


                <div>

                    <label>
                        DNI / RUC
                    </label>

                    <input
                        id="documento"
                        value="${
                            APP.data.cliente.documento || ""
                        }"
                        placeholder="DNI o RUC"
                    >

                </div>

                <div>

                    <label>
                        Monto del servicio (S/)
                    </label>

                    <input
                        id="montoServicio"
                        type="number"
                        min="0"
                        step="0.01"
                        value="${
                            APP.data.cliente.montoServicio || ""
                        }"
                        placeholder="0.00"
                    >

                </div>


                <div>

                    <label>
                        Teléfono
                    </label>

                    <input
                        id="telefono"
                        value="${
                            APP.data.cliente.telefono || ""
                        }"
                        placeholder="Teléfono"
                    >

                </div>


                <div>

                    <label>
                        Correo electrónico
                    </label>

                    <input
                        id="email"
                        type="email"
                        value="${
                            APP.data.cliente.email || ""
                        }"
                        placeholder="correo@cliente.com"
                    >

                </div>


                <div class="full">

                    <label>
                        Observaciones
                    </label>

                    <textarea
                        id="observaciones"
                        placeholder="Observaciones del cliente..."
                    >${
                        APP.data.cliente.observaciones || ""
                    }</textarea>

                </div>

            </div>

            <br>

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    gap:15px;
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
   PASO 9 - RESUMEN
===================================================== */

function pasoResumen(){

    const fotos = [

        ...(APP.data.carroceria.fotos || []),

        ...(APP.data.estado_inicial.fotos || []),

        ...(APP.data.prueba_manejo.fotos || []),

        ...(APP.data.estado_final.fotos || [])

    ];

    return `

        <div class="panel">

            <h2>
                9. Resumen de la inspección
            </h2>

            <br>

            <div class="summary-grid">

                <div class="summary-card">

                    <h3>
                        Datos del vehículo
                    </h3>

                    <p>
                        <strong>Placa:</strong>
                        ${APP.data.datos.placa || "-"}
                    </p>

                    <p>
                        <strong>Marca:</strong>
                        ${APP.data.datos.marca || "-"}
                    </p>

                    <p>
                        <strong>Modelo:</strong>
                        ${APP.data.datos.modelo || "-"}
                    </p>

                    <p>
                        <strong>Año:</strong>
                        ${APP.data.datos.anio || "-"}
                    </p>

                    <p>
                        <strong>VIN:</strong>
                        ${APP.data.datos.vin || "-"}
                    </p>

                </div>


                <div class="summary-card">

                    <h3>
                        Carrocería
                    </h3>

                    <p>
                        <strong>Carrocería:</strong>
                        ${
                            APP.data.carroceria.estado_carroceria
                            || "-"
                        }
                    </p>

                    <p>
                        <strong>Pintura:</strong>
                        ${
                            APP.data.carroceria.estado_pintura
                            || "-"
                        }
                    </p>

                    <p>
                        <strong>Hallazgos:</strong>
                        ${
                            APP.data.carroceria.hallazgos_carroceria
                            || "-"
                        }
                    </p>

                </div>


                <div class="summary-card">

                    <h3>
                        Voz del cliente
                    </h3>

                    <p>
                        ${
                            APP.data.voz_cliente.solicitud_cliente
                            || "-"
                        }
                    </p>

                </div>


                <div class="summary-card">

                    <h3>
                        Estado inicial
                    </h3>

                    <p>
                        <strong>Estado:</strong>
                        ${
                            APP.data.estado_inicial.estado_general
                            || "-"
                        }
                    </p>

                    <p>
                        ${
                            APP.data.estado_inicial.observaciones
                            || "-"
                        }
                    </p>

                </div>


                <div class="summary-card">

                    <h3>
                        Prueba de manejo
                    </h3>

                    <p>
                        <strong>Arranque:</strong>
                        ${
                            APP.data.prueba_manejo.arranque
                            || "-"
                        }
                    </p>

                    <p>
                        <strong>Dirección:</strong>
                        ${
                            APP.data.prueba_manejo.direccion
                            || "-"
                        }
                    </p>

                    <p>
                        <strong>Frenado:</strong>
                        ${
                            APP.data.prueba_manejo.frenado
                            || "-"
                        }
                    </p>

                </div>


                <div class="summary-card">

                    <h3>
                        Estado final
                    </h3>

                    <p>
                        <strong>Estado:</strong>
                        ${
                            APP.data.estado_final.estado_general
                            || "-"
                        }
                    </p>

                    <p>
                        ${
                            APP.data.estado_final.observaciones
                            || "-"
                        }
                    </p>

                </div>


                <div class="summary-card">

                    <h3>
                        Conclusión
                    </h3>

                    <p>
                        <strong>Resultado:</strong>
                        ${
                            APP.data.conclusion.resultado_general
                            || "-"
                        }
                    </p>

                    <p>
                        <strong>Prioridad:</strong>
                        ${
                            APP.data.conclusion.prioridad
                            || "-"
                        }
                    </p>

                    <p>
                        ${
                            APP.data.conclusion.diagnostico_general
                            || "-"
                        }
                    </p>

                </div>


                <div class="summary-card">

                    <h3>
                        Cliente
                    </h3>

                    <p>
                        <strong>Nombre:</strong>
                        ${
                            APP.data.cliente.nombre
                            || "-"
                        }
                    </p>

                    <p>
                        <strong>Documento:</strong>
                        ${
                            APP.data.cliente.documento
                            || "-"
                        }
                    </p>

                    <p>
                        <strong>Teléfono:</strong>
                        ${
                            APP.data.cliente.telefono
                            || "-"
                        }
                    </p>

                </div>

            </div>


            <br>


            <div class="panel">

                <h3>
                    Fotografías
                </h3>

                <div
                    class="preview"
                >

                    ${
                        fotos.length

                        ?

                        fotos.map(
                            foto => `
                                <img
                                    src="${foto.url}"
                                    alt="Fotografía"
                                >
                            `
                        ).join("")

                        :

                        "<p>No hay fotografías cargadas.</p>"
                    }

                </div>

            </div>


            <br>


            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    gap:15px;
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
                    onclick="generarReporteTaller()"
                >
                    📄 Generar reporte
                </button>

            </div>

        </div>

    `;

}


function pasoEstadoFinal(){

    return `

        <div class="panel">

            <h2>
                6. Estado final del auto
            </h2>

            <br>

            <div class="form-grid">

                <div>

                    <label>
                        Estado general
                    </label>

                    <select id="estado_general">

                        ${opcionesSelect(
                            [
                                "Excelente",
                                "Bueno",
                                "Regular",
                                "Malo"
                            ],
                            APP.data.estado_final.estado_general
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Luces
                    </label>

                    <select id="luces">

                        ${opcionesSelect(
                            [
                                "Funcionan correctamente",
                                "Presentan observaciones",
                                "No funcionan"
                            ],
                            APP.data.estado_final.luces
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Neumáticos
                    </label>

                    <select id="neumaticos">

                        ${opcionesSelect(
                            [
                                "Buen estado",
                                "Desgaste moderado",
                                "Desgaste excesivo"
                            ],
                            APP.data.estado_final.neumaticos
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Interior
                    </label>

                    <select id="interior">

                        ${opcionesSelect(
                            [
                                "Buen estado",
                                "Regular",
                                "Mal estado"
                            ],
                            APP.data.estado_final.interior
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Exterior
                    </label>

                    <select id="exterior">

                        ${opcionesSelect(
                            [
                                "Buen estado",
                                "Regular",
                                "Mal estado"
                            ],
                            APP.data.estado_final.exterior
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Tablero
                    </label>

                    <select id="tablero">

                        ${opcionesSelect(
                            [
                                "Sin observaciones",
                                "Con observaciones"
                            ],
                            APP.data.estado_final.tablero
                        )}

                    </select>

                </div>

                <div>

                    <label>
                        Accesorios
                    </label>

                    <select id="accesorios">

                        ${opcionesSelect(
                            [
                                "Completos",
                                "Incompletos",
                                "No verificados"
                            ],
                            APP.data.estado_final.accesorios
                        )}

                    </select>

                </div>

                <div class="full">

                    <label>
                        Trabajos realizados
                    </label>

                    <textarea
                        id="trabajos_realizados"
                        placeholder="Describa los trabajos realizados durante la intervención..."
                    >${
                        APP.data.estado_final.trabajos_realizados || ""
                    }</textarea>

                </div>

                <div class="full">

                    <label>
                        Observaciones finales
                    </label>

                    <textarea
                        id="observaciones"
                        placeholder="Describa el estado final del vehículo..."
                    >${
                        APP.data.estado_final.observaciones || ""
                    }</textarea>

                </div>

                <div class="full">

                    <label>
                        Fotografías del estado final
                    </label>

                    <input
                        type="file"
                        id="fotoEstadoFinal"
                        multiple
                        accept="image/*"
                    >

                    <div
                        id="previewEstadoFinal"
                        class="preview"
                    ></div>

                </div>

            </div>

            <br>

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    gap:15px;
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

function pasoPruebaManejo(){

    return `

        <div class="panel">

            <h2>
                5. Prueba de manejo
            </h2>

            <br>

            <div class="form-grid">

                <div>

                    <label>
                        Arranque
                    </label>

                    <select id="arranque">

                        ${opcionesSelect(
                            [
                                "Normal",
                                "Con observaciones",
                                "Deficiente"
                            ],
                            APP.data.prueba_manejo.arranque
                        )}

                    </select>

                </div>


                <div>

                    <label>
                        Dirección
                    </label>

                    <select id="direccion">

                        ${opcionesSelect(
                            [
                                "Normal",
                                "Con observaciones",
                                "Deficiente"
                            ],
                            APP.data.prueba_manejo.direccion
                        )}

                    </select>

                </div>


                <div>

                    <label>
                        Frenado
                    </label>

                    <select id="frenado">

                        ${opcionesSelect(
                            [
                                "Normal",
                                "Con observaciones",
                                "Deficiente"
                            ],
                            APP.data.prueba_manejo.frenado
                        )}

                    </select>

                </div>


                <div>

                    <label>
                        Suspensión
                    </label>

                    <select id="suspension_manejo">

                        ${opcionesSelect(
                            [
                                "Normal",
                                "Con observaciones",
                                "Deficiente"
                            ],
                            APP.data.prueba_manejo.suspension_manejo
                        )}

                    </select>

                </div>


                <div>

                    <label>
                        Transmisión
                    </label>

                    <select id="transmision_manejo">

                        ${opcionesSelect(
                            [
                                "Normal",
                                "Con observaciones",
                                "Deficiente"
                            ],
                            APP.data.prueba_manejo.transmision_manejo
                        )}

                    </select>

                </div>


                <div>

                    <label>
                        Ruidos / vibraciones
                    </label>

                    <select id="ruidos">

                        ${opcionesSelect(
                            [
                                "Sin ruidos",
                                "Ruidos leves",
                                "Ruidos anormales"
                            ],
                            APP.data.prueba_manejo.ruidos
                        )}

                    </select>

                </div>


                <div class="full">

                    <label>
                        Observaciones
                    </label>

                    <textarea
                        id="observaciones_manejo"
                        placeholder="Describa cualquier comportamiento observado durante la prueba..."
                    >${
                        APP.data.prueba_manejo.observaciones_manejo || ""
                    }</textarea>

                </div>

            <div class="full">

    <label>
        Fotografías de la prueba de manejo
    </label>

    <input
        type="file"
        id="fotoPruebaManejo"
        multiple
        accept="image/*"
    >

    <div
        id="previewPruebaManejo"
        class="preview"
    ></div>

</div> 



            </div>

            <br>

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    gap:15px;
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

function pasoVozCliente(){

    return `

        <div class="panel">

            <h2>
                3. Voz del cliente
            </h2>

            <br>

            <div class="form-grid">

                <div class="full">

                    <label>
                        ¿Qué desea que le hagan al vehículo?
                    </label>

                    <textarea
                        id="solicitud_cliente"
                        placeholder="Describa lo que el cliente solicita..."
                    >${
                        APP.data.voz_cliente.solicitud_cliente || ""
                    }</textarea>

                </div>

                <div class="full">

                    <label>
                        Observaciones adicionales
                    </label>

                    <textarea
                        id="observaciones_cliente"
                        placeholder="Ingrese cualquier información adicional proporcionada por el cliente..."
                    >${
                        APP.data.voz_cliente.observaciones_cliente || ""
                    }</textarea>

                </div>

            </div>

            <br>

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    gap:15px;
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

    let seccion = null;

    if(APP.step === 0){

        seccion = "datos";

    }

    if(APP.step === 1){

        seccion = "carroceria";

    }

    if(APP.step === 2){

        seccion = "voz_cliente";

    }

    if(APP.step === 3){

        seccion = "estado_inicial";

    }
    
    if(APP.step === 4){

    seccion = "prueba_manejo";

    }
    if(APP.step === 5){

    seccion = "estado_final";

    }

    if(!seccion){

        return;

    }

    

    /* =========================
       FOTOS CARROCERÍA
    ========================= */

    if(APP.step === 1){

        activarInputPreviewTaller(

            "fotoCarroceria",

            "previewCarroceria",

            "carroceria"

        );

    }


    /* =========================
       FOTOS ESTADO INICIAL
    ========================= */

    if(APP.step === 3){

        activarInputPreviewTaller(

            "fotoEstadoInicial",

            "previewEstadoInicial",

            "estado_inicial"

        );

    }

    if(APP.step === 4){

    activarInputPreviewTaller(
        "fotoPruebaManejo",
        "previewPruebaManejo",
        "prueba_manejo"
    );

    }

    if(APP.step === 5){

        activarInputPreviewTaller(
            "fotoEstadoFinal",
            "previewEstadoFinal",
            "estado_final"
        );

    }


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


    /*
    =====================================================
    MOSTRAR FOTOS YA CARGADAS
    =====================================================
    */

    cont.innerHTML = "";

    APP.data[seccion].fotos.forEach(
        foto => {

            const img =
                document.createElement(
                    "img"
                );

            img.src = foto.url;

            cont.appendChild(img);

        }
    );


    /*
    =====================================================
    SELECCIONAR FOTOS
    =====================================================
    */

    input.onchange = () => {

        const proceso = (async () => {

            if(!APP.numeroInspeccion){

                guardarFormulario("datos");

                if(
                    !APP.data.datos.placa ||
                    !APP.data.datos.placa.trim()
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


                    /*
                    =================================================
                    GUARDAR FOTO EN EL ESTADO DE LA INSPECCIÓN
                    =================================================
                    */

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


                    /*
                    =================================================
                    MOSTRAR FOTO
                    =================================================
                    */

                    const img =
                        document.createElement(
                            "img"
                        );

                    img.src =
                        resultado.url;

                    cont.appendChild(img);


                }catch(error){

                    console.error(
                        "Error subiendo foto:",
                        error
                    );

                    throw error;

                }

            }


            /*
            =================================================
            PERMITIR VOLVER A SELECCIONAR EL MISMO ARCHIVO
            =================================================
            */

            input.value = "";

        })();


        /*
        =====================================================
        REGISTRAR SUBIDA PENDIENTE
        =====================================================
        */

        APP.fotosPendientes.push(
            proceso
        );


        proceso.finally(() => {

            APP.fotosPendientes =
                APP.fotosPendientes.filter(
                    p => p !== proceso
                );

        });

    };

}


/* =====================================================
   SIGUIENTE
===================================================== */

async function nextStep(){

    /*
    =====================================================
    ESPERAR FOTOS PENDIENTES
    =====================================================
    */

    if(APP.fotosPendientes.length > 0){

        try{

            await Promise.all(
                APP.fotosPendientes
            );

        }catch(error){

            alert(
                "No se pudo completar la carga de una fotografía. Revisa la foto antes de continuar."
            );

            return;

        }

    }

    if(APP.step === 0){

        guardarFormulario("datos");

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


    if(APP.step === 2){

        guardarFormulario(
            "voz_cliente"
        );

    }

    if(APP.step === 3){

    guardarFormulario(
        "estado_inicial"
    );

    }
    if(APP.step === 4){

    guardarFormulario(
        "prueba_manejo"
    );

    }
    if(APP.step === 5){

    guardarFormulario(
        "estado_final"
    );

    }

    if(APP.step === 6){

    guardarFormulario(
        "conclusion"
    );

}

if(APP.step === 7){

    guardarFormulario(
        "cliente"
    );



try{

        await guardarInspeccionTaller();

    }catch(error){

        console.error(
            "Error guardando inspección:",
            error
        );

        alert(
            "No se pudo guardar la inspección en el historial."
        );

        return;

    }
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

async function prevStep(){

    if(APP.fotosPendientes.length > 0){

        try{

            await Promise.all(
                APP.fotosPendientes
            );

        }catch(error){

            alert(
                "No se pudo completar la carga de una fotografía."
            );

            return;

        }

    }


    if(APP.step > 0){

        APP.step--;

        renderInspeccion();

    }

}

/* =====================================================
   GUARDAR INSPECCIÓN COMPLETA
===================================================== */

async function guardarInspeccionTaller(){

    if(
    APP.ingresoId &&
    !APP.modoEdicion
){

    return APP.ingresoId;

}


    if(!APP.numeroInspeccion){

        throw new Error(
            "No existe número de inspección."
        );

    }


    if(!APP.taller){

        throw new Error(
            "No existe taller asignado."
        );

    }


    if(!APP.session){

        throw new Error(
            "No existe sesión activa."
        );

    }


    const ingreso = {

        numero_inspeccion:
            APP.modoEdicion
            ? APP.numeroInspeccionOriginal
            : APP.numeroInspeccion,


        taller_id:
            APP.taller.id,

        usuario_id:
            APP.session.user.id,

        fecha:
            APP.modoEdicion
            ? APP.fechaOriginal
            : new Date().toISOString(),

        estado:
            "completada",

        placa:
            APP.data.datos.placa,
        
        monto: Number(
            APP.data.cliente.montoServicio || 0
        ),
        datos:
            APP.data,

        

    };

    if(APP.modoEdicion){

    ingreso.id =
        APP.ingresoId;

}


    console.log(
        "Guardando inspección:",
        ingreso
    );


    const resultado =
        await guardarIngresoTaller(
            ingreso,
            APP.modoEdicion
        );


    APP.ingresoId =
        resultado.id;


    console.log(
        "Inspección guardada:",
        resultado
    );


    /*
       Guardar también el registro
       de cada fotografía
    */

    const seccionesFotos = [

        "carroceria",
        "estado_inicial",
        "prueba_manejo",
        "estado_final"

    ];


    for(
        const seccion of seccionesFotos
    ){

        const fotos =
            APP.data[seccion]?.fotos || [];


        for(
            const foto of fotos
        ){

            try{

                await guardarFotoTaller({

                    ingreso_id:
                        resultado.id,

                    taller_id:
                        APP.taller.id,

                    seccion:
                        seccion,

                    nombre:
                        foto.nombre,

                    ruta:
                        foto.ruta,

                    url:
                        foto.url

                });

            }catch(error){

                console.error(
                    "Error registrando fotografía:",
                    error
                );

            }

        }

    }


    return resultado.id;

}


/* =====================================================
   HISTORIAL
===================================================== */

async function mostrarHistorial(){

    try{

        const historial =
            await obtenerHistorialTaller();


        if(!historial || historial.length === 0){

            alert(
                "No hay inspecciones registradas."
            );

            return;

        }


        let html = `

            <div class="panel">

                <h2>
                    Historial de inspecciones
                </h2>

                <div
                    style="
                        overflow-x:auto;
                        margin-top:20px;
                    "
                >

                    <table
                        style="
                            width:100%;
                            border-collapse:collapse;
                        "
                    >

                        <thead>

                            <tr>

                                <th>
                                    Fecha
                                </th>

                                <th>
                                    Inspección
                                </th>

                                <th>
                                    Placa
                                </th>

                                <th>
                                    Estado
                                </th>

                                <th>
                                    Acción
                                </th>

                            </tr>

                        </thead>

                        <tbody>

        `;


        historial.forEach(
            ingreso => {

                const fecha =
                    ingreso.fecha
                        ? new Date(
                            ingreso.fecha
                        ).toLocaleDateString(
                            "es-PE"
                        )
                        : "-";


                html += `

                    <tr>

                        <td>
                            ${fecha}
                        </td>

                        <td>
                            ${
                                ingreso.numero_inspeccion
                                || "-"
                            }
                        </td>

                        <td>
                            ${
                                ingreso.placa
                                || "-"
                            }
                        </td>

                        <td>
                            ${
                                ingreso.estado
                                || "-"
                            }
                        </td>

                        <td>

                            <button
                                class="btn-primary"
                                onclick="
                                    abrirInspeccionTaller(
                                        ${ingreso.id}
                                    )
                                "
                            >
                                Ver
                            </button>

                                <button
                                    class="secondary"
                                    onclick="
                                        editarInspeccionTaller(
                                            ${ingreso.id}
                                        )
                                    "
                style="margin-left:8px;"
            >
                ✏️ Editar
            </button>      


                        </td>

                    </tr>

                `;

            }
        );


        html += `

                        </tbody>

                    </table>

                </div>

                <br>

                <button
                    class="secondary"
                    onclick="mostrarDashboard()"
                >
                    ← Volver
                </button>

            </div>

        `;


        document.getElementById(
            "app"
        ).innerHTML = html;


    }catch(error){

        console.error(
            "Error cargando historial:",
            error
        );

        alert(
            "No se pudo cargar el historial."
        );

    }

}

/* =====================================================
   ABRIR INSPECCIÓN DEL HISTORIAL
===================================================== */

async function editarInspeccionTaller(id){

    try{

        const historial =
            await obtenerHistorialTaller();

        const ingreso =
            (historial || []).find(
                item => Number(item.id) === Number(id)
            );

        if(!ingreso){

            alert(
                "No se encontró la inspección."
            );

            return;

        }

        /*
         * Cargar la inspección existente
         */

        APP.ingresoId =
            ingreso.id;

        APP.numeroInspeccion =
            ingreso.numero_inspeccion;

        APP.data =
            ingreso.datos || APP.data;


        APP.fechaOriginal =
            ingreso.fecha;

        APP.numeroInspeccionOriginal =
            ingreso.numero_inspeccion;    

        /*
         * Marcar que estamos editando
         */

        APP.modoEdicion = true;

        /*
         * Abrir la inspección
         * desde el primer paso
         */

        APP.step = 0;

        APP.screen = "inspeccion";

        renderInspeccion();

    }catch(error){

        console.error(
            "Error abriendo inspección para editar:",
            error
        );

        alert(
            "No se pudo abrir la inspección para editar."
        );

    }

}



async function abrirInspeccionTaller(id){

    try{

        const ingreso =
            await obtenerIngresoTaller(id);


        if(!ingreso){

            alert(
                "No se encontró la inspección."
            );

            return;

        }


        /*
         * Recuperamos los datos completos
         * que guardamos dentro de ingresos_taller
         */

        APP.ingresoId =
            ingreso.id;

        APP.numeroInspeccion =
            ingreso.numero_inspeccion;


        APP.data =
            ingreso.datos || APP.data;


        /*
         * Guardamos nuevamente los datos
         * para que reporte-taller.html
         * pueda utilizarlos.
         */

        localStorage.setItem(

            "predicarTallerReporte",

            JSON.stringify({

                numeroInspeccion:
                    ingreso.numero_inspeccion,

                taller:
                    APP.taller,

                jefetaller:
                    "Jefe de taller",

                data:
                    APP.data

            })

        );


        /*
         * Abrimos directamente
         * el informe de esta inspección.
         */

        window.location.href =
            "reporte-taller.html";


    }catch(error){

        console.error(
            "Error abriendo inspección:",
            error
        );

        alert(
            "No se pudo abrir la inspección."
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

function generarReporteTaller(){

    localStorage.setItem(
        "predicarTallerReporte",
        JSON.stringify({

            numeroInspeccion:
                APP.numeroInspeccion,

            taller:
                APP.taller,

            jefetaller:
                "Jefe de taller",

            data:
                APP.data

        })
    );


    window.location.href =
        "reporte-taller.html";

}

async function cargarEstadisticasDashboard(){

    try{

        const selector =
            document.getElementById("selectorAnio");

        const anioActual =
            new Date().getFullYear();

        // Crear años solamente la primera vez
        if(selector.options.length === 0){

            for(
                let anio = anioActual;
                anio >= anioActual - 4;
                anio--
            ){

                const opcion =
                    document.createElement("option");

                opcion.value = anio;
                opcion.textContent = anio;

                selector.appendChild(opcion);

            }

            selector.value = anioActual;

        }


        // Tomar el año que actualmente está seleccionado
        const anioSeleccionado =
            Number(selector.value);


        const historial =
            await obtenerHistorialTaller();


        const ahora =
            new Date();

        const mesActual =
            ahora.getMonth();


        let serviciosMes = 0;
        let facturadoMes = 0;

        let serviciosAnio = 0;
        let facturadoAnio = 0;


        const serviciosPorMes =
            Array(12).fill(0);

        const facturacionPorMes =
            Array(12).fill(0);


        (historial || []).forEach(
            ingreso => {

                const fecha =
                    new Date(
                        ingreso.fecha
                    );

                const monto =
                    Number(
                        ingreso.monto ??
                        ingreso.datos?.cliente?.montoServicio ??
                        0
                    );

                const mes =
                    fecha.getMonth();

                const anio =
                    fecha.getFullYear();


                if(anio === anioSeleccionado){

                    serviciosAnio++;

                    facturadoAnio += monto;

                    serviciosPorMes[mes]++;

                    facturacionPorMes[mes] +=
                        monto;


                    if(
                        anio === anioActual &&
                        mes === mesActual
                    ){

                        serviciosMes++;

                        facturadoMes += monto;

                    }

                }

            }
        );


        document
            .getElementById("serviciosMes")
            .textContent =
            serviciosMes;


        document
            .getElementById("facturadoMes")
            .textContent =
            "S/ " +
            facturadoMes.toFixed(2);


        document
            .getElementById("serviciosAnio")
            .textContent =
            serviciosAnio;


        document
            .getElementById("facturadoAnio")
            .textContent =
            "S/ " +
            facturadoAnio.toFixed(2);


        crearGraficoServicios(
            serviciosPorMes
        );


        crearGraficoFacturacion(
            facturacionPorMes
        );


    }catch(error){

        console.error(
            "Error cargando estadísticas:",
            error
        );

    }

}

function crearGraficoServicios(
    datos
){

    const meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
    ];


    const max =
        Math.max(
            ...datos,
            1
        );


    const html =
        datos.map(
            (valor, i) => {

                const ancho =
                    (valor / max) * 100;


                return `

                    <div
                        style="
                            margin:10px 0;
                        "
                    >

                        <div
                            style="
                                display:flex;
                                justify-content:space-between;
                                margin-bottom:4px;
                            "
                        >

                            <span>
                                ${meses[i]}
                            </span>

                            <strong>
                                ${valor}
                            </strong>

                        </div>


                        <div
                            style="
                                width:100%;
                                height:18px;
                                background:#eee;
                                border-radius:8px;
                                overflow:hidden;
                            "
                        >

                            <div
                                style="
                                    width:${ancho}%;
                                    height:100%;
                                    background:#c9a227;
                                "
                            ></div>

                        </div>

                    </div>

                `;

            }
        ).join("");


    document
        .getElementById(
            "graficoServicios"
        )
        .innerHTML = html;

}

function crearGraficoFacturacion(
    datos
){

    const meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
    ];


    const max =
        Math.max(
            ...datos,
            1
        );


    const html =
        datos.map(
            (valor, i) => {

                const ancho =
                    (valor / max) * 100;


                return `

                    <div
                        style="
                            margin:10px 0;
                        "
                    >

                        <div
                            style="
                                display:flex;
                                justify-content:space-between;
                                margin-bottom:4px;
                            "
                        >

                            <span>
                                ${meses[i]}
                            </span>

                            <strong>
                                S/ ${valor.toFixed(2)}
                            </strong>

                        </div>


                        <div
                            style="
                                width:100%;
                                height:18px;
                                background:#eee;
                                border-radius:8px;
                                overflow:hidden;
                            "
                        >

                            <div
                                style="
                                    width:${ancho}%;
                                    height:100%;
                                    background:#333;
                                "
                            ></div>

                        </div>

                    </div>

                `;

            }
        ).join("");


    document
        .getElementById(
            "graficoFacturacion"
        )
        .innerHTML = html;

}