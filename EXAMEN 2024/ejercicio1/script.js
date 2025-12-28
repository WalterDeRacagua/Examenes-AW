const fontSizeTitle = document.getElementById("fontSizeTitle");
const fontSizeText = document.getElementById("fontSizeText");
const fontColors1 = document.getElementById("fontColors1");
const fontColors2 = document.getElementById("fontColors2");
const colorSecciones = document.getElementById("colorSecciones");
const colorSeccion1 = document.getElementById("colorSeccion1");
const colorSeccion2 = document.getElementById("colorSeccion2");
const colorVisitados = document.getElementById("colorVisitados");
const colorNoVisitados = document.getElementById("colorNoVisitados");
const subrayadoEnlaces = document.getElementById("subrayadoEnlaces");
const colorFondoNavbar = document.getElementById("colorFondoNavbar");
const aplicarConfiguracion = document.getElementById("aplicarConfiguracion");

function obtenerTamanioFuente(valor) {
  switch (valor) {
    case "1":
      return "16px";
    case "2":
      return "18px";
    case "3":
      return "20px";
  }
}

function obtenerColor(valor) {
  switch (valor) {
    case "1":
      return "gray";
    case "2":
      return "black";
    case "3":
      return "white";
  }
}

function obtenerColoresEnlaces() {
  const colorV = obtenerColor(colorVisitados.value);
  const colorNV = obtenerColor(colorNoVisitados.value);
  const underline = subrayadoEnlaces.checked ? "underline" : "none";

  document.querySelectorAll("a").forEach((enlace) => {
    enlace.style.textDecoration = underline;
    if (enlace.classList.contains("visited")) {
      enlace.style.color = colorV || "";
    } else {
      enlace.style.color = colorNV || "";
    }
  });
}

aplicarConfiguracion.addEventListener("click", () => {
  document.querySelectorAll("h1, h2").forEach((titulo) => {
    titulo.style.fontSize = obtenerTamanioFuente(fontSizeTitle.value);
    titulo.style.color = obtenerColor(fontColors1.value);
  });
  document.querySelectorAll("p").forEach((texto) => {
    texto.style.fontSize = obtenerTamanioFuente(fontSizeText.value);
    texto.style.color = obtenerColor(fontColors2.value);
  });
  document.querySelectorAll(".section").forEach((sec) => {
    sec.style.backgroundColor = obtenerColor(colorSecciones.value);
  });
  document.getElementById("section1").style.backgroundColor = obtenerColor(
    colorSeccion1.value
  );
  document.getElementById("section2").style.backgroundColor = obtenerColor(
    colorSeccion2.value
  );
 
  document.querySelector(".barra-navegacion").style.backgroundColor =
    obtenerColor(colorFondoNavbar.value);
});

document.querySelectorAll("a").forEach((enlace) => {
  enlace.addEventListener("click", () => {
    enlace.classList.add("visited");
    obtenerColoresEnlaces();
  });
});

aplicarConfiguracion.addEventListener("click", obtenerColoresEnlaces);
