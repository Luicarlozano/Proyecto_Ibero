import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conectado a la base de datos correctamente');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error.message);
      process.exit(1); 
    }
};