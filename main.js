const year = document.getElementById('year');
const semblanza = document.getElementById('semblanzaTitulo');
const leerContenido = document.getElementById('leerContenido');
const btnMostrarOcultar = document.getElementById('btnMostrarOcultar');
const forms = document.querySelectorAll('.needs-validation');
const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');
const mensaje = document.getElementById('mensaje');
const politicas = document.getElementById('politicas');
const secureToken = "b68fdc73-bb4f-4596-9cee-3567be94d4b4";
const correoDestinatario = "naluracusbo@gmail.com"
const celularDestinatario  = "tel:+525525584098"
const mensajeWhatsapp = "https://wa.link/w1biih"

/*Enviar correo de contacto*/
function enviarMensaje(){
  btnEnvio.innerText = "Enviando...";
  Email.send({
      SecureToken : secureToken,
      To : correoDestinatario,
      From : correo.value,
      Subject : "Psicoterapia Solicitud de información",
      Body : `
          ${mensaje.value}<br/><br/>
          <strong>Datos de contacto:</strong><br/>
          <strong>Nombre: </strong>${nombre.value}<br/>
          <strong>Correo: </strong>${correo.value}<br/>
          <strong>Teléfono: </strong>${telefono.value}
      `
  }).then(message => {
          if (message === "OK") {
              console.log(message);
              btnEnvio.innerText = "Enviar"
              nombre.value = "";
              correo.value = "";
              telefono.value = "";
              mensaje.value = "";
              politicas.checked = false;
              /*Estilo modal contacto envio exitoso*/
              Swal.fire({
                icon: "success",
                title: "Su correo se envío con éxito",
              });
          } else {
              throw new Error(message);
          }
      }
  ).catch(error => {
          console.error("Error: ", error.message);
          btnEnvio.innerText = "Enviar"
          /*Estilo modal contacto envio fallido*/
          Swal.fire({
            icon: "error",
            title: "Algo salió mal",
            text: "Intente nuevamente más tarde"
          });
      }
  );
}

/*Validación de Bootstrap para formulario*/
Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      enviarMensaje();
    } else {
      form.classList.add('was-validated');
    }
  }, false);
});

let enviarWhatsapp = () => {
  const newWindowWhatsapp = window.open(mensajeWhatsapp, '_blank');
    if (newWindowWhatsapp) {
      newWindowWhatsapp.opener = null;
      newWindowWhatsapp.rel = "noopener noreferrer";
    }
};

let llamar = () => {
  const newWindowCel = window.open(celularDestinatario, '_blank');
    if (newWindowCel) {
      newWindowCel.opener = null;
      newWindowCel.rel = "noopener noreferrer";
    }
};
let irSeccionContacto = () => window.location.href = 'index.html#contacto';
let irSeccionSemblanza = () => window.location.href = 'index.html#semblanza';


window.addEventListener('load', () => {year.innerText = new Date().getFullYear();});

/*Botón "Leer más/menos*/
btnMostrarOcultar.addEventListener('click', function () {
  console.log("click");

  if (leerContenido.hidden) {
    leerContenido.hidden = false;
    btnMostrarOcultar.innerText = "Leer menos..."
  } else {
    leerContenido.hidden = true;
    btnMostrarOcultar.innerText = "Leer más..."
    semblanza.focus();
  }
});