import express from 'express';
import { environment } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import apiRoutes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shortener API Documentation',
      version: '1.0.0',
      description: 'API Documentation for Shortener Project',
    },
    servers: [
      {
        url: `http://localhost:${environment.port}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

const PORT = environment.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${environment.nodeEnv} mode`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;
