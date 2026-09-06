/* PREDICAR AUTOMOTIVE PERU SAC
   El contenido: casos, comparativa, planes, precios.
   Orden de carga: config, idiomas, datos, app, agenda. */

var IG = "https://www.instagram.com/predicar.pe/";
var REELS = [
{u:"https://www.instagram.com/predicar.pe/reel/DbwSxUMA2_M/",k:["Broker","Broker","Broker"],t:["Luis · BMW 320i 2023, único dueño","Luis · BMW 320i 2023, one owner","Luis · BMW 320i 2023, ein Vorbesitzer"],v:"caso-01.mp4"},
{u:"https://www.instagram.com/predicar.pe/reel/DcUlHUUg8_U/",k:["Caso","Case","Fall"],t:["Chevrolet Tahoe 85 000 km: ¿negociar o descartar?","Chevrolet Tahoe 85,000 km: negotiate or walk?","Chevrolet Tahoe 85.000 km: verhandeln oder gehen?"],v:"caso-02.mp4"},
{u:"https://www.instagram.com/predicar.pe/reel/DchXcNzAU79/",k:["Advertencia","Warning","Warnung"],t:["Lo que nadie revisa te cuesta más de S/ 6 000","What nobody checks costs you over S/ 6,000","Was niemand prüft, kostet über 6.000 S/"],v:"caso-03.mp4"},
{u:"https://www.instagram.com/predicar.pe/reel/DcXHkeYgQ1B/",k:["Criterio","Criteria","Kriterium"],t:["Lo barato sale caro en reparaciones y gasolina","Cheap ends up costly in repairs and fuel","Billig wird teuer bei Reparatur und Sprit"],v:"caso-04.mp4"},
{u:"https://www.instagram.com/predicar.pe/reel/DcW3Y2GAMtw/",k:["Ahorro","Savings","Ersparnis"],t:["S/ 600 en combustible, S/ 3 000 en reparaciones","S/ 600 in fuel, S/ 3,000 in repairs","600 S/ Sprit, 3.000 S/ Reparaturen"],v:"caso-05.mp4"},
{u:"https://www.instagram.com/predicar.pe/reel/DcWzjc1ABKa/",k:["Escáner","Scanner","Scanner"],t:["Lo que se puede hacer con el escáner","What the scanner can actually do","Was der Scanner wirklich kann"],v:"caso-06.mp4"},
{u:"https://www.instagram.com/predicar.pe/reel/DbMFjLeABe5/",k:["Broker","Broker","Broker"],t:["Camioneta de alta gama para empresarios","Premium SUV for business owners","Premium-SUV für Unternehmer"],v:"caso-07.mp4"},
{u:"https://www.instagram.com/predicar.pe/reel/DcwEF2YgmBf/",k:["Broker","Broker","Broker"],t:["Auto de alta gama en menos de una semana","A premium car in under a week","Premiumauto in unter einer Woche"],v:"caso-08.mp4"},
{u:"https://www.instagram.com/predicar.pe/reel/Dcg2DCqgBgJ/",k:["Asesoría","Consult","Beratung"],t:["Lo que nadie te dice y afecta tu bolsillo","What nobody tells you — and it costs you","Was dir niemand sagt — und dich Geld kostet"],v:"caso-09.mp4"}
];

var PAGES = ["img-02.jpg","img-03.jpg","img-04.jpg","img-05.jpg","img-06.jpg","img-07.jpg","img-08.jpg","img-09.jpg","img-10.jpg","img-11.jpg","img-12.jpg"];

var CRED = [
 {v:"+7", k:["Años en diseño y calidad en marcas como Audi, Ferrari y Tesla","Years in design and quality at brands like Audi, Ferrari and Tesla","Jahre in Design und Qualität bei Marken wie Audi, Ferrari und Tesla"]},
 {v:"2020", k:["Año en que nace Predicar","The year Predicar was founded","Gründungsjahr von Predicar"]},
 {v:"100%", k:["Hallazgos documentados con fotografía","Findings documented with photographs","Befunde mit Fotos dokumentiert"]}
];

