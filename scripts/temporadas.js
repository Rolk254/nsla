function redirigir() {
    var temporadaSeleccionada = document.getElementById("temporadaSelector").value;

    // Redirigir según la temporada seleccionada
    switch (temporadaSeleccionada) {
        case "1":
            window.location.href = "../xm_xs/calendar_t1.xml";
            break;
        case "2":
            window.location.href = "../xm_xs/calendar_t2.xml";
            break;
        // Agrega más casos según sea necesario para otras temporadas
        default:
            break;
    }
}