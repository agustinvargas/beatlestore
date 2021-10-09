// CREA OBJETOS, ARRAY DE PRODUCTOS Y CARRITO
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
}
let productos = [
    new Producto(1, "img/hard-days-night-cd.png", "A Hard Day's Night", 1199, "CD", 1964, 2),
    new Producto(2, "img/with-the-beatles-cd.png", "With the Beatles", 990, "CD", 1963, 6),
    new Producto(3, "img/hard-days-night-vinilo.png", "A Hard Day's Night", 2990, "Vinilo", 1964, 6),
    new Producto(4, "img/abbey-road-cd.png", "Abbey Road", 1290, "CD", 1969, 7),
    new Producto(5, "img/let-it-be-cd.png", "Let It Be", 1390, "CD", 1970, 3),
    new Producto(6, "img/with-the-beatles-vinilo.png", "With the Beatles", 1790, "Vinilo", 1963, 4),
    new Producto(7, "img/help-cd.png", "Help!", 1350, "CD", 1965, 4),
    new Producto(8, "img/revolver-vinilo.png", "Revolver", 3490, "Vinilo", 1966, 4),
    new Producto(9, "img/abbey-road-vinilo.png", "Abbey Road", 3290, "Vinilo", 1969, 7),
];
let carrito = [];
let carritoLs = "";

// DOM: AGREGO/PINTO LOS PRODUCTOS DEL ARRAY A LA TIENDA
function productosTienda() {
    productos.forEach(producto => {
        const productosContenedor = $("<div></div>");
        $(productosContenedor).attr("class", "producto album");
        $(productosContenedor).html(`
    <img class="producto__img" src=${producto.img} alt="Tapa del álbum">
    <h2 class="producto__album">${producto.titulo}</h2>
    <span>$<span class="producto__precio">${producto.precio}</span></span>
    <span class="producto__formato">${producto.formato}<span class="producto__año"> ${producto.año}</span></span>
    <span id="${producto.id}" class="producto__stock">Stock: <span id="producto__stock${producto.id}">${producto.stock}</span></span>
    <div class="div-agregar">
    <img src="img/whatsapp.png" onclick="wsp('${producto.formato}', '${producto.titulo.replace("'", "´")}')" class="btn-wasap" alt="WhatsApp")>
    <button id="${producto.id}" class="agregar-carrito btn btn-dark">Agregar</button>
    </div>
    `);
        $(".tienda").prepend($(productosContenedor));
    }); //usa el método .replace para evitar errores con el apóstrofe
    agregarCarrito()
    console.log("Carrito: ", carrito);
} productosTienda()

// LLAMA A LA API DE WHATSAPP PARA ENVIAR MENSAJE SEGÚN EL PRODUCTO
function wsp(formato, titulo) {
    window.open(`https://api.whatsapp.com/send?phone=+5493415024120&text=Hola, me interesa comprar el ${formato.toLowerCase()} ${titulo.replace("´", "'")}`, '_blank')
}

// CREA PRODUCTOS (REMERAS) DESDE LA API DE MERCADO LIBRE
class Remeras {
    constructor(img, titulo, precio, link) {
        this.img = img;
        this.titulo = titulo;
        this.precio = precio;
        this.link = link
    };
}
function mercadolibreApi() {
    const urlMl = 'https://api.mercadolibre.com/sites/MLA/search?q=remeras%20beatles&seller_id=467177801&limit=9#json' // Link a la API de MeLi
    let misDatos = [];
    $.getJSON(urlMl, (data) => {
        console.log(data.results)
        for (const dato of data.results) {
            let remerasMeLi = new Remeras(dato.thumbnail, dato.title, dato.price, dato.permalink);
            misDatos.push(remerasMeLi)
        }
        //pinta los productos en el html/dom
        for (producto of misDatos) {
            const div = document.createElement("div");
            div.setAttribute("class", "meli__producto producto");
            div.innerHTML = `
    <img class="producto__img" src=${producto.img} alt="Tapa del álbum">
    <h2 class="producto__album">${producto.titulo}</h2>
    <span>$<span class="producto__precio">${producto.precio}</span></span>
    <button class="agregar-carrito btn-meli btn btn-dark"><a href="${producto.link}" target="_blank">Ver en Mercado Libre</a></button>
    `;
            const recientes = document.querySelector("#meli__producto")
            recientes.appendChild(div);
        };
    })
} mercadolibreApi()

