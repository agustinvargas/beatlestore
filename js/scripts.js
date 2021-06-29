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
        let productoAgregado = productos.find((producto) => producto.id === parseInt(botonClickeado.id));

        if (productoAgregado.stock > 0) {
            // alert(`Agregó el producto ${productoAgregado.titulo}`);
            swal({
                // title: "Good job!",
                text: `Agregaste el producto ${productoAgregado.titulo}`,
                icon: "success",
            });

            --productoAgregado.stock;

            let id = `producto__stock${productoAgregado.id}`
            let span = document.createElement("span");
            span.setAttribute("id", id);

            let productoAgregadoStock = document.createTextNode(`${productoAgregado.stock}`);
            span.appendChild(productoAgregadoStock);

            let padreEtiqueta = document.getElementById(`${productoAgregado.id}`);
            let hijoEtiqueta = document.getElementById(`producto__stock${productoAgregado.id}`);

            padreEtiqueta.replaceChild(span, hijoEtiqueta);

            carrito.unshift(productoAgregado);


            localS()
            let pRecientes = document.getElementById("recientes");
            pRecientes.style.display = "none";

            // // const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
            // // for (const producto of carrito) {
            // //     guardarLocal(producto.id, JSON.stringify(producto));
            // // }

        } else {
            // alert("No queda stock de este producto")
            swal({
                title: "Ups!",
                text: "No quedan unidades disponibles de este producto",
                icon: "error",
            });
        }
    })
}

// AGREGAR CARRITO A LOCAL STORAGE Y MOSTRAR CANTIDAD DE ELEMENTOS AGREGADOS ARRIBA DEL BOTON DEL CARRITO
let carritoNum = document.getElementById("carrito__numero");
if (carrito.length == 0) {
    carritoNum.style.display = "none"
} else {
    carritoNum.innerHTML = carrito.length;
}



function localS() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    JSON.parse(localStorage.getItem("carrito"));
    carritoNum = document.getElementById("carrito__numero");
    carritoNum.style.display = "inherit"
    carritoNum.innerHTML = carrito.length;
    console.log(carrito.length)

}

// MOSTRAR SECCION "AGREGADOS RECIENTEMENTE", DONDE SE MUESTRAN LOS PRODUCTOS ALMACENADOS EN LOCAL
if (localStorage.getItem("carrito") === null || localStorage.hasOwnProperty('carrito') === false) {
    let pRecientes = document.getElementById("recientes");
    pRecientes.style.display = "none";
}

// cambiar a singular si en el storage hay un solo producto
if (JSON.parse(localStorage.getItem("carrito")) != null && JSON.parse(localStorage.getItem("carrito").length === 1)) {
    let pRecientes = document.querySelector(".recientes__titulo");
    pRecientes.textContent = "Producto agregado por última vez";
}


var productosDelLs = JSON.parse(localStorage.getItem("carrito"));
console.log(productosDelLs);
productosDelLs.forEach(producto => {
    const div = document.createElement("div");
    div.setAttribute("class", "recientes__producto");
    div.innerHTML = `
   
    <img class="producto__img" src=${producto.img} alt="Tapa del álbum">
    <h2 class="producto__album">${producto.titulo}</h2>
    
    <span class="producto__formato">${producto.formato}</span>
    
    `;
    const recientes = document.querySelector("#recientes__productos")
    recientes.appendChild(div);
});


// AL HACER CLIC EN COMPRAR (EN SECCION RECIENTES --SOLO VISIBLE SI HAY PRODUCTOS GUARDADOS EN EL STORAGE), SE ABRE UN MODAL CON LOS PRODUCTOS PARA CONFIRMAR COMPRA O BORRAR
const btnComprarProductosLS = document.querySelector(".recientes__comprar");
btnComprarProductosLS.addEventListener('click', (evento) => {

    let carritoLs = JSON.parse(localStorage.getItem("carrito"));
    if (!document.getElementById("productoLocalModal")) {
        for (let producto of carritoLs) {
            const div = document.createElement("div");
            div.setAttribute("id", "productoLocalModal")
            div.innerHTML = `<b>${producto.titulo}</b> en ${producto.formato} ($${producto.precio})`;
            const modalProductosLocalStorage = document.querySelector("#modal__productosLocalStorage");
            modalProductosLocalStorage.appendChild(div)
        }
    }
    // AL HACAER CLICK EN EL BOTON "QUITAR", SE REMUEVEN LOS PRODUCTOS DEL LOCAL STORAGE Y SE REMUEVE EN EL HTML LA SECCION "PRODUCTOS AGREGADOS POR ULTIMA VEZ"
    const btnQuitarProductosLS = document.querySelector("#modal__quitarProductosLS");
    btnQuitarProductosLS.addEventListener('click', (evento) => {
        localStorage.getItem("carrito")
        localStorage.removeItem("carrito");

        const recientes = document.querySelector("#recientes");
        recientes.parentElement.removeChild(recientes)
    })
})





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
