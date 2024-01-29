document.addEventListener('DOMContentLoaded', function () {
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
      var tbody = document.getElementById('tablaBody');
  
      // Obtener la lista de jornadas del XML
      var jornadas = xml.querySelectorAll('jornada');
  
      jornadas.forEach(function(jornada) {
        // Crear una nueva fila para la jornada
        var filaJornada = tbody.insertRow();
        
        // Añadir celdas para la jornada
        filaJornada.insertCell(0).textContent = 'Jornada ' + jornada.getAttribute('num');
        
        // Obtener la lista de partidos de la jornada
        var partidos = jornada.querySelectorAll('partido');
  
        // Variables para contadores de victorias, empates y derrotas
        var victorias = 0;
        var empates = 0;
        var derrotas = 0;
  
        // Iterar sobre los partidos y construir las filas de la tabla
        partidos.forEach(function(partido) {
          var local = partido.querySelector('local').textContent;
          var puntosLocal = parseInt(partido.querySelector('puntoslocal').textContent);
          var visitante = partido.querySelector('visitante').textContent;
          var puntosVisitante = parseInt(partido.querySelector('puntosvisitante').textContent);
  
          // Lógica para determinar victoria, empate o derrota
          if (puntosLocal > puntosVisitante) {
            victorias++;
          } else if (puntosLocal < puntosVisitante) {
            derrotas++;
          } else {
            empates++;
          }
  
          // Crear una nueva fila para el partido
          var filaPartido = tbody.insertRow();
          
          // Añadir celdas para el partido
          filaPartido.insertCell(0).textContent = local;
          filaPartido.insertCell(1).textContent = puntosLocal;
          filaPartido.insertCell(2).textContent = visitante;
          filaPartido.insertCell(3).textContent = puntosVisitante;
        });
  
        // Añadir celdas para victorias, empates y derrotas en la fila de la jornada
        filaJornada.insertCell(1).textContent = victorias;
        filaJornada.insertCell(2).textContent = derrotas;
        filaJornada.insertCell(3).textContent = empates;
      });
    }
  });
  