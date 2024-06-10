let loaded = (eventLoaded) => {
    window.alert("Landing page loaded");
    console.log(eventLoaded);

    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();
        
        let nombreInput = document.getElementById('nombreInput');
        let emailInput = document.getElementById('emailInput');
        let selectBoxInput = document.getElementById('selectBoxInput');

        // Validación del contenido del input nombre
        if (nombreInput.value.length === 0) {
            nombreInput.focus();
            alert('Ingrese un nombre válido');
            return;
        }

        // Validación del contenido del input email
        if (emailInput.value.length === 0) {
            emailInput.focus();
            alert('Ingrese un correo válido');
            return;
        }

        // Validación del contenido del select box
        if (selectBoxInput.value === "") {
            selectBoxInput.focus();
            alert('Seleccione un color válido');
            return;
        }

        const nombre = nombreInput.value;
        const email = emailInput.value;
        const colorFavorito = selectBoxInput.value;

        const datos = {
            nombre: nombre,
            email: email,
            colorFavorito: colorFavorito
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
        })
        .catch(error => console.error(error));
    });
}

window.addEventListener("DOMContentLoaded", loaded);
