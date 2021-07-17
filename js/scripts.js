//CREA OBJETOS, ARRAY DE PRODUCTOS

function probando(parametro) {
    parametro == true
}

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
    sumarIva() {
        return this.precio = parseFloat((this.precio * 1.21).toFixed(2));
    }
}

let productos = [
    new Producto(1, "img/hard-days-night-cd.png", "A Hard Day's Night", 1199, "CD", 1964, 2),
    new Producto(2, "img/hard-days-night-vinilo.png", "A Hard Day's Night", 2990, "Vinilo", 1964, 6),
    new Producto(3, "img/with-the-beatles-cd.png", "With the Beatles", 990, "CD", 1963, 6),
    new Producto(4, "img/with-the-beatles-vinilo.png", "With the Beatles", 1790, "Vinilo", 1963, 4),
    new Producto(5, "img/abbey-road-vinilo.png", "Abbey Road", 3290, "Vinilo", 1969, 7),
    new Producto(6, "img/abbey-road-cd.png", "Abbey Road", 1290, "CD", 1969, 7),
];

console.log(`Productos en venta: `, productos)

let carrito = [];

// DOM: AGREGO/PINTO LOS PRODUCTOS DEL ARRAY A LA TIENDA
function productosTienda() {
    productos.forEach(producto => {
        const productosContenedor = $(`<div class="producto ${producto.formato.toLowerCase()}"></div>`);
        // $(productosContenedor).attr("class", "producto");
        // $(productosContenedor).attr(`"class", "${producto.formato}"`);

        $(productosContenedor).html(`
    <img class="producto__img" src=${producto.img} alt="Tapa del álbum">
    <h2 class="producto__album">${producto.titulo}</h2>
    <span>$<span class="producto__precio">${producto.precio}</span></span>
    <span class="producto__formato">${producto.formato}<span class="producto__año"> ${producto.año}</span></span>
    <span id="${producto.id}" class="producto__stock">Stock: <span id="producto__stock${producto.id}">${producto.stock}</span></span>
    <button id="${producto.id}" class="agregar-carrito">Agregar</button>
    <img src="img/whatsapp.png" onclick="wsp('${producto.formato}', '${producto.titulo.replace("'", "´")}')" class="btn-wasap")>
    `);
        $(".tienda").prepend($(productosContenedor));
    }); //usa el método .replace para evitar errores con el apóstrofe
    AgregarCarrito()
    console.log("Carrito: ", carrito)
} productosTienda()

