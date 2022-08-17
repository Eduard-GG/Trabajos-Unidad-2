var audio = new Audio("sonidos/Minecraft Zombie hit  Sound effect HD.mp3 ")
document.onclick = function() {
    audio.play()
}
const sonidos = document.getElementById('sonidos')
document.addEventListener('keydown', function (evento){
    if (evento.keyCode == 13){
        sonidos.innerHTML = '<audio src="sonidos/For Whom The Bell Tolls.mp3 " autoplay></audio>'
    }
})

const cuadrados = document.querySelectorAll('.cuadrado')
const topo  = document.querySelector('.topo')
const tiempoRestante = document.querySelector('#tiempo')
const puntaje = document.querySelector('#puntaje')
let resultado = 0
let posicionGolpe
let tiempoInicial = 30
let tiempoId = null

function cuadradoRandom(){
    cuadrados.forEach(cuadrado =>{
        cuadrado.classList.remove('topo')
    })

    let cuadradoRandom =  cuadrados[Math.floor(Math.random() * 9)]
    cuadradoRandom.classList.add('topo')

    posicionGolpe = cuadradoRandom.id

}
cuadrados.forEach(cuadrado => {
    cuadrado.addEventListener('mousedown', () => {
        if(cuadrado.id == posicionGolpe) {
            resultado++
            puntaje.textContent = resultado
            posicionGolpe = null
        }

    })
})

function moverTopo(){
    tiempoId = setInterval(cuadradoRandom, 1000)

}
moverTopo()

function cuentaRefresiva(){
    tiempoInicial--
    tiempoRestante.textContent = tiempoInicial
    if(tiempoInicial == 0){
        clearInterval(cuentaRefresivaId)
        clearInterval(tiempoId)
        alert('Lo sientimos... El tiempo se ah agotado.' + '\nTu puntuacion es: ' + resultado + ' puntos')
    }
}
let cuentaRefresivaId = setInterval(cuentaRefresiva, 1000)

cuadradoRandom()