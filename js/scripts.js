// PASO 1: CREO OBJETOS, ARRAY Y VARIABLES GLOBALES
class Producto {
    constructor(titulo, precio, formato, año, stock) {
        this.titulo = titulo;
        this.precio = precio;
        this.formato = formato;
        this.año = año;
        this.stock = stock;
    }
    vendido() {
        // alert("Compra finalizada!")
        return console.log("De " + this.titulo + " ahora quedan disponibles " + --this.stock + " unidades");
    }
    sumarIva() {
        return this.precio = parseFloat((this.precio * 1.21).toFixed(2));
    }
}


let album1 = new Producto("A Hard Day's Night", 1199, "CD", 1964, 5);
let album2 = new Producto("With the Beatles", 990, "CD", 1963, 6);
let album3 = new Producto("Abbey Road", 1299, "CD", 1969, 7);


let carrito = [];
let rePregunta = undefined;
let total = 0;

// PASO 2: MOSTRAR LISTA Y AGREGAR EL PRODUCTO AL CARRITO

function agregarCarrito() {
    let preguntaInicial = parseInt(prompt(`¿Qué álbum te interesa agregar al carrito?\n1 - ${album1.titulo}\n2 - ${album2.titulo}\n3 - ${album3.titulo}`));
    switch (preguntaInicial) {
        case 1:
            return carrito.push(album1)
        case 2:
            return carrito.push(album2)
        case 3:
            return carrito.push(album3)
        default:
            return alert("Opción inválida")
    }

} agregarCarrito()

//PASO 3: PREGUNTAR SI QUIERE AGREGAR OTRO PRODUCTO. SI DICE "SI", MOSTRAR NUEVAMENTE PARA PODER SEGUIR SUMANDO PRODUCTOS
function rePreguntar() {

    rePregunta = prompt("¿Agregar otro producto al carrito?" + "\n" + "SI / NO");
    if ((rePregunta.toUpperCase() == "SI") || (rePregunta.toUpperCase() == "SÍ")) {
        return agregarCarrito();
    }

}
do {
    rePreguntar();
} while (rePregunta.toUpperCase() == "SI" || rePregunta.toUpperCase() == "SÍ");


// PASO 5: MOSTRAR LOS PRODUCTOS AGREGADOS
function mostrarCarrito() {
    // for (const index of carrito) {
    //     alert("Agregó los siguientes productos:\n" + index.titulo);
    // }
    alert("Agregó al carrito los siguientes productos:\n" + carrito.map(e => e.titulo).join("\n"));
} mostrarCarrito()

// PASO 6: SUMAR PRECIOS DE PRODUCTOS AGREGADOS AL CARRITO

function calcularTotal() {

    for (const i of carrito) {
        i.sumarIva();
    }
    for (const i of carrito) {
        total += i.precio;
    }
    return alert("Su total con IVA incluido es $" + total)
}

calcularTotal()

console.log(total)


// PASO 7: CALCULAR CUOTAS Y MOSTRAR POR CONSOLA LA DISMINUCIÓN DEL STOCK DE/LOS DISCOS COMPRADOS

let cantCuotas = parseInt(prompt("¿En cuántas cuotas pagará? Seleccioná una opción\nOPCION 1 - Tres cuotas\nOPCION 2 - Seis cuotas\nOPCION 3 - Doce cuotas"));
switch (cantCuotas) {
    case 1:
        cuotasFinales = total / 3;
        alert("Pagará $" + parseFloat(cuotasFinales.toFixed(2)) + " por mes");
        for (const i of carrito) {
            i.vendido();
        }
        break
    case 2:
        cuotasFinales = total / 6;
        alert("Pagará $" + parseFloat(cuotasFinales.toFixed(2)) + " por mes");
        for (const i of carrito) {
            i.vendido();
        }
        break
    case 3:
        cuotasFinales = total / 12;
        alert("Pagará $" + parseFloat(cuotasFinales.toFixed(2)) + " por mes");
        for (const i of carrito) {
            i.vendido();
        }
        break
    default:
        alert("Opción inválida")
}

// PASO 8: ORDENAR EN CONSOLA EL CARRITO SEGÚN EL PRECIO, DE MENOR A MAYOR

function ordenarPorPrecio() {
    carrito.sort(function (a, b) {
        return a.precio - b.precio;
    });
    console.log(carrito);
} ordenarPorPrecio()


// // También se podría ordenar por el nombre del disco [descomentar el código de abajo y comentar el código de arriba] 
// function ordenarTitulo() {
//     carrito.sort(function (a, b) {
//         if (a.titulo > b.titulo) {
//             return 1;
//         }
//         if (a.titulo < b.titulo) {
//             return -1;
//         }
//         return 0;
//     });
//     console.log(carrito);
// } ordenarTitulo()