const APPDATA = JSON.parse(
    localStorage.getItem("predicarTallerReporte")
) || {};


document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarEncabezado();

        crearDatos();

        crearCarroceria();

        crearVozCliente();

        crearEstadoInicial();

        crearPruebaManejo();

        crearEstadoFinal();

        crearConclusion();

        crearCliente();

        crearResumen();

    }
);


/* =====================================================
   UTILIDADES
===================================================== */

function valor(valor){

    return (
        valor !== undefined &&
        valor !== null &&
        String(valor).trim() !== ""
    )
        ? valor
        : "-";

}


function crearTabla(
    titulo,
    filas
){

    return `

        <h3>
            ${titulo}
        </h3>

        <table class="tabla">

            ${filas.map(
                fila => `

                    <tr>

                        <td>
                            <b>
                                ${fila[0]}
                            </b>
                        </td>

                        <td>
                            ${valor(fila[1])}
                        </td>

                    </tr>

                `
            ).join("")}

        </table>

    `;

}


function crearGaleriaFotos(
    titulo,
    fotos
){

    if(
        !fotos ||
        fotos.length === 0
    ){

        return "";

    }


    return `

        <h3>
            ${titulo}
        </h3>

        ${fotos.map(
            (foto, index) => `

                <div class="foto-item">

                    <h4>
                        Fotografía ${index + 1}
                    </h4>

                    <img
                        class="foto-reporte"
                        src="${foto.url}"
                    >

                </div>

            `
        ).join("")}

    `;

}


/* =====================================================
   ENCABEZADO
===================================================== */

function cargarEncabezado(){

    document
        .getElementById(
            "numeroInspeccion"
        )
        .textContent =
            valor(
                APPDATA.numeroInspeccion
            );


    document
        .getElementById(
            "fechaReporte"
        )
        .textContent =
            new Date()
                .toLocaleDateString(
                    "es-PE"
                );


    document
        .getElementById(
            "nombreTaller"
        )
        .textContent =
            valor(
                APPDATA.taller?.nombre
            );


    document
        .getElementById(
            "Jefe de taller"
        )
        .textContent =
            valor(
                APPDATA.jefetaller
            );

    const logo =
            document.getElementById(
                "logoTaller"
            );

    if(
            logo &&
            APPDATA.taller &&
            APPDATA.taller.logo_url
    ){

            logo.src =
                APPDATA.taller.logo_url;

}

}


/* =====================================================
   DATOS DEL VEHÍCULO
===================================================== */

function crearDatos(){

    const d =
        APPDATA.data?.datos || {};


    document
        .getElementById("datos")
        .innerHTML =

        crearTabla(
            "DATOS DEL VEHÍCULO",
            [

                [
                    "Placa",
                    d.placa
                ],

                [
                    "Marca",
                    d.marca
                ],

                [
                    "Modelo",
                    d.modelo
                ],

                [
                    "Año",
                    d.anio
                ],

                [
                    "VIN",
                    d.vin
                ],

                [
                    "Kilometraje",
                    d.km
                ]

            ]
        );

}


/* =====================================================
   CARROCERÍA
===================================================== */

function crearCarroceria(){

    const d =
        APPDATA.data?.carroceria || {};


    document
        .getElementById("carroceria")
        .innerHTML =

        crearTabla(
            "CARROCERÍA",
            [

                [
                    "Estado de carrocería",
                    d.estado_carroceria
                ],

                [
                    "Estado de pintura",
                    d.estado_pintura
                ],

                [
                    "Llantas",
                    d.llantas
                ],

                [
                    "Frenos",
                    d.frenos
                ],

                [
                    "Suspensión",
                    d.suspension
                ],

                [
                    "Hallazgos",
                    d.hallazgos_carroceria
                ]

            ]
        )

        +

        crearGaleriaFotos(
            "Fotografías de la carrocería",
            d.fotos
        );

}


/* =====================================================
   VOZ DEL CLIENTE
===================================================== */

