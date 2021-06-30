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
        return this.precio = parseFloat((this.precio * 1.21).toFixed(2));
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
function Ordenar() {
    productos.forEach(producto => {
        const productosContenedor = document.createElement("div");
        productosContenedor.setAttribute("class", "producto");
        productosContenedor.innerHTML = `
    <img class="producto__img" src=${producto.img} alt="Tapa del álbum">
    <h2 class="producto__album">${producto.titulo}</h2>
    <span class="producto__precio">${producto.precio}</span>
    <span class="producto__formato">${producto.formato}<span class="producto__año"> ${producto.año}</span></span>
    <span id="${producto.id}" class="producto__stock">Stock: <span id="producto__stock${producto.id}">${producto.stock}</span></span>
    <button id="${producto.id}" class="agregar-carrito">Agregar</button>
    `;
        const tienda = document.querySelector(".tienda")
        tienda.appendChild(productosContenedor);
        console.log(productosContenedor);
    });
    AgregarCarrito()
} Ordenar()
// AL BUSCAR UN PRODUCTO, SE MUESTRA EN PANTALLA RESULTADOS SEGUN LA COINCIDENCIA DE LA BUSQUEDA CON EL TITULO DEL ALBUM
const buscador = document.querySelector(".buscador__input")
buscador.addEventListener("keyup", (e) => {
    const busqueda = e.target.value.toUpperCase();
    const productosVenta = document.querySelectorAll(".producto")

    for (producto of productosVenta) {
        const titulo = producto.children[1];
        const tituloCoincidir = titulo.textContent;
        if ((tituloCoincidir.toUpperCase().includes(busqueda))) {
            if (producto.style.display != "none") {
                producto.style.display = "flex";
            }
        } else {
            producto.style.display = "none";
        }
    }
})

// FLTRAR PRODUCTO POR FORMATO
// Filtrar por CD
const filtroCD = document.querySelector("#filtro-cd")
filtroCD.addEventListener("click", (e) => {
    const filtro = e.target.value.toUpperCase();
    const productosVenta = document.querySelectorAll(".producto")

    for (producto of productosVenta) {

        const formato = producto.children[3];
        const formatoCoincidir = formato.textContent;
        if (formatoCoincidir.toUpperCase().includes(filtro)) {

            producto.style.display = "flex";

        } else {
            producto.style.display = "none";
        }
    }
})
// Filtrar por vinilo
const filtroVinilo = document.querySelector("#filtro-vinilo")
filtroVinilo.addEventListener("click", (e) => {
    const filtro = e.target.value.toUpperCase();
    const productosVenta = document.querySelectorAll(".producto")

    for (producto of productosVenta) {
        const formato = producto.children[3];
        const formatoCoincidir = formato.textContent;
        if ((formatoCoincidir.toUpperCase().includes(filtro))) {

            producto.style.display = "flex";

        } else {
            producto.style.display = "none";
        }
    }
})
// Mostrar todos los productos
const filtroTodosFormatos = document.querySelector("#filtro-todos-formatos")
filtroTodosFormatos.addEventListener("click", (e) => {
    const elementos = document.getElementsByClassName("producto");
    while (elementos.length > 0) {
        elementos[0].parentNode.removeChild(elementos[0]);
    }
    Ordenar();})

// FILTRAR POR PRECIO
const filtroPrecio = document.querySelector("#precio")
filtroPrecio.addEventListener("input", (e) => {
    const filtro = parseInt(e.target.value);
    const productosVenta = document.querySelectorAll(".producto")
    console.log(filtro)
    for (producto of productosVenta) {

        const precio = producto.children[2];
        const precioCoincidir = parseInt(precio.textContent);
        console.log(precioCoincidir)

        if (precioCoincidir < filtro) {
            producto.style.display = "flex";
        } else {
            producto.style.display = "none";
        }
        const precioParcial = document.getElementById("filtro-precio")
        precioParcial.innerHTML = `$${filtro}`
    }
})

// ORDENAR POR AÑO
// Ordenar de más nuevo a más antiguo
const ordenAscendente = document.querySelector("#filtro-año-reciente")
ordenAscendente.addEventListener("click", (e) => {

    productos.sort(function (a, b) {
        if (a.año > b.año) {
            return -1;
        }
        if (a.año < b.año) {
            return 1;
        }
        return 0;
    })
    const elementos = document.getElementsByClassName("producto");
    while (elementos.length > 0) {
        elementos[0].parentNode.removeChild(elementos[0]);
    }
    Ordenar();
})
// Ordenar de más antiguo a más nuevo
const ordenDescendente = document.querySelector("#filtro-año-antiguo")
ordenDescendente.addEventListener("click", (e) => {

    productos.sort(function (a, b) {
        if (a.año < b.año) {
            return -1;
        }
        if (a.año > b.año) {
            return 1;
        }
        return 0;
    })
    let elementos = document.getElementsByClassName("producto");
    while (elementos.length > 0) {
        elementos[0].parentNode.removeChild(elementos[0]);
    }
    Ordenar();
})


