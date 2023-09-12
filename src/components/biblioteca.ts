import { v4 as uuidv4 } from 'uuid';

class Libro {
  id: string;
  titulo: string;
  autor: string;
  prestado: boolean;

  constructor(titulo: string, autor: string) {
    this.id = uuidv4();
    this.titulo = titulo;
    this.autor = autor;
    this.prestado = false;
  }

  prestar() {
    this.prestado = true;
  }

  devolver() {
    this.prestado = false;
  }
}

class Biblioteca {
  libros: Libro[] = [];

  agregarLibro(libro: Libro) {
    this.libros.push(libro);
  }

  prestarLibro(id: string) {
    const libro = this.libros.find((l) => l.id === id);
    if (libro && !libro.prestado) {
      libro.prestar();
    }
  }

  devolverLibro(id: string) {
    const libro = this.libros.find((l) => l.id === id);
    if (libro && libro.prestado) {
      libro.devolver();
    }
  }

  listarLibrosDisponibles() {
    return this.libros.filter((libro) => !libro.prestado);
  }

  listarLibrosPrestados() {
    return this.libros.filter((libro) => libro.prestado);
  }
}

document.querySelector<HTMLDivElement>('#tp3')!.innerHTML = `
  <div>
    <h3>Biblioteca Virtual</h3>
    <button id="mostrarFormulario">Mostrar Formulario</button>
    <div id="formularioBiblioteca" style="display: none;">
      <form id='agregarLibro'>
        <label for="titulo">Título del Libro:</label>
        <input 
          type='text'
          name="titulo"
          id='titulo'
        />
        <label for="autor">Autor:</label>
        <input
          type='text'
          name='autor'
          id='autor'
        />
        <button type='submit'>Agregar Libro</button>
      </form>
    </div>
    <div id='librosDisponibles'></div>
    <div id='librosPrestados'></div>
  </div>
  <div id='tp4'></div>
`;

const biblioteca = new Biblioteca();

document.querySelector<HTMLButtonElement>('#mostrarFormulario')?.addEventListener('click', () => {
  const formulario = document.querySelector<HTMLDivElement>('#formularioBiblioteca')!;
  formulario.style.display = 'block';
});

document.querySelector<HTMLFormElement>('#agregarLibro')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget! as HTMLFormElement);
  const titulo = formData.get('titulo') as string;
  const autor = formData.get('autor') as string;

  const libro = new Libro(titulo, autor);
  biblioteca.agregarLibro(libro);
  mostrarEstadoBiblioteca();
  limpiarFormulario('agregarLibro');
});

function mostrarEstadoBiblioteca() {
  const librosDisponiblesDiv = document.querySelector<HTMLDivElement>('#librosDisponibles')!;
  const librosPrestadosDiv = document.querySelector<HTMLDivElement>('#librosPrestados')!;

  const librosDisponibles = biblioteca.listarLibrosDisponibles();
  const librosPrestados = biblioteca.listarLibrosPrestados();

  librosDisponiblesDiv.innerHTML = '<h4>Libros Disponibles:</h4>' + librosToHTML(librosDisponibles);
  librosPrestadosDiv.innerHTML = '<h4>Libros Prestados:</h4>' + librosToHTML(librosPrestados);
}

function librosToHTML(libros: Libro[]): string {
  let html = '';
  libros.forEach((libro) => {
    html += `<p>${libro.titulo} - ${libro.autor} `;
    if (!libro.prestado) {
      html += `<button class="prestar-btn" data-id="${libro.id}">Prestar</button>`;
    } else {
      html += `<button class="devolver-btn" data-id="${libro.id}">Devolver</button>`;
    }
    html += '</p>';
  });
  return html;
}

document.querySelector<HTMLDivElement>('#librosDisponibles')?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('prestar-btn')) {
    const id = target.getAttribute('data-id');
    if (id) {
      biblioteca.prestarLibro(id);
      mostrarEstadoBiblioteca();
    }
  }
});

document.querySelector<HTMLDivElement>('#librosPrestados')?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('devolver-btn')) {
    const id = target.getAttribute('data-id');
    if (id) {
      biblioteca.devolverLibro(id);
      mostrarEstadoBiblioteca();
    }
  }
});

function limpiarFormulario(formId: string) {
  const formulario = document.querySelector<HTMLFormElement>(`#${formId}`);
  formulario?.reset();
}