var CASOS = [
 {k:"neg", v:"Audi Q5 2014 · Concesionario", pv:"16 500", pc:"14 000", kmw:1, obs:["Kilometraje manipulado: el tablero marcaba 55 000 km. El valor real se obtuvo leyendo los módulos con el escáner.","Odometer tampering: the dash read 55,000 km. The real figure came from reading the control modules with the scanner.","Manipulierter Tacho: die Anzeige zeigte 55.000 km. Der reale Wert stammt aus dem Auslesen der Steuergeräte."], m:"Audi Q5 2014", km:"110 000", rec:["Corregir el kilometraje en Audi y reparar las fugas de la tapa de balancines (USD 1 500).","Have Audi correct the mileage and fix the valve-cover leaks (USD 1,500).","Kilometerstand bei Audi korrigieren und Ventildeckel-Undichtigkeiten beheben (1.500 USD)."], q:"si", qt:["Sí, negociando","Yes, with negotiation","Ja, mit Verhandlung"],
  t:["El odómetro marcaba la mitad","The odometer read half","Der Tacho zeigte die Hälfte"],
  p:["Pantalla: 55 000 km. Real: 110 000 km. El primer reporte del escáner repetía el dato de la pantalla; el análisis profundo de módulos lo delató. Sumado a eso, una reparación de motor mal hecha y fugas en la tapa de balancines.","Dash: 55,000 km. Actual: 110,000 km. The first scan simply echoed the dash; a deep module read exposed it. On top of that, a botched engine repair and valve-cover leaks.","Anzeige: 55.000 km. Real: 110.000 km. Der erste Scan wiederholte nur die Anzeige; das tiefe Auslesen der Steuergeräte deckte es auf. Dazu eine misslungene Motorreparatur und Ventildeckel-Undichtigkeiten."],
  o:["Compró por USD 14 000. El concesionario llevó el auto a Audi, corrigió el kilometraje y lo entregó en óptimas condiciones.","Bought at USD 14,000. The dealer took the car to Audi, corrected the mileage and handed it over in top condition.","Kauf für 14.000 USD. Der Händler ließ den Kilometerstand bei Audi korrigieren und übergab das Auto in Bestzustand."]},

 {k:"neg", v:"Mercedes-Benz C200 2015", pv:"13 900", pc:"7 500", kmw:0, obs:["Choque frontal que deformó el chasis. El vehículo circulaba sin airbag instalado y estaba repintado por completo.","Frontal impact that deformed the chassis. The car was driving without an airbag fitted and had been fully resprayed.","Frontalunfall mit verformtem Rahmen. Das Auto fuhr ohne eingebauten Airbag und war komplett neu lackiert."], m:"Mercedes-Benz C200 2015", km:"—", rec:["Reparar chasis, repintar e instalar airbag (USD 3 000). Mantenimiento de la transmisión automática.","Repair chassis, respray and fit the airbag (USD 3,000). Service the automatic gearbox.","Rahmen instand setzen, lackieren und Airbag einbauen (3.000 USD). Getriebewartung."], q:"cond", qt:["Sí, asumiendo la reparación","Yes, taking on the repair","Ja, mit Instandsetzung"],
  t:["Chasis deformado y sin airbag","Deformed chassis, no airbag","Verformter Rahmen, kein Airbag"],
  p:["Choque frontal que deformó el chasis, repintado completo, faro derecho fallando y transmisión automática pidiendo mantenimiento. Reparar todo costó USD 3 000.","A frontal impact had deformed the chassis: full respray, faulty right headlight and an automatic gearbox due for service. Fixing everything cost USD 3,000.","Ein Frontalunfall hatte den Rahmen verformt: Komplettlackierung, defekter rechter Scheinwerfer und fällige Getriebewartung. Die Instandsetzung kostete 3.000 USD."],
  o:["Compró por USD 7 500 y seis meses después lo vendió en USD 14 000. Un auto chocado no siempre es para descartar.","Bought at USD 7,500 and sold it six months later for USD 14,000. A crashed car isn't always one to walk away from.","Kauf für 7.500 USD, sechs Monate später für 14.000 USD verkauft. Ein Unfallwagen ist nicht immer ein Ausschlusskriterium."]},

 {k:"neg", v:"Mercedes-Benz GLC 200 2023 · 7 000 km", pv:"57 500", pc:"52 500", kmw:0, obs:["Vendido por concesionaria. Sin observaciones.","Sold by a dealership. No observations.","Vom Händler verkauft. Keine Anmerkungen."], m:"Mercedes-Benz GLC 200 2023", km:"7 000", rec:["Sin trabajos pendientes. Seguir el plan de mantenimiento entregado por kilometraje.","Nothing pending. Follow the mileage-based maintenance plan provided.","Nichts offen. Dem übergebenen Wartungsplan nach Kilometerstand folgen."], q:"si", qt:["Sí, sin reservas","Yes, no reservations","Ja, ohne Vorbehalt"],
  t:["Impecable, y aun así negociable","Flawless — and still negotiable","Makellos — und trotzdem verhandelbar"],
  p:["Vendido por concesionaria. Solo dos raspones leves y todo lo demás en orden. Le entregamos el plan de mantenimiento a seguir en cada kilometraje.","Sold by a dealership. Just two light scratches, everything else in order. We handed over the mileage-by-mileage maintenance plan.","Vom Händler verkauft. Nur zwei leichte Kratzer, sonst alles in Ordnung. Wir übergaben den kilometergenauen Wartungsplan."],
  o:["Compró con USD 5 000 de descuento sobre el precio de lista.","Bought with USD 5,000 off the asking price.","Kauf mit 5.000 USD unter dem Listenpreis."]},

 {k:"neg", v:"Mazda CX-30 2020 · 45 000 km", pv:"21 000", pc:"19 600", kmw:0, obs:["Sin observaciones.","No observations.","Keine Anmerkungen."], m:"Mazda CX-30 2020", km:"45 000", rec:["Solo detalles estéticos. Mecánica y electrónica sin observaciones.","Cosmetic details only. Mechanics and electronics clean.","Nur optische Details. Mechanik und Elektronik ohne Befund."], q:"si", qt:["Sí, sin reservas","Yes, no reservations","Ja, ohne Vorbehalt"],
  t:["Funcionamiento óptimo","Running perfectly","Einwandfrei unterwegs"],
  p:["Automático, con solo detalles estéticos ligeros. Mecánica y electrónica sin observaciones: el descuento salió de lo cosmético, no de una falla.","Automatic, with only light cosmetic issues. Mechanics and electronics came back clean: the discount came from cosmetics, not a fault.","Automatik, nur leichte optische Mängel. Mechanik und Elektronik ohne Befund: Der Nachlass kam aus der Optik, nicht aus einem Defekt."],
  o:["Compró con USD 1 400 de descuento.","Bought with USD 1,400 off.","Kauf mit 1.400 USD Nachlass."]},

 {k:"neg", v:"BMW X5 2019 Paquete M · 55 000 km", pv:"54 000", pc:"50 000", kmw:0, obs:["Sin observaciones. Los trabajos pendientes son de mantenimiento normal por uso.","No observations. The pending work is normal wear maintenance.","Keine Anmerkungen. Die offenen Arbeiten sind normale Verschleißwartung."], m:"BMW X5 2019 Paquete M", km:"55 000", rec:["Cambiar pastillas y llantas traseras. Mantenimiento de la transmisión automática.","Replace rear pads and tyres. Service the automatic gearbox.","Hintere Beläge und Reifen tauschen. Getriebewartung durchführen."], q:"cond", qt:["Sí, con mantenimiento presupuestado","Yes, with a budgeted service","Ja, mit eingeplanter Wartung"],
  t:["Sano, con mantenimiento pendiente","Healthy, with service due","Gesund, mit fälliger Wartung"],
  p:["Pastillas de freno traseras, llantas posteriores y mantenimiento de la transmisión automática. Todo cuantificado antes de sentarse a negociar.","Rear brake pads, rear tyres and an automatic gearbox service. All of it priced before sitting down to negotiate.","Hintere Bremsbeläge, Hinterreifen und Getriebewartung. Alles beziffert, bevor verhandelt wurde."],
  o:["Compró con USD 4 000 de descuento y con el presupuesto de mantenimiento claro.","Bought with USD 4,000 off and a clear maintenance budget.","Kauf mit 4.000 USD Nachlass und klarem Wartungsbudget."]},

 {k:"rej", v:"BMW 318", pv:"17 000", pc:null, kmw:0, obs:["Declarado pérdida total y reconstruido por completo. El vendedor no lo declaraba.","Written off and fully rebuilt. The seller did not disclose it.","Totalschaden, komplett wiederaufgebaut. Der Verkäufer verschwieg es."], m:"BMW 318", km:"—", rec:["No comprar. Reconstruido tras pérdida total, con desalineamiento estructural.","Do not buy. Rebuilt after a write-off, with structural misalignment.","Nicht kaufen. Nach Totalschaden wiederaufgebaut, mit struktureller Fehlausrichtung."], q:"no", qt:["No","No","Nein"],
  t:["Pérdida total, reconstruido","Written off, rebuilt","Totalschaden, wiederaufgebaut"],
  p:["Se veía en excelentes condiciones. Había sido declarado pérdida total y reparado por completo: las puertas y el capot estaban totalmente desalineados.","It looked to be in excellent condition. It had been written off and fully rebuilt — the doors and bonnet were badly misaligned.","Es sah hervorragend aus. Es war ein Totalschaden, komplett wiederaufgebaut — Türen und Motorhaube deutlich verzogen."],
  o:["Compra rechazada.","Purchase rejected.","Kauf abgelehnt."]},

 {k:"rej", v:"BMW 420 · vendido como 2021", pv:"35 000", pc:null, kmw:1, obs:["Kilometraje manipulado: el tablero marcaba 48 000 km. Además, historial de mantenimientos borrado y fecha de fábrica de diciembre 2019, no 2021 como se publicaba.","Odometer tampering: the dash read 48,000 km. Service history wiped and a factory date of December 2019, not the 2021 advertised.","Manipulierter Tacho: die Anzeige zeigte 48.000 km. Serviceheft gelöscht, Produktionsdatum Dezember 2019 statt der beworbenen 2021."], m:"BMW 420 (modelo 2020)", km:"68 000", rec:["No comprar. El año y el kilometraje no coinciden con lo que registra el escáner.","Do not buy. Year and mileage do not match the scanner records.","Nicht kaufen. Baujahr und Kilometerstand stimmen nicht mit dem Scanner überein."], q:"no", qt:["No","No","Nein"],
  t:["Ni era 2021, ni tenía 48 000 km","Neither a 2021 nor 48,000 km","Weder 2021 noch 48.000 km"],
  p:["Pantalla: 48 000 km. Escáner: 68 000 km, con el historial de mantenimientos borrado. Fecha de salida de fábrica: diciembre 2019 — es decir, modelo 2020.","Dash: 48,000 km. Scanner: 68,000 km, with the service history wiped. Factory build date: December 2019 — a 2020 model.","Anzeige: 48.000 km. Scanner: 68.000 km, Serviceheft gelöscht. Produktionsdatum: Dezember 2019 — also Modelljahr 2020."],
  o:["Compra rechazada.","Purchase rejected.","Kauf abgelehnt."]},

 {k:"buy", v:"Mercedes-Benz GLC 300 Coupé 2025", pv:"75 000", pc:null, kmw:0, obs:["Vehículo con garantía vigente. Los códigos no correspondían a una falla real.","Vehicle still under warranty. The codes did not correspond to a real fault.","Fahrzeug mit laufender Garantie. Die Codes entsprachen keinem echten Defekt."], m:"Mercedes-Benz GLC 300 Coupé 2025", km:"—", rec:["Llevar a garantía para el reajuste de conectores. Comprar con tranquilidad.","Take it to warranty for connector reseating. Buy with confidence.","Zur Garantie für das Nachsetzen der Steckverbinder. Beruhigt kaufen."], q:"si", qt:["Sí, usando la garantía","Yes, using the warranty","Ja, über die Garantie"],
  t:["Errores que no eran una falla","Codes that weren't a fault","Fehler, die keine waren"],
  p:["El escáner mostraba códigos que no se borraban, pero sin ningún síntoma en conducción: solo requerían reajuste de conectores.","The scanner showed codes that wouldn't clear, yet nothing showed up while driving: the connectors simply needed reseating.","Der Scanner zeigte nicht löschbare Codes, im Fahrbetrieb aber ohne Symptom: Die Steckverbinder mussten nur nachgesetzt werden."],
  o:["Le dijimos que lo llevara a garantía y comprara con tranquilidad.","We told him to take it to warranty and buy with confidence.","Wir rieten zum Garantiebesuch — und zum beruhigten Kauf."]},

 {k:"rej", v:"Jeep Grand Cherokee", pv:"13 000", pc:null, kmw:0, obs:["Reparaciones previas mal ejecutadas en motor y transmisión, con fugas de aceite reaparecidas.","Poorly executed previous repairs to engine and gearbox, with oil leaks reappearing.","Schlecht ausgeführte Vorreparaturen an Motor und Getriebe, mit erneuten Öllecks."], m:"Jeep Grand Cherokee", km:"—", rec:["No comprar. Las reparaciones superan los USD 4 000 sobre un auto de USD 13 000.","Do not buy. Repairs exceed USD 4,000 on a USD 13,000 car.","Nicht kaufen. Reparaturen über 4.000 USD bei einem 13.000-USD-Auto."], q:"no", qt:["No","No","Nein"],
  t:["Más de USD 4 000 en reparaciones","Over USD 4,000 in repairs","Über 4.000 USD Reparaturen"],
  p:["Fugas de aceite mal reparadas en motor y transmisión, suspensión y dirección para cambio, y un estado estético muy deteriorado.","Badly patched oil leaks in engine and gearbox, suspension and steering due for replacement, and heavy cosmetic wear.","Schlecht reparierte Öllecks an Motor und Getriebe, Fahrwerk und Lenkung zum Tausch und stark abgenutzte Optik."],
  o:["Compra rechazada: la inversión superaba los USD 4 000.","Purchase rejected: the repair bill exceeded USD 4,000.","Kauf abgelehnt: Die Instandsetzung lag über 4.000 USD."]}
];

