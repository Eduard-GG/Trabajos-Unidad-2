const contenido = document.querySelector('.contenido')
//Medidas de el tablero
const altoDelTablero = 600
const anchoDelTablero = 1000
const altoDelBloque = 20
const anchoDelBLoque = 100

//Posicion barra jugador
const posicionInicialDelJugador = [430, 10]
let posicionActualDelJugador = posicionInicialDelJugador

//Posicion de la pelota
const posicionInicialPelota = [490, 40]
let posicionActualPelota = posicionInicialPelota

//Direccion de la pelota
let xDiereccionPelota = 2
let yDiereccionPelota = 2
let diametro = 20
//Timer
let timerID

class Bloque{
    constructor(ejeX, ejeY){
        this.buttomIzq = [ejeX, ejeY]
        this.buttomDer = [ejeX + anchoDelBLoque, ejeY]
        this.topIzq = [ejeX, ejeY + altoDelBloque]
        this.topDer = [ejeX + anchoDelBLoque, ejeY + altoDelBloque]

    }
}
//Definir todos los bloques que
const bloques  = [
    new Bloque(10, 570),
    new Bloque(120, 570),
    new Bloque(230, 570),
    new Bloque(340, 570),
    new Bloque(450, 570),
    new Bloque(560, 570),
    new Bloque(670, 570),
    new Bloque(780, 570),
    new Bloque(890, 570),
    
    new Bloque(10, 540),
    new Bloque(120, 540),
    new Bloque(230, 540),
    new Bloque(340, 540),
    new Bloque(450, 540),
    new Bloque(560, 540),
    new Bloque(670, 540),
    new Bloque(780, 540),
    new Bloque(890, 540),

    new Bloque(10, 510),
    new Bloque(120, 510),
    new Bloque(230, 510),
    new Bloque(340, 510),
    new Bloque(450, 510),
    new Bloque(560, 510),
    new Bloque(670, 510),
    new Bloque(780, 510),
    new Bloque(890, 510),
    
    new Bloque(10, 480),
    new Bloque(120, 480),
    new Bloque(230, 480),
    new Bloque(340, 480),
    new Bloque(450, 480),
    new Bloque(560, 480),
    new Bloque(670, 480),
    new Bloque(780, 480),
    new Bloque(890, 480),

]
//Función para añadir los bloques
function agregarBloques(){
    for(let i = 0; i < bloques.length; i++){
        const bloque = document.createElement('div')
        bloque.classList.add('bloque')
        bloque.style.left = bloques[i].buttomIzq[0] + 'px'
        bloque.style.bottom = bloques[i].buttomIzq[1] + 'px'
        contenido.appendChild(bloque)
    }
}
agregarBloques()
//Función para añadir barra del jugador
function crearBarraJugador(){
    jugador.style.left =  posicionActualDelJugador[0] + 'px'
    jugador.style.bottom = posicionActualDelJugador[1] + 'px'
}
//Añadir al jugador
const jugador =  document.createElement('div')
jugador.classList.add('jugador')
contenido.appendChild(jugador)
crearBarraJugador()

//Movimiento de la Barra
function moverBarra(e){
    switch(e.key){
        case 'ArrowLeft':
            if(posicionActualDelJugador[0] > 0){
                posicionActualDelJugador[0] -= 50
                crearBarraJugador()
            }
            break
        case 'ArrowRight':
            if(posicionActualDelJugador[0] < (anchoDelTablero - anchoDelBLoque)){
                posicionActualDelJugador[0] += 50
                crearBarraJugador()
            }
            break
    }
}

//Evento Mover la Barra
document.addEventListener('keydown', moverBarra)

//Crearemos la pelota
function crearPelota(){
    pelota.style.left = posicionActualPelota[0] + 'px'
    pelota.style.bottom = posicionActualPelota[1] + 'px'
}
const pelota = document.createElement('div')
pelota.classList.add('pelota')
contenido.appendChild(pelota)
crearPelota()

function moverPelota(){
    posicionActualPelota[0] += xDiereccionPelota
    posicionActualPelota[1] += yDiereccionPelota
    crearPelota()
    golpeaObjetos()
    gameOver()
}
timerID = setInterval(moverPelota, 6)

function golpeaObjetos(){
    //Bloques
    for (let i = 0; i < bloques.length; i++){
        if( (posicionActualPelota[0] > bloques[i].buttomIzq[0] && posicionActualPelota[0] < bloques[i].buttomDer[0]) &&
            ((posicionActualPelota[1]  + diametro) > bloques[i].buttomIzq[1] && posicionActualPelota[1] < bloques[i].topIzq[1])
        ){
            const todosLosBloques = Array.from(document.querySelectorAll('.bloque'))
            todosLosBloques[i].classList.remove('bloque')
            bloques.splice(i,1)
            cambiarDireccion()
        }
    }
    //Paredes
    if(
        posicionActualPelota[0] >= (anchoDelTablero - diametro)||
        posicionActualPelota[1] >= (altoDelTablero - diametro)||
        posicionActualPelota[0] <= 0||
        posicionActualPelota[1] <= 0
    ){
        cambiarDireccion()
    }
    //Barra del Jugador
    if((posicionActualPelota[0] > posicionActualDelJugador[0] && posicionActualPelota[0] < posicionActualDelJugador[0] + anchoDelBLoque) && 
    (posicionActualPelota[1] > posicionActualDelJugador[1] && posicionActualPelota[1] < posicionActualDelJugador[1] + altoDelBloque)
    ){
        cambiarDireccion()
    }

}
//funcion que termina el juego si la bola toca suelo.
function gameOver(){
    if(posicionActualPelota[1] <= 0){
        clearInterval(timerID)
        document.removeEventListener('keydown',moverBarra)
        alert("Perdiste!! Intentalo de Nuevo...")
    }
}

//Direccion de la pelota 
function cambiarDireccion(){
    if(xDiereccionPelota === 2 && yDiereccionPelota === 2){
        yDiereccionPelota = -2
        return
    }
    else if(xDiereccionPelota === 2 && yDiereccionPelota === -2){
        xDiereccionPelota = -2
        return
    }
    else if(xDiereccionPelota === -2 && yDiereccionPelota === -2){
        yDiereccionPelota = 2
        return
    }
    else if(xDiereccionPelota === -2 && yDiereccionPelota === 2){
        xDiereccionPelota = 2
        return
    }
}