function crearVozCliente(){

    const d =
        APPDATA.data?.voz_cliente || {};


    document
        .getElementById(
            "vozCliente"
        )
        .innerHTML =

        crearTabla(
            "VOZ DEL CLIENTE",
            [

                [
                    "Solicitud del cliente",
                    d.solicitud_cliente
                ]

            ]
        );

}


/* =====================================================
   ESTADO INICIAL
===================================================== */

function crearEstadoInicial(){

    const d =
        APPDATA.data?.estado_inicial || {};


    document
        .getElementById(
            "estadoInicial"
        )
        .innerHTML =

        crearTabla(
            "ESTADO INICIAL DEL AUTO",
            [

                [
                    "Estado general",
                    d.estado_general
                ],

                [
                    "Luces",
                    d.luces
                ],

                [
                    "Neumáticos",
                    d.neumaticos
                ],

                [
                    "Interior",
                    d.interior
                ],

                [
                    "Exterior",
                    d.exterior
                ],

                [
                    "Tablero",
                    d.tablero
                ],

                [
                    "Observaciones",
                    d.observaciones
                ]

            ]
        )

        +

        crearGaleriaFotos(
            "Fotografías del estado inicial",
            d.fotos
        );

}


/* =====================================================
   PRUEBA DE MANEJO
===================================================== */

function crearPruebaManejo(){

    const d =
        APPDATA.data?.prueba_manejo || {};


    document
        .getElementById(
            "pruebaManejo"
        )
        .innerHTML =

        crearTabla(
            "PRUEBA DE MANEJO",
            [

                [
                    "Arranque",
                    d.arranque
                ],

                [
                    "Dirección",
                    d.direccion
                ],

                [
                    "Frenado",
                    d.frenado
                ],

                [
                    "Suspensión",
                    d.suspension_manejo
                ],

                [
                    "Transmisión",
                    d.transmision
                ],

                [
                    "Ruidos / vibraciones",
                    d.ruidos_vibraciones
                ],

                [
                    "Observaciones",
                    d.observaciones_manejo
                ]

            ]
        )

        +

        crearGaleriaFotos(
            "Fotografías de la prueba de manejo",
            d.fotos
        );

}


/* =====================================================
   ESTADO FINAL
===================================================== */

function crearEstadoFinal(){

    const d =
        APPDATA.data?.estado_final || {};


    document
        .getElementById(
            "estadoFinal"
        )
        .innerHTML =

        crearTabla(
            "ESTADO FINAL DEL AUTO",
            [

                [
                    "Estado general",
                    d.estado_general
                ],

                [
                    "Observaciones",
                    d.observaciones
                ]

            ]
        )

        +

        crearGaleriaFotos(
            "Fotografías del estado final",
            d.fotos
        );

}


/* =====================================================
   CONCLUSIÓN
===================================================== */

function crearConclusion(){

    const d =
        APPDATA.data?.conclusion || {};


    document
        .getElementById(
            "conclusion"
        )
        .innerHTML =

        crearTabla(
            "CONCLUSIÓN",
            [

                [
                    "Diagnóstico general",
                    d.diagnostico_general
                ],

                [
                    "Prioridad",
                    d.prioridad
                ],

                [
                    "Resultado general",
                    d.resultado_general
                ],

                [
                    "Trabajos recomendados",
                    d.trabajos_recomendados
                ],

                [
                    "Observaciones finales",
                    d.observaciones_finales
                ]

            ]
        );

}


/* =====================================================
   DATOS DEL CLIENTE
===================================================== */

function crearCliente(){

    const d =
        APPDATA.data?.cliente || {};


    document
        .getElementById(
            "cliente"
        )
        .innerHTML =

        crearTabla(
            "DATOS DEL CLIENTE",
            [

                [
                    "Nombre / Razón social",
                    d.nombre
                ],

                [
                    "DNI / RUC",
                    d.documento
                ],

                [
                    "Teléfono",
                    d.telefono
                ],

                [
                    "Correo electrónico",
                    d.email
                ],

                [
                    "Observaciones",
                    d.observaciones
                ]

            ]
        );

}

