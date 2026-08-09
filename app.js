const APP = {

    screen: "dashboard",

    step: 0,

    historial:[],
    numeroInspeccion:"",
    data: {
        cliente:{},
        datos:{},
        carroceria:{},
        obd1:{},
        motor:{},
        prueba:{},
        obd2:{},
        legal:{},
        conclusion:{},
        resumen:{}

    },

    menu: [

        { id: "dashboard", title: "🏠 Dashboard" },

        { id: "inspection", title: "🚗 Nueva inspección" },

        { id: "history", title: "📄 Historial" }

    ],

    steps:[

    

    "Datos del Vehículo",

    "Carrocería",

    "OBD-I",

    "Motor",

    "Prueba de Manejo",

    "OBD-II",

    "Analisis Legal",

    "Conclusion",
    "Datos del Cliente",

    "Resumen"

    ],

};

const FORM = {

    datos: [

        { id:"placa", label:"Placa", type:"text" },

        { id:"marca", label:"Marca", type:"text" },

        { id:"modelo", label:"Modelo", type:"text" },

        { id:"anio", label:"Año", type:"number" },

        { id:"vin", label:"VIN", type:"text" },

        { id:"km", label:"Kilometraje", type:"number" },

        {

            id:"combustible",

            label:"Combustible",

            type:"select",

            options:[

                "Gasolina",

                "Diésel",

                "GLP",

                "GNV",

                "Híbrido",

                "Eléctrico"

            ]

        },

        {

            id:"transmision",

            label:"Transmisión",

            type:"select",

            options:[

                "Mecánica",

                "Automática",

                "CVT"

            ]

        },

        { id:"color", label:"Color", type:"text" },

        {

            id:"obs",

            label:"Observaciones",

            type:"textarea",

            full:true

        }

    ]

};



window.onload = () => {

    render();

};

function render() {

    document.getElementById("app").innerHTML = `
    
    

<div class="layout">

    <aside>

        <div class="logo">

            <h2>PREDICAR</h2>

            <small>Automotive Perú SAC</small>

        </div>

        <nav>

            ${APP.menu.map(item => `

                <button

                    class="${APP.screen===item.id?'active':''}"

                    onclick="go('${item.id}')">

                    ${item.title}

                </button>

            `).join("")}

        </nav>

    </aside>

    <main>

        <header>

            <div>

                <h1>${title()}</h1>

                <small>Sistema de inspección vehicular</small>

            </div>

            <button class="primary">

                💾 Guardar

            </button>

        </header>

        ${progress()}

        <section id="content">

            ${page()}

        </section>

    </main>

</div>

`;
activarPreview();



if(APP.step===0){
    cargarFormulario("datos");
    activarGuardadoAutomatico("datos");
}

if(APP.step===1){
    cargarFormulario("carroceria");
    activarGuardadoAutomatico("carroceria");
}

if(APP.step===2){
    cargarFormulario("obd1");
    activarGuardadoAutomatico("obd1");
}

if(APP.step===3){
    cargarFormulario("motor");
    activarGuardadoAutomatico("motor");
}

if(APP.step===4){
    cargarFormulario("prueba");
    activarGuardadoAutomatico("prueba");
}

if(APP.step===5){
    cargarFormulario("obd2");
    activarGuardadoAutomatico("obd2");
}
if(APP.step===6){
    cargarFormulario("legal");
    activarGuardadoAutomatico("legal");
}

if(APP.step===7){
    cargarFormulario("conclusion");
    activarGuardadoAutomatico("conclusion");
}

if(APP.step===8){
    cargarFormulario("cliente");
    activarGuardadoAutomatico("cliente");
}

if(APP.step===9){
    cargarFormulario("resumen");
    activarGuardadoAutomatico("resumen");
}
}

function title(){

    if(APP.screen==="dashboard") return "Dashboard";

    if(APP.screen==="history") return "Historial";

    return "Nueva inspección";

}

