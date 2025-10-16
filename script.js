const form = document.getElementById("tareaForm");
const lista = document.getElementById("listaTareas");
const totalSpan = document.getElementById("total");
const borrarBtn = document.getElementById("borrarTodo");
const modoBtn = document.getElementById("modoBtn");

let tareas = [];

// Agregar tarea
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const tareaInput = document.getElementById("nueva-tarea").value.trim();
  if (tareaInput === "") return;

  tareas.push({ nombre: tareaInput, completada: false });
  actualizarTareas();
  form.reset();
});

// Actualizar lista y total
function actualizarTareas() {
  lista.innerHTML = "";
  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.textContent = tarea.nombre;

    // Estilo si está completada
    if (tarea.completada) {
      li.style.textDecoration = "line-through";
      li.style.opacity = "0.6";
    }

    // Botón completar
    const btnCompletar = document.createElement("button");
    btnCompletar.textContent = "✅";
    btnCompletar.addEventListener("click", () => {
      tareas[index].completada = !tareas[index].completada;
      actualizarTareas();
    });

    // Botón borrar
    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "🗑️";
    btnBorrar.addEventListener("click", () => {
      tareas.splice(index, 1);
      actualizarTareas();
    });

    li.appendChild(btnCompletar);
    li.appendChild(btnBorrar);

    lista.appendChild(li);
  });

  totalSpan.textContent = tareas.length;
}

// Borrar todas las tareas
borrarBtn.addEventListener("click", () => {
  tareas = [];
  actualizarTareas();
});

// Modo oscuro / claro
modoBtn.addEventListener("click", () => {
  document.body.classList.toggle("claro");
  modoBtn.textContent = document.body.classList.contains("claro") ? "☀️ Modo claro" : "🌙 Modo oscuro";
});
