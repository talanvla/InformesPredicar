/* PREDICAR AUTOMOTIVE PERU SAC
   Dibuja la pagina y atiende los clics.
   Orden de carga: config, idiomas, datos, app, agenda. */

function playVisibleReels(){
  var vids = [].slice.call(document.querySelectorAll(".reel video"));
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still){ vids.forEach(function(v){ try{ v.currentTime = 0.1; }catch(e){} }); return; }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      var v = e.target;
      if (e.isIntersecting){ v.play().catch(function(){}); } else { v.pause(); }
    });
  }, {threshold:0.25});
  vids.forEach(function(v){ io.observe(v); });
}

function render(){
  document.documentElement.lang = LANGS[L];

  document.documentElement.lang = LANGS[L];
  document.querySelectorAll("[data-i18n]").forEach(function(el){
    var v = t(el.getAttribute("data-i18n"));
    // los textos son nuestros, no del usuario: permitimos <b> para resaltar
    if (v.indexOf("<") >= 0) el.innerHTML = v; else el.textContent = v;
  });

  document.getElementById("reelsGrid").innerHTML = REELS.filter(function(r){
    // sin camino elegido se muestran todos; con camino, solo los suyos
    return !VIA || r.via === VIA;
  }).map(function(r){
    return '<a class="reel" href="'+r.u+'" target="_blank" rel="noopener">'+
      '<video src="'+r.v+'" autoplay muted loop playsinline preload="auto" aria-label="'+esc(r.t[L])+'"></video>'+
      '<span class="pl"><svg width="11" height="13" viewBox="0 0 16 18" fill="#fff" aria-hidden="true"><path d="M15 9L1 17.7V.3L15 9z"/></svg></span>'+
      '<span class="ov"><span class="kk">'+esc(r.k[L])+'</span><span class="tt">'+esc(r.t[L])+'</span></span></a>';
  }).join("");
  playVisibleReels();

  document.getElementById("casosGrid").innerHTML =
    '<table class="ctbl"><thead><tr>'+
      '<th>'+esc(t("tb.modelo"))+'</th><th class="r">'+esc(t("tb.km"))+'</th>'+
      '<th class="r">'+esc(t("tb.pi"))+'</th><th>'+esc(t("tb.dec"))+'</th>'+
      '<th class="r">'+esc(t("tb.pf"))+'</th><th>'+esc(t("tb.obs"))+'</th><th>'+esc(t("tb.rec"))+'</th>'+
    '</tr></thead><tbody>' +
    CASOS.map(function(c){
      var dec = t("dec." + c.k);
      var pf  = c.pc ? '<b>USD '+c.pc+'</b>'
                     : (c.k === "buy" ? '<b>USD '+c.pv+'</b>'
                                      : '<span class="none">'+esc(t("casos.norej"))+'</span>');
      return '<tr>'+
        '<td class="mod"><b>'+esc(c.m)+'</b><span>'+esc(c.t[L])+'</span></td>'+
        '<td class="r num">'+esc(c.km)+(c.kmw?'<span class="kmflag">'+esc(t("tb.kmw"))+'</span>':'')+'</td>'+
        '<td class="r num">USD '+c.pv+'</td>'+
        '<td><span class="dec '+c.k+'">'+esc(dec)+'</span></td>'+
        '<td class="r num pf">'+pf+'</td>'+
        '<td class="rec obs">'+esc(c.obs[L])+'</td>'+'<td class="rec">'+esc(c.rec[L])+'</td></tr>';
    }).join("") + '</tbody></table>';

  document.getElementById("casosSum").innerHTML =
    '<div><b>USD 500 – 6 400</b><span>'+esc(t("sum.4"))+'</span></div>'+
    '<div><b>+300</b><span>'+esc(t("sum.5"))+'</span></div>';

  var h = '<div class="cmp-head"><div>'+esc(t("cmp.what"))+'</div><div class="us">'+esc(t("cmp.col1"))+'<br>'+esc(t("cmp.col1s"))+
          '</div><div>'+esc(t("cmp.col2"))+'<br>'+esc(t("cmp.col2s"))+'</div></div>';
  CMP.forEach(function(g){
    h += '<div class="cmp-grp">'+esc(t(g.g))+'</div>';
    g.items.forEach(function(it){
      h += '<div class="cmp-row'+(it[3]?' top':'')+(typeof it[1]==='object'?' larga':'')+'">' +
           '<div>'+(it[3]?STAR:'')+esc(it[0][L])+'</div>' +
           '<div class="us">'+celda(it[1])+'</div>' +
           '<div>'+celda(it[2])+'</div></div>';
    });
  });
  document.getElementById("cmpTable").innerHTML = h;

  document.getElementById("pagesGrid").innerHTML = PAGES.map(function(b,i){
    return '<button class="pg" data-i="'+i+'"><img src="'+b+'" alt="Página '+(i+1)+' del informe" loading="lazy"><span class="n">'+(i+1)+' / '+PAGES.length+'</span></button>';
  }).join("");

  document.getElementById("credGrid").innerHTML = CRED.map(function(c){
    return '<div><b>'+esc(c.v)+'</b><span>'+esc(c.k[L])+'</span></div>';
  }).join("");

  document.getElementById("savesGrid").innerHTML = SAVES.map(function(s){
    return '<div class="save"><div class="k">'+esc(s.k[L])+'</div><div class="v">'+esc(s.v)+'</div><div class="d">'+esc(s.d[L])+'</div></div>';
  }).join("");

    // Servicios muestra siempre los cuatro: quien vino por un peritaje
  // tiene que poder ver que tambien existe el broker, y al reves.
  document.getElementById("planesGrid").innerHTML = PLANS.map(function(p){
    return '<article class="plan'+(p.feat?' feat':'')+'"><div class="plan-head"><p class="plan-tag">'+esc(p.tag[L])+
      '</p><h3>'+esc(p.n[L])+'</h3><div class="price"><b>'+p.p+'</b><span>USD</span></div><p class="plan-scope">'+esc(p.s[L])+
      '</p></div><div class="plan-who"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="5.4" r="2.9" stroke="#4A85FF" stroke-width="1.5"/><path d="M2.6 14c0-2.7 2.4-4.6 5.4-4.6s5.4 1.9 5.4 4.6" stroke="#4A85FF" stroke-width="1.5" stroke-linecap="round"/></svg><span>'+esc(p.w[L])+'</span></div><ul>'+p.f.map(function(f){ return '<li>'+CHKG+esc(f[L])+'</li>'; }).join("")+
      '</ul><div class="plan-foot"><a class="btn '+(p.feat?'btn-blue':'btn-ghost')+'" href="#agendar">'+esc(t("srv.book"))+'</a></div></article>';
  }).join("");

  document.getElementById("stepsGrid").innerHTML = STEPS.map(function(s){
    return '<div class="step"><p class="num">'+s.n+'</p><h3>'+esc(s.t[L])+'</h3><p>'+esc(s.p[L])+'</p></div>';
  }).join("");

  document.getElementById("paysGrid").innerHTML = PAYS.map(function(p){
    return '<div class="pay"><div class="k">'+esc(p.k[L])+'</div><h3>'+esc(p.t[L])+'</h3><p>'+esc(p.p[L])+
      '</p><div class="methods">'+p.m.map(function(m){ return '<span class="m">'+esc(m)+'</span>'; }).join("")+'</div></div>';
  }).join("");

  // El titular de los videos cambia: en broker no son peritajes
  var tituloCasos = document.querySelector("#casos h2");
  if (tituloCasos) tituloCasos.textContent = t(VIA === "broker" ? "casos.h2brk" : "casos.h2");
  var subCasos = document.querySelector("#casos .sec-head > p:last-of-type");
  if (subCasos) subCasos.textContent = t(VIA === "broker" ? "casos.subbrk" : "casos.sub");

  pintarMercado();
  pintarRangos();

  var brk = document.getElementById("brokerGrid");
    // Con presupuesto elegido, los casos parecidos van primero y marcados.
  // No se esconde ninguno: los demas siguen abajo, que tambien venden.
  var lista = BROKER.slice();
  if (RANGO) lista.sort(function(a, b){
    return (b.pr === RANGO ? 1 : 0) - (a.pr === RANGO ? 1 : 0);
  });

  if (brk) brk.innerHTML = lista.map(function(c){
    return '<article class="caso-brk">' +
      '<div class="brk-n">' + esc(c.n) +
        (RANGO && c.pr === RANGO ? '<span class="brk-sim">' + esc(t("pre.sim")) + '</span>' : '') +
      '</div>' +
      '<div class="brk-b"><span class="brk-k">' + esc(t("brk.q")) + '</span>' +
        '<p>' + esc(c.b[L]) + '</p></div>' +
      '<div class="brk-e"><span class="brk-k">' + esc(t("brk.e")) + '</span>' +
        '<p>' + esc(c.e[L]) + '</p>' +
        '<span class="brk-d">' + CHKG + esc(c.d[L]) + '</span></div>' +
    '</article>';
  }).join("");

  document.getElementById("autoList").innerHTML = AUTOS.map(function(a){
    return '<div>'+CHKG+'<span>'+esc(a[L])+'</span></div>';
  }).join("");

  /* La hoja de ruta se mostraba dentro del panel de maqueta, que ya no
     existe. Si algun dia vuelve a hacer falta, el contenido sigue en
     ROAD, dentro de datos.js. */


}

