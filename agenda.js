/* PREDICAR AUTOMOTIVE PERU SAC
   La reserva de citas: horarios, Supabase y confirmacion.
   Orden de carga: config, idiomas, datos, app, agenda. */

/* ============ AGENDA — habla directo con Supabase ============
   Es el mismo mecanismo de tu pagina mi-cita, que ya funciona.
   Si algun dia cambias de proyecto, solo tocas estas dos lineas. */

var SB_URL = "https://lseahxqxcnmwfruoaubt.supabase.co";
var SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZWFoeHF4Y25td2ZydW9hdWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMjMyOTUsImV4cCI6MjA4MDg5OTI5NX0.9OsARsYTPXJkpoS4cjGr2Z3Qp_cf5vzesK-0K-S0XEQ";

var EJS_USER     = "UkGXNPeSB4mTuUiF1";
var EJS_SERVICE  = "service_predicar";
var EJS_TEMPLATE = "template_o86gqs6";

var BUCKET   = "yape-comprobantes";
var HORARIOS = ["09:00", "11:00", "13:00", "16:00"];

var db = window.supabase.createClient(SB_URL, SB_KEY);
try { window.emailjs && emailjs.init(EJS_USER); } catch (e) {}

function today(){
  var d = new Date();
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}

function say(msg, err){
  var el = document.getElementById("bookOk");
  el.textContent = msg;
  el.hidden = false;
  el.classList.toggle("err", !!err);
}


/* ---------- agregar la cita a Google Calendar ----------

   Sin servidor de por medio: se arma el enlace que Google entiende y el
   cliente guarda la cita en su propio calendario de un toque.

   La hora se manda tal cual, con ctz=America/Lima, en vez de convertirla
   a UTC a mano. Asi no hay que acordarse del huso horario.              */

var DURACION_HORAS = 2;   // lo que dura un peritaje a domicilio

var NL = String.fromCharCode(10);

function marcaTiempo(fecha, hora, masHoras){
  var p = hora.split(":");
  var d = new Date(fecha + "T00:00:00");
  d.setHours(parseInt(p[0], 10) + masHoras, parseInt(p[1], 10), 0, 0);
  return String(d.getFullYear()) +
         String(d.getMonth() + 1).padStart(2, "0") +
         String(d.getDate()).padStart(2, "0") + "T" +
         String(d.getHours()).padStart(2, "0") +
         String(d.getMinutes()).padStart(2, "0") + "00";
}

function enlaceCalendario(d){
  var titulo = [
    "Peritaje Predicar · " + d.service_name,
    "Predicar inspection · " + d.service_name,
    "Predicar-Gutachten · " + d.service_name
  ][L];

  var lineas = [
    ["Peritaje vehicular con Predicar Automotive Perú SAC.", "",
     "Servicio: " + d.service_name,
     "A nombre de: " + d.name,
     "WhatsApp: +51 972 598 538", "",
     "El informe llega a " + d.email + " el mismo día."],
    ["Vehicle inspection with Predicar Automotive Perú SAC.", "",
     "Service: " + d.service_name,
     "Booked by: " + d.name,
     "WhatsApp: +51 972 598 538", "",
     "The report reaches " + d.email + " the same day."],
    ["Fahrzeuggutachten mit Predicar Automotive Perú SAC.", "",
     "Leistung: " + d.service_name,
     "Gebucht von: " + d.name,
     "WhatsApp: +51 972 598 538", "",
     "Der Bericht kommt am selben Tag an " + d.email + "."]
  ][L];

  return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text="     + encodeURIComponent(titulo) +
    "&dates="    + marcaTiempo(d.date, d.time, 0) + "/" +
                   marcaTiempo(d.date, d.time, DURACION_HORAS) +
    "&ctz=America/Lima" +
    "&details="  + encodeURIComponent(lineas.join(NL)) +
    "&location=" + encodeURIComponent(d.dir || "Lima, Perú");
}

