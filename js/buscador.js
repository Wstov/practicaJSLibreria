// VARIABLES
const listado = document.querySelector("#listado");

// ENEVETLISTENER
document.addEventListener("DOMContentLoaded", () => {
  mostrarListado();
});

// FUNCIONES
function mostrarListado() {
  librosBD.forEach((libro) => {
    const { imagen, nombre, autor, precio } = libro;
    const listadoHTML = document.createElement("div");
    listadoHTML.innerHTML = `
          <div class="card mb-1">
          <div class="card-body d-flex flex-row align-items-center">
            <p class="card-text mr-3" style="margin-right: 15px">
              <img src="../${imagen}" width="100">  ${nombre} - ${autor} - Precio: ${precio}
            </p>
            <a href="#" class="btn btn-primary">Agregar al Carrito</a>
          </div>
          </div>
            `;

    listado.appendChild(listadoHTML);
  });
}