async function go(screen){

    // Historial protegido
    if(screen === "history"){

        const {
            data: { session }
        } = await db.auth.getSession();

        if(!session){

            mostrarLoginAdmin();

            return;

        }

    }

    APP.screen = screen;

    if(screen === "history"){

        try{

            APP.historial = await obtenerInspecciones();

        }catch(error){

            console.error(error);

            alert("No se pudo cargar el historial.");

            return;

        }

    }

    render();

}

async function cargarHistorial(){

    APP.historial = await obtenerInspecciones();

    render();

}

function progress(){

    if(APP.screen!=="inspection") return "";

    return `

<div class="steps">

${APP.steps.map((s,i)=>`

<div class="step ${APP.step===i?'active':''}">

${i+1}

<br>

${s}

</div>

`).join("")}

</div>

`;

}

function page(){

    switch(APP.screen){

        case "dashboard":

            return dashboard();

        case "history":

            return history();

        default:

            return inspection();

    }

}

function dashboard(){

    return `

<div class="cards">

<div class="card">

<h3>Inspecciones</h3>

<h1>0</h1>

</div>

<div class="card">

<h3>Hoy</h3>

<h1>0</h1>

</div>

<div class="card">

<h3>Pendientes</h3>

<h1>0</h1>

</div>

</div>

<div class="card">

<h2>

Bienvenido a Predicar Automotive

</h2>

<br>

<p>

Desde aquí podrás registrar inspecciones,

consultar el historial y generar reportes.

</p>

<br>

<button

class="primary"

onclick="go('inspection')">

Nueva inspección

</button>

</div>

`;

}

function history(){

    return `

<div class="card">

<h2>Historial</h2>

<br>

<button
            onclick="cerrarSesionAdmin()"
            style="margin-bottom:20px;">
            🔒 Cerrar sesión
        </button>


<input

placeholder="Buscar por placa...">

<br><br>

<table>

<thead>

<tr>

<th>Placa</th>

<th>Marca</th>

<th>Modelo</th>

<th>Fecha</th>

<th></th>

</tr>

</thead>

<tbody>

${
APP.historial.length===0

?

`
<tr>
<td colspan="5">
No hay inspecciones.
</td>
</tr>
`

:

APP.historial.map(i=>`

<tr>

<td>${i.placa}</td>

<td>${i.marca}</td>

<td>${i.modelo}</td>

<td>${new Date(i.fecha).toLocaleDateString()}</td>

<td>

<button
onclick="abrirInspeccion('${i.id}')">

👁

</button>

</td>

</tr>

`).join("")

}

</tbody>

</table>

</div>

`;

}

async function abrirInspeccion(id){

    try{

        const inspeccion = await obtenerInspeccion(id);

        localStorage.setItem(
            "predicarReporte",
            JSON.stringify(inspeccion.datos)
        );

        window.open("reporte.html","_blank");

    }catch(error){

        console.error(error);

        alert("No se pudo abrir la inspección.");

    }

}

const PASOS=[


pasoDatos,

pasoCarroceria,

pasoObd1,

pasoMotor,

pasoPrueba,

pasoObd2,

pasoLegal,

pasoConclusion,
pasoCliente,

pasoResumen

];

function inspection(){

return PASOS[APP.step]();

}


function pasoCliente(){

return `

<div class="card">

<h2>

Datos del Cliente

</h2>

<br>

<div class="form-grid">

<div>

<label>

Nombre del Cliente

</label>

<input

id="nombre_cliente"

value="${APP.data.cliente.nombre_cliente || ""}"

oninput="guardarCampo('cliente','nombre_cliente',this.value)">

</div>

<div>

<label>

Teléfono

</label>

<input

id="telefono_cliente"

value="${APP.data.cliente.telefono_cliente || ""}"

oninput="guardarCampo('cliente','telefono_cliente',this.value)">

</div>

<div class="full">

<label>

Boleta / Factura

</label>

<input

type="file"

accept="image/*"

id="fotoCliente">

<div

id="previewCliente"

class="preview">

</div>

</div>

</div>

<br>

<div style="display:flex;justify-content:space-between">

<button

class="primary"

onclick="nextStep()">

Siguiente →

</button>

</div>

</div>

`;

}

