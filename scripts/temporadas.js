function redirigir() {
    var temporadaSeleccionada = document.getElementById("temporadaSelector").value;

    // Muestra el valor seleccionado en la consola (para propósitos de depuración)
    console.log("Temporada seleccionada:", temporadaSeleccionada);

    // Redirigir según la temporada seleccionada
    switch (temporadaSeleccionada) {
        case "1":
            console.log("Redirigiendo a calendar_t1.xml");
            window.location.href = "../xm_xs/calendar_t1.xml";
            break;
        case "2":
            console.log("Redirigiendo a calendar_t2.xml");
            window.location.href = "../xm_xs/calendar_t2.xml";
            break;
        // Agrega más casos según sea necesario para otras temporadas
        default:
            console.error("Temporada no reconocida");
            break;
    }
}