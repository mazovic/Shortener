import express from 'express';
import { environment } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import apiRoutes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

const PORT = environment.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${environment.nodeEnv} mode`);
});

export default app;
