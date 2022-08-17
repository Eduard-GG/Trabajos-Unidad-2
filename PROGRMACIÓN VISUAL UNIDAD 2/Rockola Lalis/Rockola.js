const audio = document.querySelector('audio')
var pista = document.getElementById('pista');
var proceso = document.getElementById('proceso');
var play = document.getElementById('.play');
var siguiente = document.getElementById('siguiente');
var anterior = document.getElementById('anterior');
var titulo = document.getElementById('titulo');
var artista = document.getElementById('artista');
var img = document.getElementById('img');
var cpistaActual = 0;
var cancion, duracion;
var usuario = false;

var canciones = [
    {  
        titulo: 'For Whom The Bell Tolls',
        artista:'Metallica',
        img: 'R.jpg',
        file: 'y2mate.com - For Whom The Bell Tolls'
    },
    {
        titulo: 'The Trooper',
        artista:'Metallica',
        img: 'P.jpg',
        file: 'y2mate.com - Iron Maiden  The Trooper Official Video'


    }
]