function pasoDatos(){

return `

<div class="card">

<h2>

Datos del vehículo

</h2>

<br>

<div class="form-grid">

${drawFields(FORM.datos)}

</div>

<br>

<div style="display:flex;justify-content:space-between">

<button

class="secondary"

onclick="prevStep()">

← Anterior

</button>

<button

class="primary"

onclick="nextStep()">

Siguiente →

</button>

</div>

</div>

`;

}

function pasoCarroceria(){

return `

<div class="card">

<h2>

Paso 2 - Carrocería

</h2>

<br>

<div class="form-grid">

<div>

<label>Estado de carrocería</label>

<select id="estado_carroceria">

<option>Excelente</option>

<option>Buena</option>

<option>Regular</option>

<option>Mala</option>

</select>

</div>

<div>

<label>Estado de pintura</label>

<select id="estado_pintura">

<option>Excelente</option>

<option>Buena</option>

<option>Regular</option>

<option>Mala</option>

</select>

</div>

<div>

<label>Llantas</label>

<select id="llantas">

<option>Excelentes</option>

<option>Buenas</option>

<option>Regulares</option>

<option>Malas</option>

</select>

</div>

<div>

<label>Frenos</label>

<select id="frenos">

<option>Excelentes</option>

<option>Buenos</option>

<option>Regulares</option>

<option>Malos</option>

</select>

</div>

<div>

<label>Suspensión</label>

<select id="suspension">

<option>Excelente</option>

<option>Buena</option>

<option>Regular</option>

<option>Mala</option>

</select>

</div>

<div>

<label>Choques estructurales</label>

<select id="choques">

<option>No</option>

<option>Sí</option>

</select>

</div>

<div class="full">

<label>

Fotografías

</label>

<input

type="file"

multiple

accept="image/*"

id="fotoCarroceria">

<div

id="previewCarroceria"

class="preview">

</div>

</div>

<div class="full">

<label>

Hallazgos

</label>

<textarea id="hallazgos_carroceria"></textarea>

</div>

</div>

<br>

<div style="display:flex;justify-content:space-between">

<button

class="secondary"

onclick="prevStep()">

← Anterior

</button>

<button

class="primary"

onclick="nextStep()">

Siguiente →

</button>

</div>

</div>

`;

}

function pasoObd1(){

return `

<div class="card">

<h2>

Paso 3 - Escáner OBD-I

</h2>

<br>

<div class="form-grid">

<div class="full">

<label>Códigos encontrados</label>

<textarea id="codigos_obd1" placeholder="Ej: P0301, P0171..."></textarea>

</div>

<div class="full">

<label>Descripción del escaneo</label>

<textarea id="descripcion_obd1" placeholder="Describe el resultado del escaneo"></textarea>

</div>

<div class="full">

<label>Fotografías del escáner</label>

<input

type="file"

id="fotoObd1"

multiple

accept="image/*">

<div

id="previewObd1"

class="preview">

</div>

</div>

</div>

<br>

<div style="display:flex;justify-content:space-between">

<button

class="secondary"

onclick="prevStep()">

← Anterior

</button>

<button

class="primary"

onclick="nextStep()">

Siguiente →

</button>

</div>

</div>

`;

}