render();

/* ---------- interactions ---------- */
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){
    document.querySelectorAll(".lang button").forEach(function(x){ x.classList.remove("on"); });
    b.classList.add("on");
    L = LANGS.indexOf(b.getAttribute("data-lang"));
    render();
  });
});

document.getElementById("slots").addEventListener("click", function(e){
  if (!e.target.classList.contains("slot")) return;
  this.querySelectorAll(".slot").forEach(function(s){ s.classList.remove("on"); });
  e.target.classList.add("on");
});

var nav = document.getElementById("navLinks"), tog = document.getElementById("navToggle");
tog.addEventListener("click", function(){
  var open = nav.classList.toggle("open");
  tog.setAttribute("aria-expanded", open ? "true" : "false");
});
nav.addEventListener("click", function(e){ if (e.target.tagName === "A"){ nav.classList.remove("open"); tog.setAttribute("aria-expanded","false"); } });

/* El sistema interno es la app que ya usas. No la reescribimos:
   se abre tal cual. La direccion esta en config.js */
document.getElementById("goSistema").addEventListener("click", function(){
  window.location.href = URL_SISTEMA;
});

/* El panel interno vive en sistema.html, no aqui. */

var lbI = 0;
function lbShow(i){
  lbI = (i + PAGES.length) % PAGES.length;
  document.getElementById("lbImg").src = PAGES[lbI];
  document.getElementById("lbNum").textContent = (lbI+1) + " / " + PAGES.length;
  document.getElementById("lb").classList.add("on");
}
document.getElementById("pagesGrid").addEventListener("click", function(e){
  var b = e.target.closest(".pg"); if (b) lbShow(parseInt(b.getAttribute("data-i"), 10));
});
document.getElementById("lbClose").addEventListener("click", function(){ document.getElementById("lb").classList.remove("on"); });
document.getElementById("lb").addEventListener("click", function(e){ if (e.target === this) this.classList.remove("on"); });
document.getElementById("lbPrev").addEventListener("click", function(){ lbShow(lbI-1); });
document.getElementById("lbNext").addEventListener("click", function(){ lbShow(lbI+1); });
document.addEventListener("keydown", function(e){
  var lb = document.getElementById("lb"); if (!lb.classList.contains("on")) return;
  if (e.key === "Escape") lb.classList.remove("on");
  if (e.key === "ArrowLeft") lbShow(lbI-1);
  if (e.key === "ArrowRight") lbShow(lbI+1);
});




