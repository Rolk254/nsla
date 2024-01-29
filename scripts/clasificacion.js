document.addEventListener('DOMContentLoaded', function () {
    // Resto del código aquí
  
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
      var equipos = xml.querySelectorAll('equipo');
  
      // Iterar sobre los equipos y construir las filas de la tabla
      equipos.forEach(function(equipo) {
        var nombre = equipo.querySelector('nombre').textContent;
  
        // Crear una nueva fila
        var fila = tbody.insertRow();
  
        // Añadir celdas a la fila
        fila.insertCell(0).textContent = nombre;
      });
    }
  });
  