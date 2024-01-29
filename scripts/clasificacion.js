var xmlPath = '../xm_xs/calendar_t1.xml';

// Realizar la solicitud Fetch para obtener el contenido del archivo XML
fetch(xmlPath)
  .then(response => response.text())
  .then(xmlString => {
    // Crear un nuevo objeto DOMParser
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");

    // Obtén la referencia al tbody
    var tablaBody = document.getElementById("tablaBody");

    // Obtén la lista de equipos del XML
    var equipos = xmlDoc.querySelectorAll("equipos");

    // Itera sobre los equipos y crea las filas de la tabla
    equipos.forEach(function (equipo) {
      var fila = document.createElement("tr");

      // Nombre del equipo
      var nombreEquipo = document.createElement("td");
      nombreEquipo.textContent = equipo.querySelector("local").textContent;
      fila.appendChild(nombreEquipo);

      // Calcula estadísticas
      var victorias = calcularVictorias(equipo);
      var empates = calcularEmpates(equipo);
      var derrotas = calcularDerrotas(equipo);
      var partidosJugados = victorias + empates + derrotas;
      var puntos = victorias * 3 + empates;

      // Agrega datos a las celdas
      fila.innerHTML += `<td>${victorias}</td>`;
      fila.innerHTML += `<td>${empates}</td>`;
      fila.innerHTML += `<td>${derrotas}</td>`;
      fila.innerHTML += `<td>${partidosJugados}</td>`;
      fila.innerHTML += `<td>${puntos}</td>`;

      tablaBody.appendChild(fila);
    });
  });

// Funciones para calcular estadísticas
function calcularVictorias(xml) {
    var equipos = xml.querySelectorAll('equipo');

    equipos.forEach(function (equipo) {
        // Resto del código...
        var puntosLocal = equipo.querySelector('puntoslocal').textContent;
        var puntosVisitante = equipo.querySelector('puntosvisitante').textContent;

        // Resto del código...
    });
}
function calcularEmpates(xml) {
    var equipos = xml.querySelectorAll('equipo');

    equipos.forEach(function (equipo) {
        var puntosLocal = equipo.querySelector('puntoslocal').textContent;
        var puntosVisitante = equipo.querySelector('puntosvisitante').textContent;

        if (puntosLocal === puntosVisitante) {
            // Lógica para incrementar el contador de empates para el equipo...
        }
    });
}

function calcularDerrotas(xml) {
    var equipos = xml.querySelectorAll('equipo');

    equipos.forEach(function (equipo) {
        var puntosLocal = parseInt(equipo.querySelector('puntoslocal').textContent);
        var puntosVisitante = parseInt(equipo.querySelector('puntosvisitante').textContent);

        if (puntosLocal < puntosVisitante) {
            // Lógica para incrementar el contador de derrotas para el equipo...
        }
    });
}