/* ---------- copiar numeros de cuenta ---------- */
/* Copiar un numero de cuenta de un toque.
   El portapapeles del navegador falla en http, sin permiso o dentro de un
   iframe. Si falla, en vez de no hacer nada seleccionamos el numero para
   que el cliente lo copie a mano: siempre pasa algo visible. */
(function () {
  var COPIADO = { es: "Copiado", en: "Copied", de: "Kopiert" };
  var MANUAL  = { es: "Cópialo",  en: "Copy it", de: "Kopieren" };

  function idioma() {
    var b = document.querySelector(".lang button.on");
    return (b && b.getAttribute("data-lang")) || "es";
  }

  function avisar(b, textos) {
    var antes = b.getAttribute("data-antes");
    if (antes === null) { antes = b.textContent; b.setAttribute("data-antes", antes); }
    b.textContent = textos[idioma()] || textos.es;
    b.classList.add("ok");
    clearTimeout(b._t);
    b._t = setTimeout(function () {
      b.textContent = b.getAttribute("data-antes");
      b.classList.remove("ok");
    }, 1800);
  }

  function seleccionar(b) {
    var num = b.parentNode.querySelector("b");
    if (!num) return;
    var r = document.createRange();
    r.selectNodeContents(num);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
  }

  function aLaAntigua(texto) {
    var t = document.createElement("textarea");
    t.value = texto;
    t.style.position = "fixed";
    t.style.top = "-1000px";
    document.body.appendChild(t);
    t.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(t);
    return ok;
  }

  function intentar(b) {
    var texto = b.getAttribute("data-cp");
    if (aLaAntigua(texto)) { avisar(b, COPIADO); return; }
    seleccionar(b);
    avisar(b, MANUAL);
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".cp");
    if (!b) return;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(b.getAttribute("data-cp")).then(
        function () { avisar(b, COPIADO); },
        function () { intentar(b); }
      );
    } else {
      intentar(b);
    }
  });
})();


