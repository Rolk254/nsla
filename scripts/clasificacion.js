// Cargar el XML
var url = '../xm_xs/calendar_t1.xml';

fetch(url)
  .then(response => response.text())
  .then(data => {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, 'application/xml');
    
    // Llamar a las funciones para calcular y actualizar la tabla
    calcularPartidosJugados(xmlDoc);
    calcularVictorias(xmlDoc);
    calcularDerrotas(xmlDoc);
    calcularEmpates(xmlDoc);
  })
  .catch(error => console.error('Error al cargar el XML:', error));

// Función para actualizar la tabla con los valores calculados
function actualizarTabla(nombreEquipo, partidosJugados, victorias, derrotas, empates, locales, visitantes, puntosPerdidos, puntosConseguidos) {
  var equipoRow = document.getElementById(nombreEquipo);

  if (equipoRow) {
    equipoRow.cells[1].textContent = partidosJugados;
    equipoRow.cells[2].textContent = victorias;
    equipoRow.cells[3].textContent = derrotas;
    equipoRow.cells[4].textContent = empates;
    equipoRow.cells[5].textContent = locales;
    equipoRow.cells[6].textContent = visitantes;
    equipoRow.cells[7].textContent = puntosPerdidos;
    equipoRow.cells[8].textContent = puntosConseguidos;
  }
}

// Función para calcular partidos jugados
function calcularPartidosJugados(xml) {
  var equipos = xml.querySelectorAll('equipo');

  equipos.forEach(function(equipo) {
    var partidosJugados = parseInt(equipo.querySelector('partidos_jugados').textContent);
    var nombreEquipo = equipo.querySelector('nombre').textContent;

    actualizarTabla(nombreEquipo, partidosJugados, 0, 0, 0, 0, 0, 0, 0);
  });
}

// Función para calcular victorias
function calcularVictorias(xml) {
  var equipos = xml.querySelectorAll('equipo');

  equipos.forEach(function(equipo) {
    var puntosLocal = parseInt(equipo.querySelector('puntoslocal').textContent);
    var puntosVisitante = parseInt(equipo.querySelector('puntosvisitante').textContent);
    var nombreEquipo = equipo.querySelector('nombre').textContent;

    if (!isNaN(puntosLocal) && !isNaN(puntosVisitante)) {
      var victorias = 0;

      if (puntosLocal > puntosVisitante) {
        victorias = 1;
      }

      actualizarTabla(nombreEquipo, 0, victorias, 0, 0, 0, 0, 0, 0);
    }
  });
}

// Función para calcular derrotas
function calcularDerrotas(xml) {
  var equipos = xml.querySelectorAll('equipo');

  equipos.forEach(function(equipo) {
    var puntosLocal = parseInt(equipo.querySelector('puntoslocal').textContent);
    var puntosVisitante = parseInt(equipo.querySelector('puntosvisitante').textContent);
    var nombreEquipo = equipo.querySelector('nombre').textContent;

    if (!isNaN(puntosLocal) && !isNaN(puntosVisitante)) {
      var derrotas = 0;

      if (puntosLocal < puntosVisitante) {
        derrotas = 1;
      }

      actualizarTabla(nombreEquipo, 0, 0, derrotas, 0, 0, 0, 0, 0);
    }
  });
}

// Función para calcular empates
function calcularEmpates(xml) {
  var equipos = xml.querySelectorAll('equipo');

  equipos.forEach(function(equipo) {
    var puntosLocal = parseInt(equipo.querySelector('puntoslocal').textContent);
    var puntosVisitante = parseInt(equipo.querySelector('puntosvisitante').textContent);
    var nombreEquipo = equipo.querySelector('nombre').textContent;

    if (!isNaN(puntosLocal) && !isNaN(puntosVisitante)) {
      var empates = 0;

      if (puntosLocal === puntosVisitante) {
        empates = 1;
      }

      actualizarTabla(nombreEquipo, 0, 0, 0, empates, 0, 0, 0, 0);
    }
  });
}
