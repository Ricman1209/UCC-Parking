const API_URL = 'http://localhost:3000';

// 🔹 Función para obtener y mostrar usuarios
function cargarUsuarios() {
    fetch(`${API_URL}/usuarios`)
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("tablaUsuarios");
            tabla.innerHTML = ""; // Limpiar antes de insertar nuevos datos
            data.forEach(usuario => {
                tabla.innerHTML += `
                    <tr>
                        <td>${usuario.ID_Usuario}</td>
                        <td>${usuario.Nombre_Completo}</td>
                        <td>${usuario.ID_Tipo_Usuario === 1 ? 'Administrador' : 'Alumno'}</td>
                        <td>${usuario.Matricula || 'N/A'}</td>
                        <td>${usuario.Correo}</td>
                        <td>${usuario.Telefono || 'No registrado'}</td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error al obtener usuarios:', error));
}

// 🔹 Función para obtener y mostrar vehículos
function cargarVehiculos() {
    fetch(`${API_URL}/vehiculos`)
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("tablaVehiculos");
            tabla.innerHTML = ""; // Limpiar antes de insertar nuevos datos
            data.forEach(vehiculo => {
                tabla.innerHTML += `
                    <tr>
                        <td>${vehiculo.ID_Vehiculo}</td>
                        <td>${vehiculo.Placa}</td>
                        <td>${vehiculo.ID_Marca}</td>
                        <td>${vehiculo.Modelo || 'No registrado'}</td>
                        <td>${vehiculo.Color || 'No registrado'}</td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error al obtener vehículos:', error));
}

function agregarUsuario() {
    const body = {
        Nombre_Completo: document.getElementById("nombreUsuario").value,
        ID_Tipo_Usuario: parseInt(document.getElementById("tipoUsuario").value),
        Matricula: document.getElementById("matriculaUsuario").value,
        Correo: document.getElementById("correoUsuario").value,
        Telefono: document.getElementById("telefonoUsuario").value
    };

    fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        alert("Usuario registrado con éxito");
        cargarUsuarios(); // Refresca la tabla
    })
    .catch(err => console.error("Error al agregar usuario:", err));
}