/* ============ EL MERCADO DE SEMINUEVOS ============

   Dos segmentos, alta gama y gama media, con las transferencias reales
   de SUNARP. Las barras se dibujan con divs y no con una libreria de
   graficos: son seis barras, no hace falta cargar 200 KB para eso, y asi
   heredan los colores y el modo oscuro de la propia web.

   La barra se mide contra la marca mas grande del segmento, no contra el
   total del mercado: dentro de alta gama, Toyota aplastaria todo.       */

var SEGMENTO = "alta";

function pintarMercado(){
  var tabs = document.getElementById("segTabs");
  var caja = document.getElementById("mktGrid");
  var pie  = document.getElementById("mktPie");
  if (!tabs || !caja) return;

  /* --- las dos pestanas --- */
  tabs.innerHTML = [["alta", "sug.alta"], ["media", "sug.media"]].map(function(x){
    return '<button type="button" class="seg-b' + (SEGMENTO === x[0] ? " on" : "") +
           '" data-seg="' + x[0] + '">' + esc(t(x[1])) + "</button>";
  }).join("");

  tabs.querySelectorAll(".seg-b").forEach(function(b){
    b.addEventListener("click", function(){
      SEGMENTO = b.getAttribute("data-seg");
      pintarMercado();
    });
  });

  /* --- las barras --- */
  var lista = MERCADO[SEGMENTO] || [];
  var tope = lista.reduce(function(a, x){ return Math.max(a, x.a2026); }, 1);

  // Cabecera con el nombre de cada columna. Sin esto no se sabe si los
  // numeros son de un mes o de un ano, que es justo lo que hay que saber.
  var cabecera = '<div class="mkt-fila mkt-cab">' +
    '<div>' + esc(t("sug.cMarca")) + '</div>' +
    '<div>' + esc(t("sug.cTransf")) + '</div>' +
    '<div>' + esc(t("sug.cVar")) + '</div>' +
    '<div>' + esc(t("sug.cCuota")) + '</div>' +
  '</div>';

  caja.innerHTML = cabecera + lista.map(function(x){
    var ancho = Math.max(6, Math.round(x.a2026 / tope * 100));
    var sube  = x.v > MERCADO_TOTAL.var;   // crece mas que el mercado

    return '<div class="mkt-fila">' +
      '<div class="mkt-m">' + esc(x.m) + "</div>" +
      '<div class="mkt-b"><span style="width:' + ancho + '%"></span>' +
        '<b>' + x.a2026.toLocaleString("es-PE") + "</b></div>" +
      '<div class="mkt-v' + (sube ? " sube" : "") + '">' +
        (x.v > 0 ? "+" : "") + x.v.toFixed(1) + "%</div>" +
      '<div class="mkt-p">' + x.p.toFixed(1) + "%</div>" +
    "</div>";
  }).join("");

  /* --- la lectura, que es lo que de verdad sirve --- */
  if (pie) {
    var mejor = lista.slice().sort(function(a, b){ return b.v - a.v; })[0];
    pie.innerHTML =
      '<span class="mkt-k">' + esc(t("sug.pie")) + "</span>" +
      esc(t(SEGMENTO === "alta" ? "sug.leyalta" : "sug.leymedia")
            .replace("{marca}", mejor ? mejor.m : "")
            .replace("{v}", mejor ? mejor.v.toFixed(1) : "")
            .replace("{total}", MERCADO_TOTAL.a2026.toLocaleString("es-PE"))
            .replace("{mv}", MERCADO_TOTAL.var.toFixed(1)));
  }
}


