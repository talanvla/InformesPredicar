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

  document.getElementById("reelsGrid").innerHTML = REELS.map(function(r){
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
