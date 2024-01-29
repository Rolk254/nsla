// Cargar el XML
var url = '../xm_xs/calendar_t1.xml';

fetch(url)
  .then(response => response.text())
  .then(data => {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, 'application/xml');
    
    // Llamar a la función para calcular y actualizar la tabla
    calcularTabla(xmlDoc);
  })
  .catch(error => console.error('Error al cargar el XML:', error));

// Función para actualizar la tabla con los valores calculados
function actualizarTabla(equipo, partidosJugados, victorias, derrotas, empates, locales, visitantes, puntosPerdidos, puntosConseguidos) {
  var fila = document.getElementById(equipo);

  if (fila) {
    fila.cells[1].textContent = partidosJugados;
    fila.cells[2].textContent = victorias;
    fila.cells[3].textContent = derrotas;
    fila.cells[4].textContent = empates;
    fila.cells[5].textContent = locales;
    fila.cells[6].textContent = visitantes;
    fila.cells[7].textContent = puntosPerdidos;
    fila.cells[8].textContent = puntosConseguidos;
  }
}

// Función para calcular y actualizar la tabla
function calcularTabla(xml) {
  var equipos = xml.querySelectorAll('equipo');

  equipos.forEach(function(equipo) {
    var nombreEquipo = equipo.querySelector('nombre').textContent;
    var partidosJugados = parseInt(equipo.querySelector('partidos_jugados').textContent) || 0;
    var puntosLocal = parseInt(equipo.querySelector('puntoslocal').textContent) || 0;
    var puntosVisitante = parseInt(equipo.querySelector('puntosvisitante').textContent) || 0;

    // Calcular victorias, derrotas y empates
    var victorias = 0;
    var derrotas = 0;
    var empates = 0;

    if (!isNaN(puntosLocal) && !isNaN(puntosVisitante)) {
      if (puntosLocal > puntosVisitante) {
        victorias = 1;
      } else if (puntosLocal < puntosVisitante) {
        derrotas = 1;
      } else {
        empates = 1;
      }
    }

    // Calcular locales, visitantes, puntos perdidos y puntos conseguidos
    var locales = parseInt(equipo.querySelector('locales').textContent) || 0;
    var visitantes = parseInt(equipo.querySelector('visitantes').textContent) || 0;
    var puntosPerdidos = parseInt(equipo.querySelector('puntos_perdidos').textContent) || 0;
    var puntosConseguidos = parseInt(equipo.querySelector('puntos_concedidos').textContent) || 0;

    // Actualizar la tabla
    actualizarTabla(nombreEquipo, partidosJugados, victorias, derrotas, empates, locales, visitantes, puntosPerdidos, puntosConseguidos);
  });
}