function pasoMotor(){

return `

<div class="card">

<h2>

Paso 4 - Revisión del Motor

</h2>

<br>

<div class="form-grid">

<div>

<label>Aceite del motor</label>

<select id="aceite_motor">

<option>Bueno</option>

<option>Regular</option>

<option>Malo</option>

</select>

</div>

<div>

<label>Refrigerante</label>

<select id="refrigerante">

<option>Correcto</option>

<option>Bajo</option>

<option>Muy bajo</option>

</select>

</div>

<div>

<label>Batería</label>

<select id="bateria">

<option>Buena</option>

<option>Regular</option>

<option>Mala</option>

</select>

</div>

<div>

<label>Correas</label>

<select id="correas">

<option>Buenas</option>

<option>Regulares</option>

<option>Malas</option>

</select>

</div>

<div>

<label>Fugas de aceite</label>

<select id="fuga_aceite">

<option>No</option>

<option>Sí</option>

</select>

</div>

<div>

<label>Fugas de refrigerante</label>

<select id="fuga_refrigerante">

<option>No</option>

<option>Sí</option>

</select>

</div>

<div class="full">

<label>Observaciones del motor</label>

<textarea id="observaciones_motor"></textarea>

</div>

<div class="full">

<label>Fotografías del motor</label>

<input

type="file"

id="fotoMotor"

multiple

accept="image/*">

<div

id="previewMotor"

class="preview">

</div>

</div>

</div>

<br>

<div style="display:flex;justify-content:space-between">

<button

class="secondary"

onclick="prevStep()">

← Anterior

</button>

<button

class="primary"

onclick="nextStep()">

Siguiente →

</button>

</div>

</div>

`;

}

function pasoPrueba(){

return `

<div class="card">

<h2>

Paso 5 - Prueba de manejo

</h2>

<br>

<div class="form-grid">

<div>

<label>Arranque del motor</label>

<select id="arranque">

<option>Normal</option>

<option>Lento</option>

<option>No enciende</option>

</select>

</div>

<div>

<label>Dirección</label>

<select id="direccion">

<option>Correcta</option>

<option>Con juego</option>

<option>Ruidosa</option>

</select>

</div>

<div>

<label>Frenado</label>

<select id="frenado">

<option>Bueno</option>

<option>Regular</option>

<option>Malo</option>

</select>

</div>

<div>

<label>Suspensión en marcha</label>

<select id="suspension_marcha">

<option>Buena</option>

<option>Regular</option>

<option>Mala</option>

</select>

</div>

<div>

<label>Embrague / Transmisión</label>

<select id="transmision_prueba">

<option>Normal</option>

<option>Regular</option>

<option>Mala</option>

</select>

</div>

<div>

<label>Ruido del motor</label>

<select id="ruido_motor">

<option>Normal</option>

<option>Leve</option>

<option>Alto</option>

</select>

</div>

<div class="full">

<label>Observaciones de la prueba</label>

<textarea id="observaciones_prueba"></textarea>

</div>

<div class="full">

<label>Fotografías</label>

<input
type="file"
id="fotoPrueba"
multiple
accept="image/*">

<div
id="previewPrueba"
class="preview">

</div>

</div>

</div>

<br>

<div style="display:flex;justify-content:space-between">

<button
class="secondary"
onclick="prevStep()">

← Anterior

</button>

<button
class="primary"
onclick="nextStep()">

Siguiente →

</button>

</div>

</div>

`;

}

function pasoObd2(){

return `

<div class="card">

<h2>

Paso 6 - Escáner OBD-II

</h2>

<br>

<div class="form-grid">

<div class="full">

<label>Códigos encontrados</label>

<textarea id="codigos_obd2" placeholder="Ej: P0420, P0300..."></textarea>

</div>

<div class="full">

<label>Descripción del diagnóstico</label>

<textarea id="descripcion_obd2"></textarea>

</div>

<div>

<label>Check Engine</label>

<select id="check_engine">

<option>Apagado</option>

<option>Encendido</option>

</select>

</div>

<div>

<label>Cantidad de códigos</label>

<input
type="number"
id="cantidad_codigos">

</div>

<div class="full">

<label>Fotografías del escáner</label>

<input
type="file"
id="fotoObd2"
multiple
accept="image/*">

<div
id="previewObd2"
class="preview">

</div>

</div>

</div>

<br>

<div style="display:flex;justify-content:space-between">

<button
class="secondary"
onclick="prevStep()">

← Anterior

</button>

<button
class="primary"
onclick="nextStep()">

Siguiente →

</button>

</div>

</div>

`;

}

