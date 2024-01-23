function redirigir() {
    var temporadaSeleccionada = document.getElementById("temporadaSelector").value;

    // Redirigir según la temporada seleccionada
    switch (temporadaSeleccionada) {
        case "1":
            console.log("Redirigiendo a calendar_t1.xml");
            window.location.href = "calendar_t1.xml";
            break;
        case "2":
            console.log("Redirigiendo a calendar_t2.xml");
            window.location.href = "calendar_t2.xml";
            break;
        case "3":
            console.log("Redirigiendo a calendar_t2.xml");
            window.location.href = "../index.html";
            break;
        // Agrega más casos según sea necesario para otras temporadas
        default:
            console.error("Temporada no reconocida");
            break;
    }

    // Agregar una demora antes de restablecer el valor del select
    setTimeout(function() {
        // Restablecer el valor del select para que el evento onchange se active nuevamente
        document.getElementById("temporadaSelector").value = "0";  // Cambia "0" al valor predeterminado
    }, 100); // Puedes ajustar el tiempo de demora según sea necesario
}
