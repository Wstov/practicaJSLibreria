// VARIABLES GLOBALES
const libroCard = document.querySelector("#lista-libros");
const carrito = document.querySelector("#carrito tbody");
const vaciarCarritoBTN = document.querySelector("#vaciarCarritoBTN");

let arregloLibros = [];

// ADD EVENT LISTENERS
ejecutaEventListeners();
function ejecutaEventListeners() {
  libroCard.addEventListener("click", datosCard);
  vaciarCarritoBTN.addEventListener("click", vaciarCarrito);
  carrito.addEventListener('click', eliminarElemtosCarrito)
}

// FUNCIONES
function datosCard(e) {
  e.preventDefault;
  if (e.target.classList.contains("agregar-carrito")) {
    crearObjetoLibro(e.target.parentElement.parentElement.parentElement);
  }
}

function crearObjetoLibro(datos) {
  const infoLibro = {
    imagen: datos.querySelector("img").src,
    titulo: datos.querySelector("h5").textContent,
    autor: datos.querySelector("h6").textContent,
    precio: extraerPrecio(datos.querySelector("p").textContent),
    cantidad: 1,
    id: datos.querySelector("button").getAttribute("data-id"),
  };


  if (arregloLibros.some((libro) => libro.id === infoLibro.id)) {
    let libros = arregloLibros.map((libro) => {
      if (libro.id === infoLibro.id) {
        libro.cantidad++;
        libro.precio += infoLibro.precio;
        return libro;
      } else {
        return libro;
      }
    });
    arregloLibros = [...libros];
  } else {
    arregloLibros = [...arregloLibros, infoLibro];
  }
  crearHTMLCarrito(arregloLibros);
}

function eliminarElemtosCarrito(e) {
  if (e.target.classList.contains('bin-button')) {
    const libroID = e.target.getAttribute("data-id")
    arregloLibros = arregloLibros.filter(libro => libro.id !== libroID)
  }
  crearHTMLCarrito(arregloLibros)
}

function crearHTMLCarrito(arregloLibros) {
  vaciarCarrito();
  arregloLibros.forEach((libro) => {
    const { imagen, titulo, autor, precio, cantidad, id } = libro;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="${imagen}" width="100"></td>
    <td>${titulo}</td>
    <td>${autor}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td>
      <button class="bin-button" data-id="${id}">
        <svg
          class="bin-top"
          viewBox="0 0 39 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          >
          <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
          <line
            x1="12"
            y1="1.5"
            x2="26.0357"
            y2="1.5"
            stroke="white"
            stroke-width="3"
          ></line>
        </svg>
      <svg
        class="bin-bottom"
        viewBox="0 0 33 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1_8_19" fill="white">
        <path
          d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
        ></path>
        </mask>
        <path
        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
        fill="white"
        mask="url(#path-1-inside-1_8_19)"
        ></path>
        <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
        <path d="M21 6V29" stroke="white" stroke-width="4"></path>
      </svg>
      </button>
    </td>
    `;

    carrito.appendChild(row);
  });
}

// Extraemos el valor numerico del texto <p>
function extraerPrecio(precioText) {
  const regex = /\$\s*(\d+(\.\d+)?)/;
  const match = precioText.match(regex);

  if (match) {
    return parseFloat(match[1]);
  } else {
    return 0;
  }
}

function vaciarCarrito() {
  while (carrito.firstChild) {
    carrito.removeChild(carrito.firstChild);
  }
}
