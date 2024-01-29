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

  // Crear objetos para realizar un seguimiento de partidos jugados, victorias y derrotas por cada equipo
  var partidosJugados = {};
  var victorias = {};
  var derrotas = {};

  // Obtener la lista de jornadas del XML
  var jornadas = xml.querySelectorAll('jornada');

  // Iterar sobre las jornadas y construir las filas de la tabla
  jornadas.forEach(function (jornada) {
    // Obtener la lista de partidos de la jornada
    var partidos = jornada.querySelectorAll('partido');

    // Iterar sobre los partidos y actualizar los objetos partidosJugados, victorias y derrotas
    partidos.forEach(function (partido) {
      var equipos = partido.querySelectorAll('local, visitante');
      var puntos = partido.querySelectorAll('puntoslocal, puntosvisitante');

      // Obtener nombres y puntos de los equipos
      var nombreLocal = equipos[0].textContent;
      var nombreVisitante = equipos[1].textContent;
      var puntosLocal = parseInt(puntos[0].textContent);
      var puntosVisitante = parseInt(puntos[1].textContent);

      // Actualizar partidos jugados para ambos equipos
      actualizarContador(partidosJugados, nombreLocal);
      actualizarContador(partidosJugados, nombreVisitante);

      // Determinar el equipo ganador y actualizar victorias y derrotas
      if (puntosLocal > puntosVisitante) {
        actualizarContador(victorias, nombreLocal);
        actualizarContador(derrotas, nombreVisitante);
      } else if (puntosVisitante > puntosLocal) {
        actualizarContador(victorias, nombreVisitante);
        actualizarContador(derrotas, nombreLocal);
      }
    });
  });

  // Agregar las filas a la tabla con el número de partidos jugados, victorias y derrotas por cada equipo
  for (var equipo in partidosJugados) {
    var fila = tbody.insertRow();
    fila.insertCell(0).textContent = equipo;
    fila.insertCell(1).textContent = partidosJugados[equipo];
    fila.insertCell(2).textContent = victorias[equipo] || 0;
    fila.insertCell(3).textContent = derrotas[equipo] || 0;
  }
}

// Función para actualizar el contador de partidos jugados, victorias o derrotas para un equipo
function actualizarContador(contador, equipo) {
  if (!contador[equipo]) {
    contador[equipo] = 0;
  }
  contador[equipo]++;
}
