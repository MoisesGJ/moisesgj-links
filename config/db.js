import mongoose from 'mongoose';
import debugLib from 'debug';

const debug = debugLib('moisesgj-links:db');

const uri = `${process.env.DB_URI}/${process.env.DB_NAME}`;

export default async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    debug('Conectado a la base de datos MongoDB');
  } catch (err) {
    console.error('Error al conectar a la base de datos MongoDB:', err);
    process.exit(1);
  }
}

mongoose.connection.on('connected', () => {
  debug('Conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  debug('Desconectado de MongoDB');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  debug('Conexión a MongoDB cerrada debido a la terminación del proceso');
  process.exit(0);
});
