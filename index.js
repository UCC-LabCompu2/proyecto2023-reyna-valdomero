const txtMedida = document.getElementById("medida");
const botonCalcular = document.getElementById("boton");
const txtResultado = document.getElementById("resultado");
const canvas = document.getElementById("miCanvas");
const contexto = canvas.getContext("2d");

let animacionEnMarcha = false; // VARIABLE QUE FUNCIONA PARA SABER SI ES LA PRIMERA VEZ QUE SE ANIMA
let intervaloAnimacion; // Variable para almacenar el intervalo de la animación

botonCalcular.addEventListener("click", validar);

function validar() {
  const medida = parseInt(txtMedida.value); // Pasa de STRING a INT
  if (medida < 80 || medida > 125) {
    alert("Los datos ingresados son incorrectos");
    detenerAnimacion();
  } else if (medida >= 80 && medida <= 91) {
    calcular(1); // SWITCH 1
  } else if (medida > 91 && medida <= 99) {
    calcular(2); // SWITCH 2
  } else if (medida > 99 && medida <= 107) {
    calcular(3); // SWITCH 3
  } else if (medida > 107 && medida <= 115) {
    calcular(4); // SWITCH 4
  } else if (medida > 115 && medida <= 125) {
    calcular(5); // SWITCH 5
  } else {
    alert("Por favor rellene el campo vacío con una medida entre 80 y 125cm");
    detenerAnimacion();
  }
}

function detenerAnimacion() {
  animacionEnMarcha = false; // Marca que la animación está detenida
  clearInterval(intervaloAnimacion); // Detiene el intervalo de animación
  contexto.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
  xPos = 0; // Reinicia la posición horizontal
  txtMedida.value = ""; // Blanquea el valor del input
}

function calcular(operacion) {
  const medida = parseInt(txtMedida.value); //PASA DE STRING A INT
  let resultado;
  switch (operacion) {
    case 1:
      resultado = "S";
      break;
    case 2:
      resultado = "M";
      break;
    case 3:
      resultado = "L";
      break;
    case 4:
      resultado = "XL";
      break;
    case 5:
      resultado = "XXL";
      break;
  }
  txtResultado.innerText = "Talle " + resultado; //DE ESTA FORMA SOBREESCRIBO LO QUE TIENE LA ETIQUETA P QUE DESPUES ME SIRVE PARA PONER LO MISMO EN EL CANVAS

  if (!animacionEnMarcha) {
    //VERIFICA SI LA ANIMACION YA ARRANCO
    animacionEnMarcha = true; //MARCA QUE LA ANIMACION YA ARRANCO
    animar();
  }
}

function animar() {
  let xPos = 0; //POSICION HORIZONTAL
  const velocidad = 1.3; //VELOCIDAD DE LA ANIMACION

  function dibujar() {
    contexto.clearRect(0, 0, canvas.width, canvas.height); //LIMPIA EL CANVAS

    contexto.font = "bold 12px Arial"; //LE DOY LA FUENTE Y EL TAMANIO AL TEXTO DEL CANVAS

    contexto.fillStyle = "white"; //COLOR DEL TEXTO DEL CANVAS
    contexto.fillText(txtResultado.innerText, xPos, 100); //ESTA FUNCION LO QUE HACE ES REPLICAR LO QUE TENGO EN MI ETIQUETA <p> EN EL TEXTO DEL CANVAS

    xPos += velocidad; //ACTUALIZA LA POSICION HORIZONTAL DE LA ANIMACION RESPECTO A LA VELOCIDAD
    if (xPos > canvas.width) {
      //SI LA POSICION DEL TXT EN EL CANVAS ES MAYOR AL ANCHO DEL CANVAS
      xPos = -contexto.measureText("TALLE " + txtResultado.innerText).width; //REINICIO LA POSICION DEL CANVAS
    }
  }

  intervaloAnimacion = setInterval(dibujar, 1000 / 60); //ESTA FUNCION DETERMINA CUANTAS VECES SE ACTUALIZA EL CANVAS POR SEGUNDO
}

function volver() {
  window.location.href = "./index.html";
}
