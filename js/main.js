let loaded = (eventLoaded) => {
    window.alert("Landing page loaded");
    console.log(eventLoaded);
    let myform = document.getElementById('formulario');
    debugger;
  
}

window.addEventListener("DOMContentLoaded", loaded);

let completarFormulario = ()=>{
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    const datos = {
    nombre: nombre,
    email: email,
    mensaje: mensaje
    };
    fetch('https://dawmproyecto-default-rtdb.firebaseio.com/coleccion.json', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
    'Content-Type': 'application/json'
    }
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
    console.log(datos); 
    servidor
    })
    .catch(error => console.error(error));
    });
} 