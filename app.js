const { MongoClient } = require('mongodb');

// URL de conexión a MongoDB (reemplaza con tu propia URL si es necesario)
const url = 'mongodb://localhost:27017';
const dbName = 'Empresa1';

// Función asincrónica para conectar a MongoDB y realizar operaciones
async function main() {
    const client = new MongoClient(url);

    try {
        // Conectar al servidor de MongoDB
        await client.connect();
        console.log('Conectado exitosamente a MongoDB');

        // Seleccionar la base de datos
        const db = client.db(dbName);

        // Seleccionar la colección (crea una si no existe)
        const collection = db.collection('empleados');

        // Insertar un documento en la colección de empleados
        const empleado = [
            {nombre: 'Josue Gurrola'},
            {edad: 30},
            {puesto: 'Desarrollador'},
            {salario: 50000},
            {fechaContratacion: new Date('2020-01-15')},
            {departamento: 'IT'},
            {activo: true}
        ];
        const insertResult = await collection.insertMany(empleado);
        console.log('Empleado insertado:', insertResult.insertedId);

        // Encontrar todos los documentos en la colección de empleados
        const todosEmpleados = await collection.find({}).toArray();
        console.log('Empleados encontrados:', todosEmpleados);

    } catch (err) {
        console.error('Error al conectar a MongoDB:', err);
    } finally {
        // Cerrar la conexión
        await client.close();
    }
}

main().catch(console.error);
