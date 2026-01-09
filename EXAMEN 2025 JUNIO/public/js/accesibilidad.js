const DEFAULTS= {
    colorEncabezado: "negro",
    colorNavbar: "negro",
    colorEnlaces: "blanco",
    tamTexto: "mediano",
};

document.addEventListener("DOMContentLoaded" , function () {
    cargarPreferencias();
    configurarEventos();
    aplicarPreferencias();
});

function cargarPreferencias() {
    const preferenciasGuardadas = localStorage.getItem("preferencias");
    if (preferenciasGuardadas) {
        const preferencias = JSON.parse(preferenciasGuardadas);
        document.getElementById("colorEncabezado").value = preferencias.colorEncabezado;
        document.getElementById("colorNavbar").value = preferencias.colorNavbar;
        document.getElementById("colorEnlaces").value = preferencias.colorEnlaces;
        document.getElementById("tamTexto").value = preferencias.tamTexto;
    } else {
         document.getElementById("colorEncabezado").value = DEFAULTS.colorEncabezado;
        document.getElementById("colorNavbar").value = DEFAULTS.colorNavbar;
        document.getElementById("colorEnlaces").value = DEFAULTS.colorEnlaces;
        document.getElementById("tamTexto").value = DEFAULTS.tamTexto;
    }
}

function cargarPreferencias() {
    // Esto no lo pide pero es para acordarnos
    const preferenciasGuardadas = localStorage.getItem("preferencias");

    // Si hay guardadas preferencias
    if (preferenciasGuardadas) {
        const preferencias = JSON.parse(preferenciasGuardadas);
        document.getElementById("colorEncabezado").value = preferencias.colorEncabezado;
        document.getElementById("colorNavbar").value = preferencias.colorNavbar;
        document.getElementById("colorEnlaces").value = preferencias.colorEnlaces;
        document.getElementById("tamTexto").value = preferencias.tamTexto;
    } else {
         document.getElementById("colorEncabezado").value = DEFAULTS.colorEncabezado;
        document.getElementById("colorNavbar").value = DEFAULTS.colorNavbar;
        document.getElementById("colorEnlaces").value = DEFAULTS.colorEnlaces;
        document.getElementById("tamTexto").value = DEFAULTS.tamTexto;
    }
}

function configurarEventos(){
    document.getElementById("aplicarAccesibilidad").addEventListener("click", function () {
        // Función que guardará en localstorage la información
        guardarPreferencias();
    });

    document.getElementById("restaurarAccesibilidad").addEventListener("click", function () {
        restaurarPreferencias();
    });

    //Permitimos ver cambios en tiempo real
    document.getElementById("colorEncabezado").addEventListener("change", aplicarPreferencias);
    document.getElementById("colorNavbar").addEventListener("change", aplicarPreferencias);
    document.getElementById("colorEnlaces").addEventListener("change",aplicarPreferencias );
    document.getElementById("tamTexto").addEventListener("change",aplicarPreferencias );
}

function guardarPreferencias() {
    const preferencias = {
    colorEncabezado: document.getElementById("colorEncabezado").value,
    colorNavbar: document.getElementById("colorNavbar").value,
    colorEnlaces: document.getElementById("colorEnlaces").value,
    tamTexto: document.getElementById("tamTexto").value,
    };

    localStorage.setItem("preferencias", JSON.stringify(preferencias));
    // Aplicamos las nuevas preferencias

    alert("Las preferencias han sido guardadas en localStorage (no hacía falta).")
}

function restaurarPreferencias() {
    localStorage.removeItem("preferencias");

    cargarPreferencias();

    aplicarPreferencias();
    alert("Las preferencias han sido restauradas.")
}

function aplicarPreferencias() {
    const colorEncabezado = document.getElementById("colorEncabezado").value;
    const colorNavbar = document.getElementById("colorNavbar").value;
    const colorEnlaces =  document.getElementById("colorEnlaces").value;
    const tamTexto = document.getElementById("tamTexto").value;


    // Color encabezado
    const encabezado = document.getElementById("encabezado");
    
    encabezado.classList.remove("encabezado-negro","encabezado-blanco","encabezado-azul");
    encabezado.classList.add(`encabezado-${colorEncabezado}`);


    // Color navbar
    const navExamen = document.getElementById("navExamen");

    navExamen.classList.remove("navbar-negro", "navbar-blanco" , "navbar-azul");
    navExamen.classList.add(`navbar-${colorNavbar}`);

    // Color enlaces
    const enlaces = document.querySelectorAll(".nav-link");

    enlaces.forEach(enlace =>{
        enlace.classList.remove("enlace-negro", "enlace-blanco" , "enlace-azul");
        enlace.classList.add(`enlace-${colorEnlaces}`);
    });
    

    // Tamaño de texto que cambie solo los h2
    const texto = document.querySelectorAll("h2");

    texto.forEach(h2 =>{
        h2.classList.remove("texto-pequeno", "texto-mediano", "texto-grande");
        h2.classList.add(`texto-${tamTexto}`);
    });
}

