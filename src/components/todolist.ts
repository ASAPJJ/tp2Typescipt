import { v4 as uuidv4 } from 'uuid';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <h3>Lista de Tareas</h3>
  <button id="mostrarFormularioToDoList">Mostrar Formulario</button>
  <button id="ocultarFormularioToDoList" style="display: none;">Ocultar Formulario</button>
  <div id="formularioToDoList" style="display: none;">
    <form id='cargarTarea'>
      <label for="nuevaTarea">Ingrese Tarea:</label>
      <input 
        type='text'
        name="nuevaTarea"
        id='nuevaTarea'
      />
      <label for="fechaVencimiento">Fecha de Vencimiento:</label>
      <input
        type='date'
        name='fechaVencimiento'
        id='fechaVencimiento'
      />
      <button type='submit'>Agregar Tarea</button>
    </form>
  </div>
  <div id='resultado'></div>
  <div id='tp2'></div>
</div>
`;

class Tarea {
  id: string;
  nombre: string;
  fechaVencimiento: Date;
  completada: boolean;

  constructor(nombre: string, fechaVencimiento: Date) {
    this.id = uuidv4();
    this.nombre = nombre;
    this.fechaVencimiento = fechaVencimiento;
    this.completada = false;
  }
  
  completar() {
    this.completada = true;
  }
}

const listaTareas: Tarea[] = [];

document.querySelector<HTMLButtonElement>('#mostrarFormularioToDoList')?.addEventListener('click', () => {
  const formulario = document.querySelector<HTMLDivElement>('#formularioToDoList')!;
  const mostrarBtn = document.querySelector<HTMLButtonElement>('#mostrarFormularioToDoList')!;
  const ocultarBtn = document.querySelector<HTMLButtonElement>('#ocultarFormularioToDoList')!;
  
  formulario.style.display = 'block';
  mostrarBtn.style.display = 'none';
  ocultarBtn.style.display = 'block';
});

document.querySelector<HTMLButtonElement>('#ocultarFormularioToDoList')?.addEventListener('click', () => {
  const formulario = document.querySelector<HTMLDivElement>('#formularioToDoList')!;
  const mostrarBtn = document.querySelector<HTMLButtonElement>('#mostrarFormularioToDoList')!;
  const ocultarBtn = document.querySelector<HTMLButtonElement>('#ocultarFormularioToDoList')!;
  
  formulario.style.display = 'none';
  mostrarBtn.style.display = 'block';
  ocultarBtn.style.display = 'none';
});

document.querySelector<HTMLFormElement>('#cargarTarea')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget! as HTMLFormElement);
  const nombreTarea = formData.get('nuevaTarea') as string;
  const fechaVencimientoStr = formData.get('fechaVencimiento') as string;
  const fechaVencimiento = new Date(fechaVencimientoStr);

  const nuevaTarea = new Tarea(nombreTarea, fechaVencimiento);

  agregarTareaALaLista(nuevaTarea);
  mostrarTareasEnElDOM();
});

const contenedorTareas = document.querySelector<HTMLDivElement>('#resultado')!;

function agregarTareaALaLista(tarea: Tarea) {
  listaTareas.push(tarea);
}

function mostrarTareasEnElDOM() {
  contenedorTareas.innerHTML = ''; // Limpiar el contenido anterior

  listaTareas.forEach((tarea) => {
    const tareaDiv = document.createElement('div');
    tareaDiv.innerHTML = `
      <p>Nombre: ${tarea.nombre}</p>
      <p>Fecha de Vencimiento: ${tarea.fechaVencimiento.toDateString()}</p>
      ${!tarea.completada ? '<button class="completar-btn" data-id="' + tarea.id + '">Completar</button>' : ''}
      <span class="mensaje-completada">${tarea.completada ? 'Tarea completada' : ''}</span>
      <button class="eliminar-btn" data-id="${tarea.id}">Eliminar</button>
    `;

    const completarButton = tareaDiv.querySelector('.completar-btn');
    if (completarButton) {
      completarButton.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        if (id) {
          completarTarea(id);
          mostrarTareasEnElDOM();
        }
      });
    }

    const eliminarButton = tareaDiv.querySelector('.eliminar-btn');
    if (eliminarButton) {
      eliminarButton.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        if (id) {
          eliminarTarea(id);
          mostrarTareasEnElDOM();
        }
      });
    }

    contenedorTareas.appendChild(tareaDiv);
  });
}

function completarTarea(id: string) {
  const tarea = listaTareas.find((t) => t.id === id);
  if (tarea) {
    tarea.completar();
  }
}

function eliminarTarea(id: string) {
  const tareaIndex = listaTareas.findIndex((t) => t.id === id);
  if (tareaIndex !== -1) {
    listaTareas.splice(tareaIndex, 1);
  }
}

mostrarTareasEnElDOM();

