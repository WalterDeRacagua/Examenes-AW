document.addEventListener("DOMContentLoaded", function () {
  cargarPreguntas();
  configurarFormulario();
});

function cargarPreguntas() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "/api/preguntas", true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const preguntas = JSON.parse(xhr.responseText);
      pintarPreguntas(preguntas);
    }
  };

  xhr.onerror = () => {
    console.log("Error en la petición de Ajax");
  };

  xhr.send();
}

function pintarPreguntas(preguntas) {
  const contenedorPreguntas = document.getElementById("contenedorPreguntas");
  contenedorPreguntas.innerHTML = "";

  if (preguntas.length === 0) {
    contenedorPreguntas.innerHTML = `
        <p class="text-center display-5">
            No hay ninguna pregunta en la encuesta.
        </p>
    `;
    return;
  }

  preguntas.forEach((pregunta, indexPregunta) => {
    const opcionesHTML = pregunta.opciones
      .map((opcion, indexOpcion) => {
        return `
        <div class="form-check mb-2">
          <input class="form-check-input" 
                 type="radio" 
                 name="pregunta${indexPregunta}" 
                 id="p${indexPregunta}_o${indexOpcion}" 
                 value="${indexOpcion}" 
                 required> 
          <label for="p${indexPregunta}_o${indexOpcion}" class="form-check-label">
            ${opcion.opcion}
          </label>
        </div>
      `;
      })
      .join("");

    // Añadir pregunta completa con sus opciones
    contenedorPreguntas.innerHTML += `
      <div class="mb-4">
        <div class="card-title text-start fw-bold mb-2">
          ${indexPregunta + 1}. ${pregunta.pregunta}
        </div>
        <div class="card-content d-flex flex-column p-3">
          ${opcionesHTML}
        </div>
      </div>
    `;
  });
}

function configurarFormulario() {
  const form = document.getElementById("formEncuesta");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtenemos datos del formulario
    const formData = new FormData(form);
    const params = new URLSearchParams(formData).toString();

    // Enviar con POST de ajax
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/encuesta", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
      if (xhr.status === 200) {
        alert("Resultados enviados correctamente");
        window.location.href = "/resultados";
      } else {
        alert("Error al enviar el formulario")
      }
    };

    xhr.onerror = () => {
      console.log("Ha habido un error de conexión");
    }

    // Parámetros enviados correctamente
    xhr.send(params);
  });
}
