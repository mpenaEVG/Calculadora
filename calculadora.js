'use strict'

let pantalla = document.getElementById("pantalla");
let operadorActual = "";
let numeroAnterior = "";
let nuevaEntrada = true;
let anteriorResultado = "";

// Función para insertar número
function insertarNumero(num) {
    if (pantalla.textContent === "0" || nuevaEntrada) {
        pantalla.textContent = num;
        nuevaEntrada = false;
    } else {
        pantalla.textContent += num;
    }
}

// Función para insertar operación
function insertarOperacion(op) {
    if (operadorActual && !nuevaEntrada) {
        calcularResultado();
    }
    
    operadorActual = op;
    numeroAnterior = pantalla.textContent;
    nuevaEntrada = true;
}

// Función para calcular el resultado
function calcularResultado() {
    if (!operadorActual) return;

    const numActual = parseFloat(pantalla.textContent);
    const numAnterior = parseFloat(numeroAnterior);
    let resultado;

    switch (operadorActual) {
        case "+":
            resultado = numAnterior + numActual;
            break;
        case "-":
            resultado = numAnterior - numActual;
            break;
        case "*":
            resultado = numAnterior * numActual;
            break;
        case "/":
            resultado = numActual !== 0 ? numAnterior / numActual : "Error";
            break;
        case "%":
            resultado = numActual / 100;
            break;
        case "sqrt":
            resultado = Math.sqrt(numActual);
            break;
    }

    pantalla.textContent = resultado;
    operadorActual = "";
    nuevaEntrada = true;
}

// Función para limpiar la pantalla
function limpiarPantalla() {
    pantalla.textContent = "0";
    operadorActual = "";
    numeroAnterior = "";
    nuevaEntrada = true;
}

// Captura todos los clics de los botones
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("name");
        const value = button.getAttribute("value");

        if (name === "numero") {
            insertarNumero(value);
        } else if (name === "operacion") {
            if (value === "resultado") {
                calcularResultado();
            } else if (value === "C") {
                limpiarPantalla();
            } else {
                insertarOperacion(value);
            }
        } else if (name === "lastanswer") {
            
            insertarNumero(anteriorResultado);
        }
    });
});

