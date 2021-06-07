// OBJETOS

// Hago el prototipo de los productos y le agrego un método que descuente una unidad de stock cuando haya una venta y otro que sume el Iva
class Producto {
    constructor(titulo, precio, formato, año, stock) {
        this.titulo = titulo;
        this.precio = precio;
        this.formato = formato;
        this.año = año;
        this.stock = stock;

    }
    vendido() {
        alert("Compra finalizada!")
        return alert("Ahora quedan disponibles " + --this.stock + " unidades");
    }
    sumarIva() {
        return this.precio = this.precio * 1.21;
    }
}

// Creo tres CDs

let album1 = new Producto("A Hard Day's Night", 1190, "CD", 1964, 5);
let album2 = new Producto("With the Beatles", 990, "CD", 1963, 5);
let album3 = new Producto("Abbey Road", 1290, "CD", 1969, 5);



// FUNCIONES

// el usuario elige qué disco está interesado en comprar, se le muestra el precio de lista y a continuación el precio total con IVA
let eleccion = () => {
    respuesta = parseInt(prompt(`¿Qué álbum te interesa?\n1 - ${album1.titulo}\n2 - ${album2.titulo}\n3 - ${album3.titulo}`));
    switch (respuesta) {
        case 1:
            alert("Cuesta " + "$" + album1.precio);
            alert("El precio con Iva es " + album1.sumarIva());
            compraAceptada = prompt("SI para comprar / NO para regresar");
            condicional();
            break
        case 2:
            alert("Cuesta " + "$" + album2.precio);
            alert("El precio con Iva es " + album2.sumarIva());
            compraAceptada = prompt("SI para comprar / NO para regresar");
            condicional();
            break
        case 3:
            alert("Cuesta " + "$" + album3.precio);
            alert("El precio con Iva es " + album3.sumarIva());
            compraAceptada = prompt("SI para comprar / NO para regresar");
            condicional();
            break
        default:
            alert("Opción inválida")
    }
}

// funcion para que el usuario acepte o no comprar el CD
function condicional() {
    if (compraAceptada == "SI" || compraAceptada == "si" || compraAceptada == "sí") {
        return cuotas();

    } else if (compraAceptada == "NO" || compraAceptada == "no") {
        alert("Quizá la próxima...")
        return eleccion();
    } else {
        alert("Opción inválida")
    }
}
//funcion para que el usuario eliga las cuotas
function cantCuotas() {
    return parseInt(prompt("¿En cuántas cuotas? Seleccioná una opción\nOPCION 1 - 3 cuotas\nOPCION 2 - 6 cuotas\nOPCION 3 - 12 cuotas"));
}


// dependiendo del CD seleccionado, se eligen las cuotas y se calcula el valor que hay que pagar por mes. Con la compra consumada, se descuenta 1 al stock
function cuotas() {
    if (respuesta == 1) {

        switch (cantCuotas()) {
            case 1:
                cuotasFinales = album1.precio / 3;
                alert("Pagará " + cuotasFinales + " por mes");
                album1.vendido()
                break
            case 2:
                cuotasFinales = album1.precio / 6;
                alert("Pagará " + cuotasFinales + " por mes");
                album1.vendido()
                break
            case 3:
                cuotasFinales = album1.precio / 12;
                alert("Pagará " + cuotasFinales + " por mes");
                album1.vendido()
                break
            default:
                alert("Opción inválida")
        }
    } else if (respuesta == 2) {
        switch (cantCuotas()) {
            case 1:
                cuotasFinales = album2.precio / 3;
                alert("Pagará " + cuotasFinales + " por mes");
                album2.vendido()
                break
            case 2:
                cuotasFinales = album2.precio / 6;
                alert("Pagará " + cuotasFinales + " por mes");
                album2.vendido()
                break
            case 3:
                cuotasFinales = album2.precio / 12;
                alert("Pagará " + cuotasFinales + " por mes");
                album2.vendido()
                break
            default:
                alert("Opción inválida")
        }
    } else if (respuesta == 3) {
        switch (cantCuotas()) {
            case 1:
                cuotasFinales = album3.precio / 3;
                alert("Pagará " + cuotasFinales + " por mes");
                album3.vendido()
                break
            case 2:
                cuotasFinales = album3.precio / 6;
                alert("Pagará " + cuotasFinales + " por mes");
                album3.vendido()
                break
            case 3:
                cuotasFinales = album3.precio / 12;
                alert("Pagará " + cuotasFinales + " por mes");
                album3.vendido()
                break
            default:
                alert("Opción inválida")
        }
    } else {
        alert("Opción inválida")
    }
}




// MOSTRAR FUNCIONES
eleccion()
//controlar que el stock haya cambiado tras la venta
console.log(album1.stock)
console.log(album2.stock)
console.log(album3.stock)
