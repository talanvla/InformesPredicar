/* PREDICAR AUTOMOTIVE PERU SAC
   Lo que se toca para cambiar el comportamiento del sitio.
   Orden de carga: config, idiomas, datos, app, agenda. */



// ---------------------------------------------------------------
//  ACCESO AL SISTEMA
//  La pantalla para generar informes. Vive en esta misma web, en
//  sistema.html, junto con el portal de taller (taller.html).
// ---------------------------------------------------------------
var URL_SISTEMA = "sistema.html";


// ---------------------------------------------------------------
//  CAMINO ELEGIDO
//  null hasta que el visitante decide si ya tiene el auto o lo busca.
//  render() lo mira para saber que reels y que planes mostrar.
// ---------------------------------------------------------------
var VIA = null;

// Rango de presupuesto elegido (1, 2 o 3). null hasta que responde.
var RANGO = null;

// WhatsApp al que van los botones de contacto
var WA = "https://wa.me/51972598538";
