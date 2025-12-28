document.getElementById("foto")?.addEventListener("change", function (e) {
  const file = e.target.files[0];
  const preview = document.getElementById("preview");
  const imagePreview = document.getElementById("imagePreview");

  if (file) {
    if (!file.type.match(/image\/(png|jpeg|jpg)/)) {
      alert("Solo se permiten archivos: JPG JPEG y PNG");
      e.target.value = "";
      imagePreview.style.display = "none";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("El archivo que estás intentando subir es demasiado grande.");
      e.target.value = "";
      imagePreview.style.display = "none";
      return;
    }

    // Mostramos el preview
    const reader = new FileReader();
    reader.onload = function (event) {
      preview.src = event.target.result;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.style.display = "none";
  }
});

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const button = this;

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      button.textContent = "o";
    } else {
      passwordInput.type = "password";
      button.textContent = "x";
    }
  });

document.getElementById("correo")?.addEventListener("input", function () {
  const correo = this.value.trim();

  if (correo && !correo.endsWith("@ucm.es")) {
    this.classList.add("is-invalid");
    this.classList.remove("is-valid");
  } else if (correo) {
    this.classList.add("is-valid");
    this.classList.remove("is-invalid");
  } else {
    this.classList.remove("is-invalid", "is-valid");
  }
});