function mostrarCalendario(d){
  var rotulo = [
    "Agregar a Google Calendar",
    "Add to Google Calendar",
    "Zu Google Calendar hinzufügen"
  ][L];

  var a = document.createElement("a");
  a.className = "btn btn-ghost";
  a.href = enlaceCalendario(d);
  a.target = "_blank";
  a.rel = "noopener";

  // flex y fit-content lo bajan a su propia linea, del ancho justo
  a.style.display = "flex";
  a.style.width = "fit-content";
  a.style.marginTop = "14px";

  var ico = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  ico.setAttribute("width", "16");
  ico.setAttribute("height", "16");
  ico.setAttribute("viewBox", "0 0 20 20");
  ico.setAttribute("fill", "none");
  ico.setAttribute("aria-hidden", "true");
  ico.innerHTML = '<rect x="2.6" y="4" width="14.8" height="13.4" rx="2" ' +
    'stroke="currentColor" stroke-width="1.5"/><path d="M2.6 8h14.8M6.7 2.6v2.8' +
    'M13.3 2.6v2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';

  var txt = document.createElement("span");
  txt.textContent = rotulo;

  a.appendChild(ico);
  a.appendChild(txt);
  document.getElementById("bookOk").appendChild(a);
}

/* ---------- los servicios salen de la tabla, no del HTML ---------- */
async function cargarServicios(){
  var sel = document.getElementById("f-srv");
  try {
    var r = await db.from("services").select("*");
    if (r.error) throw r.error;
    var lista = r.data || [];
    // La tabla no tiene columna de orden, asi que se ordena por id: los
    // ids estan puestos de menor a mayor precio. Sin esto el desplegable
    // arrancaba en el servicio de 690 en vez del mas barato.
    lista.sort(function(a, b){ return (a.orden || a.id) - (b.orden || b.id); });
    sel.innerHTML = lista.map(function(s){
      return '<option value="'+s.id+'">'+esc(s.name)+'</option>';
    }).join("");
  } catch (e) {
    sel.innerHTML = '<option value="">No se pudieron cargar los servicios</option>';
  }
}

/* ---------- horarios libres del dia elegido ---------- */
async function loadAvailability(){
  var box   = document.getElementById("slots");
  var fecha = document.getElementById("f-fecha").value;
  if (!fecha) { box.innerHTML = ""; return; }

  box.innerHTML = '<span class="slots-empty">' + esc(t("f.loading")) + '</span>';

  try {
    var hoy = today();
    if (fecha < hoy) {
      box.innerHTML = '<span class="slots-empty">'+esc(t("f.nofree"))+'</span>';
      return;
    }

    // dia bloqueado entero
    var bd = await db.from("blocked_dates").select("id")
                     .lte("start_date", fecha).gte("end_date", fecha);
    if (bd.data && bd.data.length) {
      box.innerHTML = '<span class="slots-empty">'+esc(t("f.blocked"))+'</span>';
      return;
    }

    var citas = await db.from("appointments").select("time").eq("date", fecha);
    var horas = await db.from("blocked_times").select("time").eq("date", fecha);

    var tomados = []
      .concat((citas.data || []).map(function(a){ return a.time; }))
      .concat((horas.data || []).map(function(b){ return b.time; }));

    var ahora = new Date();
    var libres = HORARIOS.filter(function(h){
      if (tomados.indexOf(h) !== -1) return false;
      if (fecha !== hoy) return true;
      // hoy solo con dos horas de anticipacion, como en tu pagina
      var p = h.split(":");
      var slot = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(),
                          parseInt(p[0],10), parseInt(p[1],10), 0);
      return (slot - ahora) / 3600000 >= 2;
    });

    if (!libres.length) {
      box.innerHTML = '<span class="slots-empty">'+esc(t("f.nofree"))+'</span>';
      return;
    }
    box.innerHTML = libres.map(function(h, i){
      return '<button type="button" class="slot'+(i===0?' on':'')+'">'+h+'</button>';
    }).join("");

  } catch (e) {
    box.innerHTML = '<span class="slots-empty">'+esc(t("f.errload"))+'</span>';
  }
}

