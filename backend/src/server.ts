import express from 'express';
import { sequelize } from './config/sequelize';
import playerProfileRoutes from './routes/playerProfileRoutes';
import errorHandler from './middlewares/errorHandler';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost', 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/profiles', playerProfileRoutes);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});