// LLAMA A LA API DE WHATSAPP PARA ENVIAR MENSAJE SEGÚN EL PRODUCTO
function wsp(formato, titulo) {
    window.open(`https://api.whatsapp.com/send?phone=34123456789&text=MENSAJE FICTICIO: Hola, me interesa comprar el ${formato.toLowerCase()} ${titulo.replace("´", "'")}`, '_blank')
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
    const urlMl = 'https://api.mercadolibre.com/sites/MLA/search?q=remeras%20beatles&limit=9#json' // Link a la API de MeLi
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
    <button class="agregar-carrito"><a href="${producto.link}">Ver en Mercado Libre</a></button>
    `;
            const recientes = document.querySelector("#meli__producto")
            recientes.appendChild(div);
        };
    })
} mercadolibreApi()

// AL CLICKEAR EL BOTON "AGREGAR AL CARRITO", SE TOMA EL PRODUCTO AGREGADO (SE AGREGA AL ARRAY) Y SE LE RESTA UNO AL STOCK
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
                console.log("Carrito: ", carrito)
                // carritoBoton(productoAgregado);
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

// el número se muestra si hay elementos en el carrito
let carritoNum = document.getElementById("carrito__numero");
if (carrito.length == 0) {
    carritoNum.style.display = "none"
} else {
    carritoNum.innerHTML = carrito.length;
}

// MOSTRAR SECCION "AGREGADOS RECIENTEMENTE", DONDE SE MUESTRAN LOS PRODUCTOS ALMACENADOS EN LOCAL
let productosDelLs = JSON.parse(localStorage.getItem("carrito"));
// chequea que haya productos guardados en el LocalS
if (productosDelLs === null || localStorage.hasOwnProperty('carrito') === false) {
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

// AL HACER CLIC EN COMPRAR (EN SECCION AGREGADOS POR ULTIMA VEZ -SOLO VISIBLE SI HAY PRODUCTOS GUARDADOS EN EL STORAGE), SE ABRE UN MODAL CON LOS PRODUCTOS PARA CONFIRMAR COMPRA O BORRAR
const btnComprarProductosLS = document.querySelector(".recientes__comprar");
btnComprarProductosLS.addEventListener('click', () => {
    let carritoLs = JSON.parse(localStorage.getItem("carrito"));
    if (!document.getElementById("productoLocalModal")) {
        for (let producto of carritoLs) {
            const div = document.createElement("div");
            div.setAttribute("id", "productoLocalModal")
            div.innerHTML = `
            <b>${producto.titulo}</b> en ${producto.formato.toLowerCase()} ($${producto.precio})
            `;
            console.log(producto)
            const modalProductosLocalStorage = document.querySelector("#modal__productosLocalStorage");
            modalProductosLocalStorage.appendChild(div)
        }
    }
    // AL HACER CLICK EN EL BOTON "QUITAR", SE REMUEVEN LOS PRODUCTOS DEL LOCAL STORAGE Y SE REMUEVE EN EL HTML LA SECCION "PRODUCTOS AGREGADOS POR ULTIMA VEZ"
    const btnQuitarProductosLS = document.querySelector("#modal__quitarProductosLS");
    btnQuitarProductosLS.addEventListener('click', () => {
        localStorage.getItem("carrito")
        localStorage.removeItem("carrito");

        const recientes = document.querySelector("#recientes");
        recientes.parentElement.removeChild(recientes)
    })
})

// CLICK BOTON DEL CARRITO
console.log(carrito)
const btnCarrito = document.querySelector(".carrito__img");
btnCarrito.addEventListener('click', () => {
    console.log("Carrito: ", carrito)
    // if (carrito.length === 0) {
    //     $("#exampleModal").css("display", "none")
    //     // Llama a la librería Sweat Alert
    //     swal({
    //         text: `Aún no tenés productos agregados`,
    //         icon: "error",
    //     });
    // }

    // })
    //     console.log(carrito)
    while ($(".carrito-prod").length > 0) {
        $(".carrito-prod")[0].parentNode.removeChild($(".carrito-prod")[0])
    }; //evita la duplicación de los productos
    for (producto of carrito) {
        const div = document.createElement("div");
        div.setAttribute("id", "productoCarrito");
        div.setAttribute("class", "carrito-prod")
        div.innerHTML = `
        <b>${producto.titulo}</b> en ${producto.formato.toLowerCase()} ($${producto.precio})
        `;
        console.log(producto)
        const productoCarrito = document.querySelector("#modal__btn-carrito");
        productoCarrito.appendChild(div)
    }
})

// function carritoBoton(productoClikeado) {
//     console.log(productoClikeado);
//     const div = document.createElement("div");
//     div.setAttribute("id", `carrito-${productoClikeado.id}`);

//     div.innerHTML = `
//         <b>${productoClikeado.titulo}</b> en ${productoClikeado.formato.toLowerCase()} ($${productoClikeado.precio})`

//         //<button onclick="quitarCarrito(${productoClikeado.id})">QUITAR</button>
//         ;
//     const productoCarrito = document.querySelector("#modal__btn-carrito");
//     productoCarrito.appendChild(div)
// }
// function quitarCarrito(productoQuitado){
//     let aQuitar = $(`#carrito-${productoQuitado}`)
//     console.log(aQuitar);
//     --carrito.length
//     aQuitar.css("display", "none")
//     console.log(productoQuitado)
//     localS();
// }

// MODAL CUPON ANIMADO
// Crea un popup donde se informa un cupón de descuento
$("html").append(`
<div class="modal modal-cupon" tabindex="-1">
<div class="modal-dialog modal-dialog-centered">
  <div class="modal-content">
    <div class="modal-header modal-cupon__header">
      <h5 class="modal-title">Solo por hoy</h5>
    </div>
    <div class="modal-body">
      <p style="color:initial">Usá el cupón <b>BEATLE</b> y obtené un 20% OFF</p>
    </div>
  </div>
</div>
</div>
`)
// $("body").animate({
//     opacity: '0.2'
//     //oscurece el fondo para darle mayor importancia al popup
// },
//     "slow",
//     // El popup aparece y desaparece solo
//     () => {
//         $(".modal-cupon")
//             .fadeIn(1000)
//             .delay(2500)
//             .fadeOut(1000, () => {
//                 $("body").animate({
//                     opacity: '1'
//                 }, "slow")
//                 //vuelve a mostrar el body normal
//             });
//     })


// FILTROS
// AL BUSCAR UN PRODUCTO, SE MUESTRA EN PANTALLA RESULTADOS SEGUN LA COINCIDENCIA DE LA BUSQUEDA CON EL TITULO DEL ALBUM

// Función para mostrar todos los productos
const displayFlex = () => {
    for (producto of $(".producto")) {
        $(producto).css("display", "flex");
    }
}

// $(".buscador__input").keyup((e) => {
//     const busqueda = e.target.value.toUpperCase();
//     for (producto of $(".producto")) {
//         const titulo = producto.children[1];
//         const tituloCoincidir = titulo.textContent;
//         if ((tituloCoincidir.toUpperCase().includes(busqueda))) {

//             $(producto).fadeIn();

//         } else {
//             $(producto).fadeOut(1000);
//         }

//         if ((tituloCoincidir.toUpperCase().includes(busqueda)) && ($("#filtro-cd").is(':checked'))) {
//             $(producto.children[3].textContent).fadeIn();
//         } 


//     }
// })

// $(".buscador__input").keyup((e) => {
//     const busqueda = e.target.value.toUpperCase();
//     for (producto of $(".producto")) {
//         const titulo = producto.children[1];
//         const tituloCoincidir = titulo.textContent;
//         if ((tituloCoincidir.toUpperCase().includes(busqueda))) {

//             $(producto).fadeIn();

//         } else {
//             $(producto).fadeOut(1000);
//         }

//         if ((tituloCoincidir.toUpperCase().includes(busqueda)) && ($("#filtro-cd").is(':checked'))) {
//             $(producto.children[3].textContent).fadeIn();
//         } 


//     }
// })
// SEARCH FILTER
const search = document.getElementById("buscador__input");
const productName = document.querySelectorAll(".producto__album");

// A BETTER WAY TO FILTER THROUGH THE PRODUCTS
search.addEventListener("keyup", filterProducts);


function filterProducts(e) {
    const text = e.target.value.toLowerCase();
    // console.log(productName[0]);
    productName.forEach(function (product) {
        const item = product.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            product.parentElement.style.display = "flex"
        } else {
            product.parentElement.style.display = "none"
        }
    })
}
const btns = document.querySelectorAll('.filtros__formato__input');
const storeProducts = document.querySelectorAll('.producto');
// const search = document.getElementById(search);