/* Comparativa. Formato de cada fila: [concepto, Predicar, otros].
   Las primeras filas coinciden a propósito: son las que dan credibilidad.
   La diferencia se ve en las que solo tienen check de este lado. */
/* Comparativa. Formato de cada fila: [concepto, Predicar, otros].
   Un 1 dibuja check, un 0 dibuja raya, y un trio de textos escribe el
   texto. Los dos primeros grupos coinciden a proposito: son los que dan
   credibilidad. El tercero es donde esta la diferencia. */
var CMP = [
 {g:"cmp.g1", items:[
  [["Motor","Engine","Motor"],1,1],
  [["Transmisión","Transmission","Getriebe"],1,1],
  [["Dirección","Steering","Lenkung"],1,1],
  [["Suspensión","Suspension","Fahrwerk"],1,1],
  [["Frenos","Brakes","Bremsen"],1,1],
  [["Neumáticos","Tyres","Reifen"],1,1],
  [["Carrocería","Bodywork","Karosserie"],1,1],
  [["Chasis y estructura","Chassis and structure","Rahmen und Struktur"],1,1],
  [["Fugas","Leaks","Leckagen"],1,1],
  [["Sistema eléctrico","Electrical system","Elektrik"],1,1],
  [["Interior del vehículo","Interior","Innenraum"],1,1],
  [["Prueba de manejo","Road test","Probefahrt"],1,1],
  [["Estado general","Overall condition","Gesamtzustand"],1,1],
  [["Kilometraje","Odometer","Kilometerstand"],1,1],
  [["Escaneo OBD de todos los módulos","OBD scan of every module","OBD-Scan aller Steuergeräte"],1,0],
  [["Escaneo antes y después de la prueba de manejo","Scan before and after the road test","Scan vor und nach der Probefahrt"],1,0],
  [["Análisis del comportamiento del motor en marcha","Analysis of how the engine behaves while driving","Analyse des Motorverhaltens während der Fahrt"],1,0],
  [["Consumo real de combustible medido","Real fuel consumption measured","Realer Kraftstoffverbrauch gemessen"],1,0]
 ]},

 {g:"cmp.g2", items:[
  [["Papeletas","Traffic fines","Bußgelder"],1,1],
  [["Historial de robos","Theft history","Diebstahlhistorie"],1,1],
  [["Antecedentes de accidentes","Accident record","Unfallhistorie"],1,1],
  [["Impuestos y obligaciones pendientes","Outstanding taxes and debts","Offene Steuern und Verbindlichkeiten"],1,0],
  [["Órdenes de captura","Seizure orders","Beschlagnahmeanordnungen"],1,0],
  [["Papeletas de SAT, Callao, SUTRAN y ATU","Fines from SAT, Callao, SUTRAN and ATU","Bußgelder von SAT, Callao, SUTRAN und ATU"],1,0],
  [["Cantidad de propietarios anteriores","Number of previous owners","Anzahl der Vorbesitzer"],1,0],
  [["Revisión de antecedentes disponibles","Full available background check","Vollständige Hintergrundprüfung"],1,0]
 ]},

 /* Este grupo lleva texto en vez de check: aqui el detalle es el argumento. */
 {g:"cmp.g3", items:[
  [["Ahorro en consumo de combustible","Savings on fuel","Ersparnis beim Verbrauch"],
   ["Detectamos el consumo excesivo antes de que sea tu problema · +2 000 USD",
    "We catch excessive consumption before it becomes your problem · +2,000 USD",
    "Wir erkennen Mehrverbrauch, bevor er dein Problem wird · +2.000 USD"],0],

  [["Evita reparaciones mayores","Avoid major repairs","Große Reparaturen vermeiden"],
   ["Lista de reparaciones necesarias, cada una con su costo real · hasta 3 000 USD",
    "List of needed repairs, each with its real cost · up to 3,000 USD",
    "Liste nötiger Reparaturen, jede mit realem Preis · bis 3.000 USD"],0,1],

  [["Negocia mejor el precio","Negotiate a better price","Besser verhandeln"],
   ["Argumentos técnicos para rebajar entre 500 y 4 000 USD",
    "Technical arguments to knock off between 500 and 4,000 USD",
    "Technische Argumente für 500 bis 4.000 USD Nachlass"],0],

  [["Informe completo con recomendaciones","Full report with recommendations","Vollbericht mit Empfehlungen"],
   ["PDF con fotos, hallazgos y plan de mantenimiento para después de la compra",
    "PDF with photos, findings and a maintenance plan for after the purchase",
    "PDF mit Fotos, Befunden und Wartungsplan für nach dem Kauf"],0],

  [["Tranquilidad y respaldo","Peace of mind","Sicherheit und Rückhalt"],
   ["Ingeniero mecatrónico con más de 7 años en marcas como Audi, Ferrari y Tesla",
    "Mechatronics engineer with over 7 years at brands like Audi, Ferrari and Tesla",
    "Mechatronik-Ingenieur mit über 7 Jahren bei Audi, Ferrari und Tesla"],0],

  [["Asesoría antes de revisar","Consultation before inspecting","Beratung vor der Prüfung"],
   ["Incluida, para que revises el auto correcto y no tres al azar",
    "Included, so you inspect the right car instead of three at random",
    "Inklusive, damit du das richtige Auto prüfst statt drei zufällige"],0]
 ]}
];

