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
            // Llamar a la función para obtener y mostrar los datos después de enviar
            obtenerDatos();
            obtenerConteoPorCategoria();
        })
        .catch(error => console.error(error));
    });

    // Llamar a la función para obtener y mostrar los datos al cargar la página
    obtenerDatos();
    obtenerConteoPorCategoria();
}

window.addEventListener("DOMContentLoaded", loaded);

function obtenerDatos() {
    fetch('https://dawmproyecto-default-rtdb.firebaseio.com/coleccion.json')
        .then(response => response.json())
        .then(data => {
            const dataTableBody = document.getElementById('dataTableBody');
            dataTableBody.innerHTML = ''; // Limpiar la tabla antes de añadir los datos

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const entry = data[key];
                    let template = `
                        <tr>
                            <td>${entry.nombre}</td>
                            <td>${entry.email}</td>
                            <td>${entry.colorFavorito}</td>
                        </tr>
                    `;
                    dataTableBody.innerHTML += template;
                }
            }
        })
        .catch(error => console.error(error));
}

function obtenerConteoPorCategoria() {
    fetch('https://dawmproyecto-default-rtdb.firebaseio.com/coleccion.json')
        .then(response => response.json())
        .then(data => {
            const conteo = {};

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const entry = data[key];
                    const color = entry.colorFavorito;

                    if (conteo[color]) {
                        conteo[color]++;
                    } else {
                        conteo[color] = 1;
                    }
                }
            }

            const tablebody = document.getElementById('tablebody');
            tablebody.innerHTML = ''; // Limpiar la tabla antes de añadir los datos

            for (const color in conteo) {
                if (conteo.hasOwnProperty(color)) {
                    let template = `
                        <tr>
                            <td>${color}</td>
                            <td>${conteo[color]}</td>
                        </tr>
                    `;
                    tablebody.innerHTML += template;
                }
            }
        })
        .catch(error => console.error(error));
}
