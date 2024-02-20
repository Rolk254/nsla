document.addEventListener('DOMContentLoaded', function () {
    // Obtener el fragmento de la URL
    var fragment = window.location.hash.substring(1);

    // Verificar si hay un details con el id correspondiente al fragmento
    var detailsElement = document.getElementById(fragment);

    // Si hay un details con el id correspondiente, ábrelo
    if (detailsElement) {
      detailsElement.open = true;
    }
  });