var SAVES = [
 {k:["Ahorro en combustible","Fuel savings","Kraftstoffersparnis"],v:"+2 000 USD",d:["Detectamos consumo excesivo antes de que sea tu problema","We catch excessive consumption before it becomes your problem","Wir erkennen Mehrverbrauch, bevor er dein Problem wird"]},
 {k:["Reparaciones mayores","Major repairs","Große Reparaturen"],v:"+3 000 USD",d:["Fallas graves que aparecen a los pocos meses de la compra","Serious faults that surface months after purchase","Schwere Defekte, die Monate nach dem Kauf auftauchen"]},
 {k:["Negociación del precio","Price negotiation","Preisverhandlung"],v:"500 – 4 000 USD",d:["Lo que rebajaron nuestros clientes con los hallazgos en la mano","What our clients knocked off with the findings in hand","Was unsere Kunden mit den Befunden herausholten"]},
 {k:["Autos revisados","Cars inspected","Geprüfte Autos"],v:"1 vs 3",d:["Con asesoría previa revisas el correcto, no tres al azar","With a prior consult you check the right one, not three","Mit Vorberatung prüfst du das richtige, nicht drei"]},
 {k:["Respaldo","Backing","Rückhalt"],v:"+7",d:["Años de experiencia del ingeniero a cargo en vehículos de gama alta","Years of experience by the lead engineer on premium vehicles","Jahre Erfahrung des leitenden Ingenieurs mit Premiumfahrzeugen"]}
];

