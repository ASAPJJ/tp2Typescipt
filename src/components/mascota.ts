import { v4 as uuidv4 } from 'uuid';

class MascotaVirtual {
  id: string;
  nombre: string;
  nivelFelicidad: number;
  nivelHambre: number;

  constructor(nombre: string) {
    this.id = uuidv4();
    this.nombre = nombre;
    this.nivelFelicidad = 50;
    this.nivelHambre = 50;
  }

  alimentar() {
    this.nivelHambre -= 10;
    this.nivelFelicidad += 5;
    this.verificarNiveles();
  }

  jugar() {
    this.nivelFelicidad += 10;
    this.nivelHambre += 5;
    this.verificarNiveles();
  }

  cuidar() {
    this.nivelFelicidad += 5;
    this.verificarNiveles();
  }

  private verificarNiveles() {
    this.nivelFelicidad = Math.max(0, Math.min(100, this.nivelFelicidad));
    this.nivelHambre = Math.max(0, Math.min(100, this.nivelHambre));
  }
}

document.querySelector<HTMLDivElement>('#tp4')!.innerHTML = `
  <div>
    <h3>Simulación de Mascota Virtual</h3>
    <label for="nombreMascota">Nombre de la Mascota:</label>
    <input type="text" id="nombreMascota">
    <button id="crearMascota">Crear Mascota</button>
    <div id="interaccionMascota" style="display: none;">
      <h4>Mascota</h4>
      <p>Nombre: <span id="nombreMascotaSpan"></span></p>
      <p>Nivel de Felicidad: <span id="nivelFelicidadSpan"></span></p>
      <p>Nivel de Hambre: <span id="nivelHambreSpan"></span></p>
      <button id="alimentar">Alimentar</button>
      <button id="jugar">Jugar</button>
      <button id="cuidar">Cuidar</button>
    </div>
  </div>
`;

let mascota: MascotaVirtual | null = null;

document.querySelector<HTMLButtonElement>('#crearMascota')?.addEventListener('click', () => {
  const nombreMascota = (document.querySelector<HTMLInputElement>('#nombreMascota') as HTMLInputElement).value;
  if (nombreMascota.trim() === '') {
    alert('Por favor, ingresa un nombre para tu mascota.');
    return;
  }

  mascota = new MascotaVirtual(nombreMascota);
  actualizarInterfazMascota();
});

document.querySelector<HTMLButtonElement>('#alimentar')?.addEventListener('click', () => {
  if (mascota) {
    mascota.alimentar();
    actualizarInterfazMascota();
  }
});

document.querySelector<HTMLButtonElement>('#jugar')?.addEventListener('click', () => {
  if (mascota) {
    mascota.jugar();
    actualizarInterfazMascota();
  }
});

document.querySelector<HTMLButtonElement>('#cuidar')?.addEventListener('click', () => {
  if (mascota) {
    mascota.cuidar();
    actualizarInterfazMascota();
  }
});

function actualizarInterfazMascota() {
  if (mascota) {
    document.querySelector<HTMLDivElement>('#interaccionMascota')!.style.display = 'block';
    document.querySelector<HTMLSpanElement>('#nombreMascotaSpan')!.textContent = mascota.nombre;
    document.querySelector<HTMLSpanElement>('#nivelFelicidadSpan')!.textContent = mascota.nivelFelicidad.toString();
    document.querySelector<HTMLSpanElement>('#nivelHambreSpan')!.textContent = mascota.nivelHambre.toString();
  }
}
