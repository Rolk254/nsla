document.addEventListener("DOMContentLoaded", function () {
    // XML data for clasificacion
    const clasificacionXml = `...`; // Add your clasificacion XML data here

    // Parse XML data
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(clasificacionXml, "application/xml");

    // Extract equipo elements
    const equipos = xmlDoc.querySelectorAll("equipo");

    // Get the tbody element to append rows
    const tbody = document.getElementById("clasificacionBody");

    // Loop through equipos and append rows to the table
    equipos.forEach((equipo) => {
      const row = document.createElement("tr");
      row.className = "celdatabla";

      // Add td elements for each property
      ["nombre", "partidos_jugados", "victorias", "derrotas", "empates", "locales", "visitantes", "puntos_perdidos", "puntos_concedidos"].forEach((prop) => {
        const cell = document.createElement("td");
        cell.textContent = equipo.querySelector(prop).textContent;
        row.appendChild(cell);
      });

      // Append the row to the tbody
      tbody.appendChild(row);
    });
  });