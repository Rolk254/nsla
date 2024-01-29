const partidosData = [
    { local: 'Cardinals', visitante: 'Cowboys', puntos_local: 25, puntos_visitante: 45 },
    { local: 'Raiders', visitante: 'Steelers', puntos_local: 20, puntos_visitante: 35 },
    { local: 'Bengals', visitante: 'Rams', puntos_local: 40, puntos_visitante: 30 },
    // Agrega más datos de partidos según sea necesario
  ];

  // Inicialización de datos de equipos con valores predeterminados
  const equiposData = partidosData.reduce((equipos, partido) => {
    if (!equipos.find(equipo => equipo.nombre === partido.local)) {
      equipos.push({ nombre: partido.local, partidos_jugados: 0, victorias: 0, derrotas: 0, empates: 0, locales: 0, visitantes: 0, puntos_perdidos: 0, puntos_concedidos: 0 });
    }
    if (!equipos.find(equipo => equipo.nombre === partido.visitante)) {
      equipos.push({ nombre: partido.visitante, partidos_jugados: 0, victorias: 0, derrotas: 0, empates: 0, locales: 0, visitantes: 0, puntos_perdidos: 0, puntos_concedidos: 0 });
    }
    return equipos;
  }, []);

  // Actualización de datos de equipos con resultados de partidos
  partidosData.forEach(partido => {
    const equipoLocal = equiposData.find(equipo => equipo.nombre === partido.local);
    const equipoVisitante = equiposData.find(equipo => equipo.nombre === partido.visitante);

    equipoLocal.partidos_jugados += 1;
    equipoVisitante.partidos_jugados += 1;

    equipoLocal.puntos_perdidos += partido.puntos_local;
    equipoVisitante.puntos_perdidos += partido.puntos_visitante;

    equipoLocal.puntos_concedidos += partido.puntos_visitante;
    equipoVisitante.puntos_concedidos += partido.puntos_local;

    if (partido.puntos_local > partido.puntos_visitante) {
      equipoLocal.victorias += 1;
      equipoVisitante.derrotas += 1;
    } else if (partido.puntos_local < partido.puntos_visitante) {
      equipoVisitante.victorias += 1;
      equipoLocal.derrotas += 1;
    } else {
      equipoLocal.empates += 1;
      equipoVisitante.empates += 1;
    }

    if (partido.local === partido.visitante) {
      equipoLocal.locales += 1;
      equipoVisitante.visitantes += 1;
    }
  });

  // Función para agregar una fila de equipo a la tabla
  function agregarFilaEquipo(equipo, indice) {
    const tablaBody = document.getElementById('tablaBody');
    const fila = document.createElement('tr');
    fila.classList.add('celdatabla');

    const celda = document.createElement('td');
    celda.classList.add('columnatabla');
    celda.innerHTML = `<img src="../imagenes/otras/logosequipos/${equipo.nombre}.png" alt="Logo" width="30px"/> ${equipo.nombre}`;
    fila.appendChild(celda);

    const columnas = ['partidos_jugados', 'victorias', 'derrotas', 'empates', 'locales', 'visitantes', 'puntos_perdidos', 'puntos_concedidos'];
    columnas.forEach(columna => {
      const celda = document.createElement('td');
      celda.textContent = equipo[columna];
      fila.appendChild(celda);
    });

    tablaBody.appendChild(fila);
  }

  // Ordenar equipos por victorias y puntos
  equiposData.sort((a, b) => {
    if (a.victorias !== b.victorias) {
      return b.victorias - a.victorias;
    } else {
      return (b.puntos_perdidos + b.puntos_concedidos) - (a.puntos_perdidos + a.puntos_concedidos);
    }
  });

  // Agregar filas de equipos a la tabla
  equiposData.forEach((equipo, indice) => {
    agregarFilaEquipo(equipo, indice + 1);
  });