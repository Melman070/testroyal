let filaActual;

function obtenerInventario() {
  const inventario = localStorage.getItem('inventario');
  return inventario ? JSON.parse(inventario) : [];
}

function guardarInventario(inventario) {
  localStorage.setItem('inventario', JSON.stringify(inventario));
}

function cargarInventario() {
  const tabla = document.getElementById('tabla-inventario');
  tabla.innerHTML = '';

  const inventario = obtenerInventario();

  inventario.forEach((moto, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${moto.nombre}</td>
      <td>${moto.modelo}</td>
      <td>${moto.anio}</td>
      <td>${moto.color}</td>
      <td>${moto.cantidad}</td>
      <td>
        <button class="btn btn-edit btn-sm" onclick="editarFila(${index})">Editar</button>
        <button class="btn btn-delete btn-sm" onclick="eliminarFila(${index})">Borrar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });

  aplicarColorTexto();
}

function editarFila(index) {
  const inventario = obtenerInventario();
  const moto = inventario[index];

  filaActual = index;

  document.getElementById('edit-nombre').value = moto.nombre;
  document.getElementById('edit-modelo').value = moto.modelo;
  document.getElementById('edit-anio').value = moto.anio;
  document.getElementById('edit-color').value = moto.color;
  document.getElementById('edit-cantidad').value = moto.cantidad;

  const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
  modal.show();
}

function guardarCambios() {
  const inventario = obtenerInventario();

  inventario[filaActual] = {
    nombre: document.getElementById('edit-nombre').value,
    modelo: document.getElementById('edit-modelo').value,
    anio: document.getElementById('edit-anio').value,
    color: document.getElementById('edit-color').value,
    cantidad: document.getElementById('edit-cantidad').value
  };

  guardarInventario(inventario);
  bootstrap.Modal.getInstance(document.getElementById('modalEditar')).hide();
  cargarInventario();
}

function eliminarFila(index) {
  if (confirm("¿Estás seguro de eliminar esta moto?")) {
    const inventario = obtenerInventario();
    inventario.splice(index, 1);
    guardarInventario(inventario);
    cargarInventario();
  }
}

// Colorea la columna de color
function aplicarColorTexto() {
  document.querySelectorAll("#tabla-inventario tr").forEach(fila => {
    const colorCell = fila.children[3];
    if (!colorCell) return;

    const colorTexto = colorCell.innerText.toLowerCase();

    switch (colorTexto) {
      case 'rojo':
        colorCell.style.color = 'red';
        break;
      case 'negro':
        colorCell.style.color = 'black';
        break;
      case 'azul':
        colorCell.style.color = 'blue';
        break;
      case 'verde':
        colorCell.style.color = 'green';
        break;
      default:
        colorCell.style.color = 'white';
        break;
    }
  });
}

// Datos por defecto solo si no hay inventario guardado
function inicializarInventario() {
  if (!localStorage.getItem('inventario')) {
    const datosIniciales = [
      {
        nombre: "Honda CB190R",
        modelo: "CB190R",
        anio: "2022",
        color: "Rojo",
        cantidad: "4"
      },
      {
        nombre: "Yamaha FZ25",
        modelo: "FZ25",
        anio: "2021",
        color: "Negro",
        cantidad: "2"
      }
    ];
    guardarInventario(datosIniciales);
  }
}

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  inicializarInventario();
  cargarInventario();
});
