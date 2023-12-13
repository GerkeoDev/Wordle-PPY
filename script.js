let intentos = 6
//let palabra = "APPLE"



let palabra = ""
const UrlApi = 'https://random-word-api.herokuapp.com/word?lang=es&length=5';

fetch(UrlApi).then(response => response.json())
    .then(response => {
        palabra = removeAccents(response[0].toUpperCase());
        console.log("API:",palabra);
})
.catch(err => {
    console.log("hubo un problema con la API!");
    let diccionario = ["APPLE", "HURLS", "WINGS", "YOUTH", "shott","molds", "chapt", "inane", "edged", "armer", "baton", "clour", "stare", "refix", "gimme", "sikas", "kemps", "thebe", "dusky","hajis", "galax","hated", "reest", "marks", "panga",
    "dinar", "dwarf", "bandy", "willy", "clump", "farci", "might", "bumfs"];
    palabra = diccionario[Math.floor(Math.random() * diccionario.length)].toUpperCase();
    console.log("ERROR:", palabra);
    });

let button = document.getElementById('guess-button');
const INPUT = document.getElementById("guess-input");


window.addEventListener('load', init);
button.addEventListener('click', intentar);
INPUT.addEventListener('keyup', leerenter);


function init(){
    console.log('Esto se ejecuta solo cuando se carga la pagina web');
}

function intentar(){
    document.getElementById('guesses').innerHTML = "";
    const INTENTO = leerIntento();
    console.log(INTENTO);
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    if(INTENTO.trim().length !== 5){
        //alert("Solo se permiten palabras de 5 letras")
        document.getElementById('guesses').innerHTML = "<h1>Solo se permiten palabras de 5 letras</h1>";
        return
    }
    if(palabra === INTENTO){
        console.log("GANASTE")
        for(let i in palabra){
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            console.log(INTENTO[i], "verde")
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
            SPAN.style.borderColor = 'green'
            ROW.appendChild(SPAN)
        }
        GRID.appendChild(ROW)
        terminar("<h1>GANASTE!</h1>")
        return
    }
    
    for(let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if(palabra[i]===INTENTO[i]){//VERDE
            console.log(INTENTO[i], "verde")
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
            SPAN.style.borderColor = 'green'
        }else if(palabra.includes(INTENTO[i])){//AMARILLO
            console.log(INTENTO[i], "amarillo")
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237';
            SPAN.style.borderColor = 'yellow'
        }else{//GRIS
            console.log(INTENTO[i], "gris")
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
            SPAN.style.borderColor = 'grey'
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
    intentos--
    console.log("Te quedan ", intentos, " intentos")
    if(intentos===0){
        console.log("Perdiste")
        terminar("<h1>PERDISTE!</h1>")
    }
}

function terminar(mensaje){
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function leerIntento(){
    let valor = INPUT.value
    valor = valor.toUpperCase()

    return valor
}
function leerenter(e){
    console.log("leerenter")
    if (e.key==="Enter"){
        intentar()
    }
}
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}