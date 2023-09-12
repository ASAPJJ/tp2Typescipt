document.querySelector<HTMLDivElement>('#tp2')!.innerHTML = `
<div>
  <h3>Calculadora de Geometría</h3>
  <button id="mostrarFormularioGeometria">Mostrar Formulario</button>
  <div id="formularioGeo" style="display: none;">
    <p>Ingresa los datos de la figura:</p>
    <label for="figura">Selecciona una figura:</label>
    <select id="figura">
      <option value="circulo">Círculo</option>
      <option value="rectangulo">Rectángulo</option>
      <option value="triangulo">Triángulo</option>
    </select>
    <div id="inputs"></div>
    <button id="calcularGeometria">Calcular</button>
    <button id="ocultarFormulario">Ocultar Formulario</button>
  </div>
  <div id="resultadoGeo"></div>
  <div id="tp3"></div>
</div>
`;

class Circulo {
  constructor(private radio: number) {}

  calcularArea(): number {
    return Math.PI * this.radio ** 2;
  }

  calcularPerimetro(): number {
    return 2 * Math.PI * this.radio;
  }
}

class Rectangulo {
  constructor(private base: number, private altura: number) {}

  calcularArea(): number {
    return this.base * this.altura;
  }

  calcularPerimetro(): number {
    return 2 * (this.base + this.altura);
  }
}

class Triangulo {
  constructor(private lado1: number, private lado2: number, private lado3: number) {}

  calcularArea(): number {
    const s = (this.lado1 + this.lado2 + this.lado3) / 2;
    return Math.sqrt(s * (s - this.lado1) * (s - this.lado2) * (s - this.lado3));
  }

  calcularPerimetro(): number {
    return this.lado1 + this.lado2 + this.lado3;
  }
}

function mostrarInputsSegunFigura(figuraSeleccionada: string) {
  const inputsDiv = document.querySelector<HTMLDivElement>('#inputs')!;
  inputsDiv.innerHTML = '';

  switch (figuraSeleccionada) {
    case 'circulo':
      inputsDiv.innerHTML = `
        <label for="radio">Radio:</label>
        <input type="number" id="radio">
      `;
      break;
    case 'rectangulo':
      inputsDiv.innerHTML = `
        <label for="base">Base:</label>
        <input type="number" id="base">
        <label for="altura">Altura:</label>
        <input type="number" id="altura">
      `;
      break;
    case 'triangulo':
      inputsDiv.innerHTML = `
        <label for="lado1">Lado 1:</label>
        <input type="number" id="lado1">
        <label for="lado2">Lado 2:</label>
        <input type="number" id="lado2">
        <label for="lado3">Lado 3:</label>
        <input type="number" id="lado3">
      `;
      break;
    default:
      break;
  }
}

document.querySelector<HTMLButtonElement>('#mostrarFormularioGeometria')?.addEventListener('click', () => {
  const formulario = document.querySelector<HTMLDivElement>('#formularioGeo')!;
  formulario.style.display = 'block';
});

document.querySelector<HTMLButtonElement>('#ocultarFormulario')?.addEventListener('click', () => {
  const formulario = document.querySelector<HTMLDivElement>('#formularioGeo')!;
  formulario.style.display = 'none';
});

document.querySelector<HTMLSelectElement>('#figura')?.addEventListener('change', (e) => {
  const figuraSeleccionada = (e.target as HTMLSelectElement).value;
  mostrarInputsSegunFigura(figuraSeleccionada);
});

document.querySelector<HTMLButtonElement>('#calcularGeometria')?.addEventListener('click', () => {
  const figuraSeleccionada = (document.querySelector<HTMLSelectElement>('#figura') as HTMLSelectElement).value;
  const resultadoDiv = document.querySelector<HTMLDivElement>('#resultadoGeo')!;

  let resultadoHTML = '<h2>Resultado</h2>';
  let figura;

  switch (figuraSeleccionada) {
    case 'circulo':
      const radioCirculo = parseFloat((document.querySelector<HTMLInputElement>('#radio') as HTMLInputElement).value);
      figura = new Circulo(radioCirculo);
      resultadoHTML += `<p>Área del Círculo: ${figura.calcularArea().toFixed(2)}</p>`;
      resultadoHTML += `<p>Perímetro del Círculo: ${figura.calcularPerimetro().toFixed(2)}</p>`;
      break;
    case 'rectangulo':
      const baseRectangulo = parseFloat((document.querySelector<HTMLInputElement>('#base') as HTMLInputElement).value);
      const alturaRectangulo = parseFloat((document.querySelector<HTMLInputElement>('#altura') as HTMLInputElement).value);
      figura = new Rectangulo(baseRectangulo, alturaRectangulo);
      resultadoHTML += `<p>Área del Rectángulo: ${figura.calcularArea().toFixed(2)}</p>`;
      resultadoHTML += `<p>Perímetro del Rectángulo: ${figura.calcularPerimetro().toFixed(2)}</p>`;
      break;
    case 'triangulo':
      const lado1Triangulo = parseFloat((document.querySelector<HTMLInputElement>('#lado1') as HTMLInputElement).value);
      const lado2Triangulo = parseFloat((document.querySelector<HTMLInputElement>('#lado2') as HTMLInputElement).value);
      const lado3Triangulo = parseFloat((document.querySelector<HTMLInputElement>('#lado3') as HTMLInputElement).value);
      figura = new Triangulo(lado1Triangulo, lado2Triangulo, lado3Triangulo);
      resultadoHTML += `<p>Área del Triángulo: ${figura.calcularArea().toFixed(2)}</p>`;
      resultadoHTML += `<p>Perímetro del Triángulo: ${figura.calcularPerimetro().toFixed(2)}</p>`;
      break;
    default:
      resultadoHTML += '<p>Selecciona una figura válida.</p>';
  }

  resultadoDiv.innerHTML = resultadoHTML;
});
