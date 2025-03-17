let amigos=[];
let caracteresEspeciales=/[^a-zA-Zá-úÁ-ÚñÑ\s]/; // se añaden caracteres especiales 

function asignarTextoElemento(elemento,texto){
    let elementoHTML = document.querySelector(elemento);//obtiene el documento por elemento o etiqueta
    elementoHTML.innerHTML = texto;
    return;
}

function agregarAmigo() {
    let inputElemento = document.getElementById('amigo');
    let nuevoAmigoTexto = inputElemento.value.trim();

    // Validaciones
    if (!nuevoAmigoTexto) {
        return asignarTextoElemento('h2', 'Ingresa un nombre, por favor');
    }
    if (!isNaN(nuevoAmigoTexto)) {
        return asignarTextoElemento('h2', 'No puedes ingresar un número como nombre');
    }
    if (amigos.includes(nuevoAmigoTexto)) {
        inputElemento.value = '';
        return asignarTextoElemento('h2', `El nombre "${nuevoAmigoTexto}" ya ha sido agregado, ingresa algo para diferenciarlo o cámbialo`);
    }
    if (caracteresEspeciales.test(nuevoAmigoTexto)) {
        return asignarTextoElemento('h2', `El nombre "${nuevoAmigoTexto}" no es válido`);
    }

    // Agregar amigo a la lista
    amigos.push(nuevoAmigoTexto);
    asignarTextoElemento('h2', 'Gracias por el nombre');
    inputElemento.value = '';

    // Crear elemento de lista
    let nuevoAmigo = document.createElement("li");
    nuevoAmigo.textContent = nuevoAmigoTexto + ' ';

    // Crear botón de eliminar
    let botonQuitar = document.createElement("button");
    botonQuitar.textContent = 'Quitar';
    botonQuitar.addEventListener('click', function () {
        nuevoAmigo.remove();
        amigos = amigos.filter(amigo => amigo !== nuevoAmigoTexto);
    });

    // Agregar botón a la lista
    nuevoAmigo.appendChild(botonQuitar);
    document.getElementById('listaAmigos').appendChild(nuevoAmigo);

    console.log("Lista de amigos:", amigos);
}


function seleccion(datos) {
    if (datos.length === 0) return null;  // Evita errores si la lista está vacía
    return datos[Math.floor(Math.random() * datos.length)];
}

function sortearAmigo() {
    if (amigos.length < 2) {
        return asignarTextoElemento('h2', 'Debes ingresar al menos 2 nombres para jugar');
    }

    let elegido = seleccion(amigos);
    let resultado = document.getElementById("resultado");
    resultado.textContent = ""; // Limpia contenido previo de manera segura

    let nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = `El amigo secreto es: 🎉${elegido}🎉`;

    resultado.appendChild(nuevoElemento);
}