var PLANS = [
 {feat:1, tag:["Punto de partida","Entry point","Einstieg"], n:["Asesoría personalizada","Personal consult","Persönliche Beratung"], p:"65",
  s:["30 minutos · videollamada","30 minutes · video call","30 Minuten · Videocall"],
  w:["Tienen dudas y quieren orientarse antes de empezar a buscar.","You have doubts and want direction before starting the search.","Du bist unsicher und willst vor der Suche Orientierung."],
  f:[["Definimos qué auto te conviene según tu uso real","We define which car fits your real use","Wir klären, welches Auto zu deiner Nutzung passt"],
     ["Marcas y modelos a evitar según tu presupuesto","Makes and models to avoid at your budget","Marken und Modelle, die du meiden solltest"],
     ["Costo real de tener ese auto en Lima","True cost of owning that car in Lima","Reale Haltungskosten in Lima"],
     ["Cómo buscar y qué anuncios descartar","How to search and which ads to skip","Wie du suchst und welche Anzeigen du überspringst"]]},

 {feat:0, tag:["Inspección vehicular","Core service","Kernleistung"], n:["Peritaje automotriz","Vehicle inspection","Fahrzeuggutachten"], p:"120",
  s:["Un vehículo · a domicilio","One vehicle · at your location","Ein Fahrzeug · vor Ort"],
  w:["Ya tienen un auto en mente y quieren comprar con seguridad.","You already have a car in mind and want to buy safely.","Du hast ein Auto im Blick und willst sicher kaufen."],
  f:[["Inspección mecánica, estructural y electrónica","Mechanical, structural and electronic inspection","Mechanische, strukturelle und elektronische Prüfung"],
     ["Escaneo OBD-II de todos los módulos","OBD-II scan of every module","OBD-II-Scan aller Steuergeräte"],
     ["Análisis legal y documentario completo","Full legal and document analysis","Vollständige Rechts- und Dokumentenprüfung"],
     ["Informe en PDF con fotos y costos de reparación","PDF report with photos and repair costs","PDF-Bericht mit Fotos und Reparaturkosten"],
     ["Plan de mantenimiento posterior a la compra","Post-purchase maintenance plan","Wartungsplan nach dem Kauf"],
     ["Asesoría previa incluida","Prior consult included","Vorberatung inklusive"]]},

 {feat:0, tag:["Llave en mano","Turnkey","Schlüsselfertig"], n:["Broker vehicular","Car sourcing","Fahrzeugsuche"], p:"690",
  s:["Vehículos de USD 20 000 a 60 000","Vehicles from USD 20,000 to 60,000","Fahrzeuge von 20.000 bis 60.000 USD"],
  w:["Están buscando un auto y quieren encontrarlo en 3 a 6 semanas.","You're looking for a car and want it found in 3 to 6 weeks.","Du suchst ein Auto und willst es in 3 bis 6 Wochen finden."],
  f:[["Búsqueda y filtrado de opciones por ti","We search and shortlist for you","Wir suchen und filtern für dich"],
     ["Peritaje completo del vehículo elegido","Full inspection of the chosen vehicle","Vollgutachten des gewählten Fahrzeugs"],
     ["Negociación del precio con el vendedor","Price negotiation with the seller","Preisverhandlung mit dem Verkäufer"],
     ["Acompañamiento a notaría para la transferencia","We accompany you to the notary","Begleitung zum Notar"],
     ["Asesoría postventa y plan de mantenimiento","Post-sale advice and maintenance plan","Nachbetreuung und Wartungsplan"]]},

 {feat:0, tag:["Alta gama","Premium","Premium"], n:["Broker premium","Premium sourcing","Premium-Suche"], p:"990",
  s:["Vehículos de más de USD 60 000","Vehicles above USD 60,000","Fahrzeuge über 60.000 USD"],
  w:["Buscan un vehículo de alta gama, en poco tiempo y sin exponerse a una estafa.","You want a premium vehicle, fast, without exposure to a scam.","Du willst schnell ein Premiumfahrzeug — ohne Betrugsrisiko."],
  f:[["Todo lo incluido en el broker vehicular","Everything in car sourcing","Alles aus der Fahrzeugsuche"],
     ["Entrega estimada en 1 a 3 semanas","Estimated delivery in 1 to 3 weeks","Lieferung in 1 bis 3 Wochen"],
     ["Prioridad en agenda y atención directa del ingeniero","Priority scheduling and direct engineer attention","Terminpriorität und direkte Ingenieursbetreuung"],
     ["Búsqueda ampliada a concesionarios y venta privada","Search extended to dealers and private sales","Suche bei Händlern und Privatverkäufern"]]}
];

