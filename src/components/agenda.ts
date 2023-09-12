class Contacto {
    nombre: string;
    correo: string;
    telefono: string;
  
    constructor(nombre: string, correo: string, telefono: string) {
      this.nombre = nombre;
      this.correo = correo;
      this.telefono = telefono;
    }
  }
  
  class GestorDeContactos {
    contactos: Contacto[] = [];
  
    agregarContacto(contacto: Contacto) {
      this.contactos.push(contacto);
    }
  
    buscarContactoPorNombre(nombre: string) {
      return this.contactos.filter((contacto) =>
        contacto.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
    }
  
    listarContactos() {
      return this.contactos;
    }
  }
  
  document.querySelector<HTMLDivElement>('#tp5')!.innerHTML = `
    <div>
      <h3>Gestor de Contactos</h3>
      <form id='agregarContacto'>
        <label for="nombre">Nombre:</label>
        <input 
          type='text'
          name="nombre"
          id='nombre'
          required
        />
        <label for="correo">Correo Electrónico:</label>
        <input
          type='email'
          name='correo'
          id='correo'
          required
        />
        <label for="telefono">Número de Teléfono:</label>
        <input
          type='number '
          name='telefono'
          id='telefono'
          required
        />
        <button type='submit'>Agregar Contacto</button>
      </form>
      <div id='buscarContacto'>
        <label for="busquedaNombre">Buscar por Nombre:</label>
        <input 
          type='text'
          id='busquedaNombre'
        />
        <button id='buscar'>Buscar</button>
      </div>
      <div id='listaContactos'></div>
    </div>
  `;
  
  const gestorDeContactos = new GestorDeContactos();
  
  document.querySelector<HTMLFormElement>('#agregarContacto')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget! as HTMLFormElement);
    const nombre = formData.get('nombre') as string;
    const correo = formData.get('correo') as string;
    const telefono = formData.get('telefono') as string;
  
    const nuevoContacto = new Contacto(nombre, correo, telefono);
    gestorDeContactos.agregarContacto(nuevoContacto);
    mostrarListaDeContactos();
    limpiarFormulario('agregarContacto');
  });
  
  document.querySelector<HTMLButtonElement>('#buscar')?.addEventListener('click', () => {
    const busquedaNombre = (document.querySelector<HTMLInputElement>('#busquedaNombre') as HTMLInputElement).value;
    const resultados = gestorDeContactos.buscarContactoPorNombre(busquedaNombre);
    mostrarResultadosDeBusqueda(resultados);
  });
  
  function mostrarListaDeContactos() {
    const listaContactosDiv = document.querySelector<HTMLDivElement>('#listaContactos')!;
    const listaContactos = gestorDeContactos.listarContactos();
  
    let html = '<h4>Lista de Contactos:</h4>';
    if (listaContactos.length === 0) {
      html += '<p>No hay contactos disponibles.</p>';
    } else {
      html += '<ul>';
      listaContactos.forEach((contacto) => {
        html += `<li>${contacto.nombre} - ${contacto.correo} - ${contacto.telefono}</li>`;
      });
      html += '</ul>';
    }
  
    listaContactosDiv.innerHTML = html;
  }
  
  function mostrarResultadosDeBusqueda(resultados: Contacto[]) {
    const listaContactosDiv = document.querySelector<HTMLDivElement>('#listaContactos')!;
    let html = '<h4>Resultados de Búsqueda:</h4>';
    
    if (resultados.length === 0) {
      html += '<p>No se encontraron resultados.</p>';
    } else {
      html += '<ul>';
      resultados.forEach((contacto) => {
        html += `<li>${contacto.nombre} - ${contacto.correo} - ${contacto.telefono}</li>`;
      });
      html += '</ul>';
    }
  
    listaContactosDiv.innerHTML = html;
  }
  
  function limpiarFormulario(formId: string) {
    const formulario = document.querySelector<HTMLFormElement>(`#${formId}`);
    formulario?.reset();
  }
  