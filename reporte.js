const APPDATA = JSON.parse(

localStorage.getItem("predicarReporte")

);

document.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("fechaReporte").textContent =
        APPDATA.fecha_inspeccion || "";

    document.getElementById("numeroInspeccion").textContent =
        APPDATA.numero_inspeccion || "";

});


function crearTabla(titulo, filas){

    return `

    <h3>${titulo}</h3>

    <table class="tabla">

        ${filas.map(f=>`

            <tr>

                <td><b>${f[0]}</b></td>

                <td>${f[1] || ""}</td>

            </tr>

        `).join("")}

    </table>

    `;

}

function crearGaleriaFotos(titulo,fotos){

    if(!fotos || fotos.length===0)
        return "";

    return `

        <h3>${titulo}</h3>

        ${fotos.map((foto,index)=>`

            <div class="foto-item">

                <h4>

                    Fotografía ${index+1}

                </h4>

                <img

                    class="foto-reporte"

                    src="${foto.url}">

            </div>

        `).join("")}

    `;

}



crearCliente();
crearDatos();
crearCarroceria();
crearObd1();
crearMotor();
crearPrueba();
crearObd2();
crearLegal(); 
crearConclusion();

function crearCliente(){

    document.getElementById("cliente").innerHTML =

        crearTabla(

            "DATOS DEL CLIENTE",

            [

                ["Nombre", APPDATA.cliente.nombre_cliente],

                ["Teléfono", APPDATA.cliente.telefono_cliente]

            ]

        )

        +

        crearGaleriaFotos(

            "Comprobante del servicio",

            APPDATA.cliente.fotos

        );

}


function crearDatos(){

    document.getElementById("datos").innerHTML = crearTabla(

        "DATOS DEL VEHÍCULO",

        [

            ["Placa", APPDATA.datos.placa],

            ["Marca", APPDATA.datos.marca],

            ["Modelo", APPDATA.datos.modelo],

            ["Año", APPDATA.datos.anio],

            ["VIN", APPDATA.datos.vin],

            ["Kilometraje", APPDATA.datos.km]

        ]

    );

}

function crearCarroceria(){

    document.getElementById("carroceria").innerHTML =

        crearTabla(

            "CARROCERÍA",

            [

                ["Estado de carrocería", APPDATA.carroceria.estado_carroceria],

                ["Estado de pintura", APPDATA.carroceria.estado_pintura],

                ["Llantas", APPDATA.carroceria.llantas],

                ["Frenos", APPDATA.carroceria.frenos],

                ["Suspensión", APPDATA.carroceria.suspension],

                ["Choques estructurales", APPDATA.carroceria.choques],

                ["Hallazgos", APPDATA.carroceria.hallazgos_carroceria]

            ]

        )

        +

        crearGaleriaFotos(

            "Fotografías de la carrocería",

            APPDATA.carroceria.fotos

        );

}
function crearMotor(){

    document.getElementById("motor").innerHTML =

        crearTabla(

            "MOTOR",

            [

                ["Aceite", APPDATA.motor.aceite_motor],

                ["Refrigerante", APPDATA.motor.refrigerante],

                ["Batería", APPDATA.motor.bateria],

                ["Correas", APPDATA.motor.correas],

                ["Fuga de aceite", APPDATA.motor.fuga_aceite],

                ["Fuga de refrigerante", APPDATA.motor.fuga_refrigerante],

                ["Observaciones", APPDATA.motor.observaciones_motor]

            ]

        )

        +

        crearGaleriaFotos(

            "Fotografías del motor",

            APPDATA.motor.fotos

        );

}
function crearObd1(){

    document.getElementById("obd1").innerHTML =

        crearTabla(

            "ESCÁNER OBD-I",

            [

                ["Códigos", APPDATA.obd1.codigos_obd1],

                ["Descripción", APPDATA.obd1.descripcion_obd1]

            ]

        )

        +

        crearGaleriaFotos(

            "Fotografías OBD-I",

            APPDATA.obd1.fotos

        );

}

function crearPrueba(){

    document.getElementById("prueba").innerHTML =

        crearTabla(

            "PRUEBA DE MANEJO",

            [

                ["Arranque", APPDATA.prueba.arranque],

                ["Dirección", APPDATA.prueba.direccion],

                ["Frenado", APPDATA.prueba.frenado],

                ["Suspensión", APPDATA.prueba.suspension_marcha],

                ["Transmisión", APPDATA.prueba.transmision_prueba],

                ["Ruido del motor", APPDATA.prueba.ruido_motor],

                ["Observaciones", APPDATA.prueba.observaciones_prueba]

            ]

        )

        +

        crearGaleriaFotos(

            "Fotografías de la prueba",

            APPDATA.prueba.fotos

        );

}

function crearObd2(){

    document.getElementById("obd2").innerHTML =

        crearTabla(

            "ESCÁNER OBD-II",

            [

                ["Check Engine", APPDATA.obd2.check_engine],

                ["Cantidad de códigos", APPDATA.obd2.cantidad_codigos],

                ["Códigos", APPDATA.obd2.codigos_obd2],

                ["Descripción", APPDATA.obd2.descripcion_obd2]

            ]

        )

        +

        crearGaleriaFotos(

            "Fotografías OBD-II",

            APPDATA.obd2.fotos

        );

}


function crearLegal(){

    document.getElementById("legal").innerHTML =

        crearTabla(

            "ANÁLISIS LEGAL",

            [

                ["Cantidad de propietarios", APPDATA.legal.cantidad_duenos],

                ["SOAT", APPDATA.legal.soat],

                ["Revisión Técnica", APPDATA.legal.revision_tecnica],

                ["Orden de captura SAT", APPDATA.legal.orden_captura],

                ["Papeletas SAT", APPDATA.legal.papeletas_sat],

                ["Papeletas Callao", APPDATA.legal.papeletas_callao],

                ["Papeletas SUTRAN", APPDATA.legal.papeletas_sutran],

                ["Papeletas ATU", APPDATA.legal.papeletas_atu],

                ["Impuesto SAT", APPDATA.legal.impuesto_sat],

                ["Observaciones", APPDATA.legal.observaciones_legal]

            ]

        )

        +

        crearGaleriaFotos(

            "Fotografías del análisis legal",

            APPDATA.legal.fotos

        );

}

function crearConclusion(){

    document.getElementById("conclusion").innerHTML =

        crearTabla(

            "CONCLUSIÓN",

            [

                ["Recomendación", APPDATA.conclusion.recomendacion],

                ["Conclusión del inspector", APPDATA.conclusion.conclusion_general],

                ["Inspector", APPDATA.conclusion.inspector],

                ["Fecha", new Date().toLocaleDateString("es-PE")]

            ]

        )

        +

        `

        <br><br>

        <p><b>Firma del Inspector</b></p>

        <br><br><br>

        <hr>

        `;

}