var STEPS = [
 {n:"01",t:["Asesoría","Consult","Beratung"],p:["30 minutos para definir qué auto buscar. Si ya lo tienes, saltamos este paso.","30 minutes to define which car to look for. Skip it if you already found one.","30 Minuten, um das passende Auto zu bestimmen. Entfällt, wenn du eins hast."]},
 {n:"02",t:["Reserva","Booking","Buchung"],p:["Eliges horario y pagas con Yape, Plin, tarjeta, Wise o Revolut.","Pick a slot and pay by Yape, Plin, card, Wise or Revolut.","Termin wählen und per Yape, Plin, Karte, Wise oder Revolut zahlen."]},
 {n:"03",t:["Inspección","Inspection","Prüfung"],p:["Vamos a donde esté el auto con escáner y equipo de medición. 45 a 60 minutos.","We come to the car with scanner and measuring gear. 45 to 60 minutes.","Wir kommen mit Scanner und Messtechnik zum Auto. 45 bis 60 Minuten."]},
 {n:"04",t:["Informe","Report","Bericht"],p:["PDF con hallazgos por prioridad, costos y el precio justo del vehículo.","PDF with findings by priority, costs and the car's fair price.","PDF mit priorisierten Befunden, Kosten und fairem Preis."]},
 {n:"05",t:["Negociación","Negotiation","Verhandlung"],p:["Te damos los argumentos técnicos para bajar el precio o para retirarte.","We give you the technical arguments to lower the price — or to walk.","Wir liefern die technischen Argumente zum Nachverhandeln oder Aussteigen."]}
];

