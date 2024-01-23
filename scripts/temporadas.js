    // Recuperar la opción seleccionada almacenada en localStorage
    var seleccionGuardada = localStorage.getItem("seleccionPagina");
    if (seleccionGuardada) {
        document.getElementById("seleccionarPagina").value = seleccionGuardada;
    }

    function irAPaginaSeleccionada() {
        // Obtener el valor seleccionado en el select
        var seleccion = document.getElementById("seleccionarPagina").value;
        
        // Guardar la opción seleccionada en localStorage
        localStorage.setItem("seleccionPagina", seleccion);

        // Cambiar a la página seleccionada
        window.location.href = seleccion;
    }