/* ============ LA PREGUNTA DEL PRESUPUESTO ============

   Es el ultimo paso antes de agendar, y cierra distinto segun el camino:

     peritaje -> cuanto se ha llegado a negociar en ese rango, y las dos
                 salidas posibles: negociar o retirarse
     broker   -> los casos reales cerrados dentro de ese presupuesto

   Se guarda la respuesta en RANGO para que al cambiar de idioma o de
   camino no haya que volver a preguntar.                            */


function pintarRangos(){
  var caja = document.getElementById("rangosGrid");
  if (!caja) return;

  caja.innerHTML = RANGOS.map(function(r){
    var rotulo = L === 0 ? r.e : (L === 1 ? r.en : r.de);
    return '<button type="button" class="rango' + (RANGO === r.id ? ' on' : '') +
           '" data-rango="' + r.id + '">' + esc(rotulo) + '</button>';
  }).join("");

  caja.querySelectorAll(".rango").forEach(function(b){
    b.addEventListener("click", function(){
      elegirRango(parseInt(b.getAttribute("data-rango"), 10));
    });
  });
}

function elegirRango(id){
  RANGO = id;
  pintarRangos();
  pintarResultado();

  // Quien decide si la seccion de casos se ve es pintarResultado, que
  // sabe cuantos hay. Forzarla aqui la mostraba vacia en el rango bajo.

  bajarA(VIA === "broker" ? "broker" : "preResultado", 120);
}

function pintarResultado(){
  var res = document.getElementById("preResultado");
  if (!res) return;

  if (!RANGO) { res.hidden = true; res.innerHTML = ""; return; }
  res.hidden = false;

  var r = RANGOS.filter(function(x){ return x.id === RANGO; })[0];
  if (!r) return;

  if (VIA === "broker") {
    // En broker la respuesta son los casos: se dice cuantos coinciden y
    // se ordenan arriba. Ninguno se esconde.
    var iguales = BROKER.filter(function(c){ return c.pr === RANGO; }).length;
    res.innerHTML = '<p class="pre-t">' +
      esc(iguales ? t("pre.brk").replace("{n}", iguales) : t("pre.brk0")) + '</p>';
    render();
    return;
  }

  // peritaje: cuanto se ha negociado y las dos salidas
  res.innerHTML =
    '<div class="pre-cifra"><span class="pre-k">' + esc(t("pre.neg")) + '</span>' +
      '<b>USD ' + esc(r.neg) + '</b></div>' +
    '<div class="pre-dos">' +
      '<div class="pre-op"><span class="pre-k">' + esc(t("pre.o1k")) + '</span>' +
        '<p>' + esc(t("pre.o1")) + '</p></div>' +
      '<div class="pre-op alt"><span class="pre-k">' + esc(t("pre.o2k")) + '</span>' +
        '<p>' + esc(t("pre.o2")) + '</p></div>' +
    '</div>' +
    '<a class="btn btn-blue pre-cta" href="#agendar">' + esc(t("pre.cta")) + '</a>';
}


/* ============ LOS DOS CAMINOS ============

   La pagina no muestra todo a la vez. El visitante elige si ya tiene el
   auto o si todavia lo busca, y a partir de ahi solo ve lo suyo:

     peritaje -> sus 6 videos, el informe de 11 paginas, la comparativa
     broker   -> sus 3 videos y los 6 casos con nombre

   Lo comun (respaldo, servicios, proceso, agendar) se ve en los dos.
   Antes de elegir solo esta la pregunta: nadie pierde tiempo leyendo lo
   que no le toca.

   Quien filtra los reels y los planes es el propio render() de app.js,
   mirando la variable VIA. Asi no hay dos versiones del mismo HTML.

   La eleccion queda en la direccion (#peritaje / #broker) para poder
   mandar el enlace ya abierto en un camino.                          */


