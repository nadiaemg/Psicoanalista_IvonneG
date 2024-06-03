const year = document.getElementById('year');
const semblanza = document.getElementById('semblanzaTitulo');
const leerContenido = document.getElementById('leerContenido');
const btnMostrarOcultar = document.getElementById('btnMostrarOcultar');
const btnContacto = document.getElementById('btnContacto');
const btnSemblanza = document.getElementById('btnSemblanza');
const forms = document.querySelectorAll('.needs-validation');
const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');
const mensaje = document.getElementById('mensaje');
const politicas = document.getElementById('politicas');
const secureToken = "b68fdc73-bb4f-4596-9cee-3567be94d4b4";
const correoDestinatario = "naluracusbo@gmail.com"
const celularDestinatario  = "tel:+525525584098"
const mensajeWhatsapp = "https://api.whatsapp.com/send?phone=5215525584098&text=Hola%20Ivonne%2C%20%C2%BFme%20podr%C3%ADas%20proporcionar%20m%C3%A1s%20informaci%C3%B3n%20para%20agendar%20una%20sesi%C3%B3n%20de%20psicoterapia%3F"

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

let enviarWhatsapp = () => window.location.href = mensajeWhatsapp;
let llamar = () => window.open(celularDestinatario);

window.addEventListener('load', () => {year.innerText = new Date().getFullYear();});
btnContacto.addEventListener("click", () => {window.location.href = './index.html#contacto'});
btnSemblanza.addEventListener("click", () => {window.location.href = './index.html#semblanza'});

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