// AL CLICKEAR EL BOTON "AGREGAR AL CARRITO", SE TOMA EL PRODUCTO AGREGADO Y SE LE RESTA UNO AL STOCK
function AgregarCarrito() {
    const btnAgregarCarrito = document.getElementsByClassName('agregar-carrito');
    for (const boton of btnAgregarCarrito) {
        boton.addEventListener('click', (event) => {
            const botonClickeado = event.target;
            console.log(botonClickeado.id);
            let productoAgregado = productos.find((producto) => producto.id === parseInt(botonClickeado.id));

            if (productoAgregado.stock > 0) {
                // Llama a la librería Sweat Alert
                swal({
                    text: `Agregaste el producto ${productoAgregado.titulo}`,
                    icon: "success",
                });

                // Descuenta uno del stock del producto
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

                // Guarda en el Local Storage
                localS()

                // Si se agrega productos al carrito, se remueve la sección AGREGADOS POR ULTIMA VEZ
                let pRecientes = document.getElementById("recientes");
                pRecientes.style.display = "none";

            } else {
                // Llama a la librería Sweat Alert
                swal({
                    title: "Ups!",
                    text: "No quedan unidades disponibles de este producto",
                    icon: "error",
                });
            }
        })
    }
}
// AGREGAR CARRITO A LOCAL STORAGE Y MOSTRAR CANTIDAD DE ELEMENTOS AGREGADOS ARRIBA DEL BOTON DEL CARRITO
function localS() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    JSON.parse(localStorage.getItem("carrito"));
    carritoNum = document.getElementById("carrito__numero");
    carritoNum.style.display = "inherit"
    carritoNum.innerHTML = carrito.length;
    console.log(carrito.length)
}

let carritoNum = document.getElementById("carrito__numero");
if (carrito.length == 0) {
    carritoNum.style.display = "none"
} else {
    carritoNum.innerHTML = carrito.length;
}

// MOSTRAR SECCION "AGREGADOS RECIENTEMENTE", DONDE SE MUESTRAN LOS PRODUCTOS ALMACENADOS EN LOCAL
let productosDelLs = JSON.parse(localStorage.getItem("carrito"));

if (productosDelLs === null || localStorage.hasOwnProperty('carrito') === false) {
    let ultimosProductosAgregados = document.getElementById("recientes");
    ultimosProductosAgregados.style.display = "none";
} else if (productosDelLs.length > 0)
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

        // Cambia el contenido del encabezado, de prural (por defecto en el HTML) a singular si en el storage hay un solo producto
        if (productosDelLs.length == 1) {
            let ultimosProductosAgregados = document.querySelector(".recientes__titulo");
            ultimosProductosAgregados.textContent = "Producto agregado por última vez";
        }
    });

// AL HACER CLIC EN COMPRAR (EN SECCION AGREGADOS POR ULTIMA VEZ -SOLO VISIBLE SI HAY PRODUCTOS GUARDADOS EN EL STORAGE), SE ABRE UN MODAL CON LOS PRODUCTOS PARA CONFIRMAR COMPRA O BORRAR
const btnComprarProductosLS = document.querySelector(".recientes__comprar");
btnComprarProductosLS.addEventListener('click', (evento) => {

    let carritoLs = JSON.parse(localStorage.getItem("carrito"));
    if (!document.getElementById("productoLocalModal")) {
        for (let producto of carritoLs) {
            const div = document.createElement("div");
            div.setAttribute("id", "productoLocalModal")
            div.innerHTML = `
            <b>${producto.titulo}</b> en ${producto.formato.toLowerCase()} ($${producto.precio})
            `;
            
            const modalProductosLocalStorage = document.querySelector("#modal__productosLocalStorage");
            modalProductosLocalStorage.appendChild(div)
        }
    }
    // AL HACER CLICK EN EL BOTON "QUITAR", SE REMUEVEN LOS PRODUCTOS DEL LOCAL STORAGE Y SE REMUEVE EN EL HTML LA SECCION "PRODUCTOS AGREGADOS POR ULTIMA VEZ"
    const btnQuitarProductosLS = document.querySelector("#modal__quitarProductosLS");
    btnQuitarProductosLS.addEventListener('click', (evento) => {
        localStorage.getItem("carrito")
        localStorage.removeItem("carrito");

        const recientes = document.querySelector("#recientes");
        recientes.parentElement.removeChild(recientes)
    })
})
