const DEFAULT = {
    tamTitulos: "mediano",
    colorTitulos: "negro",
    colorSecciones: "gris",
    colorSeccion1: "gris",
    colorFooter: "negro",
    colorEnlaces: "blanco",
    subrayadoEnlaces: false,
    colorNavbar: "negro"
}

document.addEventListener("DOMContentLoaded", function () {
    cargarPreferencias();
    configurarEventos();
    aplicarPreferencias();
});

function cargarPreferencias() {
    const preferenciasGuardadas = localStorage.getItem("preferencias");
    if (preferenciasGuardadas) {
        const preferencias = JSON.parse(preferenciasGuardadas);
        document.getElementById("tamTitulos").value = preferencias.tamTitulos;
        document.getElementById("colorTitulos").value = preferencias.colorTitulos;
        document.getElementById("colorSecciones").value =  preferencias.colorSecciones;
        document.getElementById("colorSeccion1").value =  preferencias.colorSeccion1;
        document.getElementById("colorFooter").value =  preferencias.colorFooter;
        document.getElementById("colorEnlaces").value = preferencias.colorEnlaces;
        document.getElementById("subrayadoEnlaces").checked =  preferencias.subrayadoEnlaces;
        document.getElementById("colorNavbar").value =  preferencias.colorNavbar;
    } else {
        document.getElementById("tamTitulos").value = DEFAULT.tamTitulos;
        document.getElementById("colorTitulos").value = DEFAULT.colorTitulos;
        document.getElementById("colorSecciones").value =  DEFAULT.colorSecciones;
        document.getElementById("colorSeccion1").value =  DEFAULT.colorSeccion1;
        document.getElementById("colorFooter").value =  DEFAULT.colorFooter;
        document.getElementById("colorEnlaces").value = DEFAULT.colorEnlaces;
        document.getElementById("subrayadoEnlaces").checked =  DEFAULT.subrayadoEnlaces;
        document.getElementById("colorNavbar").value =  DEFAULT.colorNavbar;
    }
}

function configurarEventos() {
    document.getElementById("aplicarConfiguracion").addEventListener("click", function () {
        guardarPreferencias();
    });
    document.getElementById("restablecerConfiguracion").addEventListener("click", function () {
        restablecerPreferencias();
    });

    // Para que se apliquen en tiempo real
        document.getElementById("tamTitulos").addEventListener("change", aplicarPreferencias);
        document.getElementById("colorTitulos").addEventListener("change", aplicarPreferencias);
        document.getElementById("colorSecciones").addEventListener("change", aplicarPreferencias);
        document.getElementById("colorSeccion1").addEventListener("change", aplicarPreferencias);
        document.getElementById("colorFooter").addEventListener("change", aplicarPreferencias);
        document.getElementById("colorEnlaces").addEventListener("change", aplicarPreferencias);
        document.getElementById("subrayadoEnlaces").addEventListener("change", aplicarPreferencias);
        document.getElementById("colorNavbar").addEventListener("change", aplicarPreferencias);
}

function guardarPreferencias() {
    const preferencias = {
        tamTitulos:  document.getElementById("tamTitulos").value,
        colorTitulos:  document.getElementById("colorTitulos").value,
        colorSecciones:  document.getElementById("colorSecciones").value,
        colorSeccion1:  document.getElementById("colorSeccion1").value,
        colorFooter:  document.getElementById("colorFooter").value,
        colorEnlaces:  document.getElementById("colorEnlaces").value,
        subrayadoEnlaces:  document.getElementById("subrayadoEnlaces").checked ? true : false,
        colorNavbar:  document.getElementById("colorNavbar").value
    }


    this.localStorage.setItem("preferencias", JSON.stringify(preferencias));

    alert("Se han guardado las preferencias correctamente ")
}

function restablecerPreferencias() {
    this.localStorage.removeItem("preferencias");

    cargarPreferencias();

    aplicarPreferencias();

    alert("La configuración se ha restablecido")

}
function aplicarPreferencias() {
    const tamTitulos = document.getElementById("tamTitulos").value;
    const colorTitulos = document.getElementById("colorTitulos").value;
    const colorSecciones= document.getElementById("colorSecciones").value;
    const colorSeccion1 =  document.getElementById("colorSeccion1").value;
    const colorFooter =    document.getElementById("colorFooter").value;
    const colorEnlaces =    document.getElementById("colorEnlaces").value;
    const subrayadoEnlaces =    document.getElementById("subrayadoEnlaces").checked ? true: false;
    const colorNavbar =  document.getElementById("colorNavbar").value;

    // Cambiamos los tamaños y colores titulos
    const titulos = document.querySelectorAll("h1");
    titulos.forEach(titulo => {
        titulo.classList.remove('titulo-pequeno','titulo-mediano', 'titulo-grande');
        titulo.classList.add(`titulo-${tamTitulos}`);
        // Colores
        titulo.classList.remove('titulo-blanco','titulo-negro', 'titulo-azul');
        titulo.classList.add(`titulo-${colorTitulos}`);
    });
    // Cambiamos los colores de ambas secciones
    const secciones = document.querySelectorAll(".seccion");
    secciones.forEach(seccion => {
        seccion.classList.remove("seccion-blanco","seccion-gris", "seccion-negro");
        seccion.classList.add(`seccion-${colorSecciones}`);
    });

     // Cambiamos los colores de la seccion 1
    const seccion1 = document.querySelector(".seccion-1");
    seccion1.classList.remove("seccion1-blanco","seccion1-gris", "seccion1-negro");
    seccion1.classList.add(`seccion1-${colorSeccion1}`);


    // cambiamos el color del footer
    const footer = document.querySelector("footer");
    footer.classList.remove("footer-blanco", "footer-negro", "footer-azul");
    footer.classList.add(`footer-${colorFooter}`);

    const enlaces = document.querySelectorAll("a");
    enlaces.forEach(enlace => {
        enlace.classList.remove("enlace-subrayado", "enlace-no-subrayado");
        if (subrayadoEnlaces) {
            enlace.classList.add("enlace-subrayado");
        } else {
            enlace.classList.add("enlace-no-subrayado");
        }

        enlace.classList.remove("enlace-blanco", "enlace-negro", "enlace-azul");
        enlace.classList.add(`enlace-${colorEnlaces}`);
    })
}
