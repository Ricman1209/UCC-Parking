require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar con MySQL:', err);
    } else {
        console.log('Conectado a MySQL');
    }
});

// 🏷️ Rutas de usuarios
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM Usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.post('/usuarios', (req, res) => {
    const { Nombre_Completo, ID_Tipo_Usuario, Matricula, Correo, Telefono } = req.body;
    db.query(
        'INSERT INTO Usuarios (Nombre_Completo, ID_Tipo_Usuario, Matricula, Correo, Telefono) VALUES (?, ?, ?, ?, ?)',
        [Nombre_Completo, ID_Tipo_Usuario, Matricula, Correo, Telefono],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Usuario registrado', userId: result.insertId });
        }
    );
});

// 🚗 Rutas de vehículos
app.get('/vehiculos', (req, res) => {
    db.query('SELECT * FROM Vehiculos', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.post('/vehiculos', (req, res) => {
    const { ID_Usuario, Placa, ID_Marca, Modelo, Color, ID_Discapacidad } = req.body;
    db.query(
        'INSERT INTO Vehiculos (ID_Usuario, Placa, ID_Marca, Modelo, Color, ID_Discapacidad) VALUES (?, ?, ?, ?, ?, ?)',
        [ID_Usuario, Placa, ID_Marca, Modelo, Color, ID_Discapacidad],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Vehículo registrado', vehicleId: result.insertId });
        }
    );
});

// 📌 Rutas de cajones
app.get('/cajones', (req, res) => {
    db.query('SELECT * FROM Cajones_Estacionamiento', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.post('/asignar-cajon', (req, res) => {
    const { ID_Cajon, ID_Vehiculo } = req.body;
    db.query(
        'INSERT INTO Asignacion_Cajones (ID_Cajon, ID_Vehiculo) VALUES (?, ?)',
        [ID_Cajon, ID_Vehiculo],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Cajón asignado', assignmentId: result.insertId });
        }
    );
});

// ⏳ Registro de accesos
app.get('/accesos', (req, res) => {
    db.query('SELECT * FROM Registros_Acceso', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.post('/registrar-acceso', (req, res) => {
    const { ID_Vehiculo, ID_Usuario, Hora_Entrada } = req.body;
    db.query(
        'INSERT INTO Registros_Acceso (ID_Vehiculo, ID_Usuario, Hora_Entrada) VALUES (?, ?, ?)',
        [ID_Vehiculo, ID_Usuario, Hora_Entrada],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Acceso registrado', accessId: result.insertId });
        }
    );
});

// 🏁 Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
