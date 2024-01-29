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

  // Obtener la lista de equipos del XML
  var equipos = xml.querySelectorAll('equipos');

  // Iterar sobre los equipos y construir las filas de la tabla
  equipos.forEach(function (equipo) {
    var local = equipo.querySelector('local').textContent;
    var visitante = equipo.querySelector('visitante').textContent;

    // Añadir equipos solo si no están ya en la lista
    if (!equipoEnLista(tbody, local)) {
      var filaLocal = tbody.insertRow();
      filaLocal.insertCell(0).textContent = local;
    }

    if (!equipoEnLista(tbody, visitante)) {
      var filaVisitante = tbody.insertRow();
      filaVisitante.insertCell(0).textContent = visitante;
    }
  });
}

// Función auxiliar para verificar si un equipo ya está en la lista
function equipoEnLista(tbody, nombreEquipo) {
  var filas = tbody.getElementsByTagName('tr');
  for (var i = 0; i < filas.length; i++) {
    if (filas[i].getElementsByTagName('td')[0].textContent === nombreEquipo) {
      return true;
    }
  }
  return false;
}
