let btnMostrarOcultar = document.getElementById('btnMostrarOcultar');
let leerContenido = document.getElementById('leerContenido');

btnMostrarOcultar.addEventListener('click', function () {
  console.log("click");

  if (leerContenido.hidden) {
    leerContenido.hidden = false;
    btnMostrarOcultar.innerText = "Leer menos..."
  } else {
    leerContenido.hidden = true;
    btnMostrarOcultar.innerText = "Leer más..."
  }
});