function pasoLegal(){

return `

<div class="card">

<h2>

Paso 8 - Análisis Legal

</h2>

<br>

<div class="form-grid">

<div>

<label>Cantidad de propietarios</label>

<input
id="cantidad_duenos"
type="number">

</div>

<div>

<label>SOAT</label>

<select id="soat">

<option>Vigente</option>

<option>Vencido</option>

</select>

</div>

<div>

<label>Revisión Técnica</label>

<select id="revision_tecnica">

<option>Vigente</option>

<option>Vencida</option>

</select>

</div>

<div>

<label>Orden de captura SAT</label>

<select id="orden_captura">

<option>No</option>

<option>Sí</option>

</select>

</div>

<div>

<label>Papeletas SAT</label>

<select id="papeletas_sat">

<option>No</option>

<option>Sí</option>

</select>

</div>

<div>

<label>Papeletas Callao</label>

<select id="papeletas_callao">

<option>No</option>

<option>Sí</option>

</select>

</div>

<div>

<label>Papeletas SUTRAN</label>

<select id="papeletas_sutran">

<option>No</option>

<option>Sí</option>

</select>

</div>

<div>

<label>Papeletas ATU</label>

<select id="papeletas_atu">

<option>No</option>

<option>Sí</option>

</select>

</div>

<div>

<label>Impuesto SAT</label>

<select id="impuesto_sat">

<option>Al día</option>

<option>Pendiente</option>

</select>

</div>

<div class="full">

<label>Fotografías</label>

<input
type="file"
multiple
accept="image/*"
id="fotoLegal">

<div
id="previewLegal"
class="preview">

</div>

</div>

<div class="full">

<label>Observaciones</label>

<textarea
id="observaciones_legal">

</textarea>

</div>

</div>

<br>

<div style="display:flex;justify-content:space-between">

<button
class="secondary"
onclick="prevStep()">

← Anterior

</button>

<button
class="primary"
onclick="nextStep()">

Siguiente →

</button>

</div>

</div>

`;

}

function pasoConclusion(){

return `

<div class="card">

<h2>

Conclusión

</h2>

<br>

<div class="form-grid">

<div class="full">

<label>

Recomendación

</label>

<select id="recomendacion">

<option>Compra recomendada</option>

<option>Compra recomendada con observaciones</option>

<option>No recomendable</option>

</select>

</div>

<div class="full">

<label>

Conclusión del inspector

</label>

<textarea
id="conclusion_general">

</textarea>

</div>

<div>

<label>

Inspector

</label>

<input
id="inspector">

</div>

</div>

<br>

<div style="display:flex;justify-content:space-between">

<button
class="secondary"
onclick="prevStep()">

← Anterior

</button>

<button
class="primary"
onclick="nextStep()">

Siguiente →

</button>

</div>

</div>

`;

}




