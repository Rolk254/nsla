 // Datos del XML (reemplaza este string con el contenido de tu XML)
 var xmlString = `...`; // Copia aquí el contenido de tu XML

 // Crear un nuevo objeto DOMParser
 var parser = new DOMParser();
 var xmlDoc = parser.parseFromString(xmlString, "text/xml");

 // Obtén la referencia al tbody
 var tablaBody = document.getElementById("tablaBody");

 // Obtén la lista de equipos del XML
 var equipos = xmlDoc.querySelectorAll("equipo");

 // Itera sobre los equipos y crea las filas de la tabla
 equipos.forEach(function (equipo) {
   var fila = document.createElement("tr");
   var logo = document.createElement("td");
   var nombreEquipo = document.createTextNode(equipo.querySelector("local").textContent);
   var victorias = document.createElement("td");
   var empates = document.createElement("td");
   var derrotas = document.createElement("td");
   var partidosJugados = document.createElement("td");
   var puntos = document.createElement("td");

   logo.appendChild(nombreEquipo);
   fila.appendChild(logo);
   fila.appendChild(partidosJugados);
   fila.appendChild(victorias);
   fila.appendChild(empates);
   fila.appendChild(derrotas);
   fila.appendChild(puntos);

   tablaBody.appendChild(fila);

   // Agrega datos a las celdas
   partidosJugados.textContent = equipo.querySelectorAll("partido").length;
   victorias.textContent = calcularVictorias(equipo);
   empates.textContent = calcularEmpates(equipo);
   derrotas.textContent = calcularDerrotas(equipo);
   puntos.textContent = calcularPuntos(equipo);
 });

 // Funciones para calcular estadísticas
 function calcularVictorias(equipo) {
   // Lógica para calcular victorias
   return equipo.querySelectorAll("puntoslocal:only-child:not(:empty):not(0)").length;
 }

 function calcularEmpates(equipo) {
   // Lógica para calcular empates
   return equipo.querySelectorAll("puntoslocal:not(:empty):not(0):not(:only-child), puntosvisitante:not(:empty):not(0):not(:only-child)").length;
 }

 function calcularDerrotas(equipo) {
   // Lógica para calcular derrotas
   return equipo.querySelectorAll("puntosvisitante:only-child:not(:empty):not(0)").length;
 }

 function calcularPuntos(equipo) {
   // Lógica para calcular puntos
   // Puedes adaptar esta lógica según la estructura real de tu XML
   return equipo.querySelectorAll("puntoslocal, puntosvisitante").length;
 }