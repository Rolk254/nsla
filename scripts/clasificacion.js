const equiposData = [
    { nombre: 'Cardinals', partidos_jugados: 10, victorias: 7, derrotas: 3, empates: 0, locales: 5, visitantes: 5, puntos_perdidos: 20, puntos_concedidos: 15 },
    // Agrega más datos de equipos según sea necesario
  ];

  // Función para agregar una fila a la tabla
  function agregarFilaEquipo(equipo, indice) {
    const tablaBody = document.getElementById('tablaBody');
    const fila = document.createElement('tr');
    fila.classList.add('celdatabla');

    const celda = document.createElement('td');
    celda.classList.add('columnatabla');
    celda.innerHTML = `<img src="../imagenes/otras/logosequipos/${equipo.nombre}.png" alt="Logo" width="30px"/> ${equipo.nombre}`;
    fila.appendChild(celda);

    // Agrega otras celdas según sea necesario
    // Ejemplo:
    const columnas = ['partidos_jugados', 'victorias', 'derrotas', 'empates', 'locales', 'visitantes', 'puntos_perdidos', 'puntos_concedidos'];
    columnas.forEach(columna => {
      const celda = document.createElement('td');
      celda.textContent = equipo[columna];
      fila.appendChild(celda);
    });

    tablaBody.appendChild(fila);
  }

  // Ordena los equipos por victorias y puntos
  equiposData.sort((a, b) => {
    if (a.victorias !== b.victorias) {
      return b.victorias - a.victorias;
    } else {
      return (b.puntos_perdidos + b.puntos_concedidos) - (a.puntos_perdidos + a.puntos_concedidos);
    }
  });

  // Agrega las filas a la tabla
  equiposData.forEach((equipo, indice) => {
    agregarFilaEquipo(equipo, indice + 1);
  });