// AL CLICKEAR EL BOTON "AGREGAR AL CARRITO", SE TOMA EL PRODUCTO AGREGADO (SE AGREGA AL ARRAY) Y SE LE RESTA UNO AL STOCK
let total = 0
function agregarCarrito() {
    const btnAgregarCarrito = document.getElementsByClassName('agregar-carrito');
    for (const boton of btnAgregarCarrito) {
        boton.addEventListener('click', (event) => {
            const botonClickeado = event.target;
            // halla el producto que coincida con el id del botón
            let productoAgregado = productos.find((producto) => producto.id === parseInt(botonClickeado.id));
            if (productoAgregado.stock > 0) {
                // Llama a la librería Sweat Alert
                swal({
                    text: `Agregaste el producto ${productoAgregado.titulo}`,
                    icon: "success",
                });
                // Descuenta uno del stock del producto
                --productoAgregado.stock;
                // Modifica el dom en la parte de stock
                let id = `producto__stock${productoAgregado.id}`
                let span = document.createElement("span");
                span.setAttribute("id", id);
                let productoAgregadoStock = document.createTextNode(`${productoAgregado.stock}`);
                span.appendChild(productoAgregadoStock);
                let padreEtiqueta = document.getElementById(`${productoAgregado.id}`);
                let hijoEtiqueta = document.getElementById(`producto__stock${productoAgregado.id}`);
                padreEtiqueta.replaceChild(span, hijoEtiqueta);
                // Agrega al carrito el producto agregado
                carrito.unshift(productoAgregado);
                if (carrito.length > 0) {
                    $("#carrito").show()
                };
                // Guarda en el Local Storage
                localS();
                // Si se agrega productos al carrito, se remueve la sección AGREGADOS POR ULTIMA VEZ
                let pRecientes = document.getElementById("recientes");
                if (pRecientes) {
                    pRecientes.style.display = "none";
                }
                // ANIMACIÓN: LLEVA HASTA ARRIBA DE LA PANTALLA, MUEVE EL BOTÓN DEL CARRITO Y LO VUELVE A SU ESTADO ORIGINAL
                $('html, body').animate({
                    scrollTop: $("body").offset().top
                    //scrollea hasta arriba de todo
                }, 100,
                    () => {
                        $("#carrito").animate({
                            marginBottom: "+=4px"
                            //sube el carrito
                        }, 400,
                            () => {
                                $("#carrito").animate({
                                    marginBottom: "-=4px"
                                }, 200
                                    //baja el carrito hasta su estado original
                                )
                            }
                        )
                    }
                );
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
}
// MOSTRAR SECCION "AGREGADOS RECIENTEMENTE", DONDE SE MUESTRAN LOS PRODUCTOS ALMACENADOS EN LOCAL
let productosDelLs = JSON.parse(localStorage.getItem("carrito"));
// chequea que haya productos guardados en el LocalS
if (productosDelLs === null || localStorage.hasOwnProperty('carrito') === false || productosDelLs.length == 0) {
    let ultimosProductosAgregados = document.getElementById("recientes");
    ultimosProductosAgregados.style.display = "none";
} else if (productosDelLs.length > 0) //si hay, los pinta en el html/dom
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
        // Cambia el contenido del encabezado, de plural (por defecto en el HTML) a singular si en el storage hay un solo producto
        if (productosDelLs.length == 1) {
            let ultimosProductosAgregados = document.querySelector(".recientes__titulo");
            ultimosProductosAgregados.textContent = "Producto agregado por última vez";
        }
    });

// ---------------- FILTROS -------------
// FUNCIONES PARA OCULTAR O MOSTRAR PRODUCTOS
function mostrarProductos(elemento) {
    $(elemento).fadeIn("fast");
}
function ocultarProductos(elemento) {
    $(elemento).fadeOut("slow");
}

// BUSCAR PRODUCTO POR NOMBRE
$(".buscador__input").keyup((e) => {
    const busqueda = e.target.value.toUpperCase();
    for (producto of $(".producto")) {
        const tituloCoincidir = producto.children[1].textContent;
        // Si lo que se escribe coincide con el título del producto, lo muestra; si no, lo oculta
        if ((tituloCoincidir.toUpperCase().includes(busqueda))) {
            mostrarProductos(producto);
        } else {
            ocultarProductos(producto);
        }
    }
    // Condicional para resetear el filtro del precio
    const filtroPrecioMax = $("input#precio").attr("max")
    if ($("input#precio").text(filtroPrecioMax) > $("input#precio").attr("max")) {
        reseteaFiltroPrecio()
    }
})
// FUNCION PARA FILTRAR POR FORMATO DEL ALBUM
function filtrarFormatos(etiqueta) {
    etiqueta.click((e) => {
        e.preventDefault()
        const filtro = e.target.value.toUpperCase();
        for (producto of $(".producto")) {
            mostrarProductos(producto);
            // const formatoCoincidir = $("span.producto__formato").text();
            const formatoCoincidir = producto.children[3].textContent;
            if (formatoCoincidir.toUpperCase().includes(filtro)) {
                mostrarProductos(producto);
            } else {
                ocultarProductos(producto);
            }
        };
        // Restablece el valor del input del buscador
        $("input.buscador__input").val("");
        // Oculta la sección de remeras de Mercado Libre
        $("#meli").hide();
        // Reseta el filtro de precio máximo
        reseteaFiltroPrecio();
    })
};
// Filtra por CD
const filtroCD = $("#filtro-cd");
filtrarFormatos(filtroCD);
// Filtra por vinilo
const filtroVinilo = $("#filtro-vinilo");
filtrarFormatos(filtroVinilo);

// MOSTRAR TODOS LOS PRODUCTOS
const filtroTodosFormatos = $("#filtro-todos-formatos")
filtroTodosFormatos.click((e) => {
    e.preventDefault();
    $("input.buscador__input").val("");
    // Muestra la sección de remeras de Mercado Libre
    $("#meli").show();
    // Muestra todos los productos
    for (producto of $(".producto")) {
        mostrarProductos(producto);
    }
    // Reseta el filtro de precio máximo
    reseteaFiltroPrecio();
})
// FILTRAR POR PRECIO
$("#precio").on("input", (e) => {
    // Condicional para que borre lo escrito del input de búsqueda
    if (!($("input.buscador__input").val(""))) {
        $("input.buscador__input").val("");
    }
    const filtro = parseInt(e.target.value);
    for (producto of $(".producto")) {
        const precioCoincidir = producto.children[2].children[0].textContent;
        if (precioCoincidir > filtro) {
            ocultarProductos(producto);
        } else if (precioCoincidir < filtro) {
            mostrarProductos(producto);
        }
        const precioParcial = document.getElementById("filtro-precio")
        precioParcial.innerHTML = `$${filtro}`
    }
})
// ORDENAR POR AÑO
// Ordenar de más nuevo a más antiguo
$("#filtro-año-reciente").click(() => {
    productos.sort(function (a, b) {
        return a.año - b.año
    })
    // Oculta la sección de remeras de Mercado Libre
    actualizaTienda();
})
// Ordenar de más antiguo a más nuevo
$("#filtro-año-antiguo").click(() => {
    productos.sort(function (a, b) {
        return b.año - a.año;
    })
    // Oculta la sección de remeras de Mercado Libre
    actualizaTienda()
})

// FUNCION PARA BORRAR LOS ELEMENTOS DE INICIO DE LA TIENDA Y ACTUALIZARLOS VOLVIENDOLOS A IMPRIMIR
function actualizaTienda() {
    while ($(".album.producto").length > 0) {
        $(".album.producto")[0].parentNode.removeChild($(".album.producto")[0]);
    }
    $("#meli").hide();
    reseteaFiltroPrecio()
    // Restablece el valor del input del buscador
    $("input.buscador__input").val("");
    productosTienda();
}

// FUNCION PARA RESETEAR EL FILTRO DE PRECIO
function reseteaFiltroPrecio() {
    const filtroPrecioMax = $("input#precio").attr("max");
    $("input#precio").val(filtroPrecioMax);
    $("span#filtro-precio").html(`$${filtroPrecioMax}`)
}

// CLICK BOTON DEL CARRITO
const botonCarrito = $(".carrito__img");
botonCarrito.click(() => { // El modal se activa vía Bootstrap
    pintarCarrito();
    calcTotal();
    $(".btn-quitar").show(); // para que los productos almacenados del local no puedan quitarse
})

function calcTotal() {
    carritoLs = JSON.parse(localStorage.getItem("carrito"));
    total = carritoLs.reduce((a, b) => {
        return a + b.precio;
    }, 0);
    $(".total-carrito").text(total)
}

function pintarCarrito() {
    carritoLs = JSON.parse(localStorage.getItem("carrito"));
    while ($(".carrito-prod").length > 0) {
        $(".carrito-prod")[0].parentNode.removeChild($(".carrito-prod")[0])
    }; // Evita la duplicación de los productos ya agregados
    for (producto of carritoLs) {
        const div = $(`<div class="carrito-prod carrito-prod--${producto.id}"></div>`);
        div.html(`
        <span><b>${producto.titulo}</b> en ${producto.formato.toLowerCase()} ($${producto.precio})</span>
        <button class="btn btn-quitar" onclick="quitarProducto(${producto.id})"></button>
            `);
        $("#modal__btn-carrito").append(div);  // Imprime los productos agregados al carrito
    }
}

function quitarProducto(id) {
    carritoLs = JSON.parse(localStorage.getItem("carrito"));
    // busca el índice del producto a eliminar
    let eliminar = carritoLs.findIndex(p => p.id == id)
    // quita el elemento del array del carrito
    carritoLs.splice(eliminar, 1);
    carrito.splice(eliminar, 1);
    //actualiza Local Storage
    localStorage.setItem("carrito", JSON.stringify(carritoLs));
    localS()
    // devuelve stock inicial
    const productoQuitado = productos.find(producto => producto.id == id);
    $(`#producto__stock${id}`).text(`${++productoQuitado.stock}`);
    // actualiza el dom
    pintarCarrito();
    $(".btn-quitar").show(); // para que los productos almacenados del local no puedan quitarse
    // actualiza total
    calcTotal();
    // si no hay productos agregados, oculta el modal y el btn del carrito
    if (carritoLs.length == 0) {
        $("#exampleModal").modal('hide');
        $("#carrito").hide();
        const recientes = document.querySelector("#recientes");
        recientes.parentElement.removeChild(recientes)
    }
}
// Funcion para mostrar modal carrito
function mostrarModal() {
    $("#exampleModal").modal('show');
    pintarCarrito();
    calcTotal();
}
//  Finalizar Compra
let nombresAlbum = "";
function finalizarCompra() {
    carritoLs = JSON.parse(localStorage.getItem("carrito"));
    // calcTotalLS()
    // carrito = carritoLs;
    for (p of carritoLs) {
        nombresAlbum += `%0D%0A${p.titulo} (${p.formato.toLowerCase()})`; // junta los títulos y formato de los productos
    }
    if (cuponEnvio === true) {
        window.open(`https://api.whatsapp.com/send?phone=+5493415024120&text=Hola, quisiera realizar el siguiente pedido:${nombresAlbum}%0D%0ATotal: ${total}%0D%0AEnvío gratuito: Sí (cupón activado)`, '_blank')
    } else {
        window.open(`https://api.whatsapp.com/send?phone=+5493415024120&text=Hola, quisiera realizar el siguiente pedido:${nombresAlbum}%0D%0ATotal: ${total}`, '_blank')
    }
}
// --------- CUPON DE DESCUENTO ------------
// MODAL CUPON ANIMADO
// Crea un popup donde se informa un cupón de descuento
$("html").append(`
<div class="modal modal-cupon" tabindex="-1">
<div class="modal-dialog modal-dialog-centered">
  <div class="modal-content">
    <div class="modal-header modal-cupon__header">
      <h5 class="modal-title">Aprovechá tu beneficio</h5>
    </div>
    <div class="modal-body">
      <p style="color:initial">Con el cupón <strong>BEATLE</strong> tenés envío gratis a todo el país</p>
    </div>
  </div>
</div>
</div>
`)
$("body").animate({
    opacity: '0.2'
    //oscurece el fondo para darle mayor importancia al popup
},
    "slow",
    // El popup aparece y desaparece solo
    () => {
        $(".modal-cupon")
            .fadeIn(1000)
            .delay(3250)
            .fadeOut(1000, () => {
                $("body").animate({
                    opacity: '1'
                }, "slow")
                //vuelve a mostrar el body normal
            });
    })
let cuponEnvio = false;
function cupon() {
    const cuponInput = $(".cupon").val();
    if (cuponInput.toLowerCase() === "beatle") {
        if ($(".cupon-activado").length == 0) {
            // evita duplicación
            // llama a la librería Sweat Alert
            swal({
                text: "Cupón check!",
                icon: "success",
            });
            $(".total-carrito").append(`<br><span class="cupon-activado" style="font-size: 80%">Cupón activado: Envío gratis</span>`);
            cuponEnvio = true;
        } else if ($(".cupon-activado").length > 0) {
            swal({
                text: "El cupón ya está activado",
                icon: "info",
            });
        }
    } else if (cuponInput.toLowerCase() === "") {
        swal({
            text: "Ingresá un cupón",
            icon: "info",
        });
    } else {
        swal({
            text: "Ups, ese cupón no existe",
            icon: "error",
        });
    }
}
