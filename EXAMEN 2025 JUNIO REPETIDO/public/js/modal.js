const DEFAULT ={
    colEnc: 'verde',
    colNav: 'negro',
    colLink: "azul",   
}

document.addEventListener("DOMContentLoaded", function () {
    cargarPreferencias();
    configurarEventos();
    aplicarPreferencias();
});

function cargarPreferencias() {
    const preferenciasGuardadas = localStorage.getItem("preferencias");

    const preferencias = preferenciasGuardadas ? {...DEFAULT, ...JSON.parse(preferenciasGuardadas)}: DEFAULT;

    document.getElementById("colEnc").value = preferencias.colEnc;
    document.getElementById("colNav").value = preferencias.colNav;
    document.getElementById("colLink").value = preferencias.colLink;
}

function configurarEventos() {
    document.getElementById("aplicarConfiguracion").addEventListener("click", function () {
        guardarPreferencias();
    });
        document.getElementById("restaurarConfiguracion").addEventListener("click", function () {
        restaurarPreferencias();
    });

    document.getElementById("colEnc").addEventListener("change", aplicarPreferencias);
    document.getElementById("colNav").addEventListener("change", aplicarPreferencias);
    document.getElementById("colLink").addEventListener("change", aplicarPreferencias);
}

function guardarPreferencias() {
    const preferencias = {
        colEnc: document.getElementById("colEnc").value,
        colNav: document.getElementById("colNav").value,
        colLink: document.getElementById("colLink").value, 
    }

    localStorage.setItem("preferencias", JSON.stringify(preferencias));

    alert("Las preferencias han sido guardadas correctamente");
}

function restaurarPreferencias() {
    localStorage.removeItem("preferencias");

    cargarPreferencias();
    
    aplicarPreferencias();

    alert("Las preferencias se han restaurado");
}

function aplicarPreferencias() {
    const colEnc = document.getElementById("colEnc").value;
    const colNav = document.getElementById("colNav").value;
    const colLink = document.getElementById("colLink").value;

    // Cambiamos el encabezado
    const encabezado = document.getElementById("examen");
    if (encabezado) {
        encabezado.classList.remove("encabezado-negro", "encabezado-verde", "encabezado-azul");
        encabezado.classList.add(`encabezado-${colEnc}`);
    }

    const nav = document.getElementById("navExamen");
    if (nav) {
    
        nav.classList.remove("nav-negro", "nav-verde", "nav-blanco");
        nav.classList.add(`nav-${colNav}`);
    }

    const links = document.querySelectorAll(".nav-link");
    links.forEach(link =>{
        link.classList.remove("link-azul","link-rojo", "link-amarillo");
        link.classList.add(`link-${colLink}`);
    })
}