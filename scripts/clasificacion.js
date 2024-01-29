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

    // Crear una nueva fila para cada equipo
    var filaLocal = tbody.insertRow();
    filaLocal.insertCell(0).textContent = local;

    var filaVisitante = tbody.insertRow();
    filaVisitante.insertCell(0).textContent = visitante;
  });
}
