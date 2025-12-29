document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calculatorForm");
  const resultDiv = document.getElementById("resultado");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const params = new URLSearchParams(formData).toString();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/calculate", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resultDiv.textContent = "Resultado: " + response.result;
        resultDiv.style.display = "block";
      }
    };

    xhr.send(params);
  });
});
