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

  // Obtener la lista de jornadas del XML
  var jornadas = xml.querySelectorAll('jornada');

  // Iterar sobre las jornadas y construir las filas de la tabla
  jornadas.forEach(function (jornada, index) {
    // Crear una nueva fila para la jornada
    var filaJornada = tbody.insertRow();

    // Añadir celdas a la fila de la jornada
    filaJornada.insertCell(0).textContent = "Jornada " + (index + 1);

    // Obtener la lista de partidos de la jornada
    var partidos = jornada.querySelectorAll('partido');

    // Inicializar contadores para victorias, derrotas y empates
    var victorias = 0;
    var derrotas = 0;
    var empates = 0;

    // Iterar sobre los partidos y construir las filas de la tabla
    partidos.forEach(function (partido) {
      var puntosLocal = parseInt(partido.querySelector('puntoslocal').textContent);
      var puntosVisitante = parseInt(partido.querySelector('puntosvisitante').textContent);

      // Añadir celdas para cada partido
      var filaPartido = tbody.insertRow();
      filaPartido.insertCell(0).textContent = partido.querySelector('local').textContent;
      filaPartido.insertCell(1).textContent = puntosLocal;
      filaPartido.insertCell(2).textContent = partido.querySelector('visitante').textContent;
      filaPartido.insertCell(3).textContent = puntosVisitante;

      // Actualizar contadores de victorias, derrotas y empates
      if (puntosLocal > puntosVisitante) {
        victorias++;
      } else if (puntosLocal < puntosVisitante) {
        derrotas++;
      } else {
        empates++;
      }
    });

    // Añadir celdas para estadísticas de la jornada
    filaJornada.insertCell(1).textContent = victorias;
    filaJornada.insertCell(2).textContent = derrotas;
    filaJornada.insertCell(3).textContent = empates;
  });
}