var PAYS = [
 {k:["Perú","Peru","Peru"],t:["Yape · Plin","Yape · Plin","Yape · Plin"],p:["Pago inmediato desde tu celular con QR. Confirmación automática.","Instant mobile payment by QR. Automatic confirmation.","Sofortzahlung per QR vom Handy. Automatische Bestätigung."],m:["Yape","Plin","Transferencia BCP"]},
 {k:["Tarjeta","Card","Karte"],t:["Visa · Mastercard","Visa · Mastercard","Visa · Mastercard"],p:["Link de pago seguro, en soles o dólares, con cuotas disponibles.","Secure payment link in soles or dollars, instalments available.","Sicherer Zahlungslink in Soles oder Dollar, Ratenzahlung möglich."],m:["Visa","Mastercard","Amex"]},
 {k:["Internacional","International","International"],t:["Wise · Revolut","Wise · Revolut","Wise · Revolut"],p:["Para clientes que compran desde el extranjero, sin comisiones sorpresa.","For clients buying from abroad, with no surprise fees.","Für Kunden aus dem Ausland, ohne versteckte Gebühren."],m:["Wise","Revolut","PayPal"]}
];

var AUTOS = [
 ["La cita se crea en tu Google Calendar y en el nuestro","The appointment is created in your Google Calendar and ours","Der Termin landet in deinem und unserem Google Calendar"],
 ["Recibes confirmación automática por WhatsApp","You get an automatic WhatsApp confirmation","Du erhältst eine automatische WhatsApp-Bestätigung"],
 ["Recordatorio 24 horas antes, con la dirección","Reminder 24 hours before, with the address","Erinnerung 24 Stunden vorher, mit Adresse"],
 ["El horario queda bloqueado: nadie más puede reservarlo","The slot is locked — nobody else can book it","Der Termin wird gesperrt — niemand sonst kann buchen"],
 ["El informe llega a tu correo el mismo día","The report reaches your inbox the same day","Der Bericht kommt am selben Tag per E-Mail"]
];

