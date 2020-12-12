const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL=12

class Juego {
  constructor() {
    this.inicializar()
    this.generarSecuencia()
    this.siguenteNivel()
  }

  inicializar() {
    this.nivel=1
    this.colores={celeste,violeta,naranja,verde}
    this.elegirColor=this.elegirColor.bind(this)
    this.siguenteNivel=this.siguenteNivel.bind(this)
    this.toggleBtnEmpezar()
  }
  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }
  }
  generarSecuencia(){
    this.secuencia=new Array(ULTIMO_NIVEL).fill(0).map(n=>Math.floor(Math.random()*4))
  }
  siguenteNivel(){
    this.subnivel=0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }
  transformarNumeroaColor(numero){
    switch(numero){
      case 0: return 'celeste'
      case 1: return 'violeta'
      case 2: return 'naranja'
      case 3: return 'verde'
    }
  }
  transformarColoraNumero(color){
    switch(color){
      case 'celeste': return 0
      case 'violeta': return 1
      case 'naranja': return 2
      case 'verde': return 3
    }
  }
  iluminarSecuencia(){
    for (let i=0; i<this.nivel; i++){
      let color=this.transformarNumeroaColor(this.secuencia[i])
      setTimeout(()=>this.iluminarColor(color), 1000 * i)
    }
  }
  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(()=>this.apagarColor(color), 350)
  }
  apagarColor(color){
    this.colores[color].classList.remove('light')
  }
  agregarEventosClick(){
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
  }
  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev){
    const nombreColor=ev.target.dataset.color
    console.log(nombreColor);
    const numeroColor=this.transformarColoraNumero(nombreColor)
    this.iluminarColor(nombreColor)
    if(numeroColor === this.secuencia[this.subnivel]){
      this.subnivel++
      if(this.subnivel===this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if(this.nivel===ULTIMO_NIVEL+1){
          this.ganoElJuego()
        }else{
          swal("Simon Dice:", `Has pasado al nivel :${this.nivel}`,"success")
          .then(()=>setTimeout(this.siguenteNivel, 2000)) 
        }
      }
    }else{
      this.perdioElJuego()
    }
  }

  ganoElJuego(){
    swal("Simon Dice:", "Has ganado! :D","success")
    .then(()=>{
      this.inicializar()
    })
  }
  perdioElJuego(){
    swal("Simon Dice:", "Has perdido! :(" ,"error")
    .then(()=>{
      this.eliminarEventosClick()
      this.inicializar()
    })
  }
}

function empezarJuego() {
  window.juego = new Juego()
}