/* Bajar hasta una seccion.

   scrollIntoView con smooth no siempre corre: si el elemento acaba de
   dejar de estar oculto, o si el navegador ignora el desplazamiento
   suave, se queda quieto. Aqui se calcula la posicion a mano y se
   descuenta la barra de arriba, que es fija y taparia el titulo. */
function bajarA(id, espera){
  setTimeout(function(){
    var destino = document.getElementById(id);
    if (!destino) return;

    var barra = document.querySelector(".nav");
    var alto  = barra ? barra.offsetHeight : 0;
    var desde = window.pageYOffset;
    var hasta = destino.getBoundingClientRect().top + desde - alto - 8;
    if (hasta < 0) hasta = 0;

    // El desplazamiento suave del navegador no corre en todos lados, ni
    // de forma consistente en el primer uso. Se anima a mano y punto: el
    // CSS ya no lleva scroll-behavior para que nada compita.
    var raiz = document.documentElement;

    var quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto || !window.requestAnimationFrame) {
      raiz.scrollTop = hasta;
      return;
    }

    var inicio = null;
    var dura = 420;
    var arranco = false;

    // Red de seguridad: si la animacion no arranca (pestana en segundo
    // plano, navegador que no dispara requestAnimationFrame), se salta
    // de golpe. Vale mas llegar sin suavidad que no llegar.
    setTimeout(function(){
      if (!arranco) raiz.scrollTop = hasta;
    }, 260);

    function paso(ahora){
      arranco = true;
      if (inicio === null) inicio = ahora;
      var t = Math.min((ahora - inicio) / dura, 1);
      var suave = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      raiz.scrollTop = desde + (hasta - desde) * suave;
      if (t < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);

  }, espera || 90);
}

function marcarVia(via){
  VIA = via;
  document.body.classList.toggle("via-peritaje", via === "peritaje");
  document.body.classList.toggle("via-broker",   via === "broker");
  document.body.classList.toggle("sin-via",      !via);

  // cambiar de camino borra la respuesta anterior: el presupuesto
  // significa cosas distintas en cada uno
  RANGO = null;
  var resu = document.getElementById("preResultado");
  if (resu) { resu.hidden = true; resu.innerHTML = ""; }

  var otro = document.getElementById("otroCamino");
  if (otro) {
    otro.hidden = !via;
    var txt = document.getElementById("otraTexto");
    if (txt && via) {
      txt.textContent = via === "peritaje" ? t("via.abroker") : t("via.aperitaje");
    }
  }

  render();   // vuelve a dibujar con los reels y planes del camino
}

/* Elegir camino: se despliega el recorrido y se baja a su primera prueba. */
function elegirVia(via, saltar){
  marcarVia(via);
  if (history.replaceState) history.replaceState(null, "", "#" + via);

  // Los dos caminos empiezan por los videos: es la prueba que engancha.
  if (saltar !== false) bajarA("casos");
}

(function iniciarCaminos(){
  // las dos tarjetas de la pregunta
  document.querySelectorAll(".via[href^='#']").forEach(function(a){
    a.addEventListener("click", function(e){
      e.preventDefault();
      elegirVia(a.getAttribute("href") === "#broker" ? "broker" : "peritaje");
    });
  });

  // el enlace para probar el otro camino
  var otro = document.getElementById("verOtro");
  if (otro) otro.addEventListener("click", function(e){
    e.preventDefault();
    elegirVia(VIA === "peritaje" ? "broker" : "peritaje");
  });

  // el menu de arriba: si apunta a algo de un camino, lo abre
  var deVia = { casos:"peritaje", informe:"peritaje", peritaje:"peritaje", broker:"broker" };
  document.querySelectorAll("#navLinks a").forEach(function(a){
    a.addEventListener("click", function(){
      var id = (a.getAttribute("href") || "").replace("#", "");
      var v = deVia[id];
      if (v && v !== VIA) elegirVia(v, false);
      else if (!VIA) marcarVia("peritaje");   // lo comun necesita un camino abierto
    });
  });

  // si la direccion ya trae un camino, se abre solo
  var h = (location.hash || "").replace("#", "");
  if (h === "broker" || h === "peritaje") elegirVia(h, false);
  else marcarVia(null);
})();
