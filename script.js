const form = document.getElementById("tareaForm");
const inputTarea = document.getElementById("nueva-tarea");
const lista = document.getElementById("listaTareas");
const totalSpan = document.getElementById("total");
const borrarBtn = document.getElementById("borrarTodo");
const modoBtn = document.getElementById("modoBtn");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Guardar tareas en el navegador
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Mostrar y actualizar las tareas
function actualizarTareas() {
  lista.innerHTML = "";

  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.textContent = tarea.nombre;

    if (tarea.completada) {
      li.style.textDecoration = "line-through";
      li.style.opacity = "0.6";
    }

    // Botón completar
    const btnCompletar = document.createElement("button");

    btnCompletar.type = "button";
    btnCompletar.textContent = "✅";
    btnCompletar.setAttribute(
      "aria-label",
      tarea.completada ? "Marcar como pendiente" : "Completar tarea"
    );

    btnCompletar.addEventListener("click", () => {
      tareas[index].completada = !tareas[index].completada;
      actualizarTareas();
    });

    // Botón borrar
    const btnBorrar = document.createElement("button");

    btnBorrar.type = "button";
    btnBorrar.textContent = "🗑️";
    btnBorrar.setAttribute("aria-label", "Eliminar tarea");

    btnBorrar.addEventListener("click", () => {
      tareas.splice(index, 1);
      actualizarTareas();
    });

    li.appendChild(btnCompletar);
    li.appendChild(btnBorrar);

    lista.appendChild(li);
  });

  totalSpan.textContent = tareas.length;

  // Se guarda después de cualquier modificación
  guardarTareas();
}

// Agregar tarea
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombreTarea = inputTarea.value.trim();

  if (nombreTarea === "") return;

  tareas.push({
    nombre: nombreTarea,
    completada: false,
  });

  actualizarTareas();
  form.reset();
  inputTarea.focus();
});

// Borrar todas las tareas
borrarBtn.addEventListener("click", () => {
  tareas = [];
  actualizarTareas();
});

// Cambiar modo oscuro/claro
modoBtn.addEventListener("click", () => {
  document.body.classList.toggle("claro");

  const modoClaro = document.body.classList.contains("claro");

  modoBtn.textContent = modoClaro
    ? "🌙 Modo oscuro"
    : "☀️ Modo claro";
});

// Mostrar las tareas guardadas al iniciar
actualizarTareas();