function pasoResumen(){

return `

<div class="card">

<h2>

Resumen de la inspección

</h2>

<br>

<h3>Datos del Cliente</h3>

<p><b>Nombre:</b> ${APP.data.cliente.nombre_cliente || ""}</p>

<p><b>Teléfono:</b> ${APP.data.cliente.telefono_cliente || ""}</p>

${
APP.data.cliente.fotos?.length
?

`

<h4>

Boleta / Factura

</h4>

<img

src="${APP.data.cliente.fotos[0].url}"

style="max-width:300px;border:1px solid #ccc;border-radius:8px;">

`

:

""

}

<hr>


<h3>Datos del vehículo</h3>

<p><b>Placa:</b> ${APP.data.datos.placa||""}</p>

<p><b>Marca:</b> ${APP.data.datos.marca||""}</p>

<p><b>Modelo:</b> ${APP.data.datos.modelo||""}</p>

<p><b>Año:</b> ${APP.data.datos.anio||""}</p>

<p><b>VIN:</b> ${APP.data.datos.vin||""}</p>

<p><b>Kilometraje:</b> ${APP.data.datos.km||""}</p>

<hr>

<h3>Carrocería</h3>

<p><b>Estado:</b> ${APP.data.carroceria.estado_carroceria||""}</p>

<p><b>Pintura:</b> ${APP.data.carroceria.estado_pintura||""}</p>

<p><b>Llantas:</b> ${APP.data.carroceria.llantas||""}</p>

<p><b>Frenos:</b> ${APP.data.carroceria.frenos||""}</p>

<p><b>Suspensión:</b> ${APP.data.carroceria.suspension||""}</p>

<p><b>Choques:</b> ${APP.data.carroceria.choques||""}</p>

<hr>

<h3>OBD-I</h3>

<p><b>Códigos:</b></p>

<p>${APP.data.obd1.codigos_obd1||""}</p>

<p><b>Descripción:</b></p>

<p>${APP.data.obd1.descripcion_obd1||""}</p>

<hr>

<h3>Motor</h3>

<p><b>Aceite:</b> ${APP.data.motor.aceite_motor||""}</p>

<p><b>Refrigerante:</b> ${APP.data.motor.refrigerante||""}</p>

<p><b>Batería:</b> ${APP.data.motor.bateria||""}</p>

<p><b>Correas:</b> ${APP.data.motor.correas||""}</p>

<hr>

<h3>Prueba de manejo</h3>

<p><b>Arranque:</b> ${APP.data.prueba.arranque||""}</p>

<p><b>Dirección:</b> ${APP.data.prueba.direccion||""}</p>

<p><b>Frenado:</b> ${APP.data.prueba.frenado||""}</p>

<hr>

<h3>OBD-II</h3>

<p><b>Check Engine:</b> ${APP.data.obd2.check_engine||""}</p>

<p><b>Códigos:</b></p>

<p>${APP.data.obd2.codigos_obd2||""}</p>

<hr><br>

<div style="display:flex;justify-content:space-between">

<button
class="secondary"
onclick="prevStep()">

← Anterior

</button>

<button
class="primary"
onclick="guardarInspeccion()">

💾 Guardar inspección

</button>

</div>

</div>

`;

}

function pasoConstruccion(){

return `

<div class="card">

<h2>

${APP.steps[APP.step]}

</h2>

<br>

<h3>

En construcción...

</h3>

<br>

<div style="display:flex;justify-content:space-between">

<button

class="secondary"

onclick="prevStep()">

← Anterior

</button>

<button

class="primary"

onclick="nextStep()">

Siguiente →

</button>

</div>

</div>

`;

}

function drawFields(lista){

return lista.map(c=>{

let control="";

if(c.type==="text")

control=`<input id="${c.id}">`;

if(c.type==="number")

control=`<input type="number" id="${c.id}">`;

if(c.type==="textarea")

control=`<textarea id="${c.id}"></textarea>`;

if(c.type==="select")

control=`

<select id="${c.id}">

${c.options.map(o=>`

<option>${o}</option>

`).join("")}

</select>

`;

return `

<div

class="${c.full?'full':''}">

<label>${c.label}</label>

${control}

</div>

`;

}).join("");

}


function nextStep(){

    

    if(APP.step===0) guardarFormulario("datos");

    if(APP.step===1) guardarFormulario("carroceria");

    if(APP.step===2) guardarFormulario("obd1");

    if(APP.step===3) guardarFormulario("motor");

    if(APP.step===4) guardarFormulario("prueba");

    if(APP.step===5) guardarFormulario("obd2");

    if(APP.step===6) guardarFormulario("legal");

    if(APP.step===7) guardarFormulario("conclusion");

    if(APP.step===8) guardarFormulario("cliente");

    if(APP.step===9) guardarFormulario("resumen");

    if(APP.step < PASOS.length-1){

        APP.step++;

        render();

    }

}

function prevStep(){

    if(APP.step>0){

        APP.step--;

        render();

    }

}

