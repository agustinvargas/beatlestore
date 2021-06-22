//CREO OBJETOS, ARRAY Y VARIABLES GLOBALES

class Producto {
    constructor(id, img, titulo, precio, formato, año, stock) {
        this.id = id;
        this.img = img;
        this.titulo = titulo;
        this.precio = parseFloat(precio);
        this.formato = formato;
        this.año = año;
        this.stock = stock;
    }
    // vendido() {
    //     if (this.stock > 0) {
    //         let stockA = --this.stock;
    //         // let stock = document.querySelectorAll(".producto__stock");

    //         // stock.textContent = `${stockA}`


    //         console.log(stockA);
    //     } else {
    //         alert("No hay stock");
    //     }
    // };
    sumarIva() {
        this.precio = parseFloat((this.precio * 1.21).toFixed(2));
    }
}

let productos = [];
productos.push(
    new Producto(1, "img/hard-days-night-cd.png", "A Hard Day's Night", 1199, "CD", 1964, 2),
    new Producto(2, "img/hard-days-night-vinilo.png", "A Hard Day's Night", 2990, "Vinilo", 1964, 6),
    new Producto(3, "img/with-the-beatles-cd.png", "With the Beatles", 990, "CD", 1963, 6),
    new Producto(4, "img/with-the-beatles-vinilo.png", "With the Beatles", 1790, "Vinilo", 1963, 4),
    new Producto(5, "img/abbey-road-vinilo.png", "Abbey Road", 3290, "Vinilo", 1969, 7),
    new Producto(6, "img/abbey-road-cd.png", "Abbey Road", 1290, "CD", 1969, 7),
);
console.log(productos)

let carrito = [];

// DOM: AGREGO LOS PRODUCTOS DEL ARRAY A LA TIENDA

productos.forEach(producto => {
    const productosContenedor = document.createElement("div");
    productosContenedor.setAttribute("class", "producto");
    productosContenedor.innerHTML = `
    <img class="producto__img" src=${producto.img} alt="Tapa del álbum">
    <h2 class="producto__album">${producto.titulo}</h2>
    <span class="producto__precio">$${producto.precio}</span>
    <span class="producto__formato">${producto.formato}<span class="producto__año"> ${producto.año}</span></span>
    <span id="${producto.id}" class="producto__stock">Stock: <span id="producto__stock${producto.id}">${producto.stock}</span></span>
    <button id="${producto.id}" class="agregar-carrito">Agregar</button>
    `;
    const tienda = document.querySelector(".tienda")
    tienda.appendChild(productosContenedor);
    console.log(productosContenedor);
});

// AL BUSCAR UN PRODUCTO, SE MUESTRA EN PANTALLA RESULTADOS SEGUN LA COINCIDENCIA DE LA BUSQUEDA CON EL TITULO DEL ALBUM
const buscador = document.querySelector(".buscador__input")
buscador.addEventListener("keyup", (e) => {
    const busqueda = e.target.value.toUpperCase();
    const productosVenta = document.querySelectorAll(".producto")

    for (producto of productosVenta) {
        const titulo = producto.children[1];
        const tituloCoincidir = titulo.textContent;
        if ((tituloCoincidir.toUpperCase().includes(busqueda))) {
            producto.style.display = "flex";
        } else {
            producto.style.display = "none";
        }
    }
})

// AL TOCAR EL BOTON "AGREGAR AL CARRITO", SE TOMA EL PRODUCTO AGREGADO Y SE LE RESTA UNO AL STOCK

const btnAgregarCarrito = document.getElementsByClassName('agregar-carrito');
for (const boton of btnAgregarCarrito) {
    boton.addEventListener('click', (event) => {
        const botonClickeado = event.target;
        console.log(botonClickeado.id);
        const productoAgregado = productos.find((producto) => producto.id === parseInt(botonClickeado.id));
        
        if (productoAgregado.stock > 0) {
            alert(`Agregó el producto ${productoAgregado.titulo}`);
            --productoAgregado.stock;

            var id = `producto__stock${productoAgregado.id}`
            var span = document.createElement("span");
            span.setAttribute("id", id);

            var productoAgregadoStock = document.createTextNode(`${productoAgregado.stock}`);
            span.appendChild(productoAgregadoStock);

            var padreEtiqueta = document.getElementById(`${productoAgregado.id}`);
            var hijoEtiqueta = document.getElementById(`producto__stock${productoAgregado.id}`);

            padreEtiqueta.replaceChild(span, hijoEtiqueta);

            carrito.push(productoAgregado);
            console.log(carrito)

        } else {
            alert("No queda stock de este producto")
        }
    })
}


// const filtroPrecio = document.querySelector(".ordenarPrecio");
// filtroPrecio.onclick = () => {ordenarPorPrecio()}

// function ordenarPorPrecio() {
//     const precios = document.querySelector(".producto__precio");
//     for (precio of precios) {

//     }
//     productos.sort(function (a, b) {
//         return a.precio - b.precio;
//     });
//     // let tiendaR = document.querySelector(".producto");
//     // tiendaR.parentNode.removeChild(tiendaR);
//     // document.querySelector(".tienda").appendChild(tiendaR)
//     // productos.forEach(producto => {
//     //     const productosContenedor = document.createElement("div");
//     //     productosContenedor.setAttribute("class", "producto");
//     //     productosContenedor.innerHTML = `
//     //     <img class="producto__img" src=${producto.img} alt="Tapa del álbum">
//     //     <h2 class="producto__album">${producto.titulo}</h2>
//     //     <span class="producto__precio">$${producto.precio}</span>
//     //     <span class="producto__formato">${producto.formato}<span class="producto__año">${producto.año}</span></span>
//     //     <button id="${producto.id}" class="agregar-carrito">Agregar</button>
//     //     `;
//     //     const tienda = document.querySelector(".tienda")
//     //     tienda.appendChild(productosContenedor);
//     //     console.log(productosContenedor);


//     // });



//     console.log(productos);
// }  
