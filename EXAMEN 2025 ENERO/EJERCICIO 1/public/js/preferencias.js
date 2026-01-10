const DEFAULT = {
    tamImg: "mediano",
    tamTitulos: "mediano",
    colorFondo: "blanco"
};

document.addEventListener("DOMContentLoaded", function () {
    cargarPreferencias();
    configurarEventos();
    aplicarPreferencias()
});

function cargarPreferencias() {
    const preferenciasGuardadas = localStorage.getItem("preferencias");
    if (preferenciasGuardadas) {
        const preferencias = JSON.parse(preferenciasGuardadas);
        document.getElementById("tamImg").value = preferencias.tamImg;
        document.getElementById("tamTitulos").value = preferencias.tamTitulos;
        document.getElementById("colorFondo").value = preferencias.colorFondo;
    } else {
        document.getElementById("tamImg").value = DEFAULT.tamImg;
        document.getElementById("tamTitulos").value = DEFAULT.tamTitulos;
        document.getElementById("colorFondo").value = DEFAULT.colorFondo;
    }
}

function configurarEventos() {
    document.getElementById("botonAplicar").addEventListener("click", function () {
        guardarPreferencias();
    });
    document.getElementById("botonRestaurar").addEventListener("click", function () {
        restaurarPreferencias();
    });

    // Para que se reflejen los cambios
    document.getElementById("tamImg").addEventListener("change", aplicarPreferencias);
    document.getElementById("tamTitulos").addEventListener("change", aplicarPreferencias);
    document.getElementById("colorFondo").addEventListener("change", aplicarPreferencias);
}

function guardarPreferencias() {
    const preferencias = {
        tamImg: document.getElementById("tamImg").value,
        tamTitulos: document.getElementById("tamTitulos").value,
        colorFondo: document.getElementById("colorFondo").value
    }

    this.localStorage.setItem("preferencias", JSON.stringify(preferencias));
    alert("Preferencias guardadas en localStorage");
}

function restaurarPreferencias() {
    this.localStorage.removeItem("preferencias");

    cargarPreferencias();

    aplicarPreferencias();

    alert("Se han restaurado las preferencias correctamente");
}

function aplicarPreferencias() {
        const tamImg = document.getElementById("tamImg").value;
        const tamTitulos =document.getElementById("tamTitulos").value;
        const colorFondo = document.getElementById("colorFondo").value;

        // Cambio de tamaño imagenes
        const imagenes = document.querySelectorAll(".image-card");
        imagenes.forEach(imagen => {
            imagen.classList.remove("imagen-pequeno", "imagen-mediano", "imagen-grande");
            imagen.classList.add(`imagen-${tamImg}`);
        });

         // Cambio de tamaño títulos
        const titulos = document.querySelectorAll(".title-card");
        titulos.forEach(titulo => {
            titulo.classList.remove("titulo-pequeno", "titulo-mediano", "titulo-grande");
            titulo.classList.add(`titulo-${tamTitulos}`);
        });


        // Cambio de color para fondo
        const body = document.querySelector("body");
        body.classList.remove("fondo-blanco", "fondo-negro", "fondo-azul");
        body.classList.add(`fondo-${colorFondo}`);


}