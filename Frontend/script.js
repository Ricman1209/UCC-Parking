const API_URL = "http://localhost:3000";

// 🔹 Función para enviar el formulario del alumno
document.getElementById("formAlumno").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const matricula = document.getElementById("matricula").value.trim();
  const telefono = ""; // Puedes habilitarlo si deseas

  const placa = document.getElementById("placa").value.trim();
  const color = document.getElementById("color").value.trim();
  const marcaSeleccionada = document.getElementById("marca").value;

  const nombreCompleto = `${nombre} ${apellidos}`;
  const ID_Tipo_Usuario = 2;

  let idMarca = 0;
  switch (marcaSeleccionada) {
    case "Toyota": idMarca = 1; break;
    case "Honda": idMarca = 2; break;
    case "Chevrolet": idMarca = 3; break;
    default:
      alert("Selecciona una marca válida.");
      return;
  }

  // Validación rápida de campos esenciales
  if (!nombre || !apellidos || !matricula || !placa || !color) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }

  try {
    // 👤 Crear nuevo usuario
    const usuarioPayload = {
      Nombre_Completo: nombreCompleto,
      ID_Tipo_Usuario,
      Matricula: matricula
    };
    if (telefono.trim() !== "") {
      usuarioPayload.Telefono = telefono;
    }

    const resUsuario = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioPayload)
    });

    const usuarioData = await resUsuario.json();
    if (!resUsuario.ok) {
      throw new Error(usuarioData.error?.sqlMessage || "Error al registrar usuario");
    }

    const ID_Usuario = usuarioData.userId;

    // 🚗 Registrar vehículo del alumno
    const resVehiculo = await fetch(`${API_URL}/vehiculos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ID_Usuario,
        Placa: placa,
        ID_Marca: idMarca,
        Modelo: "",
        Color: color,
        ID_Discapacidad: null
      })
    });

    const vehiculoData = await resVehiculo.json();
    if (!resVehiculo.ok) {
      throw new Error(vehiculoData.error?.sqlMessage || "Error al registrar vehículo");
    }

    alert("Alumno y vehículo registrados con éxito 🎉");
    document.getElementById("formAlumno").reset();
  } catch (error) {
    console.error("🚨 Error:", error);
    alert("Ocurrió un error: " + error.message);
  }
});

// 🔹 Mostrar pantalla de login
function mostrarLogin() {
  document.getElementById("welcomePage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}

// 🔹 Manejar login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin_ucc" && password === "123") {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("menuPage").style.display = "block";
  } else {
    alert("Credenciales incorrectas");
  }
});

// 🔹 Mostrar formulario alumno
document.getElementById("btnAlumno").addEventListener("click", function () {
  document.getElementById("menuPage").style.display = "none";
  document.getElementById("alumnoPage").style.display = "block";
});

function cancelarAlumno() {
  document.getElementById("alumnoPage").style.display = "none";
  document.getElementById("menuPage").style.display = "block";
}

// 🔹 Enviar formulario del catedrático
document.getElementById("formCatedratico").addEventListener("submit", async function (e) {
  e.preventDefault();

  console.log("🚀 Formulario catedrático enviado");

  const nombre = document.getElementById("nombre_prof").value;
  const apellidos = document.getElementById("apellidos_prof").value;
  const matricula = document.getElementById("matricula_prof").value;
  const area = document.getElementById("area_prof").value;
  const telefono = "";

  const placa = document.getElementById("placa_prof").value;
  const color = document.getElementById("color_prof").value;
  const marcaSeleccionada = document.getElementById("marca_prof").value;

  const nombreCompleto = `${nombre} ${apellidos}`;
  const ID_Tipo_Usuario = 3;

  let idMarca = 0;
  switch (marcaSeleccionada) {
    case "Toyota": idMarca = 1; break;
    case "Honda": idMarca = 2; break;
    case "Chevrolet": idMarca = 3; break;
    default: idMarca = 0;
  }

  try {
    // 👤 Crear nuevo usuario
    const usuarioPayload = {
      Nombre_Completo: nombreCompleto,
      ID_Tipo_Usuario,
      Matricula: matricula
    };
    if (telefono.trim() !== "") {
      usuarioPayload.Telefono = telefono;
    }

    const resUsuario = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioPayload)
    });

    const usuarioData = await resUsuario.json();
    if (!resUsuario.ok) throw new Error(usuarioData.error?.sqlMessage || "Error al registrar catedrático");

    const ID_Usuario = usuarioData.userId;

    const resVehiculo = await fetch(`${API_URL}/vehiculos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ID_Usuario,
        Placa: placa,
        ID_Marca: idMarca,
        Modelo: "",
        Color: color,
        ID_Discapacidad: null
      })
    });

    const vehiculoData = await resVehiculo.json();
    if (!resVehiculo.ok) throw new Error(vehiculoData.error?.sqlMessage || "Error al registrar vehículo");

    alert("Catedrático y vehículo registrados con éxito ✅");
    document.getElementById("formCatedratico").reset();
    cancelarCatedratico();
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error: " + error.message);
  }
});

function cancelarCatedratico() {
  document.getElementById("catedraticoPage").style.display = "none";
  document.getElementById("menuPage").style.display = "block";
}

// Mostrar pantalla catedrático
document.getElementById("btnCatedratico").addEventListener("click", function () {
  document.getElementById("menuPage").style.display = "none";
  document.getElementById("catedraticoPage").style.display = "block";
});