function activarPreview(){

    activarInputPreview(
        "fotoCarroceria",
        "previewCarroceria"
    );

    activarInputPreview(
        "fotoObd1",
        "previewObd1"
    );

    activarInputPreview(
        "fotoMotor",
        "previewMotor"
    );
    activarInputPreview(
    "fotoPrueba",
    "previewPrueba"
    );
    activarInputPreview(
    "fotoObd2",
    "previewObd2"
    );
    activarInputPreview(
    "fotoLegal",
    "previewLegal"
    );

    activarInputPreview(
        "fotoCliente",
        "previewCliente"
    );

}

function activarInputPreview(inputId, previewId){

    const input=document.getElementById(inputId);
    const cont=document.getElementById(previewId);

    if(!input || !cont) return;

    const mapa={
        fotoCarroceria:"carroceria",
        fotoObd1:"obd1",
        fotoMotor:"motor",
        fotoPrueba:"prueba",
        fotoObd2:"obd2",
        fotoCliente:"cliente",
        fotoLegal:"legal"
    };

    const seccion=mapa[inputId];

    if(!APP.data[seccion].fotos)
        APP.data[seccion].fotos=[];

    cont.innerHTML="";

console.log(
    "Renderizando:",
    seccion,
    APP.data[seccion]
);

console.log(
    "Renderizando:",
    seccion,
    APP.data[seccion]
);

console.log(
    "Cantidad fotos:",
    APP.data[seccion].fotos.length
);


APP.data[seccion].fotos.forEach(foto=>{

    const img=document.createElement("img");

    img.src=foto.url;

    cont.appendChild(img);

});

    input.onchange = async () => {

    APP.data[seccion].fotos = [];

    cont.innerHTML = "";

    // Si aún no existe un número de inspección, lo generamos
    if(!APP.numeroInspeccion){

        APP.numeroInspeccion =
            obtenerNumeroInspeccion(APP.data.datos.placa);

    }

    for(const file of input.files){

        try{

            const url = await subirFoto(

                file,

                APP.numeroInspeccion,

                seccion

            );

            APP.data[seccion].fotos.push({

                url: url,

                nombre: file.name

            });

            const img = document.createElement("img");

            img.src = url;

            cont.appendChild(img);

        }catch(error){

            console.error(error);

            alert("No se pudo subir la foto.");

        }

    }

};

}

function guardarFormulario(seccion){

    const cont=document.querySelector(".form-grid");

    if(!cont) return;

    cont.querySelectorAll("input,select,textarea").forEach(c=>{

        if(c.type==="file") return;

        APP.data[seccion][c.id]=c.value;

    });

}

function cargarFormulario(seccion){

    const cont=document.querySelector(".form-grid");

    if(!cont) return;

    cont.querySelectorAll("input,select,textarea").forEach(c=>{

        if(c.type==="file") return;

        if(APP.data[seccion][c.id]!==undefined)

            c.value=APP.data[seccion][c.id];

    });

}

function activarGuardadoAutomatico(seccion){

    const cont=document.querySelector(".form-grid");

    if(!cont) return;

    cont.querySelectorAll("input,select,textarea").forEach(c=>{

        if(c.type==="file") return;

        c.oninput=()=>{

            APP.data[seccion][c.id]=c.value;

        };

        c.onchange=()=>{

            APP.data[seccion][c.id]=c.value;

        };

    });

}

