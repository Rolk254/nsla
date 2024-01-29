// Cargar el XML
var url = '../xm_xs/calendar_t1.xml';

fetch(url)
  .then(response => response.text())
  .then(data => {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, 'application/xml');

    // Llamar a la función para construir la tabla
    construirTabla(xmlDoc);
  })
  .catch(error => console.error('Error al cargar el XML:', error));

// Función para construir la tabla con los datos del XML
function construirTabla(xml) {
  // Obtener la referencia al cuerpo de la tabla
  var tbody = document.getElementById('tablaBody');

  // Crear un objeto para realizar un seguimiento de los partidos jugados por cada equipo
  var partidosJugados = {};

  // Obtener la lista de jornadas del XML
  var jornadas = xml.querySelectorAll('jornada');

  // Iterar sobre las jornadas y construir las filas de la tabla
  jornadas.forEach(function (jornada) {
    // Obtener la lista de partidos de la jornada
    var partidos = jornada.querySelectorAll('partido');

    // Iterar sobre los partidos y actualizar el objeto partidosJugados
    partidos.forEach(function (partido) {
      var equipos = partido.querySelectorAll('local, visitante');

      equipos.forEach(function (equipo) {
        var nombreEquipo = equipo.textContent;

        // Añadir el equipo al objeto partidosJugados si aún no está presente
        if (!partidosJugados[nombreEquipo]) {
          partidosJugados[nombreEquipo] = 0;
        }

        // Incrementar el contador de partidos jugados para el equipo actual
        partidosJugados[nombreEquipo]++;
      });
    });
  });

  // Agregar las filas a la tabla con el número de partidos jugados por cada equipo
  for (var equipo in partidosJugados) {
    var fila = tbody.insertRow();
    fila.insertCell(0).textContent = equipo;
    fila.insertCell(1).textContent = partidosJugados[equipo];
  }
}
