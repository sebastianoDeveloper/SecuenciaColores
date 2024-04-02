const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const startGame = document.getElementById('btnEmpezar');
const LAST_LEVEL = 5;
class Juego{
  constructor() {
    // alert('Metrocidad');
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel(), 500);
  }
  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    this.colores = {
      // celeste:celeste,
      celeste,
      naranja,
      violeta,
      verde,
    };
  }
  toggleBtnEmpezar() {
    if (startGame.classList.contains('hide') ) {
      startGame.classList.remove('hide');
    } else {
      startGame.classList.add('hide');
    }
  }
  generarSecuencia() {
    // es importante tener el fill con 0,xk el map no a funcionar con un array k no tiene los elementos definidos,osea un array vacio
    this.secuencia = new Array(LAST_LEVEL).fill(0).map(x => Math.floor(Math.random() * 4));
  }
  siguienteNivel() {
    // this.nameAtributo = 'nameValor'
    this.subnivel = 0
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }
  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
      default:
        return null
    }
  }
  transformarColorANumero(color) {
    switch (color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
      default:
        return null
    }
  }
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      // secuencia es un array de numeros aleatorios,accedemos de forma ordenada a su contenido para luego mandarlo a la funcion
      setTimeout(() => {
        this.iluminarColor(color);
      }, 1000 * i);
    }
  }
  iluminarColor(color) {
    console.log(this.colores[color]);
    this.colores[color].classList.add('light');
    setTimeout(() => {
      this.apagarColor(color);
    }, 350);
  }
  apagarColor(color) {
    this.colores[color].classList.remove('light');
  }
  agregarEventosClick() {
    this.colores.celeste.addEventListener('click', this.elegirColor);
    this.colores.violeta.addEventListener('click', this.elegirColor);
    this.colores.naranja.addEventListener('click', this.elegirColor);
    this.colores.verde.addEventListener('click', this.elegirColor);
  }
  eliminarEventoClick() {
    this.colores.celeste.removeEventListener('click', this.elegirColor);
    this.colores.violeta.removeEventListener('click', this.elegirColor);
    this.colores.naranja.removeEventListener('click', this.elegirColor);
    this.colores.verde.removeEventListener('click', this.elegirColor);

  }
  elegirColor(ev) {
    const nameColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nameColor);
    this.iluminarColor(nameColor);
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++
      if (this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventoClick()
        if (this.nivel === (LAST_LEVEL + 1)) {
          this.ganoElJuego()
        } else {
          setTimeout(this.siguienteNivel, 1500);
          // es la referencia a la función pero no lo estamos llamando
        }
      }
    } else {
      this.perdioElJuego()
    }
  }
  ganoElJuego() {
    swal('Platzi', '¡Ganaste el juego!', 'success')
    .then(this.inicializar );
  }
  perdioElJuego() {
    swal('Platzi', '¡Lo lamentamos, perdiste el juego!', 'error')
    .then(() => {
      this.eliminarEventoClick()
      this.inicializar()
    } );
  }
}
function empezarJuego() {
 window.juego = new Juego();
}