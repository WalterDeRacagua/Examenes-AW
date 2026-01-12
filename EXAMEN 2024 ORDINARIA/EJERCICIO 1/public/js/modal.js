const DEFAULT = {
    tamImg: "mediano",
    tamTit: "mediano",
    colorGaleria: "blanco",
    colorTexto: "negro"
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
        document.getElementById("tamImg").value = preferencias.tamImg;
        document.getElementById("tamTit").value = preferencias.tamTit;
        document.getElementById("colorGaleria").value = preferencias.colorGaleria;
        document.getElementById("colorTexto").value = preferencias.colorTexto;
    } else{
        document.getElementById("tamImg").value = DEFAULT.tamImg;
        document.getElementById("tamTit").value = DEFAULT.tamTit;
        document.getElementById("colorGaleria").value = DEFAULT.colorGaleria;
        document.getElementById("colorTexto").value = DEFAULT.colorTexto;
    }
}

function configurarEventos() {
    document.getElementById("aplicarCambios").addEventListener("click", function () {
        guardarPreferencias();
    });
     document.getElementById("restablecerCambios").addEventListener("click", function () {
        restablecerPreferencias();
    });

    // Ver cambios en tiempo real
     document.getElementById("tamImg").addEventListener("change", aplicarPreferencias);
     document.getElementById("tamTit").addEventListener("change", aplicarPreferencias);
     document.getElementById("colorGaleria").addEventListener("change", aplicarPreferencias);
     document.getElementById("colorTexto").addEventListener("change", aplicarPreferencias);
}

function guardarPreferencias() {
    const preferencias = {
        tamImg: document.getElementById("tamImg").value,
        tamTit: document.getElementById("tamTit").value,
        colorGaleria: document.getElementById("colorGaleria").value,
        colorTexto: document.getElementById("colorTexto").value
    };

    this.localStorage.setItem("preferencias", JSON.stringify(preferencias));
    
    // Aqui creo que me falta algo
    alert("Se han aplicado correctamente los cambios de configuracion")
}

function restablecerPreferencias() {
    this.localStorage.removeItem("preferencias");

    cargarPreferencias();
    aplicarPreferencias();

    alert("Se han restablecido las preferencias")
}

function aplicarPreferencias() {
    const tamImg = document.getElementById("tamImg").value;
    const tamTit= document.getElementById("tamTit").value;
    const colorGaleria= document.getElementById("colorGaleria").value;
    const colorTexto= document.getElementById("colorTexto").value;

    // Primero aplicamos los cambios al tamaño de imágenes
    const imagenes = document.querySelectorAll("img");
    imagenes.forEach(imagen =>{
        imagen.classList.remove("imagen-pequeno", "imagen-mediano", "imagen-grande");
        imagen.classList.add(`imagen-${tamImg}`);
    });

    // Ahora cambiamos los tamaños y los colores de los titulos (cojo h2).
    const titulos = document.querySelectorAll("h2");
    titulos.forEach(titulo =>{
        titulo.classList.remove("titulo-pequeno", "titulo-mediano","titulo-grande");
        titulo.classList.add(`titulo-${tamTit}`);
         titulo.classList.remove("titulo-blanco", "titulo-negro","titulo-azul");
        titulo.classList.add(`titulo-${colorTexto}`);
    })

    const galeria = document.querySelector("body");
    galeria.classList.remove("galeria-blanco","galeria-gris","galeria-azul");
    galeria.classList.add(`galeria-${colorGaleria}`);

}