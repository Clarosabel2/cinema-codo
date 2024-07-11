document.addEventListener('DOMContentLoaded', function () {
    const modalElement = document.getElementById('modificarModal');
    if (modalElement) {
        modificarModal = new bootstrap.Modal(modalElement);
        cargarUsuarios();
    } else {
        console.error('El elemento con ID "modificarModal" no existe en el DOM');
    }
});

// ----------------------------------------- //
// -- Cargar usuarios -- //
function cargarUsuarios() {
    fetch('/com.ar.proyectoDePrueba/GestionUsuariosServlet')
            .then(response => response.json())
            .then(usuarios => {
                const tbody = document.querySelector('#usuariosTable tbody');
                tbody.innerHTML = '';
                usuarios.forEach(usuario => {
                    const fechaFormateada = new Date(usuario.fechaNacimiento).toISOString().split('T')[0];
                    tbody.innerHTML += `
                    <tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.apellido}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.password}</td>
                        <td>${fechaFormateada}</td>
                        <td>${usuario.pais}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="mostrarModificarModal(${usuario.id})">Modificar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
                });
            })
            .catch(error => console.error('Error', error));
}

//----------
//modificar y mostrar el modal
function mostrarModificarModal(id) {
    fetch(`/com.ar.proyectoDePrueba/GestionUsuariosServlet?id=${id}`)
            .then(response => response.json())
            .then(usuario => {
                console.log(usuario);
                document.getElementById('userId').value = usuario.id;
                document.getElementById('nombre').value = usuario.nombre;
                document.getElementById('apellido').value = usuario.apellido;
                document.getElementById('email').value = usuario.email;
                document.getElementById('password').value = usuario.password;

                const fechaNacimientoElement = document.getElementById('fechaNacimiento');
                if (fechaNacimientoElement) {
                    fechaNacimientoElement.value = new Date(usuario.fechaNacimiento).toISOString().split('T')[0];
                } else {
                    console.error('El elemento con ID "fechaNacimiento" no existe en el DOM');
                }

                document.getElementById('pais').value = usuario.pais;

                if (modificarModal) {
                    modificarModal.show();
                } else {
                    console.error('El modal no se ha inicializado correctamente');
                }
            })
            .catch(error => console.error('Error', error));
}

function guardarModificacion() {
    const usuario = {
        id: document.getElementById('userId').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        pais: document.getElementById('pais').value
    };
    fetch('/com.ar.proyectoDePrueba/GestionUsuariosServlet', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
            .then(response => response.json())
            .then(data => {
                console.log(data.exito);
                if (data.exito) {
                    cargarUsuarios();
                } else {
                    alert('Error al guardar el usuario');
                }
            })
            .catch(error => console.error('Error', error));
}

//----------------------------------------
//eliminar usuarios
function eliminarUsuario(id) {
    if (confirm('¿Está seguro que desea eliminar el usuario?')) {
        fetch(`/com.ar.proyectoDePrueba/GestionUsuariosServlet?id=${id}`, {method: 'DELETE'})
                .then(response => response.json())
                .then(data => {
                    console.log(data.exito);
                    if (data.exito) {
                        cargarUsuarios();
                    } else {
                        alert('Error al eliminar el usuario');
                    }
                })
                .catch(error => console.error('Error', error));
    }
}