async function guardarInspeccion(){

    try{

        const numero =
        APP.numeroInspeccion ||
        obtenerNumeroInspeccion(APP.data.datos.placa);

        APP.numeroInspeccion = numero;
        APP.data.numero_inspeccion = numero;
        APP.data.fecha_inspeccion = new Date().toLocaleDateString("es-PE");

        const inspeccion = {

            numero_inspeccion: numero,

            placa: APP.data.datos.placa,

            cliente: APP.data.cliente.nombre_cliente,

            telefono: APP.data.cliente.telefono_cliente,

            marca: APP.data.datos.marca,

            modelo: APP.data.datos.modelo,

            anio: APP.data.datos.anio,

            estado: "Finalizada",

            datos: APP.data

        };

        const respuesta = await guardarInspeccionSupabase(inspeccion);

        console.log("Inspección guardada:", respuesta);

        localStorage.setItem(
            "predicarReporte",
            JSON.stringify(APP.data)
        );

        window.open("reporte.html","_blank");

        reiniciarFormulario();

    }catch(error){

        console.error(error);

        alert("Error al guardar la inspección.\nRevisa la consola (F12).");

    }

}
async function generarPDF(){

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p","mm","a4");

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(22);

    pdf.text("PREDICAR AUTOMOTIVE PERÚ SAC",105,20,{align:"center"});

    pdf.setFontSize(16);

    pdf.text("INFORME DE INSPECCIÓN VEHICULAR",105,30,{align:"center"});

    pdf.setDrawColor(220);

    pdf.line(15,36,195,36);

    pdf.setFontSize(12);

    let y=50;

    pdf.text("DATOS DEL VEHÍCULO",15,y);

    y+=10;

    pdf.setFont("helvetica","normal");

    pdf.text("Placa: "+(APP.data.datos.placa||""),15,y);

    y+=8;

    pdf.text("Marca: "+(APP.data.datos.marca||""),15,y);

    y+=8;

    pdf.text("Modelo: "+(APP.data.datos.modelo||""),15,y);

    y+=8;

    pdf.text("Año: "+(APP.data.datos.anio||""),15,y);

    y+=8;

    pdf.text("VIN: "+(APP.data.datos.vin||""),15,y);

    y+=8;

    pdf.text("Kilometraje: "+(APP.data.datos.km||""),15,y);

    pdf.save("Inspeccion.pdf");

}


function reiniciarFormulario(){

    APP.step = 0;

    APP.numeroInspeccion = "";

    APP.data = {

        cliente:{},

        datos:{},

        carroceria:{},

        obd1:{},

        motor:{},

        prueba:{},

        obd2:{},

        legal:{},

        conclusion:{},

        resumen:{}

    };

    APP.screen = "dashboard";

    render();

}

function mostrarLoginAdmin(){

    const modal = document.createElement("div");

    modal.id = "loginAdminModal";

    modal.innerHTML = `

        <div class="login-overlay">

            <div class="login-box">

                <h2>Acceso Administrador</h2>

                <p>
                    Ingrese sus credenciales para acceder al historial.
                </p>

                <input
                    id="adminEmail"
                    type="email"
                    placeholder="Usuario / correo"
                    autocomplete="username"
                >

                <input
                    id="adminPassword"
                    type="password"
                    placeholder="Contraseña"
                    autocomplete="current-password"
                >

                <div class="login-buttons">

                    <button
                        onclick="cerrarLoginAdmin()">
                        Cancelar
                    </button>

                    <button
                        class="primary"
                        onclick="loginAdmin()">
                        Ingresar
                    </button>

                </div>

                <p
                    id="loginError"
                    class="login-error">
                </p>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

}

async function loginAdmin(){

    const email =
        document.getElementById("adminEmail").value.trim();

    const password =
        document.getElementById("adminPassword").value;

    const errorBox =
        document.getElementById("loginError");

    errorBox.textContent = "";

    if(!email || !password){

        errorBox.textContent =
            "Ingrese usuario y contraseña.";

        return;

    }

    const { data, error } =
        await db.auth.signInWithPassword({

            email: email,

            password: password

        });

    if(error){

        console.error(error);

        errorBox.textContent =
            "Usuario o contraseña incorrectos.";

        return;

    }

    cerrarLoginAdmin();

    APP.screen = "history";

    try{

        APP.historial =
            await obtenerInspecciones();

        render();

    }catch(error){

        console.error(error);

        alert("No se pudo cargar el historial.");

    }

}

function cerrarLoginAdmin(){

    const modal =
        document.getElementById("loginAdminModal");

    if(modal){

        modal.remove();

    }

}

async function cerrarSesionAdmin(){

    const { error } =
        await db.auth.signOut();

    if(error){

        console.error(error);

        alert("No se pudo cerrar la sesión.");

        return;

    }

    APP.historial = [];

    APP.screen = "dashboard";

    render();

}