for (i = 0; i < btns.length; i++) {

    btns[i].addEventListener('click', (e) => {
        e.preventDefault()
        const filter = e.target.dataset.filter;
        console.log(filter);

        storeProducts.forEach((product) => {


            if (filter === 'all') {
                product.style.display = 'flex'
            } else {
                if (product.classList.contains(filter)) {
                   
                        product.style.display = 'flex'
                    
                } else {
                    product.style.display = 'none'
                }
            }
        });
        $("#buscador__input").val("")
    });
};

// // FLTRAR PRODUCTO POR FORMATO
// $("#filtro-cd").click((e) => {
//     displayFlex();
//     const filtro = e.target.value.toUpperCase();
//     for (producto of $(".producto")) {
//         const formatoCoincidir = producto.children[3].textContent;
//         if (formatoCoincidir.toUpperCase().includes(filtro)) {
//             if (producto.style.display != "none") {
//                 $(producto).css("display", "flex");
//             }
//         } else {
//             $(producto).css("display", "none");
//         }
//     }
//     // Oculta la sección de remeras de Mercado Libre
//     $("#meli").css("display", "none")
// })


// // Filtrar por vinilo
// $("#filtro-vinilo").click((e) => {
//     displayFlex();
//     const filtro = e.target.value.toUpperCase();
//     for (producto of $(".producto")) {
//         const formato = producto.children[3];
//         const formatoCoincidir = formato.textContent;
//         if ((formatoCoincidir.toUpperCase().includes(filtro))) {
//             if (producto.style.display != "none") {
//                 $(producto).css("display", "flex");
//             }
//         } else {
//             $(producto).css("display", "none");
//         }
//     }

//     probando(filtro)
//     // Oculta la sección de remeras de Mercado Libre
//     $("#meli").css("display", "none")
// })
// // Mostrar todos los productos
// const filtroTodosFormatos = $("#filtro-todos-formatos")
// filtroTodosFormatos.click(() => {
//     displayFlex() //albums
//     // Muestra la sección de remeras de Mercado Libre por si tiene display = none
//     $("#meli").css("display", "grid")
// })

// FILTRAR POR PRECIO

$("#precio").on("input", (e) => {
    $("#filtro-todos-formatos").prop("checked", true);

    const filtro = parseInt(e.target.value);
    for (producto of $(".producto")) {
        const precio = producto.children[2].children[0];

        const precioCoincidir = parseInt(precio.textContent);

        if (precioCoincidir < filtro) {

            if (producto.style.display != "none") {
                producto.style.display = "flex";
            }

        } else {
            producto.style.display = "none";
        }


        const precioParcial = document.getElementById("filtro-precio")
        precioParcial.innerHTML = `$${filtro}`
    }

})



// ORDENAR POR AÑO
// Ordenar de más nuevo a más antiguo
$("#filtro-año-reciente").click(() => {

    productos.sort(function (a, b) {
        if (a.año > b.año) {
            return -1;
        }
        if (a.año < b.año) {
            return 1;
        }
        return 0;
    })
    actualizaTienda()
    // Oculta la sección de remeras de Mercado Libre
    $("#meli").css("display", "none")
})
// Ordenar de más antiguo a más nuevo
$("#filtro-año-antiguo").click(() => {
    productos.sort(function (a, b) {
        if (a.año < b.año) {
            return -1;
        }
        if (a.año > b.año) {
            return 1;
        }
        return 0;
    })
    actualizaTienda()
    // Oculta la sección de remeras de Mercado Libre
    $("#meli").css("display", "none")
})

// FUNCION PARA BORRAR LOS ELEMENTOS DE INICIO DE LA TIENDA Y ACTUALIZARLOS VOLVIENDOLOS A IMPRIMIR
function actualizaTienda() {
    while ($(".producto").length > 0) {
        $(".producto")[0].parentNode.removeChild($(".producto")[0]);
    }
    productosTienda();
}
