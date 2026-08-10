/* =====================================================
   PREDICAR - PORTAL TALLERES
===================================================== */


let APP = {

    session: null,

    perfil: null,

    taller: null,

    screen: "dashboard"

};


/* =====================================================
   INICIO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    iniciar
);


async function iniciar() {

    try {

        APP.session =
            await obtenerSesionTaller();


        if(APP.session){

            await cargarUsuario();

        }else{

            mostrarLogin();

        }

    }catch(error){

        console.error(
            "Error iniciando portal:",
            error
        );

        mostrarLogin();

    }

}


/* =====================================================
   CARGAR USUARIO
===================================================== */

async function cargarUsuario() {

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

function mostrarLogin() {

    document.getElementById(
        "app"
    ).innerHTML = `

        <div class="login-page">

            <div class="login-box">

                <div class="login-logo">

                    <h1>PREDICAR</h1>

                    <p>
                        AUTOMOTIVE PERÚ S.A.C.
                    </p>

                </div>


                <form
                    id="loginForm"
                >

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
   REALIZAR LOGIN
===================================================== */

async function realizarLogin(event) {

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


    try {

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

function mostrarDashboard() {

    document.getElementById(
        "app"
    ).innerHTML = `

        <div class="layout">


            <aside class="sidebar">

                <div class="logo">

                    <h2>
                        PREDICAR
                    </h2>

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
                        onclick="mostrarNuevaInspeccion()"
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

                            ${
                                APP.perfil?.rol ||
                                ""
                            }

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
                        onclick="mostrarNuevaInspeccion()"
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
                        onclick="alert('Módulo de reportes próximamente')"
                    >

                        <h3>
                            📄 Reportes
                        </h3>

                        <p>
                            Generar y consultar
                            reportes PDF.
                        </p>

                    </div>


                </div>


                <div class="panel">

                    <h2>
                        Bienvenido al Portal de Talleres
                    </h2>

                    <p>

                        ${
                            APP.taller?.nombre ||
                            "Administrador"
                        }

                    </p>

                    <p>

                        El sistema está listo
                        para comenzar a registrar
                        ingresos.

                    </p>

                </div>


            </main>

        </div>

    `;

}


/* =====================================================
   NUEVA INSPECCIÓN
===================================================== */

function mostrarNuevaInspeccion() {

    alert(
        "Aquí construiremos los 9 pasos de la inspección."
    );

}


/* =====================================================
   HISTORIAL
===================================================== */

async function mostrarHistorial() {

    try {

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

async function cerrarSesion() {

    try {

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