/* ---------- reservar ---------- */
async function book(e){
  e.preventDefault();

  var srvEl = document.getElementById("f-srv");
  var btn   = document.querySelector("#bookForm button[type=submit]");
  var file  = document.getElementById("f-voucher").files[0];

  var d = {
    service_id:   srvEl.value,
    service_name: srvEl.selectedOptions[0] ? srvEl.selectedOptions[0].text : "",
    date:  document.getElementById("f-fecha").value,
    time:  (document.querySelector(".slot.on") || {textContent:""}).textContent.trim(),
    name:  document.getElementById("f-nom").value.trim(),
    email: document.getElementById("f-mail").value.trim(),
    phone: document.getElementById("f-tel").value.trim(),
    dir:   document.getElementById("f-dir").value.trim(),
    notas: document.getElementById("f-obs").value.trim(),
    pago:  document.getElementById("f-pago").value
  };

  if (!d.date || !d.time)  return say(t("f.errslot"), true);
  if (!d.name || !d.email) return say(t("f.errdata"), true);
  if (!file)               return say(t("f.errvoucher"), true);
  if (file.size > 4*1024*1024) return say(t("f.errbig"), true);

  btn.disabled = true;
  say(t("f.sending"));

  try {
    // que nadie se haya adelantado mientras llenaba el formulario
    var ya = await db.from("appointments").select("id")
                     .eq("date", d.date).eq("time", d.time);
    if (ya.data && ya.data.length) {
      say(t("f.errtaken"), true);
      await loadAvailability();
      return;
    }

    // comprobante
    var nombre = Date.now() + "_" + file.name.replace(/[^A-Za-z0-9._-]/g, "_");
    var sub = await db.storage.from(BUCKET).upload(nombre, file);
    if (sub.error) throw sub.error;
    var url = db.storage.from(BUCKET).getPublicUrl(nombre).data.publicUrl;

    // la cita
    var fila = {
      service_id:     d.service_id,
      client_name:    d.name,
      client_email:   d.email,
      direccion:      d.dir,
      date:           d.date,
      time:           d.time,
      payment_method: d.pago,
      status:         "pending",
      created_at:     new Date().toISOString()
    };

    // Si tu tabla todavia no tiene estas dos columnas, se reintenta sin ellas.
    var conExtras = Object.assign({}, fila, {
      client_phone: d.phone,
      notes:        d.notas
    });

    var r = await db.from("appointments").insert(conExtras).select("id").single();
    if (r.error) {
      r = await db.from("appointments").insert(fila).select("id").single();
      if (r.error) throw r.error;
    }

    // comprobante enlazado a la cita
    try {
      await db.from("yape_payments").insert({
        cita_id: r.data.id,
        imagen_url: url,
        created_at: new Date().toISOString()
      });
    } catch (err) {}

    // correo de confirmacion
    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        nombre:    d.name,
        email:     d.email,
        servicio:  d.service_name,
        fecha:     d.date,
        hora:      d.time,
        direccion: d.dir,
        pago:      d.pago
      });
    } catch (err) {}

    say(t("f.ok").replace("{s}", d.service_name).replace("{f}", d.date)
                 .replace("{h}", d.time).replace("{m}", d.email));

    mostrarCalendario(d);

    var fecha = d.date;
    document.getElementById("bookForm").reset();
    document.getElementById("f-fecha").value = fecha;
    await loadAvailability();

  } catch (err) {
    say(t("f.errsave"), true);
  } finally {
    btn.disabled = false;
  }
}

(function initAgenda(){
  var f = document.getElementById("f-fecha");
  var hoy = today();
  f.min = hoy;
  if (!f.value || f.value < hoy) f.value = hoy;
  f.addEventListener("change", loadAvailability);

  // Tocar el campo abre el calendario. En movil se agradece: el area del
  // iconito es diminuta. showPicker no existe en Safari, de ahi el try.
  f.addEventListener("click", function(){
    try { if (this.showPicker) this.showPicker(); } catch (e) {}
  });

  document.getElementById("bookForm").addEventListener("submit", book);
  cargarServicios();
  loadAvailability();
})();

var links = Array.prototype.slice.call(document.querySelectorAll("#navLinks a"));
var obs = new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    if (!en.isIntersecting) return;
    links.forEach(function(l){ l.classList.toggle("on", l.getAttribute("href") === "#" + en.target.id); });
  });
}, {rootMargin:"-45% 0px -50% 0px"});
["casos","informe","peritaje","respaldo","servicios","proceso","agendar"].forEach(function(id){
  var el = document.getElementById(id); if (el) obs.observe(el);
});