var ROAD = [
 {p:["Portal de talleres","Workshop portal","Werkstattportal"],d:["DMS gratuito para talleres asociados durante los primeros 3 meses: registran sus ingresos, fotos e informes con la marca de su taller.","A free DMS for partner workshops for the first 3 months: they log jobs, photos and reports under their own branding.","Kostenloses DMS für Partnerwerkstätten in den ersten 3 Monaten: Aufträge, Fotos und Berichte unter eigener Marke."]},
 {p:["Base de datos","Database","Datenbank"],d:["Cada inspección alimenta una base que solo el administrador puede consultar de forma consolidada.","Every inspection feeds a database only the admin can query in aggregate.","Jede Prüfung speist eine Datenbank, die nur der Admin gesamthaft abfragen kann."]},
 {p:["IA de diagnóstico","Diagnostic AI","Diagnose-KI"],d:["Con los datos de todos los talleres, predecir qué componente falló a partir de los síntomas y sugerir la corrección.","With data from every workshop, predict which component failed from the symptoms and suggest the fix.","Mit Daten aller Werkstätten vorhersagen, welches Bauteil ausfiel, und die Behebung vorschlagen."]}
];

/* ---------- render ---------- */
var CHK = '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="#0B3FD9"/><path d="M4.8 8.2l2.2 2.2 4.2-4.6" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function celda(v){
  if (!v) return '<span class="no">—</span>';
  if (v === 1) return CHK;
  return '<span class="txt">' + esc(v[L]) + '</span>';
}
var STAR = '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="flex:none;margin-right:7px;vertical-align:-1px"><path d="M8 1.4l1.9 4 4.3.6-3.1 3 .74 4.3L8 11.3l-3.84 2-.74-4.3-3.1-3 4.3-.6z" fill="#FFC94A"/></svg>';
var CHKG = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7.4l3 3 6-6.6" stroke="#4A85FF" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var esc = function(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); };
