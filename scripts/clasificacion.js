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

  // Crear objetos para realizar un seguimiento de partidos jugados, victorias, derrotas, empates y puntos totales por cada equipo
  var partidosJugados = {};
  var victorias = {};
  var derrotas = {};
  var empates = {};
  var puntosRecibidos = {};

  // Obtener la lista de jornadas del XML
  var jornadas = xml.querySelectorAll('jornada');

  // Iterar sobre las jornadas y construir las filas de la tabla
  jornadas.forEach(function (jornada) {
    // Obtener la lista de partidos de la jornada
    var partidos = jornada.querySelectorAll('partido');

    // Iterar sobre los partidos y actualizar los objetos partidosJugados, victorias, derrotas, empates y puntosRecibidos
    partidos.forEach(function (partido) {
      var equipos = partido.querySelectorAll('local, visitante');
      var puntos = partido.querySelectorAll('puntoslocal, puntosvisitante');





      // Obtener nombres y puntos de los equipos
      var nombreLocal = equipos[0].textContent;
      var imagenLocal = `<img src='bjvb/jdhvd/${nombreLocal}.png'>`;
      var nombreVisitante = equipos[1].textContent;
      var puntosLocal = parseInt(puntos[0].textContent);
      var puntosVisitante = parseInt(puntos[1].textContent);

      // Actualizar partidos jugados para ambos equipos
      actualizarContador(partidosJugados, nombreLocal);
      actualizarContador(partidosJugados, nombreVisitante);

      // Determinar el resultado del partido y actualizar victorias, derrotas, empates y puntosRecibidos
      if (puntosLocal > puntosVisitante) {
        actualizarContador(victorias, nombreLocal);
        actualizarContador(derrotas, nombreVisitante);
      } else if (puntosVisitante > puntosLocal) {
        actualizarContador(victorias, nombreVisitante);
        actualizarContador(derrotas, nombreLocal);
      } else {
        actualizarContador(empates, nombreLocal);
        actualizarContador(empates, nombreVisitante);
      }

      // Actualizar puntos recibidos para el equipo local y visitante
      actualizarPuntosRecibidos(puntosRecibidos, nombreLocal, puntosVisitante);
      actualizarPuntosRecibidos(puntosRecibidos, nombreVisitante, puntosLocal);
    });
  });

  // Agregar las filas a la tabla con el número de partidos jugados, victorias, derrotas, empates y puntos recibidos por cada equipo
for (var equipo in partidosJugados) {
  var fila = tbody.insertRow();
  var celdaNombre = fila.insertCell(1); // Cambiado de 0 a 1
  var celdaImagen = fila.insertCell(0); // Mantiene la celda para la imagen
  var imagenLocal = `<img src='../imagenes/otras/${equipo}.png'>`;

  // Agregar el nombre del equipo a la celda correspondiente
  celdaNombre.textContent = equipo;

  // Agregar la imagen a la celda de la imagen
  celdaImagen.innerHTML = imagenLocal;

  // Resto de la información en otras celdas
  fila.insertCell(2).textContent = partidosJugados[equipo];
  fila.insertCell(3).textContent = victorias[equipo] || 0;
  fila.insertCell(4).textContent = derrotas[equipo] || 0;
  fila.insertCell(5).textContent = empates[equipo] || 0;
}

}

// Función para actualizar el contador de partidos jugados, victorias, derrotas o empates para un equipo
function actualizarContador(contador, equipo) {
  if (!contador[equipo]) {
    contador[equipo] = 0;
  }
  contador[equipo]++;
}

// Función para actualizar los puntos recibidos para un equipo
function actualizarPuntosRecibidos(puntosRecibidos, equipo, puntos) {
  if (!puntosRecibidos[equipo]) {
    puntosRecibidos[equipo] = 0;
  }
  puntosRecibidos[equipo] += puntos;
}
